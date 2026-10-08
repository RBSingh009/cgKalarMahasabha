// src/app/admin/members/layout.jsx
'use client';

import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

export default function MembersLayout({ children }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
