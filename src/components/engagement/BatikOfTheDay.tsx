import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { batiks } from '@/lib/batik-data';
import { useEngagement } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * Pick a deterministic batik based on the current date.
 * Re-uses Math.imul for a fast, stable hash.
 */
const dayHash = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const todayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export function BatikOfTheDay() {
  const { language, t } = useLanguage();
  const awardXp = useEngagement((s) => s.awardXp);
  const addDiary = useEngagement((s) => s.addDiary);

  const batik = useMemo(() => {
    const idx = dayHash(todayKey()) % batiks.length;
    return batiks[idx];
  }, []);

  const handleLearnClick = () => {
    const result = awardXp('read-motif');
    addDiary({
      motifId: batik.id,
      motifName: batik.name,
      imageUrl: batik.imageUrl,
      source: 'read',
    });
    toast.success(
      language === 'id'
        ? `+${result.xpGained} XP — Wawasan baru tersimpan di Diary`
        : `+${result.xpGained} XP — New insight saved to your Diary`,
    );
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden border-t border-foreground/5">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-transparent to-transparent dark:from-amber-950/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-4 h-4 text-gold" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gold">
            {language === 'id' ? 'BATIK HARI INI' : 'BATIK OF THE DAY'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl group"
          >
            <img
              src={batik.imageUrl}
              alt={batik.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-full bg-gold/20 border border-gold/40 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-gold" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gold">
                  {batik.origin}
                </span>
              </span>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">{batik.name}</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              {language === 'id' ? 'Temui kisah hari ini' : "Today's heritage tale"}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {batik.meaning[language]}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to={`/batik/${batik.id}`}>
                <Button
                  size="lg"
                  onClick={handleLearnClick}
                  className="rounded-full px-6 md:px-8 py-6 font-black uppercase text-[11px] tracking-[0.2em] bg-foreground text-background hover:bg-foreground/90"
                >
                  {language === 'id' ? 'Pelajari Lengkap' : 'Read More'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/daily">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-6 font-black uppercase text-[11px] tracking-[0.2em] border-foreground/20"
                >
                  {language === 'id' ? 'Tantangan Harian' : 'Daily Challenge'}
                </Button>
              </Link>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-60 pt-2">
              {t('home.ai_limit')}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
