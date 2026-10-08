// src/app/admin/settings/layout.jsx
'use client';

import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

export default function SettingsLayout({ children }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}