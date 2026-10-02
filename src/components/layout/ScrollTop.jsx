// src/components/layout/ScrollTop.jsx
'use client';

import { useEffect, useState } from 'react';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;

      setProgress(scrolled);
      setVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Circumference of circle with r=49 is 2*π*49 ≈ 307.919
  const dashOffset = 307.919 * (1 - progress);

  return (
    <div
      className={`scroll-top ${visible ? 'active' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label="Scroll to top"
    >
      <svg
        className="progress-circle svg-content"
        height="100%"
        viewBox="-1 -1 102 102"
        width="100%"
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="307.919"
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        ></path>
      </svg>
    </div>
  );
}