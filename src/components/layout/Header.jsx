// src/components/layout/Header.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import CanvasMenu from "./CanvasMenu";
import SearchPopup from "./SearchPopup";

export default function Header() {
  const [canvasOpen, setCanvasOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const topH = el.querySelector(".ckm-topbar")?.offsetHeight ?? 0;
      el.classList.toggle("is-stuck", window.scrollY >= topH);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <header className="ckm-header" ref={headerRef}>
        {/* LOGO BLOCK */}
        <Link
          href="/"
          className="ckm-logo-block"
          aria-label="Chhattisgarh Kalar Mahasangh – Home"
        >
          <span className="ckm-logo-badge">
            <img
              src="/images/ckm-logo.png"
              alt="Chhattisgarh Kalar Mahasangh"
            />
          </span>
        </Link>

        {/* TOP BAR */}
        <div className="ckm-topbar">
          <div className="ckm-header-shell">
            <div className="ckm-topbar-inner">
              <div className="ckm-topbar-tagline">
                <span className="ckm-tagline-main">छत्तीसगढ़ कलार महासंघ</span>
                <span className="ckm-tagline-sub">
                  सशक्त समाज - उज्ज्वल भविष्य
                </span>
              </div>

              <div className="ckm-topbar-right">
                <a href="tel:+919826050235" className="ckm-topbar-contact">
                  <i className="fa-solid fa-phone" />
                  <span>+91 98260 50235</span>
                </a>
                <a
                  href="mailto:cgkalarmahasangh@gmail.com"
                  className="ckm-topbar-contact ckm-topbar-email"
                >
                  <i className="fa-solid fa-envelope" />
                  <span>cgkalarmahasangh@gmail.com</span>
                </a>
                <div className="ckm-topbar-socials">
                  <a href="#" aria-label="Facebook">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                  <a href="#" aria-label="X (Twitter)">
                    <i className="fa-brands fa-x-twitter" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <i className="fa-brands fa-instagram" />
                  </a>
                  <a href="#" aria-label="YouTube">
                    <i className="fa-brands fa-youtube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAVBAR */}
        <Navbar onBurgerClick={() => setCanvasOpen(true)} />
      </header>

      <CanvasMenu open={canvasOpen} onClose={() => setCanvasOpen(false)} />
      <SearchPopup />
    </>
  );
}