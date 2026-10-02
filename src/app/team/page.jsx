// src/app/team/page.jsx
import OrganizationsSection from '@/components/sections/OrganizationsSection';
import CommunityMembersSection from '@/components/sections/CommunityMembersSection';

export const metadata = {
  title: 'हमारे सदस्य | छत्तीसगढ़ कलार महासंघ',
  description:
    'छत्तीसगढ़ कलार महासंघ से जुड़े संगठन एवं प्रमुख सदस्यों की जानकारी।',
};

export default function TeamPage() {
  return (
    <main className="ckm-team-page">
      {/* Page banner */}
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">हमारे सदस्य</h1>
          <p className="ckm-banner-sub">
            संगठन एवं समर्पित सदस्य जो समाज के विकास में योगदान दे रहे हैं।
          </p>
        </div>
      </section>

      {/* Section 1: Affiliated Organizations */}
      <OrganizationsSection />

      {/* Section 2: Community Members */}
      <CommunityMembersSection />
    </main>
  );
}