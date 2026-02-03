import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read page URLs
const urlsFile = path.join(__dirname, 'imgbb-urls.txt');
const pageUrls = fs.readFileSync(urlsFile, 'utf-8')
  .split('\n')
  .map(url => url.trim().replace('ibb.co.com', 'ibb.co'))
  .filter(url => url.length > 0);

console.log(`🔍 Fetching direct image URLs for ${pageUrls.length} images...`);

const directUrls = [];

for (let i = 0; i < pageUrls.length; i++) {
  const pageUrl = pageUrls[i];
  console.log(`  [${i + 1}/${pageUrls.length}] Fetching: ${pageUrl}`);
  
  try {
    const response = await fetch(pageUrl);
    const html = await response.text();
    
    // Extract direct image URL from HTML
    // Look for og:image meta tag or data-image-url
    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    const dataImageMatch = html.match(/data-image-url="([^"]+)"/);
    
    let directUrl = null;
    if (ogImageMatch) {
      directUrl = ogImageMatch[1];
    } else if (dataImageMatch) {
      directUrl = dataImageMatch[1];
    } else {
      // Try to find any i.ibb.co URL
      const ibbMatch = html.match(/https:\/\/i\.ibb\.co\/[^"'\s]+/);
      if (ibbMatch) {
        directUrl = ibbMatch[0];
      }
    }
    
    if (directUrl) {
      directUrls.push(directUrl);
      console.log(`    ✅ ${directUrl}`);
    } else {
      console.log(`    ❌ Could not find direct URL`);
      directUrls.push(pageUrl); // Fallback to page URL
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.log(`    ❌ Error: ${error.message}`);
    directUrls.push(pageUrl); // Fallback to page URL
  }
}

// Save direct URLs
const outputFile = path.join(__dirname, 'imgbb-direct-urls.txt');
fs.writeFileSync(outputFile, directUrls.join('\n'), 'utf-8');

console.log(`\n✅ Saved ${directUrls.length} direct URLs to: ${outputFile}`);
