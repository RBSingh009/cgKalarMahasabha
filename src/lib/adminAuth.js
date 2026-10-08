// src/lib/adminAuth.js

/* ============================================================
   ADMIN AUTH — Simple cookie-based authentication
   Phase 1: Hardcoded credentials (no database)
   ============================================================ */

import { cookies } from 'next/headers';

/* ---------- Admin credentials (Phase 1) ---------- */
const ADMIN_CREDENTIALS = {
  email: 'admin@ckm.org',
  password: 'admin123',
  name: 'Admin',
  role: 'admin',
};

/* ---------- Cookie name ---------- */
export const ADMIN_COOKIE_NAME = 'ckm_admin_token';

/* ---------- Validate credentials ---------- */
export function validateAdminCredentials(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPassword = String(password || '');

  if (
    normalizedEmail === ADMIN_CREDENTIALS.email &&
    normalizedPassword === ADMIN_CREDENTIALS.password
  ) {
    return {
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role,
    };
  }

  return null;
}

/* ---------- Generate admin token ---------- */
export function generateAdminToken() {
  return `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/* ---------- Get current admin from cookies (server-side) ---------- */
export async function getAdminFromCookies() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) return null;
    if (!token.startsWith('admin_')) return null;

    return {
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role,
    };
  } catch {
    return null;
  }
}

/* ---------- Check if request is authenticated ---------- */
export async function requireAdmin() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    throw new Error('Unauthorized');
  }
  return admin;
}