import { supabase } from './supabase/client';
import type { Wallpaper } from '@/types/genshin';

// 获取所有壁纸
export async function getAllWallpapers(): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wallpapers:', error);
    return [];
  }

  return data as Wallpaper[];
}

// 获取壁纸详情
export async function getWallpaperBySlug(slug: string): Promise<Wallpaper | null> {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching wallpaper:', error);
    return null;
  }

  return data as Wallpaper;
}

// 按元素筛选
export async function getWallpapersByElement(element: string): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*')
    .eq('element', element)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wallpapers:', error);
    return [];
  }

  return data as Wallpaper[];
}

// 按地区筛选
export async function getWallpapersByRegion(region: string): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*')
    .eq('region', region)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wallpapers:', error);
    return [];
  }

  return data as Wallpaper[];
}

// 搜索壁纸
export async function searchWallpapers(query: string): Promise<Wallpaper[]> {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*')
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching wallpapers:', error);
    return [];
  }

  return data as Wallpaper[];
}
