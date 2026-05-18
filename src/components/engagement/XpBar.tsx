import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { useEngagement, xpProgressInLevel, titleForLevel } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  showTitle?: boolean;
}

const getXpBarStyle = (lvl: number) => {
  if (lvl >= 50) return {
    badge: 'bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-pink-500 shadow-purple-500/50 animate-pulse',
    bar: 'bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 shadow-[0_0_18px_rgba(217,70,239,0.8)]',
    text: 'text-fuchsia-400 font-bold',
    shimmer: 'bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] animate-[shimmer_1.5s_linear_infinite]',
    zapColor: 'fill-fuchsia-300 text-fuchsia-100 drop-shadow-[0_0_8px_rgba(217,70,239,1)]',
    containerRing: 'ring-fuchsia-500/20'
  };
  if (lvl >= 25) return {
    badge: 'bg-gradient-to-tr from-red-500 via-orange-500 to-amber-500 shadow-orange-500/40',
    bar: 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]',
    text: 'text-orange-500',
    shimmer: 'bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_linear_infinite]',
    zapColor: 'fill-orange-300 text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,1)]',
    containerRing: 'ring-orange-500/20'
  };
  if (lvl >= 10) return {
    badge: 'bg-gradient-to-tr from-blue-400 via-indigo-500 to-violet-500 shadow-blue-500/40',
    bar: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]',
    text: 'text-indigo-400',
    shimmer: 'bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] animate-[shimmer_2.4s_linear_infinite]',
    zapColor: 'fill-indigo-300 text-indigo-100 drop-shadow-[0_0_8px_rgba(99,102,241,1)]',
    containerRing: 'ring-indigo-500/20'
  };
  if (lvl >= 5) return {
    badge: 'bg-gradient-to-tr from-emerald-400 to-teal-500 shadow-emerald-500/30',
    bar: 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    text: 'text-emerald-500',
    shimmer: 'bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] animate-[shimmer_2.4s_linear_infinite]',
    zapColor: 'fill-emerald-300 text-emerald-100 drop-shadow-[0_0_8px_rgba(16,185,129,1)]',
    containerRing: 'ring-emerald-500/20'
  };
  return {
    badge: 'bg-gradient-to-br from-amber-300 to-orange-500 shadow-orange-500/30',
    bar: 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]',
    text: 'text-gold',
    shimmer: 'bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] animate-[shimmer_2.4s_linear_infinite]',
    zapColor: 'fill-yellow-300 text-yellow-100 drop-shadow-[0_0_8px_rgba(250,204,21,1)]',
    containerRing: 'ring-orange-500/10'
  };
};

export function XpBar({ className, showTitle = true }: Props) {
  const xp = useEngagement((s) => s.xp);
  const { language } = useLanguage();
  const progress = xpProgressInLevel(xp);
  const styles = getXpBarStyle(progress.level);

  const hasLightning = progress.level >= 5 || progress.percent >= 90;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white shadow-lg ${styles.badge}`}>
            {progress.level}
          </span>
          {showTitle && (
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {language === 'id' ? 'GELAR' : 'TITLE'}
              </span>
              <span className={`font-serif text-sm font-bold leading-tight ${styles.text}`}>
                {titleForLevel(progress.level, language)}
              </span>
            </div>
          )}
        </div>
        <div className={`flex items-center gap-1 font-mono text-[11px] tabular-nums ${styles.text}`}>
          <Sparkles className="h-3 w-3 currentColor" />
          {progress.current}
          <span className="opacity-50 text-muted-foreground">/{progress.needed}</span>
          <span className="ml-1 text-[9px] uppercase tracking-widest opacity-50 text-muted-foreground">XP</span>
        </div>
      </div>
      
      <div className={`relative h-3 w-full overflow-hidden rounded-full bg-foreground/10 ring-1 ring-inset ${styles.containerRing} shadow-inner`}>
        {/* The Progress Bar itself */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percent}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-y-0 left-0 rounded-full ${styles.bar}`}
        >
          {/* Shimmer inside the bar */}
          <div className={`absolute inset-0 bg-[length:200%_100%] ${styles.shimmer}`} />
          
          {/* Sparking Tip of the progress bar */}
          {hasLightning && (
             <div className="absolute top-0 bottom-0 w-8 right-0 translate-x-1/2 flex items-center justify-center animate-pulse z-10">
               <Zap className={`w-4 h-4 ${styles.zapColor} ${progress.level >= 25 ? 'animate-[lightning_2s_infinite]' : ''}`} />
               <div className="absolute inset-0 bg-white/40 blur-md rounded-full" />
             </div>
          )}
        </motion.div>
        
        {/* Full width zap sliding across for higher ranks or full bar */}
        {hasLightning && (
          <div className="absolute inset-y-0 w-16 animate-zap-slide flex items-center justify-center opacity-60 pointer-events-none mix-blend-screen z-20">
            <Zap className={`w-6 h-6 ${styles.zapColor} -rotate-12 blur-[1px]`} />
          </div>
        )}
        
        {/* Secondary sliding zap for mythic */}
        {progress.level >= 50 && (
          <div className="absolute inset-y-0 w-16 animate-[zap-slide_1.8s_linear_infinite_0.9s] flex items-center justify-center opacity-70 pointer-events-none mix-blend-screen z-20">
            <Zap className={`w-8 h-8 ${styles.zapColor} rotate-12 blur-[2px]`} />
          </div>
        )}
      </div>
    </div>
  );
}
