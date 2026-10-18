import { NextRequest, NextResponse } from 'next/server';
import { connectDB, OrderEnquiry } from '@/lib/db';
import { requireAdminSession } from '@/lib/auth';

const VALID_STATUSES = ['pending', 'contacted', 'confirmed', 'cancelled'];

// PATCH /api/admin/orders/[id] — update enquiry status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await req.json();
    const { status } = body as { status?: string };

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    await connectDB();

    const enquiry = await OrderEnquiry.findById(id);
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    const updated = await OrderEnquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('product', 'name');

    return NextResponse.json({ enquiry: updated });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[PATCH /api/admin/orders/[id]] Error:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
