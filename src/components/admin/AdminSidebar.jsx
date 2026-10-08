// src/components/admin/AdminSidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin/dashboard', icon: 'fa-solid fa-gauge-high',  label: 'Dashboard' },
  { href: '/admin/members',   icon: 'fa-solid fa-users',        label: 'Members' },
  { href: '/admin/notices',   icon: 'fa-solid fa-bullhorn',     label: 'Notices' },
  { href: '/admin/events',    icon: 'fa-solid fa-calendar-days', label: 'Events' },
  { href: '/admin/news',      icon: 'fa-solid fa-newspaper',    label: 'News' },
  { href: '/admin/works',     icon: 'fa-solid fa-briefcase',    label: 'Works' },
  { href: '/admin/gallery',   icon: 'fa-solid fa-images',       label: 'Gallery' },
  { href: '/admin/settings',  icon: 'fa-solid fa-gear',         label: 'Settings' },
];

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {open && (
        <div className="ckm-admin-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`ckm-admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="ckm-admin-sidebar-head">
          <Link href="/admin/dashboard" className="ckm-admin-sidebar-logo">
            <img src="/images/ckm-logo.png" alt="CKM" />
            <div>
              <strong>CKM</strong>
              <small>Admin Panel</small>
            </div>
          </Link>
        </div>

        <nav className="ckm-admin-nav">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? 'is-active' : ''}
                  onClick={onClose}
                >
                  <i className={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ckm-admin-sidebar-foot">
          <Link href="/" className="ckm-admin-sidebar-link">
            <i className="fa-solid fa-arrow-left" />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}