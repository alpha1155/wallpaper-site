export type WallpaperType = "static" | "dynamic";
export type DeviceType = "mobile" | "desktop" | "both";

export interface DownloadUrls {
  [resolution: string]: string;
}

export interface Wallpaper {
  id: string;
  title: string;
  slug: string;
  type: WallpaperType;
  device: DeviceType;
  thumbnail_url: string;
  preview_url: string;
  download_urls: DownloadUrls;
  tags: string[];
  created_at: string;
  featured?: boolean;
  views?: number;
  downloads?: number;
}

export interface WallpaperFilters {
  device?: DeviceType | "all";
  type?: WallpaperType | "all";
  search?: string;
  tags?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
