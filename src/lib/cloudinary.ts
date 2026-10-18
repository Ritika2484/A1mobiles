import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export async function uploadProductImage(
  file: Buffer,
  filename: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'a1shop/products',
          public_id: filename.replace(/\.[^/.]+$/, ''),
          overwrite: true,
          transformation: [
            { width: 800, height: 800, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error('Cloudinary upload failed'));
          } else {
            resolve({ url: result.secure_url, publicId: result.public_id });
          }
        }
      )
      .end(file);
  });
}

export async function uploadCatalogImage(
  source: Buffer | string,
  options: {
    folder: string;
    publicId: string;
    overwrite?: boolean;
  }
): Promise<{ url: string; publicId: string }> {
  if (typeof source === 'string') {
    const result = await cloudinary.uploader.upload(source, {
      folder: options.folder,
      public_id: options.publicId,
      overwrite: options.overwrite ?? false,
      transformation: [
        { width: 1000, height: 1000, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' },
      ],
    });
    return { url: result.secure_url, publicId: result.public_id };
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: options.folder,
          public_id: options.publicId,
          overwrite: options.overwrite ?? false,
          transformation: [
            { width: 1000, height: 1000, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error('Cloudinary upload failed'));
          } else {
            resolve({ url: result.secure_url, publicId: result.public_id });
          }
        }
      )
      .end(source);
  });
}

export async function deleteProductImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
