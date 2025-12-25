import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info, History, ArrowLeft, Share2, CornerDownRight } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export function ResultPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const batik = batiks.find(b => b.id === id);
  if (!batik) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">Dossier Missing</h2>
        <Link to="/scan">
          <Button variant="link" className="text-foreground font-bold underline underline-offset-4">Restart Scanner</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-16 md:py-24">
        <div className="mb-16">
          <Link to="/scan" className="group text-muted-foreground hover:text-foreground flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            New Analysis
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden glass-card border-border shadow-2xl">
              <img src={batik.imageUrl} alt={batik.name} className="w-full h-full object-cover grayscale-[0.2]" />
              <div className="absolute top-8 left-8">
                <Badge className="bg-foreground text-background font-black text-[10px] uppercase tracking-widest px-5 py-2 rounded-full border-none shadow-xl">
                  Match Integrity: 98.4%
                </Badge>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 rounded-2xl border-border hover:bg-foreground hover:text-background py-8 text-sm font-bold uppercase tracking-widest transition-all">
                <Share2 className="w-4 h-4 mr-3" /> Export Dossier
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl font-serif font-bold tracking-tighter monochrome-gradient-text leading-none">{batik.name}</h1>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Provenance: {batik.origin}</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="group space-y-4">
                <div className="flex items-center gap-3 text-foreground">
                  <Info className="w-5 h-5 opacity-50" />
                  <h3 className="font-bold uppercase text-xs tracking-[0.3em]">Interpretation</h3>
                </div>
                <div className="relative pl-8 border-l border-border/60">
                  <p className="text-xl md:text-2xl font-serif italic text-foreground/90 leading-relaxed">
                    "{batik.meaning}"
                  </p>
                </div>
              </div>
              <div className="group space-y-4">
                <div className="flex items-center gap-3 text-foreground">
                  <History className="w-5 h-5 opacity-50" />
                  <h3 className="font-bold uppercase text-xs tracking-[0.3em]">Chronology</h3>
                </div>
                <div className="relative pl-8 border-l border-border/60">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {batik.history}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/catalog">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/80 py-8 rounded-2xl font-bold uppercase tracking-widest text-xs">
                  Discover Related Patterns
                </Button>
              </Link>
              <Link to="/scan">
                <Button variant="outline" className="w-full border-border hover:border-foreground py-8 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors">
                  Process New Sample
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}