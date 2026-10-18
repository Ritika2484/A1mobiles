import { connectDB, Product } from '@/lib/db';
import { CATALOG_PHONES, CatalogPhone } from '@/data/catalogData';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface ImportResult {
  totalProcessed: number;
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  imagesUploaded: number;
  imagesReused: number;
  failedUploads: { model: string; reason: string }[];
  errors: { model: string; error: string }[];
  importedSlugs: string[];
}

export async function runCatalogImport(): Promise<ImportResult> {
  const result: ImportResult = {
    totalProcessed: 0,
    createdCount: 0,
    updatedCount: 0,
    skippedCount: 0,
    imagesUploaded: 0,
    imagesReused: 0,
    failedUploads: [],
    errors: [],
    importedSlugs: [],
  };

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error('Cloudinary credentials missing in environment variables (.env).');
  }

  await connectDB();
  console.log('📦 Connected to MongoDB. Starting catalog synchronization...\n');

  for (const phone of CATALOG_PHONES) {
    result.totalProcessed++;
    console.log(`[${result.totalProcessed}/${CATALOG_PHONES.length}] Processing: ${phone.brand} ${phone.model}...`);

    let finalImageUrl: string = phone.imageSourceUrl;
    let finalPublicId: string = phone.cloudinaryPublicId;

    // 1. Check or Upload Image to Cloudinary
    try {
      let assetExists = false;
      try {
        const existingAsset = await cloudinary.api.resource(phone.cloudinaryPublicId);
        if (existingAsset && existingAsset.secure_url) {
          assetExists = true;
          finalImageUrl = existingAsset.secure_url;
          finalPublicId = existingAsset.public_id;
          result.imagesReused++;
          console.log(`   ↳ ♻️ Reusing existing Cloudinary asset: ${finalPublicId}`);
        }
      } catch (checkErr: any) {
        if (checkErr?.error?.http_code !== 404 && checkErr?.http_code !== 404) {
          // not fatal, proceed
        }
      }

      if (!assetExists) {
        console.log(`   ↳ ⬆️ Uploading to Cloudinary folder: ${phone.cloudinaryFolder}...`);
        const uploadRes = await cloudinary.uploader.upload(phone.imageSourceUrl, {
          folder: phone.cloudinaryFolder,
          public_id: path.basename(phone.cloudinaryPublicId),
          overwrite: true,
          transformation: [
            { width: 1000, height: 1000, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' },
          ],
        });

        finalImageUrl = uploadRes.secure_url;
        finalPublicId = uploadRes.public_id;
        result.imagesUploaded++;
        console.log(`   ↳ ✅ Cloudinary upload complete: ${finalPublicId}`);
      }
    } catch (uploadError: any) {
      console.warn(`   ↳ ⚠️ Cloudinary upload issue: ${uploadError.message || uploadError}`);
      result.failedUploads.push({
        model: `${phone.brand} ${phone.model}`,
        reason: uploadError.message || String(uploadError),
      });
    }

    // 2. Upsert into MongoDB
    try {
      const existing = await Product.findOne({
        $or: [
          { slug: phone.slug },
          { brand: phone.brand, name: { $regex: new RegExp(`^${phone.model.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
          ...(phone.slug === 'realme-16' ? [{ slug: 'realme16' }] : []),
        ],
      });

      if (existing) {
        existing.name = phone.title;
        existing.brand = phone.brand;
        existing.category = phone.category;
        existing.description = phone.description;
        existing.specifications = phone.specifications;
        existing.features = phone.features;
        existing.colors = phone.colors;
        existing.storageOptions = phone.storageOptions;
        existing.sourceUrl = phone.sourceUrl;
        existing.verificationDate = phone.verificationDate;
        existing.verificationStatus = phone.verificationStatus;

        if (!existing.imageUrl || existing.imageUrl.includes('hero-phone') || existing.imageUrl.includes('Screenshot')) {
          existing.imageUrl = finalImageUrl;
          existing.imagePublicId = finalPublicId;
        }
        existing.images = [finalImageUrl];

        await existing.save();
        result.updatedCount++;
        result.importedSlugs.push(existing.slug);
        console.log(`   ↳ 📝 Updated existing product in MongoDB: ${existing.slug}`);
      } else {
        const newProduct = await Product.create({
          slug: phone.slug,
          name: phone.title,
          brand: phone.brand,
          category: phone.category,
          price: phone.price,
          originalPrice: phone.originalPrice,
          discount: phone.discount,
          description: phone.description,
          imageUrl: finalImageUrl,
          imagePublicId: finalPublicId,
          images: [finalImageUrl],
          inStock: phone.inStock,
          isActive: phone.isActive,
          featured: phone.featured,
          tag: phone.tag ?? null,
          colors: phone.colors,
          storageOptions: phone.storageOptions,
          specifications: phone.specifications,
          features: phone.features,
          sourceUrl: phone.sourceUrl,
          verificationDate: phone.verificationDate,
          verificationStatus: phone.verificationStatus,
        });

        result.createdCount++;
        result.importedSlugs.push(newProduct.slug);
        console.log(`   ↳ ✨ Created new product in MongoDB: ${newProduct.slug}`);
      }
    } catch (dbError: any) {
      console.error(`   ↳ ❌ Database error for ${phone.model}:`, dbError.message);
      result.errors.push({
        model: `${phone.brand} ${phone.model}`,
        error: dbError.message || String(dbError),
      });
    }
  }

  return result;
}
