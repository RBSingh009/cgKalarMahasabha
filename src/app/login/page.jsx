// src/app/login/page.jsx
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useLang } from "@/context/LanguageContext";

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, loading } = useAuth();
  const { t } = useLang();

  const L = t.login;
  const next = params.get("next") || "/dashboard";

  useEffect(() => {
    if (!loading && user) {
      router.replace(next);
    }
  }, [loading, user, router, next]);

  return (
    <main className="ckm-auth-page ckm-page-offset">
      {/* LEFT - brand panel */}
      <section className="ckm-auth-aside" aria-hidden="true">
        <div className="ckm-auth-aside-glow glow-1" />
        <div className="ckm-auth-aside-glow glow-2" />
        <div className="ckm-auth-aside-ring ring-1" />
        <div className="ckm-auth-aside-ring ring-2" />

        <div className="ckm-auth-aside-content">
          <h2 className="ckm-auth-aside-title">{L.asideOrgName}</h2>
          <p className="ckm-auth-aside-tag">{L.asideTag}</p>

          <div className="ckm-auth-aside-quote">
            <span className="ckm-auth-quote-line" />
            {L.asideMotto}
            <span className="ckm-auth-quote-line" />
          </div>

          <ul className="ckm-auth-aside-features">
            <li>
              <i className="fa-solid fa-users" />
              {L.asideFeature1}
            </li>
            <li>
              <i className="fa-solid fa-bullhorn" />
              {L.asideFeature2}
            </li>
            <li>
              <i className="fa-solid fa-hand-holding-heart" />
              {L.asideFeature3}
            </li>
            <li>
              <i className="fa-solid fa-id-card" />
              {L.asideFeature4}
            </li>
          </ul>
        </div>

        <div className="ckm-auth-aside-footer">
          <p>
            © {new Date().getFullYear()} {L.asideOrgName}
          </p>
        </div>
      </section>
      {/* RIGHT - form panel */}
      <section className="ckm-auth-main">
        <div className="ckm-auth-card">
          <div className="ckm-auth-header">
            <span className="ckm-auth-eyebrow">
              <span className="ckm-auth-eyebrow-line" />
              {L.eyebrow}
            </span>
            <h1 className="ckm-auth-title">{L.title}</h1>
            <p className="ckm-auth-subtitle">{L.subtitle}</p>
          </div>

          <LoginForm redirectTo={next} />
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="ckm-auth-page ckm-page-offset">
          <div className="ckm-mem-loading">
            <span className="ckm-mem-spinner" />
            लोड हो रहा है…
          </div>
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
