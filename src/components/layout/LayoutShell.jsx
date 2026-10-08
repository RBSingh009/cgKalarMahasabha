// src/components/layout/LayoutShell.jsx
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import ScrollTop from './ScrollTop';
import AOSInit from './AOSInit';
import ContactWidget from '@/components/shared/ContactWidget';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  /* ---------- Admin routes: no site chrome ---------- */
  if (isAdminRoute) {
    return <>{children}</>;
  }

  /* ---------- Regular site: full chrome ---------- */
  return (
    <>
      <Preloader />
      <Header />
      {children}
      <Footer />
      <ScrollTop />
      <ContactWidget />
      <AOSInit />
    </>
  );
}