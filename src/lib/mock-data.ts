import { Character, Wallpaper, Element, Region, WeaponType } from '@/types/genshin';

// 示例角色数据
export const mockCharacters: Character[] = [
  {
    id: 'raiden-shogun',
    name: 'Raiden Shogun',
    name_cn: '雷电将军',
    name_jp: '雷電将軍',
    element: 'electro',
    weapon: 'polearm',
    rarity: 5,
    region: 'inazuma',
    release_version: '2.1',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2021-09-01',
  },
  {
    id: 'hu-tao',
    name: 'Hu Tao',
    name_cn: '胡桃',
    name_jp: '胡桃',
    element: 'pyro',
    weapon: 'polearm',
    rarity: 5,
    region: 'liyue',
    release_version: '1.3',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2021-03-02',
  },
  {
    id: 'nahida',
    name: 'Nahida',
    name_cn: '纳西妲',
    name_jp: 'ナヒーダ',
    element: 'dendro',
    weapon: 'catalyst',
    rarity: 5,
    region: 'sumeru',
    release_version: '3.2',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2022-11-02',
  },
  {
    id: 'furina',
    name: 'Furina',
    name_cn: '芙宁娜',
    name_jp: 'フリーナ',
    element: 'hydro',
    weapon: 'sword',
    rarity: 5,
    region: 'fontaine',
    release_version: '4.2',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2023-11-08',
  },
  {
    id: 'kazuha',
    name: 'Kaedehara Kazuha',
    name_cn: '枫原万叶',
    name_jp: '楓原万葉',
    element: 'anemo',
    weapon: 'sword',
    rarity: 5,
    region: 'inazuma',
    release_version: '1.6',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2021-06-29',
  },
  {
    id: 'ayaka',
    name: 'Kamisato Ayaka',
    name_cn: '神里绫华',
    name_jp: '神里綾華',
    element: 'cryo',
    weapon: 'sword',
    rarity: 5,
    region: 'inazuma',
    release_version: '2.0',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2021-07-21',
  },
  {
    id: 'zhongli',
    name: 'Zhongli',
    name_cn: '钟离',
    name_jp: '鍾離',
    element: 'geo',
    weapon: 'polearm',
    rarity: 5,
    region: 'liyue',
    release_version: '1.1',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2020-12-01',
  },
  {
    id: 'xiao',
    name: 'Xiao',
    name_cn: '魈',
    name_jp: '魈',
    element: 'anemo',
    weapon: 'polearm',
    rarity: 5,
    region: 'liyue',
    release_version: '1.3',
    avatar_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    created_at: '2021-02-03',
  },
];

