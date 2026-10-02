// src/components/layout/HeaderTop.jsx
import Link from 'next/link';

export default function HeaderTop() {
  return (
    <div className="ckm-topbar">
      <div className="ckm-container">
        <div className="ckm-topbar-inner">

          {/* Left: contact info */}
          <div className="ckm-topbar-left">
            <a href="tel:+919826050235" className="ckm-topbar-link">
              <i className="fa-solid fa-phone-volume"></i>
              <span>+91 98260 50235</span>
            </a>
            <span className="ckm-topbar-sep" aria-hidden="true"></span>
            <a href="mailto:cgkalarmahasangh@gmail.com" className="ckm-topbar-link">
              <i className="fa-solid fa-envelope"></i>
              <span>cgkalarmahasangh@gmail.com</span>
            </a>
          </div>

          {/* Right: language + socials */}
          <div className="ckm-topbar-right">
            <div className="ckm-lang">
              <i className="fa-solid fa-globe"></i>
              <span>हिन्दी</span>
              <i className="fa-solid fa-chevron-down ckm-lang-caret"></i>
            </div>
            <span className="ckm-topbar-sep" aria-hidden="true"></span>
            <div className="ckm-socials">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}