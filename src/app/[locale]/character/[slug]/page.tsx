import { CharacterDetailPage } from './CharacterDetailPage';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  return <CharacterDetailPage slug={slug} />;
}
