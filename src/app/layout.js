// src/app/layout.js
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import ScrollTop from "@/components/layout/ScrollTop";
import AOSInit from "@/components/layout/AOSInit";
import ContactWidget from "@/components/shared/ContactWidget";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

import "./globals.css";

export const metadata = {
  title: "Chhattisgarh Kalar Mahasangh",
  description: "छत्तीसगढ़ कलार महासंघ - समाज के सर्वांगीण विकास हेतु समर्पित।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@2.3.4/dist/aos.css"
        />
        <link rel="stylesheet" href="/vendor/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/vendor/css/fancybox.css" />
        <link rel="stylesheet" href="/vendor/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/vendor/css/animate.css" />
        <link rel="stylesheet" href="/vendor/css/jarallax.min.css" />
        <link rel="stylesheet" href="/vendor/css/nice-select.css" />
        <link rel="stylesheet" href="/vendor/css/style.css" />
      </head>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <Preloader />
            <Header />          {/* ← ONE header, for the entire app */}
            {children}
            <Footer />
            <ScrollTop />
            <ContactWidget />   {/* ← NEW floating contact widget */}
          </AuthProvider>
        </LanguageProvider>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <AOSInit />
      </body>
    </html>
  );
}