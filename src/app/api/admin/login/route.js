// src/app/api/admin/login/route.js

import { NextResponse } from 'next/server';
import {
  validateAdminCredentials,
  generateAdminToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/adminAuth';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password, remember } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'कृपया ईमेल और पासवर्ड दर्ज करें' },
        { status: 400 }
      );
    }

    const admin = validateAdminCredentials(email, password);

    if (!admin) {
      return NextResponse.json(
        { message: 'गलत क्रेडेंशियल' },
        { status: 401 }
      );
    }

    const token = generateAdminToken();

    const res = NextResponse.json({
      success: true,
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });

    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8;

    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge,
    });

    return res;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { message: 'कुछ गलत हो गया' },
      { status: 500 }
    );
  }
}