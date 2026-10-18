import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, AdminUser } from '@/lib/db';
import { getSession } from '@/lib/auth';

// Simple in-memory rate limiter (per-IP, resets on server restart)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again in 15 minutes.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    const admin = await AdminUser.findOne({
      email: email.toLowerCase().trim(),
    });

    // Constant-time comparison even when user doesn't exist
    const dummyHash = '$2a$12$invaliddummyhashforcomparison123456789012345678';
    const isValid = admin
      ? await bcrypt.compare(password, admin.passwordHash)
      : await bcrypt.compare(password, dummyHash).then(() => false);

    if (!admin || !isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const session = await getSession();
    session.admin = { adminId: String(admin._id), adminEmail: admin.email };
    await session.save();

    return NextResponse.json({ success: true, email: admin.email });
  } catch (error) {
    console.error('[POST /api/admin/login] Error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
