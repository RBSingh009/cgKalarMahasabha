// src/components/sections/NewsGrid.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function NewsGrid({ items = [], limit }) {
  const { lang } = useLang();
  const list = limit ? items.slice(0, limit) : items;

  return (
    <div className="ckm-news-grid">
      {list.map((item) => (
        <article className="ckm-news-card" key={item.id}>
          <Link href={`/news/${item.slug}`} className="ckm-news-link">
            <div className="ckm-news-cover">
              <img src={item.cover} alt={item.title} />
              <span className="ckm-news-cat">{item.category}</span>
            </div>

            <div className="ckm-news-body">
              <div className="ckm-news-meta">
                <span>
                  <i className="fa-regular fa-calendar" />
                  {formatDate(item.publishedAt, lang)}
                </span>
                <span>
                  <i className="fa-regular fa-user" />
                  {item.author}
                </span>
              </div>

              <h3 className="ckm-news-title">{item.title}</h3>
              <p className="ckm-news-excerpt">{item.excerpt}</p>

              <span className="ckm-news-readmore">
                पूरी खबर पढ़ें <i className="fa fa-arrow-right" />
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

function formatDate(dateStr, lang = 'hi') {
  const d = new Date(dateStr);
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}