// src/components/sections/ActivitiesSection.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { activities } from '@/data/activities';

export default function ActivitiesSection() {
  const { lang, t } = useLang();
  const h = t.home || {};

  const eyebrow =
    h.actEyebrow || (lang === 'hi' ? 'हम क्या करते हैं' : 'How We Make a Difference');
  const title =
    h.actTitle || (lang === 'hi' ? 'हमारी सामाजिक पहलें' : 'Support Our Mission and Make a Difference');
  const desc =
    h.actDesc || (lang === 'hi' ? 'शिक्षा से स्वास्थ्य तक, हम समाज के हर वर्ग की सेवा में समर्पित हैं।' : 'From education to healthcare, we are dedicated to serving every section of society.');
  const learnMore =
    h.actLearnMore || (lang === 'hi' ? 'विवरण देखें' : 'View Details');

  return (
    <section className="ckm-activities sec-padding position-relative">
      <div className="ckm-container">
        {/* Heading */}
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow" data-aos="fade-up">
            <span className="ckm-head-line" />
            {eyebrow}
          </span>
          <h2 className="ckm-head-title" data-aos="fade-up" data-aos-delay="100">
            {title}
          </h2>
          <p className="ckm-head-sub" data-aos="fade-up" data-aos-delay="200">
            {desc}
          </p>
        </div>

        {/* Cards grid */}
        <div className="ckm-activities-grid">
          {activities.map((a, i) => (
            <Link
              href={a.href}
              className="ckm-activity-card"
              key={a.id}
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 100}
            >
              <div className="ckm-activity-icon">
                <i className={`fa-solid ${a.icon}`} />
              </div>
              <h3>{lang === 'hi' ? a.titleHi : a.titleEn}</h3>
              <p>{lang === 'hi' ? a.descHi : a.descEn}</p>
              <span className="ckm-activity-link">
                {learnMore} <i className="fa fa-arrow-right" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}