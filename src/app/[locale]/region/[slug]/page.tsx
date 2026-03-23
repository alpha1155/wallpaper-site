import { notFound } from 'next/navigation';
import { REGIONS, Region } from '@/types/genshin';
import { RegionDetailClient } from './RegionDetailClient';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

const regionKeys = Object.keys(REGIONS) as Region[];

export function generateStaticParams() {
  return regionKeys.map((region) => ({
    slug: region,
  }));
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;

  if (!regionKeys.includes(slug as Region)) {
    notFound();
  }

  return <RegionDetailClient region={slug as Region} />;
}
