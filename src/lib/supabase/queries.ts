import { supabase } from "./client";
import type { Wallpaper, Character, Element, Region } from "@/types/genshin";

export interface WallpaperFilters {
  element?: Element;
  region?: Region;
  characterId?: string;
  source?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
}

export async function getWallpapers(
  filters: WallpaperFilters = {},
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedResponse<Wallpaper>> {
  let query = supabase
    .from("wallpapers")
    .select("*", { count: "exact" });

  if (filters.element) {
    query = query.eq("element", filters.element);
  }

  if (filters.region) {
    query = query.eq("region", filters.region);
  }

  if (filters.characterId) {
    query = query.contains("character_ids", [filters.characterId]);
  }

  if (filters.source) {
    query = query.eq("source", filters.source);
  }

  if (filters.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching wallpapers:", error);
    return { data: [], count: 0, page, pageSize };
  }

  return {
    data: (data as Wallpaper[]) || [],
    count: count || 0,
    page,
    pageSize,
  };
}

export async function getWallpaperBySlug(slug: string): Promise<Wallpaper | null> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching wallpaper:", error);
    return null;
  }

  return data as Wallpaper;
}

export async function getFeaturedWallpapers(limit: number = 10): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured wallpapers:", error);
    return [];
  }

  return (data as Wallpaper[]) || [];
}

export async function getPopularWallpapers(limit: number = 10): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .order("download_count", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching popular wallpapers:", error);
    return [];
  }

  return (data as Wallpaper[]) || [];
}

export async function getCharacters(): Promise<Character[]> {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .order("rarity", { ascending: false });

  if (error) {
    console.error("Error fetching characters:", error);
    return [];
  }

  return (data as Character[]) || [];
}

export async function getCharacterById(id: string): Promise<Character | null> {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching character:", error);
    return null;
  }

  return data as Character;
}
