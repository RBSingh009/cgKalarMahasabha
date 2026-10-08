// src/app/api/admin/events/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* GET — list all events */
export async function GET() {
  try {
    await requireAdmin();
    const events = (await readDataFile('events.js', 'events')) || [];
    return NextResponse.json({ events });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* POST — create a new event */
export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const events = (await readDataFile('events.js', 'events')) || [];

    const nextId = events.length
      ? Math.max(...events.map((e) => Number(e.id) || 0)) + 1
      : 1;

    const newEvent = {
      id: nextId,
      slug: body.slug || `event-${nextId}`,
      title: body.title || '',
      titleEn: body.titleEn || '',
      date: body.date || new Date().toISOString().slice(0, 10),
      time: body.time || '',
      location: body.location || '',
      description: body.description || '',
      descriptionEn: body.descriptionEn || '',
      cover: body.cover || null,
      status: body.status || 'upcoming',
    };

    const updated = [newEvent, ...events];
    await writeDataFile('events.js', 'events', updated);

    return NextResponse.json({ event: newEvent }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Create failed' },
      { status: 500 }
    );
  }
}