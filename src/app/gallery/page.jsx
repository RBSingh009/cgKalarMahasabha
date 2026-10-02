// src/app/gallery/page.jsx
'use client';

import { useLang } from '@/context/LanguageContext';
import GalleryAlbums from '@/components/sections/GalleryAlbums';

export default function GalleryPage() {
  const { t } = useLang();

  return (
    <main className="ckm-gallery-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{t.gallery.bannerTitle}</h1>
          <p className="ckm-banner-sub">{t.gallery.bannerSub}</p>
        </div>
      </section>

      <section className="ckm-gallery-main sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              {t.gallery.albumsTitle}
            </span>
            <h2 className="ckm-head-title">{t.gallery.albumsSub}</h2>
          </div>

          <GalleryAlbums />
        </div>
      </section>
    </main>
  );
}