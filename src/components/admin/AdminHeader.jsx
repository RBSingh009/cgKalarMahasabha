// src/components/admin/AdminHeader.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader({ admin, onMenuToggle }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    window.location.href = '/admin/login';
  };

  return (
    <header className="ckm-admin-header">
      <button
        type="button"
        className="ckm-admin-menu-btn"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <i className="fa-solid fa-bars" />
      </button>

      <div className="ckm-admin-header-spacer" />

      <button className="ckm-admin-icon-btn" aria-label="Notifications">
        <i className="fa-solid fa-bell" />
        <span className="ckm-admin-badge">3</span>
      </button>

      <div className="ckm-admin-user" ref={menuRef}>
        <button
          type="button"
          className="ckm-admin-user-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
        >
          <div className="ckm-admin-user-avatar">
            <i className="fa-solid fa-user-shield" />
          </div>
          <div className="ckm-admin-user-info">
            <strong>{admin?.name || 'Admin'}</strong>
            <small>{admin?.email || 'admin@ckm.org'}</small>
          </div>
          <i className={`fa-solid fa-chevron-${menuOpen ? 'up' : 'down'}`} />
        </button>

        {menuOpen && (
          <ul className="ckm-admin-user-menu">
            <li>
              <button type="button" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket" />
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}