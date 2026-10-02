// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';

const MOCK_USER = {
  id: 'u_001',
  name: 'राम कुमार कलार',
  memberId: 'CKM-2024-0871',
  phone: '+91 98260 50235',
  email: 'ram@example.com',
  joinedAt: '15 जनवरी 2024',
  avatar: '/images/avatar-placeholder.png',
  role: 'सक्रिय सदस्य',
  completion: 40,
  district: 'रायपुर',
};

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { identifier, password, remember } = body;

  if (!identifier || !password) {
    return NextResponse.json(
      { message: 'कृपया सभी फ़ील्ड भरें' },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए' },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ user: MOCK_USER });
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

  res.cookies.set('ckm_token', 'demo_' + Date.now(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  });

  return res;
}