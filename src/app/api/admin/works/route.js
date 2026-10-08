// src/app/api/admin/works/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* GET — list all works */
export async function GET() {
  try {
    await requireAdmin();
    const works = (await readDataFile('works.js', 'works')) || [];
    return NextResponse.json({ works });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* POST — create work */
export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const works = (await readDataFile('works.js', 'works')) || [];

    const nextId = works.length
      ? Math.max(...works.map((w) => Number(w.id) || 0)) + 1
      : 1;

    const newWork = {
      id: nextId,
      slug: body.slug || `work-${nextId}`,
      titleHi: body.titleHi || '',
      titleEn: body.titleEn || '',
      categoryHi: body.categoryHi || '',
      categoryEn: body.categoryEn || '',
      dateHi: body.dateHi || '',
      dateEn: body.dateEn || '',
      image: body.image || '',
      excerptHi: body.excerptHi || '',
      excerptEn: body.excerptEn || '',
      contentHi: body.contentHi || '',
      contentEn: body.contentEn || '',
    };

    const updated = [newWork, ...works];
    await writeDataFile('works.js', 'works', updated);

    return NextResponse.json({ work: newWork }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Create failed' },
      { status: 500 }
    );
  }
}