// src/components/layout/Navbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar({ onBurgerClick }) {
  const { lang, setLang } = useLang();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);
  const [suppressedHref, setSuppressedHref] = useState(null);

  const langRef = useRef(null);
  const userRef = useRef(null);
  const pathname = usePathname();

  /* Close language / user menus on outside click */
  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* Close everything on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubOpen(null);
    setLangOpen(false);
    setUserMenuOpen(false);
    closeDropdowns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Force-close desktop dropdowns */
  const closeDropdowns = (href = null) => {
    if (typeof document === "undefined") return;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document
      .querySelectorAll(".ckm-nav-item.ckm-open")
      .forEach((el) => el.classList.remove("ckm-open"));
    if (typeof href === "string") setSuppressedHref(href);
  };

  /* Nav structure */
  const navItems = [
    { href: "/", label: lang === "hi" ? "होम" : "Home" },
    { href: "/about", label: lang === "hi" ? "हमारे बारे में" : "About Us" },
    {
      href: "/team",
      label: lang === "hi" ? "संगठन" : "Organization",
      children: [
        { href: "/team", label: lang === "hi" ? "हमारे सदस्य" : "Our Members" },
        { href: "/members", label: lang === "hi" ? "सदस्य सूची" : "Member Directory" },
        { href: "/join", label: lang === "hi" ? "सदस्य बनें" : "Become a Member" },
      ],
    },
    {
      href: "/work",
      label: lang === "hi" ? "गतिविधियाँ" : "Activities",
      children: [
        { href: "/work", label: lang === "hi" ? "हमारा कार्य" : "Our Work" },
        { href: "/events", label: lang === "hi" ? "कार्यक्रम" : "Events" },
        { href: "/news", label: lang === "hi" ? "समाचार" : "News" },
        { href: "/notice", label: lang === "hi" ? "सूचना पट्ट" : "Notice Board" },
        { href: "/gallery", label: lang === "hi" ? "गैलरी" : "Gallery" },
        { href: "/publication", label: lang === "hi" ? "प्रकाशन" : "Publications" },
      ],
    },
    { href: "/donation", label: lang === "hi" ? "दान" : "Donate" },
    { href: "/contact", label: lang === "hi" ? "संपर्क" : "Contact" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isChildActive = (item) => item.children?.some((c) => isActive(c.href));

  const ctaLabel = lang === "hi" ? "सदस्य बनें" : "Become a Member";
  const joinLabel = lang === "hi" ? "सदस्य बनें" : "Join Now";
  const loginLabel = lang === "hi" ? "लॉगिन" : "Login";
  const logoutLabel = lang === "hi" ? "लॉगआउट" : "Logout";
  const dashLabel = lang === "hi" ? "डैशबोर्ड" : "Dashboard";
  const profileLabel = lang === "hi" ? "प्रोफ़ाइल" : "Profile";
  const idCardLabel = lang === "hi" ? "सदस्यता कार्ड" : "ID Card";

  const handleLogout = async () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
    await logout();
  };

  return (
    <div className="ckm-navbar-wrap">
      <nav className="ckm-navbar" aria-label="Main navigation">
        {/* ═══ Desktop Links ═══ */}
        <ul className="ckm-nav">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={`ckm-nav-item ${
                item.children ? "ckm-has-dropdown" : ""
              } ${suppressedHref === item.href ? "ckm-suppress" : ""}`}
              onMouseLeave={() => {
                if (suppressedHref === item.href) setSuppressedHref(null);
              }}
            >
              <Link
                href={item.href}
                className={`ckm-nav-link ${
                  isActive(item.href) || isChildActive(item) ? "is-active" : ""
                }`}
                onClick={() => closeDropdowns(item.href)}
              >
                {item.label}
                {item.children && (
                  <i className="fa-solid fa-chevron-down ckm-caret" />
                )}
              </Link>

              {item.children && (
                <ul className="ckm-dropdown">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`ckm-dropdown-item ${
                          isActive(child.href) ? "is-active" : ""
                        }`}
                        onClick={() => closeDropdowns(item.href)}
                      >
                        <i className="fa-solid fa-chevron-right" />
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* ═══ Right actions ═══ */}
        <div className="ckm-navbar-actions">
          {/* Language switcher */}
          <div className="ckm-lang-switcher" ref={langRef}>
            <button
              type="button"
              className="ckm-icon-btn"
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Change language"
              aria-expanded={langOpen}
            >
              <i className="fa-solid fa-globe" />
              <span className="ckm-lang-badge">
                {lang === "hi" ? "HI" : "EN"}
              </span>
            </button>

            {langOpen && (
              <ul className="ckm-lang-menu">
                <li>
                  <button
                    type="button"
                    className={`ckm-lang-option ${lang === "en" ? "active" : ""}`}
                    onClick={() => {
                      setLang("en");
                      setLangOpen(false);
                    }}
                  >
                    <span className="ckm-lang-code">EN</span>
                    English
                    {lang === "en" && <i className="fa-solid fa-check" />}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`ckm-lang-option ${lang === "hi" ? "active" : ""}`}
                    onClick={() => {
                      setLang("hi");
                      setLangOpen(false);
                    }}
                  >
                    <span className="ckm-lang-code">HI</span>
                    हिंदी
                    {lang === "hi" && <i className="fa-solid fa-check" />}
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Search */}
          <button
            type="button"
            className="ckm-icon-btn"
            onClick={() =>
              document.dispatchEvent(new Event("ckm:open-search"))
            }
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>

          {/* Auth-aware area */}
          {user ? (
            /* --- LOGGED IN: user dropdown --- */
            <div className="ckm-user-menu" ref={userRef}>
              <button
                type="button"
                className="ckm-user-btn"
                onClick={() => setUserMenuOpen((o) => !o)}
                aria-expanded={userMenuOpen}
                aria-label="Account menu"
              >
                <img
                  src={user.avatar || "/images/avatar-placeholder.png"}
                  alt={user.name}
                  className="ckm-user-avatar"
                />
                <span className="ckm-user-name">
                  {user.name?.split(" ")[0]}
                </span>
                <i
                  className={`fa-solid fa-chevron-${userMenuOpen ? "up" : "down"} ckm-caret`}
                />
              </button>

              {userMenuOpen && (
                <ul className="ckm-user-dropdown">
                  <li className="ckm-user-head">
                    <img
                      src={user.avatar || "/images/avatar-placeholder.png"}
                      alt={user.name}
                    />
                    <div>
                      <strong>{user.name}</strong>
                      <small>{user.memberId}</small>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i className="fa-solid fa-gauge-high" />
                      {dashLabel}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i className="fa-solid fa-user-pen" />
                      {profileLabel}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/id-card"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i className="fa-solid fa-id-card" />
                      {idCardLabel}
                    </Link>
                  </li>
                  <li className="ckm-user-divider" />
                  <li>
                    <button
                      type="button"
                      className="ckm-user-logout"
                      onClick={handleLogout}
                    >
                      <i className="fa-solid fa-right-from-bracket" />
                      {logoutLabel}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            /* --- LOGGED OUT: login button + join CTA --- */
            <>
              <Link href="/login" className="ckm-login-btn">
                <i className="fa-solid fa-right-to-bracket" />
                <span>{loginLabel}</span>
              </Link>

              <div className="ckm-cta-group">
                <Link
                  href="/join"
                  className="ckm-donate-btn"
                  onClick={() => closeDropdowns()}
                >
                  <i className="fa-solid fa-user-plus" />
                  <span>{ctaLabel}</span>
                </Link>
                <button
                  type="button"
                  className="ckm-grid-btn"
                  onClick={onBurgerClick}
                  aria-label="Open menu"
                >
                  <span className="ckm-grid-dots" aria-hidden="true">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <i key={i} />
                    ))}
                  </span>
                </button>
              </div>
            </>
          )}

          {/* Mobile hamburger (always visible on mobile) */}
          <button
            type="button"
            className={`ckm-hamburger ${mobileOpen ? "is-open" : ""}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ═══ Mobile dropdown ═══ */}
      <div className={`ckm-mobile-nav ${mobileOpen ? "open" : ""}`}>
        <ul>
          {navItems.map((item) => {
            const hasChildren = item.children?.length > 0;
            const isSubOpen = mobileSubOpen === item.href;

            return (
              <li key={item.href} className={isSubOpen ? "is-open" : ""}>
                {hasChildren ? (
                  <button
                    type="button"
                    className={`ckm-mobile-toggle ${isSubOpen ? "is-open" : ""}`}
                    onClick={() =>
                      setMobileSubOpen(isSubOpen ? null : item.href)
                    }
                    aria-expanded={isSubOpen}
                  >
                    <span>{item.label}</span>
                    <i
                      className={`fa-solid fa-chevron-${isSubOpen ? "up" : "down"}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? "is-active" : ""}
                  >
                    {item.label}
                  </Link>
                )}

                {hasChildren && isSubOpen && (
                  <ul className="ckm-mobile-sub">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={isActive(child.href) ? "is-active" : ""}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Auth section - mobile */}
        {user ? (
          <div className="ckm-mobile-user">
            <div className="ckm-mobile-user-head">
              <img
                src={user.avatar || "/images/avatar-placeholder.png"}
                alt={user.name}
              />
              <div>
                <strong>{user.name}</strong>
                <small>{user.memberId}</small>
              </div>
            </div>
            <div className="ckm-mobile-user-links">
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-gauge-high" />
                {dashLabel}
              </Link>
              <Link href="/profile" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-user-pen" />
                {profileLabel}
              </Link>
              <Link href="/id-card" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-id-card" />
                {idCardLabel}
              </Link>
              <button type="button" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket" />
                {logoutLabel}
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="ckm-mobile-donate ckm-mobile-login"
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-right-to-bracket" />
              {loginLabel}
            </Link>

            <Link
              href="/join"
              className="ckm-mobile-donate"
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-user-plus" />
              {joinLabel}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}