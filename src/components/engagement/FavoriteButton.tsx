import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useEngagement } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  motifId: string;
  motifName: string;
  imageUrl: string;
  className?: string;
  variant?: 'icon' | 'pill';
}

export function FavoriteButton({ motifId, motifName, imageUrl, className, variant = 'pill' }: Props) {
  const isFav = useEngagement((s) => s.favorites.includes(motifId));
  const toggleFavorite = useEngagement((s) => s.toggleFavorite);
  const awardXp = useEngagement((s) => s.awardXp);
  const addDiary = useEngagement((s) => s.addDiary);
  const { language } = useLanguage();

  const onClick = () => {
    const nowFav = toggleFavorite(motifId);
    if (nowFav) {
      const r = awardXp('favorite');
      addDiary({ motifId, motifName, imageUrl, source: 'favorite' });
      toast.success(
        language === 'id'
          ? `❤️ Ditambahkan ke favorit (+${r.xpGained} XP)`
          : `❤️ Added to favorites (+${r.xpGained} XP)`,
      );
    } else {
      toast(language === 'id' ? 'Dihapus dari favorit' : 'Removed from favorites');
    }
  };

  if (variant === 'icon') {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={onClick}
        aria-pressed={isFav}
        aria-label={isFav ? 'Unfavorite' : 'Favorite'}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors',
          isFav
            ? 'border-rose-500/50 bg-rose-500/15 text-rose-500'
            : 'border-foreground/15 bg-background/60 text-muted-foreground hover:text-foreground',
          className,
        )}
      >
        <Heart className={cn('h-4 w-4', isFav && 'fill-current')} />
      </motion.button>
    );
  }

  return (
    <Button
      type="button"
      variant={isFav ? 'default' : 'outline'}
      onClick={onClick}
      className={cn(
        'rounded-full font-black uppercase text-[10px] tracking-[0.2em] gap-2',
        isFav && 'bg-rose-500 hover:bg-rose-500/90 text-white border-rose-500',
        className,
      )}
    >
      <Heart className={cn('h-3.5 w-3.5', isFav && 'fill-current')} />
      {isFav
        ? language === 'id'
          ? 'Tersimpan'
          : 'Saved'
        : language === 'id'
          ? 'Simpan'
          : 'Save'}
    </Button>
  );
}
