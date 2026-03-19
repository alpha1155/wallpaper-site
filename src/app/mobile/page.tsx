import type { Metadata } from "next";
import { MobileWallpapersPage } from "./MobileWallpapersPage";

export const metadata: Metadata = {
  title: "Mobile Wallpapers - iPhone & Android",
  description:
    "Download beautiful mobile wallpapers for iPhone and Android devices. High-quality backgrounds in perfect portrait resolution.",
  keywords: [
    "mobile wallpapers",
    "iPhone wallpapers",
    "Android wallpapers",
    "phone backgrounds",
    "smartphone wallpapers",
  ],
  openGraph: {
    title: "Mobile Wallpapers - iPhone & Android",
    description:
      "Download beautiful mobile wallpapers for iPhone and Android devices.",
  },
};

export default function Page() {
  return <MobileWallpapersPage />;
}
