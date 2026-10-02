// src/app/notice/[id]/page.jsx
// ✅ Server component - can export generateStaticParams
import NoticeDetailClient from './NoticeDetailClient';
import { notices } from '@/data/notices';

/* Required only if `output: 'export'` is set in next.config.
   Harmless otherwise. */
export function generateStaticParams() {
  return notices.map((n) => ({ id: String(n.id) }));
}

export const dynamicParams = false;

export default function NoticeDetailPage({ params }) {
  return <NoticeDetailClient params={params} />;
}