import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from './ProductDetailClient';
import { connectDB, Product as ProductModel } from '@/lib/db';
import { Product } from '@/types';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

function mapDbDocToProduct(dbProduct: any): Product {
  const img = dbProduct.imageUrl || '/images/hero-phone.jpg';
  const images =
    Array.isArray(dbProduct.images) && dbProduct.images.length > 0
      ? dbProduct.images
      : [img];
  const colors =
    Array.isArray(dbProduct.colors) && dbProduct.colors.length > 0
      ? dbProduct.colors
      : [{ name: 'Default', hex: '#1e293b' }];
  const storageOptions =
    Array.isArray(dbProduct.storageOptions) && dbProduct.storageOptions.length > 0
      ? dbProduct.storageOptions
      : ['Standard'];
  const specs =
    dbProduct.specifications instanceof Map
      ? Object.fromEntries(dbProduct.specifications)
      : dbProduct.specifications || {};
  const features = Array.isArray(dbProduct.features) ? dbProduct.features : [];

  return {
    id: String(dbProduct._id),
    slug: dbProduct.slug,
    brand: dbProduct.brand,
    name: dbProduct.name,
    category: (dbProduct.category as Product['category']) || 'smartphones',
    price: dbProduct.price,
    originalPrice: dbProduct.originalPrice || dbProduct.price,
    discount: dbProduct.discount || 0,
    rating: 4.8,
    reviewsCount: 12,
    image: img,
    images,
    colors,
    storageOptions,
    description: dbProduct.description,
    specifications: specs,
    features,
    whatsInTheBox: ['Device', 'Charging Cable', 'Official Invoice'],
    featured: dbProduct.featured,
    inStock: dbProduct.inStock,
    tag: dbProduct.tag || undefined,
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    await connectDB();
    const dbProduct = await ProductModel.findOne({ slug, isActive: true }).lean();
    if (!dbProduct) return null;
    return mapDbDocToProduct(dbProduct);
  } catch (error) {
    console.error(`[getProduct] Error fetching product ${slug}:`, error);
    return null;
  }
}

async function getRelatedProducts(currentSlug: string, category?: string, brand?: string): Promise<Product[]> {
  try {
    await connectDB();
    const filter: Record<string, unknown> = {
      slug: { $ne: currentSlug },
      isActive: true,
    };
    if (category || brand) {
      filter.$or = [
        ...(category ? [{ category }] : []),
        ...(brand ? [{ brand }] : [])
      ];
    }
    const docs = await ProductModel.find(filter).limit(4).lean();
    return docs.map(mapDbDocToProduct);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | A1 Mobile Shop',
    };
  }

  return {
    title: `${product.name} - Buy Online | A1 Mobile Shop`,
    description: product.description,
    openGraph: {
      title: `${product.name} | A1 Mobile Shop`,
      description: product.description,
      images: [product.image],
    },
  };
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const dbProducts = await ProductModel.find({ isActive: true }).select('slug').lean();
    return dbProducts.map((p) => ({
      slug: p.slug,
    }));
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.slug, product.category, product.brand);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
