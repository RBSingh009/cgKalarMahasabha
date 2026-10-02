// src/lib/profileCompletion.js
export function computeProfileCompletion(user) {
  if (!user) return 0;

  const fields = [
    user.name,
    user.phone,
    user.email,
    user.avatar,
    user.district,
    user.address,
    user.dob,
    user.gender,
    user.occupation,
    user.bloodGroup,
  ];

  const filled = fields.filter((v) => {
    if (v === null || v === undefined) return false;
    const s = String(v).trim();
    if (!s) return false;
    if (s.includes('avatar-placeholder')) return false;
    return true;
  }).length;

  return Math.round((filled / fields.length) * 100);
}

export function getMissingFields(user) {
  if (!user) return [];

  const map = [
    { key: 'name',       label: 'पूरा नाम' },
    { key: 'phone',      label: 'मोबाइल नंबर' },
    { key: 'email',      label: 'ईमेल' },
    { key: 'avatar',     label: 'प्रोफ़ाइल फ़ोटो', check: (v) => v && !String(v).includes('avatar-placeholder') },
    { key: 'district',   label: 'जिला' },
    { key: 'address',    label: 'पूरा पता' },
    { key: 'dob',        label: 'जन्म तिथि' },
    { key: 'gender',     label: 'लिंग' },
    { key: 'occupation', label: 'व्यवसाय' },
    { key: 'bloodGroup', label: 'रक्त समूह' },
  ];

  return map
    .filter(({ key, check }) => {
      const v = user[key];
      if (check) return !check(v);
      return !v || !String(v).trim();
    })
    .map(({ label }) => label);
}