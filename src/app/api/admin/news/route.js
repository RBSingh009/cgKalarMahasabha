// src/app/api/admin/news/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* GET — list all news */
export async function GET() {
  try {
    await requireAdmin();
    const news = (await readDataFile('news.js', 'news')) || [];
    return NextResponse.json({ news });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* POST — create news */
export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const news = (await readDataFile('news.js', 'news')) || [];

    const nextId = news.length
      ? Math.max(...news.map((n) => Number(n.id) || 0)) + 1
      : 1;

    const newArticle = {
      id: nextId,
      slug: body.slug || `news-${nextId}`,
      title: body.title || '',
      excerpt: body.excerpt || '',
      content: body.content || '',
      cover: body.cover || '',
      category: body.category || '',
      author: body.author || '',
      publishedAt: body.publishedAt || new Date().toISOString().slice(0, 10),
      tags: Array.isArray(body.tags) ? body.tags : [],
    };

    const updated = [newArticle, ...news];
    await writeDataFile('news.js', 'news', updated);

    return NextResponse.json({ news: newArticle }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Create failed' },
      { status: 500 }
    );
  }
}