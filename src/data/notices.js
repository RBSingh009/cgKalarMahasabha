// src/data/notices.js

export const notices = [
  {
    id: 1,
    slug: 'scholarship-form-2026',
    category: 'योजना',
    categoryEn: 'Scheme',
    title: 'छात्रवृत्ति आवेदन फॉर्म 2026 - अंतिम तिथि 31 मार्च',
    titleEn: 'Scholarship Application Form 2026 - Last Date 31 March',
    body:
      'छत्तीसगढ़ कलार महासंघ द्वारा संचालित छात्रवृत्ति योजना 2026 के लिए आवेदन प्रारंभ हो चुके हैं। कक्षा 10वीं एवं 12वीं के मेधावी छात्र-छात्राएं 31 मार्च 2026 तक आवेदन कर सकते हैं। आवेदन फॉर्म महासंघ कार्यालय अथवा वेबसाइट से डाउनलोड करें।',
    bodyEn:
      'Applications for the 2026 Scholarship Scheme run by Chhattisgarh Kalar Mahasangh are now open. Meritorious students of Class 10 and 12 can apply until 31 March 2026. Forms can be downloaded from the Mahasangh office or website.',
    publishedAt: '2026-01-20',
    important: true,
    attachment: null,
  },
  {
    id: 2,
    slug: 'blood-donation-camp-raipur',
    category: 'कार्यक्रम',
    categoryEn: 'Event',
    title: 'रक्तदान शिविर - रायपुर, 15 फरवरी 2026',
    titleEn: 'Blood Donation Camp - Raipur, 15 Feb 2026',
    body:
      'महासंघ द्वारा रायपुर के सामुदायिक भवन में 15 फरवरी 2026 को सुबह 9 बजे से दोपहर 2 बजे तक रक्तदान शिविर आयोजित किया जाएगा। इच्छुक रक्तदाता अपना नाम महासंघ कार्यालय में दर्ज कराएं।',
    bodyEn:
      'A blood donation camp will be organized at the Community Hall, Raipur on 15 Feb 2026 from 9 AM to 2 PM. Interested donors may register at the Mahasangh office.',
    publishedAt: '2026-01-15',
    important: false,
    attachment: null,
  },
  {
    id: 3,
    slug: 'monthly-meeting-notice',
    category: 'सूचना',
    categoryEn: 'Notice',
    title: 'मासिक बैठक की सूचना - 5 फरवरी 2026',
    titleEn: 'Monthly Meeting Notice - 5 Feb 2026',
    body:
      'महासंघ की मासिक बैठक 5 फरवरी 2026 को सायं 6 बजे कार्यालय में आयोजित की जाएगी। सभी पदाधिकारियों एवं सदस्यों की उपस्थिति अनिवार्य है।',
    bodyEn:
      'The monthly meeting of the Mahasangh will be held on 5 Feb 2026 at 6 PM at the office. Attendance of all office bearers and members is mandatory.',
    publishedAt: '2026-01-30',
    important: true,
    attachment: null,
  },
  {
    id: 4,
    slug: 'health-camp-durg',
    category: 'कार्यक्रम',
    categoryEn: 'Event',
    title: 'निःशुल्क स्वास्थ्य शिविर - दुर्ग, 22 फरवरी 2026',
    titleEn: 'Free Health Camp - Durg, 22 Feb 2026',
    body:
      'दुर्ग जिले में निःशुल्क स्वास्थ्य शिविर का आयोजन किया जाएगा। अनुभवी चिकित्सकों द्वारा निःशुल्क परीक्षण एवं परामर्श प्रदान किया जाएगा।',
    bodyEn:
      'A free health camp will be organized in Durg district. Free checkups and consultations will be provided by experienced doctors.',
    publishedAt: '2026-01-25',
    important: false,
    attachment: null,
  },
  {
    id: 5,
    slug: 'annual-cultural-program-2026',
    category: 'कार्यक्रम',
    categoryEn: 'Event',
    title: 'वार्षिक सांस्कृतिक कार्यक्रम 2026 - 10 मार्च',
    titleEn: 'Annual Cultural Program 2026 - 10 March',
    body:
      'महासंघ का वार्षिक सांस्कृतिक कार्यक्रम 10 मार्च 2026 को रायपुर में भव्य रूप से आयोजित किया जाएगा। समाज के कलाकारों एवं प्रतिभाओं को मंच प्रदान किया जाएगा।',
    bodyEn:
      'The annual cultural program of the Mahasangh will be held on 10 March 2026 in Raipur. A stage will be provided to artists and talents of the community.',
    publishedAt: '2026-01-28',
    important: false,
    attachment: null,
  },
  {
    id: 6,
    slug: 'membership-drive-2026',
    category: 'योजना',
    categoryEn: 'Scheme',
    title: 'सदस्यता अभियान 2026 - अधिक से अधिक सदस्य जुड़ें',
    titleEn: 'Membership Drive 2026 - Join in Large Numbers',
    body:
      'महासंघ द्वारा वर्ष 2026 में विशेष सदस्यता अभियान चलाया जा रहा है। समाज के सभी बंधुओं से अनुरोध है कि वे महासंघ से जुड़कर समाज सेवा में सहयोग करें।',
    bodyEn:
      'A special membership drive is being conducted by the Mahasangh in 2026. All community members are requested to join the Mahasangh and support social service.',
    publishedAt: '2026-01-10',
    important: true,
    attachment: null,
  },
];

export const noticeCategories = [
  { key: 'all', hi: 'सभी', en: 'All' },
  { key: 'सूचना', hi: 'सूचना', en: 'Notice' },
  { key: 'योजना', hi: 'योजना', en: 'Scheme' },
  { key: 'कार्यक्रम', hi: 'कार्यक्रम', en: 'Event' },
];