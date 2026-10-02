// src/app/scholarships/page.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function ScholarshipsPage() {
  const { lang, t } = useLang();
  const s = t.scholarshipsPage;

  return (
    <main className="ckm-scholarships-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{s.bannerTitle}</h1>
          <p className="ckm-banner-sub">{s.bannerSub}</p>
        </div>
      </section>

      {/* Hero */}
      <section className="ckm-sch-hero sec-padding">
        <div className="ckm-container">
          <div className="ckm-sch-hero-inner" data-aos="fade-up">
            <h2>{s.heroTitle}</h2>
            <p>{s.heroDesc}</p>
            <div className="ckm-sch-hero-actions">
              <Link href="/join" className="ckm-cta-btn-gold-lg">
                <i className="fa-solid fa-pen-to-square" /> {s.applyNow}
              </Link>
              <Link href="/publication/scholarship-form-2026" className="ckm-cta-btn-ghost-lg">
                <i className="fa-solid fa-download" /> {s.downloadForm}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info blocks */}
      <section className="ckm-sch-blocks sec-padding">
        <div className="ckm-container">

          {/* Eligibility */}
          <div className="ckm-sch-block" data-aos="fade-up">
            <div className="ckm-sch-block-icon">
              <i className="fa-solid fa-clipboard-check" />
            </div>
            <h3>{s.eligibilityTitle}</h3>
            <ul>
              <li><i className="fa-solid fa-check" /> {s.eligibility1}</li>
              <li><i className="fa-solid fa-check" /> {s.eligibility2}</li>
              <li><i className="fa-solid fa-check" /> {s.eligibility3}</li>
              <li><i className="fa-solid fa-check" /> {s.eligibility4}</li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="ckm-sch-block" data-aos="fade-up" data-aos-delay="80">
            <div className="ckm-sch-block-icon">
              <i className="fa-solid fa-gift" />
            </div>
            <h3>{s.benefitsTitle}</h3>
            <ul>
              <li><i className="fa-solid fa-star" /> {s.benefits1}</li>
              <li><i className="fa-solid fa-star" /> {s.benefits2}</li>
              <li><i className="fa-solid fa-star" /> {s.benefits3}</li>
              <li><i className="fa-solid fa-star" /> {s.benefits4}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="ckm-sch-steps sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <h2 className="ckm-head-title">{s.howToTitle}</h2>
          </div>

          <div className="ckm-sch-steps-grid">
            {[s.step1, s.step2, s.step3, s.step4].map((step, i) => (
              <div
                key={i}
                className="ckm-sch-step"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <span className="ckm-sch-step-num">{i + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents + Deadline */}
      <section className="ckm-sch-docs sec-padding">
        <div className="ckm-container">
          <div className="ckm-sch-docs-grid">
            <div className="ckm-sch-docs-block" data-aos="fade-right">
              <h3>{s.docsTitle}</h3>
              <ul>
                {[s.doc1, s.doc2, s.doc3, s.doc4, s.doc5].map((d, i) => (
                  <li key={i}>
                    <i className="fa-regular fa-file-lines" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ckm-sch-deadline-block" data-aos="fade-left">
              <div className="ckm-sch-deadline-icon">
                <i className="fa-solid fa-hourglass-half" />
              </div>
              <span className="ckm-sch-deadline-label">{s.deadlineTitle}</span>
              <h3>{s.deadline}</h3>
              <p>{s.deadlineDesc}</p>
              <Link href="/join" className="ckm-cta-btn-gold-lg">
                <i className="fa-solid fa-pen-to-square" /> {s.applyNow}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}