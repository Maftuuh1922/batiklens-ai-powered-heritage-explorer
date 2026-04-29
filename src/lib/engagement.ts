import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Engagement system: streak, XP, level, badges, diary, favorites.
 * All persisted to localStorage. No backend required.
 */

export type XpReason =
  | 'daily-login'
  | 'scan'
  | 'quiz-correct'
  | 'quiz-complete'
  | 'read-motif'
  | 'favorite'
  | 'share'
  | 'daily-quiz';

export const XP_REWARDS: Record<XpReason, number> = {
  'daily-login': 10,
  scan: 20,
  'quiz-correct': 10,
  'quiz-complete': 50,
  'read-motif': 5,
  favorite: 3,
  share: 8,
  'daily-quiz': 30,
};

export interface DiaryEntry {
  id: string;
  motifId: string;
  motifName: string;
  imageUrl: string;
  source: 'scan' | 'favorite' | 'read' | 'quiz';
  notes?: string;
  timestamp: number;
}

export interface BadgeDef {
  id: string;
  name: { en: string; id: string };
  description: { en: string; id: string };
  icon: string; // emoji or asset key
  /** Function that, given the engagement state, returns true if unlocked */
  check: (s: EngagementState) => boolean;
}

export interface EngagementState {
  // streak
  streak: number;
  lastVisit: string | null; // YYYY-MM-DD
  longestStreak: number;

  // xp & level
  xp: number;
  level: number;

  // badges
  unlockedBadges: string[];

  // diary
  diary: DiaryEntry[];

  // favorites
  favorites: string[]; // motif ids

  // counters
  scanCount: number;
  quizCompleteCount: number;
  readCount: number;
  shareCount: number;

  // settings
  soundEnabled: boolean;
  reducedMotion: boolean;

  // daily challenge tracking
  dailyQuizDate: string | null; // last day completed
}

export interface EngagementActions {
  awardXp: (reason: XpReason, multiplier?: number) => { xpGained: number; leveledUp: boolean; newBadges: BadgeDef[] };
  recordVisit: () => { streakChanged: boolean; newStreak: number };
  addDiary: (entry: Omit<DiaryEntry, 'id' | 'timestamp'>) => void;
  toggleFavorite: (motifId: string) => boolean; // returns new state
  isFavorite: (motifId: string) => boolean;
  markDailyQuizDone: () => void;
  hasDailyQuizDone: () => boolean;
  setSoundEnabled: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  resetAll: () => void;
}

export type EngagementStore = EngagementState & EngagementActions;

const today = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const yesterday = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Level curve: cumulative XP needed for level N is 100 * N * (N+1) / 2
 * Level 1 -> 0, Level 2 -> 100, Level 3 -> 300, Level 4 -> 600, Level 5 -> 1000, ...
 */
export const xpForLevel = (level: number): number => (100 * (level - 1) * level) / 2;

export const levelFromXp = (xp: number): number => {
  let lvl = 1;
  while (xpForLevel(lvl + 1) <= xp) lvl++;
  return lvl;
};

export const xpProgressInLevel = (xp: number): { current: number; needed: number; percent: number; level: number } => {
  const level = levelFromXp(xp);
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const current = xp - base;
  const needed = next - base;
  return { current, needed, percent: Math.min(100, Math.round((current / needed) * 100)), level };
};

export const LEVEL_TITLES: Record<number, { en: string; id: string }> = {
  1: { en: 'Observer', id: 'Pengamat' },
  2: { en: 'Apprentice', id: 'Murid Wastra' },
  3: { en: 'Explorer', id: 'Penjelajah Motif' },
  4: { en: 'Wastra Lover', id: 'Pencinta Wastra' },
  5: { en: 'Heritage Keeper', id: 'Penjaga Warisan' },
  6: { en: 'Pattern Sage', id: 'Cendekiawan Motif' },
  7: { en: 'Royal Weaver', id: 'Penenun Keraton' },
  8: { en: 'Master of Canting', id: 'Mpu Canting' },
  9: { en: 'Batik Maestro', id: 'Mpu Batik' },
  10: { en: 'Living Legend', id: 'Legenda Wastra' },
};

