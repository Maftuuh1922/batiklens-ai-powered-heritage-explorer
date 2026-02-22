# Upload Batik Images ke ImgBB

## Step 1: Daftar ImgBB (GRATIS - No Credit Card)

1. Buka https://imgbb.com/
2. Click **Sign Up** (bisa pakai Google account)
3. Setelah login, buka https://api.imgbb.com/
4. Copy **API Key** kamu

## Step 2: Install Dependencies

```bash
cd batiklens-ai-powered-heritage-explorer
npm install form-data node-fetch@2
```

## Step 3: Setup API Key

Buka file `scripts/upload-to-imgbb.js` dan ganti:
```javascript
const IMGBB_API_KEY = 'YOUR_API_KEY_HERE';
```

Dengan API key yang sudah kamu copy.

## Step 4: Run Upload Script

```bash
node scripts/upload-to-imgbb.js
```

Script akan:
- Upload semua 6,175 images
- Progress bar untuk setiap folder
- Save URLs ke `scripts/imgbb-urls.json`
- Auto rate limit (1 detik per image)
- Estimasi waktu: ~2 jam untuk semua images

## Step 5: Update batik-data.ts

Setelah upload selesai, jalankan:
```bash
node scripts/update-batik-data.js
```

Ini akan auto-update semua imageUrl di batik-data.ts dengan URLs dari ImgBB.

## Sudah Selesai! 🎉

Images sekarang hosted online dan akan muncul di production Vercel!
