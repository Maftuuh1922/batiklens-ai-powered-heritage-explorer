import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Shirt, Sparkles } from 'lucide-react';

interface UsageImage {
  url: string;
  caption: string;
  category: string;
}

interface UsageCarouselProps {
  modernImages: UsageImage[];
  traditionalImages: UsageImage[];
}

export const UsageCarousel: React.FC<UsageCarouselProps> = ({ modernImages, traditionalImages }) => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'modern'>('traditional');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = activeTab === 'traditional' ? traditionalImages : modernImages;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <Camera className="w-6 h-6 text-indigo-500" />
          <h3 className="text-3xl font-serif font-bold text-foreground">
            🎭 From Palace to Runway
          </h3>
          <Sparkles className="w-6 h-6 text-amber-500" />
        </div>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover how batik motifs have evolved from royal ceremonies to modern fashion statements
        </p>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-muted rounded-full p-1 shadow-lg">
          <button
            onClick={() => setActiveTab('traditional')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'traditional' 
                ? 'bg-primary text-white shadow-xl scale-105' 
                : 'text-muted-foreground hover:bg-background'
            }`}
          >
            <span className="flex items-center gap-2">
              <Shirt className="w-4 h-4" />
              Traditional
            </span>
          </button>
          <button
            onClick={() => setActiveTab('modern')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'modern' 
                ? 'bg-accent text-white shadow-xl scale-105' 
                : 'text-muted-foreground hover:bg-background'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Modern
            </span>
          </button>
        </div>
      </div>

      {/* Simple Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Image Display */}
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full"
          >
            <img 
              src={images[currentImageIndex].url} 
              alt={images[currentImageIndex].caption} 
              className="w-full h-96 object-cover" 
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Category Badge */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 ${
                    activeTab === 'traditional' 
                      ? 'bg-amber-600' 
                      : 'bg-indigo-600'
                  }`}
                >
                  {images[currentImageIndex].category}
                </motion.span>
                
                {/* Caption */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl font-medium leading-relaxed"
                >
                  {images[currentImageIndex].caption}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 z-10"
          >
            <span className="text-2xl">‹</span>
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 z-10"
          >
            <span className="text-2xl">›</span>
          </button>
        </div>

        {/* Image Counter */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {activeTab === 'traditional' ? 'Traditional' : 'Modern'} Usage ({images.length} images)
          </p>
        </div>
      </motion.div>
    </div>
  );
};
