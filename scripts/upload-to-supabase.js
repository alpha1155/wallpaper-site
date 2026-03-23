/**
 * 上传壁纸到 Supabase Storage
 * 
 * 使用前需要：
 * 1. 在 Supabase 项目中创建一个 Storage Bucket 名为 "wallpapers"
 * 2. 设置 Bucket 为公开访问
 * 3. 配置环境变量 SUPABASE_URL 和 SUPABASE_SERVICE_KEY
 * 
 * 使用方法: node scripts/upload-to-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 配置 - 你需要修改这些值
const CONFIG = {
  // Supabase 配置
  supabaseUrl: process.env.SUPABASE_URL || 'https://ydrbuwnydggydyxfwrga.supabase.co',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '', // 需要 service_role key，不是 anon key
  
  // Bucket 名称
  bucketName: 'wallpapers',
  
  // 输入目录
  inputDir: path.join(__dirname, '../processed'),
  
  // 上传并发数
  concurrency: 3,
  
  // 重试次数
  maxRetries: 3,
};

// 初始化 Supabase 客户端
let supabase;

// 延迟函数
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取所有待上传的文件
function getFilesToUpload() {
  const files = [];
  
  const characterDirs = fs.readdirSync(CONFIG.inputDir).filter(name => {
    const fullPath = path.join(CONFIG.inputDir, name);
    return fs.statSync(fullPath).isDirectory();
  });
  
  for (const characterName of characterDirs) {
    const charDir = path.join(CONFIG.inputDir, characterName);
    const sizeDirs = fs.readdirSync(charDir).filter(name => {
      const fullPath = path.join(charDir, name);
      return fs.statSync(fullPath).isDirectory();
    });
    
    for (const sizeName of sizeDirs) {
      const sizeDir = path.join(charDir, sizeName);
      const imageFiles = fs.readdirSync(sizeDir).filter(f => 
        /\.(webp|jpg|jpeg|png)$/i.test(f)
      );
      
      for (const filename of imageFiles) {
        files.push({
          localPath: path.join(sizeDir, filename),
          remotePath: `${characterName}/${sizeName}/${filename}`,
          characterName,
          sizeName,
          filename,
        });
      }
    }
  }
  
  return files;
}

// 上传单个文件
async function uploadFile(file, retries = 0) {
  try {
    const fileBuffer = fs.readFileSync(file.localPath);
    
    const { data, error } = await supabase.storage
      .from(CONFIG.bucketName)
      .upload(file.remotePath, fileBuffer, {
        contentType: 'image/webp',
        upsert: true,
      });
    
    if (error) {
      throw error;
    }
    
    // 获取公开 URL
    const { data: urlData } = supabase.storage
      .from(CONFIG.bucketName)
      .getPublicUrl(file.remotePath);
    
    return {
      ...file,
      publicUrl: urlData.publicUrl,
      success: true,
    };
  } catch (error) {
    if (retries < CONFIG.maxRetries) {
      console.log(`  ⚠️  重试 ${file.filename} (${retries + 1}/${CONFIG.maxRetries})`);
      await sleep(1000 * (retries + 1));
      return uploadFile(file, retries + 1);
    }
    
    console.error(`  ❌ 上传失败 ${file.remotePath}: ${error.message}`);
    return {
      ...file,
      success: false,
      error: error.message,
    };
  }
}

// 批量上传
async function uploadBatch(files, batchSize = CONFIG.concurrency) {
  const results = [];
  
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(f => uploadFile(f)));
    results.push(...batchResults);
    
    // 显示进度
    const completed = Math.min(i + batchSize, files.length);
    console.log(`📤 上传进度: ${completed}/${files.length}`);
  }
  
  return results;
}

// 生成数据库导入 SQL
function generateSQL(uploadResults) {
  // 按 wallpaper 分组
  const wallpapers = {};
  
  for (const result of uploadResults) {
    if (!result.success) continue;
    
    const baseName = result.filename.replace('.webp', '');
    if (!wallpapers[baseName]) {
      wallpapers[baseName] = {
        baseName,
        characterName: result.characterName,
        urls: {},
      };
    }
    wallpapers[baseName].urls[result.sizeName] = result.publicUrl;
  }
  
  // 读取原始元数据获取 element 和 region
  const metadataPath = path.join(__dirname, '../downloads/metadata.json');
  let originalMeta = [];
  if (fs.existsSync(metadataPath)) {
    originalMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  }
  
  // 生成 SQL
  const sqlStatements = [];
  
  for (const [baseName, wp] of Object.entries(wallpapers)) {
    if (!wp.urls.thumbnail || !wp.urls.desktop) continue;
    
    const meta = originalMeta.find(m => m.slug === baseName) || {};
    const title = formatTitle(baseName);
    const characterId = wp.characterName;
    
    const downloadUrls = JSON.stringify({
      mobile: wp.urls.mobile || null,
      desktop: wp.urls.desktop || null,
      desktop_4k: wp.urls.desktop_4k || null,
    });
    
    const sql = `INSERT INTO wallpapers (title, slug, character_ids, element, region, source, thumbnail_url, preview_url, download_urls, tags, is_featured)
VALUES (
  '${title}',
  '${baseName}',
  ARRAY['${characterId}'],
  ${meta.element ? `'${meta.element}'` : 'NULL'},
  ${meta.region ? `'${meta.region}'` : 'NULL'},
  'wallhaven',
  '${wp.urls.thumbnail}',
  '${wp.urls.desktop}',
  '${downloadUrls}',
  ARRAY['${characterId}', 'genshin'],
  false
);`;
    
    sqlStatements.push(sql);
  }
  
  const fullSql = `-- 自动生成的壁纸导入 SQL
-- 生成时间: ${new Date().toISOString()}
-- 共 ${sqlStatements.length} 条记录

${sqlStatements.join('\n\n')}
`;
  
  const sqlPath = path.join(CONFIG.inputDir, 'import-wallpapers.sql');
  fs.writeFileSync(sqlPath, fullSql);
  console.log(`\n📄 SQL 已生成: ${sqlPath}`);
  
  return sqlPath;
}

// 格式化标题
function formatTitle(baseName) {
  const match = baseName.match(/^(.+)-(\d+)$/);
  if (match) {
    const name = match[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `${name} Wallpaper ${match[2]}`;
  }
  return baseName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// 创建 Bucket（如果不存在）
async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  
  const exists = buckets?.some(b => b.name === CONFIG.bucketName);
  
  if (!exists) {
    console.log(`📦 创建 Bucket: ${CONFIG.bucketName}`);
    const { error } = await supabase.storage.createBucket(CONFIG.bucketName, {
      public: true,
    });
    
    if (error) {
      console.error('创建 Bucket 失败:', error.message);
      console.log('\n请手动在 Supabase 控制台创建 Bucket:');
      console.log('1. 进入 Storage');
      console.log('2. 点击 "New bucket"');
      console.log('3. 名称输入 "wallpapers"');
      console.log('4. 勾选 "Public bucket"');
      process.exit(1);
    }
  }
  
  console.log(`✅ Bucket "${CONFIG.bucketName}" 已就绪`);
}

// 主函数
async function main() {
  console.log('🚀 Supabase Storage 上传脚本启动\n');
  
  // 检查 Service Key
  if (!CONFIG.supabaseServiceKey) {
    console.error('❌ 错误: 需要设置 SUPABASE_SERVICE_KEY 环境变量');
    console.log('\n获取方法:');
    console.log('1. 进入 Supabase 项目');
    console.log('2. Settings → API');
    console.log('3. 复制 service_role key (不是 anon key!)');
    console.log('\n然后运行:');
    console.log('set SUPABASE_SERVICE_KEY=你的key');
    console.log('node scripts/upload-to-supabase.js');
    process.exit(1);
  }
  
  // 初始化 Supabase
  supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseServiceKey);
  
  // 确保 Bucket 存在
  await ensureBucket();
  
  // 获取待上传文件
  const files = getFilesToUpload();
  console.log(`\n📊 找到 ${files.length} 个文件待上传\n`);
  
  if (files.length === 0) {
    console.log('没有文件需要上传，请先运行 process-wallpapers.js');
    return;
  }
  
  // 上传
  const results = await uploadBatch(files);
  
  // 统计
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ 上传完成!`);
  console.log(`📊 成功: ${successful.length}, 失败: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ 失败的文件:');
    failed.forEach(f => console.log(`  - ${f.remotePath}: ${f.error}`));
  }
  
  // 生成 SQL
  if (successful.length > 0) {
    generateSQL(results);
    console.log('\n下一步:');
    console.log('1. 打开 Supabase SQL Editor');
    console.log('2. 运行 processed/import-wallpapers.sql');
  }
}

main().catch(console.error);
