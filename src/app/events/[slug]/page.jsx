// src/app/events/[slug]/page.jsx
import { events } from '@/data/events';
import EventDetail from './EventDetail';

export async function generateStaticParams() {
  return events.map((item) => ({ slug: item.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  return <EventDetail event={event} />;
}