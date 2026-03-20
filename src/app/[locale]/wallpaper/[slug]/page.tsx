import { notFound } from 'next/navigation';
import { mockWallpapers, getWallpaperWithCharacters } from '@/lib/mock-data';
import { WallpaperDetailClient } from './WallpaperDetailClient';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return mockWallpapers.map((wallpaper) => ({
    slug: wallpaper.slug,
  }));
}

export default async function WallpaperPage({ params }: Props) {
  const { slug } = await params;
  
  const wallpaper = mockWallpapers.find((w) => w.slug === slug);

  if (!wallpaper) {
    notFound();
  }

  const wallpaperWithCharacters = getWallpaperWithCharacters(wallpaper);

  return <WallpaperDetailClient wallpaper={wallpaperWithCharacters} />;
}
