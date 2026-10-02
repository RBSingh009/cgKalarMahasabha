// src/app/api/user/avatar/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { setMockUser } from '@/lib/mockUser';
import { computeProfileCompletion } from '@/lib/profileCompletion';

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('ckm_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('avatar');
  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only images allowed' }, { status: 400 });
  }
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'Max 2MB' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const filename = `avatar-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);

  const url = `/uploads/avatars/${filename}`;

  /* ⚡ Persist to the mock user */
  const updated = setMockUser({ avatar: url });

  return NextResponse.json({
    avatar: url,
    user: {
      ...updated,
      completion: computeProfileCompletion(updated),
    },
  });
}