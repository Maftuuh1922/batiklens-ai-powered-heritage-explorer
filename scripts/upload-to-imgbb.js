import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMGBB API KEY - Daftar di: https://api.imgbb.com/
const IMGBB_API_KEY = '9ca1fbf2a622925a26367eca37db5a72';

const DATASET_PATH = path.join(__dirname, '..', 'public', 'batik-images');
const OUTPUT_FILE = path.join(__dirname, 'imgbb-urls.json');

// Function to upload single image to ImgBB
async function uploadToImgBB(imagePath, imageName, retries = 3) {
  try {
    // Check file size (ImgBB max: 32MB)
    const stats = fs.statSync(imagePath);
    const fileSizeMB = stats.size / (1024 * 1024);
    
    if (fileSizeMB > 32) {
      return { 
        success: false, 
        error: `File too large: ${fileSizeMB.toFixed(2)}MB (max 32MB)` 
      };
    }
    
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', base64Image);
    formData.append('name', imageName);
    
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        url: data.data.url,
        display_url: data.data.display_url,
        delete_url: data.data.delete_url
      };
    } else {
      // Detailed error logging
      const errorMsg = data.error?.message || JSON.stringify(data.error) || 'Unknown error';
      const statusCode = data.status_code || response.status;
      return { 
        success: false, 
        error: `${errorMsg} (Status: ${statusCode})`,
        raw_error: data.error
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: `Network error: ${error.message}`,
      stack: error.stack
    };
  }
}

// Function to process all images
async function uploadAllImages() {
  const results = {};
  let successCount = 0;
  let errorCount = 0;
  
  const folders = fs.readdirSync(DATASET_PATH);
  
  console.log(`🚀 Starting upload of images from ${folders.length} categories...`);
  
  for (const folder of folders) {
    const folderPath = path.join(DATASET_PATH, folder);
    
    if (!fs.statSync(folderPath).isDirectory()) continue;
    
    console.log(`\n📁 Processing folder: ${folder}`);
    results[folder] = [];
    
    const images = fs.readdirSync(folderPath).filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    for (let i = 0; i < images.length; i++) {
      const imageName = images[i];
      const imagePath = path.join(folderPath, imageName);
      
      console.log(`  ⬆️  Uploading ${i + 1}/${images.length}: ${imageName}`);
      
      const result = await uploadToImgBB(imagePath, `${folder}-${imageName}`);
      
      if (result.success) {
        results[folder].push({
          original: imageName,
          url: result.display_url
        });
        successCount++;
        console.log(`  ✅ Success: ${result.display_url}`);
      } else {
        errorCount++;
        console.log(`  ❌ Error: ${result.error}`);
        
        // Log to error file for debugging
        const errorLog = {
          folder,
          image: imageName,
          error: result.error,
          raw_error: result.raw_error,
          timestamp: new Date().toISOString()
        };
        fs.appendFileSync(
          path.join(__dirname, 'upload-errors.log'),
          JSON.stringify(errorLog) + '\n'
        );
      }
      
      // Rate limit: wait 1 second between uploads
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Save results to JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  
  console.log('\n\n✨ Upload Complete!');
  console.log(`✅ Success: ${successCount} images`);
  console.log(`❌ Errors: ${errorCount} images`);
  console.log(`📄 Results saved to: ${OUTPUT_FILE}`);
}

// Run the upload
uploadAllImages().catch(console.error);
