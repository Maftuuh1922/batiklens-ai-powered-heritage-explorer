import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Grid2X2 } from 'lucide-react';
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
      <div className="py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-1 rounded-full border border-border bg-foreground/5"
          >
            <Grid2X2 className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Curated Heritage Archive</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-serif font-bold tracking-tighter monochrome-gradient-text"
          >
            Heritage Index.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A digital repository of Indonesian batik motifs, indexed by typology, spiritual weight, and regional provenance.
          </motion.p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between sticky top-24 z-30 py-4 bg-background/50 backdrop-blur-xl border-y border-border/40">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'default' : 'ghost'}
                className={`rounded-full px-8 h-10 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  filter === cat ? 'bg-foreground text-background shadow-lg shadow-foreground/10' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <Input 
              className="bg-foreground/5 border-border pl-12 h-12 rounded-full font-medium placeholder:text-muted-foreground/50 focus:ring-foreground/20" 
              placeholder="Query motif name..." 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredBatiks.map((batik, idx) => (
            <motion.div
              key={batik.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <Link to={`/batik/${batik.id}`}>
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden glass-card mb-6 border-border shadow-lg group-hover:shadow-2xl group-hover:shadow-black/10 dark:group-hover:shadow-white/5 transition-all duration-500">
                  <img
                    src={batik.imageUrl}
                    alt={batik.name}
                    className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-muted-foreground">Typology: {batik.category}</p>
                    <p className="text-lg font-serif italic text-foreground leading-relaxed">"{batik.meaning.slice(0, 80)}..."</p>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-2 px-4">
                  <h3 className="text-3xl font-serif font-bold group-hover:opacity-70 transition-opacity">{batik.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-[1px] w-4 bg-muted-foreground/40" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black">{batik.origin}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}