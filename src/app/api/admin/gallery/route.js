// src/app/api/admin/gallery/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* GET — list all albums */
export async function GET() {
  try {
    await requireAdmin();
    const albums = (await readDataFile('gallery.js', 'galleryAlbums')) || [];
    return NextResponse.json({ albums });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* POST — create album */
export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const albums = (await readDataFile('gallery.js', 'galleryAlbums')) || [];

    const nextId = albums.length
      ? Math.max(...albums.map((a) => Number(a.id) || 0)) + 1
      : 1;

    const newAlbum = {
      id: nextId,
      slug: body.slug || `album-${nextId}`,
      titleHi: body.titleHi || '',
      titleEn: body.titleEn || '',
      descHi: body.descHi || '',
      descEn: body.descEn || '',
      cover: body.cover || '',
      photos: Array.isArray(body.photos) ? body.photos : [],
    };

    const updated = [newAlbum, ...albums];
    await writeDataFile('gallery.js', 'galleryAlbums', updated);

    return NextResponse.json({ album: newAlbum }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Create failed' },
      { status: 500 }
    );
  }
}