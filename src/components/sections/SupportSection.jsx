// src/components/sections/SupportSection.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function SupportSection() {
  const { lang, t } = useLang();
  const h = t.home;

  return (
    <section className="ckm-support-sec">
      <div className="ckm-container">
        <div className="ckm-support-wrap">
          {/* Decorative glow */}
          <span className="ckm-support-glow glow-1" />
          <span className="ckm-support-glow glow-2" />

          <div className="ckm-support-content">
            <span className="ckm-support-eyebrow">
              <span className="ckm-support-line" />
              {lang === 'hi' ? 'सहयोग करें' : 'Support Us'}
            </span>

            <h2 className="ckm-support-title">
              {lang === 'hi'
                ? 'आपका योगदान एक जीवन बदल सकता है'
                : 'Your Contribution Can Change a Life'}
            </h2>

            <p className="ckm-support-desc">
              {lang === 'hi'
                ? 'आपका छोटा-सा योगदान किसी बच्चे को शिक्षा दे सकता है, या किसी ज़रूरतमंद परिवार को सहारा दे सकता है।'
                : 'Your small contribution can give a child education, or support a family in need.'}
            </p>

            <div className="ckm-support-actions">
              <Link href="/donation" className="ckm-support-btn primary">
                <i className="fa-solid fa-heart" />
                {lang === 'hi' ? 'दान करें' : 'Donate Now'}
              </Link>

              <Link href="/join" className="ckm-support-btn outline">
                <i className="fa-solid fa-hand-holding-heart" />
                {lang === 'hi' ? 'जुड़ें' : 'Join Now'}
              </Link>
            </div>
          </div>

          {/* Decorative side rings */}
          <span className="ckm-support-ring ring-1" />
          <span className="ckm-support-ring ring-2" />
        </div>
      </div>
    </section>
  );
}