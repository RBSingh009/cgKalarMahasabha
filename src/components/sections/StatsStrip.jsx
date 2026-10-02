// src/components/sections/StatsStrip.jsx
'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/context/LanguageContext';
import { stats } from '@/data/stats';

export default function StatsStrip() {
  const { lang, t } = useLang();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let started = false;

    const runAll = () => {
      container.querySelectorAll('.ckm-stat-num').forEach((el) => {
        const target = parseInt(el.dataset.value, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const startTime = performance.now();

        const tick = (now) => {
          const p = Math.min((now - startTime) / duration, 1);
          el.textContent = Math.floor(p * target).toLocaleString('en-IN') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            runAll();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ckm-stats-strip">
      <div className="ckm-container">
        <div className="ckm-stats-head">
          <span className="ckm-head-eyebrow ckm-eyebrow-light">
            <span className="ckm-head-line" />
            {t.home.statsEyebrow}
          </span>
        </div>

        <div className="ckm-stats-grid" ref={containerRef}>
          {stats.map((s) => (
            <div className="ckm-stat-item" key={s.id}>
              <strong className="ckm-stat-num" data-value={s.value} data-suffix={s.suffix}>
                0{s.suffix}
              </strong>
              <span className="ckm-stat-label">
                {lang === 'hi' ? s.labelHi : s.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}