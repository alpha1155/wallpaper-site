import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMockWallpaperBySlug, getMockRelatedWallpapers, mockWallpapers } from "@/lib/mock-data";
import { WallpaperDetailPage } from "./WallpaperDetailPage";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wallpaper = getMockWallpaperBySlug(params.slug);

  if (!wallpaper) {
    return {
      title: "Wallpaper Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wallpaperhd.com";

  return {
    title: `${wallpaper.title} - Download ${wallpaper.device === "mobile" ? "Mobile" : "Desktop"} Wallpaper`,
    description: `Download ${wallpaper.title} wallpaper in high resolution. ${wallpaper.type === "dynamic" ? "Dynamic/live wallpaper" : "Static wallpaper"} available in multiple resolutions for ${wallpaper.device === "both" ? "desktop and mobile" : wallpaper.device} devices.`,
    keywords: [
      wallpaper.title,
      `${wallpaper.device} wallpaper`,
      ...wallpaper.tags,
      "HD wallpaper",
      "download wallpaper",
    ],
    openGraph: {
      title: wallpaper.title,
      description: `Download ${wallpaper.title} wallpaper in high resolution`,
      images: [
        {
          url: wallpaper.preview_url,
          width: 1200,
          height: 630,
          alt: wallpaper.title,
        },
      ],
      type: "article",
      url: `${siteUrl}/wallpaper/${wallpaper.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: wallpaper.title,
      description: `Download ${wallpaper.title} wallpaper in high resolution`,
      images: [wallpaper.preview_url],
    },
  };
}

export async function generateStaticParams() {
  return mockWallpapers.map((wallpaper) => ({
    slug: wallpaper.slug,
  }));
}

export default function Page({ params }: Props) {
  const wallpaper = getMockWallpaperBySlug(params.slug);

  if (!wallpaper) {
    notFound();
  }

  const relatedWallpapers = getMockRelatedWallpapers(wallpaper);

  return <WallpaperDetailPage wallpaper={wallpaper} relatedWallpapers={relatedWallpapers} />;
}
