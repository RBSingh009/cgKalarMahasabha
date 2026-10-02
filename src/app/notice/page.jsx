// src/app/notice/page.jsx
import NoticeList from '@/components/sections/NoticeList';

export const metadata = {
  title: 'सूचना पट्ट | छत्तीसगढ़ कलार महासंघ',
  description:
    'छत्तीसगढ़ कलार महासंघ की सूचनाएं, योजनाएं एवं कार्यक्रमों की जानकारी।',
};

export default function NoticePage() {
  return (
    <main className="ckm-notice-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">सूचना पट्ट</h1>
          <p className="ckm-banner-sub">
            महासंघ की सूचनाएं, योजनाएं एवं कार्यक्रमों की जानकारी।
          </p>
        </div>
      </section>

      <section className="ckm-notice-section sec-padding">
        <div className="ckm-container">
          <NoticeList />
        </div>
      </section>
    </main>
  );
}