// src/components/layout/SearchPopup.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

export default function SearchPopup() {
  const { lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const placeholder =
    lang === 'hi' ? 'कीवर्ड लिखें और एंटर दबाएं...' : 'Type keyword and hit enter';
  const buttonLabel = lang === 'hi' ? 'खोजें' : 'Search';

  // Listen for the open event
  useEffect(() => {
    const openHandler = () => setOpen(true);
    document.addEventListener('ckm:open-search', openHandler);
    return () => document.removeEventListener('ckm:open-search', openHandler);
  }, []);

  // Body scroll lock + input focus
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Esc key to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  const goTo = (href) => {
    close();
    setQuery('');
    router.push(href);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    close();
    setQuery('');
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const suggestions = [
    { hi: 'सदस्य बनें', en: 'Join Membership', href: '/join' },
    { hi: 'सूचना पट्ट', en: 'Notice Board', href: '/notice' },
    { hi: 'गैलरी', en: 'Gallery', href: '/gallery' },
    { hi: 'दान करें', en: 'Donate', href: '/donation' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="ckm-search-backdrop"
        data-open={open ? 'true' : 'false'}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel - data-open drives visibility */}
      <div
        className="ckm-search-popup"
        data-open={open ? 'true' : 'false'}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="ckm-search-inner">
          <button
            type="button"
            className="ckm-search-close"
            onClick={close}
            aria-label={lang === 'hi' ? 'बंद करें' : 'Close'}
          >
            <i className="fa-solid fa-xmark" />
          </button>

          <div className="ckm-search-wrap">
            <div className="ckm-search-head">
              <span className="ckm-search-eyebrow">
                <i className="fa-solid fa-magnifying-glass" />
                {lang === 'hi' ? 'खोजें' : 'Search'}
              </span>
              <h3 className="ckm-search-title">
                {lang === 'hi' ? 'आप क्या खोज रहे हैं?' : 'What are you looking for?'}
              </h3>
            </div>

            <form className="ckm-search-form" onSubmit={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass ckm-search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="ckm-search-input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="ckm-search-submit">
                <i className="fa-solid fa-arrow-right" />
                <span>{buttonLabel}</span>
              </button>
            </form>

            <div className="ckm-search-suggestions">
              <span className="ckm-search-sug-label">
                {lang === 'hi' ? 'लोकप्रिय खोज:' : 'Popular:'}
              </span>
              {suggestions.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  className="ckm-search-sug"
                  onClick={() => goTo(item.href)}
                >
                  {lang === 'hi' ? item.hi : item.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}