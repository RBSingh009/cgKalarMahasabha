// src/data/gallery.js

/* Helper: build local image path */
const local = (album, file) => `/images/gallery/${album}/${file}`;

export const galleryAlbums = [
  /* ============================================================
     ALBUM 1 — सांस्कृतिक कार्यक्रम
     Files: cover.jpg, photo-2.jpg, photo-3.jpg, photo-4.jpg, photo-5.jpg
     ============================================================ */
  {
    id: 1,
    slug: "sanskritik-karyakram",
    titleHi: "सांस्कृतिक कार्यक्रम",
    titleEn: "Cultural Programs",
    descHi: "महासंघ के सांस्कृतिक उत्सव एवं सम्मेलनों की झलकियां।",
    descEn: "Glimpses of cultural events and conventions by the Mahasangh.",
    cover: local("sanskritik-karyakram", "cover.jpg"),
    photos: [
      {
        id: 1,
        src: local("sanskritik-karyakram", "photo-2.jpg"),
        captionHi: "वार्षिक सम्मेलन 2025",
        captionEn: "Annual Convention 2025",
      },
      {
        id: 2,
        src: local("sanskritik-karyakram", "photo-3.jpg"),
        captionHi: "पारंपरिक नृत्य प्रस्तुति",
        captionEn: "Traditional Dance Performance",
      },
      {
        id: 3,
        src: local("sanskritik-karyakram", "photo-4.jpg"),
        captionHi: "कलाकारों का सम्मान",
        captionEn: "Artist Felicitation",
      },
      {
        id: 4,
        src: local("sanskritik-karyakram", "photo-5.jpg"),
        captionHi: "सांस्कृतिक प्रस्तुति",
        captionEn: "Cultural Performance",
      },
    ],
  },

  /* ============================================================
     ALBUM 2 — शिक्षा एवं छात्रवृत्ति
     Files: photo-1.jpg, photo-2.jpg, photo-3.jpg, photo-4.jpg, Photo-5.jpg
     Cover: use photo-1.jpg (no cover file)
     ============================================================ */
  {
    id: 2,
    slug: "shiksha-scholarship",
    titleHi: "शिक्षा एवं छात्रवृत्ति",
    titleEn: "Education & Scholarship",
    descHi: "छात्रवृत्ति वितरण एवं शिक्षा कार्यक्रमों की तस्वीरें।",
    descEn: "Photos from scholarship distribution and education programs.",
    cover: local("shiksha-scholarship", "photo-1.jpg"),
    photos: [
      {
        id: 1,
        src: local("shiksha-scholarship", "photo-1.jpg"),
        captionHi: "छात्रवृत्ति वितरण",
        captionEn: "Scholarship Distribution",
      },
      {
        id: 2,
        src: local("shiksha-scholarship", "photo-2.jpg"),
        captionHi: "मेधावी छात्र सम्मान",
        captionEn: "Meritorious Student Award",
      },
      {
        id: 3,
        src: local("shiksha-scholarship", "photo-3.jpg"),
        captionHi: "पुस्तक वितरण",
        captionEn: "Book Distribution",
      },
      {
        id: 4,
        src: local("shiksha-scholarship", "photo-4.jpg"),
        captionHi: "मार्गदर्शन सत्र",
        captionEn: "Guidance Session",
      },
      {
        id: 5,
        src: local("shiksha-scholarship", "Photo-5.jpg"),   // ⚡ Capital P — exact match
        captionHi: "अभिभावक बैठक",
        captionEn: "Parents Meeting",
      },
    ],
  },

  /* ============================================================
     ⚡ TEMPORARILY DISABLED — folders are empty
     Uncomment these when you add photos to:
     → raktdaan-shivir
     → swasthya-shivir
     → youth-workshop
     → mahila-sammelan
     ============================================================ */

  /*
  {
    id: 3,
    slug: "raktdaan-shivir",
    titleHi: "रक्तदान शिविर",
    titleEn: "Blood Donation Camps",
    descHi: "प्रदेश भर में आयोजित रक्तदान शिविरों की तस्वीरें।",
    descEn: "Photos from blood donation camps organized across the state.",
    cover: local("raktdaan-shivir", "cover.jpg"),
    photos: [
      { id: 1, src: local("raktdaan-shivir", "photo-1.jpg"), captionHi: "रायपुर शिविर",              captionEn: "Raipur Camp" },
      { id: 2, src: local("raktdaan-shivir", "photo-2.jpg"), captionHi: "रक्तदाताओं का उत्साह",      captionEn: "Enthusiastic Donors" },
      { id: 3, src: local("raktdaan-shivir", "photo-3.jpg"), captionHi: "युवा रक्तदाता",             captionEn: "Youth Donors" },
      { id: 4, src: local("raktdaan-shivir", "photo-4.jpg"), captionHi: "चिकित्सा दल",                captionEn: "Medical Team" },
      { id: 5, src: local("raktdaan-shivir", "photo-5.jpg"), captionHi: "प्रमाण पत्र वितरण",        captionEn: "Certificate Distribution" },
      { id: 6, src: local("raktdaan-shivir", "photo-6.jpg"), captionHi: "सामूहिक भागीदारी",          captionEn: "Collective Participation" },
      { id: 7, src: local("raktdaan-shivir", "photo-7.jpg"), captionHi: "शिविर का दृश्य",             captionEn: "Camp View" },
      { id: 8, src: local("raktdaan-shivir", "photo-8.jpg"), captionHi: "महासंघ के पदाधिकारी",         captionEn: "Mahasangh Officials" },
    ],
  },

  {
    id: 4,
    slug: "swasthya-shivir",
    titleHi: "स्वास्थ्य शिविर",
    titleEn: "Health Camps",
    descHi: "निःशुल्क स्वास्थ्य शिविरों की तस्वीरें।",
    descEn: "Photos of free health camps organized by the Mahasangh.",
    cover: local("swasthya-shivir", "cover.jpg"),
    photos: [
      { id: 1, src: local("swasthya-shivir", "photo-1.jpg"), captionHi: "निःशुल्क परीक्षण",       captionEn: "Free Checkups" },
      { id: 2, src: local("swasthya-shivir", "photo-2.jpg"), captionHi: "चिकित्सकों की टीम",      captionEn: "Doctors Team" },
      { id: 3, src: local("swasthya-shivir", "photo-3.jpg"), captionHi: "दवा वितरण",             captionEn: "Medicine Distribution" },
      { id: 4, src: local("swasthya-shivir", "photo-4.jpg"), captionHi: "महिला स्वास्थ्य शिविर",  captionEn: "Women Health Camp" },
      { id: 5, src: local("swasthya-shivir", "photo-5.jpg"), captionHi: "जागरूकता कार्यक्रम",     captionEn: "Awareness Program" },
      { id: 6, src: local("swasthya-shivir", "photo-6.jpg"), captionHi: "रोगियों की भीड़",        captionEn: "Patient Turnout" },
    ],
  },

  {
    id: 5,
    slug: "youth-workshop",
    titleHi: "युवा कार्यशाला",
    titleEn: "Youth Workshops",
    descHi: "युवाओं के लिए आयोजित प्रशिक्षण एवं कार्यशालाएं।",
    descEn: "Training programs and workshops for youth.",
    cover: local("youth-workshop", "cover.jpg"),
    photos: [
      { id: 1, src: local("youth-workshop", "photo-1.jpg"), captionHi: "नेतृत्व प्रशिक्षण",       captionEn: "Leadership Training" },
      { id: 2, src: local("youth-workshop", "photo-2.jpg"), captionHi: "समूह चर्चा",              captionEn: "Group Discussion" },
      { id: 3, src: local("youth-workshop", "photo-3.jpg"), captionHi: "प्रमाण पत्र वितरण",      captionEn: "Certificate Distribution" },
      { id: 4, src: local("youth-workshop", "photo-4.jpg"), captionHi: "सहभागी युवा",             captionEn: "Participating Youth" },
      { id: 5, src: local("youth-workshop", "photo-5.jpg"), captionHi: "प्रशिक्षकों के साथ",       captionEn: "With Trainers" },
    ],
  },

  {
    id: 6,
    slug: "mahila-sammelan",
    titleHi: "महिला सम्मेलन",
    titleEn: "Women Conventions",
    descHi: "महिला सशक्तिकरण एवं सम्मेलनों की तस्वीरें।",
    descEn: "Photos from women empowerment and convention events.",
    cover: local("mahila-sammelan", "cover.jpg"),
    photos: [
      { id: 1, src: local("mahila-sammelan", "photo-1.jpg"), captionHi: "महिला सम्मेलन",            captionEn: "Women Convention" },
      { id: 2, src: local("mahila-sammelan", "photo-2.jpg"), captionHi: "सशक्तिकरण कार्यक्रम",     captionEn: "Empowerment Program" },
      { id: 3, src: local("mahila-sammelan", "photo-3.jpg"), captionHi: "महिला सम्मान",             captionEn: "Women Felicitation" },
      { id: 4, src: local("mahila-sammelan", "photo-4.jpg"), captionHi: "कौशल विकास",               captionEn: "Skill Development" },
      { id: 5, src: local("mahila-sammelan", "photo-5.jpg"), captionHi: "सहभागी महिलाएं",            captionEn: "Participating Women" },
    ],
  },
  */
];

