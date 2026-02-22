import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ScanLine, BookOpen, ShieldCheck, Sparkles, Lightbulb, PenTool, Droplet, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { batiks } from '@/lib/batik-data';
import { useState, useEffect } from 'react';

export function HomePage() {
  const { t, language } = useLanguage();
  const [currentBatikIndex, setCurrentBatikIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatikIndex((prev) => (prev + 1) % batiks.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const currentBatik = batiks[currentBatikIndex];

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
            className="absolute inset-0 opacity-25 md:opacity-30 animate-slow-pan"
            style={{
              backgroundImage: "url('/batik-day.png')",
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
            <motion.div variants={itemVariants} className="mb-6 md:mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold bg-background/40 backdrop-blur-[40px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-gold">Heritage AI v3.0 Live</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[1] md:leading-[0.9] mb-6 md:mb-8 monochrome-gradient-text"
              dangerouslySetInnerHTML={{ __html: t('home.hero_title').replace(/\./g, '<br class="hidden md:block" />') }}
            >
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base md:text-xl text-muted-foreground mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4"
            >
              {t('home.hero_subtitle')}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full max-w-md sm:max-w-none px-6">
              <Link to="/scan" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-8 py-7 md:py-8 text-lg md:text-xl rounded-full font-black shadow-2xl shadow-foreground/10">
                  {t('home.cta_scan')}
                  <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </Link>
              <Link to="/catalog" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-7 md:py-8 text-lg md:text-xl rounded-full font-medium transition-all">
                  {t('home.cta_browse')}
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-12 flex items-center justify-center gap-2 text-[9px] text-muted-foreground uppercase tracking-widest opacity-60">
              <Sparkles className="w-3 h-3" />
              {t('home.ai_limit')}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NEW: Live Recognition Demo Section */}
      <section className="py-24 relative overflow-hidden bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Visual Side */}
          <div className="w-full md:w-1/2 relative group perspective-1000">
            <motion.div
              key={currentBatik.id}
              initial={{ rotateY: -5, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-foreground/10 bg-black group-hover:scale-[1.02] transition-transform duration-700"
            >
              <img
                src={currentBatik.imageUrl}
                alt={currentBatik.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
              />

              {/* Scanning Laser Effect */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <motion.div
                  className="w-full h-[2px] bg-gold/80 shadow-[0_0_20px_2px_rgba(255,215,0,0.6)]"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ position: 'absolute', left: 0 }}
                />
              </div>

              {/* Data Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gold text-center">
                    {language === 'id' ? 'ANALISIS AKTIF' : 'ANALYSIS ACTIVE'}
                  </span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-1 truncate">{currentBatik.name}</h3>
                <div className="flex justify-between items-end border-t border-white/20 pt-4 mt-4">
                  <span className="text-xs text-white/60 font-mono uppercase tracking-wider">
                    {language === 'id' ? 'SKOR KEYAKINAN' : 'CONFIDENCE SCORE'}
                  </span>
                  <span className="text-xl font-mono text-gold font-bold">
                    {98 + (currentBatikIndex % 3) * 0.4}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating Insight Card */}
            <motion.div
              key={`insight-${currentBatik.id}`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -right-4 top-10 md:-right-12 md:top-20 w-48 bg-background/90 backdrop-blur-xl p-5 rounded-2xl border border-foreground/10 shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-2 mb-3">
                <ScanLine className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {language === 'id' ? 'WAWASAN' : 'INSIGHT'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                {currentBatik.meaning[language]}
              </p>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold pl-1">
              {language === 'id' ? 'MENGAPA BATIKLENS?' : 'WHY BATIKLENS?'}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              {language === 'id' ? 'Melestarikan Sejarah' : 'Preserving History'} <br />
              <i className="font-serif text-muted-foreground">
                {language === 'id' ? 'Pixel demi Pixel.' : 'Pixel by Pixel.'}
              </i>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed md:pr-10">
              {language === 'id'
                ? <>AI kami tidak hanya melihat bentuk; ia mengenali warisan budaya berabad-abad. Dari keraton Jawa hingga pesisir Pekalongan, <span className="text-foreground font-medium">temukan makna tersembunyi</span> di balik wastra nusantara.</>
                : <>Our AI doesn't just see shapes; it recognizes centuries of cultural heritage. From the royal courts of Java to the coastal workshops of Pekalongan, <span className="text-foreground font-medium"> explore the hidden meanings </span> behind Indonesia's masterpiece cloth.</>}
            </p>

            <div className="flex gap-4 pt-4">
              <div className="flex flex-col gap-1 p-4 rounded-2xl bg-foreground/5 border border-foreground/5 w-32 text-center">
                <span className="text-2xl font-bold font-serif">50+</span>
                <span className="text-[9px] opacity-60 uppercase tracking-widest">
                  {language === 'id' ? 'MOTIF' : 'MOTIFS'}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-4 rounded-2xl bg-foreground/5 border border-foreground/5 w-32 text-center">
                <span className="text-2xl font-bold font-serif">24/7</span>
                <span className="text-[9px] opacity-60 uppercase tracking-widest">
                  {language === 'id' ? 'AKSESIBEL' : 'ACCESSIBLE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <ScanLine />, title: t('home.feat_neural_title'), desc: t('home.feat_neural_desc') },
              { icon: <BookOpen />, title: t('home.feat_ethical_title'), desc: t('home.feat_ethical_desc') },
              { icon: <ShieldCheck />, title: t('home.feat_steward_title'), desc: t('home.feat_steward_desc') }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="space-y-4 md:space-y-6 glass-card p-8 md:p-10 rounded-3xl transition-all duration-500 hover:border-gold hover:bg-foreground/5"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground border border-foreground/10">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6 md:w-7 md:h-7 text-gold" })}
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

      {/* NEW EDUCATIONAL SECTION */}
      <section className="py-20 bg-foreground/5 border-t border-foreground/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('/batik-day.png')", backgroundSize: 'cover' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 md:mb-16 text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold mb-3 block">{t('home.did_you_know')}</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">{t('home.batik_wisdom')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Lightbulb />, text: t('home.fact_unesco') },
              { icon: <PenTool />, text: t('home.fact_canting') },
              { icon: <Droplet />, text: t('home.fact_sogan') },
              { icon: <Crown />, text: t('home.fact_parang') }
            ].map((fact, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/40 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  {React.cloneElement(fact.icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
                <p className="text-sm md:text-base font-medium leading-relaxed opacity-90">
                  {fact.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-t border-foreground/5 bg-background/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">
            {t('footer.rights')}
          </p>
        </div>
      </section>
    </div>
  );
}