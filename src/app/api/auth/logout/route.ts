import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/auth';

export async function POST() {
  try {
    const session = await getUserSession();
    session.destroy();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[POST /api/auth/logout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
