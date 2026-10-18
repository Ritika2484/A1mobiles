import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getUserSession();
    if (!session.user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json(
      {
        user: {
          id: session.user.userId,
          name: session.user.name,
          email: session.user.email,
          phone: session.user.phone ?? null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/auth/me] Error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
