// src/components/auth/LoginForm.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/context/LanguageContext';

export default function LoginForm({
  redirectTo,
  onSuccess,
  showSocials = false,
  showRegisterLink = true,
  compact = false,
}) {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const { t } = useLang();

  const L = t.login;

  const [form, setForm] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const next = params.get('next') || redirectTo || '/dashboard';

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.identifier.trim() || !form.password) {
      setError(L.errAll);
      return;
    }
    if (form.password.length < 6) {
      setError(L.errPassword);
      return;
    }

    setLoading(true);
    try {
      await login(form.identifier.trim(), form.password, remember);
      if (typeof onSuccess === 'function') onSuccess();
      else router.replace(next);
    } catch (err) {
      setError(err.message || L.errInvalid);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`ckm-auth-form ${compact ? 'ckm-auth-form-compact' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {error && (
        <div className="ckm-auth-alert" role="alert">
          <i className="fa-solid fa-circle-exclamation" />
          <span>{error}</span>
        </div>
      )}

      <div className="ckm-auth-field">
        <label htmlFor="ckm-identifier">{L.identifier}</label>
        <div className="ckm-auth-input-wrap">
          <i className="fa-solid fa-user ckm-auth-input-icon" />
          <input
            id="ckm-identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder={L.identifierPh}
            value={form.identifier}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="ckm-auth-field">
        <label htmlFor="ckm-password">{L.password}</label>
        <div className="ckm-auth-input-wrap">
          <i className="fa-solid fa-lock ckm-auth-input-icon" />
          <input
            id="ckm-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder={L.passwordPh}
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <button
            type="button"
            className="ckm-auth-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide' : 'Show'}
            tabIndex={-1}
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
          </button>
        </div>
      </div>

      <div className="ckm-auth-row">
        <label className="ckm-auth-check">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            disabled={loading}
          />
          <span className="ckm-auth-check-box" aria-hidden="true">
            <i className="fa-solid fa-check" />
          </span>
          <span>{L.rememberMe}</span>
        </label>

        <Link href="/forgot-password" className="ckm-auth-forgot">
          {L.forgot}
        </Link>
      </div>

      <button type="submit" className="ckm-auth-submit" disabled={loading}>
        {loading ? (
          <>
            <span className="ckm-auth-spinner" />
            {L.submitting}
          </>
        ) : (
          <>
            {L.submit}
            <i className="fa-solid fa-arrow-right" />
          </>
        )}
      </button>

      {showRegisterLink && (
        <p className="ckm-auth-foot">
          {L.newHere} <Link href="/join">{L.register}</Link>
        </p>
      )}
    </form>
  );
}