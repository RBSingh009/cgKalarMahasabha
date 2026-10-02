// src/app/publication/[slug]/page.jsx
import { publications } from '@/data/publications';
import PublicationDetail from './PublicationDetail';

export async function generateStaticParams() {
  return publications.map((item) => ({ slug: item.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const item = publications.find((x) => x.slug === slug);
  return <PublicationDetail item={item} />;
}