/* ============================================================
   GALLERY PREVIEW (homepage grid)
   Uses only enabled albums
   ============================================================ */
export const galleryPreview = [
  {
    id: 1,
    titleHi: "वार्षिक सांस्कृतिक कार्यक्रम",
    titleEn: "Annual Cultural Program",
    image: local("sanskritik-karyakram", "cover.jpg"),
    album: "सांस्कृतिक",
  },
  {
    id: 2,
    titleHi: "सांस्कृतिक प्रस्तुति",
    titleEn: "Cultural Performance",
    image: local("sanskritik-karyakram", "photo-3.jpg"),
    album: "सांस्कृतिक",
  },
  {
    id: 3,
    titleHi: "कलाकारों का सम्मान",
    titleEn: "Artist Felicitation",
    image: local("sanskritik-karyakram", "photo-4.jpg"),
    album: "सांस्कृतिक",
  },
  {
    id: 4,
    titleHi: "छात्रवृत्ति वितरण",
    titleEn: "Scholarship Distribution",
    image: local("shiksha-scholarship", "photo-1.jpg"),
    album: "शिक्षा",
  },
  {
    id: 5,
    titleHi: "मेधावी छात्र सम्मान",
    titleEn: "Meritorious Student Award",
    image: local("shiksha-scholarship", "photo-2.jpg"),
    album: "शिक्षा",
  },
  {
    id: 6,
    titleHi: "पुस्तक वितरण",
    titleEn: "Book Distribution",
    image: local("shiksha-scholarship", "photo-3.jpg"),
    album: "शिक्षा",
  },
];
