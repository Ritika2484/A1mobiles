import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Product, OrderEnquiry } from '@/lib/db';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918726942338';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://a1mobileshop.in';

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantity = 1 } = body as {
      productId: string;
      quantity?: number;
    };

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }
    if (typeof quantity !== 'number' || quantity < 1 || quantity > 99) {
      return NextResponse.json({ error: 'quantity must be between 1 and 99' }, { status: 400 });
    }

    await connectDB();

    // Fetch product (must be active + in stock)
    const product = await Product.findOne({
      $or: [{ _id: productId }, { slug: productId }],
      isActive: true,
      inStock: true,
    }).select('_id name slug price');

    if (!product) {
      return NextResponse.json({ error: 'Product not available' }, { status: 404 });
    }

    const subtotal = product.price * quantity;
    const productUrl = `${SITE_URL}/products/${product.slug}`;

    // Build initial WhatsApp message
    const message = [
      `Hello! I would like to order the following product:`,
      ``,
      `Product: ${product.name}`,
      `Product ID: ${product._id}`,
      `Price: ${formatINR(product.price)}`,
      `Quantity: ${quantity}`,
      `Subtotal: ${formatINR(subtotal)}`,
      `Product link: ${productUrl}`,
      ``,
      `Please confirm availability and delivery details.`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Create enquiry record in DB
    const enquiry = await OrderEnquiry.create({
      productId: String(product._id),
      quantity,
      priceSnapshot: product.price,
      status: 'pending',
      whatsappUrl,
    });

    // Append enquiry ID to message for business reference
    const finalMessage = [
      `Hello! I would like to order the following product:`,
      ``,
      `Product: ${product.name}`,
      `Enquiry ID: ${enquiry._id}`,
      `Product ID: ${product._id}`,
      `Price: ${formatINR(product.price)}`,
      `Quantity: ${quantity}`,
      `Subtotal: ${formatINR(subtotal)}`,
      `Product link: ${productUrl}`,
      ``,
      `Please confirm availability and delivery details.`,
    ].join('\n');

    const finalWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;

    // Update enquiry with final URL
    await OrderEnquiry.findByIdAndUpdate(enquiry._id, {
      whatsappUrl: finalWhatsappUrl,
    });

    return NextResponse.json({
      enquiryId: String(enquiry._id),
      whatsappUrl: finalWhatsappUrl,
    });
  } catch (error) {
    console.error('[POST /api/enquiries] Error:', error);
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}
