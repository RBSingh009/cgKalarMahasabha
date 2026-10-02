// src/components/sections/GalleryAlbums.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { galleryAlbums } from '@/data/gallery';

export default function GalleryAlbums() {
  const { lang, t } = useLang();

  return (
    <div className="ckm-albums-grid">
      {galleryAlbums.map((album, index) => (
        <Link
          key={album.id}
          href={`/gallery/${album.slug}`}
          className="ckm-album-card"
          data-aos="fade-up"
          data-aos-delay={index * 80}
        >
          <div className="ckm-album-cover">
            <img
              src={album.cover}
              alt={lang === 'hi' ? album.titleHi : album.titleEn}
              loading="lazy"
            />
            <div className="ckm-album-overlay">
              <span className="ckm-album-count">
                <i className="fa-regular fa-images" />
                {album.photos.length} {t.gallery.photosCount}
              </span>
              <h3>{lang === 'hi' ? album.titleHi : album.titleEn}</h3>
              <p>{lang === 'hi' ? album.descHi : album.descEn}</p>
              <span className="ckm-album-cta">
                {t.gallery.viewAlbum} <i className="fa fa-arrow-right" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}