import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Product } from '@/lib/db';
import { requireAdminSession } from '@/lib/auth';

// GET /api/admin/products — list all products (admin)
export async function GET(req: NextRequest) {
  try {
    await requireAdminSession();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q') ?? '';
    const category = searchParams.get('category') ?? '';
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const pageSize = 20;

    const filter: Record<string, unknown> = {};

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      filter.$or = [{ name: regex }, { brand: regex }];
    }

    if (category) {
      filter.category = category.toLowerCase().trim();
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({ products, total, page, pageSize });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[GET /api/admin/products] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/admin/products — create product
export async function POST(req: NextRequest) {
  try {
    await requireAdminSession();

    const body = await req.json();
    const {
      slug,
      name,
      brand,
      category,
      price,
      originalPrice,
      discount = 0,
      description,
      imageUrl,
      imagePublicId,
      inStock = true,
      isActive = true,
      featured = false,
      tag,
      images = [],
      colors = [],
      storageOptions = [],
      specifications = {},
      features = [],
      sourceUrl = null,
      verificationDate = null,
      verificationStatus = 'verified',
    } = body;

    if (!slug || !name || !brand || !category || !price || !description) {
      return NextResponse.json(
        { error: 'slug, name, brand, category, price, and description are required' },
        { status: 400 }
      );
    }

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'price must be a positive number' }, { status: 400 });
    }

    await connectDB();

    const product = await Product.create({
      slug: slug.toLowerCase().trim(),
      name: name.trim(),
      brand: brand.trim(),
      category: category.toLowerCase().trim(),
      price: Math.round(price),
      originalPrice: Math.round(originalPrice ?? price),
      discount: Math.max(0, Math.min(100, Math.round(discount))),
      description: description.trim(),
      imageUrl: imageUrl ?? null,
      imagePublicId: imagePublicId ?? null,
      inStock,
      isActive,
      featured,
      tag: tag?.trim() ?? null,
      images,
      colors,
      storageOptions,
      specifications,
      features,
      sourceUrl,
      verificationDate,
      verificationStatus,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: unknown) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const err = error as { code?: number | string };
    if (err.code === 11000 || err.code === 'P2002') {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 409 });
    }
    console.error('[POST /api/admin/products] Error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
