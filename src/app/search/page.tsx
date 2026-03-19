import type { Metadata } from "next";
import { SearchPage } from "./SearchPage";

export const metadata: Metadata = {
  title: "Search Wallpapers",
  description:
    "Search our collection of high-quality wallpapers for desktop and mobile devices. Find the perfect background by keyword or tag.",
  openGraph: {
    title: "Search Wallpapers",
    description:
      "Search our collection of high-quality wallpapers for desktop and mobile devices.",
  },
};

export default function Page() {
  return <SearchPage />;
}
