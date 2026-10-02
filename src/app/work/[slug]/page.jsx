// src/app/work/[slug]/page.jsx
import { works } from '@/data/works';
import WorkDetail from './WorkDetail';

export async function generateStaticParams() {
  return works.map((item) => ({ slug: item.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  return <WorkDetail work={work} />;
}