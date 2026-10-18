import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Product } from '@/lib/db';
import { requireAdminSession } from '@/lib/auth';
import { deleteProductImage } from '@/lib/cloudinary';

// GET /api/admin/products/[id] — get product by id (admin)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[GET /api/admin/products/[id]] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PATCH /api/admin/products/[id] — update product
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await req.json();

    await connectDB();
    const existing = await Product.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const {
      slug,
      name,
      brand,
      category,
      price,
      originalPrice,
      discount,
      description,
      imageUrl,
      imagePublicId,
      inStock,
      isActive,
      featured,
      tag,
      images,
      colors,
      storageOptions,
      specifications,
      features,
      sourceUrl,
      verificationDate,
      verificationStatus,
    } = body;

    const updateData: Record<string, unknown> = {};
    if (slug !== undefined) updateData.slug = slug.toLowerCase().trim();
    if (name !== undefined) updateData.name = name.trim();
    if (brand !== undefined) updateData.brand = brand.trim();
    if (category !== undefined) updateData.category = category.toLowerCase().trim();
    if (price !== undefined) updateData.price = Math.round(price);
    if (originalPrice !== undefined) updateData.originalPrice = Math.round(originalPrice);
    if (discount !== undefined) updateData.discount = Math.max(0, Math.min(100, Math.round(discount)));
    if (description !== undefined) updateData.description = description.trim();
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (imagePublicId !== undefined) updateData.imagePublicId = imagePublicId;
    if (inStock !== undefined) updateData.inStock = inStock;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (featured !== undefined) updateData.featured = featured;
    if (tag !== undefined) updateData.tag = tag?.trim() ?? null;
    if (images !== undefined) updateData.images = images;
    if (colors !== undefined) updateData.colors = colors;
    if (storageOptions !== undefined) updateData.storageOptions = storageOptions;
    if (specifications !== undefined) updateData.specifications = specifications;
    if (features !== undefined) updateData.features = features;
    if (sourceUrl !== undefined) updateData.sourceUrl = sourceUrl;
    if (verificationDate !== undefined) updateData.verificationDate = verificationDate;
    if (verificationStatus !== undefined) updateData.verificationStatus = verificationStatus;

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ product });
  } catch (error: unknown) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const err = error as { code?: number | string };
    if (err.code === 11000 || err.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already in use by another product' }, { status: 409 });
    }
    console.error('[PATCH /api/admin/products/[id]] Error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id] — hard delete (with Cloudinary cleanup)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete Cloudinary image if present (best-effort)
    if (product.imagePublicId) {
      try {
        await deleteProductImage(product.imagePublicId);
      } catch (e) {
        console.warn('[DELETE product] Cloudinary delete failed for:', product.imagePublicId, e);
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[DELETE /api/admin/products/[id]] Error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
