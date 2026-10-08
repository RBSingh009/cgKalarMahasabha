// src/app/members/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { members } from "@/data/members";
import { districts, districtsEn } from "@/data/membership";

/* Fallback tier data */
const TIERS = ["active", "general", "patron"];

export default function MembersPage() {
  const { lang, t } = useLang();
  const m = t.membersPage;
  const isHi = lang === "hi";

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("all");
  const [tier, setTier] = useState("all");
  const [sort, setSort] = useState("newest");

  const districtList = isHi ? districts : districtsEn;

  /* Enrich members with derived fields */
  const enriched = useMemo(() => {
    return members.map((mem, i) => ({
      ...mem,
      district: mem.district || districtList[i % districtList.length],
      tier: mem.tier || TIERS[i % TIERS.length],
      memberId:
        mem.memberId ||
        `CKM-${(mem.tier || TIERS[i % TIERS.length])
          .charAt(0)
          .toUpperCase()}-2026-${100000 + i * 137}`,
    }));
  }, [districtList]);

  const filtered = useMemo(() => {
    let list = enriched.filter((mem) => {
      const s = search.toLowerCase();
      const searchMatch =
        !s ||
        mem.name.toLowerCase().includes(s) ||
        (mem.nameEn || "").toLowerCase().includes(s) ||
        mem.district.toLowerCase().includes(s) ||
        mem.memberId.toLowerCase().includes(s);
      const districtMatch = district === "all" || mem.district === district;
      const tierMatch = tier === "all" || mem.tier === tier;
      return searchMatch && districtMatch && tierMatch;
    });

    if (sort === "az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].reverse();
    }
    return list;
  }, [enriched, search, district, tier, sort]);

  const tierLabel = (key) => {
    if (key === "active") return m.tierActive;
    if (key === "general") return m.tierGeneral;
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

      <section className="ckm-members-section sec-padding">
        <div className="ckm-container">
          {/* Section heading */}
          <div className="ckm-section-head">
            <span className="ckm-head-eyebrow">
              <span className="ckm-head-line" />
              {isHi ? "सदस्य निर्देशिका" : "Member Directory"}
            </span>
            <h2 className="ckm-head-title">
              {isHi ? "महासंघ के सभी सदस्य" : "All Members of the Mahasangh"}
            </h2>
            <p className="ckm-head-sub">
              {isHi
                ? "छत्तीसगढ़ कलार महासंघ से जुड़े सभी सक्रिय सदस्यों की पूरी सूची — नाम, जिला एवं सदस्यता संख्या के साथ।"
                : "Complete directory of all active members of Chhattisgarh Kalar Mahasangh — with name, district and member ID."}
            </p>
          </div>

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
                <option key={d} value={d}>
                  {d}
                </option>
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
            {m.showing} <strong>{filtered.length}</strong> {m.of}{" "}
            <strong>{enriched.length}</strong> {m.members}
          </div>

          {/* Grid of members */}
          {filtered.length === 0 ? (
            <div className="ckm-empty-state" data-aos="fade-up">
              <i className="fa-regular fa-user" />
              <p>{m.noResults}</p>
            </div>
          ) : (
            <div className="ckm-members-grid">
              {filtered.map((member, i) => {
                const name = isHi
                  ? member.nameHi || member.name || ""
                  : member.nameEn || member.name || "";

                const role = isHi
                  ? member.roleHi || member.role || ""
                  : member.roleEn || member.role || "";

                const rawPhone = member.phone || "";
                const cleanPhone = String(rawPhone).replace(/\s/g, "");

                return (
                  <article
                    className="ckm-member-card"
                    key={member.id}
                    data-aos="fade-up"
                    data-aos-delay={(i % 8) * 60}
                  >
                    <div className="ckm-member-photo">
                      {/* Dummy user icon */}
                      <div className="ckm-member-user-icon">
                        <i className="fa-solid fa-user" />
                      </div>

                      {/* Tier badge */}
                      <span className={`ckm-mem-tier is-${member.tier}`}>
                        {tierLabel(member.tier)}
                      </span>

                      {/* Hover overlay with socials */}
                      <div className="ckm-member-overlay">
                        <div className="ckm-member-socials">
                          {member.socials?.facebook && (
                            <a
                              href={member.socials.facebook}
                              aria-label="Facebook"
                            >
                              <i className="fa-brands fa-facebook-f" />
                            </a>
                          )}
                          {member.socials?.twitter && (
                            <a
                              href={member.socials.twitter}
                              aria-label="Twitter"
                            >
                              <i className="fa-brands fa-x-twitter" />
                            </a>
                          )}
                          {member.socials?.linkedin && (
                            <a
                              href={member.socials.linkedin}
                              aria-label="LinkedIn"
                            >
                              <i className="fa-brands fa-linkedin-in" />
                            </a>
                          )}
                          {member.socials?.youtube && (
                            <a
                              href={member.socials.youtube}
                              aria-label="YouTube"
                            >
                              <i className="fa-brands fa-youtube" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ckm-member-info">
                      {role && <span className="ckm-member-role">{role}</span>}
                      <h3 className="ckm-member-name">{name}</h3>

                      <ul className="ckm-member-details">
                        {member.district && (
                          <li>
                            <i className="fa-solid fa-location-dot" />
                            <span>{member.district}</span>
                          </li>
                        )}

                        {member.memberId && (
                          <li>
                            <i className="fa-solid fa-id-card" />
                            <span>{member.memberId}</span>
                          </li>
                        )}

                        {cleanPhone && (
                          <li>
                            <i className="fa-solid fa-phone" />
                            <a href={`tel:${cleanPhone}`}>{rawPhone}</a>
                          </li>
                        )}

                        {member.email && (
                          <li>
                            <i className="fa-solid fa-envelope" />
                            <a href={`mailto:${member.email}`}>
                              {member.email}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </article>
                );
              })}
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
