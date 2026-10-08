// src/app/api/admin/members/[id]/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* ---------- GET — single member ---------- */
export async function GET(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const members = (await readDataFile('members.js', 'members')) || [];
    const member = members.find((m) => String(m.id) === String(id));

    if (!member) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ member });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* ---------- PUT — update member ---------- */
export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const members = (await readDataFile('members.js', 'members')) || [];
    const index = members.findIndex((m) => String(m.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }

    const updated = {
      ...members[index],
      ...body,
      id: members[index].id,
    };

    members[index] = updated;
    await writeDataFile('members.js', 'members', members);

    return NextResponse.json({ member: updated });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Update failed' },
      { status: 500 }
    );
  }
}

/* ---------- DELETE — remove member ---------- */
export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const members = (await readDataFile('members.js', 'members')) || [];
    const filtered = members.filter((m) => String(m.id) !== String(id));

    if (filtered.length === members.length) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }

    await writeDataFile('members.js', 'members', filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Delete failed' },
      { status: 500 }
    );
  }
}