// src/app/api/admin/settings/route.js
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const FILE = 'settings.js';
const EXPORT_NAME = 'settings';

/* ---------- Helpers ---------- */
async function readSettings() {
  try {
    const mod = await import(`@/data/settings`);
    return mod[EXPORT_NAME] || mod.default || {};
  } catch {
    return {};
  }
}

async function writeSettings(data) {
  const filePath = path.join(DATA_DIR, FILE);
  const jsonString = JSON.stringify(data, null, 2);
  const content = `// src/data/${FILE}
// Auto-generated — last updated ${new Date().toISOString()}

export const ${EXPORT_NAME} = ${jsonString};

export default ${EXPORT_NAME};
`;
  await fs.writeFile(filePath, content, 'utf-8');
}

/* ---------- GET — read settings ---------- */
export async function GET() {
  try {
    await requireAdmin();
    const settings = await readSettings();
    return NextResponse.json({ settings });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

/* ---------- PUT — update settings ---------- */
export async function PUT(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const current = await readSettings();

    const updated = { ...current, ...body };
    await writeSettings(updated);

    return NextResponse.json({ settings: updated });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || 'Save failed' },
      { status: 500 }
    );
  }
}