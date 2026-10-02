// src/components/layout/Footer.jsx
'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: f.linkHome, href: '/' },
    { label: f.linkAbout, href: '/about' },
    { label: f.linkTeam, href: '/team' },
    { label: f.linkNotice, href: '/notice' },
    { label: f.linkNews, href: '/news' },
    { label: f.linkContact, href: '/contact' },
  ];

  const activities = [
    { label: f.actEducation, href: '/work' },
    { label: f.actHealth, href: '/work' },
    { label: f.actBlood, href: '/work' },
    { label: f.actScholarship, href: '/work' },
    { label: f.actYouth, href: '/work' },
    { label: f.actCultural, href: '/work' },
  ];

  return (
    <footer className="ckm-site-footer">
      <div className="ckm-footer-rule" />

      <div className="ckm-container">
        {/* ---------- Newsletter strip ---------- */}
        <div className="ckm-footer-newsletter">
          <div className="ckm-footer-newsletter-text">
            <h3>{f.subscribeTitle}</h3>
            <p>{f.subscribeSub}</p>
          </div>

          <form
            className="ckm-footer-newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <i className="fa-regular fa-envelope ckm-newsletter-icon" />
            <input
              type="email"
              placeholder={f.emailPlaceholder}
              aria-label={f.emailPlaceholder}
            />
            <button type="submit" aria-label={f.subscribeBtn}>
              <i className="fa-solid fa-paper-plane" />
              <span>{f.subscribeBtn}</span>
            </button>
          </form>
        </div>

        {/* ---------- Main grid ---------- */}
        <div className="ckm-footer-grid">
          {/* Column 1 - Brand */}
          <div className="ckm-footer-brand">
            <Link href="/" className="ckm-footer-logo">
              <img src="/images/ckm-logo.png" alt="Chhattisgarh Kalar Mahasangh" />
            </Link>

            <p className="ckm-footer-about">{f.aboutText}</p>

            <div className="ckm-footer-contact">
              <a href="tel:+919826050235">
                <span className="ckm-fc-icon">
                  <i className="fa-solid fa-phone-volume" />
                </span>
                <span className="ckm-fc-text">
                  <small>{f.callUs}</small>
                  <strong>+91 98260 50235</strong>
                </span>
              </a>

              <a href="mailto:cgkalarmahasangh@gmail.com">
                <span className="ckm-fc-icon">
                  <i className="fa-regular fa-envelope-open" />
                </span>
                <span className="ckm-fc-text">
                  <small>{f.emailUs}</small>
                  <strong>cgkalarmahasangh@gmail.com</strong>
                </span>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="ckm-footer-col">
            <h4 className="ckm-footer-heading">{f.quickLinks}</h4>
            <ul className="ckm-footer-list">
              {quickLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Activities */}
          <div className="ckm-footer-col">
            <h4 className="ckm-footer-heading">{f.ourProjects}</h4>
            <ul className="ckm-footer-list">
              {activities.map((l, i) => (
                <li key={i}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Reach Us */}
          <div className="ckm-footer-col">
            <h4 className="ckm-footer-heading">{f.reachUs}</h4>

            <div className="ckm-footer-address">
              <p>
                <i className="fa-solid fa-location-dot" />
                <span>
                  {f.addressLine1}
                  <br />
                  {f.addressLine2}
                </span>
              </p>
            </div>

            <div className="ckm-footer-socials">
              <a href="https://www.facebook.com/share/19j2CHX1SP/" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f" />
              </a>
              {/* <a href="#" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter" />
              </a> */}
              <a href="https://www.instagram.com/cgkalarmahasabha/" aria-label="Instagram">
                <i className="fa-brands fa-instagram" />
              </a>
              {/* <a href="#" aria-label="YouTube">
                <i className="fa-brands fa-youtube" />
              </a> */}
              <a href="https://wa.me/919826050235" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="ckm-footer-bar">
        <div className="ckm-container ckm-footer-bar-inner">
          <p className="ckm-footer-copy">
            © {year}{' '}
            <Link href="/">छत्तीसगढ़ कलार महासंघ</Link>. {f.copyright}
          </p>

          <nav className="ckm-footer-nav">
            <Link href="#">{f.privacy}</Link>
            <span>•</span>
            <Link href="#">{f.terms}</Link>
            <span>•</span>
            <Link href="/contact">{f.contactLink}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}