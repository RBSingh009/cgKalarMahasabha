// src/app/causes/[slug]/page.jsx
import { causes } from '@/data/causes';
import CauseDetail from './CauseDetail';

export async function generateStaticParams() {
  return causes.map((item) => ({ slug: item.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const cause = causes.find((c) => c.slug === slug);
  return <CauseDetail cause={cause} />;
}