import { WallpaperDetailPage } from './WallpaperDetailPage';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

// 动态渲染，不在构建时生成
export const dynamic = 'force-dynamic';

export default async function WallpaperPage({ params }: Props) {
  const { slug } = await params;
  return <WallpaperDetailPage slug={slug} />;
}
