// src/app/contact/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import {
  contactInfo,
  contactSocials,
  contactSubjects,
  mapEmbedUrl,
} from '@/data/contact';

export default function ContactPage() {
  const { lang, t } = useLang();
  const c = t.contact;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const pick = (obj, key = '') =>
    lang === 'hi' ? obj[`${key}Hi`] : obj[`${key}En`];

  const pickField = (obj) => (lang === 'hi' ? obj.hi : obj.en);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = c.errName;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = c.errEmail;
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10)))
      e.phone = c.errPhone;
    if (!form.subject) e.subject = c.errSubject;
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = c.errMessage;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1500);
  };

  const reset = () => {
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setSent(false);
  };

  return (
    <main className="ckm-contact-page">

      {/* ═══════════════════════════════════════════
          1. BANNER
          ═══════════════════════════════════════════ */}
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{c.bannerTitle}</h1>
          <p className="ckm-banner-sub">{c.bannerSub}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. INFO CARDS
          ═══════════════════════════════════════════ */}
      <section className="ckm-contact-info sec-padding">
        <div className="ckm-container">
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow" data-aos="fade-up">
              <span className="ckm-head-line" />
              {c.infoEyebrow}
            </span>
            <h2 className="ckm-head-title" data-aos="fade-up" data-aos-delay="100">
              {c.infoTitle}
            </h2>
            <p className="ckm-head-sub" data-aos="fade-up" data-aos-delay="200">
              {c.infoDesc}
            </p>
          </div>

          <div className="ckm-contact-info-grid">
            {contactInfo.map((info, i) => (
              <div
                className="ckm-contact-info-card"
                key={info.id}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="ckm-cic-icon">
                  <i className={`fa-solid ${info.icon}`} />
                </div>
                <h3>{pick(info, 'title')}</h3>
                <div className="ckm-cic-lines">
                  {(lang === 'hi' ? info.linesHi : info.linesEn).map((line, idx) => (
                    <span key={idx}>{line}</span>
                  ))}
                </div>
                {info.action && (
                  <a
                    href={info.action.href}
                    className="ckm-cic-action"
                    target={info.action.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {pickField(info.action)} <i className="fa fa-arrow-right" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. FORM + MAP
          ═══════════════════════════════════════════ */}
      <section className="ckm-contact-main sec-padding">
        <div className="ckm-container">
          <div className="ckm-contact-grid">

            {/* ─────── FORM ─────── */}
            <div className="ckm-contact-form-wrap" data-aos="fade-right">
              <span className="ckm-head-eyebrow">
                <span className="ckm-head-line" />
                {c.formEyebrow}
              </span>
              <h2 className="ckm-contact-form-title">{c.formTitle}</h2>
              <p className="ckm-contact-form-desc">{c.formDesc}</p>

              {sent ? (
                <div className="ckm-contact-success">
                  <div className="ckm-contact-success-icon">
                    <i className="fa-solid fa-circle-check" />
                  </div>
                  <h3>{c.successTitle}</h3>
                  <p>{c.successSub}</p>
                  <button
                    type="button"
                    className="ckm-btn-outline"
                    onClick={reset}
                  >
                    <i className="fa-solid fa-rotate-right" />
                    {c.sendAnother}
                  </button>
                </div>
              ) : (
                <form className="ckm-contact-form" onSubmit={submit} noValidate>
                  <div className="ckm-contact-form-grid">
                    <div className="ckm-field">
                      <label>{c.name} *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder={c.namePh}
                      />
                      {errors.name && <span className="ckm-err">{errors.name}</span>}
                    </div>

                    <div className="ckm-field">
                      <label>{c.email} *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder={c.emailPh}
                      />
                      {errors.email && <span className="ckm-err">{errors.email}</span>}
                    </div>

                    <div className="ckm-field">
                      <label>{c.phone} *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          set('phone', e.target.value.replace(/[^\d+\s-]/g, ''))
                        }
                        placeholder={c.phonePh}
                        maxLength={16}
                      />
                      {errors.phone && <span className="ckm-err">{errors.phone}</span>}
                    </div>

                    <div className="ckm-field">
                      <label>{c.subject} *</label>
                      <select
                        value={form.subject}
                        onChange={(e) => set('subject', e.target.value)}
                      >
                        <option value="">{c.subjectPh}</option>
                        {contactSubjects.map((s) => (
                          <option value={s.value} key={s.value}>
                            {lang === 'hi' ? s.labelHi : s.labelEn}
                          </option>
                        ))}
                      </select>
                      {errors.subject && <span className="ckm-err">{errors.subject}</span>}
                    </div>

                    <div className="ckm-field ckm-full">
                      <label>{c.message} *</label>
                      <textarea
                        rows="5"
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                        placeholder={c.messagePh}
                      />
                      {errors.message && <span className="ckm-err">{errors.message}</span>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="ckm-contact-submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin" />
                        {c.sending}
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane" />
                        {c.send}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ─────── MAP ─────── */}
            <div className="ckm-contact-map-wrap" data-aos="fade-left">
              <div className="ckm-contact-map-head">
                <span className="ckm-contact-map-icon">
                  <i className="fa-solid fa-map-location-dot" />
                </span>
                <div>
                  <h3>{c.mapTitle}</h3>
                  <p>{c.mapDesc}</p>
                </div>
              </div>

              <div className="ckm-contact-map">
                <iframe
                  src={mapEmbedUrl}
                  title={c.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Socials */}
              <div className="ckm-contact-socials">
                <p>{c.socialsDesc}</p>
                <div className="ckm-contact-socials-list">
                  {contactSocials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fa-brands ${s.icon}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. CTA BAND
          ═══════════════════════════════════════════ */}
      <section className="ckm-donate-cta">
        <div className="ckm-donate-cta-deco ckm-donate-cta-deco-1" />
        <div className="ckm-donate-cta-deco ckm-donate-cta-deco-2" />

        <div className="ckm-container">
          <div className="ckm-donate-cta-inner">
            <span className="ckm-donate-cta-eyebrow">
              <i className="fa-solid fa-hand-holding-heart" />
              {lang === 'hi' ? 'सहयोग करें' : 'Support Us'}
            </span>

            <h2 className="ckm-donate-cta-title">
              {lang === 'hi'
                ? 'आइए, मिलकर एक सशक्त समाज का निर्माण करें'
                : 'Let Us Build a Strong Society Together'}
            </h2>

            <p className="ckm-donate-cta-desc">
              {lang === 'hi'
                ? 'आपका सहयोग ही हमारी सबसे बड़ी शक्ति है।'
                : 'Your support is our greatest strength.'}
            </p>

            <div className="ckm-donate-cta-actions">
              <Link href="/donation" className="ckm-cta-btn-gold-lg">
                <i className="fa-solid fa-heart" />
                {lang === 'hi' ? 'दान करें' : 'Donate Now'}
              </Link>
              <Link href="/join" className="ckm-cta-btn-ghost-lg">
                {lang === 'hi' ? 'सदस्य बनें' : 'Join Now'}{' '}
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}