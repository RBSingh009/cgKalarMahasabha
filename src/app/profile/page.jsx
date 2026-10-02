// src/app/profile/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileDangerZone from '@/components/profile/ProfileDangerZone';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/context/LanguageContext';

export default function ProfilePage() {
  const { user: authUser, loading, updateUser } = useAuth();
  const { t } = useLang();
  const router = useRouter();
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    if (authUser) setUser(authUser);
  }, [authUser]);

  useEffect(() => {
    if (!loading && !authUser) {
      router.replace('/login?next=/profile');
    }
  }, [loading, authUser, router]);

  if (loading || !user) {
    return (
      <main className="ckm-prof ckm-page-offset">
        <div className="ckm-prof-container">
          <div className="ckm-mem-loading">
            <span className="ckm-mem-spinner" />
            {loading ? 'लोड हो रहा है…' : 'लॉगिन पर भेजा जा रहा है…'}
          </div>
        </div>
      </main>
    );
  }

  /* ⚡ Avatar upload returns the FULL updated user */
  const handleAvatarChange = (updatedUser) => {
    if (updatedUser) {
      setUser(updatedUser);
      updateUser(updatedUser);
    }
  };

  /* Form save returns the full updated user */
  const handleSave = (updatedUser) => {
    if (updatedUser) {
      setUser((u) => ({ ...u, ...updatedUser, avatar: u.avatar }));
      updateUser(updatedUser);
    }
  };

  const stats = [
    {
      id: 1,
      icon: 'fa-solid fa-calendar-check',
      value: t.profile.tenureValue || (t.profile.banner === 'My Profile' ? '8 months' : '8 महीने'),
      label: t.profile.joinedAt,
      color: 'gold',
    },
    {
      id: 2,
      icon: 'fa-solid fa-heart',
      value: '₹2,500',
      label: t.dashboard.stats.contribution,
      color: 'maroon',
    },
    {
      id: 3,
      icon: 'fa-solid fa-file-lines',
      value: '12',
      label: t.dashboard.stats.unread,
      color: 'gold',
    },
    {
      id: 4,
      icon: 'fa-solid fa-users',
      value: '3',
      label: t.profile.referrals,
      color: 'maroon',
    },
  ];

  return (
    <main className="ckm-prof ckm-page-offset">
      <div className="ckm-prof-container">
        <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />
        <ProfileStats stats={stats} />
        <div className="ckm-prof-grid">
          <div className="ckm-prof-col-main">
            <ProfileForm user={user} onSave={handleSave} />
            <ProfileDangerZone />
          </div>
          <ProfileSidebar user={user} />
        </div>
      </div>
    </main>
  );
}