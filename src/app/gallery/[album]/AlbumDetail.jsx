// src/app/gallery/[album]/AlbumDetail.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import AlbumPhotos from '@/components/sections/AlbumPhotos';

export default function AlbumDetail({ album }) {
  const { lang, t } = useLang();

  if (!album) {
    return (
      <main className="ckm-gallery-page">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">{t.gallery.notFound}</h1>
            <Link href="/gallery" className="ckm-about-cta" style={{ marginTop: 24, display: 'inline-flex' }}>
              <i className="fa fa-arrow-left" /> {t.gallery.backToAlbums}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="ckm-gallery-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">
            {lang === 'hi' ? album.titleHi : album.titleEn}
          </h1>
          <p className="ckm-banner-sub">
            {lang === 'hi' ? album.descHi : album.descEn}
          </p>
        </div>
      </section>

      <section className="ckm-album-detail sec-padding">
        <div className="ckm-container">
          <div className="ckm-album-detail-head">
            <Link href="/gallery" className="ckm-back-link">
              <i className="fa fa-arrow-left" /> {t.gallery.backToAlbums}
            </Link>
            <span className="ckm-album-count-badge">
              <i className="fa-regular fa-images" />
              {album.photos.length} {t.gallery.photosCount}
            </span>
          </div>
          <AlbumPhotos album={album} />
        </div>
      </section>
    </main>
  );
}