// 示例壁纸数据
export const mockWallpapers: Wallpaper[] = [
  {
    id: '1',
    title: 'Raiden Shogun - Eternal Euthymia',
    slug: 'raiden-shogun-eternal-euthymia',
    character_ids: ['raiden-shogun'],
    element: 'electro',
    region: 'inazuma',
    source: 'official',
    thumbnail_url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=3840&h=2160&fit=crop',
    },
    tags: ['raiden', 'electro', 'inazuma', 'archon', 'purple'],
    download_count: 12580,
    view_count: 45600,
    is_featured: true,
    created_at: '2024-01-15',
  },
  {
    id: '2',
    title: 'Hu Tao - Ghost of Wangsheng',
    slug: 'hu-tao-ghost-wangsheng',
    character_ids: ['hu-tao'],
    element: 'pyro',
    region: 'liyue',
    source: 'official',
    thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=3840&h=2160&fit=crop',
    },
    tags: ['hu-tao', 'pyro', 'liyue', 'ghost', 'cute'],
    download_count: 9870,
    view_count: 32100,
    is_featured: true,
    created_at: '2024-01-10',
  },
  {
    id: '3',
    title: 'Nahida - Dendro Archon',
    slug: 'nahida-dendro-archon',
    character_ids: ['nahida'],
    element: 'dendro',
    region: 'sumeru',
    source: 'official',
    thumbnail_url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=3840&h=2160&fit=crop',
    },
    tags: ['nahida', 'dendro', 'sumeru', 'archon', 'green'],
    download_count: 15230,
    view_count: 52800,
    is_featured: true,
    created_at: '2024-02-01',
  },
  {
    id: '4',
    title: 'Furina - Hydro Archon',
    slug: 'furina-hydro-archon',
    character_ids: ['furina'],
    element: 'hydro',
    region: 'fontaine',
    source: 'official',
    thumbnail_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=3840&h=2160&fit=crop',
    },
    tags: ['furina', 'hydro', 'fontaine', 'archon', 'blue'],
    download_count: 18500,
    view_count: 61200,
    is_featured: true,
    created_at: '2024-02-15',
  },
  {
    id: '5',
    title: 'Kazuha - Autumn Leaves',
    slug: 'kazuha-autumn-leaves',
    character_ids: ['kazuha'],
    element: 'anemo',
    region: 'inazuma',
    source: 'fanart',
    artist_name: 'ArtistName',
    artist_url: 'https://twitter.com/artist',
    thumbnail_url: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&h=1080&fit=crop',
    },
    tags: ['kazuha', 'anemo', 'inazuma', 'maple', 'autumn'],
    download_count: 7650,
    view_count: 28900,
    is_featured: false,
    created_at: '2024-01-20',
  },
  {
    id: '6',
    title: 'Ayaka - Frostflake Sakura',
    slug: 'ayaka-frostflake-sakura',
    character_ids: ['ayaka'],
    element: 'cryo',
    region: 'inazuma',
    source: 'official',
    thumbnail_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=3840&h=2160&fit=crop',
    },
    tags: ['ayaka', 'cryo', 'inazuma', 'sakura', 'elegant'],
    download_count: 11200,
    view_count: 39500,
    is_featured: true,
    created_at: '2024-01-25',
  },
  {
    id: '7',
    title: 'Zhongli - Rex Lapis',
    slug: 'zhongli-rex-lapis',
    character_ids: ['zhongli'],
    element: 'geo',
    region: 'liyue',
    source: 'official',
    thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=3840&h=2160&fit=crop',
    },
    tags: ['zhongli', 'geo', 'liyue', 'archon', 'contract'],
    download_count: 14800,
    view_count: 48700,
    is_featured: true,
    created_at: '2024-02-05',
  },
  {
    id: '8',
    title: 'Xiao - Vigilant Yaksha',
    slug: 'xiao-vigilant-yaksha',
    character_ids: ['xiao'],
    element: 'anemo',
    region: 'liyue',
    source: 'ai',
    thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop',
    },
    tags: ['xiao', 'anemo', 'liyue', 'yaksha', 'mask'],
    download_count: 8900,
    view_count: 31200,
    is_featured: false,
    created_at: '2024-02-10',
  },
  {
    id: '9',
    title: 'Liyue Harbor Night',
    slug: 'liyue-harbor-night',
    character_ids: [],
    region: 'liyue',
    scene: 'Liyue Harbor',
    source: 'screenshot',
    thumbnail_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=3840&h=2160&fit=crop',
      ultrawide: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=3440&h=1440&fit=crop',
    },
    tags: ['liyue', 'harbor', 'night', 'scenery', 'city'],
    download_count: 6500,
    view_count: 22400,
    is_featured: false,
    created_at: '2024-01-28',
  },
  {
    id: '10',
    title: 'Inazuma Thunder Storm',
    slug: 'inazuma-thunder-storm',
    character_ids: [],
    region: 'inazuma',
    scene: 'Inazuma City',
    source: 'screenshot',
    thumbnail_url: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=400&h=600&fit=crop',
    preview_url: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=1920&h=1080&fit=crop',
    download_urls: {
      mobile: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=1080&h=1920&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=1920&h=1080&fit=crop',
      desktop_4k: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=3840&h=2160&fit=crop',
    },
    tags: ['inazuma', 'storm', 'thunder', 'scenery', 'dramatic'],
    download_count: 5800,
    view_count: 19800,
    is_featured: false,
    created_at: '2024-02-08',
  },
];

// 获取角色
export function getCharacterById(id: string): Character | undefined {
  return mockCharacters.find(c => c.id === id);
}

// 获取壁纸的关联角色
export function getWallpaperWithCharacters(wallpaper: Wallpaper): Wallpaper {
  return {
    ...wallpaper,
    characters: wallpaper.character_ids
      .map(id => getCharacterById(id))
      .filter((c): c is Character => c !== undefined),
  };
}

// 按元素筛选壁纸
export function filterWallpapersByElement(element: Element): Wallpaper[] {
  return mockWallpapers.filter(w => w.element === element);
}

// 按地区筛选壁纸
export function filterWallpapersByRegion(region: Region): Wallpaper[] {
  return mockWallpapers.filter(w => w.region === region);
}

// 获取精选壁纸
export function getFeaturedWallpapers(): Wallpaper[] {
  return mockWallpapers.filter(w => w.is_featured);
}

// 获取热门壁纸
export function getPopularWallpapers(limit: number = 10): Wallpaper[] {
  return [...mockWallpapers]
    .sort((a, b) => b.download_count - a.download_count)
    .slice(0, limit);
}

// 获取最新壁纸
export function getLatestWallpapers(limit: number = 10): Wallpaper[] {
  return [...mockWallpapers]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}
