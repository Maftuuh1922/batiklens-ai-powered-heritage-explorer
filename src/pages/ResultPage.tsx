import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info, History, ArrowLeft, Share2 } from 'lucide-react';
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
        <div className="py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Dossier Missing</h2>
          <Link to="/scan">
            <Button variant="link" className="text-foreground font-bold underline underline-offset-4 text-xs uppercase tracking-widest">
              Restart Vision Engine
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12 lg:py-16">
        <div className="mb-12">
          <Link to="/scan" className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            New Analysis
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Analysis Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeOut", duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative aspect-square rounded-[2rem] overflow-hidden glass-card border-foreground/10 shadow-2xl">
              <img src={batik.imageUrl} alt={batik.name} className="w-full h-full object-cover grayscale-[30%]" />
              <div className="absolute top-8 left-8">
                <Badge className="bg-foreground text-background font-black text-[10px] uppercase tracking-widest px-5 py-2 rounded-full border-none shadow-2xl">
                  Match Integrity: 98.4%
                </Badge>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 rounded-2xl border-foreground/10 hover:border-foreground/40 hover:bg-foreground/5 py-8 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                <Share2 className="w-4 h-4 mr-3" /> Export Digital Dossier
              </Button>
            </div>
          </motion.div>
          {/* Analysis Dossier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter monochrome-gradient-text leading-[0.9]">{batik.name}</h1>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-border/60 pb-1">Provenance: {batik.origin}</span>
              </div>
            </div>
            <div className="space-y-12">
              <div className="group space-y-4">
                <div className="flex items-center gap-3 text-foreground/40">
                  <Info className="w-5 h-5" />
                  <h3 className="font-black uppercase text-[10px] tracking-[0.4em]">Interpretation</h3>
                </div>
                <div className="relative pl-8 border-l border-foreground/10">
                  <p className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed">
                    "{batik.meaning}"
                  </p>
                </div>
              </div>
              <div className="group space-y-4">
                <div className="flex items-center gap-3 text-foreground/40">
                  <History className="w-5 h-5" />
                  <h3 className="font-black uppercase text-[10px] tracking-[0.4em]">Chronology</h3>
                </div>
                <div className="relative pl-8 border-l border-foreground/10">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {batik.history}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/catalog">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/80 py-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px]">
                  Explore Archives
                </Button>
              </Link>
              <Link to="/scan">
                <Button variant="outline" className="w-full border-foreground/10 hover:border-foreground/40 py-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-colors">
                  Analyze New Sample
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}