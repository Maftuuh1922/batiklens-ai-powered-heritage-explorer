import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ScanLine, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center justify-center border-b border-foreground/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 grayscale opacity-15 md:opacity-20 animate-slow-pan"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=2048')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="mb-6 md:mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-background/40 backdrop-blur-[40px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black">Heritage AI v3.0 Live</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[1] md:leading-[0.9] mb-6 md:mb-8 monochrome-gradient-text"
            >
              The Soul of Batik <br className="hidden md:block" />Revealed.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base md:text-xl text-muted-foreground mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4"
            >
              Bridge the gap between ancient Javanese philosophy and modern vision intelligence.
              Instantly identify motifs with clinical precision.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full max-w-md sm:max-w-none px-6">
              <Link to="/scan" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-8 py-7 md:py-8 text-lg md:text-xl rounded-full font-black shadow-2xl shadow-foreground/10">
                  Start Scanning
                  <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </Link>
              <Link to="/catalog" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-7 md:py-8 text-lg md:text-xl rounded-full font-medium transition-all">
                  Browse Archive
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <ScanLine />, title: "Neural Classification", desc: "Trained on high-resolution museum archives to identify motifs with clinical precision." },
              { icon: <BookOpen />, title: "Ethical Intelligence", desc: "Providing cultural context and philosophical depth, ensuring heritage stories are preserved." },
              { icon: <ShieldCheck />, title: "Digital Stewardship", desc: "A non-profit initiative dedicated to protecting Indonesian intangible cultural heritage." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="space-y-4 md:space-y-6 glass-card p-8 md:p-10 rounded-3xl transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/5"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground border border-foreground/10">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6 md:w-7 md:h-7" })}
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 border-t border-foreground/5 bg-background/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">
            Heritage integrity verified • Global access limits apply • 2024 Protocol
          </p>
        </div>
      </section>
    </div>
  );
}