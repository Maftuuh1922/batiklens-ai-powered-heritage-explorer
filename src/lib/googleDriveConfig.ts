// Script to help extract Google Drive file IDs
// Run this in browser console on your Google Drive folder page

export const extractGoogleDriveFileIds = () => {
  // Instructions for user:
  console.log(`
📋 CARA MENDAPATKAN FILE IDs DARI GOOGLE DRIVE:

1. Buka folder Google Drive Anda: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
2. Tekan F12 untuk buka Developer Tools
3. Buka tab Console
4. Copy dan paste kode berikut:

// Script untuk extract file IDs
const fileIds = [];
document.querySelectorAll('div[data-target="doc"]').forEach(div => {
  const link = div.querySelector('a');
  if (link && link.href.includes('/file/d/')) {
    const match = link.href.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      fileIds.push(match[1]);
    }
  }
});
console.log('File IDs:', fileIds);
copy(fileIds.join('\\n'));

5. File IDs akan di-copy ke clipboard Anda
6. Paste ke file konfigurasi aplikasi
  `);
};

export const sampleFileIds = [
  // Menggunakan folder ID yang diberikan user
  // Format: https://drive.google.com/drive/folders/19SaEgW7yPcsJTSAwsSBajBdsmHQrbItB
];

export const googleDriveConfig = {
  folderId: '19SaEgW7yPcsJTSAwsSBajBdsmHQrbItB',
  folderUrl: 'https://drive.google.com/drive/folders/19SaEgW7yPcsJTSAwsSBajBdsmHQrbItB',
  apiKey: process.env.VITE_GOOGLE_DRIVE_API_KEY || '', // Optional: for advanced features
};