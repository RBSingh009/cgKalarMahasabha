// src/app/publication/[slug]/PublicationDetail.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function PublicationDetail({ item }) {
  const { lang, t } = useLang();
  const p = t.publication;

  if (!item) {
    return (
      <main className="ckm-publication-page">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">{p.notFound}</h1>
            <p className="ckm-banner-sub">{p.notFoundDesc}</p>
            <Link href="/publication" className="ckm-about-cta" style={{ marginTop: 24, display: 'inline-flex' }}>
              <i className="fa fa-arrow-left" /> {p.backToList}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const title = lang === 'hi' ? item.titleHi : item.titleEn;
  const desc = lang === 'hi' ? item.descHi : item.descEn;

  return (
    <main className="ckm-publication-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{title}</h1>
          <p className="ckm-banner-sub">{desc}</p>
        </div>
      </section>

      <section className="ckm-pub-detail sec-padding">
        <div className="ckm-container">
          <Link href="/publication" className="ckm-back-link">
            <i className="fa fa-arrow-left" /> {p.backToList}
          </Link>

          <div className="ckm-pub-detail-grid">
            <div className="ckm-pub-detail-cover">
              <img src={item.cover} alt={title} />
              <span className="ckm-pub-badge ckm-pub-badge-lg">PDF</span>
            </div>

            <div className="ckm-pub-detail-body">
              <h2>{title}</h2>
              <p className="ckm-pub-detail-desc">{desc}</p>

              <div className="ckm-pub-detail-meta">
                <div className="ckm-pub-dm">
                  <i className="fa-regular fa-file-lines" />
                  <div><small>{p.pages}</small><strong>{item.pages}</strong></div>
                </div>
                <div className="ckm-pub-dm">
                  <i className="fa-regular fa-calendar" />
                  <div><small>{p.year}</small><strong>{item.year}</strong></div>
                </div>
                <div className="ckm-pub-dm">
                  <i className="fa-solid fa-database" />
                  <div><small>Size</small><strong>{item.size}</strong></div>
                </div>
              </div>

              <div className="ckm-pub-detail-actions">
                <a href={item.pdfUrl} className="ckm-cta-btn-gold-lg" target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-download" /> {p.download}
                </a>
              </div>

              <p className="ckm-pub-preview-note">
                <i className="fa-solid fa-circle-info" /> {p.previewNote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}