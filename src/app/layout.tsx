import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wallpaperhd.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "WallpaperHD";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - High Quality Wallpapers for Desktop & Mobile`,
    template: `%s | ${siteName}`,
  },
  description:
    "Download stunning high-quality wallpapers for desktop and mobile devices. Browse thousands of static and dynamic wallpapers in 4K, QHD, and Full HD resolutions.",
  keywords: [
    "wallpapers",
    "4K wallpapers",
    "desktop wallpapers",
    "mobile wallpapers",
    "HD wallpapers",
    "dynamic wallpapers",
    "live wallpapers",
    "background images",
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
