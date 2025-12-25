import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ScanLine, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/batik-fractal.png')] animate-parallax" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6">
              The Soul of <span className="gold-gradient-text">Batik</span> Revealed by AI.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Scan Indonesian batik motifs and instantly explore their hidden philosophy, history, and geographical origins with our heritage-trained vision model.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link to="/scan">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-7 text-lg rounded-full">
                  Start Scanning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/catalog">
                <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-7 text-lg rounded-full">
                  Browse Catalog
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Features Grid */}
      <section className="py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold">Intelligent Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Identify over 100+ Indonesian batik patterns with high-precision computer vision trained on authentic heritage datasets.
              </p>
            </div>
            <div className="space-y-4 glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold">Deep Philosophy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Go beyond the aesthetics. Understand the spiritual meaning and social status behind every curve and line.
              </p>
            </div>
            <div className="space-y-4 glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold">Cultural Preservation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A digital archive designed to protect and promote Indonesian intangible cultural heritage for the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Note for Users */}
      <section className="py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
            Note: AI processing limits apply across the platform. Preserving heritage requires mindful computing.
          </p>
        </div>
      </section>
    </div>
  );
}