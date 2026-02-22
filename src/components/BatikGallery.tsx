import React, { useState, useMemo } from 'react';
import { useBatikImages } from '../hooks/useBatikImages';

interface BatikItem {
  nama: string;
  directLink: string;
  thumbnailLink: string;
  kategori: string;
}

const BatikGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { images, loading } = useBatikImages();

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(images.map((img) => img.category)));
    return ['all', ...uniqueCategories];
  }, [images]);

  // Filter images based on category and search
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
      const matchesSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           img.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, images]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Galeri Batik Indonesia
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari batik..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Semua
          </button>
          {categories.slice(1).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.replace('batik-', '').replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center text-gray-500 mb-6">Memuat gambar batik lokal…</div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((item: any, index: number) => (
          <BatikCard key={index} item={{
            nama: item.name,
            directLink: item.url,
            thumbnailLink: item.thumbnailUrl,
            kategori: item.category
          }} />
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center text-gray-500 text-xl mt-12">
          Tidak ada gambar batik ditemukan
        </div>
      )}
    </div>
  );
};

const BatikCard: React.FC<{ item: BatikItem }> = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load image:', item.thumbnailLink, e);
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square bg-gray-200">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            <img
              src={item.thumbnailLink}
              alt={item.nama}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Gambar tidak dapat dimuat</p>
              <p className="text-xs mt-1">Periksa link Google Drive</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{item.nama}</h3>
        <p className="text-sm text-gray-600 capitalize">
          {item.kategori.replace('batik-', '').replace('-', ' ')}
        </p>
      </div>
    </div>
  );
};

export default BatikGallery;