export const titleForLevel = (level: number, lang: 'en' | 'id'): string => {
  const title = LEVEL_TITLES[Math.min(level, 10)] ?? LEVEL_TITLES[10];
  return title[lang];
};

export const BADGES: BadgeDef[] = [
  {
    id: 'first-scan',
    name: { en: 'First Light', id: 'Pindaian Pertama' },
    description: { en: 'Scan your first batik motif.', id: 'Pindai motif batik pertamamu.' },
    icon: '🔍',
    check: (s) => s.scanCount >= 1,
  },
  {
    id: 'scan-10',
    name: { en: 'Curator', id: 'Kurator' },
    description: { en: 'Scan 10 different motifs.', id: 'Pindai 10 motif berbeda.' },
    icon: '🎯',
    check: (s) => s.scanCount >= 10,
  },
  {
    id: 'quiz-first',
    name: { en: 'Quick Wit', id: 'Otak Cepat' },
    description: { en: 'Finish your first quiz.', id: 'Selesaikan kuis pertamamu.' },
    icon: '🧠',
    check: (s) => s.quizCompleteCount >= 1,
  },
  {
    id: 'quiz-master',
    name: { en: 'Quiz Master', id: 'Master Kuis' },
    description: { en: 'Finish 5 quizzes.', id: 'Selesaikan 5 kuis.' },
    icon: '🏆',
    check: (s) => s.quizCompleteCount >= 5,
  },
  {
    id: 'streak-3',
    name: { en: 'Three Day Glow', id: 'Cahaya Tiga Hari' },
    description: { en: 'Visit 3 days in a row.', id: 'Hadir 3 hari berturut-turut.' },
    icon: '🔥',
    check: (s) => s.streak >= 3 || s.longestStreak >= 3,
  },
  {
    id: 'streak-7',
    name: { en: 'Weekly Devotee', id: 'Setia Mingguan' },
    description: { en: 'Visit 7 days in a row.', id: 'Hadir 7 hari berturut-turut.' },
    icon: '🌟',
    check: (s) => s.streak >= 7 || s.longestStreak >= 7,
  },
  {
    id: 'streak-30',
    name: { en: 'Heritage Devotee', id: 'Pengabdi Warisan' },
    description: { en: 'Visit 30 days in a row.', id: 'Hadir 30 hari berturut-turut.' },
    icon: '👑',
    check: (s) => s.streak >= 30 || s.longestStreak >= 30,
  },
  {
    id: 'collector-10',
    name: { en: 'Collector', id: 'Kolektor' },
    description: { en: 'Save 10 motifs in your diary.', id: 'Simpan 10 motif di Diary.' },
    icon: '📔',
    check: (s) => s.diary.length >= 10,
  },
  {
    id: 'fav-5',
    name: { en: 'Heart of Wastra', id: 'Hati Wastra' },
    description: { en: 'Favorite 5 motifs.', id: 'Favoritkan 5 motif.' },
    icon: '❤️',
    check: (s) => s.favorites.length >= 5,
  },
  {
    id: 'reader',
    name: { en: 'Bookworm', id: 'Kutu Buku' },
    description: { en: 'Read 20 motif articles.', id: 'Baca 20 artikel motif.' },
    icon: '📚',
    check: (s) => s.readCount >= 20,
  },
  {
    id: 'sharer',
    name: { en: 'Storyteller', id: 'Pencerita' },
    description: { en: 'Share batik 3 times.', id: 'Bagikan batik 3 kali.' },
    icon: '📣',
    check: (s) => s.shareCount >= 3,
  },
  {
    id: 'level-5',
    name: { en: 'Heritage Keeper', id: 'Penjaga Warisan' },
    description: { en: 'Reach Level 5.', id: 'Capai Level 5.' },
    icon: '🛡️',
    check: (s) => levelFromXp(s.xp) >= 5,
  },
  {
    id: 'level-10',
    name: { en: 'Living Legend', id: 'Legenda Hidup' },
    description: { en: 'Reach the highest level.', id: 'Capai level tertinggi.' },
    icon: '🌺',
    check: (s) => levelFromXp(s.xp) >= 10,
  },
];

