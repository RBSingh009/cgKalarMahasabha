// src/app/news/[slug]/page.jsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { news } from '@/data/news';

// Generate static params for all news items (SSG)
export async function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

// Dynamic metadata per article
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return { title: 'समाचार नहीं मिला' };

  return {
    title: `${item.title} | छत्तीसगढ़ कलार महासंघ`,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);

  if (!item) notFound();

  return (
    <main className="ckm-news-detail">
      {/* Banner */}
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <span className="ckm-news-cat-pill">{item.category}</span>
          <h1 className="ckm-banner-title">{item.title}</h1>
          <div className="ckm-news-detail-meta">
            <span>
              <i className="fa-regular fa-calendar" />
              {new Date(item.publishedAt).toLocaleDateString('hi-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span>
              <i className="fa-regular fa-user" />
              {item.author}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="ckm-news-content sec-padding">
        <div className="ckm-container">
          <div className="ckm-news-content-inner">
            <div className="ckm-news-hero-img">
              <img src={item.cover} alt={item.title} />
            </div>

            <article className="ckm-news-article">
              <p className="ckm-news-lead">{item.excerpt}</p>
              {item.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {/* Tags */}
              {item.tags?.length > 0 && (
                <div className="ckm-news-tags">
                  <i className="fa-solid fa-tags" />
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </article>

            {/* Back + share */}
            <div className="ckm-news-footer">
              <Link href="/news" className="ckm-news-back">
                <i className="fa fa-arrow-left" /> सभी समाचार
              </Link>

              <div className="ckm-news-share">
                <span>शेयर करें:</span>
                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
                <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
                <a href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}