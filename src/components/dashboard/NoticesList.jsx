// src/components/dashboard/NoticesList.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function NoticesList({ notices = [] }) {
  const { t } = useLang();

  return (
    <section className="ckm-dash-card">
      <header className="ckm-dash-card-head">
        <h2>
          <i className="fa-solid fa-bullhorn" />
          {t.dashboard.latestNotices}
        </h2>
        <Link href="/notice" className="ckm-dash-see-all">
          {t.dashboard.seeAll}
          <i className="fa-solid fa-arrow-right" />
        </Link>
      </header>

      <ul className="ckm-dash-notices">
        {notices.map((n) => (
          <li key={n.id} className="ckm-dash-notice">
            <div className="ckm-dash-notice-icon">
              <i className="fa-solid fa-file-lines" />
            </div>
            <div className="ckm-dash-notice-body">
              <div className="ckm-dash-notice-top">
                <span className={`ckm-dash-tag ${n.urgent ? 'urgent' : ''}`}>
                  {n.category}
                </span>
                <span className="ckm-dash-notice-date">
                  <i className="fa-regular fa-clock" />
                  {n.date}
                </span>
              </div>
              <h3>{n.title}</h3>
            </div>
            <Link
              href={`/notice/${n.id}`}
              className="ckm-dash-notice-arrow"
              aria-label="Open notice"
            >
              <i className="fa-solid fa-chevron-right" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}