// src/components/sections/WorkPreview.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { works } from '@/data/works';

export default function WorkPreview() {
  const { lang, t } = useLang();
  const h = t.home || {};

  const eyebrow = h.workEyebrow || (lang === 'hi' ? 'हमारा कार्य' : 'Our Work');
  const title = h.workTitle || (lang === 'hi' ? 'हमारे हाल के सामाजिक कार्य' : 'Our Recent Social Work');
  const sub = h.workDesc || (lang === 'hi' ? 'समाज सेवा एवं सामाजिक उत्थान की झलकियां।' : 'Glimpses of community service and social upliftment.');
  const viewAll = h.workViewAll || (lang === 'hi' ? 'सभी कार्य देखें' : 'View All Work');
  const readMore = h.workReadMore || (lang === 'hi' ? 'विवरण पढ़ें' : 'Read More');

  const preview = works.slice(0, 3);

  return (
    <section className="ckm-blog-work sec-padding position-relative">
      {/* Decorative floating shape */}
      <img
        src="/images/love-alt.png"
        alt=""
        className="anim-img moveYS right-top ckm-work-deco"
      />

      <div className="ckm-container">
        {/* Section heading - same as blog */}
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow" data-aos="fade-up">
            <span className="ckm-head-line" />
            {eyebrow}
          </span>
          <h2 className="ckm-head-title" data-aos="fade-up" data-aos-delay="100">
            {title}
          </h2>
          <p className="ckm-head-sub" data-aos="fade-up" data-aos-delay="200">
            {sub}
          </p>
        </div>

        {/* 3-column grid - same as blog */}
        <div className="ckm-blog-grid">
          {preview.map((w, i) => (
            <article
              className="ckm-blog-card"
              key={w.id}
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 150}
            >
              <div className="ckm-blog-card-inner">
                {/* Thumbnail */}
                <div className="ckm-blog-thumb">
                  <Link href={`/work/${w.slug}`}>
                    <img
                      src={w.image}
                      alt={lang === 'hi' ? w.titleHi : w.titleEn}
                      loading="lazy"
                      className="img-fluid"
                    />
                  </Link>
                  {/* Category badge - like blog post date badge */}
                  <span className="ckm-blog-cat">
                    {lang === 'hi' ? w.categoryHi : w.categoryEn}
                  </span>
                </div>

                {/* Content */}
                <div className="ckm-blog-content">
                  {/* Meta row - like blog meta */}
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

                  {/* Title */}
                  <h3 className="ckm-blog-title">
                    <Link href={`/work/${w.slug}`}>
                      {lang === 'hi' ? w.titleHi : w.titleEn}
                    </Link>
                  </h3>

                  {/* Excerpt (like blog content para) */}
                  <p className="ckm-blog-excerpt">
                    {lang === 'hi' ? w.excerptHi : w.excerptEn}
                  </p>

                  {/* CTA button - like blog "read more" */}
                  <Link
                    href={`/work/${w.slug}`}
                    className="ckm-blog-btn"
                  >
                    {readMore} <i className="fa fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all button */}
        <div className="ckm-blog-cta">
          <Link href="/work" className="ckm-about-cta">
            {viewAll} <i className="fa fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}