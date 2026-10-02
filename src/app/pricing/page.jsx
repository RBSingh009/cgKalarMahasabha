// src/app/pricing/page.jsx
"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { tiers } from "@/data/tiers";

export default function PricingPage() {
  const { lang, t } = useLang();
  const p = t.pricingPage;
  const isHi = lang === "hi";

  /* Collect all unique features across tiers */
  const allFeatures = Array.from(
    new Set(
      tiers.flatMap((tier) => (isHi ? tier.featuresHi : tier.featuresEn)),
    ),
  );

  /* Constitution-based value comparison */
  const valueRows = [
    {
      labelHi: "सदस्यता शुल्क",
      labelEn: "Membership Fee",
      general: isHi ? "₹500/माह या ₹6,000/वर्ष" : "₹500/month or ₹6,000/year",
      life: "₹10,000",
      patron: "₹50,000",
    },
    {
      labelHi: "प्रकार",
      labelEn: "Type",
      general: isHi ? "मासिक / वार्षिक" : "Monthly / Yearly",
      life: isHi ? "आजीवन" : "Lifetime",
      patron: isHi ? "संरक्षक" : "Patron",
    },
    {
      labelHi: "नवीनीकरण",
      labelEn: "Renewal",
      general: isHi ? "हर वर्ष / माह" : "Every year / month",
      life: isHi ? "आवश्यक नहीं" : "Not required",
      patron: isHi ? "आवश्यक नहीं" : "Not required",
    },
    {
      labelHi: "संरक्षक में अपग्रेड",
      labelEn: "Upgrade to Patron",
      general: "-",
      life: isHi ? "₹40,000 अतिरिक्त" : "₹40,000 extra",
      patron: isHi ? "सीधे" : "Direct",
    },
    {
      labelHi: "कुल राशि (संरक्षक तक)",
      labelEn: "Total to reach Patron",
      general: "-",
      life: isHi ? "₹50,000 (10,000 + 40,000)" : "₹50,000 (10,000 + 40,000)",
      patron: "₹50,000",
    },
  ];

  /* Constitution-based terms */
  const terms = [
    {
      titleHi: "संरक्षक सदस्य",
      titleEn: "Patron Member",
      bodyHi:
        "संस्था को ₹50,000 एक मुश्त अभिदान देने वाले संरक्षक सदस्य होंगे।",
      bodyEn:
        "Members who contribute ₹50,000 as a one-time donation become Patron Members.",
    },
    {
      titleHi: "आजीवन सदस्य",
      titleEn: "Life Member",
      bodyHi:
        "₹10,000 अभिदान देने वाले आजीवन सदस्य होंगे। ₹40,000 अतिरिक्त देकर संरक्षक सदस्य बन सकते हैं।",
      bodyEn:
        "Members who contribute ₹10,000 become Life Members. Can upgrade to Patron by paying an additional ₹40,000.",
    },
    {
      titleHi: "साधारण सदस्य",
      titleEn: "General Member",
      bodyHi:
        "₹500 माह या ₹6,000 वार्षिक अभिदान देने वाले साधारण सदस्य होंगे। 6 माह तक अभिदान न देने पर सदस्यता समाप्त हो जाएगी।",
      bodyEn:
        "Members who contribute ₹500 monthly or ₹6,000 annually become General Members. Membership lapses if donation is not paid for 6 months.",
    },
  ];

  return (
    <main className="ckm-pricing-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{p.bannerTitle}</h1>
          <p className="ckm-banner-sub">{p.bannerSub}</p>
        </div>
      </section>

      {/* ============ TIER CARDS ============ */}
      <section className="ckm-pricing-cards sec-padding">
        <div className="ckm-container">
          <div className="ckm-tiers-grid">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`ckm-tier-card ${tier.popular ? "popular" : ""}`}
                data-aos="fade-up"
              >
                {tier.popular && (
                  <span className="ckm-tier-badge">
                    <i className="fa-solid fa-star" />
                    {isHi ? "प्रसिद्ध" : "Popular"}
                  </span>
                )}

                <h3 className="ckm-tier-name">
                  {isHi ? tier.nameHi : tier.nameEn}
                </h3>

                {/* ===== PRICE BLOCK (DYNAMIC) ===== */}
                <div className="ckm-tier-price">
                  <div className="ckm-tier-price-main">
                    <strong>{tier.price}</strong>
                    <small>{isHi ? tier.periodHi : tier.periodEn}</small>
                  </div>

                  {tier.priceAlt && (
                    <div className="ckm-tier-price-alt">
                      <strong>{tier.priceAlt}</strong>
                      <small>
                        {isHi ? tier.periodAltHi : tier.periodAltEn}
                      </small>
                    </div>
                  )}
                </div>

                <ul className="ckm-tier-features">
                  {(isHi ? tier.featuresHi : tier.featuresEn).map((f, i) => (
                    <li key={i}>
                      <i className="fa-solid fa-circle-check" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {tier.noteHi && (
                  <p className="ckm-tier-note">
                    <i className="fa-solid fa-circle-info" />
                    <span>{isHi ? tier.noteHi : tier.noteEn}</span>
                  </p>
                )}

                {/* Upgrade / Dual path */}
                {tier.upgrade && (
                  <div className="ckm-tier-upgrade">
                    <span className="ckm-tier-upgrade-badge">
                      <i className="fa-solid fa-arrow-up" />
                      {isHi ? tier.upgrade.badgeHi : tier.upgrade.badgeEn}
                    </span>
                    <span className="ckm-tier-upgrade-text">
                      <i className="fa-solid fa-crown" />
                      <span>
                        {isHi ? tier.upgrade.textHi : tier.upgrade.textEn}
                      </span>
                    </span>
                    <small className="ckm-tier-upgrade-note">
                      {isHi ? tier.upgrade.noteHi : tier.upgrade.noteEn}
                    </small>
                  </div>
                )}

                <Link
                  href="/join"
                  className={`ckm-tier-btn ${tier.popular ? "gold" : ""}`}
                >
                  {p.joinTier} <i className="fa fa-arrow-right" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUE COMPARISON TABLE ============ */}
      <section className="ckm-pricing-compare sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <h2 className="ckm-head-title">{p.compareTitle}</h2>
            <p className="ckm-head-sub">{p.compareSub}</p>
          </div>

          <div className="ckm-pricing-table-wrap">
            <table className="ckm-pricing-table">
              <thead>
                <tr>
                  <th>{p.feature}</th>
                  {tiers.map((tier) => (
                    <th key={tier.id}>{isHi ? tier.nameHi : tier.nameEn}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Feature rows */}
                {allFeatures.map((feat, i) => (
                  <tr key={`f-${i}`}>
                    <td>{feat}</td>
                    {tiers.map((tier) => {
                      const has = (
                        isHi ? tier.featuresHi : tier.featuresEn
                      ).includes(feat);
                      return (
                        <td key={tier.id} className="ckm-pt-center">
                          {has ? (
                            <i className="fa-solid fa-circle-check ckm-pt-yes" />
                          ) : (
                            <i className="fa-solid fa-circle-xmark ckm-pt-no" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Divider row */}
                <tr className="ckm-pt-divider">
                  <td colSpan={tiers.length + 1}>
                    <span>
                      {isHi
                        ? "संविधान के अनुसार मुख्य जानकारी"
                        : "Key details as per constitution"}
                    </span>
                  </td>
                </tr>

                {/* Value rows */}
                {valueRows.map((row, i) => (
                  <tr key={`v-${i}`} className="ckm-pt-value">
                    <td>{isHi ? row.labelHi : row.labelEn}</td>
                    <td>{row.general}</td>
                    <td>{row.life}</td>
                    <td>{row.patron}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ TERMS ============ */}
      <section className="ckm-pricing-terms sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <h2 className="ckm-head-title">
              {isHi ? "सदस्यता नियम" : "Membership Rules"}
            </h2>
            <p className="ckm-head-sub">
              {isHi
                ? "संस्था के नियमानुसार सदस्यता शर्तें"
                : "Membership terms as per the organization constitution"}
            </p>
          </div>

          <div className="ckm-terms-grid">
            {terms.map((term, i) => (
              <article
                key={i}
                className="ckm-term-card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <h3>{isHi ? term.titleHi : term.titleEn}</h3>
                <p>{isHi ? term.bodyHi : term.bodyEn}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}