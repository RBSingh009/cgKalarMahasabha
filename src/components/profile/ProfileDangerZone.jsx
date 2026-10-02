// src/components/profile/ProfileDangerZone.jsx
'use client';

import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function ProfileDangerZone() {
  const { t } = useLang();
  const P = t.profile;
  const [showPwd, setShowPwd] = useState(false);

  return (
    <section className="ckm-prof-card ckm-prof-danger">
      <header className="ckm-prof-card-head">
        <h2>
          <i className="fa-solid fa-shield-halved" />
          {P.security}
        </h2>
      </header>

      <div className="ckm-prof-danger-row">
        <div>
          <h3>{P.changePassword}</h3>
          <p>{P.changePasswordHint}</p>
        </div>
        <button
          type="button"
          className="ckm-prof-btn ckm-prof-btn-outline"
          onClick={() => setShowPwd((v) => !v)}
        >
          <i className="fa-solid fa-key" />
          {showPwd ? P.cancel : P.changePassword}
        </button>
      </div>

      {showPwd && (
        <div className="ckm-prof-pwd-form">
          <div className="ckm-prof-field">
            <label>{P.currentPassword}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-lock" />
              <input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="ckm-prof-field">
            <label>{P.newPassword}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-lock" />
              <input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="ckm-prof-field">
            <label>{P.confirmNewPassword}</label>
            <div className="ckm-prof-input">
              <i className="fa-solid fa-lock" />
              <input type="password" placeholder="••••••••" />
            </div>
          </div>
          <button className="ckm-prof-btn ckm-prof-btn-primary">
            {P.updatePassword}
          </button>
        </div>
      )}
    </section>
  );
}