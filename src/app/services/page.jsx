// src/app/services/page.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function ServicesPage() {
  const { lang, t } = useLang();
  const s = t.servicesPage;
  const services = s.services || [];

  return (
    <main className="ckm-services-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{s.bannerTitle}</h1>
          <p className="ckm-banner-sub">{s.bannerSub}</p>
        </div>
      </section>

      <section className="ckm-services-main sec-padding">
        <div className="ckm-container">
          <div className="ckm-services-grid">
            {services.map((item, i) => (
              <article
                key={i}
                className="ckm-service-card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="ckm-service-icon">
                  <i className={`fa-solid ${item.icon || 'fa-star'}`} />
                </div>
                <h3>{lang === 'hi' ? item.titleHi : item.titleEn}</h3>
                <p>{lang === 'hi' ? item.descHi : item.descEn}</p>
                <Link href="/contact" className="ckm-service-link">
                  {s.learnMore} <i className="fa fa-arrow-right" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}