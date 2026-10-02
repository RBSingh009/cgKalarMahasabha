// src/app/events/[slug]/EventDetail.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { events } from '@/data/events';

export default function EventDetail({ event }) {
  const { lang, t } = useLang();
  const e = t.events;
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!event || event.status !== 'upcoming') return;
    const target = new Date(event.date).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setCountdown({ d: 0, h: 0, m: 0, s: 0 });
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const int = setInterval(tick, 1000);
    return () => clearInterval(int);
  }, [event]);

  if (!event) {
    return (
      <main className="ckm-events-page">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">{e.notFound}</h1>
            <Link href="/events" className="ckm-about-cta" style={{ marginTop: 24, display: 'inline-flex' }}>
              <i className="fa fa-arrow-left" /> {e.backToEvents}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const title = lang === 'hi' ? event.titleHi : event.titleEn;
  const content = lang === 'hi' ? event.contentHi : event.contentEn;
  const location = lang === 'hi' ? event.locationHi : event.locationEn;
  const category = lang === 'hi' ? event.categoryHi : event.categoryEn;
  const related = events.filter((x) => x.id !== event.id).slice(0, 3);

  return (
    <main className="ckm-events-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <span className="ckm-news-cat-pill">{category}</span>
          <h1 className="ckm-banner-title">{title}</h1>
          <div className="ckm-news-detail-meta">
            <span><i className="fa-regular fa-calendar" /> {lang === 'hi' ? event.dateHi : event.dateEn}</span>
            <span><i className="fa-regular fa-clock" /> {event.time}</span>
            <span><i className="fa fa-location-dot" /> {location}</span>
          </div>
        </div>
      </section>

      <section className="ckm-ev-detail sec-padding">
        <div className="ckm-container">
          <Link href="/events" className="ckm-back-link">
            <i className="fa fa-arrow-left" /> {e.backToEvents}
          </Link>

          <div className="ckm-ev-detail-grid">
            <div className="ckm-ev-detail-left">
              <div className="ckm-ev-detail-hero">
                <img src={event.image} alt={title} />
              </div>
              <div className="ckm-ev-detail-content">
                {content.split('\n').map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>

            <aside className="ckm-ev-detail-right">
              <div className="ckm-ev-info-card">
                {event.status === 'upcoming' && (
                  <div className="ckm-ev-countdown">
                    <div className="ckm-ev-cd-grid">
                      <div><strong>{countdown.d}</strong><small>{e.countdownDays}</small></div>
                      <div><strong>{countdown.h}</strong><small>{e.countdownHours}</small></div>
                      <div><strong>{countdown.m}</strong><small>{e.countdownMins}</small></div>
                      <div><strong>{countdown.s}</strong><small>{e.countdownSecs}</small></div>
                    </div>
                  </div>
                )}
                <div className="ckm-ev-info-row">
                  <span className="ckm-ev-info-icon"><i className="fa-regular fa-calendar" /></span>
                  <div><small>{e.date}</small><strong>{lang === 'hi' ? event.dateHi : event.dateEn}</strong></div>
                </div>
                <div className="ckm-ev-info-row">
                  <span className="ckm-ev-info-icon"><i className="fa-regular fa-clock" /></span>
                  <div><small>{e.time}</small><strong>{event.time}</strong></div>
                </div>
                <div className="ckm-ev-info-row">
                  <span className="ckm-ev-info-icon"><i className="fa fa-location-dot" /></span>
                  <div><small>{e.location}</small><strong>{location}</strong></div>
                </div>
                {event.status === 'upcoming' && (
                  <Link href="/contact" className="ckm-cta-btn-gold-lg ckm-ev-register">
                    <i className="fa-solid fa-user-plus" /> {e.registerBtn}
                  </Link>
                )}
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="ckm-ev-related">
              <h3 className="ckm-pub-related-title">{e.relatedEvents}</h3>
              <div className="ckm-ev-related-grid">
                {related.map((r) => (
                  <Link key={r.id} href={`/events/${r.slug}`} className="ckm-ev-related-card">
                    <div className="ckm-ev-related-thumb">
                      <img src={r.image} alt={lang === 'hi' ? r.titleHi : r.titleEn} />
                    </div>
                    <h4>{lang === 'hi' ? r.titleHi : r.titleEn}</h4>
                    <span className="ckm-ev-related-date">{lang === 'hi' ? r.dateHi : r.dateEn}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}