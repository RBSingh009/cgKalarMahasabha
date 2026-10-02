// src/app/work/page.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { works } from '@/data/works';

export default function WorkPage() {
  const { lang } = useLang();

  const banner = lang === 'hi' ? 'हमारा कार्य' : 'Our Work';
  const bannerSub = lang === 'hi'
    ? 'समाज सेवा के प्रमुख कार्यक्रम'
    : 'Key community service programs';
  const eyebrow = lang === 'hi' ? 'हमारा कार्य' : 'Our Work';
  const title = lang === 'hi' ? 'हमारे सभी सामाजिक कार्य' : 'All Our Social Work';
  const sub = lang === 'hi'
    ? 'महासंघ द्वारा संपन्न प्रमुख सामाजिक कार्यक्रमों की पूरी सूची।'
    : 'Full list of key social programs conducted by the Mahasangh.';
  const readMore = lang === 'hi' ? 'विवरण पढ़ें' : 'Read More';

  return (
    <main className="ckm-work-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{banner}</h1>
          <p className="ckm-banner-sub">{bannerSub}</p>
        </div>
      </section>

      <section className="ckm-blog-work sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              {eyebrow}
            </span>
            <h2 className="ckm-head-title">{title}</h2>
            <p className="ckm-head-sub">{sub}</p>
          </div>

          <div className="ckm-blog-grid">
            {works.map((w, i) => (
              <article
                className="ckm-blog-card"
                key={w.id}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 150}
              >
                <div className="ckm-blog-card-inner">
                  <div className="ckm-blog-thumb">
                    <Link href={`/work/${w.slug}`}>
                      <img
                        src={w.image}
                        alt={lang === 'hi' ? w.titleHi : w.titleEn}
                        loading="lazy"
                      />
                    </Link>
                    <span className="ckm-blog-cat">
                      {lang === 'hi' ? w.categoryHi : w.categoryEn}
                    </span>
                  </div>

                  <div className="ckm-blog-content">
                    <div className="ckm-blog-meta">
                      <span>
                        <i className="fa fa-user" />
                        {lang === 'hi' ? 'महासंघ टीम' : 'Mahasangh Team'}
                      </span>
                      <span>
                        <i className="fa fa-calendar" />
                        {lang === 'hi' ? w.dateHi : w.dateEn}
                      </span>
                    </div>

                    <h3 className="ckm-blog-title">
                      <Link href={`/work/${w.slug}`}>
                        {lang === 'hi' ? w.titleHi : w.titleEn}
                      </Link>
                    </h3>

                    <p className="ckm-blog-excerpt">
                      {lang === 'hi' ? w.excerptHi : w.excerptEn}
                    </p>

                    <Link href={`/work/${w.slug}`} className="ckm-blog-btn">
                      {readMore} <i className="fa fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}