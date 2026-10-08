// src/lib/adminData.js
// SERVER-ONLY — do not import in client components

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

export async function readDataFile(fileName, exportName) {
  try {
    const module = await import(`@/data/${fileName}`);
    const data = module[exportName] || module.default;
    return Array.isArray(data) ? data : null;
  } catch (err) {
    console.error(`Read failed for ${fileName}:`, err.message);
    return null;
  }
}

export async function writeDataFile(fileName, exportName, data) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    const jsonString = JSON.stringify(data, null, 2);
    const content = `// src/data/${fileName}
// Auto-generated — last updated ${new Date().toISOString()}

export const ${exportName} = ${jsonString};

export default ${exportName};
`;
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (err) {
    console.error(`Write failed for ${fileName}:`, err.message);
    throw new Error('Write failed — sirf local me kaam karega');
  }
}

export function generateId(prefix = 'CKM') {
  const num = Math.floor(100000 + Math.random() * 900000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${num}`;
}
