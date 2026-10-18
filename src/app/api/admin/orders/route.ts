import { NextRequest, NextResponse } from 'next/server';
import { connectDB, OrderEnquiry } from '@/lib/db';
import { requireAdminSession } from '@/lib/auth';

// GET /api/admin/orders — list all enquiries
export async function GET(req: NextRequest) {
  try {
    await requireAdminSession();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') ?? '';
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const pageSize = 20;

    const filter: Record<string, unknown> = {};
    if (status) {
      filter.status = status;
    }

    const [enquiries, total] = await Promise.all([
      OrderEnquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('product', 'name slug imageUrl'),
      OrderEnquiry.countDocuments(filter),
    ]);

    const formattedEnquiries = enquiries.map((enquiry) => {
      const obj = enquiry.toJSON();
      const productObj = obj.product as { name?: string; slug?: string; imageUrl?: string | null } | undefined;
      return {
        id: String(obj.id || obj._id),
        productId: obj.productId,
        quantity: obj.quantity,
        priceSnapshot: obj.priceSnapshot,
        status: obj.status,
        whatsappUrl: obj.whatsappUrl,
        customerNote: obj.customerNote,
        createdAt: obj.createdAt,
        product: productObj
          ? {
              name: productObj.name ?? 'Unknown Product',
              slug: productObj.slug ?? '',
              imageUrl: productObj.imageUrl ?? null,
            }
          : {
              name: 'Unknown Product',
              slug: '',
              imageUrl: null,
            },
      };
    });

    return NextResponse.json({ enquiries: formattedEnquiries, total, page, pageSize });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[GET /api/admin/orders] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