const evaluateBadges = (state: EngagementState): { allUnlocked: string[]; newlyUnlocked: BadgeDef[] } => {
  const newlyUnlocked: BadgeDef[] = [];
  const allUnlocked = [...state.unlockedBadges];
  for (const badge of BADGES) {
    if (!allUnlocked.includes(badge.id) && badge.check(state)) {
      allUnlocked.push(badge.id);
      newlyUnlocked.push(badge);
    }
  }
  return { allUnlocked, newlyUnlocked };
};

const initialState: EngagementState = {
  streak: 0,
  lastVisit: null,
  longestStreak: 0,
  xp: 0,
  level: 1,
  unlockedBadges: [],
  diary: [],
  favorites: [],
  scanCount: 0,
  quizCompleteCount: 0,
  readCount: 0,
  shareCount: 0,
  soundEnabled: true,
  reducedMotion: false,
  dailyQuizDate: null,
};

export const useEngagement = create<EngagementStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      awardXp: (reason, multiplier = 1) => {
        const gain = Math.round(XP_REWARDS[reason] * multiplier);
        const before = get();
        const beforeLevel = levelFromXp(before.xp);
        const newXp = before.xp + gain;
        const afterLevel = levelFromXp(newXp);

        // counters
        const counters: Partial<EngagementState> = {};
        if (reason === 'scan') counters.scanCount = before.scanCount + 1;
        if (reason === 'quiz-complete') counters.quizCompleteCount = before.quizCompleteCount + 1;
        if (reason === 'read-motif') counters.readCount = before.readCount + 1;
        if (reason === 'share') counters.shareCount = before.shareCount + 1;

        const draft: EngagementState = {
          ...before,
          ...counters,
          xp: newXp,
          level: afterLevel,
        };
        const { allUnlocked, newlyUnlocked } = evaluateBadges(draft);
        set({ ...draft, unlockedBadges: allUnlocked });
        return { xpGained: gain, leveledUp: afterLevel > beforeLevel, newBadges: newlyUnlocked };
      },

      recordVisit: () => {
        const t = today();
        const before = get();
        if (before.lastVisit === t) {
          return { streakChanged: false, newStreak: before.streak };
        }
        const wasYesterday = before.lastVisit === yesterday();
        const newStreak = wasYesterday ? before.streak + 1 : 1;
        const newLongest = Math.max(before.longestStreak, newStreak);
        const draft: EngagementState = {
          ...before,
          streak: newStreak,
          longestStreak: newLongest,
          lastVisit: t,
        };
        const { allUnlocked } = evaluateBadges(draft);
        set({ ...draft, unlockedBadges: allUnlocked });
        return { streakChanged: true, newStreak };
      },

      addDiary: (entry) => {
        const before = get();
        // dedupe by motifId+source within last 5 minutes
        const now = Date.now();
        const exists = before.diary.find(
          (e) => e.motifId === entry.motifId && e.source === entry.source && now - e.timestamp < 5 * 60 * 1000,
        );
        if (exists) return;
        const newEntry: DiaryEntry = {
          ...entry,
          id: `d_${now}_${Math.random().toString(36).slice(2, 8)}`,
          timestamp: now,
        };
        const draft = { ...before, diary: [newEntry, ...before.diary].slice(0, 200) };
        const { allUnlocked } = evaluateBadges(draft);
        set({ ...draft, unlockedBadges: allUnlocked });
      },

      toggleFavorite: (motifId) => {
        const before = get();
        const isFav = before.favorites.includes(motifId);
        const favorites = isFav ? before.favorites.filter((id) => id !== motifId) : [...before.favorites, motifId];
        const draft = { ...before, favorites };
        const { allUnlocked } = evaluateBadges(draft);
        set({ ...draft, unlockedBadges: allUnlocked });
        return !isFav;
      },

      isFavorite: (motifId) => get().favorites.includes(motifId),

      markDailyQuizDone: () => set({ dailyQuizDate: today() }),

      hasDailyQuizDone: () => get().dailyQuizDate === today(),

      setSoundEnabled: (v) => set({ soundEnabled: v }),
      setReducedMotion: (v) => set({ reducedMotion: v }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'batiklens-engagement-v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
