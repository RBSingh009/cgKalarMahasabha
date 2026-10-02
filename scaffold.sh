#!/bin/bash

# =============================================
#  Donar Next.js Scaffold Script
# =============================================

set -e

echo "📁 Creating folder structure..."

# Public folders
mkdir -p public/images
mkdir -p public/fonts
mkdir -p public/vendor/css
mkdir -p public/vendor/js

# Src folders
mkdir -p src/app/about
mkdir -p src/app/causes/[slug]
mkdir -p src/app/donation
mkdir -p src/app/volunteer
mkdir -p src/app/gallery
mkdir -p src/app/blog/[slug]
mkdir -p src/app/contact
mkdir -p src/app/event/[slug]
mkdir -p src/app/shop
mkdir -p src/app/cart
mkdir -p src/app/checkout
mkdir -p src/app/login
mkdir -p src/app/register
mkdir -p src/app/pricing
mkdir -p src/app/faq

mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/data
mkdir -p src/hooks
mkdir -p src/lib

echo "📝 Creating placeholder files..."

# ---- Layout components ----
for f in Header HeaderTop Navbar CanvasMenu SearchPopup Footer Preloader ScrollTop; do
  cat > "src/components/layout/$f.jsx" <<EOF
'use client';
export default function $f() {
  return <div className="$f">$f Component</div>;
}
EOF
done

# ---- Section components ----
for f in HeroSlider AboutSection CausesSection CtaSection StorySection StatSection MissionSection TextSlider EventSection TeamSection ReviewSection ProjectSection FaqSection BlogSection; do
  cat > "src/components/sections/$f.jsx" <<EOF
'use client';
export default function $f() {
  return <section className="$f">$f Section</section>;
}
EOF
done

# ---- UI components ----
for f in Button SectionTitle CauseCard EventCard TeamCard BlogCard ProjectCard ProgressBar Counter; do
  cat > "src/components/ui/$f.jsx" <<EOF
'use client';
export default function $f({ children }) {
  return <div>{children}</div>;
}
EOF
done

# ---- Data files ----
for f in navigation causes events team blog projects faqs testimonials; do
  cat > "src/data/$f.js" <<EOF
// Static data for $f
export const ${f}Data = [];
export default ${f}Data;
EOF
done

# ---- Hooks ----
for f in useScrollTop usePreloader useStickyHeader; do
  cat > "src/hooks/$f.js" <<EOF
'use client';
import { useEffect, useState } from 'react';
export default function $f() {
  return null;
}
EOF
done

# ---- Lib ----
cat > src/lib/constants.js <<EOF
export const SITE_NAME = 'Donar';
export const SITE_URL = 'https://donar.example.com';
EOF

cat > src/lib/utils.js <<EOF
export const cn = (...classes) => classes.filter(Boolean).join(' ');
EOF

# ---- Pages ----
create_page () {
  local path="$1"
  local name="$2"
  cat > "$path" <<EOF
export const metadata = { title: '$name | Donar' };
export default function Page() {
  return <main className="sec-padding">$name Page</main>;
}
EOF
}

create_page src/app/about/page.jsx "About Us"
create_page src/app/causes/page.jsx "Causes"
create_page "src/app/causes/[slug]/page.jsx" "Cause Detail"
create_page src/app/donation/page.jsx "Donation"
create_page src/app/volunteer/page.jsx "Volunteer"
create_page src/app/gallery/page.jsx "Gallery"
create_page src/app/blog/page.jsx "Blog"
create_page "src/app/blog/[slug]/page.jsx" "Blog Post"
create_page src/app/contact/page.jsx "Contact"
create_page src/app/event/page.jsx "Events"
create_page "src/app/event/[slug]/page.jsx" "Event Detail"
create_page src/app/shop/page.jsx "Shop"
create_page src/app/cart/page.jsx "Cart"
create_page src/app/checkout/page.jsx "Checkout"
create_page src/app/login/page.jsx "Login"
create_page src/app/register/page.jsx "Register"
create_page src/app/pricing/page.jsx "Pricing"
create_page src/app/faq/page.jsx "FAQ"

# 404
cat > src/app/not-found.jsx <<EOF
import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="sec-padding text-center">
      <h1 className="display-1">404</h1>
      <p>Page not found</p>
      <Link className="btn btn-primary" href="/">Go Home</Link>
    </main>
  );
}
EOF

echo "✅ Scaffold complete!"
echo ""
echo "Next: copy your /images and /css from the HTML template into public/"