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
        <h2 className="text-2xl font-serif">Motif not found</h2>
        <Link to="/catalog" className="text-secondary mt-4 inline-block">Back to Catalog</Link>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-16">
        <div className="mb-12 flex justify-between items-center">
          <Link to="/catalog" className="text-muted-foreground hover:text-white flex items-center gap-2 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card shadow-nature shadow-secondary/5"
          >
            <img src={batik.imageUrl} alt={batik.name} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-serif font-bold gold-gradient-text mb-4">{batik.name}</h1>
              <div className="flex items-center gap-3 bg-secondary/10 w-fit px-4 py-2 rounded-full border border-secondary/20">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold tracking-wide text-secondary uppercase">{batik.origin}</span>
              </div>
            </div>
            <div className="flex-grow space-y-10">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-secondary/80">
                  <Info className="w-5 h-5" />
                  <h3 className="font-serif text-2xl font-bold">Philosophy</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg italic">
                  "{batik.meaning}"
                </p>
              </section>
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-secondary/80">
                  <History className="w-5 h-5" />
                  <h3 className="font-serif text-2xl font-bold">The History</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {batik.history}
                </p>
              </section>
            </div>
            <div className="mt-12 pt-8 border-t border-border">
              <Link to="/scan">
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-7 text-lg rounded-2xl">
                  Analyze Your Own Batik
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}