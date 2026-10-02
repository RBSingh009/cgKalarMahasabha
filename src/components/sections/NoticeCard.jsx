// src/components/sections/NoticeCard.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { getNoticeHref } from '@/lib/noticeRoutes';

export default function NoticeCard({ notice }) {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  const title = isHi ? notice.title : notice.titleEn;
  const body = isHi ? notice.body : notice.bodyEn;
  const category = isHi ? notice.category : notice.categoryEn;

  const date = new Date(notice.publishedAt).toLocaleDateString(
    isHi ? 'hi-IN' : 'en-IN',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  const catClass =
    notice.category === 'सूचना'
      ? 'cat-notice'
      : notice.category === 'योजना'
      ? 'cat-scheme'
      : 'cat-event';

  const catIcon =
    notice.category === 'सूचना'
      ? 'fa-solid fa-bullhorn'
      : notice.category === 'योजना'
      ? 'fa-solid fa-hand-holding-heart'
      : 'fa-solid fa-calendar-days';

  return (
    <article className="ckm-notice-card">
      {notice.important && (
        <span className="ckm-notice-urgent">
          <i className="fa-solid fa-circle-exclamation" />
          {isHi ? 'महत्वपूर्ण' : 'Important'}
        </span>
      )}

      <div className="ckm-notice-head">
        <span className={`ckm-notice-cat ${catClass}`}>
          <i className={catIcon} />
          {category}
        </span>

        <span className="ckm-notice-date">
          <i className="fa-regular fa-calendar" />
          {date}
        </span>
      </div>

      <h3 className="ckm-notice-title">{title}</h3>
      <p className="ckm-notice-body">{body}</p>

      <div className="ckm-notice-actions">
        {/* Category-aware link: /notice/{id} | /scheme/{id} | /event/{id} */}
        <Link href={getNoticeHref(notice)} className="ckm-notice-read">
          <i className="fa-solid fa-arrow-right" />
          {isHi ? 'पूरी सूचना पढ़ें' : 'Read Full Notice'}
        </Link>

        {notice.attachment && (
          <a
            href={notice.attachment}
            className="ckm-notice-attach"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-solid fa-file-pdf" />
            {isHi ? 'संलग्न दस्तावेज़' : 'Attachment'}
          </a>
        )}
      </div>
    </article>
  );
}