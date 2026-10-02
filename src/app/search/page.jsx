// src/app/search/page.jsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { news } from '@/data/news';
import { notices } from '@/data/notices';
import { works } from '@/data/works';
import { events } from '@/data/events';
import { publications } from '@/data/publications';

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResults />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <main className="ckm-search-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">Loading…</h1>
        </div>
      </section>
    </main>
  );
}

function SearchResults() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const q = searchParams.get('q')?.toLowerCase() || '';

  const results = [];

  if (q) {
    news.forEach((n) => {
      const match =
        n.title?.toLowerCase().includes(q) ||
        n.excerpt?.toLowerCase().includes(q);
      if (match)
        results.push({
          type: 'news',
          title: n.title,
          href: `/news/${n.slug}`,
          category: lang === 'hi' ? 'समाचार' : 'News',
        });
    });

    notices.forEach((n) => {
      const title = lang === 'hi' ? n.title : n.titleEn;
      const match =
        n.title?.toLowerCase().includes(q) ||
        (n.titleEn && n.titleEn.toLowerCase().includes(q));
      if (match)
        results.push({
          type: 'notice',
          title,
          href: `/notice`,
          category: lang === 'hi' ? 'सूचना' : 'Notice',
        });
    });

    works.forEach((w) => {
      const title = lang === 'hi' ? w.titleHi : w.titleEn;
      if (title?.toLowerCase().includes(q))
        results.push({
          type: 'work',
          title,
          href: `/work/${w.slug}`,
          category: lang === 'hi' ? 'कार्य' : 'Work',
        });
    });

    events.forEach((e) => {
      const title = lang === 'hi' ? e.titleHi : e.titleEn;
      if (title?.toLowerCase().includes(q))
        results.push({
          type: 'event',
          title,
          href: `/events/${e.slug}`,
          category: lang === 'hi' ? 'कार्यक्रम' : 'Event',
        });
    });

    publications.forEach((p) => {
      const title = lang === 'hi' ? p.titleHi : p.titleEn;
      if (title?.toLowerCase().includes(q))
        results.push({
          type: 'publication',
          title,
          href: `/publication/${p.slug}`,
          category: lang === 'hi' ? 'प्रकाशन' : 'Publication',
        });
    });
  }

  return (
    <main className="ckm-search-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">
            {lang === 'hi' ? 'खोज परिणाम' : 'Search Results'}
          </h1>
          <p className="ckm-banner-sub">
            {q
              ? lang === 'hi'
                ? `"${q}" के लिए ${results.length} परिणाम मिले`
                : `${results.length} results for "${q}"`
              : lang === 'hi'
              ? 'कुछ खोजें'
              : 'Search something'}
          </p>
        </div>
      </section>

      <section className="ckm-search-main sec-padding">
        <div className="ckm-container">
          {results.length === 0 ? (
            <div className="ckm-empty-state">
              <i className="fa-solid fa-magnifying-glass" />
              <p>
                {lang === 'hi'
                  ? 'कोई परिणाम नहीं मिला।'
                  : 'No results found.'}
              </p>
            </div>
          ) : (
            <div className="ckm-search-results">
              {results.map((r, i) => (
                <Link key={i} href={r.href} className="ckm-search-item">
                  <span className="ckm-search-item-cat">{r.category}</span>
                  <h3>{r.title}</h3>
                  <i className="fa-solid fa-arrow-right" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}