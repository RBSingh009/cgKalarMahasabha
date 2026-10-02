// src/app/blog/[slug]/BlogDetail.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function BlogDetail({ post }) {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  if (!post) {
    return (
      <main className="ckm-news-page">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">
              {isHi ? 'पोस्ट नहीं मिला' : 'Post Not Found'}
            </h1>
            <Link href="/news" className="ckm-about-cta" style={{ marginTop: 24, display: 'inline-flex' }}>
              <i className="fa fa-arrow-left" /> {isHi ? 'सभी समाचार' : 'All News'}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="ckm-wd-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">
            {isHi ? post.titleHi || post.title : post.titleEn || post.title}
          </h1>
        </div>
      </section>
      <section className="ckm-wd-article-sec">
        <div className="ckm-wd-article-container">
          <Link href="/news" className="ckm-back-link" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <i className="fa fa-arrow-left" /> {isHi ? 'सभी समाचार' : 'All News'}
          </Link>
          {post.cover && (
            <figure className="ckm-wd-figure">
              <img src={post.cover} alt={isHi ? post.titleHi : post.titleEn} />
            </figure>
          )}
          <div className="ckm-wd-content">
            <p>{isHi ? post.contentHi || post.content : post.contentEn || post.content}</p>
          </div>
        </div>
      </section>
    </main>
  );
}