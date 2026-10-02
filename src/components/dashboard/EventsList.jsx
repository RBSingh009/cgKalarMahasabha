// src/components/dashboard/EventsList.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function EventsList({ events = [] }) {
  const { t } = useLang();

  return (
    <section className="ckm-dash-card">
      <header className="ckm-dash-card-head">
        <h2>
          <i className="fa-solid fa-calendar-days" />
          {t.dashboard.upcomingEvents}
        </h2>
        <Link href="/events" className="ckm-dash-see-all">
          {t.dashboard.seeAll}
          <i className="fa-solid fa-arrow-right" />
        </Link>
      </header>

      <ul className="ckm-dash-events">
        {events.map((e) => (
          <li key={e.id} className="ckm-dash-event">
            <div className="ckm-dash-event-date">
              <strong>{e.day}</strong>
              <span>{e.month}</span>
            </div>
            <div className="ckm-dash-event-body">
              <h4>{e.title}</h4>
              <p>
                <i className="fa-solid fa-location-dot" />
                {e.location}
              </p>
              <p>
                <i className="fa-regular fa-clock" />
                {e.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}