import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Grid2X2 } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function CatalogPage() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Memoize categories to prevent re-calculation on every render
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(batiks.map(b => b.category)));
    return ['All', ...uniqueCategories];
  }, []);
  // Memoize filtered results for performance and stability
  const filteredBatiks = useMemo(() => {
    return batiks.filter(b => {
      const matchesFilter = filter === 'All' || b.category === filter;
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-border bg-foreground/5"
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Curated Heritage Archive</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter monochrome-gradient-text"
          >
            Heritage Index.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A digital repository of Indonesian batik motifs, indexed by typology, spiritual weight, and regional provenance.
          </motion.p>
        </div>
        {/* Static Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between py-6 border-y border-border/40">
          <div className="flex flex-wrap gap-2 justify-start items-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'default' : 'outline'}
                className={filter === cat
                  ? "bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 h-9 text-[10px] font-black uppercase tracking-widest transition-all"
                  : "bg-transparent text-muted-foreground hover:text-foreground border-foreground/10 hover:border-foreground/30 rounded-full px-5 h-9 text-[10px] font-bold uppercase tracking-widest transition-all"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full lg:w-72 max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-foreground/5 border-border pl-10 pr-4 h-11 rounded-full font-medium placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-foreground/20 w-full"
              placeholder="Query motif name..."
            />
          </div>
        </div>
        {/* Results Grid */}
        {filteredBatiks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredBatiks.map((batik, idx) => (
              <motion.div
                key={batik.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="group"
              >
                <Link to={`/batik/${batik.id}`}>
                  <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card mb-4 md:mb-6 border-border shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <img
                      src={batik.imageUrl}
                      alt={batik.name}
                      className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 md:p-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-4 text-muted-foreground">Typology: {batik.category}</p>
                      <p className="text-base md:text-lg font-serif italic text-foreground leading-relaxed">"{batik.meaning.slice(0, 80)}..."</p>
                    </div>
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-foreground text-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
                  <div className="space-y-1 px-2 md:px-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold group-hover:opacity-70 transition-opacity">{batik.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-[1px] w-3 md:w-4 bg-muted-foreground/40" />
                      <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black">{batik.origin}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <p className="text-3xl md:text-4xl font-serif font-bold opacity-20">No matching motifs found</p>
            <Button 
              variant="link" 
              onClick={() => {setFilter('All'); setSearchQuery('');}} 
              className="text-foreground uppercase tracking-widest text-[10px] font-black"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}