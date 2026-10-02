// src/app/faq/page.jsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { faqs, faqCategories } from '@/data/faqs';

export default function FaqPage() {
  const { lang, t } = useLang();
  const f = t.faqPage;

  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(null);

  const filtered = useMemo(
    () => faqs.filter((x) => cat === 'all' || x.category === cat),
    [cat]
  );

  return (
    <main className="ckm-faq-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{f.bannerTitle}</h1>
          <p className="ckm-banner-sub">{f.bannerSub}</p>
        </div>
      </section>

      <section className="ckm-faq-main sec-padding">
        <div className="ckm-container">
          {/* Filter tabs */}
          <div className="ckm-faq-filters" data-aos="fade-up">
            {faqCategories.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`ckm-faq-filter ${cat === c.key ? 'is-active' : ''}`}
                onClick={() => { setCat(c.key); setOpen(null); }}
              >
                {c.key === 'all' ? f.filterAll : (lang === 'hi' ? c.hi : c.en)}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="ckm-faq-accordion">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`ckm-faq-item ${open === item.id ? 'is-open' : ''}`}
                data-aos="fade-up"
                data-aos-delay={i * 40}
              >
                <button
                  type="button"
                  className="ckm-faq-q"
                  onClick={() => setOpen(open === item.id ? null : item.id)}
                  aria-expanded={open === item.id}
                >
                  <span>{lang === 'hi' ? item.qHi : item.qEn}</span>
                  <i className="fa-solid fa-chevron-down" />
                </button>
                {open === item.id && (
                  <div className="ckm-faq-a">
                    <p>{lang === 'hi' ? item.aHi : item.aEn}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="ckm-faq-cta" data-aos="fade-up">
            <div className="ckm-faq-cta-inner">
              <div>
                <h3>{f.stillHaveQuestions}</h3>
                <p>{f.stillHaveQuestionsDesc}</p>
              </div>
              <Link href="/contact" className="ckm-cta-btn-gold-lg">
                <i className="fa-solid fa-envelope" /> {f.contactCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}