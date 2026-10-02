// src/components/sections/AboutSection.jsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { aboutGalleries } from "@/data/about";

export default function AboutSection() {
  const counterRef = useRef(null);
  const { t } = useLang();
  const a = t.aboutSection;

  /* Counter animation */
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const target = parseInt(el.dataset.purecounterEnd, 10) || 0;
    const currency = el.dataset.purecounterCurrency || "";
    const duration = 2000;
    let started = false;

    const runCounter = () => {
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = `${current.toLocaleString("en-IN")}${currency}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            runCounter();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Reset counter on language change */
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const target = parseInt(el.dataset.purecounterEnd, 10) || 0;
    const currency = el.dataset.purecounterCurrency || "";
    el.textContent = `${target.toLocaleString("en-IN")}${currency}`;
  }, [t]);

  return (
    <section className="about-sec ckm-about sec-padding position-relative">
      <img
        src="/images/love-alt.png"
        alt=""
        className="anim-img moveYS left-bottom"
      />
      <img
        src="/images/ab-sh2.png"
        className="position-absolute end-0 bottom-0"
        alt=""
      />

      <div className="container">
        <div className="row ckm-about-row">
          {/* ============================================
              LEFT: Image collage
              ============================================ */}
          <div className="col-xl-6 col-lg-5 ckm-about-col">
            <div className="ckm-about-collage">
              {/* Main big image */}
              <img
                src={aboutGalleries.main}
                alt="About Mahasangh"
                className="ckm-collage-main"
              />

              {/* Small overlay image */}
              <img
                src={aboutGalleries.small}
                alt="Community"
                className="ckm-collage-small"
              />

              {/* ❌ REMOVED: 15+ badge (ckm-collage-badge) */}

              {/* ⚡ 25,000+ Auto-counting stat card */}
              <div className="about-stat-25k">
                <span
                  ref={counterRef}
                  data-purecounter-end="25000"
                  data-purecounter-currency="+"
                  className="purecounter-25k"
                >
                  0
                </span>
                <p className="about-stat-25k-label">{a.activeMembers}</p>
              </div>
            </div>
          </div>

          {/* ============================================
              RIGHT: Content (unchanged)
              ============================================ */}
          <div className="col-xl-6 col-lg-7 ckm-about-col">
            <div className="about-content">
              <span className="sub-title single">{a.subtitle}</span>

              <h2 className="sec-title">{a.title}</h2>

              <p>{a.para1}</p>

              <div
                className="about-features my-4"
                style={{ backgroundImage: 'url("/images/ft-bg.png")' }}
              >
                <div className="af-item d-flex">
                  <span>
                    <img src="/images/af1.png" alt="" />
                  </span>
                  <div className="ms-3">
                    <h3 className="display-4">{a.feature1Title}</h3>
                    <p>{a.feature1Text}</p>
                  </div>
                </div>

                <div className="af-item d-flex">
                  <span>
                    <img src="/images/af2.png" alt="" />
                  </span>
                  <div className="ms-3">
                    <h3 className="display-4">{a.feature2Title}</h3>
                    <p>{a.feature2Text}</p>
                  </div>
                </div>
              </div>

              <p className="lead">{a.lead}</p>

              <div className="d-sm-flex align-items-center about-footer gap-4 mt-4">
                <Link className="btn btn-primary" href="/about">
                  {a.discover} <i className="fa fa-arrow-right"></i>
                </Link>

                <div className="quick-call">
                  <span className="icon-lg">
                    <i className="fa-solid fa-phone-volume"></i>
                  </span>
                  <div className="conn-txt ms-3">
                    <small>{a.callUs}</small>
                    <a href="tel:+919826050235">+91 98260 50235</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}