// src/components/layout/LanguageSwitcher.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import { LANGUAGES } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div className="ckm-lang-switcher" ref={ref}>
      <button
        type="button"
        className="ckm-lang-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Change language"
      >
        <i className="fa-solid fa-globe" />
        <span>{current.label}</span>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'} ckm-lang-caret`} />
      </button>

      {open && (
        <ul className="ckm-lang-menu">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className={`ckm-lang-option ${l.code === lang ? 'active' : ''}`}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
              >
                <span className="ckm-lang-code">{l.short}</span>
                <span>{l.label}</span>
                {l.code === lang && <i className="fa-solid fa-check" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}