import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Trophy, BookOpen, Heart, ScanLine, Brain, Award, Calendar, ChevronRight, LogIn, LogOut, UserCircle2, Crown, Component, Medal, Target, CheckCircle2 } from 'lucide-react';
import { useEngagement, levelFromXp, titleForLevel, BADGES } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { userAvatarUrl, userDisplayName } from '@/lib/auth-utils';
import { batiks } from '@/lib/batik-data';
import { XpBar } from '@/components/engagement/XpBar';
import { BadgeGrid } from '@/components/engagement/BadgeGrid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BatikPattern } from '@/components/ornaments/BatikPattern';
import { BatikDivider } from '@/components/ornaments/BatikDivider';
import { BatikCornerOrnament } from '@/components/ornaments/BatikCornerOrnament';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fmtDate = (ts: number, lang: 'id' | 'en'): string =>
  new Date(ts).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const getLevelStyle = (lvl: number) => {
  if (lvl >= 50) return { // Mythic Effect (Surya Majapahit Star)
    ornament1: 'absolute inset-[-18%] bg-gradient-to-tr from-purple-600 via-amber-400 to-fuchsia-600 animate-[spin_12s_linear_infinite] [clip-path:polygon(50%_0%,61%_20%,85%_15%,80%_40%,100%_50%,80%_60%,85%_85%,61%_80%,50%_100%,39%_80%,15%_85%,20%_60%,0%_50%,20%_40%,15%_15%,39%_20%)] opacity-90',
    ornament2: 'absolute inset-[-6%] border-[3px] border-dashed border-gold/60 animate-[spin_20s_linear_infinite_reverse] rounded-full z-0',
    badge: 'bg-background border border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-110',
  };
  if (lvl >= 25) return { // Ruby Effect (Hexagonal Gem)
    ornament1: 'absolute inset-[-12%] bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 animate-[spin_8s_linear_infinite] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] opacity-90',
    ornament2: 'absolute inset-[-3%] border-2 border-dotted border-orange-400/80 animate-[spin_10s_linear_infinite_reverse] rounded-full z-0',
    badge: 'bg-background border border-orange-500 text-orange-600 dark:text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)] scale-105',
  };
  if (lvl >= 10) return { // Sapphire Effect
    ornament1: 'absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-500 to-violet-500',
    ornament2: 'absolute inset-[-5%] rounded-full border-[1.5px] border-indigo-400/30 z-0',
    badge: 'bg-indigo-600 text-white border-transparent',
  };
  if (lvl >= 5) return { // Emerald Effect
    ornament1: 'absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500',
    ornament2: '',
    badge: 'bg-emerald-600 text-white border-transparent',
  };
  return { // Amber Effect
    ornament1: 'absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500',
    ornament2: '',
    badge: 'bg-foreground text-background border-background',
  };
};

