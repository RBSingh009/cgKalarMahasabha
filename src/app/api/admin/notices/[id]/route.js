// src/app/api/admin/notices/[id]/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* ---------- PUT — update notice ---------- */
export async function PUT(request, { params }) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();

    const notices = (await readDataFile('notices.js', 'notices')) || [];
    const index = notices.findIndex((n) => String(n.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }

    const updated = {
      ...notices[index],
      ...body,
      id: notices[index].id,
    };

    notices[index] = updated;
    await writeDataFile('notices.js', 'notices', notices);

    return NextResponse.json({ notice: updated });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Update failed' },
      { status: 500 }
    );
  }
}

/* ---------- DELETE — remove notice ---------- */
export async function DELETE(request, { params }) {
  try {
    await requireAdmin();

    const { id } = await params;
    const notices = (await readDataFile('notices.js', 'notices')) || [];
    const filtered = notices.filter((n) => String(n.id) !== String(id));

    if (filtered.length === notices.length) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }

    await writeDataFile('notices.js', 'notices', filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Delete failed' },
      { status: 500 }
    );
  }
}