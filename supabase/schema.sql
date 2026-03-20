-- =============================================
-- GenshinWalls Database Schema
-- 原神壁纸站数据库结构
-- =============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 角色表 (Characters)
-- =============================================
CREATE TABLE characters (
    id TEXT PRIMARY KEY,  -- 如: raiden-shogun
    name TEXT NOT NULL,   -- 英文名
    name_cn TEXT NOT NULL, -- 中文名
    name_jp TEXT,         -- 日文名
    element TEXT NOT NULL CHECK (element IN ('pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo')),
    weapon TEXT NOT NULL CHECK (weapon IN ('sword', 'claymore', 'polearm', 'bow', 'catalyst')),
    rarity INTEGER NOT NULL CHECK (rarity IN (4, 5)),
    region TEXT NOT NULL CHECK (region IN ('mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'snezhnaya')),
    release_version TEXT NOT NULL,  -- 如: 2.1
    avatar_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 角色表索引
CREATE INDEX idx_characters_element ON characters(element);
CREATE INDEX idx_characters_region ON characters(region);
CREATE INDEX idx_characters_rarity ON characters(rarity);

-- =============================================
-- 壁纸表 (Wallpapers)
-- =============================================
CREATE TABLE wallpapers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    
    -- 关联信息
    character_ids TEXT[] DEFAULT '{}',  -- 关联的角色ID数组
    element TEXT CHECK (element IN ('pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo', NULL)),
    region TEXT CHECK (region IN ('mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'snezhnaya', NULL)),
    scene TEXT,  -- 场景名称, 如 "Liyue Harbor"
    
    -- 来源信息
    source TEXT NOT NULL CHECK (source IN ('official', 'fanart', 'ai', 'screenshot')),
    artist_name TEXT,
    artist_url TEXT,
    
    -- 图片URL
    thumbnail_url TEXT NOT NULL,
    preview_url TEXT NOT NULL,
    download_urls JSONB NOT NULL DEFAULT '{}',
    -- download_urls 结构:
    -- {
    --   "mobile": "url",      -- 1080x1920
    --   "desktop": "url",     -- 1920x1080
    --   "desktop_2k": "url",  -- 2560x1440
    --   "desktop_4k": "url",  -- 3840x2160
    --   "ultrawide": "url"    -- 3440x1440
    -- }
    
    -- 标签和统计
    tags TEXT[] DEFAULT '{}',
    download_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- 时间戳
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 壁纸表索引
CREATE INDEX idx_wallpapers_element ON wallpapers(element);
CREATE INDEX idx_wallpapers_region ON wallpapers(region);
CREATE INDEX idx_wallpapers_source ON wallpapers(source);
CREATE INDEX idx_wallpapers_is_featured ON wallpapers(is_featured);
CREATE INDEX idx_wallpapers_download_count ON wallpapers(download_count DESC);
CREATE INDEX idx_wallpapers_view_count ON wallpapers(view_count DESC);
CREATE INDEX idx_wallpapers_created_at ON wallpapers(created_at DESC);
CREATE INDEX idx_wallpapers_tags ON wallpapers USING GIN(tags);
CREATE INDEX idx_wallpapers_character_ids ON wallpapers USING GIN(character_ids);

-- 全文搜索索引
CREATE INDEX idx_wallpapers_search ON wallpapers 
USING GIN(to_tsvector('english', title || ' ' || COALESCE(scene, '')));

-- =============================================
-- 壁纸-角色关联表 (用于更灵活的查询)
-- =============================================
CREATE TABLE wallpaper_characters (
    wallpaper_id UUID REFERENCES wallpapers(id) ON DELETE CASCADE,
    character_id TEXT REFERENCES characters(id) ON DELETE CASCADE,
    PRIMARY KEY (wallpaper_id, character_id)
);

-- =============================================
-- 下载记录表 (可选, 用于统计)
-- =============================================
CREATE TABLE download_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallpaper_id UUID REFERENCES wallpapers(id) ON DELETE CASCADE,
    resolution TEXT NOT NULL,  -- mobile, desktop, desktop_4k, etc.
    user_agent TEXT,
    ip_hash TEXT,  -- 匿名化的IP哈希
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_download_logs_wallpaper ON download_logs(wallpaper_id);
CREATE INDEX idx_download_logs_created_at ON download_logs(created_at);

-- =============================================
-- 函数: 更新 updated_at 时间戳
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 触发器
CREATE TRIGGER update_characters_updated_at
    BEFORE UPDATE ON characters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallpapers_updated_at
    BEFORE UPDATE ON wallpapers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 函数: 增加下载计数
-- =============================================
CREATE OR REPLACE FUNCTION increment_download_count(wallpaper_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE wallpapers 
    SET download_count = download_count + 1 
    WHERE id = wallpaper_uuid;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 函数: 增加浏览计数
-- =============================================
CREATE OR REPLACE FUNCTION increment_view_count(wallpaper_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE wallpapers 
    SET view_count = view_count + 1 
    WHERE id = wallpaper_uuid;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- RLS (Row Level Security) 策略
-- =============================================

-- 启用 RLS
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- 公开读取策略
CREATE POLICY "Characters are viewable by everyone" 
    ON characters FOR SELECT 
    USING (true);

CREATE POLICY "Wallpapers are viewable by everyone" 
    ON wallpapers FOR SELECT 
    USING (true);

-- 仅服务端可写入 (使用 service_role key)
CREATE POLICY "Only service role can insert characters" 
    ON characters FOR INSERT 
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update characters" 
    ON characters FOR UPDATE 
    USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can insert wallpapers" 
    ON wallpapers FOR INSERT 
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update wallpapers" 
    ON wallpapers FOR UPDATE 
    USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can insert download_logs" 
    ON download_logs FOR INSERT 
    WITH CHECK (auth.role() = 'service_role');

-- =============================================
-- 视图: 热门壁纸
-- =============================================
CREATE VIEW popular_wallpapers AS
SELECT *
FROM wallpapers
ORDER BY download_count DESC
LIMIT 50;

-- =============================================
-- 视图: 最新壁纸
-- =============================================
CREATE VIEW latest_wallpapers AS
SELECT *
FROM wallpapers
ORDER BY created_at DESC
LIMIT 50;

-- =============================================
-- 视图: 精选壁纸
-- =============================================
CREATE VIEW featured_wallpapers AS
SELECT *
FROM wallpapers
WHERE is_featured = true
ORDER BY created_at DESC;
