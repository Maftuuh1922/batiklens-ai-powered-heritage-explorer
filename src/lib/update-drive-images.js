// Script untuk mengambil file ID dari Google Drive folder
// Run this in browser console di Google Drive folder page

function extractDriveImages() {
  const folderId = '19SaEgW7yPcsJTSAwsSBajBdsmHQrbItB';
  const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;
  
  console.log('Buka folder ini di browser:', folderUrl);
  console.log('\nLalu jalankan script ini di browser console:');
  console.log(`
// Script untuk dijalankan di console browser di halaman Google Drive folder
function getDriveImages() {
  const images = [];
  
  // Cari semua file gambar di halaman
  const fileElements = document.querySelectorAll('[data-id]');
  
  fileElements.forEach((element, index) => {
    const dataId = element.getAttribute('data-id');
    const fileName = element.querySelector('[data-tooltip]')?.textContent || element.textContent || \`Image \${index + 1}\`;
    
    if (dataId && (fileName.includes('.jpg') || fileName.includes('.jpeg') || fileName.includes('.png') || fileName.includes('.webp'))) {
      images.push({
        id: dataId,
        name: fileName,
        directLink: \`https://drive.google.com/uc?export=view&id=\${dataId}\`,
        thumbnailLink: \`https://drive.google.com/thumbnail?id=\${dataId}&sz=s400\`
      });
    }
  });
  
  console.log('Found images:', images);
  console.log('Copy this JSON:', JSON.stringify(images, null, 2));
  return images;
}

getDriveImages();
  `);
}

extractDriveImages();