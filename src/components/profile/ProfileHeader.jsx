// src/components/profile/ProfileHeader.jsx
'use client';

import { useRef, useState } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function ProfileHeader({ user, onAvatarChange }) {
  const { t, lang } = useLang();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const hasRealAvatar =
    user.avatar && !user.avatar.includes('avatar-placeholder');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const fd = new FormData();
      fd.append('avatar', file);

      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      /* Pass back the FULL user - includes recomputed completion */
      onAvatarChange?.(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <section className="ckm-prof-hero">
      <div className="ckm-prof-hero-glow glow-1" />
      <div className="ckm-prof-hero-glow glow-2" />

      <div className="ckm-prof-hero-content">
        <div className="ckm-prof-avatar-wrap">
          <div className="ckm-prof-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>

          {/* ⚡ Show camera icon ONLY if no real avatar yet */}
          {!hasRealAvatar && (
            <button
              type="button"
              className="ckm-prof-avatar-edit"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              aria-label="Upload profile photo"
            >
              {uploading ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <i className="fa-solid fa-camera" />
              )}
            </button>
          )}

          {/* If they already have a real avatar, offer a small "change" button */}
          {hasRealAvatar && (
            <button
              type="button"
              className="ckm-prof-avatar-edit ckm-prof-avatar-edit-mini"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              aria-label="Change photo"
            >
              {uploading ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <i className="fa-solid fa-pen" />
              )}
            </button>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFile}
          />
        </div>

        <div className="ckm-prof-hero-info">
          <span className="ckm-prof-eyebrow">
            <span className="ckm-prof-eyebrow-line" />
            {t.profile.banner}
          </span>
          <h1 className="ckm-prof-name">{user.name}</h1>
          <p className="ckm-prof-meta">
            <i className="fa-solid fa-id-card" />
            <span>{user.memberId}</span>
            <span className="ckm-prof-dot">•</span>
            <i className="fa-solid fa-location-dot" />
            <span>
              {user.district}, {lang === 'hi' ? 'छत्तीसगढ़' : 'Chhattisgarh'}
            </span>
          </p>
          <span className="ckm-prof-badge">
            <i className="fa-solid fa-circle-check" />
            {user.role}
          </span>
          {error && (
            <p style={{ color: '#c0392b', fontSize: 13, marginTop: 8 }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}