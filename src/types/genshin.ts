// 元素类型
export type Element = 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo';

// 武器类型
export type WeaponType = 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';

// 地区
export type Region = 'mondstadt' | 'liyue' | 'inazuma' | 'sumeru' | 'fontaine' | 'natlan' | 'snezhnaya';

// 稀有度
export type Rarity = 4 | 5;

// 壁纸来源
export type WallpaperSource = 'official' | 'fanart' | 'ai' | 'screenshot';

// 设备类型
export type DeviceType = 'mobile' | 'desktop' | 'both';

// 角色
export interface Character {
  id: string;
  name: string;
  name_cn: string;
  name_jp?: string;
  element: Element;
  weapon: WeaponType;
  rarity: Rarity;
  region: Region;
  release_version: string;
  avatar_url: string;
  created_at: string;
}

// 壁纸下载链接
export interface DownloadUrls {
  mobile?: string;        // 1080x1920
  desktop?: string;       // 1920x1080
  desktop_2k?: string;    // 2560x1440
  desktop_4k?: string;    // 3840x2160
  ultrawide?: string;     // 3440x1440
}

// 壁纸
export interface Wallpaper {
  id: string;
  title: string;
  slug: string;
  character_ids: string[];
  characters?: Character[];  // 关联的角色数据
  element?: Element;
  region?: Region;
  scene?: string;
  source: WallpaperSource;
  artist_name?: string;
  artist_url?: string;
  thumbnail_url: string;
  preview_url: string;
  download_urls: DownloadUrls;
  tags: string[];
  download_count: number;
  view_count: number;
  is_featured: boolean;
  created_at: string;
}

// 元素信息
export const ELEMENTS: Record<Element, { name: string; name_cn: string; color: string }> = {
  pyro: { name: 'Pyro', name_cn: '火', color: '#EF7938' },
  hydro: { name: 'Hydro', name_cn: '水', color: '#4CC2F1' },
  anemo: { name: 'Anemo', name_cn: '风', color: '#74C2A8' },
  electro: { name: 'Electro', name_cn: '雷', color: '#AF8EC1' },
  dendro: { name: 'Dendro', name_cn: '草', color: '#A5C83B' },
  cryo: { name: 'Cryo', name_cn: '冰', color: '#9FD6E3' },
  geo: { name: 'Geo', name_cn: '岩', color: '#F0B232' },
};

// 地区信息
export const REGIONS: Record<Region, { name: string; name_cn: string }> = {
  mondstadt: { name: 'Mondstadt', name_cn: '蒙德' },
  liyue: { name: 'Liyue', name_cn: '璃月' },
  inazuma: { name: 'Inazuma', name_cn: '稻妻' },
  sumeru: { name: 'Sumeru', name_cn: '须弥' },
  fontaine: { name: 'Fontaine', name_cn: '枫丹' },
  natlan: { name: 'Natlan', name_cn: '纳塔' },
  snezhnaya: { name: 'Snezhnaya', name_cn: '至冬' },
};

// 武器类型信息
export const WEAPONS: Record<WeaponType, { name: string; name_cn: string }> = {
  sword: { name: 'Sword', name_cn: '单手剑' },
  claymore: { name: 'Claymore', name_cn: '双手剑' },
  polearm: { name: 'Polearm', name_cn: '长柄武器' },
  bow: { name: 'Bow', name_cn: '弓' },
  catalyst: { name: 'Catalyst', name_cn: '法器' },
};
