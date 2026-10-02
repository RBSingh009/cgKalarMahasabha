// src/app/donation/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import {
  presetAmounts,
  impactLevels,
  paymentMethods,
  trustBadges,
  bankDetails,
  donationStats,
} from '@/data/donation';

export default function DonationPage() {
  const { lang, t } = useLang();
  const d = t.donation;

  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [method, setMethod] = useState('upi');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: '',
    message: '',
    anonymous: false,
    eighty: true,
  });
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState('');

  const finalAmount = useCustom ? Number(customAmount) || 0 : amount;

  const pick = (obj) => (lang === 'hi' ? obj.hi : obj.en);
  const pick2 = (obj, k) => (lang === 'hi' ? obj[`${k}Hi`] : obj[`${k}En`]);

  const handleFormChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!finalAmount || finalAmount < 100) e.amount = d.errAmount;
    if (!form.name.trim()) e.name = d.errName;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = d.errEmail;
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone)) e.phone = d.errPhone;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
    }, 1500);
  };

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1600);
    } catch {}
  };

  /* ============ SUCCESS SCREEN ============ */
  if (paid) {
    return (
      <main className="ckm-donate-page ckm-page-offset">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">{d.successTitle}</h1>
            <p className="ckm-banner-sub">{d.successSub}</p>
          </div>
        </section>
        <section className="ckm-donate-success sec-padding">
          <div className="ckm-container">
            <div className="ckm-success-card">
              <div className="ckm-success-icon">
                <i className="fa-solid fa-circle-check" />
              </div>
              <h2>₹{finalAmount.toLocaleString('en-IN')}</h2>
              <p>{d.successReceipt}</p>
              <div className="ckm-success-actions">
                <Link href="/" className="ckm-about-cta">
                  {lang === 'hi' ? 'होम पर जाएं' : 'Go Home'}
                  <i className="fa fa-arrow-right" />
                </Link>
                <button
                  className="ckm-cta-btn-ghost-lg"
                  onClick={() => {
                    setPaid(false);
                    setForm({
                      name: '',
                      email: '',
                      phone: '',
                      pan: '',
                      address: '',
                      message: '',
                      anonymous: false,
                      eighty: true,
                    });
                  }}
                >
                  {lang === 'hi' ? 'और दान करें' : 'Donate Again'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ============ MAIN FORM ============ */
  return (
    <main className="ckm-donate-page ckm-page-offset">
      {/* Banner */}
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{d.bannerTitle}</h1>
          <p className="ckm-banner-sub">{d.bannerSub}</p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="ckm-donate-stats">
        <div className="ckm-container">
          <div className="ckm-donate-stats-grid">
            {donationStats.map((s, i) => (
              <div className="ckm-donate-stat" key={i}>
                <strong>{s.value}</strong>
                <span>{lang === 'hi' ? s.labelHi : s.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="ckm-donate-main sec-padding">
        <div className="ckm-container">
          <form className="ckm-donate-grid" onSubmit={handlePay}>
            {/* LEFT */}
            <div className="ckm-donate-left">
              {/* 1. Amount */}
              <div className="ckm-donate-block" data-aos="fade-up">
                <div className="ckm-donate-block-head">
                  <span className="ckm-donate-step">1</span>
                  <div>
                    <h2>{d.amountTitle}</h2>
                    <p>{d.amountSub}</p>
                  </div>
                </div>

                <div className="ckm-amount-grid">
                  {presetAmounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`ckm-amount-btn ${!useCustom && amount === a ? 'active' : ''}`}
                      onClick={() => {
                        setAmount(a);
                        setUseCustom(false);
                        if (errors.amount) setErrors((e) => ({ ...e, amount: '' }));
                      }}
                    >
                      ₹{a.toLocaleString('en-IN')}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`ckm-amount-btn ckm-amount-custom ${useCustom ? 'active' : ''}`}
                    onClick={() => setUseCustom(true)}
                  >
                    <i className="fa-solid fa-pen" /> {d.customAmount}
                  </button>
                </div>

                {useCustom && (
                  <div className="ckm-custom-amount-wrap">
                    <span className="ckm-currency">{d.currency}</span>
                    <input
                      type="number"
                      min="100"
                      placeholder={d.amountPlaceholder}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (errors.amount) setErrors((er) => ({ ...er, amount: '' }));
                      }}
                      autoFocus
                    />
                  </div>
                )}

                {errors.amount && <p className="ckm-form-err">{errors.amount}</p>}
              </div>

              {/* 2. Impact */}
              <div className="ckm-donate-block" data-aos="fade-up" data-aos-delay="80">
                <div className="ckm-donate-block-head">
                  <span className="ckm-donate-step">2</span>
                  <div>
                    <h2>{d.impactTitle}</h2>
                    <p>{d.impactSub}</p>
                  </div>
                </div>

                <div className="ckm-impact-grid">
                  {impactLevels.map((im, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`ckm-impact-card ${finalAmount >= im.amount ? 'reached' : ''}`}
                      onClick={() => {
                        setAmount(im.amount);
                        setUseCustom(false);
                      }}
                    >
                      <div className="ckm-impact-icon">
                        <i className={`fa-solid ${im.icon}`} />
                      </div>
                      <strong>₹{im.amount.toLocaleString('en-IN')}</strong>
                      <span>{pick2(im, 'title')}</span>
                      <small>{pick2(im, 'desc')}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Payment */}
              <div className="ckm-donate-block" data-aos="fade-up" data-aos-delay="140">
                <div className="ckm-donate-block-head">
                  <span className="ckm-donate-step">3</span>
                  <div>
                    <h2>{d.paymentTitle}</h2>
                    <p>{d.paymentSub}</p>
                  </div>
                </div>

                <div className="ckm-payment-grid">
                  {paymentMethods.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`ckm-payment-btn ${method === p.id ? 'active' : ''}`}
                      onClick={() => setMethod(p.id)}
                    >
                      <i className={`fa-solid ${p.icon}`} />
                      <span>{lang === 'hi' ? p.labelHi : p.labelEn}</span>
                      <i className="fa-solid fa-circle-check ckm-payment-check" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Donor */}
              <div className="ckm-donate-block" data-aos="fade-up" data-aos-delay="200">
                <div className="ckm-donate-block-head">
                  <span className="ckm-donate-step">4</span>
                  <div>
                    <h2>{d.formTitle}</h2>
                    <p>{d.formSub}</p>
                  </div>
                </div>

                <div className="ckm-form-grid">
                  <div className="ckm-form-field">
                    <label>{d.fullName} *</label>
                    <input
                      type="text"
                      placeholder={d.fullNamePh}
                      value={form.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                    />
                    {errors.name && <span className="ckm-form-err">{errors.name}</span>}
                  </div>

                  <div className="ckm-form-field">
                    <label>{d.email} *</label>
                    <input
                      type="email"
                      placeholder={d.emailPh}
                      value={form.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                    />
                    {errors.email && <span className="ckm-form-err">{errors.email}</span>}
                  </div>

                  <div className="ckm-form-field">
                    <label>{d.phone} *</label>
                    <input
                      type="tel"
                      placeholder={d.phonePh}
                      value={form.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                    />
                    {errors.phone && <span className="ckm-form-err">{errors.phone}</span>}
                  </div>

                  <div className="ckm-form-field">
                    <label>{d.pan}</label>
                    <input
                      type="text"
                      placeholder={d.panPh}
                      value={form.pan}
                      onChange={(e) => handleFormChange('pan', e.target.value.toUpperCase())}
                      maxLength={10}
                    />
                  </div>

                  <div className="ckm-form-field ckm-form-full">
                    <label>{d.address}</label>
                    <input
                      type="text"
                      placeholder={d.addressPh}
                      value={form.address}
                      onChange={(e) => handleFormChange('address', e.target.value)}
                    />
                  </div>

                  <div className="ckm-form-field ckm-form-full">
                    <label>{d.message}</label>
                    <textarea
                      rows="3"
                      placeholder={d.messagePh}
                      value={form.message}
                      onChange={(e) => handleFormChange('message', e.target.value)}
                    />
                  </div>

                  <div className="ckm-form-check ckm-form-full">
                    <label>
                      <input
                        type="checkbox"
                        checked={form.anonymous}
                        onChange={(e) => handleFormChange('anonymous', e.target.checked)}
                      />
                      <span>{d.anonymous}</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={form.eighty}
                        onChange={(e) => handleFormChange('eighty', e.target.checked)}
                      />
                      <span>{d.eighty}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - SUMMARY */}
            <aside className="ckm-donate-right">
              <div className="ckm-donate-summary" data-aos="fade-left">
                <h3 className="ckm-summary-title">{d.summaryTitle}</h3>

                <div className="ckm-summary-row">
                  <span>{d.summaryAmount}</span>
                  <strong>₹{finalAmount.toLocaleString('en-IN')}</strong>
                </div>

                <div className="ckm-summary-row">
                  <span>{d.summaryFee}</span>
                  <strong className="ckm-free">{d.summaryFeeFree}</strong>
                </div>

                <div className="ckm-summary-divider" />

                <div className="ckm-summary-total">
                  <span>{d.summaryTotal}</span>
                  <strong>₹{finalAmount.toLocaleString('en-IN')}</strong>
                </div>

                <button type="submit" className="ckm-pay-btn" disabled={paying}>
                  {paying ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" />
                      {d.payingNow}
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-lock" />
                      {d.payNow}
                    </>
                  )}
                </button>

                <div className="ckm-trust-badges">
                  {trustBadges.map((b, i) => (
                    <div className="ckm-trust-badge" key={i}>
                      <i className={`fa-solid ${b.icon}`} />
                      <span>{lang === 'hi' ? b.textHi : b.textEn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </form>

          {/* Bank transfer */}
          <div className="ckm-bank-section" data-aos="fade-up">
            <div className="ckm-bank-head">
              <div className="ckm-bank-icon">
                <i className="fa-solid fa-building-columns" />
              </div>
              <div>
                <h3>{d.bankTitle}</h3>
                <p>{d.bankSub}</p>
              </div>
            </div>

            <div className="ckm-bank-grid">
              {[
                { label: d.bankAccName, value: bankDetails.accountName, key: 'an' },
                { label: d.bankAccNo,   value: bankDetails.accountNo,   key: 'ac' },
                { label: d.bankIfsc,    value: bankDetails.ifsc,        key: 'if' },
                { label: d.bankName,    value: bankDetails.bank,        key: 'bn' },
                { label: d.bankBranch,  value: bankDetails.branch,      key: 'br' },
                { label: d.bankUpi,     value: bankDetails.upi,         key: 'up' },
              ].map((row) => (
                <div className="ckm-bank-row" key={row.key}>
                  <span className="ckm-bank-label">{row.label}</span>
                  <span className="ckm-bank-value">{row.value}</span>
                  <button
                    type="button"
                    className="ckm-bank-copy"
                    onClick={() => copyText(row.value, row.key)}
                    aria-label={d.copyLabel}
                  >
                    {copied === row.key ? (
                      <>
                        <i className="fa-solid fa-check" /> {d.copied}
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-copy" /> {d.copyLabel}
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}