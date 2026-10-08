// src/app/admin/layout.jsx

import './admin.css';

export const metadata = {
  title: 'CKM Admin Panel',
  description: 'Administration panel for Chhattisgarh Kalar Mahasangh',
};

export default function AdminLayout({ children }) {
  return <>{children}</>;
}