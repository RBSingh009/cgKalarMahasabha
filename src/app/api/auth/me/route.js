// src/app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { computeProfileCompletion } from '@/lib/profileCompletion';
import { getMockUser } from '@/lib/mockUser';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ckm_token')?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = getMockUser();
  return NextResponse.json({
    user: {
      ...user,
      completion: computeProfileCompletion(user),
    },
  });
}