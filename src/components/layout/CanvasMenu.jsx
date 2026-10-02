// src/components/layout/CanvasMenu.jsx
'use client';

import Link from 'next/link';
import { canvasMenuItems } from '@/data/navigation';

export default function CanvasMenu({ open, onClose }) {
  return (
    <>
      <div
        className={`ckm-overlay ${open ? 'show' : ''}`}
        onClick={onClose}
      />

      <div className={`ckm-canvas ${open ? 'show' : ''}`}>
        <div className="ckm-canvas-header">
          <img
            src="/images/ckm-logo.png"
            alt="Chhattisgarh Kalar Mahasangh"
            className="ckm-canvas-logo"
          />
          <button
            className="ckm-canvas-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        <p className="ckm-canvas-desc">
          छत्तीसगढ़ कलार महासंघ - समाज के सर्वांगीण विकास, शिक्षा,
          स्वास्थ्य एवं सामाजिक उत्थान हेतु समर्पित।
        </p>

        <nav className="ckm-canvas-nav">
          <ul>
            {canvasMenuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={onClose}>
                  <i className="fa-solid fa-angle-right"></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/donation" className="ckm-canvas-donate" onClick={onClose}>
          <i className="fa-solid fa-heart"></i>
          Donate Now
        </Link>

        <div className="ckm-canvas-contact">
          <a href="tel:+919826050235">
            <i className="fa fa-phone"></i> +91 98260 50235
          </a>
          <a href="mailto:cgkalarmahasangh@gmail.com">
            <i className="fa fa-envelope"></i> cgkalarmahasangh@gmail.com
          </a>
        </div>

        <div className="ckm-canvas-socials">
          <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
        </div>

        {/* ⬇️ NEW: Admin Login Link */}
        <div className="ckm-canvas-admin">
          <Link href="/admin/login" onClick={onClose}>
            <i className="fa-solid fa-lock"></i>
            Admin Login
          </Link>
        </div>

      </div>
    </>
  );
}