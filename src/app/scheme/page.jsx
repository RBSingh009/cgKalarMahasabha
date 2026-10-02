// src/app/scheme/page.jsx
'use client';

import { notices } from '@/data/notices';
import { useLang } from '@/context/LanguageContext';
import NoticeCard from '@/components/sections/NoticeCard';

export default function SchemeListPage() {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  const filtered = notices
    .filter((n) => n.category === 'योजना')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <main className="ckm-notice-page ckm-page-offset">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{isHi ? 'योजनाएँ' : 'Schemes'}</h1>
          <p className="ckm-banner-sub">
            {isHi
              ? 'महासंघ की योजनाएँ एवं पहलें'
              : 'Schemes and initiatives of the Mahasangh'}
          </p>
        </div>
      </section>

      <section className="ckm-notice-section sec-padding">
        <div className="ckm-container">
          <div className="ckm-notice-list">
            {filtered.map((n) => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}