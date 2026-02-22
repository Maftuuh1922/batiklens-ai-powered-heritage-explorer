/**
 * Script untuk copy gambar batik lokal dari Dataset_Batik_Asli ke public/batik-images
 * dan generate JSON data untuk gallery
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATASET_PATH = 'C:\\Users\\Administrator\\proyek2\\Dataset_Batik_Asli';
const PUBLIC_IMAGES_PATH = path.join(__dirname, '..', 'public', 'batik-images');
const OUTPUT_JSON = path.join(__dirname, '..', 'src', 'lib', 'batik-local-data.json');

// Jumlah gambar per kategori yang akan dicopy (untuk performa)
const IMAGES_PER_CATEGORY = 5;

// Mapping folder name ke kategori display name
const categoryMapping = {
  'batik-aceh': 'Batik Aceh',
  'batik-bali': 'Batik Bali',
  'batik-bali_barong': 'Batik Bali Barong',
  'batik-bali_merak': 'Batik Bali Merak',
  'batik-betawi': 'Batik Betawi',
  'batik-celup': 'Batik Celup',
  'batik-cendrawasih': 'Batik Cendrawasih',
  'batik-ceplok': 'Batik Ceplok',
  'batik-ciamis': 'Batik Ciamis',
  'batik-corak_insang': 'Batik Corak Insang',
  'batik-garutan': 'Batik Garutan',
  'batik-gentongan': 'Batik Gentongan',
  'batik-ikat_celup': 'Batik Ikat Celup',
  'batik-jakarta_ondel_ondel': 'Batik Jakarta Ondel-Ondel',
  'batik-jawa_barat_megamendung': 'Batik Jawa Barat Megamendung',
  'batik-jawa_timur_pring': 'Batik Jawa Timur Pring',
  'batik-kalimantan_dayak': 'Batik Kalimantan Dayak',
  'batik-kawung': 'Batik Kawung',
  'batik-keraton': 'Batik Keraton',
  'batik-lampung_gajah': 'Batik Lampung Gajah',
  'batik-lasem': 'Batik Lasem',
  'batik-madura_mataketeran': 'Batik Madura Mataketeran',
  'batik-maluku_pala': 'Batik Maluku Pala',
  'batik-megamendung': 'Batik Megamendung',
  'batik-ntb_lumbung': 'Batik NTB Lumbung',
  'batik-papua_asmat': 'Batik Papua Asmat',
  'batik-papua_cendrawasih': 'Batik Papua Cendrawasih',
  'batik-papua_tifa': 'Batik Papua Tifa',
  'batik-parang': 'Batik Parang',
  'batik-pekalongan': 'Batik Pekalongan',
  'batik-priangan': 'Batik Priangan',
  'batik-sekar': 'Batik Sekar',
  'batik-sidoluhur': 'Batik Sidoluhur',
  'batik-sidomukti': 'Batik Sidomukti',
  'batik-sogan': 'Batik Sogan',
  'batik-solo_parang': 'Batik Solo Parang',
  'batik-sulawesi_selatan_lontara': 'Batik Sulawesi Selatan Lontara',
  'batik-sumatera_barat_rumah_minang': 'Batik Sumatera Barat Rumah Minang',
  'batik-sumatera_utara_boraspati': 'Batik Sumatera Utara Boraspati',
  'batik-tambal': 'Batik Tambal',
  'batik-yogyakarta_kawung': 'Batik Yogyakarta Kawung',
  'batik-yogyakarta_parang': 'Batik Yogyakarta Parang'
};

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

function copyImages() {
  console.log('🚀 Starting to copy batik images...\n');

  // Buat folder public/batik-images
  ensureDirectoryExists(PUBLIC_IMAGES_PATH);

  const allBatikData = [];
  const categories = Object.keys(categoryMapping);

  categories.forEach((categoryFolder) => {
    const sourcePath = path.join(DATASET_PATH, categoryFolder);

    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Folder tidak ditemukan: ${categoryFolder}`);
      return;
    }

    // Baca semua file di folder kategori
    const files = fs.readdirSync(sourcePath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .slice(0, IMAGES_PER_CATEGORY); // Ambil N gambar pertama

    console.log(`📂 ${categoryFolder}: found ${files.length} images`);

    // Buat subfolder untuk kategori
    const categoryPublicPath = path.join(PUBLIC_IMAGES_PATH, categoryFolder);
    ensureDirectoryExists(categoryPublicPath);

    files.forEach((file, index) => {
      const sourceFile = path.join(sourcePath, file);
      const destFile = path.join(categoryPublicPath, file);

      // Copy file
      fs.copyFileSync(sourceFile, destFile);

      // Tambahkan ke data JSON
      const webPath = `/batik-images/${categoryFolder}/${file}`;
      allBatikData.push({
        id: `${categoryFolder}-${index + 1}`,
        nama: `${categoryMapping[categoryFolder]} ${index + 1}`,
        directLink: webPath,
        thumbnailLink: webPath,
        kategori: categoryFolder,
        fileName: file
      });
    });

    console.log(`   ✅ Copied ${files.length} images to ${categoryFolder}`);
  });

  // Tulis JSON data
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(allBatikData, null, 2), 'utf-8');
  console.log(`\n✅ Generated JSON data: ${OUTPUT_JSON}`);
  console.log(`📊 Total images: ${allBatikData.length}`);
  console.log(`📁 Total categories: ${categories.length}`);
  console.log('\n🎉 Done! Images copied successfully.');
}

// Jalankan script
try {
  copyImages();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
