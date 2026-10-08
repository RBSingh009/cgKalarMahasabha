// src/app/admin/dashboard/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard from '@/components/admin/StatCard';

const QUICK_ACTIONS = [
  { href: '/admin/members', icon: 'fa-solid fa-user-plus',    label: 'Add Member',    color: 'maroon' },
  { href: '/admin/notices', icon: 'fa-solid fa-bullhorn',      label: 'New Notice',    color: 'gold' },
  { href: '/admin/events',  icon: 'fa-solid fa-calendar-plus', label: 'Add Event',     color: 'maroon' },
  { href: '/admin/works',   icon: 'fa-solid fa-briefcase',     label: 'Add Work',      color: 'gold' },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/admin/stats', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setStats(data.stats);
            setRecent(data.recent || []);
          }
        }
      } catch {}
      finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="ckm-admin-page-head">
        <h1 className="ckm-admin-page-title">Dashboard</h1>
        <p className="ckm-admin-page-sub">
          छत्तीसगढ़ कलार महासंघ — Admin Overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="ckm-admin-stats-grid">
        <StatCard
          icon="fa-solid fa-users"
          value={loading ? '—' : (stats?.members ?? 0).toLocaleString('en-IN')}
          label="Total Members"
          color="maroon"
        />
        <StatCard
          icon="fa-solid fa-calendar-days"
          value={loading ? '—' : (stats?.events ?? 0).toLocaleString('en-IN')}
          label="Events"
          color="gold"
        />
        <StatCard
          icon="fa-solid fa-briefcase"
          value={loading ? '—' : (stats?.works ?? 0).toLocaleString('en-IN')}
          label="Works"
          color="maroon"
        />
        <StatCard
          icon="fa-solid fa-bullhorn"
          value={loading ? '—' : (stats?.notices ?? 0).toLocaleString('en-IN')}
          label="Notices"
          color="gold"
        />
      </div>

      {/* Two column grid */}
      <div className="ckm-admin-grid-2col">
        {/* Quick actions */}
        <section className="ckm-admin-card">
          <header className="ckm-admin-card-head">
            <h2>
              <i className="fa-solid fa-bolt" />
              Quick Actions
            </h2>
          </header>

          <div className="ckm-admin-quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`ckm-admin-quick-item is-${action.color}`}
              >
                <span className="ckm-admin-quick-icon">
                  <i className={action.icon} />
                </span>
                <span className="ckm-admin-quick-label">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section className="ckm-admin-card">
          <header className="ckm-admin-card-head">
            <h2>
              <i className="fa-solid fa-clock-rotate-left" />
              Recent Activity
            </h2>
          </header>

          {loading ? (
            <div className="ckm-admin-card-loading">
              <span className="ckm-admin-spinner" />
            </div>
          ) : recent.length === 0 ? (
            <div className="ckm-admin-card-empty">
              <i className="fa-regular fa-clock" />
              <p>No recent activity</p>
            </div>
          ) : (
            <ul className="ckm-admin-activity">
              {recent.map((item, i) => (
                <li key={i}>
                  <span className={`ckm-admin-activity-dot is-${item.type || 'info'}`} />
                  <div className="ckm-admin-activity-body">
                    <p>{item.text}</p>
                    <small>{item.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}