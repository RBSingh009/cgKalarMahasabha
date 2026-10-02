// src/app/events/page.jsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { events, eventCategories } from '@/data/events';

export default function EventsPage() {
  const { lang, t } = useLang();
  const e = t.events;

  const [status, setStatus] = useState('all');
  const [cat, setCat] = useState('all');

  const filtered = useMemo(() => {
    return events.filter((item) => {
      const statusMatch = status === 'all' || item.status === status;
      const catMatch = cat === 'all' || item.categoryEn === cat;
      return statusMatch && catMatch;
    });
  }, [status, cat]);

  return (
    <main className="ckm-events-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{e.bannerTitle}</h1>
          <p className="ckm-banner-sub">{e.bannerSub}</p>
        </div>
      </section>

      <section className="ckm-events-main sec-padding">
        <div className="ckm-container">

          <div className="ckm-ev-filters" data-aos="fade-up">
            <div className="ckm-ev-status-tabs">
              {[
                { key: 'all', label: e.statusAll },
                { key: 'upcoming', label: e.statusUpcoming },
                { key: 'past', label: e.statusPast },
              ].map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`ckm-ev-status-tab ${status === s.key ? 'is-active' : ''}`}
                  onClick={() => setStatus(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <select
              className="ckm-ev-cat-select"
              value={cat}
              onChange={(ev) => setCat(ev.target.value)}
            >
              {eventCategories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.key === 'all' ? e.categoryAll : (lang === 'hi' ? c.hi : c.en)}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="ckm-empty-state" data-aos="fade-up">
              <i className="fa-regular fa-calendar-xmark" />
              <p>{e.noResults}</p>
            </div>
          ) : (
            <div className="ckm-ev-grid">
              {filtered.map((item, i) => (
                <article
                  key={item.id}
                  className="ckm-ev-card"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <Link href={`/events/${item.slug}`} className="ckm-ev-link">
                    <div className="ckm-ev-thumb">
                      <img src={item.image} alt={lang === 'hi' ? item.titleHi : item.titleEn} loading="lazy" />
                      <span className="ckm-ev-cat-badge">
                        {lang === 'hi' ? item.categoryHi : item.categoryEn}
                      </span>
                      <span className={`ckm-ev-status-badge is-${item.status}`}>
                        {item.status === 'upcoming' ? e.statusUpcoming : e.statusPast}
                      </span>
                    </div>

                    <div className="ckm-ev-body">
                      <div className="ckm-ev-date">
                        <span className="ckm-ev-date-day">
                          {new Date(item.date).getDate()}
                        </span>
                        <span className="ckm-ev-date-month">
                          {new Date(item.date).toLocaleString(
                            lang === 'hi' ? 'hi-IN' : 'en-US',
                            { month: 'short' }
                          )}
                        </span>
                      </div>
                      <div className="ckm-ev-info">
                        <h3>{lang === 'hi' ? item.titleHi : item.titleEn}</h3>
                        <div className="ckm-ev-meta">
                          <span><i className="fa fa-location-dot" /> {lang === 'hi' ? item.locationHi : item.locationEn}</span>
                          <span><i className="fa-regular fa-clock" /> {item.time}</span>
                        </div>
                        <span className="ckm-ev-more">
                          {e.viewDetails} <i className="fa fa-arrow-right" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}