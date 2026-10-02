// src/components/dashboard/ProfileCard.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function ProfileCard({ user }) {
  const { t, lang } = useLang();
  if (!user) return null;

  const P = t.profile;
  const isHi = lang === 'hi';

  /* Translate role + district for display */
  const roleDisplay = isHi
    ? user.role
    : user.role === 'सक्रिय सदस्य'
    ? 'Active Member'
    : user.role;

  const districtDisplay = isHi
    ? user.district
    : user.district === 'रायपुर'
    ? 'Raipur'
    : user.district;

  const joinedDisplay = isHi
    ? user.joinedAt
    : user.joinedAt === '15 जनवरी 2024'
    ? '15 January 2024'
    : user.joinedAt;

  return (
    <section className="ckm-dash-profile">
      <div className="ckm-dash-profile-avatar">
        <img src={user.avatar} alt={user.name} />
        <span className="ckm-dash-profile-status" title={roleDisplay} />
      </div>

      <h3 className="ckm-dash-profile-name">{user.name}</h3>
      <p className="ckm-dash-profile-role">{roleDisplay}</p>

      <ul className="ckm-dash-profile-info">
        <li>
          <i className="fa-solid fa-id-card" />
          <span>{user.memberId}</span>
        </li>
        <li>
          <i className="fa-solid fa-phone" />
          <span>{user.phone}</span>
        </li>
        <li>
          <i className="fa-solid fa-envelope" />
          <span>{user.email}</span>
        </li>
        <li>
          <i className="fa-solid fa-location-dot" />
          <span>
            {districtDisplay}, {isHi ? 'छत्तीसगढ़' : 'Chhattisgarh'}
          </span>
        </li>
        <li>
          <i className="fa-solid fa-calendar-check" />
          <span>
            {P.joinedAt}: {joinedDisplay}
          </span>
        </li>
      </ul>

      <Link href="/id-card" className="ckm-dash-profile-btn">
        <i className="fa-solid fa-id-card" />
        {P.viewIdCard}
      </Link>
    </section>
  );
}