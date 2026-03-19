import type { Wallpaper } from "@/types/wallpaper";

export const mockWallpapers: Wallpaper[] = [
  // Desktop Static Wallpapers
  {
    id: "1",
    title: "Mountain Sunrise",
    slug: "mountain-sunrise",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=3840&q=100",
    },
    tags: ["nature", "mountains", "sunrise", "landscape"],
    featured: true,
    created_at: "2024-01-15T10:00:00Z",
    views: 15420,
    downloads: 3240,
  },
  {
    id: "2",
    title: "Ocean Waves",
    slug: "ocean-waves",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=3840&q=100",
    },
    tags: ["nature", "ocean", "waves", "blue"],
    featured: true,
    created_at: "2024-01-14T10:00:00Z",
    views: 12300,
    downloads: 2890,
  },
  {
    id: "3",
    title: "Northern Lights",
    slug: "northern-lights",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=3840&q=100",
    },
    tags: ["nature", "aurora", "night", "sky"],
    featured: true,
    created_at: "2024-01-13T10:00:00Z",
    views: 18900,
    downloads: 4100,
  },
  {
    id: "4",
    title: "Forest Path",
    slug: "forest-path",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=3840&q=100",
    },
    tags: ["nature", "forest", "trees", "green"],
    featured: false,
    created_at: "2024-01-12T10:00:00Z",
    views: 9800,
    downloads: 2100,
  },
  {
    id: "5",
    title: "City Skyline Night",
    slug: "city-skyline-night",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=3840&q=100",
    },
    tags: ["city", "urban", "night", "lights"],
    featured: false,
    created_at: "2024-01-11T10:00:00Z",
    views: 7600,
    downloads: 1800,
  },
  {
    id: "6",
    title: "Abstract Geometry",
    slug: "abstract-geometry",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=3840&q=100",
    },
    tags: ["abstract", "geometric", "colorful", "modern"],
    featured: true,
    created_at: "2024-01-10T10:00:00Z",
    views: 11200,
    downloads: 2650,
  },
  {
    id: "7",
    title: "Desert Dunes",
    slug: "desert-dunes",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=3840&q=100",
    },
    tags: ["nature", "desert", "sand", "minimal"],
    featured: false,
    created_at: "2024-01-09T10:00:00Z",
    views: 6400,
    downloads: 1400,
  },
  {
    id: "8",
    title: "Starry Galaxy",
    slug: "starry-galaxy",
    type: "static",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=90",
    download_urls: {
      "1920x1080": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=3840&q=100",
    },
    tags: ["space", "galaxy", "stars", "night"],
    featured: true,
    created_at: "2024-01-08T10:00:00Z",
    views: 21500,
    downloads: 5200,
  },

  // Mobile Static Wallpapers
  {
    id: "9",
    title: "Pink Sakura",
    slug: "pink-sakura",
    type: "static",
    device: "mobile",
    thumbnail_url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=90",
    download_urls: {
      "1080x1920": "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1080&q=100",
      "1440x2560": "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1440&q=100",
    },
    tags: ["nature", "flowers", "pink", "spring"],
    featured: true,
    created_at: "2024-01-07T10:00:00Z",
    views: 14200,
    downloads: 3800,
  },
  {
    id: "10",
    title: "Neon City",
    slug: "neon-city",
    type: "static",
    device: "mobile",
    thumbnail_url: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800&q=90",
    download_urls: {
      "1080x1920": "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1080&q=100",
      "1440x2560": "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1440&q=100",
    },
    tags: ["city", "neon", "night", "cyberpunk"],
    featured: true,
    created_at: "2024-01-06T10:00:00Z",
    views: 16800,
    downloads: 4200,
  },
  {
    id: "11",
    title: "Minimal Gradient",
    slug: "minimal-gradient",
    type: "static",
    device: "mobile",
    thumbnail_url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=90",
    download_urls: {
      "1080x1920": "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1080&q=100",
      "1440x2560": "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1440&q=100",
    },
    tags: ["abstract", "gradient", "minimal", "purple"],
    featured: false,
    created_at: "2024-01-05T10:00:00Z",
    views: 8900,
    downloads: 2300,
  },
  {
    id: "12",
    title: "Tropical Beach",
    slug: "tropical-beach",
    type: "static",
    device: "mobile",
    thumbnail_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=90",
    download_urls: {
      "1080x1920": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=100",
      "1440x2560": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1440&q=100",
    },
    tags: ["nature", "beach", "tropical", "summer"],
    featured: false,
    created_at: "2024-01-04T10:00:00Z",
    views: 7200,
    downloads: 1900,
  },
  {
    id: "13",
    title: "Dark Botanical",
    slug: "dark-botanical",
    type: "static",
    device: "mobile",
    thumbnail_url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=90",
    download_urls: {
      "1080x1920": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1080&q=100",
      "1440x2560": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1440&q=100",
    },
    tags: ["nature", "plants", "dark", "botanical"],
    featured: true,
    created_at: "2024-01-03T10:00:00Z",
    views: 12400,
    downloads: 3100,
  },

  // Both (Universal) Wallpapers
  {
    id: "14",
    title: "Sunset Over Mountains",
    slug: "sunset-mountains",
    type: "static",
    device: "both",
    thumbnail_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=90",
    download_urls: {
      "1080x1920": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&q=100",
      "1440x2560": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1440&q=100",
      "1920x1080": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=3840&q=100",
    },
    tags: ["nature", "mountains", "sunset", "landscape"],
    featured: true,
    created_at: "2024-01-02T10:00:00Z",
    views: 24600,
    downloads: 6100,
  },
  {
    id: "15",
    title: "Dark Space Nebula",
    slug: "dark-space-nebula",
    type: "static",
    device: "both",
    thumbnail_url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=90",
    download_urls: {
      "1080x1920": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1080&q=100",
      "1440x2560": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1440&q=100",
      "1920x1080": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&q=100",
      "2560x1440": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=2560&q=100",
      "3840x2160": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=3840&q=100",
    },
    tags: ["space", "nebula", "dark", "stars"],
    featured: true,
    created_at: "2024-01-01T10:00:00Z",
    views: 28900,
    downloads: 7200,
  },

  // Dynamic Wallpapers
  {
    id: "16",
    title: "Flowing Water",
    slug: "flowing-water",
    type: "dynamic",
    device: "desktop",
    thumbnail_url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&q=90",
    download_urls: {
      "1920x1080": "/videos/flowing-water-1080p.mp4",
      "2560x1440": "/videos/flowing-water-1440p.mp4",
    },
    tags: ["nature", "water", "relaxing", "animated"],
    featured: true,
    created_at: "2023-12-30T10:00:00Z",
    views: 19200,
    downloads: 4800,
  },
  {
    id: "17",
    title: "Rain on Window",
    slug: "rain-window",
    type: "dynamic",
    device: "mobile",
    thumbnail_url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&q=90",
    download_urls: {
      "1080x1920": "/videos/rain-window-mobile.mp4",
    },
    tags: ["nature", "rain", "cozy", "animated"],
    featured: false,
    created_at: "2023-12-29T10:00:00Z",
    views: 8700,
    downloads: 2100,
  },
  {
    id: "18",
    title: "Fireplace Flames",
    slug: "fireplace-flames",
    type: "dynamic",
    device: "both",
    thumbnail_url: "https://images.unsplash.com/photo-1543459176-4426b37223ba?w=400&q=80",
    preview_url: "https://images.unsplash.com/photo-1543459176-4426b37223ba?w=1200&q=90",
    download_urls: {
      "1080x1920": "/videos/fireplace-mobile.mp4",
      "1920x1080": "/videos/fireplace-desktop.mp4",
    },
    tags: ["cozy", "fire", "warm", "animated"],
    featured: true,
    created_at: "2023-12-28T10:00:00Z",
    views: 22100,
    downloads: 5400,
  },
];

export function getMockWallpapers(filters?: {
  device?: string;
  type?: string;
  search?: string;
}): Wallpaper[] {
  let result = [...mockWallpapers];

  if (filters?.device && filters.device !== "all") {
    result = result.filter(
      (w) => w.device === filters.device || w.device === "both"
    );
  }

  if (filters?.type && filters.type !== "all") {
    result = result.filter((w) => w.type === filters.type);
  }

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    result = result.filter(
      (w) =>
        w.title.toLowerCase().includes(search) ||
        w.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  return result;
}

export function getMockFeaturedWallpapers(): Wallpaper[] {
  return mockWallpapers.filter((w) => w.featured);
}

export function getMockWallpaperBySlug(slug: string): Wallpaper | undefined {
  return mockWallpapers.find((w) => w.slug === slug);
}

export function getMockRelatedWallpapers(wallpaper: Wallpaper): Wallpaper[] {
  return mockWallpapers
    .filter(
      (w) =>
        w.id !== wallpaper.id &&
        (w.device === wallpaper.device || w.device === "both") &&
        w.type === wallpaper.type
    )
    .slice(0, 6);
}
