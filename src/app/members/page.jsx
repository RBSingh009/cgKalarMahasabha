// src/app/members/page.jsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { members } from '@/data/members';
import { districts, districtsEn } from '@/data/membership';

// Fallback tier data (each member can override)
const TIERS = ['active', 'general', 'patron'];

export default function MembersPage() {
  const { lang, t } = useLang();
  const m = t.membersPage;

  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('all');
  const [tier, setTier] = useState('all');
  const [sort, setSort] = useState('newest');

  const districtList = lang === 'hi' ? districts : districtsEn;

  // Enhance members with derived fields for demo
  const enriched = useMemo(() => {
    return members.map((mem, i) => ({
      ...mem,
      district:
        mem.district ||
        districtList[i % districtList.length],
      tier: mem.tier || TIERS[i % TIERS.length],
      memberId:
        mem.memberId ||
        `CKM-${(mem.tier || TIERS[i % TIERS.length]).charAt(0).toUpperCase()}-2026-${100000 + i * 137}`,
    }));
  }, [districtList]);

  const filtered = useMemo(() => {
    let list = enriched.filter((mem) => {
      const s = search.toLowerCase();
      const searchMatch =
        !s ||
        mem.name.toLowerCase().includes(s) ||
        mem.district.toLowerCase().includes(s) ||
        mem.memberId.toLowerCase().includes(s);
      const districtMatch = district === 'all' || mem.district === district;
      const tierMatch = tier === 'all' || mem.tier === tier;
      return searchMatch && districtMatch && tierMatch;
    });

    if (sort === 'az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].reverse();
    }
    return list;
  }, [enriched, search, district, tier, sort]);

  const tierLabel = (key) => {
    if (key === 'active') return m.tierActive;
    if (key === 'general') return m.tierGeneral;
    return m.tierPatron;
  };

  return (
    <main className="ckm-members-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{m.bannerTitle}</h1>
          <p className="ckm-banner-sub">{m.bannerSub}</p>
        </div>
      </section>

      <section className="ckm-members-main sec-padding">
        <div className="ckm-container">

          {/* Filter bar */}
          <div className="ckm-mem-filters" data-aos="fade-up">
            <div className="ckm-mem-search">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="text"
                placeholder={m.searchPh}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="ckm-mem-select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="all">{m.allDistricts}</option>
              {districtList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              className="ckm-mem-select"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
            >
              <option value="all">{m.allTiers}</option>
              <option value="active">{m.tierActive}</option>
              <option value="general">{m.tierGeneral}</option>
              <option value="patron">{m.tierPatron}</option>
            </select>

            <select
              className="ckm-mem-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">{m.sortNewest}</option>
              <option value="az">{m.sortAZ}</option>
            </select>
          </div>

          {/* Count */}
          <div className="ckm-mem-count">
            {m.showing} <strong>{filtered.length}</strong> {m.of}{' '}
            <strong>{enriched.length}</strong> {m.members}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="ckm-empty-state" data-aos="fade-up">
              <i className="fa-regular fa-user" />
              <p>{m.noResults}</p>
            </div>
          ) : (
            <div className="ckm-mem-grid">
              {filtered.map((mem, i) => (
                <article
                  key={mem.id}
                  className="ckm-mem-card"
                  data-aos="fade-up"
                  data-aos-delay={(i % 8) * 60}
                >
                  <div className="ckm-mem-photo">
                    <img src={mem.photo} alt={mem.name} loading="lazy" />
                    <span className={`ckm-mem-tier is-${mem.tier}`}>
                      {tierLabel(mem.tier)}
                    </span>
                  </div>
                  <div className="ckm-mem-body">
                    <h3>{mem.name}</h3>
                    <span className="ckm-mem-role">{mem.role}</span>
                    <ul className="ckm-mem-details">
                      <li><i className="fa fa-location-dot" /> {mem.district}</li>
                      <li><i className="fa fa-id-card" /> {mem.memberId}</li>
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="ckm-mem-cta" data-aos="fade-up">
            <div className="ckm-mem-cta-inner">
              <div>
                <h3>{m.joinCta}</h3>
                <p>{m.joinCtaSub}</p>
              </div>
              <Link href="/join" className="ckm-cta-btn-gold-lg">
                <i className="fa-solid fa-user-plus" /> {m.joinCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}