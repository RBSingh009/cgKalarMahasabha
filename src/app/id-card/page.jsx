// src/app/id-card/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLang } from "@/context/LanguageContext";

export default function IdCardPage() {
  const { user, loading } = useAuth();
  const { t, lang } = useLang();
  const router = useRouter();
  const I = t.idCardMember;

  const [downloading, setDownloading] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [printImage, setPrintImage] = useState("");
  const [onScreenSvg, setOnScreenSvg] = useState("");

  /* Auth guard */
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=/id-card");
    }
  }, [loading, user, router]);

  /* Rebuild SVG when user OR language changes */
  useEffect(() => {
    let cancelled = false;
    if (!user) return;

    (async () => {
      const svg = await buildCardSVG(user, lang, I);
      if (!cancelled) setOnScreenSvg(svg);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, lang, I]);

  if (loading || !user) {
    return (
      <main className="ckm-mem-page ckm-page-offset">
        <div className="ckm-mem-container">
          <div className="ckm-mem-loading">
            <span className="ckm-mem-spinner" />
            {loading ? t.common.loading : t.common.loading}
          </div>
        </div>
      </main>
    );
  }

  /* ---------- SVG → PNG ---------- */
  const svgToPng = async (svgString, width = 1000, height = 630, scale = 3) => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#400707";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    URL.revokeObjectURL(url);

    return canvas.toDataURL("image/png");
  };

  /* ---------- Download ---------- */
  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const svg = await buildCardSVG(user, lang, I);
      const dataUrl = await svgToPng(svg, 1000, 630, 3);

      const link = document.createElement("a");
      link.download = `CKM-ID-Card-${user.memberId || "member"}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert(I.downloadFailed);
    } finally {
      setDownloading(false);
    }
  };

  /* ---------- Print ---------- */
  const handlePrint = async () => {
    if (printing) return;
    setPrinting(true);
    try {
      const svg = await buildCardSVG(user, lang, I);
      const dataUrl = await svgToPng(svg, 1000, 630, 2);
      setPrintImage(dataUrl);

      setTimeout(() => {
        window.print();
        setTimeout(() => {
          setPrintImage("");
          setPrinting(false);
        }, 500);
      }, 200);
    } catch (err) {
      console.error("Print failed:", err);
      setPrinting(false);
      alert(I.printFailed);
    }
  };

  /* ---------- Share ---------- */
  const handleShare = async () => {
    if (!navigator.share) {
      alert(I.shareUnsupported);
      return;
    }
    try {
      await navigator.share({
        title: I.title,
        text: `${I.orgNameHi} - ${user.memberId}`,
        url: window.location.href,
      });
    } catch {}
  };

  return (
    <>
      <main className="ckm-mem-page ckm-page-offset ckm-screen-only">
        <div className="ckm-mem-container">
          <section className="ckm-mem-hero">
            <span className="ckm-mem-eyebrow">
              <span className="ckm-mem-eyebrow-line" />
              {I.eyebrow}
            </span>
            <h1 className="ckm-mem-title">{I.title}</h1>
            <p className="ckm-mem-sub">{I.subtitle}</p>
          </section>

          <div className="ckm-mem-grid">
            <div className="ckm-mem-wrap">
              <div className="ckm-idcard-svg-wrap">
                {onScreenSvg ? (
                  <div
                    className="ckm-idcard-svg-inner"
                    dangerouslySetInnerHTML={{ __html: onScreenSvg }}
                  />
                ) : (
                  <div className="ckm-idcard-svg-inner ckm-idcard-loading">
                    {I.loading}
                  </div>
                )}
              </div>

              <div className="ckm-mem-actions">
                <button
                  type="button"
                  className="ckm-mem-btn ckm-mem-btn-primary"
                  onClick={handleDownload}
                  disabled={downloading || printing || !onScreenSvg}
                >
                  {downloading ? (
                    <>
                      <span className="ckm-mem-spinner" />
                      {I.downloading}
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-download" />
                      {I.downloadPng}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="ckm-mem-btn ckm-mem-btn-outline"
                  onClick={handlePrint}
                  disabled={downloading || printing || !onScreenSvg}
                >
                  {printing ? (
                    <>
                      <span className="ckm-mem-spinner" />
                      {I.preparing}
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-print" />
                      {I.print}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="ckm-mem-btn ckm-mem-btn-outline"
                  onClick={handleShare}
                >
                  <i className="fa-solid fa-share-nodes" />
                  {I.share}
                </button>
              </div>
            </div>

            <aside className="ckm-mem-side">
              <section className="ckm-mem-card">
                <h2>
                  <i className="fa-solid fa-circle-info" />
                  {I.cardUsage}
                </h2>
                <ul className="ckm-mem-tips">
                  <li><i className="fa-solid fa-check" /> {I.usage1}</li>
                  <li><i className="fa-solid fa-check" /> {I.usage2}</li>
                  <li><i className="fa-solid fa-check" /> {I.usage3}</li>
                  <li><i className="fa-solid fa-check" /> {I.usage4}</li>
                </ul>
              </section>

              <section className="ckm-mem-card">
                <h2>
                  <i className="fa-solid fa-headset" />
                  {I.helpTitle}
                </h2>
                <p className="ckm-mem-help-text">{I.helpText}</p>
                <a href="tel:+919826050235" className="ckm-mem-help-btn">
                  <i className="fa-solid fa-phone" />
                  +91 98260 50235
                </a>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <div className="ckm-print-stage" aria-hidden="true">
        {printImage && (
          <div className="ckm-print-card">
            <img src={printImage} alt="ID Card" />
          </div>
        )}
      </div>
    </>
  );
}

/* ============================================================
   Load an image and convert to base64 data URL
   ============================================================ */
async function loadImageAsDataUrl(src) {
  if (!src) return "";
  try {
    const res = await fetch(src, { cache: "force-cache" });
    if (!res.ok) return "";
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

/* ============================================================
   Generate a real scannable QR code as PNG data URL
   ============================================================ */
async function generateQR(data) {
  try {
    const QRCode = (await import("qrcode")).default;
    return await QRCode.toDataURL(String(data), {
      errorCorrectionLevel: "M",
      type: "image/png",
      width: 300,
      margin: 0,
      color: { dark: "#400707", light: "#FFFFFF" },
    });
  } catch (err) {
    console.error("QR generation failed:", err);
    return null;
  }
}

/* ============================================================
   Build the PREMIUM card as SVG - bilingual via lang + labels
   ============================================================ */
async function buildCardSVG(user, lang, I) {
  const isHi = lang === "hi";
  const esc = (s) =>
    String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const name = esc(user.name || "-");
  const memberId = esc(user.memberId || "-");
  const district = esc(user.district || "-");
  const joinedAt = esc(user.joinedAt || "-");
  const phone = esc(user.phone || "-");
  const role = esc(user.role || I.roleDefault);

  /* Labels from translations */
  const lblMemberId = esc(I.memberIdLabel);
  const lblDistrict = esc(I.districtLabel);
  const lblJoined = esc(I.joinedLabel);
  const lblMobile = esc(I.mobileLabel);
  const orgNameEn = esc(I.orgNameEn);
  const tagline = esc(I.tagline);

  /* Load images */
  const logoUrl = await loadImageAsDataUrl("/images/ckm-logo.png");
  const avatarUrl = await loadImageAsDataUrl(
    user.avatar || "/images/avatar-placeholder.png"
  );

  /* Real QR */
  const qrDataUrl = await generateQR(user.memberId || "CKM-0000");

  const qrMarkup = qrDataUrl
    ? `<image href="${qrDataUrl}" x="832" y="412" width="116" height="116" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="890" y="478" text-anchor="middle" font-family="'Nunito Sans', sans-serif" font-size="12" font-weight="700" fill="#400707">QR</text>`;

  const logoMarkup = logoUrl
    ? `<image href="${logoUrl}" x="60" y="70" width="80" height="80" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="100" y="128" text-anchor="middle" font-family="'Nunito Sans', sans-serif" font-size="24" font-weight="900" fill="#E9D08C">CKM</text>`;

  const initial = esc((user.name || "?").charAt(0));
  const avatarMarkup = avatarUrl
    ? `<image href="${avatarUrl}" x="52" y="238" width="150" height="190" preserveAspectRatio="xMidYMid slice" clip-path="url(#photoClip)"/>`
    : `<rect x="52" y="238" width="150" height="190" rx="10" fill="#FBF3DD"/><text x="127" y="365" text-anchor="middle" font-family="'Noto Sans Devanagari', 'Nunito Sans', sans-serif" font-size="90" font-weight="700" fill="#7c0f12">${initial}</text>`;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 630" width="1000" height="630" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="bgBase" cx="50%" cy="0%" r="100%">
      <stop offset="0%"   stop-color="#8d1212"/>
      <stop offset="45%"  stop-color="#5a0a0a"/>
      <stop offset="100%" stop-color="#2b0404"/>
    </radialGradient>
    <radialGradient id="bgGlow1" cx="85%" cy="20%" r="60%">
      <stop offset="0%"   stop-color="#C9A24B" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#C9A24B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bgGlow2" cx="10%" cy="90%" r="55%">
      <stop offset="0%"   stop-color="#E9D08C" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#E9D08C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#8a6620"/>
      <stop offset="22%"  stop-color="#E9D08C"/>
      <stop offset="50%"  stop-color="#FFEDB0"/>
      <stop offset="78%"  stop-color="#E9D08C"/>
      <stop offset="100%" stop-color="#8a6620"/>
    </linearGradient>
    <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#FFEDB0"/>
      <stop offset="50%"  stop-color="#C9A24B"/>
      <stop offset="100%" stop-color="#7a5a18"/>
    </linearGradient>
    <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="35%"  stop-color="#FFEDB0" stop-opacity="0.35"/>
      <stop offset="50%"  stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="65%"  stop-color="#FFEDB0" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#C9A24B"/>
      <stop offset="50%"  stop-color="#E9D08C"/>
      <stop offset="100%" stop-color="#A07C2F"/>
    </linearGradient>
    <pattern id="guilloche" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 0,20 Q 10,0 20,20 T 40,20" stroke="#C9A24B" stroke-width="0.4" fill="none" opacity="0.35"/>
      <path d="M 0,30 Q 10,10 20,30 T 40,30" stroke="#E9D08C" stroke-width="0.3" fill="none" opacity="0.25"/>
    </pattern>
    <linearGradient id="frameEdge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#C9A24B"/>
      <stop offset="50%"  stop-color="#FFEDB0"/>
      <stop offset="100%" stop-color="#8a6620"/>
    </linearGradient>
    <clipPath id="photoClip">
      <rect x="52" y="238" width="150" height="190" rx="10"/>
    </clipPath>
    <clipPath id="cardClip">
      <rect x="0" y="0" width="1000" height="630" rx="22"/>
    </clipPath>
  </defs>

  <g clip-path="url(#cardClip)">
    <rect width="1000" height="630" fill="url(#bgBase)"/>
    <rect width="1000" height="630" fill="url(#bgGlow1)"/>
    <rect width="1000" height="630" fill="url(#bgGlow2)"/>
    <rect width="1000" height="630" fill="url(#guilloche)" opacity="0.45"/>

    <circle cx="500" cy="315" r="260" fill="none" stroke="#E9D08C" stroke-opacity="0.06" stroke-width="1"/>
    <circle cx="500" cy="315" r="200" fill="none" stroke="#E9D08C" stroke-opacity="0.05" stroke-width="1"/>
    <text x="500" y="340" text-anchor="middle"
          font-family="'Noto Sans Devanagari', 'Nunito Sans', sans-serif"
          font-size="96" font-weight="900"
          fill="#E9D08C" opacity="0.045">छत्तीसगढ़ कलार महासंघ</text>

    <rect x="14" y="14" width="972" height="602" rx="16" fill="none" stroke="url(#frameEdge)" stroke-width="1.5"/>
    <rect x="22" y="22" width="956" height="586" rx="12" fill="none" stroke="#C9A24B" stroke-opacity="0.35" stroke-width="0.8"/>

    <rect x="36" y="36" width="928" height="14" rx="4" fill="url(#goldFoil)"/>
    <rect x="36" y="36" width="928" height="14" rx="4" fill="none" stroke="#FFEDB0" stroke-opacity="0.5" stroke-width="0.6"/>

    <!-- HEADER -->
    <rect x="52" y="62" width="96" height="96" rx="14" fill="#4a0708"/>
    <rect x="52" y="62" width="96" height="96" rx="14" fill="none" stroke="url(#goldFoil)" stroke-width="2"/>
    <rect x="56" y="66" width="88" height="88" rx="10" fill="none" stroke="#C9A24B" stroke-opacity="0.4" stroke-width="0.6"/>
    ${logoMarkup}

    <text x="176" y="102"
          font-family="'Noto Sans Devanagari', 'Nunito Sans', sans-serif"
          font-size="38" font-weight="900" fill="#E9D08C"
          letter-spacing="0.5">छत्तीसगढ़ कलार महासंघ</text>

    <text x="176" y="128"
          font-family="'Nunito Sans', sans-serif"
          font-size="13" font-weight="700" letter-spacing="4.5"
          fill="#ffffff" opacity="0.55">${orgNameEn}</text>

    <text x="176" y="152"
          font-family="'Noto Sans Devanagari', 'Nunito Sans', sans-serif"
          font-size="16" font-weight="600" letter-spacing="0.4"
          fill="#ffffff" opacity="0.78">${tagline}</text>

    <line x1="52" y1="188" x2="948" y2="188" stroke="#C9A24B" stroke-opacity="0.28" stroke-width="1"/>
    <rect x="495" y="184" width="10" height="10" fill="#C9A24B" transform="rotate(45 500 189)" opacity="0.7"/>

    <!-- PHOTO -->
    <rect x="46" y="232" width="162" height="202" rx="14" fill="url(#frameGrad)"/>
    <rect x="49" y="235" width="156" height="196" rx="12" fill="#4a0708"/>
    ${avatarMarkup}

    <path d="M 46,246 L 46,232 L 60,232" fill="none" stroke="#FFEDB0" stroke-width="2"/>
    <path d="M 208,232 L 208,246 M 208,232 L 194,232" fill="none" stroke="#FFEDB0" stroke-width="2"/>
    <path d="M 46,420 L 46,434 L 60,434" fill="none" stroke="#FFEDB0" stroke-width="2"/>
    <path d="M 208,434 L 208,420 M 208,434 L 194,434" fill="none" stroke="#FFEDB0" stroke-width="2"/>

    <!-- NAME + ROLE -->
    <text x="238" y="280"
          font-family="'Noto Sans Devanagari', 'Nunito Sans', sans-serif"
          font-size="44" font-weight="900" fill="#ffffff"
          letter-spacing="-0.5">${name}</text>

    <rect x="238" y="300" width="196" height="34" rx="17" fill="url(#badgeGrad)"/>
    <rect x="238" y="300" width="196" height="34" rx="17" fill="none" stroke="#FFEDB0" stroke-opacity="0.6" stroke-width="0.8"/>
    <text x="336" y="323" text-anchor="middle"
          font-family="'Noto Sans Devanagari', 'Nunito Sans', sans-serif"
          font-size="14" font-weight="900" letter-spacing="1.5"
          fill="#3a1a05">${role.toUpperCase()}</text>

    <!-- INFO ROW 1 -->
    <text x="238" y="386"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="11" font-weight="800" letter-spacing="1.5"
          fill="#C9A24B" opacity="0.85">${lblMemberId}</text>
    <text x="238" y="416"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="22" font-weight="900" fill="#E9D08C">${memberId}</text>

    <text x="530" y="386"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="11" font-weight="800" letter-spacing="1.5"
          fill="#C9A24B" opacity="0.85">${lblDistrict}</text>
    <text x="530" y="416"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="22" font-weight="900" fill="#E9D08C">${district}</text>

    <!-- INFO ROW 2 -->
    <text x="238" y="466"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="11" font-weight="800" letter-spacing="1.5"
          fill="#C9A24B" opacity="0.85">${lblJoined}</text>
    <text x="238" y="496"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="22" font-weight="900" fill="#E9D08C">${joinedAt}</text>

    <text x="530" y="466"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="11" font-weight="800" letter-spacing="1.5"
          fill="#C9A24B" opacity="0.85">${lblMobile}</text>
    <text x="530" y="496"
          font-family="'Nunito Sans', 'Noto Sans Devanagari', sans-serif"
          font-size="22" font-weight="900" fill="#E9D08C">${phone}</text>

    <!-- QR -->
    <rect x="820" y="400" width="140" height="140" rx="14" fill="#ffffff"/>
    <rect x="820" y="400" width="140" height="140" rx="14" fill="none" stroke="#C9A24B" stroke-width="1.5"/>
    ${qrMarkup}

    <!-- SEAL -->
    <g transform="translate(940, 530)">
      <circle r="34" fill="none" stroke="url(#goldFoil)" stroke-width="1.5" opacity="0.75"/>
      <circle r="28" fill="none" stroke="#C9A24B" stroke-opacity="0.55" stroke-width="0.8"/>
      <circle r="22" fill="url(#goldFoil)" opacity="0.15"/>
      <text x="0" y="4" text-anchor="middle" font-family="'Nunito Sans', sans-serif" font-size="9" font-weight="900" letter-spacing="1" fill="#E9D08C" opacity="0.9">CKM</text>
      <text x="0" y="14" text-anchor="middle" font-family="'Nunito Sans', sans-serif" font-size="5" font-weight="700" letter-spacing="0.5" fill="#C9A24B" opacity="0.75">EST. 2024</text>
    </g>

    <!-- FOOTER -->
    <line x1="52" y1="556" x2="948" y2="556" stroke="#C9A24B" stroke-opacity="0.28" stroke-width="1"/>

    <text x="500" y="580" text-anchor="middle"
          font-family="'Nunito Sans', sans-serif"
          font-size="13" font-weight="700" letter-spacing="0.6"
          fill="#ffffff" opacity="0.75">
      cgkalarmahasangh.org   •   +91 98260 50235   •   cgkalarmahasangh@gmail.com
    </text>

    <rect x="36" y="594" width="928" height="12" rx="4" fill="url(#goldFoil)"/>
    <rect x="36" y="594" width="928" height="12" rx="4" fill="none" stroke="#FFEDB0" stroke-opacity="0.5" stroke-width="0.6"/>

    <rect width="1000" height="630" fill="url(#holo)" opacity="0.35" style="mix-blend-mode:overlay;"/>
  </g>
</svg>
`.trim();
}