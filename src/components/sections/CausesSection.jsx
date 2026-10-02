// src/components/sections/CausesSection.jsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { jarallax } from 'jarallax';

import 'swiper/css';
import 'swiper/css/pagination';

import { causes } from '@/data/causes';

export default function CausesSection() {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);
  const sectionRef = useRef(null);

  // Init Swiper
  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.causes-pagination',
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });

    return () => swiperInstance.current?.destroy(true, true);
  }, []);

  // Init Jarallax for the parallax background
  useEffect(() => {
    if (!sectionRef.current) return;

    jarallax(sectionRef.current, { speed: 0.7 });

    return () => {
      jarallax(sectionRef.current, 'destroy');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="causes-sec sec-padding jarallax"
      data-jarallax
      data-speed=".7"
    >
      <img src="/images/cause-bg.jpg" alt="" className="jarallax-img" />

      {/* Floating decorative images */}
      <img src="/images/an-anim1.png" alt="" className="anim-img rotate" />
      <img
        src="/images/ab-anim2.png"
        alt=""
        className="anim-img right-top zoom"
      />
      <img
        src="/images/ab-anim-3.png"
        alt=""
        className="anim-img moveY left-bottom"
      />
      <img
        src="/images/ab-anim4.png"
        alt=""
        className="anim-img rotate right-bottom"
      />

      <div className="container ct-container">
        {/* Intro */}
        <div className="sec-intro text-center mx-auto">
          <span className="sub-title">Start donating poor people</span>
          <h2 className="sec-title">
            See You Impact Transparent Donation Causes
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="swiper causes-carousel" ref={swiperRef}>
              <div className="swiper-wrapper">
                {causes.map((c, i) => (
                  <div className="swiper-slide" key={i}>
                    <div className="cause-entry bg-white round">
                      <div className="cause-thumb">
                        <Link href={c.href}>
                          <img
                            className="img-fluid"
                            src={c.img}
                            alt="Causes"
                          />
                        </Link>
                      </div>

                      <div className="cause-txt">
                        <div className="prog-stat">
                          <div className="progress">
                            <div className="meta">Donation</div>
                            <div
                              className="progress-bar"
                              data-progress={`${c.progress}%`}
                              style={{ width: `${c.progress}%` }}
                            >
                              <span>{c.progress}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between donate-stat">
                          <small>Raised {c.raised}</small>
                          <small>Goal {c.goal}</small>
                        </div>

                        <h3>
                          <Link href={c.href}>{c.title}</Link>
                        </h3>

                        <Link
                          className="btn btn-xs btn-primary"
                          href={c.href}
                        >
                          Donate Now <i className="fa fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="swiper-pagination causes-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}