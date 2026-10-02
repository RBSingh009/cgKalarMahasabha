// src/app/work/[slug]/WorkDetail.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function WorkDetail({ work }) {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  if (!work) {
    return (
      <main className="ckm-work-page">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">{isHi ? 'कार्य नहीं मिला' : 'Work Not Found'}</h1>
            <Link href="/work" className="ckm-about-cta" style={{ marginTop: 24, display: 'inline-flex' }}>
              <i className="fa fa-arrow-left" /> {isHi ? 'सभी कार्य' : 'All Works'}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const title = isHi ? work.titleHi : work.titleEn;
  const category = isHi ? work.categoryHi : work.categoryEn;
  const date = isHi ? work.dateHi : work.dateEn;
  const content = isHi ? work.contentHi : work.contentEn;

  return (
    <main className="ckm-wd-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{title}</h1>
          <nav className="ckm-wd-breadcrumb">
            <Link href="/">{isHi ? 'होम' : 'Home'}</Link>
            <span>›</span>
            <Link href="/work">{isHi ? 'हमारा कार्य' : 'Our Work'}</Link>
            <span>›</span>
            <span className="ckm-wd-bc-active">{category}</span>
          </nav>
        </div>
      </section>

      <section className="ckm-wd-article-sec">
        <div className="ckm-wd-article-container">
          <div className="ckm-wd-meta-bar">
            <div className="ckm-wd-meta-item">
              <span className="ckm-wd-meta-icon"><i className="fa-regular fa-calendar" /></span>
              <div>
                <small>{isHi ? 'प्रकाशित:' : 'Published:'}</small>
                <strong>{date}</strong>
              </div>
            </div>
            <div className="ckm-wd-meta-item">
              <span className="ckm-wd-meta-icon"><i className="fa-regular fa-user" /></span>
              <div>
                <small>{isHi ? 'लेखक:' : 'Author:'}</small>
                <strong>{isHi ? 'महासंघ टीम' : 'Mahasangh Team'}</strong>
              </div>
            </div>
            <div className="ckm-wd-meta-item">
              <span className="ckm-wd-meta-icon"><i className="fa-solid fa-tag" /></span>
              <div>
                <small>{isHi ? 'श्रेणी:' : 'Category:'}</small>
                <strong>{category}</strong>
              </div>
            </div>
          </div>

          <figure className="ckm-wd-figure">
            <img src={work.image} alt={title} />
          </figure>

          <p className="ckm-wd-lead">
            {isHi ? work.excerptHi : work.excerptEn}
          </p>

          <div className="ckm-wd-content">
            {content.split('\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <div className="ckm-wd-footer">
            <div className="ckm-wd-tags">
              <strong>{isHi ? 'टैग:' : 'Tags:'}</strong>
              <span>{category}</span>
            </div>
            <div className="ckm-wd-share">
              <strong>{isHi ? 'शेयर करें:' : 'Share:'}</strong>
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
              <a href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /></a>
            </div>
          </div>

          <div className="ckm-wd-back-wrap">
            <Link href="/work" className="ckm-wd-back">
              <i className="fa fa-arrow-left" /> {isHi ? 'सभी कार्य देखें' : 'View All Works'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}