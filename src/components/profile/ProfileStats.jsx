// src/components/profile/ProfileStats.jsx
'use client';

export default function ProfileStats({ stats = [] }) {
  return (
    <section className="ckm-prof-stats">
      {stats.map((s) => (
        <article key={s.id} className={`ckm-prof-stat ${s.color || 'maroon'}`}>
          <div className="ckm-prof-stat-icon">
            <i className={s.icon} />
          </div>
          <div className="ckm-prof-stat-body">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        </article>
      ))}
    </section>
  );
}