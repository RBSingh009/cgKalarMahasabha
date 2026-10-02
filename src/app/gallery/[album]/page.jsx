// src/app/gallery/[album]/page.jsx
import { galleryAlbums } from '@/data/gallery';
import AlbumDetail from './AlbumDetail';

export async function generateStaticParams() {
  return galleryAlbums.map((album) => ({ album: album.slug }));
}

export default async function Page({ params }) {
  const { album: albumSlug } = await params;
  const album = galleryAlbums.find((a) => a.slug === albumSlug);
  return <AlbumDetail album={album} />;
}