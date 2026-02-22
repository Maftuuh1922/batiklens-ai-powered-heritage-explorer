// Script Helper untuk Update File IDs Google Drive
// Jalankan di browser console di folder Google Drive Anda

export const updateBatikDataScript = `
// 1. Buka folder Google Drive: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
// 2. Tekan F12 → Console
// 3. Paste kode berikut:

const fileData = [];
document.querySelectorAll('div[data-target="doc"]').forEach(div => {
  const link = div.querySelector('a');
  if (link && link.href.includes('/file/d/')) {
    const match = link.href.match(/\\/file\\/d\\/([a-zA-Z0-9-_]+)/);
    if (match) {
      const fileId = match[1];
      const fileName = link.querySelector('div[aria-label]')?.ariaLabel ||
                      link.textContent?.trim() || 'Unknown';

      fileData.push({
        nama: fileName,
        directLink: \`https://drive.google.com/uc?export=view&id=\${fileId}\`,
        thumbnailLink: \`https://drive.google.com/thumbnail?id=\${fileId}&sz=s300\`,
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

// 4. Paste hasilnya ke file: src/lib/batik-drive-data.json
`;

console.log('📋 INSTRUKSI UPDATE DATA GOOGLE DRIVE:');
console.log('');
console.log('1. Buka folder Google Drive Anda di browser');
console.log('2. Tekan F12 → buka Console');
console.log('3. Copy dan paste script di atas');
console.log('4. Jalankan script tersebut');
console.log('5. Data JSON akan otomatis di-copy ke clipboard');
console.log('6. Replace isi file src/lib/batik-drive-data.json dengan data tersebut');
console.log('');
console.log('Script lengkap:');
console.log(updateBatikDataScript);