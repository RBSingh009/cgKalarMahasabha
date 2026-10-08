// src/proxy.js
import { NextResponse } from 'next/server';

const PROTECTED = ['/dashboard', '/profile', '/id-card', '/receipt'];
const AUTH_ONLY = ['/login', '/join'];
const ADMIN_PROTECTED = ['/admin'];

/* Handle both with and without trailing slash */
const ADMIN_LOGIN_PATHS = ['/admin/login', '/admin/login/'];
const ADMIN_LOGIN_API_PATHS = ['/api/admin/login', '/api/admin/login/'];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('ckm_token')?.value;
  const adminToken = request.cookies.get('ckm_admin_token')?.value;

  /* ============================================================
     ADMIN ROUTES
     ============================================================ */
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAdminLogin = ADMIN_LOGIN_PATHS.includes(pathname);

  /* ---------- /admin/login ---------- */
  if (isAdminLogin) {
    if (adminToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  /* ---------- /api/admin/* ---------- */
  if (isAdminApi) {
    const isLoginApi = ADMIN_LOGIN_API_PATHS.includes(pathname);

    if (isLoginApi) return NextResponse.next();

    if (!adminToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  /* ---------- Other /admin/* pages ---------- */
  if (isAdminRoute) {
    if (!adminToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  /* ============================================================
     REGULAR MEMBER ROUTES
     ============================================================ */
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthOnly && token) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/id-card/:path*',
    '/receipt/:path*',
    '/login',
    '/join',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};