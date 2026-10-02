// src/components/sections/PublicationPreview.jsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useLang } from '@/context/LanguageContext';
import { publications } from '@/data/publications';

export default function PublicationPreview() {
  const { lang, t } = useLang();
  const h = t.home || {};

  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  const eyebrow = h.pubEyebrow || (lang === 'hi' ? 'प्रकाशन' : 'Publications');
  const title = h.pubTitle || (lang === 'hi' ? 'डाउनलोड करें' : 'Downloads');
  const desc =
    h.pubDesc ||
    (lang === 'hi'
      ? 'महासंघ की महत्वपूर्ण फाइलें एवं दस्तावेज़।'
      : 'Important files and documents of the Mahasangh.');
  const viewAll =
    h.pubViewAll ||
    (lang === 'hi' ? 'सभी प्रकाशन देखें' : 'View All Publications');
  const pagesLabel = h.pubPages || (lang === 'hi' ? 'पेज' : 'pages');

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Autoplay, Navigation, Pagination],
      slidesPerView: 1.15,
      spaceBetween: 20,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.ckm-pub-preview-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.ckm-pub-preview-next',
        prevEl: '.ckm-pub-preview-prev',
      },
      breakpoints: {
        576: { slidesPerView: 1.5 },
        768: { slidesPerView: 2.2 },
        992: { slidesPerView: 3.1 },
        1200: { slidesPerView: 4.2 },
      },
    });

    return () => swiperInstance.current?.destroy(true, true);
  }, []);

  return (
    <section className="ckm-pub-preview sec-padding">
      <div className="ckm-container">
        {/* Heading */}
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

        {/* Swiper carousel */}
        <div className="ckm-pub-preview-wrap" data-aos="fade-up" data-aos-delay="300">
          {/* Custom prev/next arrows */}
          <button
            className="ckm-pub-preview-prev"
            aria-label="Previous"
            type="button"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            className="ckm-pub-preview-next"
            aria-label="Next"
            type="button"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>

          <div className="swiper ckm-pub-swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {publications.map((p) => (
                <div className="swiper-slide" key={p.id}>
                  <article className="ckm-pub-card">
                    <Link
                      href={`/publication/${p.slug}`}
                      className="ckm-pub-cover-wrap"
                    >
                      <img
                        src={p.cover}
                        alt={lang === 'hi' ? p.titleHi : p.titleEn}
                        loading="lazy"
                        width={300}
                        height={400}
                      />
                      <span className="ckm-pub-badge">PDF</span>
                    </Link>

                    <div className="ckm-pub-body">
                      <h3>{lang === 'hi' ? p.titleHi : p.titleEn}</h3>
                      <p className="ckm-pub-desc">
                        {lang === 'hi' ? p.descHi : p.descEn}
                      </p>

                      {/* Stats row - like reference's raised/goal */}
                      <div className="ckm-pub-stat-row">
                        <span>
                          <i className="fa-regular fa-calendar" />
                          {p.year}
                        </span>
                        <span>
                          <i className="fa-regular fa-file-lines" />
                          {p.pages} {pagesLabel}
                        </span>
                      </div>

                      {/* Download CTA */}
                      <Link
                        href={`/publication/${p.slug}`}
                        className="ckm-pub-btn ckm-pub-btn-gold ckm-pub-btn-block"
                      >
                        <i className="fa-solid fa-download" />
                        {lang === 'hi' ? 'डाउनलोड करें' : 'Download'}
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="swiper-pagination ckm-pub-preview-pagination" />
          </div>
        </div>

        {/* View all */}
        <div className="ckm-pub-cta">
          <Link href="/publication" className="ckm-about-cta">
            {viewAll} <i className="fa fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}