// src/app/page.js
import HeroSlider from "@/components/sections/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
import StatsStrip from "@/components/sections/StatsStrip";
import NoticeList from "@/components/sections/NoticeList";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import JoinUsTiers from "@/components/sections/JoinUsTiers";
import GalleryPreview from "@/components/sections/GalleryPreview";
import WorkPreview from "@/components/sections/WorkPreview";
import NewsGrid from "@/components/sections/NewsGrid";
import PublicationPreview from "@/components/sections/PublicationPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DonateCta from "@/components/sections/SupportSection";
import Link from "next/link";
import { news } from "@/data/news";
import TextMarquee from "@/components/sections/TextMarquee";
import MissionSection from "@/components/sections/MissionSection";
import WorkAndNotice from "@/components/sections/WorkAndNotice";

export default function HomePage() {
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  );

  return (
    <main>
      {/* 1. Hero */}
      <HeroSlider />

      {/* 2. About */}
      <AboutSection />

      {/* 3. Stats */}
      <StatsStrip />
      <WorkAndNotice />

      {/* 4. Notice preview */}
      {/* <section className="ckm-notice-preview sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              ताज़ा सूचनाएं
            </span>
            <h2 className="ckm-head-title">सूचना पट्ट</h2>
          </div>
          <NoticeList limit={3} />
          <div className="ckm-notice-preview-cta">
            <Link href="/notice" className="ckm-about-cta">
              सभी सूचनाएं देखें <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* 5. Activities */}
      {/* <ActivitiesSection /> */}

      <MissionSection />

      {/* 6. Join Us Tiers */}
      <JoinUsTiers />

      {/* 7. Gallery preview */}
      {/* <GalleryPreview /> */}

      {/* 8. Work preview */}
      {/* <WorkPreview /> */}

      {/* 9. News preview */}
      <section className="ckm-news-preview sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              समाचार एवं अपडेट
            </span>
            <h2 className="ckm-head-title">ताज़ा समाचार</h2>
          </div>
          <NewsGrid items={sortedNews} limit={3} />
          <div className="ckm-news-preview-cta">
            <Link href="/news" className="ckm-about-cta">
              सभी समाचार देखें <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Publications */}
      <PublicationPreview />
      <TextMarquee />
      {/* 11. Testimonials */}
      <TestimonialsSection />

      {/* 12. Donate CTA */}
      <DonateCta />
    </main>
  );
}
