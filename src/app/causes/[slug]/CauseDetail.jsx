// src/app/causes/[slug]/CauseDetail.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function CauseDetail({ cause }) {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  if (!cause) {
    return (
      <main className="ckm-publication-page">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">
              {isHi ? 'पहल नहीं मिली' : 'Cause Not Found'}
            </h1>
            <Link href="/work" className="ckm-about-cta" style={{ marginTop: 24, display: 'inline-flex' }}>
              <i className="fa fa-arrow-left" /> {isHi ? 'सभी पहल' : 'All Causes'}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const title = isHi ? cause.titleHi || cause.title : cause.titleEn || cause.title;

  return (
    <main className="ckm-publication-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{title}</h1>
        </div>
      </section>
      <section className="ckm-pub-detail sec-padding">
        <div className="ckm-container">
          <Link href="/work" className="ckm-back-link" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <i className="fa fa-arrow-left" /> {isHi ? 'सभी पहल' : 'All Causes'}
          </Link>
          <div className="ckm-pub-detail-grid">
            <div className="ckm-pub-detail-cover">
              <img src={cause.img || cause.image} alt={title} />
            </div>
            <div className="ckm-pub-detail-body">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}