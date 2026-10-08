// src/app/api/admin/gallery/[id]/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* PUT — update album */
export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const albums = (await readDataFile('gallery.js', 'galleryAlbums')) || [];
    const index = albums.findIndex((a) => String(a.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: 'Album not found' }, { status: 404 });
    }

    const updated = { ...albums[index], ...body, id: albums[index].id };
    albums[index] = updated;
    await writeDataFile('gallery.js', 'galleryAlbums', albums);

    return NextResponse.json({ album: updated });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Update failed' },
      { status: 500 }
    );
  }
}

/* DELETE — remove album */
export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const albums = (await readDataFile('gallery.js', 'galleryAlbums')) || [];
    const filtered = albums.filter((a) => String(a.id) !== String(id));

    if (filtered.length === albums.length) {
      return NextResponse.json({ message: 'Album not found' }, { status: 404 });
    }

    await writeDataFile('gallery.js', 'galleryAlbums', filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Delete failed' },
      { status: 500 }
    );
  }
}