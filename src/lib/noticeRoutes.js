// src/lib/noticeRoutes.js

export function getNoticeHref(notice) {
  if (!notice) return '/notice';
  const cat = notice.category || '';
  const catEn = (notice.categoryEn || '').toLowerCase();

  if (cat === 'योजना' || catEn === 'scheme') return `/scheme/${notice.id}`;
  if (cat === 'कार्यक्रम' || catEn === 'event') return `/event/${notice.id}`;
  return `/notice/${notice.id}`;
}

export function getListHref(category) {
  if (category === 'योजना' || category === 'scheme') return '/scheme';
  if (category === 'कार्यक्रम' || category === 'event') return '/event';
  return '/notice';
}