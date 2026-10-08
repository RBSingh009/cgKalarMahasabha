// src/app/admin/settings/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSection from '@/components/admin/AdminSection';
import Toast from '@/components/admin/Toast';

const EMPTY = {
  siteNameHi: '',
  siteNameEn: '',
  taglineHi: '',
  taglineEn: '',
  phone: '',
  email: '',
  address: '',
  facebook: '',
  twitter: '',
  instagram: '',
  youtube: '',
  logoUrl: '',
  aboutHi: '',
  aboutEn: '',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...EMPTY, ...(data.settings || {}) });
      }
    } catch {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');

      setToast({ type: 'success', message: 'Settings saved' });
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="ckm-admin-card-loading">
        <span className="ckm-admin-spinner" />
      </div>
    );
  }

  return (
    <>
      <AdminSection
        title="Settings"
        subtitle="Site-wide information used across the website"
        actions={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <span className="ckm-admin-spinner" />
            ) : (
              <>
                <i className="fa-solid fa-floppy-disk" />
                Save Settings
              </>
            )}
          </button>
        }
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* ============ Site Identity ============ */}
        <SettingsCard
          icon="fa-solid fa-globe"
          title="Site Identity"
        >
          <div className="ckm-admin-form-grid">
            <div className="ckm-admin-form-field">
              <label>Site Name (Hindi)</label>
              <input
                type="text"
                value={settings.siteNameHi}
                onChange={(e) => handleChange('siteNameHi', e.target.value)}
                placeholder="छत्तीसगढ़ कलार महासंघ"
              />
            </div>

            <div className="ckm-admin-form-field">
              <label>Site Name (English)</label>
              <input
                type="text"
                value={settings.siteNameEn}
                onChange={(e) => handleChange('siteNameEn', e.target.value)}
                placeholder="Chhattisgarh Kalar Mahasangh"
              />
            </div>

            <div className="ckm-admin-form-field ckm-admin-form-full">
              <label>Tagline (Hindi)</label>
              <input
                type="text"
                value={settings.taglineHi}
                onChange={(e) => handleChange('taglineHi', e.target.value)}
                placeholder="सशक्त समाज - उज्ज्वल भविष्य"
              />
            </div>

            <div className="ckm-admin-form-field ckm-admin-form-full">
              <label>Tagline (English)</label>
              <input
                type="text"
                value={settings.taglineEn}
                onChange={(e) => handleChange('taglineEn', e.target.value)}
                placeholder="Empowered Society - Bright Future"
              />
            </div>

            <div className="ckm-admin-form-field ckm-admin-form-full">
              <label>Logo URL</label>
              <input
                type="text"
                value={settings.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="/images/ckm-logo.png"
              />
            </div>
          </div>
        </SettingsCard>

        {/* ============ Contact ============ */}
        <SettingsCard
          icon="fa-solid fa-address-book"
          title="Contact Information"
        >
          <div className="ckm-admin-form-grid">
            <div className="ckm-admin-form-field">
              <label>Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 98260 50235"
              />
            </div>

            <div className="ckm-admin-form-field">
              <label>Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="cgkalarmahasangh@gmail.com"
              />
            </div>

            <div className="ckm-admin-form-field ckm-admin-form-full">
              <label>Address</label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="रायपुर, छत्तीसगढ़, भारत"
              />
            </div>
          </div>
        </SettingsCard>

        {/* ============ Social ============ */}
        <SettingsCard
          icon="fa-solid fa-share-nodes"
          title="Social Media Links"
        >
          <div className="ckm-admin-form-grid">
            <div className="ckm-admin-form-field">
              <label>
                <i className="fa-brands fa-facebook" /> Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="ckm-admin-form-field">
              <label>
                <i className="fa-brands fa-x-twitter" /> Twitter / X URL
              </label>
              <input
                type="url"
                value={settings.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                placeholder="https://x.com/..."
              />
            </div>

            <div className="ckm-admin-form-field">
              <label>
                <i className="fa-brands fa-instagram" /> Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="ckm-admin-form-field">
              <label>
                <i className="fa-brands fa-youtube" /> YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) => handleChange('youtube', e.target.value)}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </SettingsCard>

        {/* ============ About ============ */}
        <SettingsCard
          icon="fa-solid fa-circle-info"
          title="About Text"
        >
          <div className="ckm-admin-form-grid">
            <div className="ckm-admin-form-field ckm-admin-form-full">
              <label>About (Hindi)</label>
              <textarea
                rows={4}
                value={settings.aboutHi}
                onChange={(e) => handleChange('aboutHi', e.target.value)}
                placeholder="Short description in Hindi"
              />
            </div>

            <div className="ckm-admin-form-field ckm-admin-form-full">
              <label>About (English)</label>
              <textarea
                rows={4}
                value={settings.aboutEn}
                onChange={(e) => handleChange('aboutEn', e.target.value)}
                placeholder="Short description in English"
              />
            </div>
          </div>
        </SettingsCard>

        {/* ============ Save button (bottom) ============ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '24px',
          }}
        >
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-ghost"
            onClick={load}
            disabled={saving}
          >
            Reset
          </button>
          <button
            type="submit"
            className="ckm-admin-btn ckm-admin-btn-primary"
            disabled={saving}
          >
            {saving ? (
              <span className="ckm-admin-spinner" />
            ) : (
              <>
                <i className="fa-solid fa-floppy-disk" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

/* ============================================================
   Small helper: settings card
   ============================================================ */
function SettingsCard({ icon, title, children }) {
  return (
    <section
      style={{
        background: '#fff',
        border: '1px solid var(--admin-border)',
        borderRadius: '16px',
        padding: '22px 24px',
        marginBottom: '20px',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          paddingBottom: '14px',
          borderBottom: '1px dashed rgba(201, 162, 75, 0.3)',
        }}
      >
        <span
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background:
              'linear-gradient(135deg, rgba(201, 162, 75, 0.22), rgba(201, 162, 75, 0.06))',
            color: 'var(--admin-gold-dark)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
          }}
        >
          <i className={icon} />
        </span>
        <h2
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--admin-maroon-deep)',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </header>

      {children}
    </section>
  );
}