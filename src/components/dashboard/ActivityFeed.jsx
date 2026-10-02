// src/components/dashboard/ActivityFeed.jsx
'use client';

import { useLang } from '@/context/LanguageContext';

export default function ActivityFeed({ items = [] }) {
  const { t } = useLang();

  return (
    <section className="ckm-dash-card">
      <header className="ckm-dash-card-head">
        <h2>
          <i className="fa-solid fa-clock-rotate-left" />
          {t.dashboard.recentActivity}
        </h2>
      </header>

      <ul className="ckm-dash-activity">
        {items.map((a) => (
          <li key={a.id}>
            <span className="ckm-dash-activity-icon">
              <i className={a.icon} />
            </span>
            <div>
              <p>{a.text}</p>
              <small>{a.time}</small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}