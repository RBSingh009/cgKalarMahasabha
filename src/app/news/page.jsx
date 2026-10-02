// src/app/news/page.jsx
import NewsGrid from '@/components/sections/NewsGrid';
import { news } from '@/data/news';

export const metadata = {
  title: 'समाचार | छत्तीसगढ़ कलार महासंघ',
  description:
    'छत्तीसगढ़ कलार महासंघ की ताज़ा खबरें, कार्यक्रम एवं गतिविधियों की जानकारी।',
};

export default function NewsPage() {
  // Sort newest first
  const sorted = [...news].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return (
    <main className="ckm-news-page">
      {/* Banner */}
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">समाचार एवं अपडेट</h1>
          <p className="ckm-banner-sub">
            महासंघ की ताज़ा खबरें, कार्यक्रम एवं सामाजिक गतिविधियों की जानकारी।
          </p>
        </div>
      </section>

      {/* News list */}
      <section className="ckm-news-section sec-padding">
        <div className="ckm-container">
          <NewsGrid items={sorted} />
        </div>
      </section>
    </main>
  );
}