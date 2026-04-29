import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useEngagement, BADGES, levelFromXp, titleForLevel } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { fireConfetti } from './Confetti';

/**
 * Mounts at the app root. Records a daily visit and watches for level-ups
 * & newly unlocked badges to fire confetti + toasts.
 */
export function EngagementProvider() {
  const { language } = useLanguage();
  const xp = useEngagement((s) => s.xp);
  const unlocked = useEngagement((s) => s.unlockedBadges);
  const recordVisit = useEngagement((s) => s.recordVisit);
  const awardXp = useEngagement((s) => s.awardXp);

  const prevLevel = useRef<number | null>(null);
  const prevUnlocked = useRef<string[] | null>(null);
  const visitedRef = useRef(false);

  // Record daily visit & award login XP once per day
  useEffect(() => {
    if (visitedRef.current) return;
    visitedRef.current = true;
    const result = recordVisit();
    if (result.streakChanged) {
      // Award daily login XP
      awardXp('daily-login');
      // Show toast for streak gained (but only when >= 2 to avoid noise on first ever visit)
      if (result.newStreak >= 2) {
        toast.success(
          language === 'id'
            ? `🔥 Streak ${result.newStreak} hari! Tetap semangat.`
            : `🔥 ${result.newStreak}-day streak! Keep it up.`,
          { duration: 3500 },
        );
      }
    }
  }, [language, recordVisit, awardXp]);

  // Watch for level-up
  useEffect(() => {
    const newLevel = levelFromXp(xp);
    if (prevLevel.current === null) {
      prevLevel.current = newLevel;
      return;
    }
    if (newLevel > prevLevel.current) {
      prevLevel.current = newLevel;
      fireConfetti({ particles: 120, duration: 3000 });
      toast.success(
        language === 'id'
          ? `🎉 Naik level! Kamu sekarang ${titleForLevel(newLevel, 'id')} (Level ${newLevel}).`
          : `🎉 Level up! You're now a ${titleForLevel(newLevel, 'en')} (Level ${newLevel}).`,
        { duration: 5000 },
      );
    } else {
      prevLevel.current = newLevel;
    }
  }, [xp, language]);

  // Watch for newly unlocked badges
  useEffect(() => {
    if (prevUnlocked.current === null) {
      prevUnlocked.current = unlocked;
      return;
    }
    const newly = unlocked.filter((id) => !prevUnlocked.current!.includes(id));
    prevUnlocked.current = unlocked;
    if (newly.length === 0) return;

    fireConfetti({ particles: 60, duration: 2200 });
    for (const id of newly) {
      const badge = BADGES.find((b) => b.id === id);
      if (!badge) continue;
      toast.success(
        language === 'id'
          ? `${badge.icon} Badge baru: ${badge.name.id}`
          : `${badge.icon} New badge: ${badge.name.en}`,
        {
          description: badge.description[language],
          duration: 5000,
        },
      );
    }
  }, [unlocked, language]);

  return null;
}
