import { useState, useEffect } from 'react';
import batikLocalData from '../lib/batik-local-data.json';

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

        // Load from local JSON (batik-local-data.json)
        console.log('Loading batik images from local data...');
        
        const localImages: BatikImage[] = (batikLocalData as any[]).map((item: any) => ({
          id: item.id,
          url: item.directLink,
          thumbnailUrl: item.thumbnailLink,
          name: item.nama,
          category: item.kategori
        }));

        console.log(`Loaded ${localImages.length} local batik images`);
        setImages(localImages);
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