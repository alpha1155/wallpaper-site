import { supabase } from "./client";
import type { Wallpaper, WallpaperFilters, PaginatedResponse } from "@/types/wallpaper";

export async function getWallpapers(
  filters: WallpaperFilters = {},
  page = 1,
  limit = 20
): Promise<PaginatedResponse<Wallpaper>> {
  let query = supabase
    .from("wallpapers")
    .select("*", { count: "exact" });

  if (filters.device && filters.device !== "all") {
    query = query.or(`device.eq.${filters.device},device.eq.both`);
  }

  if (filters.type && filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  if (filters.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }

  if (filters.tags && filters.tags.length > 0) {
    query = query.contains("tags", filters.tags);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: (data as unknown as Wallpaper[]) || [],
    total: count || 0,
    page,
    limit,
    hasMore: count ? from + limit < count : false,
  };
}

export async function getFeaturedWallpapers(limit = 10): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data as unknown as Wallpaper[]) || [];
}

export async function getWallpaperBySlug(slug: string): Promise<Wallpaper | null> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return data as unknown as Wallpaper;
}

export async function getWallpapersByDevice(
  device: "mobile" | "desktop",
  page = 1,
  limit = 20
): Promise<PaginatedResponse<Wallpaper>> {
  return getWallpapers({ device }, page, limit);
}

export async function getRelatedWallpapers(
  wallpaper: Wallpaper,
  limit = 6
): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .neq("id", wallpaper.id)
    .or(`device.eq.${wallpaper.device},device.eq.both`)
    .eq("type", wallpaper.type)
    .limit(limit);

  if (error) throw error;

  return (data as unknown as Wallpaper[]) || [];
}

export async function incrementViews(id: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.rpc as any)("increment_views", { wallpaper_id: id });
}

export async function incrementDownloads(id: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.rpc as any)("increment_downloads", { wallpaper_id: id });
}

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("tags");

  if (error) throw error;

  const allTags = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data as any[])?.forEach((row) => {
    (row.tags as string[])?.forEach((tag: string) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("slug");

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[])?.map((row) => row.slug) || [];
}
