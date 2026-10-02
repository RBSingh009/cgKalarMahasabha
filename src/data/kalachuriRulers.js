// src/data/kalachuriRulers.js

/**
 * कलचुरी वंश के शासक — रतनपुर के राजा
 * साभार — ब्रिटिश कालीन हिन्दी गजेटियर विलासपुर व्यवहार,
 *          लेखक — प्यारेलाल गुप्त (सन् 1923)
 *
 * प्रस्तुतकर्ता — कौन्तेय जायसवाल, अम्बिकापुर | मो. 99776 21000
 */

/* ============================================================
   राजवंश वंशावली (दो कालखंडों में)
   ============================================================ */

export const ratanpurLineage = [
  { id: 1, nameHi: 'कलिंगराज',      nameEn: 'Kalingraj',      noteHi: '(राजधानी — तुम्मान)',         noteEn: '(Capital — Tumman)' },
  { id: 2, nameHi: 'कमलराज',       nameEn: 'Kamalraj',       noteHi: '(राजधानी — तुम्मान)',         noteEn: '(Capital — Tumman)' },
  { id: 3, nameHi: 'रत्नदेव प्रथम',  nameEn: 'Ratnadev I',     noteHi: 'नोहल्ला देवी (राजधानी — रतनपुर)', noteEn: 'Nohalla Devi (Capital — Ratanpur)' },
  { id: 4, nameHi: 'पृथ्वीदेव प्रथम', nameEn: 'Prithvidev I' },
  { id: 5, nameHi: 'जाजल्यदेव प्रथम', nameEn: 'Jajalyadev I',  noteHi: 'लाछल्ला देवी',                noteEn: 'Lachhalla Devi' },
  { id: 6, nameHi: 'रत्नदेव द्वितीय', nameEn: 'Ratnadev II' },
  { id: 7, nameHi: 'पृथ्वीदेव द्वितीय', nameEn: 'Prithvidev II' },
];

/* द्वितीय शाखा — दो पुत्र */
export const branchLineage = {
  branchA: [
    { id: 8,  nameHi: 'जादेव',       nameEn: 'Jadev' },
    { id: 9,  nameHi: 'रत्नदेव तृतीय', nameEn: 'Ratnadev III' },
    { id: 10, nameHi: 'प्रतापभल्ला',  nameEn: 'Pratapbhalla' },
    { id: 11, nameHi: 'लक्ष्मी देवी',  nameEn: 'Lakshmi Devi' },
  ],
  branchB: [
    { id: 12, nameHi: 'जाजल्यदेव द्वितीय', nameEn: 'Jajalyadev II' },
  ],
};

/* ============================================================
   रतनपुर के राजा — 1200 ई. से 1732 ई. तक
   ============================================================ */

export const ratanpurKings = [
  { id: 1,  nameHi: 'भानुसिंह',       nameEn: 'Bhanusingh',       year: 1200 },
  { id: 2,  nameHi: 'नरसिंह देव',     nameEn: 'Narsingh Dev',     year: 1221 },
  { id: 3,  nameHi: 'भूसिंह देव (भाव सिंह)', nameEn: 'Bhoosingh Dev (Bhav Singh)', year: 1251 },
  { id: 4,  nameHi: 'प्रतापसिंह देव',  nameEn: 'Pratapsingh Dev',  year: 1276 },
  { id: 5,  nameHi: 'जयसिंह देव',     nameEn: 'Jaysingh Dev',     year: 1319 },
  { id: 6,  nameHi: 'धर्मसिंह देव',    nameEn: 'Dharmsingh Dev',   year: 1347 },
  { id: 7,  nameHi: 'जगन्नाथ सिंह देव', nameEn: 'Jagannath Singh Dev', year: 1369 },
  { id: 8,  nameHi: 'बीरसिंह देव',     nameEn: 'Beersingh Dev',    year: 1407 },
  { id: 9,  nameHi: 'कलमलदेव',        nameEn: 'Kalamaldev',       year: 1426 },
  { id: 10, nameHi: 'शंकरसाय',        nameEn: 'Shankarsay',       year: 1436 },
  { id: 11, nameHi: 'मोहनसाय',        nameEn: 'Mohansay',         year: 1454 },
  { id: 12, nameHi: 'दादूसाय',        nameEn: 'Dadoosay',         year: 1472 },
  { id: 13, nameHi: 'पुरुषोत्तम साय',  nameEn: 'Purushottam Say',  year: 1497 },
  { id: 14, nameHi: 'बहारसाय',        nameEn: 'Baharsay',         year: 1519 },
  { id: 15, nameHi: 'कल्याणसाय',      nameEn: 'Kalyan Say',       year: 1546 },
  { id: 16, nameHi: 'लक्ष्मणसाय',     nameEn: 'Lakshman Say',     year: 1583 },
  { id: 17, nameHi: 'शंकरसाय',        nameEn: 'Shankar Say',      year: 1591 },
  { id: 18, nameHi: 'कुमुद या मुकुन्दसाय', nameEn: 'Kumud (Mukund Say)', year: 1606 },
  { id: 19, nameHi: 'त्रिभुवन साय',    nameEn: 'Tribhuvan Say',    year: 1617 },
  { id: 20, nameHi: 'जगमोहन साय',    nameEn: 'Jagmohan Say',     year: 1632 },
  { id: 21, nameHi: 'अदली साय',        nameEn: 'Adli Say',         year: 1645 },
  { id: 22, nameHi: 'रणजीत साय',      nameEn: 'Ranjeet Say',      year: 1659 },
  { id: 23, nameHi: 'तख्तसिंह',        nameEn: 'Takhtsingh',       year: 1685 },
  { id: 24, nameHi: 'राजसिंह देव',     nameEn: 'Rajsingh Dev',     year: 1689 },
  { id: 25, nameHi: 'सरदारसिंह',       nameEn: 'Sardarsingh',      year: 1720 },
  { id: 26, nameHi: 'रघुनाथसिंह',     nameEn: 'Raghunathsingh',   year: 1732 },
];

/* ============================================================
   स्रोत जानकारी
   ============================================================ */
export const sourceInfo = {
  attributionHi:
    'साभार — ब्रिटिश कालीन हिन्दी गजेटियर विलासपुर व्यवहार, लेखक — प्यारेलाल गुप्त (सन् 1923)',
  attributionEn:
    'Source — British-era Hindi Gazetteer Bilaspur, by Shri Pyarelal Gupta (1923)',
  presenterHi: 'प्रस्तुतकर्ता — कौन्तेय जायसवाल, अम्बिकापुर | मो. 99776 21000',
  presenterEn: 'Presented by — Kauntey Jaiswal, Ambikapur | Mobile: 99776 21000',
};