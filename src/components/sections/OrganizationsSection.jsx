// src/components/sections/OrganizationsSection.jsx
'use client';

import { useLang } from '@/context/LanguageContext';
import { organizations } from '@/data/organizations';

export default function OrganizationsSection() {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  return (
    <section className="ckm-org-section sec-padding">
      <div className="ckm-container">
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow">
            <span className="ckm-head-line" />
            {isHi ? 'संबद्ध संगठन' : 'Affiliated Organizations'}
          </span>
          <h2 className="ckm-head-title">
            {isHi
              ? 'हमारे साथ जुड़े संगठन'
              : 'Organizations Joined With Us'}
          </h2>
          <p className="ckm-head-sub">
            {isHi
              ? 'समाज के विकास हेतु एकजुट होकर कार्यरत संगठन'
              : 'Organizations working together for community development'}
          </p>
        </div>

        <div className="ckm-org-grid">
          {organizations.map((org, i) => (
            <article
              key={org.id}
              className="ckm-org-card"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="ckm-org-logo">
                {org.logo ? (
                  <img
                    src={org.logo}
                    alt={isHi ? org.nameHi : org.nameEn}
                    loading="lazy"
                  />
                ) : (
                  <i className="fa-solid fa-building-flag" />
                )}
              </div>

              <span className="ckm-org-type">
                {isHi ? 'संबद्ध संगठन' : 'Affiliated'}
              </span>

              <h3 className="ckm-org-name">
                {isHi ? org.nameHi : org.nameEn}
              </h3>

              <p className="ckm-org-desc">
                {isHi ? org.descHi : org.descEn}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}