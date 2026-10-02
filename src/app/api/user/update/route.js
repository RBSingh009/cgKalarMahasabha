// src/app/api/user/update/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { computeProfileCompletion } from '@/lib/profileCompletion';
import { getMockUser, setMockUser } from '@/lib/mockUser';

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('ckm_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  /* ⚡ Never overwrite avatar from this route */
  delete body.avatar;

  const updated = setMockUser(body);
  return NextResponse.json({
    user: {
      ...updated,
      completion: computeProfileCompletion(updated),
    },
  });
}