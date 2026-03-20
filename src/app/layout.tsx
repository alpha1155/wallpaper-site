import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://genshinwalls.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "GenshinWalls";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Genshin Impact HD Wallpapers`,
    template: `%s | ${siteName}`,
  },
  description:
    "Download stunning Genshin Impact wallpapers for desktop and mobile. All characters, scenes in 4K, 2K, Full HD resolutions. Free download.",
  keywords: [
    "genshin impact",
    "genshin wallpaper",
    "原神壁纸",
    "4K wallpapers",
    "desktop wallpapers",
    "mobile wallpapers",
    "raiden shogun",
    "hu tao",
    "nahida",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
