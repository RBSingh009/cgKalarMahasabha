// src/proxy.js
import { NextResponse } from 'next/server';

const PROTECTED = ['/dashboard', '/profile', '/id-card', '/receipt'];
const AUTH_ONLY = ['/login', '/join'];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('ckm_token')?.value;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p));

  /* Not logged in → protected page → redirect to login */
  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  /* Logged in → trying to access login/join → redirect to dashboard */
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
  ],
};