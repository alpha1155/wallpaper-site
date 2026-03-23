/**
 * 壁纸处理脚本
 * 生成多分辨率版本：thumbnail, mobile, desktop, desktop_4k
 * 
 * 使用方法: node scripts/process-wallpapers.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  inputDir: path.join(__dirname, '../downloads'),
  outputDir: path.join(__dirname, '../processed'),
  
  // 输出尺寸
  sizes: {
    thumbnail: { width: 400, height: 600, fit: 'cover' },
    mobile: { width: 1080, height: 1920, fit: 'cover' },
    desktop: { width: 1920, height: 1080, fit: 'cover' },
    desktop_4k: { width: 3840, height: 2160, fit: 'cover' },
  },
  
  // 输出格式
  format: 'webp',
  quality: 85,
};

// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 处理单张图片
async function processImage(inputPath, outputBaseName, characterName) {
  const results = {};
  
  for (const [sizeName, sizeConfig] of Object.entries(CONFIG.sizes)) {
    const outputDir = path.join(CONFIG.outputDir, characterName, sizeName);
    ensureDir(outputDir);
    
    const outputFilename = `${outputBaseName}.${CONFIG.format}`;
    const outputPath = path.join(outputDir, outputFilename);
    
    try {
      await sharp(inputPath)
        .resize(sizeConfig.width, sizeConfig.height, {
          fit: sizeConfig.fit,
          position: 'center',
        })
        .webp({ quality: CONFIG.quality })
        .toFile(outputPath);
      
      results[sizeName] = outputPath;
    } catch (error) {
      console.error(`  ❌ 处理失败 ${sizeName}: ${error.message}`);
    }
  }
  
  return results;
}

// 获取所有待处理的图片
function getImagesToProcess() {
  const images = [];
  
  const characterDirs = fs.readdirSync(CONFIG.inputDir).filter(name => {
    const fullPath = path.join(CONFIG.inputDir, name);
    return fs.statSync(fullPath).isDirectory();
  });
  
  for (const characterName of characterDirs) {
    const charDir = path.join(CONFIG.inputDir, characterName);
    const files = fs.readdirSync(charDir).filter(f => 
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    );
    
    for (const file of files) {
      images.push({
        characterName,
        filename: file,
        inputPath: path.join(charDir, file),
        baseName: path.parse(file).name,
      });
    }
  }
  
  return images;
}

// 生成处理后的元数据
function generateMetadata(processedImages) {
  const metadata = processedImages.map((img, index) => {
    // 从文件名提取信息
    const match = img.baseName.match(/^(.+)-(\d+)$/);
    const characterId = match ? match[1] : img.characterName;
    const num = match ? match[2] : '1';
    
    // 查找原始元数据
    const originalMetadataPath = path.join(CONFIG.inputDir, 'metadata.json');
    let originalMeta = {};
    if (fs.existsSync(originalMetadataPath)) {
      const allMeta = JSON.parse(fs.readFileSync(originalMetadataPath, 'utf8'));
      originalMeta = allMeta.find(m => m.slug === img.baseName) || {};
    }
    
    return {
      id: index + 1,
      title: `${formatCharacterName(characterId)} Wallpaper ${num}`,
      slug: img.baseName,
      character_ids: [characterId],
      element: originalMeta.element || null,
      region: originalMeta.region || null,
      source: 'wallhaven',
      thumbnail_path: img.outputs.thumbnail,
      mobile_path: img.outputs.mobile,
      desktop_path: img.outputs.desktop,
      desktop_4k_path: img.outputs.desktop_4k,
      original_path: img.inputPath,
    };
  });
  
  const outputPath = path.join(CONFIG.outputDir, 'processed-metadata.json');
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  console.log(`\n📄 元数据已保存: ${outputPath}`);
  
  return metadata;
}

// 格式化角色名
function formatCharacterName(id) {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 主函数
async function main() {
  console.log('🖼️  壁纸处理脚本启动');
  console.log(`📁 输入目录: ${CONFIG.inputDir}`);
  console.log(`📁 输出目录: ${CONFIG.outputDir}`);
  
  ensureDir(CONFIG.outputDir);
  
  const images = getImagesToProcess();
  console.log(`\n📊 找到 ${images.length} 张图片待处理\n`);
  
  const processedImages = [];
  
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    console.log(`[${i + 1}/${images.length}] 处理 ${img.characterName}/${img.filename}`);
    
    try {
      const outputs = await processImage(img.inputPath, img.baseName, img.characterName);
      processedImages.push({
        ...img,
        outputs,
      });
      console.log(`  ✅ 完成`);
    } catch (error) {
      console.error(`  ❌ 失败: ${error.message}`);
    }
  }
  
  // 生成元数据
  generateMetadata(processedImages);
  
  console.log('\n✅ 处理完成!');
  console.log(`📊 成功处理: ${processedImages.length} 张`);
  console.log(`📁 输出位置: ${CONFIG.outputDir}`);
  console.log('\n下一步: 运行 node scripts/upload-to-r2.js 上传到 Cloudflare R2');
}

main().catch(console.error);
