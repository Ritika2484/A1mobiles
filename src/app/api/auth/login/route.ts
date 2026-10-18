import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, User } from '@/lib/db';
import { getUserSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, identifier } = body as {
      email?: string;
      password?: string;
      identifier?: string;
    };

    const loginId = (identifier || email || '').trim();

    if (!loginId || !password) {
      return NextResponse.json(
        { error: 'Email or Mobile and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Look up by email (case-insensitive) or phone number
    const user = await User.findOne({
      $or: [
        { email: loginId.toLowerCase() },
        { phone: loginId },
      ],
    });

    const dummyHash = '$2a$12$invaliddummyhashforcomparison123456789012345678';
    const isValid = user
      ? await bcrypt.compare(password, user.passwordHash)
      : await bcrypt.compare(password, dummyHash).then(() => false);

    if (!user || !isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Save session cookie
    const session = await getUserSession();
    session.user = {
      userId: String(user._id),
      name: user.name,
      email: user.email,
      phone: user.phone || null,
    };
    await session.save();

    return NextResponse.json(
      {
        success: true,
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          phone: user.phone || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[POST /api/auth/login] Error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
