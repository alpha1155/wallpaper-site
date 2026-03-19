-- Wallpaper Site Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE wallpaper_type AS ENUM ('static', 'dynamic');
CREATE TYPE device_type AS ENUM ('mobile', 'desktop', 'both');

-- Create wallpapers table
CREATE TABLE wallpapers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type wallpaper_type NOT NULL DEFAULT 'static',
    device device_type NOT NULL DEFAULT 'both',
    thumbnail_url TEXT NOT NULL,
    preview_url TEXT NOT NULL,
    download_urls JSONB NOT NULL DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_wallpapers_slug ON wallpapers(slug);
CREATE INDEX idx_wallpapers_type ON wallpapers(type);
CREATE INDEX idx_wallpapers_device ON wallpapers(device);
CREATE INDEX idx_wallpapers_featured ON wallpapers(featured);
CREATE INDEX idx_wallpapers_created_at ON wallpapers(created_at DESC);
CREATE INDEX idx_wallpapers_tags ON wallpapers USING GIN(tags);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_wallpapers_updated_at
    BEFORE UPDATE ON wallpapers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to increment views
CREATE OR REPLACE FUNCTION increment_views(wallpaper_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE wallpapers
    SET views = views + 1
    WHERE id = wallpaper_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment downloads
CREATE OR REPLACE FUNCTION increment_downloads(wallpaper_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE wallpapers
    SET downloads = downloads + 1
    WHERE id = wallpaper_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON wallpapers
    FOR SELECT
    USING (true);

-- Create policy for authenticated users to insert/update (admin only)
-- You can modify this based on your authentication setup
CREATE POLICY "Allow authenticated users to insert" ON wallpapers
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update" ON wallpapers
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Grant usage on the functions
GRANT EXECUTE ON FUNCTION increment_views(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_downloads(UUID) TO anon, authenticated;
