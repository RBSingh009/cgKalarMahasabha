// src/app/layout.js
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import LayoutShell from "@/components/layout/LayoutShell";

import "./globals.css";

/* ============================================================
   FULL SEO METADATA
   ============================================================ */
export const metadata = {
  metadataBase: new URL("https://www.cgkalarmahasangh.com"),

  title: {
    default: "C.G. Kalar Mahasangh | Official Website",
    template: "%s | C.G. Kalar Mahasangh",
  },

  description:
    "छत्तीसगढ़ कलार महासंघ - समाज के सर्वांगीण विकास हेतु समर्पित। Official website for the C.G. Kalar community in Chhattisgarh. Membership, events, news, and culture.",

  keywords: [
    "C.G. Kalar Mahasangh",
    "CG Kalar Mahasangh",
    "Kalar community",
    "Chhattisgarh Kalar",
    "Kalar federation",
    "Kalar Samaj",
    "सी.जी. कलार महासंघ",
    "छत्तीसगढ़ कलार महासंघ",
    "कलार समाज",
  ],

  authors: [{ name: "C.G. Kalar Mahasangh" }],
  creator: "C.G. Kalar Mahasangh",
  publisher: "C.G. Kalar Mahasangh",

  openGraph: {
    title: "C.G. Kalar Mahasangh | Official Website",
    description:
      "Official community federation for the Kalar community in Chhattisgarh. Membership, events, news, and cultural programs.",
    url: "https://www.cgkalarmahasangh.com",
    siteName: "C.G. Kalar Mahasangh",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "C.G. Kalar Mahasangh - Community and Culture",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "C.G. Kalar Mahasangh | Official Website",
    description:
      "Official community federation for the Kalar community in Chhattisgarh.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Community",
};

/* ============================================================
   VIEWPORT
   ============================================================ */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8b1a1a",
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({ children }) {
  /* Structured Data — Organization schema */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "C.G. Kalar Mahasangh",
    alternateName: "छत्तीसगढ़ कलार महासंघ",
    url: "https://www.cgkalarmahasangh.com",
    logo: "https://www.cgkalarmahasangh.com/logo.png",
    description:
      "Official community federation for the Kalar community in Chhattisgarh.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@cgkalarmahasangh.com",
      availableLanguage: ["Hindi", "English"],
    },
    sameAs: [],
  };

  return (
    <html lang="hi">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Nunito+Sans:wght@200..1000&family=Noto+Sans+Devanagari:wght@400;600;700;900&family=Onest:wght@100..900&display=swap"
          rel="stylesheet"
        />

        {/* Icons & Animation libraries */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />

        {/* Vendor CSS */}
        <link rel="stylesheet" href="/vendor/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/vendor/css/fancybox.css" />
        <link rel="stylesheet" href="/vendor/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/vendor/css/animate.css" />
        <link rel="stylesheet" href="/vendor/css/jarallax.min.css" />
        <link rel="stylesheet" href="/vendor/css/nice-select.css" />
        <link rel="stylesheet" href="/vendor/css/style.css" />

        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body>
        <LanguageProvider>
          <AuthProvider>
            <LayoutShell>{children}</LayoutShell>
          </AuthProvider>
        </LanguageProvider>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}