// src/lib/mockUser.js
/* 🔌 In-memory mock user. Replace with real DB lookups. */

let mockUser = {
  id: 'u_001',
  name: 'राम कुमार कलार',
  memberId: 'CKM-2024-0871',
  phone: '+91 98260 50235',
  email: 'ram@example.com',
  joinedAt: '15 जनवरी 2024',
  avatar: '/images/avatar-placeholder.png',
  role: 'सक्रिय सदस्य',
  district: 'रायपुर',
  state: 'Chhattisgarh',
  pincode: '',
  address: '',
  dob: '',
  gender: '',
  occupation: '',
  bloodGroup: '',
};

export function getMockUser() {
  return { ...mockUser };
}

export function setMockUser(patch) {
  mockUser = { ...mockUser, ...patch };
  return { ...mockUser };
}