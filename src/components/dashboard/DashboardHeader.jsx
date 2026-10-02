// src/components/dashboard/DashboardHeader.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function DashboardHeader({ user }) {
  const { t } = useLang();
  const D = t.dashboard;
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <section className="ckm-dash-hero">
      <div className="ckm-dash-hero-glow glow-1" />
      <div className="ckm-dash-hero-glow glow-2" />

      <div className="ckm-dash-hero-content">
        <div className="ckm-dash-hero-left">
          <span className="ckm-dash-eyebrow">
            <span className="ckm-dash-eyebrow-line" />
            {D.eyebrow}
          </span>
          <h1 className="ckm-dash-greeting">
            {D.greeting}, {firstName} 👋
          </h1>
          <p className="ckm-dash-hero-sub">{D.heroSub}</p>
        </div>

        <div className="ckm-dash-hero-actions">
          <Link href="/profile" className="ckm-dash-btn ckm-dash-btn-primary">
            <i className="fa-solid fa-user-pen" />
            {D.editProfile}
          </Link>
          <Link href="/donation" className="ckm-dash-btn ckm-dash-btn-outline">
            <i className="fa-solid fa-heart" />
            {D.donate}
          </Link>
        </div>
      </div>
    </section>
  );
}