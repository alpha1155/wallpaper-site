/**
 * 原神壁纸自动下载脚本
 * 从 Wallhaven 下载高清壁纸
 * 
 * 使用方法:
 * 1. npm install axios cheerio sharp
 * 2. node scripts/download-wallpapers.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  // Wallhaven API (无需API Key也可用，但有限制)
  baseUrl: 'https://wallhaven.cc/api/v1/search',
  
  // 下载目录
  downloadDir: path.join(__dirname, '../downloads'),
  
  // 每个角色下载数量
  perCharacter: 5,
  
  // 最小分辨率
  minWidth: 1920,
  minHeight: 1080,
  
  // 请求延迟(ms)，避免被封
  delay: 2000,
};

// 要下载的角色列表
const CHARACTERS = [
  { name: 'raiden-shogun', query: 'genshin raiden shogun', element: 'electro', region: 'inazuma' },
  { name: 'hu-tao', query: 'genshin hu tao', element: 'pyro', region: 'liyue' },
  { name: 'nahida', query: 'genshin nahida', element: 'dendro', region: 'sumeru' },
  { name: 'furina', query: 'genshin furina', element: 'hydro', region: 'fontaine' },
  { name: 'zhongli', query: 'genshin zhongli', element: 'geo', region: 'liyue' },
  { name: 'ayaka', query: 'genshin ayaka', element: 'cryo', region: 'inazuma' },
  { name: 'kazuha', query: 'genshin kazuha', element: 'anemo', region: 'inazuma' },
  { name: 'ganyu', query: 'genshin ganyu', element: 'cryo', region: 'liyue' },
  { name: 'xiao', query: 'genshin xiao', element: 'anemo', region: 'liyue' },
  { name: 'yae-miko', query: 'genshin yae miko', element: 'electro', region: 'inazuma' },
];

// 场景列表
const SCENES = [
  { name: 'liyue', query: 'genshin liyue landscape', region: 'liyue' },
  { name: 'inazuma', query: 'genshin inazuma landscape', region: 'inazuma' },
  { name: 'sumeru', query: 'genshin sumeru landscape', region: 'sumeru' },
  { name: 'fontaine', query: 'genshin fontaine landscape', region: 'fontaine' },
];

// 延迟函数
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 创建目录
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 从 Wallhaven 搜索壁纸
async function searchWallhaven(query, page = 1) {
  try {
    const params = new URLSearchParams({
      q: query,
      categories: '110', // 110 = General + Anime
      purity: '100',     // 100 = SFW only
      sorting: 'favorites',
      order: 'desc',
      atleast: `${CONFIG.minWidth}x${CONFIG.minHeight}`,
      page: page.toString(),
    });

    const response = await axios.get(`${CONFIG.baseUrl}?${params}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 30000,
    });

    return response.data.data || [];
  } catch (error) {
    console.error(`搜索失败: ${query}`, error.message);
    return [];
  }
}

// 下载单张图片
async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://wallhaven.cc/',
      },
      timeout: 60000,
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`下载失败: ${url}`, error.message);
    throw error;
  }
}

// 下载角色壁纸
async function downloadCharacterWallpapers(character) {
  console.log(`\n🎮 下载 ${character.name} 壁纸...`);
  
  const charDir = path.join(CONFIG.downloadDir, character.name);
  ensureDir(charDir);
  
  const wallpapers = await searchWallhaven(character.query);
  const toDownload = wallpapers.slice(0, CONFIG.perCharacter);
  
  console.log(`  找到 ${wallpapers.length} 张，下载前 ${toDownload.length} 张`);
  
  const downloaded = [];
  
  for (let i = 0; i < toDownload.length; i++) {
    const wp = toDownload[i];
    const ext = path.extname(wp.path) || '.jpg';
    const filename = `${character.name}-${i + 1}${ext}`;
    const filepath = path.join(charDir, filename);
    
    // 跳过已存在的文件
    if (fs.existsSync(filepath)) {
      console.log(`  ⏭️  跳过已存在: ${filename}`);
      downloaded.push({
        filename,
        filepath,
        url: wp.path,
        resolution: wp.resolution,
        ...character,
      });
      continue;
    }
    
    try {
      console.log(`  ⬇️  下载 ${i + 1}/${toDownload.length}: ${wp.resolution}`);
      await downloadImage(wp.path, filepath);
      
      downloaded.push({
        filename,
        filepath,
        url: wp.path,
        resolution: wp.resolution,
        wallhavenId: wp.id,
        ...character,
      });
      
      // 延迟避免被封
      await sleep(CONFIG.delay);
    } catch (error) {
      console.log(`  ❌ 下载失败: ${filename}`);
    }
  }
  
  return downloaded;
}

// 生成元数据文件
function saveMetadata(allDownloaded) {
  const metadataPath = path.join(CONFIG.downloadDir, 'metadata.json');
  
  const metadata = allDownloaded.map((item, index) => ({
    id: index + 1,
    title: `${item.name} Wallpaper ${item.filename.match(/-(\d+)\./)?.[1] || '1'}`,
    slug: item.filename.replace(/\.[^.]+$/, ''),
    character_id: item.name,
    element: item.element || null,
    region: item.region || null,
    source: 'wallhaven',
    resolution: item.resolution,
    local_path: item.filepath,
    wallhaven_id: item.wallhavenId,
  }));
  
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`\n📄 元数据已保存: ${metadataPath}`);
}

// 主函数
async function main() {
  console.log('🚀 原神壁纸下载器启动');
  console.log(`📁 下载目录: ${CONFIG.downloadDir}`);
  console.log(`🎯 每个角色下载: ${CONFIG.perCharacter} 张`);
  
  ensureDir(CONFIG.downloadDir);
  
  const allDownloaded = [];
  
  // 下载角色壁纸
  for (const character of CHARACTERS) {
    const downloaded = await downloadCharacterWallpapers(character);
    allDownloaded.push(...downloaded);
    await sleep(1000);
  }
  
  // 下载场景壁纸
  for (const scene of SCENES) {
    const downloaded = await downloadCharacterWallpapers(scene);
    allDownloaded.push(...downloaded);
    await sleep(1000);
  }
  
  // 保存元数据
  saveMetadata(allDownloaded);
  
  console.log('\n✅ 下载完成!');
  console.log(`📊 总计: ${allDownloaded.length} 张壁纸`);
  console.log(`📁 位置: ${CONFIG.downloadDir}`);
  console.log('\n下一步: 运行 node scripts/process-wallpapers.js 处理图片');
}

main().catch(console.error);
