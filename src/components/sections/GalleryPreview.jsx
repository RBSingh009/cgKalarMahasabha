// src/components/sections/GalleryPreview.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { galleryPreview } from '@/data/gallery';

export default function GalleryPreview() {
  const { lang, t } = useLang();
  const h = t.home;

  return (
    <section className="ckm-gallery-preview sec-padding">
      <div className="ckm-container">
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow">
            <span className="ckm-head-line" />
            {h.galEyebrow}
          </span>
          <h2 className="ckm-head-title">{h.galTitle}</h2>
          <p className="ckm-head-sub">{h.galDesc}</p>
        </div>

        <div className="ckm-gallery-grid">
          {galleryPreview.map((g) => (
            <Link href="/gallery" className="ckm-gallery-item" key={g.id}>
              <img src={g.image} alt={lang === 'hi' ? g.titleHi : g.titleEn} />
              <div className="ckm-gallery-overlay">
                <span className="ckm-gallery-album">{g.album}</span>
                <h4>{lang === 'hi' ? g.titleHi : g.titleEn}</h4>
                <span className="ckm-gallery-icon">
                  <i className="fa-solid fa-expand" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="ckm-gallery-cta">
          <Link href="/gallery" className="ckm-about-cta">
            {h.galViewAll} <i className="fa fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}