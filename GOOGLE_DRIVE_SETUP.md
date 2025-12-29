# Google Drive Integration Setup

## 📁 Menggunakan Gambar dari Google Drive

Aplikasi ini dapat menampilkan gambar batik langsung dari Google Drive Anda tanpa perlu hosting tambahan.

### 🚀 Langkah Setup Lengkap:

#### 1. **Persiapan Google Drive**
- Buat folder baru di Google Drive atau gunakan folder existing
- Upload semua gambar batik ke folder tersebut
- **PENTING**: Set folder permission ke **"Anyone with the link can view"**
- Copy link sharing folder: `https://drive.google.com/drive/folders/FOLDER_ID_HERE?usp=sharing`

#### 2. **Extract File IDs dari Google Drive**
Buka folder Google Drive di browser, lalu:

1. **Tekan F12** → **Console**
2. **Copy & Paste** script berikut:

```javascript
const fileData = [];
document.querySelectorAll('div[data-target="doc"]').forEach(div => {
  const link = div.querySelector('a');
  if (link && link.href.includes('/file/d/')) {
    const match = link.href.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      const fileId = match[1];
      const fileName = link.querySelector('div[aria-label]')?.ariaLabel ||
                      link.textContent?.trim() || 'Unknown';

      fileData.push({
        nama: fileName,
        directLink: `https://drive.google.com/uc?export=view&id=${fileId}`,
        thumbnailLink: `https://drive.google.com/thumbnail?id=${fileId}&sz=s300`,
        kategori: 'batik-' + (fileName.toLowerCase().includes('aceh') ? 'aceh' :
                  fileName.toLowerCase().includes('bali') ? 'bali' :
                  fileName.toLowerCase().includes('betawi') ? 'betawi' :
                  fileName.toLowerCase().includes('celup') ? 'celup' :
                  fileName.toLowerCase().includes('ciamis') ? 'ciamis' :
                  fileName.toLowerCase().includes('kawung') ? 'kawung' :
                  fileName.toLowerCase().includes('lasem') ? 'lasem' :
                  fileName.toLowerCase().includes('madura') ? 'madura' :
                  fileName.toLowerCase().includes('megamendung') ? 'megamendung' :
                  fileName.toLowerCase().includes('parang') ? 'parang' :
                  fileName.toLowerCase().includes('pekalongan') ? 'pekalongan' :
                  fileName.toLowerCase().includes('sogan') ? 'sogan' :
                  fileName.toLowerCase().includes('solo') ? 'solo' :
                  fileName.toLowerCase().includes('sulawesi') ? 'sulawesi' :
                  fileName.toLowerCase().includes('sumatera') ? 'sumatera' :
                  fileName.toLowerCase().includes('yogyakarta') ? 'yogyakarta' : 'unknown')
      });
    }
  }
});

console.log('Extracted file data:', fileData);
console.log('JSON format:', JSON.stringify(fileData, null, 2));
copy(JSON.stringify(fileData, null, 2));
console.log('✅ Data berhasil di-copy ke clipboard!');
```

3. **Tekan Enter** untuk menjalankan
4. **Data JSON otomatis tercopy** ke clipboard

#### 3. **Update File Data**
1. Buka file: `src/lib/batik-drive-data.json`
2. **Replace semua isi** dengan data yang di-copy dari clipboard
3. **Save file**

#### 4. **Test Aplikasi**
```bash
npm run dev
```

Kunjungi: `http://localhost:3000/gallery`

### 📊 Format Data JSON:

```json
[
  {
    "nama": "Batik Aceh Motif 1",
    "directLink": "https://drive.google.com/uc?export=view&id=1abc123def456",
    "thumbnailLink": "https://drive.google.com/thumbnail?id=1abc123def456&sz=s300",
    "kategori": "batik-aceh"
  }
]
```

### 🔧 Fitur Yang Tersedia:

- ✅ **Gratis unlimited storage** - Menggunakan Google Drive Anda
- ✅ **Auto-categorization** - Berdasarkan nama file
- ✅ **Thumbnail support** - Loading cepat
- ✅ **Search & Filter** - Cari berdasarkan kategori
- ✅ **Responsive** - Tampil bagus di semua device
- ✅ **Error handling** - Fallback jika gambar gagal load

### 🎯 Kategori Yang Didukung:

- `batik-aceh`
- `batik-bali`
- `batik-betawi`
- `batik-celup`
- `batik-ciamis`
- `batik-kawung`
- `batik-lasem`
- `batik-madura`
- `batik-megamendung`
- `batik-parang`
- `batik-pekalongan`
- `batik-sogan`
- `batik-solo`
- `batik-sulawesi`
- `batik-sumatera`
- `batik-yogyakarta`

### 🆘 Troubleshooting:

**Gambar tidak muncul?**
- Pastikan folder Google Drive **public** (anyone with link can view)
- Check file permission individual gambar
- Buka direct link di browser untuk test

**Kategori salah?**
- Rename file gambar dengan kata kunci kategori
- Contoh: `batik-aceh-motif-1.jpg`

**Loading lambat?**
- Thumbnail akan load lebih cepat
- Kompres gambar sebelum upload
- Limit gambar per halaman

**Error CORS?**
- Google Drive mendukung hotlinking
- Jika bermasalah, gunakan imgur atau hosting lain

### 🎉 Demo Preview:

```
📱 Mobile & Desktop responsive
🔍 Real-time search
🏷️ Category filtering
🖼️ High-quality image display
⚡ Fast thumbnail loading
🔄 Auto-categorization
```

---

**🚀 Sekarang galeri batik Anda hosted di Google Drive dengan unlimited storage!**