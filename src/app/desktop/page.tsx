import type { Metadata } from "next";
import { DesktopWallpapersPage } from "./DesktopWallpapersPage";

export const metadata: Metadata = {
  title: "Desktop Wallpapers - 4K, QHD & Full HD",
  description:
    "Download stunning desktop wallpapers in 4K, QHD, and Full HD resolutions. Browse our collection of beautiful backgrounds for Windows, Mac, and Linux.",
  keywords: [
    "desktop wallpapers",
    "4K wallpapers",
    "HD wallpapers",
    "QHD wallpapers",
    "computer backgrounds",
    "PC wallpapers",
  ],
  openGraph: {
    title: "Desktop Wallpapers - 4K, QHD & Full HD",
    description:
      "Download stunning desktop wallpapers in 4K, QHD, and Full HD resolutions.",
  },
};

export default function Page() {
  return <DesktopWallpapersPage />;
}
