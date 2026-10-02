// src/app/activity/page.jsx
'use client';

import { notices } from '@/data/notices';
import { useLang } from '@/context/LanguageContext';
import NoticeCard from '@/components/sections/NoticeCard';

export default function ActivityListPage() {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  const filtered = notices
    .filter((n) => n.category === 'कार्यक्रम')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <main className="ckm-notice-page ckm-page-offset">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">
            {isHi ? 'गतिविधियाँ' : 'Activities'}
          </h1>
          <p className="ckm-banner-sub">
            {isHi
              ? 'महासंघ की गतिविधियाँ एवं कार्यक्रम'
              : 'Activities and programs of the Mahasangh'}
          </p>
        </div>
      </section>

      <section className="ckm-notice-section sec-padding">
        <div className="ckm-container">
          {filtered.length === 0 ? (
            <div className="ckm-notice-empty">
              <i className="fa-regular fa-calendar-xmark" />
              <p>
                {isHi
                  ? 'कोई गतिविधि उपलब्ध नहीं है।'
                  : 'No activities available.'}
              </p>
            </div>
          ) : (
            <div className="ckm-notice-list">
              {filtered.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}