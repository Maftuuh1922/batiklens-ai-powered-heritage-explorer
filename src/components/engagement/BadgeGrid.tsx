import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useEngagement, BADGES } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function BadgeGrid({ className }: Props) {
  const unlocked = useEngagement((s) => s.unlockedBadges);
  const { language } = useLanguage();

  return (
    <TooltipProvider delayDuration={150}>
      <div className={cn('grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3', className)}>
        {BADGES.map((badge, idx) => {
          const isUnlocked = unlocked.includes(badge.id);
          return (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className={cn(
                    'group relative aspect-square rounded-2xl border p-3 flex flex-col items-center justify-center text-center overflow-hidden transition-colors',
                    isUnlocked
                      ? 'border-gold/40 bg-gradient-to-br from-amber-50 via-amber-100/40 to-orange-100/40 dark:from-amber-950/30 dark:via-amber-900/20 dark:to-orange-900/20 shadow-md'
                      : 'border-foreground/10 bg-foreground/[0.02] grayscale opacity-60 hover:opacity-90',
                  )}
                >
                  <span className={cn('text-3xl md:text-4xl mb-1.5', isUnlocked ? '' : 'grayscale')}>
                    {isUnlocked ? badge.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
                  </span>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-tight line-clamp-2">
                    {isUnlocked ? badge.name[language] : '???'}
                  </span>
                  {isUnlocked && (
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,161,74,0.18),transparent_60%)]" />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[220px]">
                <p className="font-bold">
                  {badge.icon} {badge.name[language]}
                </p>
                <p className="text-xs text-muted-foreground">{badge.description[language]}</p>
                {!isUnlocked && (
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    {language === 'id' ? 'Belum terbuka' : 'Locked'}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
