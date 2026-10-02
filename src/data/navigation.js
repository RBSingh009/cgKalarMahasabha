// src/data/navigation.js

export const navItems = [
  { key: "home", label: "होम", labelEn: "Home", href: "/" },
  {
    key: "about",
    label: "हमारे बारे में",
    labelEn: "About Us",
    href: "/about",
  },
  { key: "team", label: "हमारे सदस्य", labelEn: "Our Members", href: "/team" },
  {
    key: "membership",
    label: "सदस्यता",
    labelEn: "Membership",
    href: "#",
    dropdown: [
      { label: "सदस्य बनें", labelEn: "Become a Member", href: "/join" },   // ← changed
      { label: "सदस्य सूची", labelEn: "Member Directory", href: "/members" },
      { label: "आईडी कार्ड", labelEn: "ID Card Download", href: "/id-card" },
    ],
  },
  {
    key: "activities",
    label: "गतिविधियाँ",
    labelEn: "Activities",
    href: "#",
    dropdown: [
      { label: "कार्यक्रम", labelEn: "Events", href: "/events" },
      { label: "गैलरी", labelEn: "Gallery", href: "/gallery" },
      { label: "समाचार", labelEn: "News", href: "/news" },
      { label: "छात्रवृत्ति", labelEn: "Scholarships", href: "/scholarships" },
    ],
  },
  { key: "news", label: "समाचार", labelEn: "News", href: "/news" },
  {
    key: "notice",
    label: "सूचना पट्ट",
    labelEn: "Notice Board",
    href: "/notice",
  },
  { key: "gallery", label: "गैलरी", labelEn: "Gallery", href: "/gallery" },
  { key: "contact", label: "संपर्क", labelEn: "Contact", href: "/contact" },
];

export const canvasMenuItems = [
  { label: "होम", labelEn: "Home", href: "/" },
  { label: "हमारे बारे में", labelEn: "About Us", href: "/about" },
  { label: "हमारे सदस्य", labelEn: "Our Members", href: "/team" },
  { label: "सदस्य बनें", labelEn: "Become a Member", href: "/join" },     // ← changed
  { label: "समाचार", labelEn: "News", href: "/news" },
  { label: "सूचना पट्ट", labelEn: "Notice Board", href: "/notice" },
  { label: "गैलरी", labelEn: "Gallery", href: "/gallery" },
  { label: "संपर्क", labelEn: "Contact Us", href: "/contact" },
];