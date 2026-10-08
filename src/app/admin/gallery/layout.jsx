// src/app/admin/gallery/layout.jsx
'use client';

import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

export default function GalleryLayout({ children }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}