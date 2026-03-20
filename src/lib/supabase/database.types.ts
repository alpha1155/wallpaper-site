import type { Character, Wallpaper } from "@/types/genshin";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      characters: {
        Row: Character;
        Insert: Omit<Character, "created_at">;
        Update: Partial<Omit<Character, "id">>;
      };
      wallpapers: {
        Row: Wallpaper;
        Insert: Omit<Wallpaper, "id" | "created_at" | "download_count" | "view_count">;
        Update: Partial<Omit<Wallpaper, "id">>;
      };
      download_logs: {
        Row: {
          id: string;
          wallpaper_id: string;
          resolution: string;
          user_agent: string | null;
          ip_hash: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["download_logs"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["download_logs"]["Row"]>;
      };
    };
    Views: {
      popular_wallpapers: {
        Row: Wallpaper;
      };
      latest_wallpapers: {
        Row: Wallpaper;
      };
      featured_wallpapers: {
        Row: Wallpaper;
      };
    };
    Functions: {
      increment_download_count: {
        Args: { wallpaper_uuid: string };
        Returns: void;
      };
      increment_view_count: {
        Args: { wallpaper_uuid: string };
        Returns: void;
      };
    };
  };
}
