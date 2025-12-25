import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ScanLine, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
  return (
    <div className="flex flex-col w-full relative">
      {/* Immersive Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-border">
        {/* Animated Batik Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="batik-overlay scale-150 animate-slow-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold">Heritage AI v2.0 Live</span>
            </motion.div>
            <motion.h1 
              variants={itemVariants} 
              className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.9] mb-8 monochrome-gradient-text"
            >
              The Soul of Batik <br />Revealed.
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Bridge the gap between ancient Javanese philosophy and modern vision intelligence. 
              Instantly identify motifs, origins, and spiritual meanings.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
              <Link to="/scan">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-10 py-8 text-xl rounded-full font-bold shadow-2xl shadow-foreground/10">
                  Start Scanning
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link to="/catalog">
                <Button variant="outline" size="lg" className="border-foreground/20 text-foreground hover:bg-foreground/5 px-10 py-8 text-xl rounded-full font-medium">
                  Browse Archive
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Features Grid */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="space-y-6 glass-card p-10 rounded-3xl border-border/50"
            >
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground border border-border">
                <ScanLine className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold">Neural Classification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trained on high-resolution museum archives to identify complex geometric and organic motifs with clinical precision.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="space-y-6 glass-card p-10 rounded-3xl border-border/50"
            >
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground border border-border">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold">Ethical Intelligence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Providing cultural context and philosophical depth, ensuring heritage stories are preserved, not just categorized.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="space-y-6 glass-card p-10 rounded-3xl border-border/50"
            >
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground border border-border">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold">Digital Stewardship</h3>
              <p className="text-muted-foreground leading-relaxed">
                A non-profit initiative dedicated to protecting Indonesian intangible cultural heritage through edge technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-16 border-t border-border/40 bg-background/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-50">
            Heritage integrity verified • Global access limits apply • 2024 Edition
          </p>
        </div>
      </section>
    </div>
  );
}