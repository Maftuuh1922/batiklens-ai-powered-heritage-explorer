import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEngagement } from '@/lib/engagement';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  compact?: boolean;
}

export function StreakIndicator({ className, compact }: Props) {
  const streak = useEngagement((s) => s.streak);

  if (streak <= 0) return null;

  return (
    <Link
      to="/profile"
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-400/5 px-2.5 py-1 transition-colors hover:bg-orange-400/10',
        className,
      )}
      aria-label={`Daily streak: ${streak} days`}
    >
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex"
      >
        <Flame className="h-3.5 w-3.5 text-orange-500 drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]" />
      </motion.span>
      <span className="text-[11px] font-black uppercase tracking-[0.15em] text-orange-600 dark:text-orange-400">
        {streak}
        {!compact && <span className="ml-1 opacity-60">d</span>}
      </span>
    </Link>
  );
}
