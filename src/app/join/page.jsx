// src/app/join/page.jsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { tiers } from '@/data/tiers';
import { districts, districtsEn } from '@/data/membership';

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5'];

export default function JoinPage() {
  const { lang, t } = useLang();
  const j = t.join;
  const isHi = lang === 'hi';

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    /* Step 1 */
    fullName: '',
    fatherName: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    /* Step 2 */
    addressLine1: '',
    addressLine2: '',
    city: '',
    district: '',
    state: 'छत्तीसगढ़',
    pincode: '',
    /* Step 3 */
    tier: 'general',
    /* Step 4 */
    idType: 'aadhaar',
    idNumber: '',
    photoFile: null,
    docFile: null,
    /* Step 5 */
    agree: false,
  });

  const districtList = isHi ? districts : districtsEn;
  const selectedTier = tiers.find((tt) => tt.key === form.tier);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  };

  /* =================== VALIDATION =================== */
  const validateStep = (s) => {
    const errs = {};

    if (s === 0) {
      if (!form.fullName.trim() || form.fullName.trim().length < 3)
        errs.fullName = j.errName;
      if (!form.fatherName.trim()) errs.fatherName = j.errRequired;
      if (!form.gender) errs.gender = j.errRequired;
      if (!form.dob) errs.dob = j.errDob;
      else {
        const age =
          (Date.now() - new Date(form.dob).getTime()) /
          (365.25 * 24 * 3600 * 1000);
        if (age < 18)
          errs.dob = isHi
            ? 'आयु कम से कम 18 वर्ष होनी चाहिए'
            : 'Must be at least 18 years old';
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = j.errEmail;
      if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10)))
        errs.phone = j.errPhone;
    }

    if (s === 1) {
      if (!form.addressLine1.trim()) errs.addressLine1 = j.errRequired;
      if (!form.city.trim()) errs.city = j.errRequired;
      if (!form.district) errs.district = j.errRequired;
      if (!form.state.trim()) errs.state = j.errRequired;
      if (!/^\d{6}$/.test(form.pincode)) errs.pincode = j.errPincode;
    }

    if (s === 2) {
      if (!form.tier) errs.tier = j.errRequired;
    }

    if (s === 3) {
      if (!form.photoFile) errs.photoFile = j.errPhoto;

      const digits = form.idNumber.replace(/\D/g, '');
      if (form.idType === 'aadhaar' && !/^\d{12}$/.test(digits))
        errs.idNumber = j.errAadhaar;
      else if (
        form.idType === 'pan' &&
        !/^[A-Z]{5}\d{4}[A-Z]$/.test(form.idNumber.toUpperCase())
      )
        errs.idNumber = j.errPan;
      else if (
        form.idType === 'voter' &&
        !/^[A-Z0-9]{8,12}$/.test(form.idNumber.toUpperCase())
      )
        errs.idNumber = isHi
          ? 'कृपया वैध वोटर आईडी भरें'
          : 'Please enter a valid Voter ID';
      if (!form.idNumber.trim()) errs.idNumber = j.errRequired;
      if (!form.docFile) errs.docFile = j.errDoc;
    }

    if (s === 4) {
      if (!form.agree) errs.agree = j.errTerms;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setSubmitting(true);

    const random = Math.floor(100000 + Math.random() * 900000);
    const prefix =
      form.tier === 'patron'
        ? 'CKM-P'
        : form.tier === 'life'
        ? 'CKM-L'
        : 'CKM-G';
    const newId = `${prefix}-2026-${random}`;

    setTimeout(() => {
      setSubmitting(false);
      setMemberId(newId);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  /* =================== ID CARD PREVIEW =================== */
  const cardData = useMemo(
    () => ({
      name: form.fullName || (isHi ? 'आपका नाम' : 'Your Name'),
      memberId: memberId || 'CKM-2026-______',
      tier: selectedTier
        ? isHi
          ? selectedTier.nameHi
          : selectedTier.nameEn
        : '-',
      district: form.district || '-',
      validUpto: isHi ? '31 दिसंबर 2026' : '31 December 2026',
      issued: new Date().toLocaleDateString(isHi ? 'hi-IN' : 'en-IN'),
      photoUrl: form.photoFile ? URL.createObjectURL(form.photoFile) : null,
    }),
    [
      form.fullName,
      form.district,
      form.photoFile,
      selectedTier,
      isHi,
      memberId,
    ]
  );

  /* =================== SUCCESS =================== */
  if (submitted) {
    return (
      <main className="ckm-join-page">
        <section className="ckm-page-banner">
          <div className="ckm-container">
            <h1 className="ckm-banner-title">{j.successTitle}</h1>
            <p className="ckm-banner-sub">{j.successSub}</p>
          </div>
        </section>

        <section className="ckm-join-success sec-padding">
          <div className="ckm-container">
            <div className="ckm-success-wrap">
              <div className="ckm-success-icon">
                <i className="fa-solid fa-circle-check" />
              </div>

              <p className="ckm-success-idlabel">{j.successIdLabel}</p>
              <h2 className="ckm-success-id">{memberId}</h2>
              <p className="ckm-success-note">{j.successNote}</p>

              <div className="ckm-success-actions">
                <button
                  className="ckm-cta-btn-gold-lg"
                  onClick={() => window.print()}
                  type="button"
                >
                  <i className="fa-solid fa-download" />
                  {j.downloadCard}
                </button>
                <Link href="/" className="ckm-cta-btn-ghost-lg">
                  {j.goHome} <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =================== MAIN =================== */
  return (
    <main className="ckm-join-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{j.bannerTitle}</h1>
          <p className="ckm-banner-sub">{j.bannerSub}</p>
        </div>
      </section>

      {/* Stepper */}
      <section className="ckm-stepper-sec">
        <div className="ckm-container">
          <ol className="ckm-stepper">
            {STEPS.map((key, i) => (
              <li
                key={key}
                className={`ckm-step ${i === step ? 'is-active' : ''} ${
                  i < step ? 'is-done' : ''
                }`}
              >
                <span className="ckm-step-num">
                  {i < step ? <i className="fa-solid fa-check" /> : i + 1}
                </span>
                <span className="ckm-step-label">{j[key]}</span>
                {i < STEPS.length - 1 && <span className="ckm-step-line" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ckm-join-main">
        <div className="ckm-container">
          <div className="ckm-join-grid">
            {/* FORM */}
            <form className="ckm-join-form" onSubmit={submit} noValidate>
              {/* ============= STEP 1 - PERSONAL ============= */}
              {step === 0 && (
                <div className="ckm-join-block" data-aos="fade-up">
                  <h2>{j.personalTitle}</h2>
                  <p>{j.personalSub}</p>

                  <div className="ckm-form-grid">
                    <div className="ckm-field ckm-full">
                      <label>{j.fullName} *</label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => set('fullName', e.target.value)}
                        placeholder={j.fullNamePh}
                      />
                      {errors.fullName && (
                        <span className="ckm-err">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="ckm-field ckm-full">
                      <label>{j.fatherName} *</label>
                      <input
                        type="text"
                        value={form.fatherName}
                        onChange={(e) => set('fatherName', e.target.value)}
                        placeholder={j.fatherNamePh}
                      />
                      {errors.fatherName && (
                        <span className="ckm-err">{errors.fatherName}</span>
                      )}
                    </div>

                    <div className="ckm-field">
                      <label>{j.gender} *</label>
                      <div className="ckm-radio-row">
                        {['male', 'female', 'other'].map((g) => (
                          <label
                            key={g}
                            className={`ckm-radio-chip ${
                              form.gender === g ? 'is-active' : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={form.gender === g}
                              onChange={() => set('gender', g)}
                            />
                            {j[`gender${g[0].toUpperCase() + g.slice(1)}`]}
                          </label>
                        ))}
                      </div>
                      {errors.gender && (
                        <span className="ckm-err">{errors.gender}</span>
                      )}
                    </div>

                    <div className="ckm-field">
                      <label>{j.dob} *</label>
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) => set('dob', e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      {errors.dob && (
                        <span className="ckm-err">{errors.dob}</span>
                      )}
                    </div>

                    <div className="ckm-field">
                      <label>{j.email} *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder={j.emailPh}
                      />
                      {errors.email && (
                        <span className="ckm-err">{errors.email}</span>
                      )}
                    </div>

                    <div className="ckm-field">
                      <label>{j.phone} *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          set('phone', e.target.value.replace(/[^\d+\s-]/g, ''))
                        }
                        placeholder={j.phonePh}
                        maxLength={16}
                      />
                      {errors.phone && (
                        <span className="ckm-err">{errors.phone}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ============= STEP 2 - ADDRESS ============= */}
              {step === 1 && (
                <div className="ckm-join-block" data-aos="fade-up">
                  <h2>{j.addressTitle}</h2>
                  <p>{j.addressSub}</p>

                  <div className="ckm-form-grid">
                    <div className="ckm-field ckm-full">
                      <label>{j.addressLine1} *</label>
                      <input
                        type="text"
                        value={form.addressLine1}
                        onChange={(e) => set('addressLine1', e.target.value)}
                        placeholder={j.addressLine1Ph}
                      />
                      {errors.addressLine1 && (
                        <span className="ckm-err">{errors.addressLine1}</span>
                      )}
                    </div>

                    <div className="ckm-field ckm-full">
                      <label>{j.addressLine2}</label>
                      <input
                        type="text"
                        value={form.addressLine2}
                        onChange={(e) => set('addressLine2', e.target.value)}
                        placeholder={j.addressLine2Ph}
                      />
                    </div>

                    <div className="ckm-field">
                      <label>{j.city} *</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => set('city', e.target.value)}
                        placeholder={j.cityPh}
                      />
                      {errors.city && (
                        <span className="ckm-err">{errors.city}</span>
                      )}
                    </div>

                    <div className="ckm-field">
                      <label>{j.district} *</label>
                      <select
                        value={form.district}
                        onChange={(e) => set('district', e.target.value)}
                      >
                        <option value="">{j.districtPh}</option>
                        {districtList.map((d) => (
                          <option value={d} key={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      {errors.district && (
                        <span className="ckm-err">{errors.district}</span>
                      )}
                    </div>

                    <div className="ckm-field">
                      <label>{j.state} *</label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => set('state', e.target.value)}
                        placeholder={j.statePh}
                      />
                      {errors.state && (
                        <span className="ckm-err">{errors.state}</span>
                      )}
                    </div>

                    <div className="ckm-field">
                      <label>{j.pincode} *</label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) =>
                          set(
                            'pincode',
                            e.target.value.replace(/\D/g, '').slice(0, 6)
                          )
                        }
                        placeholder={j.pincodePh}
                        maxLength={6}
                        inputMode="numeric"
                      />
                      {errors.pincode && (
                        <span className="ckm-err">{errors.pincode}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ============= STEP 3 - MEMBERSHIP TIER ============= */}
              {step === 2 && (
                <div className="ckm-join-block" data-aos="fade-up">
                  <h2>{j.membershipTitle}</h2>
                  <p>{j.membershipSub}</p>

                  <div className="ckm-tier-pick">
                    {tiers.map((tier) => (
                      <label
                        key={tier.id}
                        className={`ckm-tier-pick-card ${
                          form.tier === tier.key ? 'is-active' : ''
                        } ${tier.popular ? 'is-popular' : ''}`}
                      >
                        <input
                          type="radio"
                          name="tier"
                          value={tier.key}
                          checked={form.tier === tier.key}
                          onChange={() => set('tier', tier.key)}
                        />

                        {tier.popular && (
                          <span className="ckm-tier-pick-badge">
                            {isHi ? 'प्रसिद्ध' : 'Popular'}
                          </span>
                        )}

                        <h3>{isHi ? tier.nameHi : tier.nameEn}</h3>

                        <div className="ckm-tier-pick-price">
                          <strong>{tier.price}</strong>
                          {tier.priceAlt && (
                            <em>
                              / {tier.priceAlt}
                              {isHi ? tier.periodAltHi : tier.periodAltEn}
                            </em>
                          )}
                          <span>{isHi ? tier.periodHi : tier.periodEn}</span>
                        </div>

                        <ul>
                          {(isHi ? tier.featuresHi : tier.featuresEn)
                            .slice(0, 3)
                            .map((f, i) => (
                              <li key={i}>
                                <i className="fa-solid fa-check" />
                                {f}
                              </li>
                            ))}
                        </ul>

                        {/* ⚡ Upgrade / dual path block */}
                        {tier.upgrade && (
                          <div className="ckm-tier-pick-upgrade">
                            <span className="ckm-tier-pick-upgrade-badge">
                              <i className="fa-solid fa-arrow-up" />
                              {isHi
                                ? tier.upgrade.badgeHi
                                : tier.upgrade.badgeEn}
                            </span>
                            <small>
                              {isHi
                                ? tier.upgrade.textHi
                                : tier.upgrade.textEn}
                            </small>
                          </div>
                        )}

                        <span className="ckm-tier-pick-check">
                          <i className="fa-solid fa-circle-check" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ============= STEP 4 - DOCUMENTS ============= */}
              {step === 3 && (
                <div className="ckm-join-block" data-aos="fade-up">
                  <h2>{j.docsTitle}</h2>
                  <p>{j.docsSub}</p>

                  <div className="ckm-form-grid">
                    {/* Photo upload */}
                    <div className="ckm-field ckm-full">
                      <label>{j.photoUpload} *</label>
                      <label
                        className={`ckm-file-drop ${
                          form.photoFile ? 'has-file' : ''
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.size > 2 * 1024 * 1024) {
                              setErrors((er) => ({
                                ...er,
                                photoFile: isHi
                                  ? 'फाइल 2MB से कम होनी चाहिए'
                                  : 'File must be under 2MB',
                              }));
                              return;
                            }
                            set('photoFile', file || null);
                          }}
                        />
                        <span className="ckm-file-icon">
                          <i
                            className={`fa-solid ${
                              form.photoFile
                                ? 'fa-circle-check'
                                : 'fa-cloud-arrow-up'
                            }`}
                          />
                        </span>
                        <span className="ckm-file-name">
                          {form.photoFile
                            ? form.photoFile.name
                            : isHi
                            ? 'फोटो चुनने के लिए क्लिक करें'
                            : 'Click to select photo'}
                        </span>
                        <span className="ckm-file-hint">{j.photoHint}</span>
                      </label>
                      {errors.photoFile && (
                        <span className="ckm-err">{errors.photoFile}</span>
                      )}
                    </div>

                    {/* ID type */}
                    <div className="ckm-field">
                      <label>{j.idType} *</label>
                      <select
                        value={form.idType}
                        onChange={(e) => set('idType', e.target.value)}
                      >
                        <option value="aadhaar">{j.idAadhaar}</option>
                        <option value="pan">{j.idPan}</option>
                        <option value="voter">{j.idVoter}</option>
                      </select>
                    </div>

                    {/* ID number */}
                    <div className="ckm-field">
                      <label>{j.idNumber} *</label>
                      <input
                        type="text"
                        value={form.idNumber}
                        onChange={(e) => {
                          const v =
                            form.idType === 'aadhaar'
                              ? e.target.value
                                  .replace(/\D/g, '')
                                  .slice(0, 12)
                              : e.target.value.toUpperCase().slice(0, 12);
                          set('idNumber', v);
                        }}
                        placeholder={j.idNumberPh}
                      />
                      {errors.idNumber && (
                        <span className="ckm-err">{errors.idNumber}</span>
                      )}
                    </div>

                    {/* ID document upload */}
                    <div className="ckm-field ckm-full">
                      <label>{j.idUpload} *</label>
                      <label
                        className={`ckm-file-drop ${
                          form.docFile ? 'has-file' : ''
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/png, image/jpeg, application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.size > 5 * 1024 * 1024) {
                              setErrors((er) => ({
                                ...er,
                                docFile: isHi
                                  ? 'फाइल 5MB से कम होनी चाहिए'
                                  : 'File must be under 5MB',
                              }));
                              return;
                            }
                            set('docFile', file || null);
                          }}
                        />
                        <span className="ckm-file-icon">
                          <i
                            className={`fa-solid ${
                              form.docFile
                                ? 'fa-circle-check'
                                : 'fa-file-arrow-up'
                            }`}
                          />
                        </span>
                        <span className="ckm-file-name">
                          {form.docFile
                            ? form.docFile.name
                            : isHi
                            ? 'दस्तावेज़ चुनने के लिए क्लिक करें'
                            : 'Click to select document'}
                        </span>
                        <span className="ckm-file-hint">{j.idHint}</span>
                      </label>
                      {errors.docFile && (
                        <span className="ckm-err">{errors.docFile}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ============= STEP 5 - REVIEW ============= */}
              {step === 4 && (
                <div className="ckm-join-block" data-aos="fade-up">
                  <h2>{j.reviewTitle}</h2>
                  <p>{j.reviewSub}</p>

                  <div className="ckm-review-list">
                    <div className="ckm-review-row">
                      <span>{j.fullName}</span>
                      <strong>{form.fullName}</strong>
                    </div>
                    <div className="ckm-review-row">
                      <span>{j.fatherName}</span>
                      <strong>{form.fatherName}</strong>
                    </div>
                    <div className="ckm-review-row">
                      <span>{j.dob}</span>
                      <strong>{form.dob}</strong>
                    </div>
                    <div className="ckm-review-row">
                      <span>{j.email}</span>
                      <strong>{form.email}</strong>
                    </div>
                    <div className="ckm-review-row">
                      <span>{j.phone}</span>
                      <strong>{form.phone}</strong>
                    </div>
                    <div className="ckm-review-row">
                      <span>{j.district}</span>
                      <strong>{form.district}</strong>
                    </div>
                    <div className="ckm-review-row">
                      <span>{j.idType}</span>
                      <strong>
                        {
                          j[
                            `id${
                              form.idType.charAt(0).toUpperCase() +
                              form.idType.slice(1)
                            }`
                          ]
                        }
                      </strong>
                    </div>
                    <div className="ckm-review-row">
                      <span>{j.membershipTitle}</span>
                      <strong>
                        {selectedTier
                          ? isHi
                            ? selectedTier.nameHi
                            : selectedTier.nameEn
                          : '-'}
                      </strong>
                    </div>
                  </div>

                  <label className="ckm-terms-check">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={(e) => set('agree', e.target.checked)}
                    />
                    <span>
                      {j.agreeTerms}{' '}
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        ({j.agreeTermsLink})
                      </a>
                    </span>
                  </label>
                  {errors.agree && (
                    <span className="ckm-err">{errors.agree}</span>
                  )}
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="ckm-join-actions">
                {step > 0 && (
                  <button
                    type="button"
                    className="ckm-btn-outline"
                    onClick={back}
                    disabled={submitting}
                  >
                    <i className="fa-solid fa-arrow-left" />
                    {j.back}
                  </button>
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    className="ckm-btn-primary"
                    onClick={next}
                  >
                    {j.next} <i className="fa-solid fa-arrow-right" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ckm-btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin" />
                        {j.submitting}
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-lock" />
                        {j.submit}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* ============ LIVE ID CARD PREVIEW ============ */}
            <aside className="ckm-join-preview">
              <div className="ckm-idcard-wrap">
                <h4 className="ckm-idcard-preview-label">
                  <i className="fa-solid fa-id-card" />
                  {j.idCardPreview}
                </h4>

                <div className="ckm-idcard">
                  <div className="ckm-idcard-head">
                    <span className="ckm-idcard-logo">
                      <i className="fa-solid fa-om" />
                    </span>
                    <div>
                      <strong>{j.idCardTitle}</strong>
                      <small>{j.idCardSub}</small>
                    </div>
                  </div>

                  <div className="ckm-idcard-body">
                    <div className="ckm-idcard-photo">
                      {cardData.photoUrl ? (
                        <img src={cardData.photoUrl} alt="Member" />
                      ) : (
                        <i className="fa-solid fa-user" />
                      )}
                    </div>

                    <div className="ckm-idcard-info">
                      <div className="ckm-idcard-info-row">
                        <span>{j.idCardName}</span>
                        <strong>{cardData.name}</strong>
                      </div>
                      <div className="ckm-idcard-info-row">
                        <span>{j.idCardMemberId}</span>
                        <strong>{cardData.memberId}</strong>
                      </div>
                      <div className="ckm-idcard-info-row">
                        <span>{j.idCardTier}</span>
                        <strong>{cardData.tier}</strong>
                      </div>
                      <div className="ckm-idcard-info-row">
                        <span>{j.idCardDistrict}</span>
                        <strong>{cardData.district}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="ckm-idcard-foot">
                    <div>
                      <small>{j.idCardIssued}</small>
                      <strong>{cardData.issued}</strong>
                    </div>
                    <div>
                      <small>{j.idCardValidUpto}</small>
                      <strong>{cardData.validUpto}</strong>
                    </div>
                  </div>
                </div>

                <p className="ckm-idcard-hint">{j.idCardPreviewHint}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}