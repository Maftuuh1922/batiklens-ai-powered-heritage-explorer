import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Trophy, BookOpen, Heart, ScanLine, Brain, Award, Calendar, ChevronRight, LogIn, LogOut, UserCircle2 } from 'lucide-react';
import { useEngagement, levelFromXp, titleForLevel, BADGES } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { userAvatarUrl, userDisplayName } from '@/lib/auth-utils';
import { batiks } from '@/lib/batik-data';
import { XpBar } from '@/components/engagement/XpBar';
import { BadgeGrid } from '@/components/engagement/BadgeGrid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fmtDate = (ts: number, lang: 'id' | 'en'): string =>
  new Date(ts).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export function ProfilePage() {
  const { language } = useLanguage();
  const { user, signOut, loading: authLoading, isConfigured } = useAuth();
  const xp = useEngagement((s) => s.xp);
  const streak = useEngagement((s) => s.streak);
  const longest = useEngagement((s) => s.longestStreak);
  const scanCount = useEngagement((s) => s.scanCount);
  const quizCompleteCount = useEngagement((s) => s.quizCompleteCount);
  const readCount = useEngagement((s) => s.readCount);
  const diary = useEngagement((s) => s.diary);
  const favorites = useEngagement((s) => s.favorites);
  const unlocked = useEngagement((s) => s.unlockedBadges);

  const level = levelFromXp(xp);
  const totalBadges = BADGES.length;

  const favoriteBatiks = favorites
    .map((id) => batiks.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const stats = [
    {
      icon: Flame,
      label: language === 'id' ? 'STREAK' : 'STREAK',
      value: streak,
      sub: language === 'id' ? `Terpanjang: ${longest}` : `Longest: ${longest}`,
      tint: 'text-orange-500',
    },
    {
      icon: ScanLine,
      label: language === 'id' ? 'PINDAIAN' : 'SCANS',
      value: scanCount,
      sub: language === 'id' ? 'Total pindai' : 'Total scans',
      tint: 'text-emerald-500',
    },
    {
      icon: Brain,
      label: language === 'id' ? 'KUIS' : 'QUIZZES',
      value: quizCompleteCount,
      sub: language === 'id' ? 'Selesai' : 'Completed',
      tint: 'text-indigo-500',
    },
    {
      icon: BookOpen,
      label: language === 'id' ? 'DIBACA' : 'READ',
      value: readCount,
      sub: language === 'id' ? 'Artikel motif' : 'Motif articles',
      tint: 'text-sky-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/30 dark:via-background dark:to-orange-950/30 p-6 md:p-10"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500 p-1 shadow-2xl shadow-orange-500/30">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-serif text-4xl md:text-5xl font-bold">
                {level}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-foreground text-background">
              LVL
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              {language === 'id' ? 'PROFIL KAMU' : 'YOUR PROFILE'}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mt-1 mb-3">
              {titleForLevel(level, language)}
            </h1>
            <XpBar showTitle={false} />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-foreground/15 bg-background/60">
                <Trophy className="h-3 w-3 text-gold" />
                {unlocked.length}/{totalBadges} {language === 'id' ? 'BADGE' : 'BADGES'}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-orange-400/40 bg-orange-400/5 text-orange-600 dark:text-orange-400">
                <Flame className="h-3 w-3" />
                {streak} {language === 'id' ? 'HARI' : 'DAYS'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account section */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        className="mt-6 rounded-2xl border border-foreground/10 bg-background/60 p-5 md:p-6"
      >
        {authLoading ? (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="h-12 w-12 rounded-full bg-muted/50" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 rounded bg-muted/50" />
              <div className="h-3 w-48 rounded bg-muted/30" />
            </div>
          </div>
        ) : user ? (
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="h-12 w-12">
              {userAvatarUrl(user) && <AvatarImage src={userAvatarUrl(user)!} alt={userDisplayName(user)} />}
              <AvatarFallback>
                {userDisplayName(user)
                  .split(/\s+/)
                  .map((p) => p[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'B'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                {language === 'id' ? 'AKUN' : 'ACCOUNT'}
              </p>
              <p className="text-base font-medium truncate">{userDisplayName(user)}</p>
              {user.email && (
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={() => void signOut()}>
              <LogOut className="w-3.5 h-3.5 mr-2" />
              {language === 'id' ? 'Keluar' : 'Sign out'}
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <UserCircle2 className="w-10 h-10 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {language === 'id' ? 'Masuk untuk simpan progres lintas perangkat' : 'Sign in to save progress across devices'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'id'
                  ? 'Streak, XP, badge, dan diary kamu tetap aman saat ganti hp / browser.'
                  : 'Keep your streak, XP, badges, and diary safe when you change devices or browsers.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button size="sm" variant="outline" disabled={!isConfigured}>
                  <LogIn className="w-3.5 h-3.5 mr-2" />
                  {language === 'id' ? 'Masuk' : 'Sign in'}
                </Button>
              </Link>
              {isConfigured && (
                <Link to="/signup">
                  <Button size="sm">{language === 'id' ? 'Daftar' : 'Sign up'}</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </motion.section>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
        {stats.map(({ icon: Icon, label, value, sub, tint }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            className="rounded-2xl border border-foreground/10 bg-background/60 p-4 md:p-5"
          >
            <div className="flex items-center justify-between">
              <Icon className={`w-4 h-4 ${tint}`} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </span>
            </div>
            <div className="mt-2 text-3xl md:text-4xl font-serif font-bold tabular-nums">{value}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mt-1">{sub}</div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="badges" className="mt-10">
        <TabsList>
          <TabsTrigger value="badges">
            <Award className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Badge' : 'Badges'}
          </TabsTrigger>
          <TabsTrigger value="diary">
            <Calendar className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Diary' : 'Diary'}
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Favorit' : 'Favorites'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-6">
          <BadgeGrid />
        </TabsContent>

        <TabsContent value="diary" className="mt-6">
          {diary.length === 0 ? (
            <EmptyState
              title={language === 'id' ? 'Diary masih kosong' : 'Your diary is empty'}
              desc={
                language === 'id'
                  ? 'Mulai pindai motif atau buka detail batik untuk mengisi catatanmu.'
                  : 'Scan a motif or open a batik detail to start filling your diary.'
              }
              cta={language === 'id' ? 'Pindai Sekarang' : 'Scan Now'}
              to="/scan"
            />
          ) : (
            <ul className="space-y-3">
              {diary.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-3 hover:bg-foreground/[0.03] transition-colors"
                >
                  <img
                    src={entry.imageUrl}
                    alt={entry.motifName}
                    loading="lazy"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover border border-foreground/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-bold truncate">{entry.motifName}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {entry.source} · {fmtDate(entry.timestamp, language)}
                    </div>
                  </div>
                  <Link to={`/batik/${entry.motifId}`}>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {favoriteBatiks.length === 0 ? (
            <EmptyState
              title={language === 'id' ? 'Belum ada favorit' : 'No favorites yet'}
              desc={
                language === 'id'
                  ? 'Tekan ikon hati di halaman motif untuk menyimpannya di sini.'
                  : 'Tap the heart icon on any motif to save it here.'
              }
              cta={language === 'id' ? 'Jelajahi Katalog' : 'Browse Catalog'}
              to="/catalog"
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {favoriteBatiks.map((b) => (
                <Link
                  key={b.id}
                  to={`/batik/${b.id}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-foreground/10"
                >
                  <img
                    src={b.imageUrl}
                    alt={b.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-white font-serif font-bold text-sm md:text-base truncate">{b.name}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/70">{b.origin}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ title, desc, cta, to }: { title: string; desc: string; cta: string; to: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-foreground/15 p-10 md:p-16 text-center">
      <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">{desc}</p>
      <Link to={to}>
        <Button className="rounded-full px-6 py-5 font-black uppercase text-[10px] tracking-[0.2em]">{cta}</Button>
      </Link>
    </div>
  );
}
