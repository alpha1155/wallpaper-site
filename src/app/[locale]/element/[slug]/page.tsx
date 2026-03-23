import { notFound } from 'next/navigation';
import { ELEMENTS, Element } from '@/types/genshin';
import { ElementDetailClient } from './ElementDetailClient';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

const elementKeys = Object.keys(ELEMENTS) as Element[];

export function generateStaticParams() {
  return elementKeys.map((element) => ({
    slug: element,
  }));
}

export default async function ElementPage({ params }: Props) {
  const { slug } = await params;

  if (!elementKeys.includes(slug as Element)) {
    notFound();
  }

  return <ElementDetailClient element={slug as Element} />;
}
