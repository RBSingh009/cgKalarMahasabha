// src/app/publication/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { publications, publicationCategories } from "@/data/publications";

export default function PublicationPage() {
  const { lang, t } = useLang();
  const p = t.publication;

  const [activeCat, setActiveCat] = useState("all");
  const [activeYear, setActiveYear] = useState("all");

  const years = useMemo(
    () => ["all", ...new Set(publications.map((x) => x.year))].sort().reverse(),
    [],
  );

  const filtered = useMemo(() => {
    return publications.filter((item) => {
      const catMatch = activeCat === "all" || item.category === activeCat;
      const yearMatch =
        activeYear === "all" || String(item.year) === activeYear;
      return catMatch && yearMatch;
    });
  }, [activeCat, activeYear]);

  return (
    <main className="ckm-publication-page">
      <section className="ckm-page-banner">
        <div className="ckm-container">
          <h1 className="ckm-banner-title">{p.bannerTitle}</h1>
          <p className="ckm-banner-sub">{p.bannerSub}</p>
        </div>
      </section>

      <section className="ckm-publication-main sec-padding">
        <div className="ckm-container">
          {/* Filters */}
          <div className="ckm-pub-filters" data-aos="fade-up">
            <div className="ckm-pub-filter-group">
              <span className="ckm-pub-filter-label">{p.filterTitle}</span>
              <div className="ckm-pub-filter-pills">
                {publicationCategories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`ckm-pub-filter ${activeCat === c.key ? "is-active" : ""}`}
                    onClick={() => setActiveCat(c.key)}
                  >
                    {lang === "hi" ? c.hi : c.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="ckm-pub-filter-group">
              <select
                className="ckm-pub-year-select"
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
              >
                {years.map((y) => (
                  <option value={y} key={y}>
                    {y === "all" ? p.allYears : y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="ckm-empty-state" data-aos="fade-up">
              <i className="fa-regular fa-folder-open" />
              <p>{p.noResults}</p>
            </div>
          ) : (
            <div className="ckm-pub-grid">
              {filtered.map((item, i) => (
                <article
                  className="ckm-pub-card"
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <Link
                    href={`/publication/${item.slug}`}
                    className="ckm-pub-cover-wrap"
                  >
                    <img
                      src={item.cover}
                      alt={lang === "hi" ? item.titleHi : item.titleEn}
                      loading="lazy"
                      width={300}
                      height={400}
                    />
                    <span className="ckm-pub-badge">PDF</span>
                  </Link>

                  <div className="ckm-pub-body">
                    <h3>{lang === "hi" ? item.titleHi : item.titleEn}</h3>
                    <p className="ckm-pub-desc">
                      {lang === "hi" ? item.descHi : item.descEn}
                    </p>
                    <div className="ckm-pub-meta">
                      <span>
                        <i className="fa-regular fa-file-lines" />
                        {item.pages} {p.pages}
                      </span>
                      <span>
                        <i className="fa-regular fa-calendar" />
                        {item.year}
                      </span>
                      <span>
                        <i className="fa-solid fa-database" />
                        {item.size}
                      </span>
                    </div>
                    <div className="ckm-pub-actions">
                      <Link
                        href={`/publication/${item.slug}`}
                        className="ckm-pub-btn ckm-pub-btn-outline"
                      >
                        <i className="fa-regular fa-eye" />
                        {p.view}
                      </Link>

                      {/* Download button - direct link, forces browser download */}
                      <a
                        href={item.pdfUrl}
                        className="ckm-pub-btn ckm-pub-btn-gold"
                        download={`${item.slug}.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-solid fa-download" />
                        PDF
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
