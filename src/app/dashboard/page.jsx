// src/app/dashboard/page.jsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/dashboard/StatCard';
import QuickActions from '@/components/dashboard/QuickActions';
import ProfileCard from '@/components/dashboard/ProfileCard';
import NoticesList from '@/components/dashboard/NoticesList';
import EventsList from '@/components/dashboard/EventsList';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/context/LanguageContext';

/* ============================================================
   MOCK CONTENT - fully bilingual
   ============================================================ */
const NOTICES = [
  {
    id: 1,
    titleHi: 'वार्षिक आम सभा - 15 अक्टूबर 2026',
    titleEn: 'Annual General Meeting - 15 October 2026',
    dateHi: '02 अक्टूबर 2026',
    dateEn: '02 October 2026',
    catHi: 'कार्यक्रम',
    catEn: 'Event',
    urgent: true,
  },
  {
    id: 2,
    titleHi: 'सदस्यता नवीनीकरण की अंतिम तिथि 31 अक्टूबर',
    titleEn: 'Membership renewal deadline: 31 October',
    dateHi: '28 सितंबर 2026',
    dateEn: '28 September 2026',
    catHi: 'सूचना',
    catEn: 'Notice',
    urgent: false,
  },
  {
    id: 3,
    titleHi: 'कलचुरि इतिहास पर विशेष व्याख्यान',
    titleEn: 'Special lecture on Kalachuri history',
    dateHi: '20 सितंबर 2026',
    dateEn: '20 September 2026',
    catHi: 'शिक्षा',
    catEn: 'Education',
    urgent: false,
  },
];

const EVENTS = [
  {
    id: 1,
    day: '15',
    monthHi: 'अक्टू',
    monthEn: 'Oct',
    titleHi: 'वार्षिक आम सभा',
    titleEn: 'Annual General Meeting',
    locHi: 'रायपुर, छत्तीसगढ़',
    locEn: 'Raipur, Chhattisgarh',
    timeHi: 'सुबह 10:00 बजे',
    timeEn: '10:00 AM',
  },
  {
    id: 2,
    day: '02',
    monthHi: 'नव',
    monthEn: 'Nov',
    titleHi: 'दीपावली मिलन समारोह',
    titleEn: 'Diwali Get-together',
    locHi: 'भिलाई, छत्तीसगढ़',
    locEn: 'Bhilai, Chhattisgarh',
    timeHi: 'शाम 6:00 बजे',
    timeEn: '6:00 PM',
  },
  {
    id: 3,
    day: '20',
    monthHi: 'नव',
    monthEn: 'Nov',
    titleHi: 'युवा सदस्य बैठक',
    titleEn: 'Youth Members Meeting',
    locHi: 'दुर्ग, छत्तीसगढ़',
    locEn: 'Durg, Chhattisgarh',
    timeHi: 'दोपहर 2:00 बजे',
    timeEn: '2:00 PM',
  },
];

