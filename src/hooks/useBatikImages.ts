import { useState, useEffect } from 'react';
import { GoogleDriveService, imageUtils } from '../lib/googleDrive';

export interface BatikImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  name: string;
  category: string;
}

export const useBatikImages = () => {
  const [images, setImages] = useState<BatikImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBatikImages = async () => {
      try {
        setLoading(true);

        // Google Drive folder ID dari link yang diberikan user
        const folderId = '19SaEgW7yPcsJTSAwsSBajBdsmHQrbItB';

        // Untuk demo, kita buat list gambar manual dari Google Drive
        // Dalam kasus nyata, Anda bisa menggunakan Google Drive API
        const batikCategories = [
          'batik-aceh',
          'batik-bali',
          'batik-betawi',
          'batik-celup',
          'batik-ciamis',
          'batik-jakarta',
          'batik-kawung',
          'batik-lasem',
          'batik-madura',
          'batik-megamendung',
          'batik-parang',
          'batik-pekalongan',
          'batik-sogan',
          'batik-solo',
          'batik-sulawesi',
          'batik-sumatera',
          'batik-yogyakarta'
        ];

        // Sample images - ganti dengan file ID yang sebenarnya dari Google Drive Anda
        const sampleImageIds = [
          '1abc123def456', // Ganti dengan file ID asli
          '2def456ghi789', // Ganti dengan file ID asli
          '3ghi789jkl012', // Ganti dengan file ID asli
          // Tambahkan lebih banyak file ID
        ];

        const batikImages: BatikImage[] = [];

        // Generate sample data untuk setiap kategori
        batikCategories.forEach((category, categoryIndex) => {
          sampleImageIds.forEach((imageId, imageIndex) => {
            const sharingLink = `https://drive.google.com/file/d/${imageId}/view?usp=sharing`;
            batikImages.push({
              id: `${category}-${imageIndex}`,
              url: imageUtils.getViewableImageUrl(sharingLink),
              thumbnailUrl: imageUtils.getThumbnailUrl(sharingLink),
              name: `${category.replace('batik-', '').replace('-', ' ').toUpperCase()} ${imageIndex + 1}`,
              category: category
            });
          });
        });

        setImages(batikImages);
        setError(null);
      } catch (err) {
        setError('Failed to load batik images');
        console.error('Error loading batik images:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBatikImages();
  }, []);

  const getImagesByCategory = (category: string): BatikImage[] => {
    return images.filter(img => img.category === category);
  };

  const searchImages = (query: string): BatikImage[] => {
    const lowercaseQuery = query.toLowerCase();
    return images.filter(img =>
      img.name.toLowerCase().includes(lowercaseQuery) ||
      img.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    images,
    loading,
    error,
    getImagesByCategory,
    searchImages,
    categories: [...new Set(images.map(img => img.category))]
  };
};