// src/app/api/admin/notices/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* ---------- GET — list all notices ---------- */
export async function GET() {
  try {
    await requireAdmin();

    const notices = (await readDataFile('notices.js', 'notices')) || [];
    return NextResponse.json({ notices });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* ---------- POST — create a new notice ---------- */
export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const notices = (await readDataFile('notices.js', 'notices')) || [];

    const nextId = notices.length
      ? Math.max(...notices.map((n) => Number(n.id) || 0)) + 1
      : 1;

    const newNotice = {
      id: nextId,
      slug: body.slug || `notice-${nextId}`,
      category: body.category || 'सूचना',
      categoryEn: body.categoryEn || 'Notice',
      title: body.title || '',
      titleEn: body.titleEn || '',
      body: body.body || '',
      bodyEn: body.bodyEn || '',
      publishedAt: body.publishedAt || new Date().toISOString().slice(0, 10),
      important: !!body.important,
      attachment: body.attachment || null,
    };

    const updated = [newNotice, ...notices];
    await writeDataFile('notices.js', 'notices', updated);

    return NextResponse.json({ notice: newNotice }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Create failed' },
      { status: 500 }
    );
  }
}