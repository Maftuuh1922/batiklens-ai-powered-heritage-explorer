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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif">Result not found</h2>
        <Link to="/scan" className="text-secondary mt-4 inline-block">Try scanning again</Link>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-16">
        <div className="mb-12">
          <Link to="/scan" className="text-muted-foreground hover:text-white flex items-center gap-2 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Scanner
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card">
              <img src={batik.imageUrl} alt={batik.name} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6">
                <Badge className="bg-secondary text-secondary-foreground text-xs uppercase tracking-widest px-4 py-1">98% Confidence</Badge>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 rounded-xl border-white/10 glass-card">
                <Share2 className="w-4 h-4 mr-2" /> Share Analysis
              </Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-serif font-bold gold-gradient-text">{batik.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Origin: {batik.origin}</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-secondary">
                  <Info className="w-5 h-5" />
                  <h3 className="font-serif text-xl">Meaning & Philosophy</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{batik.meaning}</p>
              </div>
              <div className="glass-card p-8 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-secondary">
                  <History className="w-5 h-5" />
                  <h3 className="font-serif text-xl">Historical Context</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{batik.history}</p>
              </div>
            </div>
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="flex-1">
                <Button className="w-full bg-primary text-white hover:bg-primary/90 py-6 rounded-xl">View Similar Patterns</Button>
              </Link>
              <Link to="/scan" className="flex-1">
                <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 py-6 rounded-xl">Scan Another</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}