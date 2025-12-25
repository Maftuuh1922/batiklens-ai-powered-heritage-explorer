import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Search, ArrowUpRight } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function CatalogPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(batiks.map(b => b.category)))];
  const filteredBatiks = filter === 'All' 
    ? batiks 
    : batiks.filter(b => b.category === filter);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        <div className="space-y-6 mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold">Heritage Catalog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Explore the rich tapestry of Indonesian motifs, categorized by region and cultural significance.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'default' : 'ghost'}
                className={`rounded-full px-6 ${filter === cat ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="bg-accent/30 border-white/10 pl-10 rounded-full" placeholder="Search motif name..." />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBatiks.map((batik, idx) => (
            <motion.div
              key={batik.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/batik/${batik.id}`}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card mb-4">
                  <img 
                    src={batik.imageUrl} 
                    alt={batik.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <p className="text-sm text-white/80 line-clamp-3 italic">"{batik.meaning.slice(0, 100)}..."</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-secondary/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-secondary-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold group-hover:text-secondary transition-colors">{batik.name}</h3>
                  <p className="text-xs text-secondary uppercase tracking-widest font-medium">{batik.origin}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}