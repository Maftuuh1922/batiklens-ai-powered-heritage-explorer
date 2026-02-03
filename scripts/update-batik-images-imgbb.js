import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read URLs from file
const urlsFile = path.join(__dirname, 'imgbb-urls.txt');
const urls = fs.readFileSync(urlsFile, 'utf-8')
  .split('\n')
  .map(url => url.trim())
  .filter(url => url.length > 0);

console.log(`📸 Found ${urls.length} ImgBB URLs`);

// Read batik-data.ts
const batikDataPath = path.join(__dirname, '..', 'src', 'lib', 'batik-data.ts');
let batikDataContent = fs.readFileSync(batikDataPath, 'utf-8');

// Convert page URL to direct image URL
// https://ibb.co/ABC123 -> akan di-replace dengan URL page yang redirect ke gambar
const imageUrls = urls.map(url => {
  // Ambil code dari URL
  const code = url.split('/').pop();
  // Return URL page (ImgBB akan handle redirect ke gambar)
  return url.replace('ibb.co.com', 'ibb.co');
});

console.log(`🔄 Updating batik-data.ts with ImgBB URLs...`);

// Replace local paths dengan ImgBB URLs
let urlIndex = 0;
let updateCount = 0;

// Pattern untuk match imageUrl
const pattern = /imageUrl: '\/batik-images\/[^']+'/g;

batikDataContent = batikDataContent.replace(pattern, (match) => {
  if (urlIndex < imageUrls.length) {
    const newUrl = imageUrls[urlIndex];
    urlIndex++;
    updateCount++;
    return `imageUrl: '${newUrl}'`;
  }
  return match;
});

// Write updated content
fs.writeFileSync(batikDataPath, batikDataContent, 'utf-8');

console.log(`✅ Updated ${updateCount} image URLs in batik-data.ts`);
console.log(`📝 File saved: ${batikDataPath}`);
