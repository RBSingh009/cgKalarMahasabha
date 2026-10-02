// src/components/sections/NoticeList.jsx
'use client';

import { useState, useMemo } from 'react';
import { useLang } from '@/context/LanguageContext';
import { notices, noticeCategories } from '@/data/notices';
import NoticeCard from './NoticeCard';

export default function NoticeList({ limit }) {
  const { lang } = useLang();
  const isHi = lang === 'hi';
  const [activeCat, setActiveCat] = useState('all');

  const sorted = useMemo(
    () =>
      [...notices].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      ),
    []
  );

  const filtered = useMemo(() => {
    if (activeCat === 'all') return sorted;
    return sorted.filter((n) => n.category === activeCat);
  }, [activeCat, sorted]);

  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      {!limit && (
        <div className="ckm-notice-filters">
          {noticeCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`ckm-notice-filter ${
                activeCat === cat.key ? 'active' : ''
              }`}
              onClick={() => setActiveCat(cat.key)}
            >
              {isHi ? cat.hi : cat.en}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="ckm-notice-empty">
          <i className="fa-regular fa-bell-slash" />
          <p>
            {isHi
              ? 'इस श्रेणी में कोई सूचना उपलब्ध नहीं है।'
              : 'No notices available in this category.'}
          </p>
        </div>
      ) : (
        <div className="ckm-notice-list">
          {visible.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      )}
    </>
  );
}