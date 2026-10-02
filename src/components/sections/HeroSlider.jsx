// src/components/sections/HeroSlider.jsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useLang } from '@/context/LanguageContext';

/* ⚡ Slide metadata — desktop + mobile images */
const slideMeta = [
  {
    key: 1,
    bg: '/images/hero/banner1.webp',
    bgMobile: '/images/hero/banner_m1.webp',
  },
  {
    key: 2,
    bg: '/images/hero/banner2.webp',
    bgMobile: '/images/hero/banner_m2.webp',
  },
  {
    key: 3,
    bg: '/images/hero/banner3.webp',
    bgMobile: '/images/hero/banner_m3.webp',
  },
];

export default function HeroSlider() {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);
  const { t, lang } = useLang();

  const slides = slideMeta.map((m) => ({
    bg: m.bg,
    bgMobile: m.bgMobile,
    subtitle:     t.hero[`slide${m.key}Subtitle`],
    titleLeading: t.hero[`slide${m.key}Title1`],
    titleSpan:    t.hero[`slide${m.key}Title2`],
    lead:         t.hero[`slide${m.key}Lead`],
    videoUrl:     '/videos/SliderVideo.mp4',
  }));

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Autoplay, EffectFade, Pagination],
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 1200,
      autoplay: { delay: 6500, disableOnInteraction: false },
      pagination: { el: '.hero-slider-pagination', clickable: true },
      on: {
        init(swiper) {
          animateSlide(swiper.slides[swiper.activeIndex]);
          // Initial zoom: start big, ease into place
          swiper.slides.forEach((s) => resetBgZoom(s, 1.15));
          triggerBgZoom(swiper.slides[swiper.activeIndex]);
        },

        slideChangeTransitionStart(swiper) {
          // Reset all backgrounds to big scale (no transition)
          swiper.slides.forEach((s) => resetBgZoom(s, 1.15));

          // Then animate the active one
          const active = swiper.slides[swiper.activeIndex];
          animateSlide(active);
          triggerBgZoom(active);
        },

        slideChangeTransitionEnd(swiper) {
          // Ensure active slide's zoom is at 1.0
          const active = swiper.slides[swiper.activeIndex];
          const bgs = active.querySelectorAll('.ckm-hero-bg');
          bgs.forEach((bg) => {
            bg.style.transform = 'scale(1)';
          });
        },
      },
    });

    return () => swiperInstance.current?.destroy(true, true);
  }, [lang]);

  useEffect(() => {
    Fancybox.bind('[data-fancybox="video-gallery"]', {});
    return () => {
      Fancybox.unbind('[data-fancybox="video-gallery"]');
      Fancybox.close();
    };
  }, []);

  return (
    <section className="ckm-hero">
      <div className="swiper hero-slider1" ref={swiperRef}>
        <div className="swiper-wrapper">
          {slides.map((slide, i) => (
            <div className="swiper-slide" key={i}>
              <div className="ckm-hero-slide">
                {/* ⚡ Desktop background */}
                <div
                  className="ckm-hero-bg ckm-hero-bg-desktop"
                  style={{ backgroundImage: `url("${slide.bg}")` }}
                />

                {/* ⚡ Mobile background */}
                <div
                  className="ckm-hero-bg ckm-hero-bg-mobile"
                  style={{ backgroundImage: `url("${slide.bgMobile}")` }}
                />

                <div className="ckm-hero-overlay" />

                <div className="ckm-hero-content-wrap">
                  <div className="ckm-hero-content">
                    <div className="ckm-hero-eyebrow anim1">
                      <span className="ckm-hero-line" />
                      <span className="ckm-hero-eyebrow-text">
                        {slide.subtitle}
                      </span>
                    </div>

                    <h1 className="ckm-hero-title anim2">
                      {slide.titleLeading}
                      <br />
                      <span className="ckm-hero-title-accent">
                        {slide.titleSpan}
                        <span className="ckm-hero-hand" aria-hidden="true">
                          <i className="fa-solid fa-hand-holding-heart" />
                        </span>
                      </span>
                    </h1>

                    <p className="ckm-hero-lead anim3">{slide.lead}</p>

                    <div className="ckm-hero-actions anim3">
                      <Link
                        href="/join"
                        className="ckm-hero-btn ckm-hero-btn-primary"
                      >
                        {t.hero.ctaJoin}
                        <i className="fa-solid fa-arrow-right" />
                      </Link>

                      <a
                        href={slide.videoUrl}
                        data-fancybox="video-gallery"
                        className="ckm-hero-play"
                        aria-label="Play video"
                      >
                        <i className="fa-solid fa-play" />
                      </a>
                    </div>
                  </div>
                </div>

                <span className="ckm-deco ckm-deco-star">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                </span>
                <span className="ckm-deco ckm-deco-ring" />
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination hero-slider-pagination ckm-hero-pagination" />
      </div>
    </section>
  );
}

/* ============================================================
   Reset zoom — instantly set big scale, no transition
   ============================================================ */
function resetBgZoom(slideEl, scale = 1.15) {
  if (!slideEl) return;
  const bgs = slideEl.querySelectorAll('.ckm-hero-bg');
  bgs.forEach((bg) => {
    bg.style.transition = 'none';
    bg.style.transform = `scale(${scale})`;
  });
}

/* ============================================================
   Trigger zoom — smooth shrink from current scale to 1.0
   ============================================================ */
function triggerBgZoom(slideEl) {
  if (!slideEl) return;
  const bgs = slideEl.querySelectorAll('.ckm-hero-bg');
  if (!bgs.length) return;

  // Force reflow so the reset takes effect
  void slideEl.offsetHeight;

  requestAnimationFrame(() => {
    bgs.forEach((bg) => {
      bg.style.transition = 'transform 7s cubic-bezier(0.22, 1, 0.36, 1)';
      bg.style.transform = 'scale(1)';
    });
  });
}

/* ============================================================
   Text animation — stagger in
   ============================================================ */
function animateSlide(slideEl) {
  if (!slideEl) return;
  const els = slideEl.querySelectorAll('.anim1, .anim2, .anim3');
  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
  });
  setTimeout(() => {
    els.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 0.14}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 80);
}