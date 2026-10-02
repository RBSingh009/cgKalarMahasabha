// src/data/contact.js

export const contactInfo = [
  {
    id: 'address',
    icon: 'fa-location-dot',
    titleHi: 'कार्यालय का पता',
    titleEn: 'Office Address',
    linesHi: [
      'छत्तीसगढ़ कलार महासंघ',
      'कलार भवन, स्टेशन रोड',
      'रायपुर, छत्तीसगढ़ - 492001',
    ],
    linesEn: [
      'Chhattisgarh Kalar Mahasangh',
      'Kalar Bhavan, Station Road',
      'Raipur, Chhattisgarh - 492001',
    ],
    action: {
      hi: 'नक्शे पर देखें',
      en: 'View on Map',
      href: 'https://maps.google.com/?q=Raipur+Chhattisgarh',
    },
  },
  {
    id: 'phone',
    icon: 'fa-phone-volume',
    titleHi: 'फोन',
    titleEn: 'Phone',
    linesHi: ['+91 98260 50235', '+91 91234 56789'],
    linesEn: ['+91 98260 50235', '+91 91234 56789'],
    action: { hi: 'कॉल करें', en: 'Call Now', href: 'tel:+919826050235' },
  },
  {
    id: 'email',
    icon: 'fa-envelope',
    titleHi: 'ईमेल',
    titleEn: 'Email',
    linesHi: ['cgkalarmahasangh@gmail.com', 'support@cgkalarmahasangh.org'],
    linesEn: ['cgkalarmahasangh@gmail.com', 'support@cgkalarmahasangh.org'],
    action: {
      hi: 'ईमेल भेजें',
      en: 'Send Email',
      href: 'mailto:cgkalarmahasangh@gmail.com',
    },
  },
  {
    id: 'hours',
    icon: 'fa-clock',
    titleHi: 'कार्यालय समय',
    titleEn: 'Office Hours',
    linesHi: [
      'सोमवार - शुक्रवार: 10:00 AM - 6:00 PM',
      'शनिवार: 10:00 AM - 2:00 PM',
      'रविवार: बंद',
    ],
    linesEn: [
      'Monday - Friday: 10:00 AM - 6:00 PM',
      'Saturday: 10:00 AM - 2:00 PM',
      'Sunday: Closed',
    ],
  },
];

export const contactSocials = [
  { id: 'facebook',  icon: 'fa-facebook-f',  href: 'https://facebook.com',  label: 'Facebook' },
  { id: 'twitter',   icon: 'fa-x-twitter',   href: 'https://twitter.com',   label: 'Twitter' },
  { id: 'instagram', icon: 'fa-instagram',   href: 'https://instagram.com', label: 'Instagram' },
  { id: 'youtube',   icon: 'fa-youtube',     href: 'https://youtube.com',   label: 'YouTube' },
  { id: 'whatsapp',  icon: 'fa-whatsapp',    href: 'https://wa.me/919826050235', label: 'WhatsApp' },
];

export const contactSubjects = [
  { value: 'general',    labelHi: 'सामान्य पूछताछ',      labelEn: 'General Inquiry' },
  { value: 'membership', labelHi: 'सदस्यता',              labelEn: 'Membership' },
  { value: 'donation',   labelHi: 'दान',                  labelEn: 'Donation' },
  { value: 'volunteer',  labelHi: 'स्वयंसेवक',            labelEn: 'Volunteer' },
  { value: 'complaint',  labelHi: 'शिकायत',               labelEn: 'Complaint' },
  { value: 'other',      labelHi: 'अन्य',                  labelEn: 'Other' },
];

export const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119065.23410663989!2d81.56843605!3d21.2523565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28db3e5f1e2b1b%3A0x4e3c8d5c5c5c5c5c!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';