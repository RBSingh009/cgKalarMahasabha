// src/app/blog/[slug]/page.jsx
import { blog } from '@/data/blog';
import BlogDetail from './BlogDetail';

export async function generateStaticParams() {
  return blog.map((item) => ({ slug: item.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = blog.find((b) => b.slug === slug);
  return <BlogDetail post={post} />;
}