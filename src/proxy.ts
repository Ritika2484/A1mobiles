import { NextRequest, NextResponse } from 'next/server';

// Routes that require admin session
const PROTECTED_ADMIN_PATHS = ['/admin/dashboard', '/admin/products', '/admin/orders'];
const PROTECTED_API_PATHS = ['/api/admin/'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a protected admin UI page (not the login page)
  const isProtectedAdminPage = PROTECTED_ADMIN_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // Check if it's a protected admin API route (allow public admin routes like login)
  const isProtectedAdminApi =
    PROTECTED_API_PATHS.some((path) => pathname.startsWith(path)) &&
    !pathname.startsWith('/api/admin/login');

  if (isProtectedAdminPage || isProtectedAdminApi) {
    // Read the session cookie
    const sessionCookie = request.cookies.get('a1shop_admin_session');

    if (!sessionCookie?.value) {
      if (isProtectedAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // Redirect to admin login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and visiting admin login page, redirect to dashboard
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('a1shop_admin_session');
    if (sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  // Redirect /admin to /admin/dashboard
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
