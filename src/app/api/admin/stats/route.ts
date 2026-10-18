import { NextResponse } from 'next/server';
import { connectDB, Product, OrderEnquiry } from '@/lib/db';
import { requireAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdminSession();
    await connectDB();

    const [totalProducts, activeProducts, outOfStock, totalEnquiries, pendingEnquiries, rawRecent] =
      await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ isActive: true }),
        Product.countDocuments({ isActive: true, inStock: false }),
        OrderEnquiry.countDocuments(),
        OrderEnquiry.countDocuments({ status: 'pending' }),
        OrderEnquiry.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('product', 'name imageUrl'),
      ]);

    const recentEnquiries = rawRecent.map((enquiry) => {
      const obj = enquiry.toJSON();
      const productObj = obj.product as { name?: string; imageUrl?: string | null } | undefined;
      return {
        id: String(obj.id || obj._id),
        quantity: obj.quantity,
        priceSnapshot: obj.priceSnapshot,
        status: obj.status,
        customerNote: obj.customerNote,
        createdAt: obj.createdAt,
        product: {
          name: productObj?.name ?? 'Unknown Product',
          imageUrl: productObj?.imageUrl ?? null,
        },
      };
    });

    return NextResponse.json({
      stats: {
        totalProducts,
        activeProducts,
        outOfStock,
        totalEnquiries,
        pendingEnquiries,
      },
      recentEnquiries,
    });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[GET /api/admin/stats] Error:', error);
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}
