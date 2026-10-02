// src/components/layout/AOSInit.jsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AOSInit() {
  const pathname = usePathname();

  // Refresh AOS on every route change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.refreshHard();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Script
      id="aos-init"
      src="https://unpkg.com/aos@2.3.4/dist/aos.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.AOS) {
          window.AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
          });
        }
      }}
    />
  );
}