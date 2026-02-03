import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMGBB_URLS_FILE = path.join(__dirname, 'imgbb-urls.json');
const BATIK_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'batik-data.ts');

console.log('📝 Updating batik-data.ts with ImgBB URLs...\n');

// Read ImgBB URLs
const imgbbData = JSON.parse(fs.readFileSync(IMGBB_URLS_FILE, 'utf8'));

// Create URL mapping
const urlMapping = {};
let totalImages = 0;

for (const [folder, images] of Object.entries(imgbbData)) {
  if (!Array.isArray(images) || images.length === 0) continue;
  
  // Use first 5 images from each category for gallery
  const galleryImages = images.slice(0, 5).map(img => img.url);
  
  // Map folder name to batik type (remove 'batik-' prefix)
  const batikType = folder.replace('batik-', '');
  urlMapping[batikType] = galleryImages;
  totalImages += galleryImages.length;
  
  console.log(`✅ ${folder}: ${galleryImages.length} images`);
}

console.log(`\n📊 Total: ${totalImages} images from ${Object.keys(urlMapping).length} categories`);

// Read current batik-data.ts
let batikDataContent = fs.readFileSync(BATIK_DATA_FILE, 'utf8');

// Update imageUrl for each batik type
let updatedCount = 0;

for (const [type, urls] of Object.entries(urlMapping)) {
  // Find pattern like: imageUrl: '/batik-images/batik-TYPE/...'
  // Replace with first ImgBB URL
  const patterns = [
    new RegExp(`(id:\\s*'${type}'[\\s\\S]*?imageUrl:\\s*)'[^']*'`, 'g'),
    new RegExp(`(id:\\s*"${type}"[\\s\\S]*?imageUrl:\\s*)"[^"]*"`, 'g'),
  ];
  
  for (const pattern of patterns) {
    if (batikDataContent.match(pattern)) {
      batikDataContent = batikDataContent.replace(
        pattern,
        `$1'${urls[0]}'`
      );
      updatedCount++;
      console.log(`✏️  Updated: ${type}`);
      break;
    }
  }
}

// Write updated content
fs.writeFileSync(BATIK_DATA_FILE, batikDataContent, 'utf8');

console.log(`\n✨ Update complete!`);
console.log(`📝 Updated ${updatedCount} batik entries`);
console.log(`📄 File: ${BATIK_DATA_FILE}`);
console.log(`\n🚀 Ready to deploy!`);
