// src/app/not-found.jsx
import Link from 'next/link';

export const metadata = {
  title: '404 - पृष्ठ नहीं मिला | छत्तीसगढ़ कलार महासंघ',
};

export default function NotFound() {
  return (
    <main className="ckm-404-page">
      <section className="ckm-404">
        <div className="ckm-container">
          <div className="ckm-404-inner">
            <div className="ckm-404-number">
              <span>4</span>
              <span className="ckm-404-circle">
                <i className="fa-solid fa-magnifying-glass" />
              </span>
              <span>4</span>
            </div>

            <h1>पृष्ठ नहीं मिला</h1>
            <p className="ckm-404-en">Page Not Found</p>
            <p className="ckm-404-desc">
              माफ़ कीजिए, आप जिस पृष्ठ की तलाश कर रहे हैं वह उपलब्ध नहीं है। हो सकता है यह हटा दिया गया हो या इसका पता बदल गया हो।
            </p>

            <div className="ckm-404-actions">
              <Link href="/" className="ckm-cta-btn-gold-lg">
                <i className="fa-solid fa-home" /> होम पर जाएं
              </Link>
              <Link href="/contact" className="ckm-cta-btn-ghost-lg">
                संपर्क करें <i className="fa fa-arrow-right" />
              </Link>
            </div>

            <div className="ckm-404-links">
              <p>इन पेजों पर जाएं:</p>
              <ul>
                <li><Link href="/about">हमारे बारे में</Link></li>
                <li><Link href="/team">हमारे सदस्य</Link></li>
                <li><Link href="/notice">सूचना पट्ट</Link></li>
                <li><Link href="/gallery">गैलरी</Link></li>
                <li><Link href="/news">समाचार</Link></li>
                <li><Link href="/donation">दान करें</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}