// src/app/admin/news/layout.jsx
'use client';

import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

export default function NewsLayout({ children }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}