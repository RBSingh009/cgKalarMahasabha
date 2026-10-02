// src/components/profile/ProfileSidebar.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { getMissingFields } from '@/lib/profileCompletion';

export default function ProfileSidebar({ user }) {
  const { t, lang } = useLang();
  const P = t.profile;
  const isHi = lang === 'hi';

  const completion = user?.completion ?? 0;
  const missing = getMissingFields(user);

  const items = [
    { icon: 'fa-solid fa-id-card',        label: P.memberId,    value: user.memberId },
    { icon: 'fa-solid fa-calendar-check', label: P.joinedAt,    value: user.joinedAt },
    { icon: 'fa-solid fa-user-tag',       label: P.memberType,  value: user.role },
    { icon: 'fa-solid fa-location-dot',   label: P.district,    value: user.district },
  ];

  return (
    <aside className="ckm-prof-col-side">
      <section className="ckm-prof-card ckm-prof-completion">
        <header className="ckm-prof-card-head">
          <h2>
            <i className="fa-solid fa-chart-simple" />
            {P.completion}
          </h2>
        </header>

        <div className="ckm-prof-ring-wrap">
          <svg className="ckm-prof-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" className="ckm-prof-ring-track" />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="ckm-prof-ring-fill"
              style={{
                strokeDasharray: 327,
                strokeDashoffset: 327 - (327 * completion) / 100,
              }}
            />
          </svg>
          <div className="ckm-prof-ring-label">
            <strong>{completion}%</strong>
            <span>{P.complete}</span>
          </div>
        </div>

        {missing.length > 0 ? (
          <>
            <p className="ckm-prof-completion-hint">{P.missingHint}</p>
            <ul className="ckm-prof-missing">
              {missing.slice(0, 5).map((m) => (
                <li key={m}>
                  <i className="fa-solid fa-circle-dot" />
                  {m}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="ckm-prof-completion-hint">{P.complete100}</p>
        )}
      </section>

      <section className="ckm-prof-card">
        <header className="ckm-prof-card-head">
          <h2>
            <i className="fa-solid fa-circle-info" />
            {P.membershipInfo}
          </h2>
        </header>

        <ul className="ckm-prof-info-list">
          {items.map((it) => (
            <li key={it.label}>
              <span className="ckm-prof-info-icon">
                <i className={it.icon} />
              </span>
              <div>
                <small>{it.label}</small>
                <strong>{it.value || '-'}</strong>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/id-card" className="ckm-prof-side-btn">
          <i className="fa-solid fa-id-card" />
          {isHi ? 'सदस्यता कार्ड डाउनलोड करें' : 'Download ID Card'}
        </Link>
      </section>
    </aside>
  );
}