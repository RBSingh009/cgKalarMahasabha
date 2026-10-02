// src/components/dashboard/StatCard.jsx
'use client';

export default function StatCard({ icon, value, label, color = 'maroon' }) {
  return (
    <article className={`ckm-dash-stat ${color}`}>
      <div className="ckm-dash-stat-icon">
        <i className={icon} />
      </div>
      <div className="ckm-dash-stat-body">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}