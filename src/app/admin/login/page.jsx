// src/app/admin/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('कृपया ईमेल और पासवर्ड दर्ज करें');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...form, remember }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'लॉगिन विफल');
      }

      /* Hard navigation — proxy ko fresh evaluate karne ke liye */
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError(err.message || 'कुछ गलत हो गया');
      setLoading(false);
    }
  };

  return (
    <div className="ckm-admin-login">
      <div className="ckm-admin-login-bg" />

      <div className="ckm-admin-login-card">
        {/* Logo */}
        <div className="ckm-admin-login-logo">
          <img src="/images/ckm-logo.png" alt="CKM" />
        </div>

        <h1 className="ckm-admin-login-title">Admin Login</h1>
        <p className="ckm-admin-login-sub">
          छत्तीसगढ़ कलार महासंघ — Admin Panel
        </p>

        {error && (
          <div className="ckm-admin-login-error">
            <i className="fa-solid fa-circle-exclamation" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="ckm-admin-login-field">
            <label htmlFor="admin-email">Email</label>
            <div className="ckm-admin-login-input">
              <i className="fa-solid fa-envelope" />
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@ckm.org"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div className="ckm-admin-login-field">
            <label htmlFor="admin-password">Password</label>
            <div className="ckm-admin-login-input">
              <i className="fa-solid fa-lock" />
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="ckm-admin-login-toggle"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
          </div>

          {/* Remember */}
          <label className="ckm-admin-login-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={loading}
            />
            <span>Remember me for 30 days</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="ckm-admin-login-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="ckm-admin-spinner" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <i className="fa-solid fa-arrow-right" />
              </>
            )}
          </button>
        </form>

        <div className="ckm-admin-login-footer">
          <Link href="/">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}