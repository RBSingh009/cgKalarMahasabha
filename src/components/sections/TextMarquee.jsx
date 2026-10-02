// src/components/sections/TextMarquee.jsx
'use client';

import { useLang } from '@/context/LanguageContext';
import { marqueeItems } from '@/data/marquee';

export default function TextMarquee() {
  const { lang } = useLang();

  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <section className="ckm-marquee" aria-hidden="true">
      <div className="ckm-marquee-track">
        {loop.map((item, i) => (
          <div className="ckm-marquee-item" key={i}>
            <span
              className={`ckm-marquee-text ${
                i % 2 === 0 ? 'is-solid' : 'is-outline'
              }`}
            >
              {lang === 'hi' ? item.hi : item.en}
            </span>
            <span className="ckm-marquee-sep">
              <span className="ckm-marquee-sep-inner" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}