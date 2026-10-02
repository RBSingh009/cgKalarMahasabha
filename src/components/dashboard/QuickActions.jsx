// src/components/dashboard/QuickActions.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function QuickActions({ actions = [] }) {
  const { t } = useLang();

  return (
    <section className="ckm-dash-card">
      <header className="ckm-dash-card-head">
        <h2>
          <i className="fa-solid fa-bolt" />
          {t.dashboard.quickActions}
        </h2>
      </header>

      <div className="ckm-dash-quick">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className="ckm-dash-quick-item">
            <span className="ckm-dash-quick-icon">
              <i className={a.icon} />
            </span>
            <span className="ckm-dash-quick-label">{a.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}