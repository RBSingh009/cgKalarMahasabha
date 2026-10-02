// src/data/membership.js

export const membershipTiers = [
  {
    id: 'active',
    nameHi: 'सक्रिय सदस्य',
    nameEn: 'Active Member',
    price: 1000,
    periodHi: '/ माह',
    periodEn: '/ month',
    featuresHi: [
      'सभी कार्यक्रमों में प्रवेश',
      'मासिक बैठक में भागीदारी',
      'सदस्यता आईडी कार्ड',
      'न्यूज़लेटर प्राप्ति',
    ],
    featuresEn: [
      'Entry to all events',
      'Monthly meeting participation',
      'Membership ID card',
      'Newsletter access',
    ],
  },
  {
    id: 'general',
    nameHi: 'साधारण सदस्य',
    nameEn: 'General Member',
    price: 5000,
    periodHi: '/ वर्ष',
    periodEn: '/ year',
    featuresHi: [
      'सभी सक्रिय सदस्य लाभ',
      'कार्यक्रमों में विशेष स्थान',
      'समाज की निर्णय प्रक्रिया में भागीदारी',
      'वार्षिक रिपोर्ट',
    ],
    featuresEn: [
      'All Active Member benefits',
      'Special seating at events',
      'Participation in decisions',
      'Annual report',
    ],
    popular: true,
  },
  {
    id: 'patron',
    nameHi: 'संरक्षक सदस्य',
    nameEn: 'Patron Member',
    price: 50000,
    periodHi: 'एकमुश्त',
    periodEn: 'One-time',
    featuresHi: [
      'सभी साधारण सदस्य लाभ',
      'आजीवन सदस्यता',
      'सम्मान समारोह में विशेष स्थान',
      'वार्षिक पत्रिका में नाम',
      'सलाहकार समिति में स्थान',
    ],
    featuresEn: [
      'All General Member benefits',
      'Lifetime membership',
      'Special seating at ceremonies',
      'Name in annual magazine',
      'Position on advisory board',
    ],
  },
];

export const districts = [
  'रायपुर', 'बिलासपुर', 'दुर्ग', 'भिलाई', 'कोरबा',
  'राजनांदगांव', 'जगदलपुर', 'अंबिकापुर', 'रायगढ़',
  'धमतरी', 'महासमुंद', 'कांकेर', 'अन्य',
];

export const districtsEn = [
  'Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Korba',
  'Rajnandgaon', 'Jagdalpur', 'Ambikapur', 'Raigarh',
  'Dhamtari', 'Mahasamund', 'Kanker', 'Other',
];