const getLevelHeroTheme = (lvl: number) => {
  if (lvl >= 50) return { // Mythic Theme
    bg: 'bg-gradient-to-br from-fuchsia-900/10 via-purple-900/10 to-transparent dark:from-fuchsia-500/10 dark:via-purple-800/10',
    border: 'border-fuchsia-500/30',
    glow: 'bg-fuchsia-500/20 blur-3xl animate-pulse',
    pattern: 'text-fuchsia-600/10 dark:text-fuchsia-400/10'
  };
  if (lvl >= 25) return { // Ruby Theme
    bg: 'bg-gradient-to-br from-red-900/10 via-orange-900/10 to-transparent dark:from-orange-500/10 dark:via-red-800/10',
    border: 'border-orange-500/30',
    glow: 'bg-orange-500/20 blur-3xl',
    pattern: 'text-orange-600/10 dark:text-orange-400/10'
  };
  if (lvl >= 10) return { // Sapphire Theme
    bg: 'bg-gradient-to-br from-blue-900/10 via-indigo-900/10 to-transparent dark:from-blue-500/10 dark:via-indigo-800/10',
    border: 'border-indigo-500/30',
    glow: 'bg-indigo-500/20 blur-3xl',
    pattern: 'text-indigo-600/10 dark:text-indigo-400/10'
  };
  if (lvl >= 5) return { // Emerald Theme
    bg: 'bg-gradient-to-br from-emerald-900/10 via-teal-900/10 to-transparent dark:from-emerald-500/10 dark:via-teal-800/10',
    border: 'border-emerald-500/30',
    glow: 'bg-emerald-500/20 blur-3xl',
    pattern: 'text-emerald-600/10 dark:text-emerald-400/10'
  };
  return { // Default Theme
    bg: 'bg-[hsl(var(--paper-cream))]/70 dark:bg-foreground/[0.03]',
    border: 'border-gold/25',
    glow: 'bg-gold/10 blur-3xl',
    pattern: 'text-sogan dark:text-gold opacity-10'
  };
};

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

  const heroTheme = getLevelHeroTheme(level);

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
        className={`relative overflow-hidden rounded-3xl border ${heroTheme.border} ${heroTheme.bg} backdrop-blur-sm shadow-[0_18px_60px_-20px_hsl(var(--batik-navy)/0.35)] p-6 md:p-10`}
      >
        <BatikPattern motif="kawung" opacity={0.08} className={heroTheme.pattern} />
        <BatikCornerOrnament corner="tl" />
        <BatikCornerOrnament corner="tr" />
        <BatikCornerOrnament corner="bl" />
        <BatikCornerOrnament corner="br" />
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${heroTheme.glow}`} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
          
          <div className="relative mt-8 md:mt-0">
            {/* Level-based border formatting */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0">
              
              {/* Outer Shape (Surya/Hexagon) */}
              <div className={`z-0 ${getLevelStyle(level).ornament1}`} />
              
              {/* Dashed/Dotted Ring */}
              <div className={`z-0 ${getLevelStyle(level).ornament2}`} />

              <div className="relative z-10 w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full bg-background flex items-center justify-center overflow-hidden border-[3.5px] border-background shadow-inner">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full h-full rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold/50 cursor-pointer">
                        <Avatar className="w-full h-full rounded-full ring-0 border-0">
                          {userAvatarUrl(user) && <AvatarImage src={userAvatarUrl(user)!} alt={userDisplayName(user)} className="object-cover rounded-full" />}
                          <AvatarFallback className="bg-muted text-2xl font-serif font-bold rounded-full">
                            {userDisplayName(user)
                              .split(/\s+/)
                              .map((p) => p[0])
                              .filter(Boolean)
                              .slice(0, 2)
                              .join('')
                              .toUpperCase() || 'B'}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none truncate">{userDisplayName(user)}</p>
                          <p className="text-xs leading-none text-muted-foreground truncate">
                            {user.email || ''}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => void signOut()} className="text-red-500 hover:text-red-600 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{language === 'id' ? 'Keluar' : 'Sign out'}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login" className="w-full h-full bg-background flex items-center justify-center font-serif text-4xl md:text-5xl font-bold cursor-pointer hover:bg-muted/30 transition-colors">
                    {level}
                  </Link>
                )}
              </div>
            </div>
            
            {/* Level Badge floated at the bottom */}
            <div className={`absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 md:py-1 rounded-full border-[1.5px] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-md z-20 transition-transform ${getLevelStyle(level).badge}`}>
              LVL {level}
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full mt-2 md:mt-0">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              {language === 'id' ? 'PROFIL KAMU' : 'YOUR PROFILE'}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mt-1 mb-1">
              {titleForLevel(level, language)}
            </h1>
            {user && (
              <p className="text-sm md:text-base font-medium text-foreground/80 mb-3">{userDisplayName(user)}</p>
            )}
            {!user && <div className="h-4"></div>}
            
            <XpBar showTitle={false} />
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
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

      {/* Stats Divider */}
      <BatikDivider className="mt-10 mb-2" label={language === 'id' ? 'Statistik' : 'Stats'} />

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
        {stats.map(({ icon: Icon, label, value, sub, tint }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            className="relative rounded-2xl border border-gold/20 bg-[hsl(var(--paper-cream))]/60 dark:bg-foreground/[0.03] p-4 md:p-5 overflow-hidden hover:border-gold/40 transition-colors"
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
        <TabsList className="flex flex-wrap h-auto justify-center gap-1 bg-transparent p-0">
          <TabsTrigger value="badges" className="rounded-full data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            <Award className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Badge' : 'Badges'}
          </TabsTrigger>
          <TabsTrigger value="ranks" className="rounded-full data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            <Crown className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Tingkat' : 'Ranks'}
          </TabsTrigger>
          <TabsTrigger value="diary" className="rounded-full data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            <Calendar className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Diary' : 'Diary'}
          </TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-full data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            <Heart className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Favorit' : 'Favorites'}
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="rounded-full data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            <Medal className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Peringkat' : 'Leaderboard'}
          </TabsTrigger>
          <TabsTrigger value="missions" className="rounded-full data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
            <Target className="w-3.5 h-3.5 mr-2" />
            {language === 'id' ? 'Panduan Misi' : 'Missions'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-6">
          <BadgeGrid />
        </TabsContent>

        <TabsContent value="missions" className="mt-6 space-y-8">
          
          {/* Daily Quests Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-6 bg-emerald-500 rounded-full" />
              <h2 className="text-xl font-serif font-bold text-emerald-600 dark:text-emerald-400">
                {language === 'id' ? 'Misi Harian (Daily Quests)' : 'Daily Quests'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: language === 'id' ? 'Batik Flap (Mini-Game)' : 'Batik Flap (Mini-Game)',
                  desc: language === 'id' ? 'Mainkan game ini untuk grinding skor! Ganti motif setiap 5 skor.' : 'Play this game to grind XP! Changes motif every 5 score.',
                  xp: 'Score × 10 XP',
                  link: '/minigame',
                  linkText: language === 'id' ? 'Mainkan' : 'Play Now'
                },
                {
                  title: language === 'id' ? 'Kuis Tantangan Harian' : 'Daily Challenge Quiz',
                  desc: language === 'id' ? 'Uji wawasanmu lewat menu Tantangan Harian. Di-refresh setiap fajar.' : 'Test your knowledge in the Daily Challenge. Refreshes every dawn.',
                  xp: '+500 XP',
                  link: '/daily',
                  linkText: language === 'id' ? 'Mulai Kuis' : 'Start Quiz'
                },
                {
                  title: language === 'id' ? 'Pindai Batik Hari Ini' : 'Scan a Batik Today',
                  desc: language === 'id' ? 'Temukan kain batik di dunia nyata dan pindai dengan kamera cerdas kami.' : 'Find real batik fabrics and scan them with our smart AI camera.',
                  xp: '+250 XP',
                  link: '/scan',
                  linkText: language === 'id' ? 'Buka Kamera' : 'Open Camera'
                },
                {
                  title: language === 'id' ? 'Login Harian (Streak)' : 'Daily Login (Streak)',
                  desc: language === 'id' ? 'Buka aplikasi BatikLens setiap hari untuk menjaga rentetan kehadiranmu.' : 'Open BatikLens everyday to maintain your attendance streak.',
                  xp: '+100 XP',
                  link: '/',
                  linkText: language === 'id' ? 'Otomatis' : 'Automatic'
                }
              ].map((mission, idx) => (
                <motion.div
                  key={'daily-' + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 hover:bg-emerald-500/10 transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-lg">{mission.title}</h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        {mission.xp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 pr-4">
                      {mission.desc}
                    </p>
                  </div>
                  {mission.linkText !== 'Otomatis' && mission.linkText !== 'Automatic' ? (
                    <Link to={mission.link}>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-full font-black uppercase tracking-widest text-[10px] border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors">
                        {mission.linkText} <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      {language === 'id' ? 'Diklaim setiap hari' : 'Claimed daily'}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Exploration Quests Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-6 bg-gold rounded-full" />
              <h2 className="text-xl font-serif font-bold text-gold">
                {language === 'id' ? 'Misi Eksplorasi (Milestones)' : 'Exploration Milestones'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: language === 'id' ? 'Eksplorasi Galeri Nusantara' : 'Nusantara Gallery Explorer',
                  desc: language === 'id' ? 'Berjalan-jalan di dalam galeri virtual 3D dan klik semua lukisan batik rahasia.' : 'Walk inside the virtual 3D gallery and click all secret batik paintings.',
                  xp: '+5000 XP',
                  link: '/museum',
                  linkText: language === 'id' ? 'Masuk Galeri' : 'Enter Gallery'
                },
                {
                  title: language === 'id' ? 'Pustakawan Batik' : 'Batik Librarian',
                  desc: language === 'id' ? 'Buka menu Katalog, pilih salah satu batik, dan baca artikelnya dari atas sampai bawah untuk mendapat XP!' : 'Open the Catalog menu, click a batik, and read the article top to bottom to get XP!',
                  xp: '+50 XP / Artikel',
                  link: '/catalog',
                  linkText: language === 'id' ? 'Buka Katalog' : 'Open Catalog'
                },
                {
                  title: language === 'id' ? 'Kolektor Mahakarya' : 'Masterpiece Collector',
                  desc: language === 'id' ? 'Saat membaca batik di Katalog, klik ikon "Hati" (Like) untuk menyimpan batik ke dalam koleksi pribadimu.' : 'While reading about a batik in the Catalog, click the "Heart" (Like) icon to save it to your personal collection.',
                  xp: '+25 XP / Favorit',
                  link: '/catalog',
                  linkText: language === 'id' ? 'Cari Batik' : 'Find Batik'
                }
              ].map((mission, idx) => (
                <motion.div
                  key={'explore-' + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col justify-between rounded-2xl border border-gold/20 bg-background/50 p-5 hover:bg-gold/5 transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-full pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-lg">{mission.title}</h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest bg-gold/10 text-gold border border-gold/20">
                        {mission.xp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 pr-4">
                      {mission.desc}
                    </p>
                  </div>
                  <Link to={mission.link}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-full font-black uppercase tracking-widest text-[10px] border-gold/30 hover:bg-gold/10 hover:text-gold transition-colors">
                      {mission.linkText} <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <div className="rounded-2xl border border-gold/20 bg-background/50 overflow-hidden shadow-inner">
             {/* Mock Leaderboard Data Generator */}
             {(() => {
                const dummyPlayers = [
                  { name: 'Kanjeng Ratu', lvl: 52, xp: 135000, isCurrentUser: false },
                  { name: 'Batik Enthusiast', lvl: 48, xp: 115000, isCurrentUser: false },
                  { name: 'Wastra Warrior', lvl: 35, xp: 62000, isCurrentUser: false },
                  { name: 'Motif Seeker', lvl: 28, xp: 39000, isCurrentUser: false },
                  { name: 'Nusantara Heritage', lvl: 22, xp: 24000, isCurrentUser: false },
                  { name: 'Batik Explorer', lvl: 15, xp: 11000, isCurrentUser: false },
                  { name: 'Newbie Weaver', lvl: 8, xp: 3200, isCurrentUser: false },
                  { name: 'Artisan Soul', lvl: 4, xp: 800, isCurrentUser: false },
                ];
                
                // Add current user
                dummyPlayers.push({ 
                  name: user ? userDisplayName(user) : (language === 'id' ? 'Anda' : 'You'), 
                  lvl: level, 
                  xp: xp, 
                  isCurrentUser: true 
                });
                
                // Sort by XP
                dummyPlayers.sort((a, b) => b.xp - a.xp);

                return dummyPlayers.slice(0, 10).map((player, idx) => {
                  const pStyle = getLevelStyle(player.lvl);
                  const isTop3 = idx < 3;
                  
                  return (
                    <motion.div 
                      key={player.name + idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex items-center p-3 sm:p-4 border-b border-foreground/5 last:border-0 ${player.isCurrentUser ? 'bg-gold/10' : 'hover:bg-foreground/[0.02]'} transition-colors relative overflow-hidden`}
                    >
                      {player.isCurrentUser && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,1)]" />
                      )}
                      
                      <div className={`w-8 font-black text-center ${idx === 0 ? 'text-yellow-500 drop-shadow-md text-xl' : idx === 1 ? 'text-gray-400 drop-shadow text-lg' : idx === 2 ? 'text-amber-600 drop-shadow text-lg' : 'text-muted-foreground'}`}>
                        {idx + 1}
                      </div>
                      
                      <div className="flex-1 ml-4 min-w-0 flex items-center gap-3">
                         <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                            <div className={`z-0 ${pStyle.ornament1}`} />
                            <div className="relative z-10 w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full bg-background flex items-center justify-center border-2 border-background shadow-inner text-[10px] font-bold">
                               L{player.lvl}
                            </div>
                         </div>
                         <div className="truncate">
                           <div className={`font-serif font-bold ${player.isCurrentUser ? 'text-gold' : ''}`}>{player.name}</div>
                           <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{titleForLevel(player.lvl, language)}</div>
                         </div>
                      </div>
                      
                      <div className="text-right ml-4">
                         <div className="font-mono text-sm font-bold">{player.xp.toLocaleString()}</div>
                         <div className="text-[9px] uppercase tracking-widest text-muted-foreground">XP</div>
                      </div>
                    </motion.div>
                  );
                });
             })()}
          </div>
        </TabsContent>

        <TabsContent value="ranks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                lvlNum: 1,
                lvl: '1 - 4',
                idName: 'Pewarna Madya (Amber)',
                enName: 'Apprentice Dyer (Amber)',
              },
              {
                lvlNum: 5,
                lvl: '5 - 9',
                idName: 'Perintis (Emerald)',
                enName: 'Pathfinder (Emerald)',
              },
              {
                lvlNum: 10,
                lvl: '10 - 24',
                idName: 'Pakar Wastra (Sapphire)',
                enName: 'Wastra Expert (Sapphire)',
              },
              {
                lvlNum: 25,
                lvl: '25 - 49',
                idName: 'Pandhita (Ruby)',
                enName: 'Grandmaster (Ruby)',
              },
              {
                lvlNum: 50,
                lvl: '50+',
                idName: 'Legenda Keraton (Mythic)',
                enName: 'Royal Legend (Mythic)',
              }
            ].map((tier, idx) => {
              const tStyle = getLevelStyle(tier.lvlNum);
              return (
              <motion.div
                key={tier.lvl}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-gold/10 bg-background/50 p-4 hover:bg-muted/30 transition-colors relative overflow-hidden"
              >
                {/* Subtle backglow for high rank cards */}
                {tier.lvlNum >= 50 && <div className="absolute inset-0 bg-purple-500/10 blur-xl pointer-events-none" />}
                
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <div className={`z-0 ${tStyle.ornament1}`} />
                  <div className={`z-0 ${tStyle.ornament2}`} />
                  <div className="relative z-10 w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full bg-background flex items-center justify-center border-[2.5px] border-background shadow-inner">
                    <UserCircle2 className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] font-black tracking-[0.2em] text-gold uppercase mb-1">
                    LEVEL {tier.lvl}
                  </div>
                  <div className="font-serif font-bold text-sm leading-tight">
                    {language === 'id' ? tier.idName : tier.enName}
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
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
