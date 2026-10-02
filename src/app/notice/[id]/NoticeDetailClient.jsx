// src/app/notice/[id]/NoticeDetailClient.jsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { notices } from '@/data/notices';

export default function NoticeDetailClient({ params }) {
  /* Unwrap params (Next 15+ passes a Promise) */
  const resolvedParams =
    typeof params?.then === 'function' ? use(params) : params;
  const id = resolvedParams?.id;

  const { lang } = useLang();
  const isHi = lang === 'hi';

  /* Find the notice by id */
  const notice = notices.find((n) => String(n.id) === String(id));

  /* ---------- NOT FOUND ---------- */
  if (!notice) {
    return (
      <main className="ckm-notice-detail-page ckm-page-offset">
        <div className="ckm-container">
          <div className="ckm-notice-empty-page">
            <i className="fa-solid fa-circle-question" />
            <h1>{isHi ? 'सूचना नहीं मिली' : 'Notice Not Found'}</h1>
            <p>
              {isHi
                ? 'आप जिस सूचना की तलाश कर रहे हैं वह उपलब्ध नहीं है।'
                : 'The notice you are looking for is not available.'}
            </p>
            <Link href="/notice" className="ckm-about-cta">
              <i className="fa-solid fa-arrow-left" />
              {isHi ? 'सभी सूचनाएँ' : 'All Notices'}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const title = isHi ? notice.title : notice.titleEn;
  const category = isHi ? notice.category : notice.categoryEn;
  const body = isHi ? notice.body : notice.bodyEn;
  const date = formatDate(notice.publishedAt, isHi);

  /* Split body into paragraphs */
  const paragraphs = body
    .trim()
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="ckm-notice-detail-page ckm-page-offset">
      {/* Banner */}
      <section className="ckm-page-banner ckm-notice-detail-banner">
        <div className="ckm-container">
          {notice.important && (
            <span className="ckm-notice-detail-urgent">
              <i className="fa-solid fa-triangle-exclamation" />
              {isHi ? 'अत्यावश्यक' : 'Important'}
            </span>
          )}
          <span className="ckm-notice-detail-cat">{category}</span>
          <h1 className="ckm-banner-title ckm-notice-detail-title">{title}</h1>
          <div className="ckm-notice-detail-meta">
            <span>
              <i className="fa-regular fa-calendar" />
              {date}
            </span>
            <span>
              <i className="fa-solid fa-user-tie" />
              {isHi ? 'महासंघ कार्यालय' : 'Mahasangh Office'}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="ckm-notice-detail-body">
        <div className="ckm-container">
          <div className="ckm-notice-detail-card">
            <article className="ckm-notice-detail-article">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>

            {notice.attachment && (
              <div className="ckm-notice-detail-attach">
                <div className="ckm-notice-detail-attach-icon">
                  <i className="fa-solid fa-file-pdf" />
                </div>
                <div className="ckm-notice-detail-attach-body">
                  <strong>{notice.attachment.name}</strong>
                  <small>{notice.attachment.size} · PDF</small>
                </div>
                <a
                  href={notice.attachment.url}
                  download
                  className="ckm-notice-detail-attach-btn"
                >
                  <i className="fa-solid fa-download" />
                  {isHi ? 'डाउनलोड' : 'Download'}
                </a>
              </div>
            )}

            <div className="ckm-notice-detail-actions">
              <Link href="/notice" className="ckm-news-back">
                <i className="fa-solid fa-arrow-left" />
                {isHi ? 'सभी सूचनाएँ' : 'All Notices'}
              </Link>

              <div className="ckm-news-share">
                <strong>{isHi ? 'साझा करें:' : 'Share:'}</strong>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.href : ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i className="fa-brands fa-x-twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   Format ISO date → "02 अक्टूबर 2026" / "02 October 2026"
   ============================================================ */
function formatDate(iso, isHi) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}