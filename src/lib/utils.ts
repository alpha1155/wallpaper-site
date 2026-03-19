import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function getResolutionLabel(resolution: string): string {
  const resolutions: Record<string, string> = {
    "1920x1080": "Full HD (1080p)",
    "2560x1440": "Quad HD (1440p)",
    "3840x2160": "4K UHD",
    "1080x1920": "Mobile HD",
    "1440x2560": "Mobile QHD",
  };
  return resolutions[resolution] || resolution;
}

export function isVideoFormat(url: string): boolean {
  return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov");
}
