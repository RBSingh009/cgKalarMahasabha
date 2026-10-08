// src/components/admin/StatCard.jsx
'use client';

export default function StatCard({ icon, value, label, color = 'maroon' }) {
  return (
    <article className={`ckm-admin-stat is-${color}`}>
      <div className="ckm-admin-stat-icon">
        <i className={icon} />
      </div>
      <div className="ckm-admin-stat-body">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}