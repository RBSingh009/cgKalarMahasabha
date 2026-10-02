// src/components/notice/NoticeDetailClient.jsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { notices } from '@/data/notices';

export default function NoticeDetailClient({
  params,
  expectedCategory = null,
  backHref = '/notice',
}) {
  const resolvedParams =
    typeof params?.then === 'function' ? use(params) : params;
  const id = resolvedParams?.id;

  const { lang } = useLang();
  const isHi = lang === 'hi';

  const notice = notices.find((n) => String(n.id) === String(id));

  if (!notice || (expectedCategory && notice.category !== expectedCategory)) {
    return <NotFoundView isHi={isHi} backHref={backHref} />;
  }

  const title = isHi ? notice.title : notice.titleEn;
  const category = isHi ? notice.category : notice.categoryEn;
  const body = isHi ? notice.body : notice.bodyEn;

  const date = new Date(notice.publishedAt).toLocaleDateString(
    isHi ? 'hi-IN' : 'en-IN',
    { day: '2-digit', month: 'long', year: 'numeric' }
  );

  const paragraphs = body
    .trim()
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="ckm-notice-detail-page ckm-page-offset">
      <section className="ckm-page-banner ckm-notice-detail-banner">
        <div className="ckm-container">
          {notice.important && (
            <span className="ckm-notice-detail-urgent">
              <i className="fa-solid fa-triangle-exclamation" />
              {isHi ? 'महत्वपूर्ण' : 'Important'}
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
              <Link href={backHref} className="ckm-news-back">
                <i className="fa-solid fa-arrow-left" />
                {isHi ? 'वापस जाएँ' : 'Go Back'}
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

function NotFoundView({ isHi, backHref }) {
  return (
    <main className="ckm-notice-detail-page ckm-page-offset">
      <div className="ckm-container">
        <div className="ckm-notice-empty-page">
          <i className="fa-solid fa-circle-question" />
          <h1>{isHi ? 'नहीं मिला' : 'Not Found'}</h1>
          <p>
            {isHi
              ? 'आप जिस सामग्री की तलाश कर रहे हैं वह उपलब्ध नहीं है।'
              : 'The content you are looking for is not available.'}
          </p>
          <Link href={backHref} className="ckm-about-cta">
            <i className="fa-solid fa-arrow-left" />
            {isHi ? 'वापस जाएँ' : 'Go Back'}
          </Link>
        </div>
      </div>
    </main>
  );
}