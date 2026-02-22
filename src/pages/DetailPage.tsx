import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info, History, ArrowLeft, Heart } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';

export function DetailPage() {
  const { language } = useLanguage();
  const { id } = useParams();
  const batik = batiks.find(b => b.id === id);

  if (!batik) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Motif Not Found</h2>
        <Link to="/catalog">
          <Button variant="link" className="text-foreground font-black underline underline-offset-4 text-[10px] uppercase tracking-widest">
            Back to Archive
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-20">
        <div className="mb-8 md:mb-12 flex justify-between items-center">
          <Link to="/catalog" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Archive Index
          </Link>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground border border-border/20 rounded-full h-10 w-10">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden glass-card shadow-2xl border-foreground/15 premium-glow"
          >
            <img
              src={batik.imageUrl}
              alt={batik.name}
              className="w-full h-full object-cover grayscale-[15%] transition-transform duration-1000"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-10 md:mb-14">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold monochrome-gradient-text mb-6 leading-tight break-words">
                {batik.name}
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 bg-foreground text-background w-fit px-5 py-2 rounded-full shadow-xl"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase">{batik.origin}</span>
              </motion.div>
            </div>
            <div className="flex-grow space-y-10 md:space-y-12">
              <section className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 text-foreground/50">
                  <Info className="w-4 h-4" />
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em]">Interpretation</h3>
                </div>
                <div className="border-l-2 border-border/60 pl-6 md:pl-8">
                  <p className="text-xl md:text-3xl font-serif italic text-foreground leading-relaxed">
                    "{batik.meaning[language]}"
                  </p>
                </div>
              </section>
              <section className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 text-foreground/50">
                  <History className="w-4 h-4" />
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em]">Chronology</h3>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-6 md:pl-8">
                  {batik.history[language]}
                </p>
              </section>

              {/* MAP SECTION - Added per user request */}
              <section className="space-y-4 md:space-y-6 pt-4">
                <div className="flex items-center gap-3 text-foreground/50">
                  <MapPin className="w-4 h-4" />
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em]">Region Map</h3>
                </div>
                <div className="rounded-2xl overflow-hidden glass-card border border-foreground/10 h-64 shadow-lg relative ml-6 md:ml-8 group/map">
                  <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur px-3 py-1 rounded-full border border-foreground/10 flex items-center gap-2 pointer-events-none">
                    <span className="text-[9px] font-black uppercase tracking-widest">{batik.origin}</span>
                  </div>
                  <iframe
                    width="100%"
                    height="100%"
                    title="Batik Origin Map"
                    style={{ border: 0, filter: 'grayscale(100%) invert(0.9) contrast(1.2)' }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(batik.origin + ", Indonesia")}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-transparent pointer-events-none group-hover/map:bg-foreground/5 transition-colors" />
                </div>
              </section>

              {/* Reference Link */}
              {batik.referenceUrl && (
                <div className="flex justify-end pt-2 pr-2">
                  <a href={batik.referenceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group/link bg-muted/50 px-4 py-2 rounded-full">
                    <Info className="w-3 h-3" />
                    <span className="uppercase tracking-widest font-bold text-[9px]">View Valid Source</span>
                  </a>
                </div>
              )}
            </div>
            <div className="mt-12 pt-8 border-t border-border/40">
              <Link to="/scan">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 py-7 md:py-8 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-[0.98]">
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