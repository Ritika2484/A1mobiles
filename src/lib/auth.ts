import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export interface AdminSession {
  adminId: string;
  adminEmail: string;
}

export interface UserSession {
  userId: string;
  name: string;
  email: string;
  phone?: string | null;
}

declare module 'iron-session' {
  interface IronSessionData {
    admin?: AdminSession;
    user?: UserSession;
  }
}

// Admin session configuration (8 hours, strict)
const adminSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'a1shop_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
  },
};

// User/Customer session configuration (30 days)
const userSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'a1shop_user_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<{ admin?: AdminSession }>(cookieStore, adminSessionOptions);
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getSession();
  if (!session.admin) {
    throw new Error('Unauthorized');
  }
  return session.admin;
}

export async function getUserSession() {
  const cookieStore = await cookies();
  return getIronSession<{ user?: UserSession }>(cookieStore, userSessionOptions);
}

export async function requireUserSession(): Promise<UserSession> {
  const session = await getUserSession();
  if (!session.user) {
    throw new Error('Unauthorized');
  }
  return session.user;
}

/**
 * Wraps a Next.js API handler with admin-only authentication.
 * Returns 401 JSON if not authenticated.
 */
export function withAdminAuth(
  handler: (req: NextRequest, context: { params: Promise<Record<string, string>> }) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Promise<Record<string, string>> }) => {
    try {
      await requireAdminSession();
      return handler(req, context);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  };
}
