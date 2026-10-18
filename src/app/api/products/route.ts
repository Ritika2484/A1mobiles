import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Product } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const tag = searchParams.get('tag');
    const search = searchParams.get('q');
    const featured = searchParams.get('featured');

    const filter: Record<string, unknown> = { isActive: true };

    if (category && category !== 'all') {
      filter.category = category;
    }
    if (brand && brand !== 'all') {
      filter.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
    }
    if (tag) {
      filter.tag = tag;
    }
    if (featured === 'true') {
      filter.featured = true;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .select('slug name brand category price originalPrice discount description imageUrl inStock featured tag storageOptions colors specifications createdAt')
      .lean();

    const formattedProducts = products.map((item) => ({
      id: String(item._id),
      slug: item.slug,
      name: item.name,
      brand: item.brand,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: item.discount,
      description: item.description,
      imageUrl: item.imageUrl,
      inStock: item.inStock,
      featured: item.featured,
      tag: item.tag,
      storageOptions: item.storageOptions || [],
      colors: item.colors || [],
      specifications: item.specifications || {},
      createdAt: item.createdAt,
    }));

    return NextResponse.json({ products: formattedProducts }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/products] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
