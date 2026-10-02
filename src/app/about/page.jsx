// src/app/about/page.jsx
"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import {
  aboutStats,
  timeline,
  values,
  focusAreas,
  aboutGalleries,
} from "@/data/about";
import { members } from "@/data/members";
import KalachuriRulersSection from "@/components/sections/KalachuriRulersSection";

export default function AboutPage() {
  const { lang, t } = useLang();
  const a = t.aboutPage;
  const isHi = lang === "hi";

  return (
    <main className="ckm-about-page">
      {/* ============================================
          1. BANNER
          ============================================ */}
      <section className="ckm-page-banner ckm-about-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{a.bannerTitle}</h1>
          <nav className="ckm-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{a.breadcrumbHome}</Link>
            <span className="ckm-bc-sep">›</span>
            <span className="ckm-bc-current">{a.bannerTitle}</span>
          </nav>
          <p className="ckm-banner-sub">{a.bannerSub}</p>
        </div>
      </section>

      {/* ============================================
          2. INTRO (image collage + text)
          ============================================ */}
      <section className="ckm-about-intro4 sec-padding" data-aos="fade-up">
        <div className="ckm-container">
          <div className="ckm-about-intro4-grid">
            <div className="ckm-about-collage">
              <img
                src={aboutGalleries.main}
                alt="About Mahasangh"
                className="ckm-collage-main"
              />
              <img
                src={aboutGalleries.small}
                alt="Community"
                className="ckm-collage-small"
              />
              <div className="ckm-collage-badge">
                <span className="ckm-cb-number">15</span>
                <span className="ckm-cb-suffix">+</span>
                <p className="ckm-cb-label">{a.yearsExp}</p>
              </div>
            </div>

            <div className="ckm-about-intro4-content">
              <span className="ckm-head-eyebrow">
                <span className="ckm-head-line" />
                {a.introSubtitle}
              </span>
              <h2 className="ckm-about-intro4-title">{a.introTitle}</h2>
              <p className="ckm-about-para">{a.introPara1}</p>
              <p className="ckm-about-para">{a.introPara2}</p>

              <div className="ckm-about-chips">
                <div className="ckm-chip">
                  <span className="ckm-chip-icon">
                    <i className="fa-solid fa-heart" />
                  </span>
                  <span className="ckm-chip-text">{a.trustedOrg}</span>
                </div>
                <div className="ckm-chip">
                  <span className="ckm-chip-icon">
                    <i className="fa-solid fa-hand-holding-dollar" />
                  </span>
                  <span className="ckm-chip-text">{a.helpDonation}</span>
                </div>
              </div>

              <ul className="ckm-about-checklist">
                <li>
                  <i className="fa-solid fa-circle-check" />
                  {a.aboutFeature1}
                </li>
                <li>
                  <i className="fa-solid fa-circle-check" />
                  {a.aboutFeature2}
                </li>
                <li>
                  <i className="fa-solid fa-circle-check" />
                  {a.aboutFeature3}
                </li>
                <li>
                  <i className="fa-solid fa-circle-check" />
                  {a.aboutFeature4}
                </li>
              </ul>

              <div className="ckm-about-cta-row">
                <Link href="/donation" className="ckm-about-cta">
                  {a.ctaDonate} <i className="fa-solid fa-arrow-right" />
                </Link>
                <div className="ckm-about-call">
                  <span className="ckm-call-icon">
                    <i className="fa-solid fa-phone-volume" />
                  </span>
                  <div className="ckm-call-text">
                    <small>{a.callUs}</small>
                    <a href="tel:+919826050235">+91 98260 50235</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          3. STATS STRIP
          ============================================ */}
      <section className="ckm-about-stats">
        <div className="ckm-container">
          <div className="ckm-about-stats-grid">
            {aboutStats.map((s, i) => (
              <div
                className="ckm-about-stat"
                key={s.id}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <strong>
                  {s.value.toLocaleString("en-IN")}
                  {s.suffix}
                </strong>
                <span>{isHi ? s.labelHi : s.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          4. STORY BLOCKS (pride, society, politics, service, resolve)
          ============================================ */}
      <section className="ckm-about-story sec-padding">
        <div className="ckm-container">
          <div className="ckm-about-story-grid">
            {/* Pride */}
            <article className="ckm-story-card" data-aos="fade-up">
              <div className="ckm-story-icon">
                <i className="fa-solid fa-crown" />
              </div>
              <h2>{a.prideTitle}</h2>
              <p>{a.pridePara1}</p>
              <p>{a.pridePara2}</p>
            </article>

            {/* Society */}
            <article
              className="ckm-story-card"
              data-aos="fade-up"
              data-aos-delay="80"
            >
              <div className="ckm-story-icon">
                <i className="fa-solid fa-handshake-angle" />
              </div>
              <h2>{a.societyTitle}</h2>
              <p>{a.societyPara1}</p>
              <p>{a.societyPara2}</p>
            </article>

            {/* Politics */}
            <article
              className="ckm-story-card"
              data-aos="fade-up"
              data-aos-delay="160"
            >
              <div className="ckm-story-icon">
                <i className="fa-solid fa-landmark-flag" />
              </div>
              <h2>{a.politicsTitle}</h2>
              <p>{a.politicsPara1}</p>
              <p>{a.politicsPara2}</p>
            </article>

            {/* Service */}
            <article
              className="ckm-story-card"
              data-aos="fade-up"
              data-aos-delay="240"
            >
              <div className="ckm-story-icon">
                <i className="fa-solid fa-hand-holding-heart" />
              </div>
              <h2>{a.serviceTitle}</h2>
              <p>{a.servicePara1}</p>
              <p>{a.servicePara2}</p>
            </article>

            {/* Resolve */}
            <article
              className="ckm-story-card ckm-story-card-wide"
              data-aos="fade-up"
              data-aos-delay="320"
            >
              <div className="ckm-story-icon">
                <i className="fa-solid fa-flag" />
              </div>
              <h2>{a.resolveTitle}</h2>
              <p>{a.resolvePara1}</p>
              <p>{a.resolvePara2}</p>
              <p>{a.resolvePara3}</p>
            </article>
          </div>

          {/* Closing quote */}
          <blockquote className="ckm-about-quote" data-aos="fade-up">
            <i className="fa-solid fa-quote-left ckm-about-quote-mark" />
            <p>{a.closingQuote}</p>
            <footer>
              <strong>{a.closingLine1}</strong>
              <span>{a.closingLine2}</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============================================
          5. VALUES
          ============================================ */}
      <section className="ckm-about-values sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              {a.valuesSub}
            </span>
            <h2 className="ckm-head-title">{a.valuesTitle}</h2>
          </div>

          <div className="ckm-values-grid">
            {values.map((v, i) => (
              <div
                className="ckm-value-card"
                key={v.id}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="ckm-value-icon">
                  <i className={`fa-solid ${v.icon}`} />
                </div>
                <h3>{isHi ? v.titleHi : v.titleEn}</h3>
                <p>{isHi ? v.textHi : v.textEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          6. FOCUS AREAS
          ============================================ */}
      <section className="ckm-focus-sec sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              {a.focusSub}
            </span>
            <h2 className="ckm-head-title">{a.focusTitle}</h2>
          </div>

          <div className="ckm-focus-grid">
            {focusAreas.map((f, i) => (
              <div
                className="ckm-focus-card"
                key={f.id}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="ckm-focus-icon">
                  <i className={`fa-solid ${f.icon}`} />
                </div>
                <h3>{isHi ? f.titleHi : f.titleEn}</h3>
                <ul>
                  {(isHi ? f.itemsHi : f.itemsEn).map((item, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-angle-right" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          7. TIMELINE
          ============================================ */}
      <section className="ckm-timeline-sec sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              {a.timelineSub}
            </span>
            <h2 className="ckm-head-title">{a.timelineTitle}</h2>
          </div>

          <div className="ckm-timeline">
            {timeline.map((item, i) => (
              <div
                className={`ckm-tl-item ${i % 2 === 0 ? "left" : "right"}`}
                key={i}
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div className="ckm-tl-year">{item.year}</div>
                <div className="ckm-tl-dot" />
                <div className="ckm-tl-card">
                  <h4>{isHi ? item.titleHi : item.titleEn}</h4>
                  <p>{isHi ? item.textHi : item.textEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
    7. KALACHURI RULERS (historical data)
    ============================================ */}
      <KalachuriRulersSection />

      {/* ============================================
          9. TEAM PREVIEW
          ============================================ */}
      <section className="ckm-about-team sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              {a.teamSub}
            </span>
            <h2 className="ckm-head-title">{a.teamTitle}</h2>
          </div>

          {/* Team preview */}
          <div className="ckm-about-team-grid">
            {members.slice(0, 4).map((m, i) => (
              <div
                className="ckm-about-team-card"
                key={m.id}
                data-aos="zoom-in"
                data-aos-delay={i * 80}
              >
                <div className="ckm-at-photo img-wrap">
                  <div className="ckm-at-user-icon" aria-label={m.name}>
                    <i className="fa-solid fa-user" />
                  </div>

                  <div className="ckm-at-overlay">
                    <div className="ckm-at-socials">
                      <a
                        href={m.socials?.facebook || "#"}
                        aria-label="Facebook"
                      >
                        <i className="fa-brands fa-facebook-f" />
                      </a>
                      <a href={m.socials?.twitter || "#"} aria-label="Twitter">
                        <i className="fa-brands fa-x-twitter" />
                      </a>
                      <a
                        href={m.socials?.linkedin || "#"}
                        aria-label="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="ckm-at-info">
                  {/* ⚡ Bilingual name */}
                  <h3>
                    {isHi ? m.nameHi || m.name || "" : m.nameEn || m.name || ""}
                  </h3>

                  {/* ⚡ Bilingual role */}
                  <span>
                    {isHi ? m.roleHi || m.role || "" : m.roleEn || m.role || ""}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="ckm-about-team-cta">
            <Link href="/team" className="ckm-about-cta">
              {a.teamViewAll} <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          9. CTA BAND
          ============================================ */}
      <section className="ckm-donate-cta">
        <div className="ckm-donate-cta-deco ckm-donate-cta-deco-1" />
        <div className="ckm-donate-cta-deco ckm-donate-cta-deco-2" />

        <div className="ckm-container">
          <div className="ckm-donate-cta-inner">
            <span className="ckm-donate-cta-eyebrow">
              <i className="fa-solid fa-hand-holding-heart" />
              {isHi ? "सहयोग करें" : "Support Us"}
            </span>

            <h2 className="ckm-donate-cta-title">{a.ctaTitle}</h2>
            <p className="ckm-donate-cta-desc">{a.ctaSub}</p>

            <div className="ckm-donate-cta-actions">
              <Link href="/donation" className="ckm-cta-btn-gold-lg">
                <i className="fa-solid fa-heart" /> {a.ctaDonate}
              </Link>
              <Link href="/join" className="ckm-cta-btn-ghost-lg">
                {a.ctaJoin} <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
