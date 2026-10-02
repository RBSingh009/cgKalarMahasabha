// src/components/sections/JoinUsTiers.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { tiers } from '@/data/tiers';

export default function JoinUsTiers() {
  const { lang, t } = useLang();
  const h = t.home;
  const isHi = lang === 'hi';

  return (
    <section className="ckm-tiers-sec sec-padding">
      <div className="ckm-container">
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow">
            <span className="ckm-head-line" />
            {h.tierEyebrow}
          </span>
          <h2 className="ckm-head-title">{h.tierTitle}</h2>
          <p className="ckm-head-sub">{h.tierDesc}</p>
        </div>

        <div className="ckm-tiers-grid">
          {tiers.map((tier) => (
            <div
              className={`ckm-tier-card ${tier.popular ? 'popular' : ''}`}
              key={tier.id}
            >
              {/* Popular badge */}
              {tier.popular && (
                <span className="ckm-tier-badge">
                  <i className="fa-solid fa-star" />
                  {h.tierPopular}
                </span>
              )}

              {/* Tier name */}
              <h3 className="ckm-tier-name">
                {isHi ? tier.nameHi : tier.nameEn}
              </h3>

              {/* ===== FIXED PRICE BLOCK ===== */}
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

              {/* Features list */}
              <ul className="ckm-tier-features">
                {(isHi ? tier.featuresHi : tier.featuresEn).map((f, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-circle-check" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* ⚡ Note (e.g., 6-month lapse warning for General) */}
              {tier.noteHi && (
                <p className="ckm-tier-note">
                  <i className="fa-solid fa-circle-info" />
                  <span>{isHi ? tier.noteHi : tier.noteEn}</span>
                </p>
              )}

              {/* ⚡ Upgrade / Dual path block */}
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

              {/* CTA */}
              <Link
                href="/join"
                className={`ckm-tier-btn ${tier.popular ? 'gold' : ''}`}
              >
                {h.tierCta} <i className="fa fa-arrow-right" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}