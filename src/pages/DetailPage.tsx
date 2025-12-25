import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info, History, ArrowLeft, Heart } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
export function DetailPage() {
  const { id } = useParams();
  const batik = batiks.find(b => b.id === id);
  if (!batik) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">Motif Not Found</h2>
        <Link to="/catalog">
          <Button variant="link" className="text-foreground font-bold underline underline-offset-4">Back to Archive</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-24">
        <div className="mb-12 flex justify-between items-center">
          <Link to="/catalog" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Archive Index
          </Link>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border rounded-full">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-card shadow-2xl border-border"
          >
            <img src={batik.imageUrl} alt={batik.name} className="w-full h-full object-cover grayscale-[0.2]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="mb-12">
              <h1 className="text-6xl md:text-7xl font-serif font-bold monochrome-gradient-text mb-6">{batik.name}</h1>
              <div className="flex items-center gap-3 bg-foreground text-background w-fit px-6 py-2 rounded-full shadow-lg">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">{batik.origin}</span>
              </div>
            </div>
            <div className="flex-grow space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-foreground/70">
                  <Info className="w-5 h-5" />
                  <h3 className="font-bold uppercase text-[10px] tracking-[0.3em]">Interpretation</h3>
                </div>
                <p className="text-foreground leading-relaxed text-2xl font-serif italic border-l-2 border-border pl-8">
                  "{batik.meaning}"
                </p>
              </section>
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-foreground/70">
                  <History className="w-5 h-5" />
                  <h3 className="font-bold uppercase text-[10px] tracking-[0.3em]">Chronology</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {batik.history}
                </p>
              </section>
            </div>
            <div className="mt-16 pt-8 border-t border-border/40">
              <Link to="/scan">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 py-8 text-xs font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-foreground/5">
                  Analyze Custom Sample
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}