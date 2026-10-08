// src/app/admin/news/[id]/route.js

import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* GET — single news article */
export async function GET(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const news = (await readDataFile('news.js', 'news')) || [];
    const article = news.find((n) => String(n.id) === String(id));

    if (!article) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ news: article });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* PUT — update news */
export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const news = (await readDataFile('news.js', 'news')) || [];
    const index = news.findIndex((n) => String(n.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    const updated = { ...news[index], ...body, id: news[index].id };
    news[index] = updated;
    await writeDataFile('news.js', 'news', news);

    return NextResponse.json({ news: updated });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Update failed' },
      { status: 500 }
    );
  }
}

/* DELETE — remove news */
export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const news = (await readDataFile('news.js', 'news')) || [];
    const filtered = news.filter((n) => String(n.id) !== String(id));

    if (filtered.length === news.length) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    await writeDataFile('news.js', 'news', filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Delete failed' },
      { status: 500 }
    );
  }
}