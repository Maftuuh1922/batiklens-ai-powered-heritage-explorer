import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEngagement, xpProgressInLevel, titleForLevel } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  showTitle?: boolean;
}

export function XpBar({ className, showTitle = true }: Props) {
  const xp = useEngagement((s) => s.xp);
  const { language } = useLanguage();
  const progress = xpProgressInLevel(xp);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-xs font-black text-white shadow-lg shadow-orange-500/30">
            {progress.level}
          </span>
          {showTitle && (
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {language === 'id' ? 'GELAR' : 'TITLE'}
              </span>
              <span className="font-serif text-sm font-bold leading-tight">
                {titleForLevel(progress.level, language)}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] tabular-nums text-muted-foreground">
          <Sparkles className="h-3 w-3 text-gold" />
          {progress.current}
          <span className="opacity-50">/{progress.needed}</span>
          <span className="ml-1 text-[9px] uppercase tracking-widest opacity-50">XP</span>
        </div>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percent}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] bg-[length:200%_100%] animate-[shimmer_2.4s_linear_infinite]" />
      </div>
    </div>
  );
}
