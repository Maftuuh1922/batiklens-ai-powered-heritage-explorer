import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info, History, ArrowLeft, Share2, AlertCircle } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export function ResultPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const batik = batiks.find(b => b.id === id);
  if (!batik) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 md:py-40 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Dossier Missing</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">The requested motif analysis could not be located in our archives.</p>
          </div>
          <Link to="/scan">
            <Button variant="outline" className="rounded-full border-foreground/20 hover:bg-foreground/5 px-8 py-6 font-black uppercase text-[10px] tracking-widest">
              Restart Vision Engine
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-16">
        <div className="mb-8 md:mb-12">
          <Link to="/scan" className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            New Analysis
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="relative aspect-square w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card border-foreground/10 shadow-2xl">
              <img
                src={batik.imageUrl}
                alt={batik.name}
                className="w-full h-full object-cover grayscale-[20%]"
              />
              <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <Badge className="bg-foreground text-background font-black text-[9px] md:text-[10px] uppercase tracking-widest px-4 md:px-5 py-2 rounded-full border-none shadow-2xl">
                  Confidence: 98.4%
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-2xl border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 py-6 md:py-7 text-[10px] font-black uppercase tracking-widest">
              <Share2 className="w-4 h-4 mr-3" /> Export Digital Dossier
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-10 md:space-y-14"
          >
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter monochrome-gradient-text leading-[0.9] break-words">
                {batik.name}
              </h1>
              <div className="flex items-center gap-3 bg-foreground text-background w-fit px-5 py-2 rounded-full shadow-xl">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Provenance: {batik.origin}</span>
              </div>
            </div>
            <div className="space-y-10 md:space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-foreground/40">
                  <Info className="w-4 h-4" />
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em]">Interpretation</h3>
                </div>
                <div className="relative pl-6 md:pl-8 border-l-2 border-border/60">
                  <p className="text-xl md:text-3xl font-serif italic text-foreground leading-relaxed">
                    "{batik.meaning}"
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-foreground/40">
                  <History className="w-4 h-4" />
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em]">Chronology</h3>
                </div>
                <div className="relative pl-6 md:pl-8">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {batik.history}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40">
              <Link to="/catalog">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/80 py-6 md:py-7 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                  Explore Archive
                </Button>
              </Link>
              <Link to="/scan">
                <Button variant="outline" className="w-full border-foreground/10 hover:border-foreground/30 py-6 md:py-7 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                  Analyze New
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}