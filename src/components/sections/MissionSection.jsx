// src/components/sections/MissionSection.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { initiatives } from '@/data/initiatives';

export default function MissionSection() {
  const { lang, t } = useLang();
  const h = t.home || {};

  const eyebrow =
    h.actEyebrow || (lang === 'hi' ? 'हम कैसे बदलाव लाते हैं' : 'How We Make a Difference');
  const title =
    h.actTitle ||
    (lang === 'hi'
      ? 'हमारे मिशन का समर्थन करें और बदलाव लाएं'
      : 'Support Our Mission and Make a Difference');
  const learnMore =
    h.actLearnMore || (lang === 'hi' ? 'विवरण देखें' : 'View Details');

  return (
    <section className="ckm-mission-ref sec-padding">
      {/* Decorative heart-hands (top-left) */}
      <img
        src="/images/love-alt.png"
        alt=""
        className="ckm-mission-ref-deco"
        aria-hidden="true"
      />

      <div className="ckm-container">
        {/* ---------- Heading ---------- */}
        <div className="ckm-mission-ref-head">
          <div className="ckm-mission-ref-eyebrow" data-aos="fade-up">
            <span className="ckm-mr-line">
              <span className="ckm-mr-arrow" />
            </span>
            <span className="ckm-mr-text">{eyebrow}</span>
            <span className="ckm-mr-line ckm-mr-line-right">
              <span className="ckm-mr-arrow ckm-mr-arrow-right" />
            </span>
          </div>

          <h2
            className="ckm-mission-ref-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {title}
          </h2>
        </div>

        {/* ---------- 4 Cards ---------- */}
        <div className="ckm-mission-ref-grid">
          {initiatives.map((item, i) => (
            <article
              className="ckm-mission-ref-card"
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 120}
            >
              {/* Circular icon with dotted ring decoration */}
              <div className="ckm-mrc-icon-wrap">
                <span className="ckm-mrc-ring" aria-hidden="true" />
                <span className="ckm-mrc-icon">
                  <i className={`fa-solid ${item.icon}`} />
                </span>
              </div>

              <h3 className="ckm-mrc-title">
                {lang === 'hi' ? item.titleHi : item.titleEn}
              </h3>

              <p className="ckm-mrc-desc">
                {lang === 'hi' ? item.descHi : item.descEn}
              </p>

              <Link href={item.href} className="ckm-mrc-link">
                {learnMore}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}