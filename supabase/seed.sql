-- Seed data for Wallpaper Site
-- Replace the URLs with your actual R2 public URLs

INSERT INTO wallpapers (title, slug, type, device, thumbnail_url, preview_url, download_urls, tags, featured) VALUES

-- Desktop Static Wallpapers
(
    'Mountain Sunrise',
    'mountain-sunrise',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=3840&q=100"}',
    ARRAY['nature', 'mountains', 'sunrise', 'landscape'],
    true
),
(
    'Ocean Waves',
    'ocean-waves',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80',
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=3840&q=100"}',
    ARRAY['nature', 'ocean', 'waves', 'blue'],
    true
),
(
    'Northern Lights',
    'northern-lights',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80',
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=3840&q=100"}',
    ARRAY['nature', 'aurora', 'night', 'sky'],
    true
),
(
    'Forest Path',
    'forest-path',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=3840&q=100"}',
    ARRAY['nature', 'forest', 'trees', 'green'],
    false
),
(
    'City Skyline Night',
    'city-skyline-night',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=3840&q=100"}',
    ARRAY['city', 'urban', 'night', 'lights'],
    false
),
(
    'Abstract Geometry',
    'abstract-geometry',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80',
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=3840&q=100"}',
    ARRAY['abstract', 'geometric', 'colorful', 'modern'],
    true
),
(
    'Desert Dunes',
    'desert-dunes',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=3840&q=100"}',
    ARRAY['nature', 'desert', 'sand', 'minimal'],
    false
),
(
    'Starry Galaxy',
    'starry-galaxy',
    'static',
    'desktop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=90',
    '{"1920x1080": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=3840&q=100"}',
    ARRAY['space', 'galaxy', 'stars', 'night'],
    true
),

-- Mobile Static Wallpapers
(
    'Pink Sakura',
    'pink-sakura',
    'static',
    'mobile',
    'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80',
    'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=90',
    '{"1080x1920": "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1080&q=100", "1440x2560": "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1440&q=100"}',
    ARRAY['nature', 'flowers', 'pink', 'spring'],
    true
),
(
    'Neon City',
    'neon-city',
    'static',
    'mobile',
    'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=400&q=80',
    'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800&q=90',
    '{"1080x1920": "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1080&q=100", "1440x2560": "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1440&q=100"}',
    ARRAY['city', 'neon', 'night', 'cyberpunk'],
    true
),
(
    'Minimal Gradient',
    'minimal-gradient',
    'static',
    'mobile',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=90',
    '{"1080x1920": "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1080&q=100", "1440x2560": "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1440&q=100"}',
    ARRAY['abstract', 'gradient', 'minimal', 'purple'],
    false
),
(
    'Tropical Beach',
    'tropical-beach',
    'static',
    'mobile',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=90',
    '{"1080x1920": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=100", "1440x2560": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1440&q=100"}',
    ARRAY['nature', 'beach', 'tropical', 'summer'],
    false
),
(
    'Dark Botanical',
    'dark-botanical',
    'static',
    'mobile',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=90',
    '{"1080x1920": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1080&q=100", "1440x2560": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1440&q=100"}',
    ARRAY['nature', 'plants', 'dark', 'botanical'],
    true
),

-- Both (Universal) Wallpapers
(
    'Sunset Over Mountains',
    'sunset-mountains',
    'static',
    'both',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=90',
    '{"1080x1920": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&q=100", "1440x2560": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1440&q=100", "1920x1080": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=3840&q=100"}',
    ARRAY['nature', 'mountains', 'sunset', 'landscape'],
    true
),
(
    'Dark Space Nebula',
    'dark-space-nebula',
    'static',
    'both',
    'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=400&q=80',
    'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=90',
    '{"1080x1920": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1080&q=100", "1440x2560": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1440&q=100", "1920x1080": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&q=100", "2560x1440": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=2560&q=100", "3840x2160": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=3840&q=100"}',
    ARRAY['space', 'nebula', 'dark', 'stars'],
    true
),

-- Dynamic Wallpapers (MP4 format - using placeholder URLs, replace with actual R2 URLs)
(
    'Flowing Water',
    'flowing-water',
    'dynamic',
    'desktop',
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&q=80',
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&q=90',
    '{"1920x1080": "/videos/flowing-water-1080p.mp4", "2560x1440": "/videos/flowing-water-1440p.mp4"}',
    ARRAY['nature', 'water', 'relaxing', 'animated'],
    true
),
(
    'Rain on Window',
    'rain-window',
    'dynamic',
    'mobile',
    'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&q=80',
    'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&q=90',
    '{"1080x1920": "/videos/rain-window-mobile.mp4"}',
    ARRAY['nature', 'rain', 'cozy', 'animated'],
    false
),
(
    'Fireplace Flames',
    'fireplace-flames',
    'dynamic',
    'both',
    'https://images.unsplash.com/photo-1543459176-4426b37223ba?w=400&q=80',
    'https://images.unsplash.com/photo-1543459176-4426b37223ba?w=1200&q=90',
    '{"1080x1920": "/videos/fireplace-mobile.mp4", "1920x1080": "/videos/fireplace-desktop.mp4"}',
    ARRAY['cozy', 'fire', 'warm', 'animated'],
    true
);
