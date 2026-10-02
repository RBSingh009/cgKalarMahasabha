// src/data/blog.js

const cover = (seed, w = 800, h = 500) =>
  `https://picsum.photos/seed/ckm-blog-${seed}/${w}/${h}`;

export const blog = [
  {
    id: 1,
    slug: 'clean-water-village-kenya',
    titleHi: 'स्वच्छ जल ने केन्या के गाँव को बदल दिया',
    titleEn: 'How Clean Water Changed a Village in Kenya',
    excerptHi: 'स्वच्छ जल की पहुँच ने एक पूरे गाँव का जीवन बदल दिया।',
    excerptEn: 'Access to clean water transformed the life of an entire village.',
    contentHi:
      'एक समय था जब केन्या के इस गाँव की महिलाएं और बच्चे कई किलोमीटर दूर से पानी लाने जाते थे। हमारे दानदाताओं की मदद से अब गाँव में सुरक्षित कुएँ हैं और बच्चे स्कूल जा सकते हैं।',
    contentEn:
      'There was a time when women and children in this Kenyan village walked miles to fetch water. Thanks to our donors, the village now has safe wells and children can attend school.',
    cover: cover('clean-water'),
    category: 'पर्यावरण',
    categoryEn: 'Environment',
    author: 'Mahasangh Team',
    publishedAt: '2025-10-08',
  },
  {
    id: 2,
    slug: 'community-impact-stories',
    titleHi: 'समुदाय पर प्रभाव: क्षेत्र से प्रेरक कहानियाँ',
    titleEn: 'Community Impact: Inspiring Stories from the Field',
    excerptHi: 'जमीनी स्तर पर काम करने वालों की प्रेरक कहानियाँ।',
    excerptEn: 'Inspiring stories from those working at the grassroots level.',
    contentHi:
      'हमारी टीम ने विभिन्न समुदायों में जाकर लोगों की कहानियाँ सुनीं जो हमारे कार्यक्रमों से प्रभावित हुए हैं।',
    contentEn:
      'Our team visited various communities and heard stories from people whose lives were touched by our programs.',
    cover: cover('community-impact'),
    category: 'समाज',
    categoryEn: 'Community',
    author: 'Mahasangh Team',
    publishedAt: '2025-10-06',
  },
  {
    id: 3,
    slug: 'stories-of-hope',
    titleHi: 'आशा की कहानियाँ: आपका सहयोग जीवन बदलता है',
    titleEn: 'Stories of Hope: How Your Support Changes Lives',
    excerptHi: 'आपके सहयोग से किस तरह जीवन बदल रहे हैं।',
    excerptEn: 'How lives are being transformed through your support.',
    contentHi:
      'हर दान, हर स्वयंसेवक, हर सहयोगी - ये सब मिलकर एक बेहतर कल का निर्माण कर रहे हैं। यहाँ कुछ ऐसी कहानियाँ हैं जो आशा जगाती हैं।',
    contentEn:
      'Every donation, every volunteer, every supporter - together they are building a better tomorrow. Here are some stories that inspire hope.',
    cover: cover('stories-hope'),
    category: 'सामाजिक',
    categoryEn: 'Social',
    author: 'Mahasangh Team',
    publishedAt: '2025-10-04',
  },
  {
    id: 4,
    slug: 'education-for-all',
    titleHi: 'सभी के लिए शिक्षा',
    titleEn: 'Education for All',
    excerptHi: 'हर बच्चे को गुणवत्तापूर्ण शिक्षा का अधिकार।',
    excerptEn: 'Every child deserves access to quality education.',
    contentHi:
      'हमारा लक्ष्य है कि समाज के हर बच्चे को शिक्षा मिले - चाहे वह शहर में हो या गाँव में।',
    contentEn:
      'Our goal is to ensure education reaches every child - whether in a city or a village.',
    cover: cover('education-all'),
    category: 'शिक्षा',
    categoryEn: 'Education',
    author: 'Mahasangh Team',
    publishedAt: '2025-09-28',
  },
];

export default blog;