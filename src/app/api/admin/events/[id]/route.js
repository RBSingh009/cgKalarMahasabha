// src/app/api/admin/events/[id]/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* PUT — update event */
export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const events = (await readDataFile('events.js', 'events')) || [];
    const index = events.findIndex((e) => String(e.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const updated = { ...events[index], ...body, id: events[index].id };
    events[index] = updated;
    await writeDataFile('events.js', 'events', events);

    return NextResponse.json({ event: updated });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Update failed' },
      { status: 500 }
    );
  }
}

/* DELETE — remove event */
export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const events = (await readDataFile('events.js', 'events')) || [];
    const filtered = events.filter((e) => String(e.id) !== String(id));

    if (filtered.length === events.length) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    await writeDataFile('events.js', 'events', filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Delete failed' },
      { status: 500 }
    );
  }
}