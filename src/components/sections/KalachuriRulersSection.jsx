// src/components/sections/KalachuriRulersSection.jsx
'use client';

import { useLang } from '@/context/LanguageContext';
import {
  ratanpurKings,
  sourceInfo,
} from '@/data/kalachuriRulers';

export default function KalachuriRulersSection() {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  /* Split 26 kings into two columns (13 + 13) */
  const mid = Math.ceil(ratanpurKings.length / 2);
  const leftColumn = ratanpurKings.slice(0, mid);
  const rightColumn = ratanpurKings.slice(mid);

  return (
    <section className="ckm-kal rulers-sec sec-padding">
      <div className="ckm-container">
        {/* Section head */}
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow">
            <span className="ckm-head-line" />
            {isHi ? 'कलचुरी वंश' : 'Kalachuri Dynasty'}
          </span>
          <h2 className="ckm-head-title">
            {isHi
              ? 'कलचुरी वंश के शासक'
              : 'Rulers of the Kalachuri Dynasty'}
          </h2>
          <p className="ckm-head-sub">
            {isHi
              ? 'रतनपुर के राजा — जिन्होंने 1200 ई. से 1732 ई. तक छत्तीसगढ़ पर शासन किया'
              : 'Kings of Ratanpur — who ruled Chhattisgarh from 1200 CE to 1732 CE'}
          </p>
        </div>

        {/* Kings table */}
        <div className="ckm-kal-table" data-aos="fade-up">
          {/* Header row */}
          <div className="ckm-kal-head">
            <span className="ckm-kal-col-name">
              {isHi ? 'नाम' : 'Name'}
            </span>
            <span className="ckm-kal-col-year">
              {isHi ? 'सन्' : 'Year'}
            </span>
            <span className="ckm-kal-col-name">
              {isHi ? 'नाम' : 'Name'}
            </span>
            <span className="ckm-kal-col-year">
              {isHi ? 'सन्' : 'Year'}
            </span>
          </div>

          {/* Kings rows — 2 columns */}
          <div className="ckm-kal-body">
            {leftColumn.map((king, i) => {
              const rightKing = rightColumn[i];
              return (
                <div key={king.id} className="ckm-kal-row">
                  {/* Left pair */}
                  <span className="ckm-kal-col-name">
                    {isHi ? king.nameHi : king.nameEn}
                  </span>
                  <span className="ckm-kal-col-year">{king.year}</span>

                  {/* Right pair */}
                  {rightKing && (
                    <>
                      <span className="ckm-kal-col-name">
                        {isHi ? rightKing.nameHi : rightKing.nameEn}
                      </span>
                      <span className="ckm-kal-col-year">
                        {rightKing.year}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Source info */}
        <div className="ckm-kal-source" data-aos="fade-up">
          <p>
            <i className="fa-solid fa-book" />
            {isHi ? sourceInfo.attributionHi : sourceInfo.attributionEn}
          </p>
          <p>
            <i className="fa-solid fa-user-pen" />
            {isHi ? sourceInfo.presenterHi : sourceInfo.presenterEn}
          </p>
        </div>
      </div>
    </section>
  );
}