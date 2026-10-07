import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

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
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  );

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