const ACTIVITY = [
  {
    id: 1,
    icon: 'fa-solid fa-user-check',
    textHi: 'आपकी सदस्यता सत्यापित हुई',
    textEn: 'Your membership was verified',
    timeHi: '2 दिन पहले',
    timeEn: '2 days ago',
  },
  {
    id: 2,
    icon: 'fa-solid fa-heart',
    textHi: 'आपने ₹500 का दान किया',
    textEn: 'You donated ₹500',
    timeHi: '1 सप्ताह पहले',
    timeEn: '1 week ago',
  },
  {
    id: 3,
    icon: 'fa-solid fa-file-lines',
    textHi: 'नई सूचना जारी की गई',
    textEn: 'A new notice was published',
    timeHi: '2 सप्ताह पहले',
    timeEn: '2 weeks ago',
  },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, lang } = useLang();

  const D = t.dashboard;
  const isHi = lang === 'hi';

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/dashboard');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="ckm-dash ckm-page-offset">
        <div className="ckm-dash-container">
          <div className="ckm-mem-loading">
            <span className="ckm-mem-spinner" />
            {loading ? D.loading : D.redirecting}
          </div>
        </div>
      </main>
    );
  }

  /* ---------- Build translated stat cards ---------- */
  const stats = [
    {
      id: 1,
      icon: 'fa-solid fa-id-card',
      value: user.memberId,
      label: D.stats.memberId,
      color: 'maroon',
    },
    {
      id: 2,
      icon: 'fa-solid fa-calendar-check',
      value: isHi ? '8 महीने' : '8 months',
      label: D.stats.duration,
      color: 'gold',
    },
    {
      id: 3,
      icon: 'fa-solid fa-bullhorn',
      value: '12',
      label: D.stats.unread,
      color: 'maroon',
    },
    {
      id: 4,
      icon: 'fa-solid fa-hand-holding-heart',
      value: '₹2,500',
      label: D.stats.contribution,
      color: 'gold',
    },
  ];

  /* ---------- Build translated quick actions ---------- */
  const quickActions = [
    { href: '/profile', icon: 'fa-solid fa-user-pen', label: t.profile.personalInfo },
    { href: '/id-card', icon: 'fa-solid fa-id-card', label: t.profile.viewIdCard },
    { href: '/donation', icon: 'fa-solid fa-heart', label: t.donateNow },
    { href: '/notice', icon: 'fa-solid fa-file-lines', label: t.noticePage.bannerTitle },
    { href: '/events', icon: 'fa-solid fa-calendar-days', label: t.events.bannerTitle },
    { href: '/members', icon: 'fa-solid fa-address-book', label: t.membersPage.bannerTitle },
  ];

  /* ---------- Map mock content to current lang ---------- */
  const notices = NOTICES.map((n) => ({
    id: n.id,
    title: isHi ? n.titleHi : n.titleEn,
    date: isHi ? n.dateHi : n.dateEn,
    category: isHi ? n.catHi : n.catEn,
    urgent: n.urgent,
  }));

  const events = EVENTS.map((e) => ({
    id: e.id,
    day: e.day,
    month: isHi ? e.monthHi : e.monthEn,
    title: isHi ? e.titleHi : e.titleEn,
    location: isHi ? e.locHi : e.locEn,
    time: isHi ? e.timeHi : e.timeEn,
  }));

  const activity = ACTIVITY.map((a) => ({
    id: a.id,
    icon: a.icon,
    text: isHi ? a.textHi : a.textEn,
    time: isHi ? a.timeHi : a.timeEn,
  }));

  const completion = user.completion ?? 0;

  return (
    <main className="ckm-dash ckm-page-offset">
      <div className="ckm-dash-container">
        <DashboardHeader user={user} />

        <section className="ckm-dash-stats">
          {stats.map((s) => (
            <StatCard key={s.id} {...s} />
          ))}
        </section>

        <div className="ckm-dash-grid">
          <div className="ckm-dash-col ckm-dash-col-main">
            <section className="ckm-dash-card">
              <header className="ckm-dash-card-head">
                <h2>
                  <i className="fa-solid fa-user-circle" />
                  {D.profileCompletion}
                </h2>
                <span className="ckm-dash-badge">{completion}%</span>
              </header>
              <div className="ckm-dash-progress">
                <div
                  className="ckm-dash-progress-bar"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="ckm-dash-progress-hint">{t.profile.missingHint}</p>
              <Link href="/profile" className="ckm-dash-link">
                {D.completeProfile}
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </section>

            <QuickActions actions={quickActions} />
            <NoticesList notices={notices} />
            <ActivityFeed items={activity} />
          </div>

          <aside className="ckm-dash-col ckm-dash-col-side">
            <ProfileCard user={user} />
            <EventsList events={events} />

            <section className="ckm-dash-help">
              <div className="ckm-dash-help-icon">
                <i className="fa-solid fa-headset" />
              </div>
              <h3>{D.helpTitle}</h3>
              <p>{D.helpText}</p>
              <a href="tel:+919826050235" className="ckm-dash-help-btn">
                <i className="fa-solid fa-phone" />
                +91 98260 50235
              </a>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}