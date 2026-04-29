import { Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useEngagement } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className }: Props) {
  const awardXp = useEngagement((s) => s.awardXp);
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
    let shared = false;
    const nav = typeof navigator !== 'undefined' ? navigator : undefined;
    try {
      if (nav && typeof (nav as Navigator).share === 'function') {
        await (nav as Navigator).share({ title, text, url: shareUrl });
        shared = true;
      } else if (nav && (nav as Navigator).clipboard) {
        await (nav as Navigator).clipboard.writeText(`${text}\n${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
        shared = true;
      }
    } catch (err) {
      // user cancelled — don't reward XP
      if ((err as Error)?.name === 'AbortError') return;
    }

    if (shared) {
      const r = awardXp('share');
      toast.success(
        language === 'id'
          ? `📣 Terima kasih sudah berbagi! +${r.xpGained} XP`
          : `📣 Thanks for sharing! +${r.xpGained} XP`,
      );
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onShare}
      className={cn(
        'rounded-full font-black uppercase text-[10px] tracking-[0.2em] gap-2 border-foreground/20',
        className,
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied
        ? language === 'id'
          ? 'Disalin'
          : 'Copied'
        : language === 'id'
          ? 'Bagikan'
          : 'Share'}
    </Button>
  );
}
