// src/app/api/admin/members/route.js
import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile, generateId } from '@/lib/adminData';
import { requireAdmin } from '@/lib/adminAuth';

/* ---------- GET — list all members ---------- */
export async function GET() {
  try {
    await requireAdmin();
    const members = (await readDataFile('members.js', 'members')) || [];
    return NextResponse.json({ members });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* ---------- POST — create a new member ---------- */
export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const members = (await readDataFile('members.js', 'members')) || [];

    const nextId = members.length
      ? Math.max(...members.map((m) => Number(m.id) || 0)) + 1
      : 1;

    const tierPrefix =
      body.tier === 'patron'
        ? 'P'
        : body.tier === 'life'
        ? 'L'
        : 'G';

    const newMember = {
      id: nextId,
      name: body.name || '',
      nameHi: body.nameHi || body.name || '',
      nameEn: body.nameEn || '',
      role: body.role || '',
      roleHi: body.roleHi || body.role || '',
      roleEn: body.roleEn || '',
      tier: body.tier || 'general',
      photo: body.photo || '',
      district: body.district || '',
      memberId: body.memberId || generateId(`CKM-${tierPrefix}`),
      socials: { facebook: '', twitter: '', linkedin: '' },

      phone: body.phone || '',
      email: body.email || '',
      status: body.status || 'pending',
      paymentStatus: body.paymentStatus || 'unpaid',
      idProof: body.idProof || null,
      idType: body.idType || null,
      termsAccepted: true,
      termsAcceptedAt: new Date().toISOString(),
      activatedAt: body.status === 'active' ? new Date().toISOString() : null,
      activatedBy: body.status === 'active' ? 'admin' : null,
      totalDonated: 0,
      joinedAt: new Date().toISOString().slice(0, 10),
    };

    const updated = [newMember, ...members];
    await writeDataFile('members.js', 'members', updated);

    return NextResponse.json({ member: newMember }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Create failed' },
      { status: 500 }
    );
  }
}