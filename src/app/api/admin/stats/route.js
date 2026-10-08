// src/app/api/admin/stats/route.js

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';

import { members } from '@/data/members';
import { works } from '@/data/works';
import { notices } from '@/data/notices';

/* ---------- Count events safely (may not exist) ---------- */
let eventsCount = 0;
try {
  const eventsData = await import('@/data/events');
  eventsCount = (eventsData.events || eventsData.default || []).length;
} catch {
  eventsCount = 0;
}

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const stats = {
    members: members.length,
    events: eventsCount,
    works: works.length,
    notices: notices.length,
  };

  /* Placeholder recent activity — Phase 2 will use real log */
  const recent = [
    { text: 'Welcome to CKM Admin Panel', time: 'just now', type: 'info' },
    { text: `${members.length} members loaded from data`, time: '1 min ago', type: 'success' },
    { text: `${works.length} works loaded from data`, time: '1 min ago', type: 'success' },
  ];

  return NextResponse.json({ stats, recent });
}