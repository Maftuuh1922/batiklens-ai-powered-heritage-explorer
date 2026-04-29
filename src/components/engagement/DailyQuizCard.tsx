import { motion } from 'framer-motion';
import { Brain, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEngagement } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';

export function DailyQuizCard() {
  const done = useEngagement((s) => s.dailyQuizDate === new Date().toISOString().slice(0, 10));
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-indigo-500/10 via-background to-rose-500/10 p-8 md:p-10"
    >
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-rose-500/15 blur-3xl" />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/15 bg-background/60 backdrop-blur-sm">
            <Brain className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">
              {language === 'id' ? 'TANTANGAN HARIAN' : 'DAILY CHALLENGE'}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight max-w-md">
            {done
              ? language === 'id'
                ? 'Kerja bagus, sampai jumpa besok!'
                : 'Great job — see you tomorrow!'
              : language === 'id'
                ? 'Uji pengetahuan batikmu hari ini'
                : 'Test your batik knowledge today'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg">
            {done
              ? language === 'id'
                ? 'Tantangan hari ini sudah selesai. Streak kamu aman & XP sudah masuk.'
                : "Today's challenge is done. Your streak is safe and XP earned."
              : language === 'id'
                ? '3 soal cepat. Jawab semua benar untuk +30 XP & jaga streak harianmu.'
                : '3 quick questions. Ace them for +30 XP and keep your streak alive.'}
          </p>
        </div>
        <Link to="/daily" className="shrink-0">
          <Button
            size="lg"
            disabled={done}
            className="rounded-full px-7 py-6 font-black uppercase text-[11px] tracking-[0.2em] bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60"
          >
            {done ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                {language === 'id' ? 'Selesai' : 'Done'}
              </>
            ) : language === 'id' ? (
              'Mulai Sekarang'
            ) : (
              'Start Now'
            )}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
