// src/components/shared/ContactWidget.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function ContactWidget() {
  const { t, lang } = useLang();
  const isHi = lang === 'hi';

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* Contact info - change here */
  const PHONE = '+919826050235';
  const WHATSAPP = '919826050235';
  const WHATSAPP_TEXT = isHi
    ? 'नमस्ते! मुझे CKM के बारे में जानकारी चाहिए।'
    : 'Hello! I would like to know more about CKM.';

  return (
    <div
      className={`ckm-cw ${open ? 'is-open' : ''}`}
      ref={wrapperRef}
      aria-label="Contact widget"
    >
      {/* Expanding channels */}
      <div className="ckm-cw-channels">
        {/* Phone */}
        <a
          href={`tel:${PHONE}`}
          className="ckm-cw-item ckm-cw-phone"
          aria-label={isHi ? 'फ़ोन करें' : 'Call us'}
          title={isHi ? 'फ़ोन करें' : 'Call us'}
        >
          <span className="ckm-cw-icon">
            <i className="fa-solid fa-phone" />
          </span>
          <span className="ckm-cw-label">
            {isHi ? 'फ़ोन करें' : 'Call'}
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ckm-cw-item ckm-cw-whatsapp"
          aria-label={isHi ? 'व्हाट्सऐप' : 'WhatsApp'}
          title={isHi ? 'व्हाट्सऐप पर संपर्क' : 'Chat on WhatsApp'}
        >
          <span className="ckm-cw-icon">
            <i className="fa-brands fa-whatsapp" />
          </span>
          <span className="ckm-cw-label">WhatsApp</span>
        </a>

        {/* Email (optional 3rd channel) */}
        <a
          href="mailto:cgkalarmahasangh@gmail.com"
          className="ckm-cw-item ckm-cw-email"
          aria-label={isHi ? 'ईमेल करें' : 'Email us'}
          title={isHi ? 'ईमेल करें' : 'Email us'}
        >
          <span className="ckm-cw-icon">
            <i className="fa-solid fa-envelope" />
          </span>
          <span className="ckm-cw-label">{isHi ? 'ईमेल' : 'Email'}</span>
        </a>
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        className="ckm-cw-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
      >
        <span className="ckm-cw-toggle-icon ckm-cw-toggle-open">
          <i className="fa-solid fa-comment-dots" />
        </span>
        <span className="ckm-cw-toggle-icon ckm-cw-toggle-close">
          <i className="fa-solid fa-xmark" />
        </span>

        {/* Hover label */}
        <span className="ckm-cw-hover-label">
          {open
            ? isHi ? 'बंद करें' : 'Close'
            : isHi ? 'संपर्क करें' : 'Contact us'}
        </span>
      </button>
    </div>
  );
}