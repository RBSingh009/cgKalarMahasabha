// src/components/sections/Lightbox.jsx
'use client';

import { useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const { lang, t } = useLang();
  const current = photos[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!current) return null;

  return (
    <div className="ckm-lightbox" onClick={onClose}>
      <div className="ckm-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="ckm-lightbox-close"
          onClick={onClose}
          aria-label={t.gallery.lightboxClose}
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <button
          className="ckm-lightbox-nav ckm-lightbox-prev"
          onClick={onPrev}
          aria-label="Previous"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>

        <div className="ckm-lightbox-image">
          <img
            src={current.src}
            alt={lang === 'hi' ? current.captionHi : current.captionEn}
          />
        </div>

        <button
          className="ckm-lightbox-nav ckm-lightbox-next"
          onClick={onNext}
          aria-label="Next"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>

        <div className="ckm-lightbox-caption">
          <p>{lang === 'hi' ? current.captionHi : current.captionEn}</p>
          <span>
            {index + 1} / {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
}