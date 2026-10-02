// src/components/layout/Preloader.jsx
'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader once page has loaded
    const timer = setTimeout(() => setLoading(false), 800);
    const handleLoad = () => setLoading(false);

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div id="preloader" className={loading ? '' : 'preloader-hide'}>
      <div className="preloader">
        <span></span>
        <span></span>
      </div>
    </div>
  );
}