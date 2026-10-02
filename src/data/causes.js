// src/data/causes.js

const img = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/ckm-cause-${seed}/${w}/${h}`;

export const causes = [
  {
    id: 1,
    slug: 'helping-homeless',
    img: img('homeless'),
    titleHi: 'बेघरों की सहायता',
    titleEn: 'Helping the Homeless During Hopeless',
    progress: 85,
    raised: '$50,050',
    goal: '$80,000',
    href: '/demo/single-causes',
  },
  {
    id: 2,
    slug: 'fighting-hunger',
    img: img('hunger'),
    titleHi: 'भोजन वितरण अभियान',
    titleEn: 'Fighting Hunger with Food Distribution Drives',
    progress: 95,
    raised: '$50,050',
    goal: '$180,000',
    href: '/demo/single-causes',
  },
  {
    id: 3,
    slug: 'homeless-support',
    img: img('support'),
    titleHi: 'बेघरों की सहायता अभियान',
    titleEn: 'Helping the Homeless During Hopeless',
    progress: 90,
    raised: '$50,050',
    goal: '$80,000',
    href: '/demo/single-causes',
  },
  {
    id: 4,
    slug: 'hunger-project-children',
    img: img('children'),
    titleHi: 'भूख परियोजना: विशेष देखभाल',
    titleEn: 'Hunger Project: Special care abandon child.',
    progress: 95,
    raised: '$50,050',
    goal: '$80,000',
    href: '/demo/single-causes',
  },
  {
    id: 5,
    slug: 'medical-aid-underserved',
    img: img('medical'),
    titleHi: 'चिकित्सा सहायता',
    titleEn: 'Providing Medical Aid to Underserved Areas',
    progress: 95,
    raised: '$50,050',
    goal: '$80,000',
    href: '/demo/single-causes',
  },
  {
    id: 6,
    slug: 'food-water-supply',
    img: img('food-water'),
    titleHi: 'भोजन एवं जल आपूर्ति',
    titleEn: 'Food & Water Supply for Needy',
    progress: 95,
    raised: '$50,050',
    goal: '$80,000',
    href: '/demo/single-causes',
  },
];

export const causesPreview = causes.slice(0, 3);
export default causes;