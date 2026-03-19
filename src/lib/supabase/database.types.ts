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
      wallpapers: {
        Row: {
          id: string;
          title: string;
          slug: string;
          type: "static" | "dynamic";
          device: "mobile" | "desktop" | "both";
          thumbnail_url: string;
          preview_url: string;
          download_urls: Json;
          tags: string[];
          featured: boolean;
          views: number;
          downloads: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          type: "static" | "dynamic";
          device: "mobile" | "desktop" | "both";
          thumbnail_url: string;
          preview_url: string;
          download_urls: Json;
          tags?: string[];
          featured?: boolean;
          views?: number;
          downloads?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          type?: "static" | "dynamic";
          device?: "mobile" | "desktop" | "both";
          thumbnail_url?: string;
          preview_url?: string;
          download_urls?: Json;
          tags?: string[];
          featured?: boolean;
          views?: number;
          downloads?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      wallpaper_type: "static" | "dynamic";
      device_type: "mobile" | "desktop" | "both";
    };
  };
}
