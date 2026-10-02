// src/components/sections/WorkAndNotice.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { works } from '@/data/works';
import { notices } from '@/data/notices';
// import './work-notice.css'; // remove this line if you import the CSS in globals.css instead

const SLIDE_INTERVAL = 5000;
const SECONDS_PER_NOTICE = 6; // controls how fast the notice list scrolls

export default function WorkAndNotice() {
  const { lang, t } = useLang();
  const h = t.home || {};

  const workEyebrow = h.workEyebrow || (lang === 'hi' ? 'हमारा कार्य' : 'Our Work');
  const workTitle = h.workTitle || (lang === 'hi' ? 'हाल के सामाजिक कार्य' : 'Recent Social Work');
  const workReadMore = h.workReadMore || (lang === 'hi' ? 'विवरण पढ़ें' : 'Read More');
  const workViewAll = h.workViewAll || (lang === 'hi' ? 'सभी कार्य देखें' : 'View All Work');
  const noticeTitle = lang === 'hi' ? 'सूचना पट्ट' : 'Notice Board';
  const noticeViewAll = lang === 'hi' ? 'सभी सूचनाएं देखें' : 'View All Notices';

  const [workIndex, setWorkIndex] = useState(0);
  const workTimer = useRef(null);
  const featuredWorks = works.slice(0, 5);

  useEffect(() => {
    workTimer.current = setInterval(() => {
      setWorkIndex((i) => (i + 1) % featuredWorks.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(workTimer.current);
  }, [featuredWorks.length]);

  const goToWork = (i) => {
    clearInterval(workTimer.current);
    setWorkIndex(i);
    workTimer.current = setInterval(() => {
      setWorkIndex((p) => (p + 1) % featuredWorks.length);
    }, SLIDE_INTERVAL);
  };

  // Notices are doubled so the CSS scroll (translateY -50%) loops seamlessly
  const noticeItems = [...notices, ...notices];

  return (
    <section className="ckm-wn sec-padding">
      <div className="ckm-container">
        <div className="ckm-wn-grid">

          {/* ==========================================
              LEFT - Work slider
              ========================================== */}
          <div className="ckm-wn-left">
            {/* Header */}
            <header className="ckm-wn-header">
              <span className="ckm-wn-eyebrow">
                <span className="ckm-wn-eyebrow-line" />
                {workEyebrow}
              </span>
              <h2 className="ckm-wn-title">{workTitle}</h2>
            </header>

            {/* Slider card */}
            <div className="ckm-wn-slider">
              {featuredWorks.map((w, i) => (
                <article
                  key={w.id}
                  className={`ckm-wn-slide ${i === workIndex ? 'is-active' : ''}`}
                  aria-hidden={i !== workIndex}
                >
                  <div className="ckm-wn-slide-media">
                    <img
                      src={w.image}
                      alt={lang === 'hi' ? w.titleHi : w.titleEn}
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <span className="ckm-wn-slide-cat">
                      {lang === 'hi' ? w.categoryHi : w.categoryEn}
                    </span>
                  </div>

                  <div className="ckm-wn-slide-body">
                    <span className="ckm-wn-slide-date">
                      <i className="fa-regular fa-calendar" />
                      {lang === 'hi' ? w.dateHi : w.dateEn}
                    </span>
                    <h3>{lang === 'hi' ? w.titleHi : w.titleEn}</h3>
                    <p>{lang === 'hi' ? w.excerptHi : w.excerptEn}</p>
                    <Link href={`/work/${w.slug}`} className="ckm-wn-slide-btn">
                      {workReadMore} <i className="fa fa-arrow-right" />
                    </Link>
                  </div>
                </article>
              ))}

              {/* Dots - bottom-right of the card body, on the button row */}
              <div className="ckm-wn-slide-dots">
                {featuredWorks.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === workIndex ? 'is-active' : ''}
                    onClick={() => goToWork(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === workIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>

            {/* View-all button aligned under the card */}
            <Link href="/work" className="ckm-wn-viewall">
              {workViewAll} <i className="fa fa-arrow-right" />
            </Link>
          </div>

          {/* ==========================================
              RIGHT - Notice board (matches left column height)
              ========================================== */}
          <aside className="ckm-wn-right">
            <div className="ckm-wn-notice">
              {/* Header */}
              <header className="ckm-wn-notice-head">
                <span className="ckm-wn-notice-icon">
                  <i className="fa-solid fa-bullhorn" />
                </span>
                <h3>{noticeTitle}</h3>
              </header>

              {/* Scrolling list */}
              <div className="ckm-wn-notice-scroller">
                <div
                  className="ckm-wn-notice-track"
                  style={{
                    '--wn-notice-duration': `${notices.length * SECONDS_PER_NOTICE}s`,
                  }}
                >
                  {noticeItems.map((n, i) => {
                    const isClone = i >= notices.length;

                    return (
                      <Link
                        href="/notice"
                        className={`ckm-wn-notice-card${isClone ? ' is-clone' : ''}`}
                        key={`${n.id}-${i}`}
                        aria-hidden={isClone || undefined}
                        tabIndex={isClone ? -1 : undefined}
                      >
                        <div className="ckm-wn-notice-card-top">
                          <span className="ckm-wn-notice-cat">
                            <i
                              className={
                                n.category === 'सूचना'
                                  ? 'fa-solid fa-bullhorn'
                                  : n.category === 'योजना'
                                  ? 'fa-solid fa-hand-holding-heart'
                                  : 'fa-solid fa-calendar-days'
                              }
                            />
                            {lang === 'hi' ? n.category : n.categoryEn}
                          </span>
                          {n.important && (
                            <span className="ckm-wn-notice-important">
                              {lang === 'hi' ? 'महत्वपूर्ण' : 'Important'}
                            </span>
                          )}
                        </div>

                        <h4>{lang === 'hi' ? n.title : n.titleEn}</h4>

                        <span className="ckm-wn-notice-date">
                          <i className="fa-regular fa-calendar" />
                          {new Date(n.publishedAt).toLocaleDateString(
                            lang === 'hi' ? 'hi-IN' : 'en-IN',
                            {
                              day: 'numeric',
                              // full month name in Hindi avoids the broken "जन*" glyph
                              month: lang === 'hi' ? 'long' : 'short',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Footer link */}
              <footer className="ckm-wn-notice-foot">
                <Link href="/notice" className="ckm-wn-notice-cta">
                  {noticeViewAll} <i className="fa fa-arrow-right" />
                </Link>
              </footer>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}