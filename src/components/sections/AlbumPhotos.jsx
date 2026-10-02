// src/components/sections/AlbumPhotos.jsx
'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function AlbumPhotos({ album }) {
  const { lang, t } = useLang();
  const isHi = lang === 'hi';

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const photos = album?.photos || [];
  const title = album ? (isHi ? album.titleHi : album.titleEn) : '';

  /* ---------- Keyboard nav + scroll lock ---------- */
  useEffect(() => {
    if (lightboxIndex < 0) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(-1);
      if (e.key === 'ArrowLeft')
        setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight')
        setLightboxIndex((i) => (i + 1) % photos.length);
    };

    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex, photos.length]);

  /* ---------- Empty state ---------- */
  if (!photos.length) {
    return (
      <div className="ckm-empty-state">
        <i className="fa-regular fa-image" />
        <p>{t.gallery.noPhotos}</p>
      </div>
    );
  }

  const current = lightboxIndex >= 0 ? photos[lightboxIndex] : null;

  /* ---------- Helpers ---------- */
  const close = () => setLightboxIndex(-1);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  const nextPhoto = () =>
    setLightboxIndex((i) => (i + 1) % photos.length);

  const imgFallback = (e) => {
    e.currentTarget.src =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7c0f12"/>
              <stop offset="1" stop-color="#400707"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#g)"/>
          <text x="400" y="310" font-size="32" fill="#E9D08C"
                text-anchor="middle" font-family="sans-serif">CKM Gallery</text>
        </svg>`
      );
  };

  return (
    <>
      {/* ============================================================
          PHOTO GRID
          ============================================================ */}
      <div className="ckm-album-photos-grid">
        {photos.map((photo, i) => (
          <figure
            key={photo.id || i}
            className="ckm-album-photo"
            data-aos="zoom-in"
            data-aos-delay={(i % 6) * 60}
          >
            <button
              type="button"
              className="ckm-album-photo-img"
              onClick={() => setLightboxIndex(i)}
              aria-label={
                isHi
                  ? photo.captionHi || title
                  : photo.captionEn || title
              }
            >
              <img
                src={photo.src}
                alt={
                  isHi
                    ? photo.captionHi || title
                    : photo.captionEn || title
                }
                loading="lazy"
                onError={imgFallback}
              />
              <span className="ckm-album-photo-overlay">
                <i className="fa-solid fa-expand" />
              </span>
            </button>

            {(photo.captionHi || photo.captionEn) && (
              <figcaption className="ckm-album-photo-caption">
                {isHi
                  ? photo.captionHi || photo.captionEn
                  : photo.captionEn || photo.captionHi}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* ============================================================
          LIGHTBOX
          ============================================================ */}
      {current && (
        <div
          className="ckm-lightbox"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Close */}
          <button
            type="button"
            className="ckm-lightbox-close"
            onClick={close}
            aria-label={t.gallery.lightboxClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              type="button"
              className="ckm-lightbox-nav ckm-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              aria-label="Previous"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
          )}

          {/* Image + caption */}
          <div
            className="ckm-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ckm-lightbox-image">
              <img
                src={current.src}
                alt={
                  isHi
                    ? current.captionHi || title
                    : current.captionEn || title
                }
                onError={imgFallback}
              />
            </div>

            <div className="ckm-lightbox-caption">
              <p>
                {isHi
                  ? current.captionHi || current.captionEn || ''
                  : current.captionEn || current.captionHi || ''}
              </p>
              <span>
                {lightboxIndex + 1} / {photos.length}
              </span>
            </div>
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              type="button"
              className="ckm-lightbox-nav ckm-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              aria-label="Next"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          )}
        </div>
      )}
    </>
  );
}