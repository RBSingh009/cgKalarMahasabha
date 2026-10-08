// src/components/admin/AdminDashboardLayout.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/admin/me', { credentials: 'include' });
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        const data = await res.json();
        if (!cancelled) setAdmin(data.admin);
      } catch {
        router.replace('/admin/login');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="ckm-admin-loading">
        <span className="ckm-admin-spinner" />
        Loading…
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="ckm-admin-shell">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="ckm-admin-main">
        <AdminHeader admin={admin} onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <main className="ckm-admin-content">{children}</main>
      </div>
    </div>
  );
}
