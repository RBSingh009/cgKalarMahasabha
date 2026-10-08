// src/components/admin/AdminSection.jsx
'use client';

export default function AdminSection({ title, subtitle, actions, children }) {
  return (
    <>
      <div className="ckm-admin-page-head">
        <div className="ckm-admin-page-head-left">
          <h1 className="ckm-admin-page-title">{title}</h1>
          {subtitle && <p className="ckm-admin-page-sub">{subtitle}</p>}
        </div>
        {actions && <div className="ckm-admin-page-actions">{actions}</div>}
      </div>
      {children}
    </>
  );
}
