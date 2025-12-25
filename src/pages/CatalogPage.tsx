import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Grid2X2 } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export const CatalogPage = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(batiks.map(b => b.category)));
    return ['All', ...uniqueCategories];
  }, []);
  const filteredBatiks = useMemo(() => {
    return batiks.filter(b => {
      const matchesFilter = filter === 'All' || b.category === filter;
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-16">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-foreground/5"
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Curated Heritage Archive</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tighter monochrome-gradient-text leading-tight"
          >
            Heritage Index.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
          >
            A digital repository of Javanese batik motifs, indexed by typology and provenance.
          </motion.p>
        </div>
        {/* Responsive Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-stretch lg:items-center justify-between py-6 border-y border-border/40">
          <div className="flex flex-wrap gap-2 justify-start items-center overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'default' : 'outline'}
                className={filter === cat
                  ? "bg-foreground text-background hover:bg-foreground/90 rounded-full px-4 md:px-5 h-8 md:h-9 text-[9px] md:text-[10px] font-black uppercase tracking-widest flex-shrink-0"
                  : "bg-transparent text-muted-foreground hover:text-foreground border-foreground/10 hover:border-foreground/30 rounded-full px-4 md:px-5 h-8 md:h-9 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex-shrink-0"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative group w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-foreground/5 border-border pl-11 pr-4 h-11 md:h-12 rounded-full font-medium placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-foreground/20 w-full"
              placeholder="Query archive..."
            />
          </div>
        </div>
        {/* Results Grid - 1-2-3 col layout */}
        {filteredBatiks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredBatiks.map((batik, idx) => (
              <motion.div
                key={batik.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <Link to={`/batik/${batik.id}`}>
                  <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card mb-4 md:mb-6 border-border group-hover:shadow-2xl transition-all duration-500">
                    <img
                      src={batik.imageUrl}
                      alt={batik.name}
                      className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-muted-foreground">Typology: {batik.category}</p>
                      <p className="text-sm md:text-base font-serif italic text-foreground leading-relaxed">"{batik.meaning.slice(0, 70)}..."</p>
                    </div>
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-1 px-2">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold transition-opacity">{batik.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-[1px] w-3 bg-muted-foreground/40" />
                      <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black">{batik.origin}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-2xl md:text-3xl font-serif font-bold opacity-30 mb-4">No matching motifs</p>
            <Button
              variant="link"
              onClick={() => {setFilter('All'); setSearchQuery('');}}
              className="text-foreground uppercase tracking-[0.3em] text-[10px] font-black"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};