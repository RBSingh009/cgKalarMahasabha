// src/data/tiers.js

export const tiers = [
  /* ============================================================
     GENERAL MEMBER - साधारण सदस्य
     ₹500/month OR ₹6,000/year
     ============================================================ */
  {
    id: 1,
    key: 'general',
    nameHi: 'साधारण सदस्य',
    nameEn: 'General Member',
    price: '₹500',
    priceAlt: '₹6,000',
    periodHi: '/ माह',
    periodEn: '/ month',
    periodAltHi: '/ वर्ष',
    periodAltEn: '/ year',
    typeHi: 'मासिक / वार्षिक',
    typeEn: 'Monthly / Yearly',

    featuresHi: [
      'सभी कार्यक्रमों में प्रवेश',
      'मासिक बैठक में भागीदारी',
      'सदस्यता आईडी कार्ड',
      'न्यूज़लेटर एवं सूचनाएँ',
    ],
    featuresEn: [
      'Entry to all events',
      'Monthly meeting participation',
      'Membership ID card',
      'Newsletter and notices',
    ],

    noteHi: '6 माह तक अभिदान न देने पर सदस्यता समाप्त हो जाएगी।',
    noteEn: 'Membership lapses if donation is not paid for 6 months.',

    popular: false,
    upgrade: null,
  },

  /* ============================================================
     LIFE MEMBER - आजीवन सदस्य
     ₹10,000 one-time
     Upgrade path: + ₹40,000 → Patron
     ============================================================ */
  {
    id: 2,
    key: 'life',
    nameHi: 'आजीवन सदस्य',
    nameEn: 'Life Member',
    price: '₹10,000',
    periodHi: 'एक मुश्त',
    periodEn: 'One-time',
    typeHi: 'आजीवन',
    typeEn: 'Lifetime',

    featuresHi: [
      'सभी साधारण सदस्य लाभ',
      'आजीवन सदस्यता - नवीनीकरण की आवश्यकता नहीं',
      'सभी कार्यक्रमों में प्राथमिकता प्रवेश',
      'कार्यक्रमों में विशेष मान्यता',
      'वार्षिक रिपोर्ट एवं प्रकाशन',
    ],
    featuresEn: [
      'All General Member benefits',
      'Lifetime membership - no renewal needed',
      'Priority entry to all events',
      'Recognition at events',
      'Annual report and publications',
    ],

    noteHi: '',
    noteEn: '',

    popular: true,

    /* ⚡ Upgrade path to Patron */
    upgrade: {
      badgeHi: 'अपग्रेड संभव',
      badgeEn: 'Upgrade Available',
      textHi: '₹40,000 अतिरिक्त देकर संरक्षक बनें',
      textEn: 'Add ₹40,000 to become Patron',
      noteHi: 'कुल ₹50,000 - संरक्षक सदस्य के समान',
      noteEn: 'Total ₹50,000 - same as direct Patron',
    },
  },

  /* ============================================================
     PATRON MEMBER - संरक्षक सदस्य
     ₹50,000 one-time (direct)
     OR Life + ₹40,000 upgrade
     ============================================================ */
  {
    id: 3,
    key: 'patron',
    nameHi: 'संरक्षक सदस्य',
    nameEn: 'Patron Member',
    price: '₹50,000',
    periodHi: 'एक मुश्त',
    periodEn: 'One-time',
    typeHi: 'संरक्षक',
    typeEn: 'Patron',

    featuresHi: [
      'सभी आजीवन सदस्य लाभ',
      'संस्था की सलाहकार समिति में स्थान',
      'सम्मान समारोह में विशेष स्थान',
      'वार्षिक पत्रिका में नाम एवं फोटो',
      'सभी कार्यक्रमों में VIP आमंत्रण',
    ],
    featuresEn: [
      'All Life Member benefits',
      'Position on advisory board',
      'Special seating at ceremonies',
      'Name and photo in annual magazine',
      'VIP invitation to all events',
    ],

    noteHi: '',
    noteEn: '',

    popular: false,

    /* ⚡ Dual entry path */
    upgrade: {
      badgeHi: 'दो तरीके',
      badgeEn: 'Two Ways',
      textHi: 'सीधे ₹50,000 दें, या आजीवन सदस्य बनकर ₹40,000 अतिरिक्त दें',
      textEn: 'Pay ₹50,000 directly, OR become Life Member first + add ₹40,000',
      noteHi: 'दोनों में कुल राशि ₹50,000',
      noteEn: 'Total in both cases: ₹50,000',
    },
  },
];

/* ============================================================
   Optional - quick lookup by key
   ============================================================ */
export const tierByKey = (key) => tiers.find((t) => t.key === key);
export const tierById = (id) => tiers.find((t) => t.id === id);