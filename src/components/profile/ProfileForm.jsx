// src/components/profile/ProfileForm.jsx
'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import indianData from '@/data/indianStatesDistricts.json';
import { lookupPincode, isValidIndianPincode } from 'india-post-pincode';
import { useLang } from '@/context/LanguageContext';

export default function ProfileForm({ user, onSave }) {
  const { t } = useLang();
  const P = t.profile;

  const initial = {
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    state: user.state || 'Chhattisgarh',
    district: user.district || '',
    pincode: user.pincode || '',
    address: user.address || '',
    dob: user.dob || '',
    gender: user.gender || '',
    occupation: user.occupation || '',
    bloodGroup: user.bloodGroup || '',
  };

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [pinFeedback, setPinFeedback] = useState('');
  const [pinMismatch, setPinMismatch] = useState(false);

  /* ---------- Combine states + UTs ---------- */
  const statesDistricts = useMemo(() => {
    const states = indianData.states || [];
    const uts = indianData.union_territories || [];
    return [...states, ...uts].map((item) => ({
      state: item.name,
      districts: item.districts || [],
    }));
  }, []);

  const allStates = useMemo(
    () => statesDistricts.map((s) => s.state).sort(),
    [statesDistricts]
  );

  const districts = useMemo(() => {
    if (!form.state) return [];
    const match = statesDistricts.find((s) => s.state === form.state);
    return match ? [...match.districts].sort() : [];
  }, [form.state, statesDistricts]);

  /* ---------- Cross-validate PIN vs selected state/district ---------- */
  const validatePinAgainstSelection = useCallback(
    (pincode, selectedState, selectedDistrict) => {
      if (!pincode || pincode.length !== 6 || !isValidIndianPincode(pincode)) {
        setPinMismatch(false);
        return;
      }

      const info = lookupPincode(pincode);
      if (!info) {
        setPinMismatch(false);
        return;
      }

      const pinState = (info.state || '').toLowerCase().trim();
      const pinDistrict = (info.district || '').toLowerCase().trim();
      const selState = (selectedState || '').toLowerCase().trim();
      const selDistrict = (selectedDistrict || '').toLowerCase().trim();

      const stateMismatch = selState && pinState && pinState !== selState;
      const districtMismatch =
        selDistrict && pinDistrict && pinDistrict !== selDistrict;

      const isMismatch = stateMismatch || districtMismatch;
      setPinMismatch(isMismatch);

      if (isMismatch) {
        const parts = [];
        if (stateMismatch) parts.push(info.state);
        if (districtMismatch) parts.push(info.district);
        setPinFeedback(
          `⚠️ ${parts.join(', ')} - ${
            P.pinMismatch || 'Selected state/district does not match this PIN'
          }`
        );
      } else {
        setPinFeedback(`✅ ${info.district}, ${info.state}`);
      }
    },
    [P]
  );

  /* Re-validate whenever PIN, state, or district change */
  useEffect(() => {
    if (form.pincode && form.pincode.length === 6) {
      validatePinAgainstSelection(form.pincode, form.state, form.district);
    }
  }, [form.pincode, form.state, form.district, validatePinAgainstSelection]);

  /* ---------- PIN input ---------- */
  const handlePincodeChange = useCallback((value) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    setForm((f) => ({ ...f, pincode: digits }));
    setPinFeedback('');
    setPinMismatch(false);

    // Show valid info / invalid error as soon as it's 6 digits
    if (digits.length === 6) {
      if (!isValidIndianPincode(digits)) {
        setPinFeedback(P.pinInvalid);
        return;
      }
      const info = lookupPincode(digits);
      if (!info) {
        setPinFeedback(P.pinNotFound);
        return;
      }
      // Let the useEffect handle the match/mismatch feedback
    }
  }, [P]);

  /* ---------- Field change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'state') {
      // Reset district & PIN when state changes
      setForm((f) => ({ ...f, state: value, district: '', pincode: '' }));
      setPinFeedback('');
      setPinMismatch(false);
    } else if (name === 'district') {
      // Reset PIN when district changes
      setForm((f) => ({ ...f, district: value, pincode: '' }));
      setPinFeedback('');
      setPinMismatch(false);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }

    if (success) setSuccess(false);
    if (error) setError('');
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pinMismatch) {
      setError(
        P.pinMismatch || 'PIN code does not match the selected state/district'
      );
      return;
    }

    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || P.saveError);
      }

      const data = await res.json();
      onSave?.(data.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || P.saveError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="ckm-prof-card">
      <header className="ckm-prof-card-head">
        <h2>
          <i className="fa-solid fa-user-pen" />
          {P.formSectionTitle}
        </h2>
        <span className="ckm-prof-card-hint">{P.formSectionHint}</span>
      </header>

      {success && (
        <div className="ckm-prof-success">
          <i className="fa-solid fa-circle-check" />
          <span>{P.saveSuccess}</span>
        </div>
      )}

      {error && (
        <div className="ckm-prof-error">
          <i className="fa-solid fa-circle-exclamation" />
          <span>{error}</span>
        </div>
      )}

      <form className="ckm-prof-form" onSubmit={handleSubmit}>
        <div className="ckm-prof-grid">

          {/* ---------- Name ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-name">{P.name}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-user" />
              <input
                id="p-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ---------- Phone ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-phone">{P.phone}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-phone" />
              <input
                id="p-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ---------- Email ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-email">{P.email}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-envelope" />
              <input
                id="p-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ---------- DOB (moved up to fill the 2-col grid) ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-dob">{P.dob}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-calendar" />
              <input
                id="p-dob"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ============================================================
              ⚡ ADDRESS HIERARCHY: State → District → PIN
              ============================================================ */}

          {/* ---------- STATE (first) ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-state">{P.state}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-map" />
              <select
                id="p-state"
                name="state"
                value={form.state}
                onChange={handleChange}
              >
                <option value="">{P.select}</option>
                {allStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ---------- DISTRICT (second, depends on state) ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-district">{P.district}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-location-dot" />
              <select
                id="p-district"
                name="district"
                value={form.district}
                onChange={handleChange}
                disabled={!form.state}
              >
                <option value="">
                  {form.state ? P.select : P.selectStateFirst}
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ---------- PIN CODE (third, validates against selection) ---------- */}
          <div className="ckm-prof-field ckm-prof-field-full">
            <label htmlFor="p-pincode">{P.pincode}</label>
            <div
              className={`ckm-prof-input ${
                pinMismatch ? 'ckm-prof-input-error' : ''
              }`}
            >
              <i className="fa-solid fa-map-pin" />
              <input
                id="p-pincode"
                name="pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder={P.pincodePh}
                value={form.pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
              />
            </div>
            {pinFeedback && (
              <small
                className={`ckm-prof-pin-feedback ${
                  pinMismatch ? 'is-error' : 'is-valid'
                }`}
              >
                {pinFeedback}
              </small>
            )}
          </div>

          {/* ---------- Gender ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-gender">{P.gender}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-venus-mars" />
              <select
                id="p-gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">{P.select}</option>
                <option value="male">{P.genderMale}</option>
                <option value="female">{P.genderFemale}</option>
                <option value="other">{P.genderOther}</option>
              </select>
            </div>
          </div>

          {/* ---------- Occupation ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-occupation">{P.occupation}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-briefcase" />
              <input
                id="p-occupation"
                name="occupation"
                type="text"
                value={form.occupation}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ---------- Blood Group ---------- */}
          <div className="ckm-prof-field">
            <label htmlFor="p-blood">{P.bloodGroup}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-droplet" />
              <select
                id="p-blood"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
              >
                <option value="">{P.select}</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          {/* ---------- Address (full width) ---------- */}
          <div className="ckm-prof-field ckm-prof-field-full">
            <label htmlFor="p-address">{P.address}</label>
            <div className="ckm-prof-input ckm-prof-input-textarea">
              <i className="fa-solid fa-house" />
              <textarea
                id="p-address"
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                placeholder={P.addressPh}
              />
            </div>
          </div>
        </div>

        <div className="ckm-prof-actions">
          <button
            type="button"
            className="ckm-prof-btn ckm-prof-btn-ghost"
            onClick={() => {
              setForm(initial);
              setPinFeedback('');
              setPinMismatch(false);
            }}
            disabled={saving}
          >
            {P.reset}
          </button>
          <button
            type="submit"
            className="ckm-prof-btn ckm-prof-btn-primary"
            disabled={saving || pinMismatch}
          >
            {saving ? (
              <>
                <span className="ckm-prof-spinner" />
                {P.saving}
              </>
            ) : (
              <>
                <i className="fa-solid fa-floppy-disk" />
                {P.save}
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}