// src/app/api/admin/works/[id]/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* PUT — update work */
export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const works = (await readDataFile('works.js', 'works')) || [];
    const index = works.findIndex((w) => String(w.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: 'Work not found' }, { status: 404 });
    }

    const updated = { ...works[index], ...body, id: works[index].id };
    works[index] = updated;
    await writeDataFile('works.js', 'works', works);

    return NextResponse.json({ work: updated });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Update failed' },
      { status: 500 }
    );
  }
}

/* DELETE — remove work */
export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const works = (await readDataFile('works.js', 'works')) || [];
    const filtered = works.filter((w) => String(w.id) !== String(id));

    if (filtered.length === works.length) {
      return NextResponse.json({ message: 'Work not found' }, { status: 404 });
    }

    await writeDataFile('works.js', 'works', filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Delete failed' },
      { status: 500 }
    );
  }
}