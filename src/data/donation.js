// src/data/donation.js

export const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

export const impactLevels = [
  {
    amount: 500,
    icon: 'fa-book',
    titleHi: 'एक बच्चे को किताबें',
    titleEn: 'Books for one child',
    descHi: 'एक महीने की पढ़ाई सामग्री',
    descEn: 'Study material for a month',
  },
  {
    amount: 1000,
    icon: 'fa-utensils',
    titleHi: 'एक परिवार का भोजन',
    titleEn: 'Meals for a family',
    descHi: 'एक सप्ताह का पौष्टिक भोजन',
    descEn: 'Nutritious food for a week',
  },
  {
    amount: 2500,
    icon: 'fa-stethoscope',
    titleHi: 'स्वास्थ्य परीक्षण',
    titleEn: 'Health checkups',
    descHi: '5 लोगों का निःशुल्क परीक्षण',
    descEn: 'Free checkups for 5 people',
  },
  {
    amount: 5000,
    icon: 'fa-graduation-cap',
    titleHi: 'छात्रवृत्ति सहयोग',
    titleEn: 'Scholarship support',
    descHi: 'एक मेधावी छात्र की मदद',
    descEn: 'Support one meritorious student',
  },
  {
    amount: 10000,
    icon: 'fa-droplet',
    titleHi: 'रक्तदान शिविर',
    titleEn: 'Blood donation camp',
    descHi: 'एक शिविर का आयोजन',
    descEn: 'Organize one blood camp',
  },
  {
    amount: 25000,
    icon: 'fa-hand-holding-heart',
    titleHi: 'सामुदायिक कार्यक्रम',
    titleEn: 'Community program',
    descHi: 'एक बड़े शिविर का खर्च',
    descEn: 'Sponsor a major camp',
  },
];

export const paymentMethods = [
  { id: 'upi',   icon: 'fa-mobile-screen-button', labelHi: 'UPI / QR',        labelEn: 'UPI / QR' },
  { id: 'card',  icon: 'fa-credit-card',          labelHi: 'कार्ड',           labelEn: 'Debit / Credit Card' },
  { id: 'net',   icon: 'fa-building-columns',     labelHi: 'नेट बैंकिंग',     labelEn: 'Net Banking' },
  { id: 'bank',  icon: 'fa-money-check-dollar',   labelHi: 'बैंक ट्रांसफर',   labelEn: 'Bank Transfer' },
];

export const trustBadges = [
  { icon: 'fa-shield-halved', textHi: '100% सुरक्षित भुगतान', textEn: '100% Secure Payment' },
  { icon: 'fa-lock',          textHi: 'SSL एन्क्रिप्टेड',      textEn: 'SSL Encrypted' },
  { icon: 'fa-receipt',       textHi: '80G रसीद',              textEn: '80G Receipt' },
  { icon: 'fa-eye',           textHi: 'पारदर्शी उपयोग',        textEn: 'Transparent Use' },
];

export const bankDetails = {
  accountName: 'Chhattisgarh Kalar Mahasangh',
  accountNo: '1234 5678 9012 3456',
  ifsc: 'SBIN0001234',
  bank: 'State Bank of India',
  branch: 'Raipur Main Branch',
  upi: 'cgkalarmahasangh@upi',
};

export const donationStats = [
  { value: '25,000+', labelHi: 'सदस्य',      labelEn: 'Members' },
  { value: '₹2.5 Cr+', labelHi: 'कुल दान',    labelEn: 'Total Donated' },
  { value: '10,000+', labelHi: 'परिवारों को सहयोग', labelEn: 'Families Helped' },
  { value: '28',      labelHi: 'जिले',       labelEn: 'Districts' },
];