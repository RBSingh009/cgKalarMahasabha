// src/app/activity/[id]/page.jsx
import NoticeDetailClient from '@/components/notice/NoticeDetailClient';
import { notices } from '@/data/notices';

export function generateStaticParams() {
  return notices
    .filter((n) => n.category === 'कार्यक्रम')
    .map((n) => ({ id: String(n.id) }));
}

export const dynamicParams = false;

export default function Page({ params }) {
  return (
    <NoticeDetailClient
      params={params}
      expectedCategory="कार्यक्रम"
      backHref="/activity"
    />
  );
}