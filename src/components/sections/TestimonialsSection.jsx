// src/components/sections/TestimonialsSection.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { testimonials } from '@/data/testimonials';

const AUTOPLAY_MS = 6500;

export default function TestimonialsSection() {
  const { lang, t } = useLang();
  const h = t.home || {};

  const eyebrow =
    h.testEyebrow || (lang === 'hi' ? 'समाज की आवाज़' : 'Voices of the Community');
  const title =
    h.testTitle || (lang === 'hi' ? 'हमारे बारे में लोग क्या कहते हैं' : 'What People Say About Us');
  const desc =
    h.testDesc ||
    (lang === 'hi'
      ? 'समाज के सदस्यों के अनुभव एवं विचार।'
      : 'Experiences and thoughts from our community members.');

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const startRef = useRef(0);

  const total = testimonials.length;

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      setActive((i) => (i + 1) % total);
    }, AUTOPLAY_MS);

    return () => clearTimeout(timerRef.current);
  }, [active, paused, total]);

  const goTo = (i) => {
    setActive(i);
    setPaused(false);
  };

  const prev = () => goTo((active - 1 + total) % total);
  const next = () => goTo((active + 1) % total);

  if (!testimonials || total === 0) return null;

  const current = testimonials[active];

  return (
    <section className="ckm-testi sec-padding">
      {/* Decorative background elements */}
      <span className="ckm-testi-blob ckm-testi-blob-1" aria-hidden="true" />
      <span className="ckm-testi-blob ckm-testi-blob-2" aria-hidden="true" />

      <div className="ckm-container">
        {/* ---------- Heading ---------- */}
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow" data-aos="fade-up">
            <span className="ckm-head-line" />
            {eyebrow}
          </span>
          <h2 className="ckm-head-title" data-aos="fade-up" data-aos-delay="100">
            {title}
          </h2>
          <p className="ckm-head-sub" data-aos="fade-up" data-aos-delay="200">
            {desc}
          </p>
        </div>

        {/* ---------- Slider ---------- */}
        <div
          className="ckm-testi-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-aos="fade-up"
        >
          {/* Big background quote */}
          <span className="ckm-testi-bgquote" aria-hidden="true">
            <i className="fa-solid fa-quote-right" />
          </span>

          {/* Avatar strip on the left */}
          <aside className="ckm-testi-avatars">
            {testimonials.map((tst, i) => (
              <button
                key={tst.id}
                className={`ckm-testi-avatar ${i === active ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
              >
                <img
                  src={tst.avatar}
                  alt={lang === 'hi' ? tst.nameHi : tst.nameEn}
                  loading="lazy"
                />
              </button>
            ))}
          </aside>

          {/* Main card */}
          <article className="ckm-testi-card" key={current.id}>
            {/* Top: stars + quote mark */}
            <div className="ckm-testi-top">
              <div className="ckm-testi-stars" aria-label="5 star rating">
                {[0, 1, 2, 3, 4].map((i) => (
                  <i className="fa-solid fa-star" key={i} />
                ))}
              </div>
              <span className="ckm-testi-mark">
                <i className="fa-solid fa-quote-left" />
              </span>
            </div>

            {/* Quote */}
            <p className="ckm-testi-quote">
              {lang === 'hi' ? current.quoteHi : current.quoteEn}
            </p>

            {/* Author */}
            <footer className="ckm-testi-author">
              <div className="ckm-testi-author-line" />
              <div className="ckm-testi-author-info">
                <strong>
                  {lang === 'hi' ? current.nameHi : current.nameEn}
                </strong>
                <span>
                  {lang === 'hi' ? current.cityHi : current.cityEn}
                </span>
              </div>
            </footer>

            {/* Progress bar (auto-play visual) */}
            <div className="ckm-testi-progress">
              <span
                className={`ckm-testi-progress-fill ${paused ? 'paused' : ''}`}
                style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                key={active}
              />
            </div>
          </article>

          {/* Nav buttons */}
          <button
            className="ckm-testi-nav ckm-testi-prev"
            onClick={prev}
            aria-label="Previous testimonial"
            type="button"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            className="ckm-testi-nav ckm-testi-next"
            onClick={next}
            aria-label="Next testimonial"
            type="button"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        {/* Bottom dots (extra mobile navigation) */}
        <div className="ckm-testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={i === active ? 'active' : ''}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}