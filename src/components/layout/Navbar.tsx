import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ScanLine, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/lib/LanguageContext';
import { StreakIndicator } from '@/components/engagement/StreakIndicator';
import { UserMenu } from '@/components/auth/UserMenu';
import { useEngagement, levelFromXp } from '@/lib/engagement';

const getNavbarBorderStyle = (lvl: number) => {
  if (lvl >= 50) return 'border-fuchsia-500/80 shadow-[0_0_30px_rgba(217,70,239,0.5)] dark:border-fuchsia-400/80 dark:shadow-[0_0_40px_rgba(217,70,239,0.4)]';
  if (lvl >= 25) return 'border-orange-500/80 shadow-[0_0_30px_rgba(249,115,22,0.5)] dark:border-orange-400/80 dark:shadow-[0_0_40px_rgba(249,115,22,0.4)]';
  if (lvl >= 10) return 'border-indigo-500/80 shadow-[0_0_30px_rgba(99,102,241,0.5)] dark:border-indigo-400/80 dark:shadow-[0_0_40px_rgba(99,102,241,0.4)]';
  if (lvl >= 5) return 'border-emerald-500/80 shadow-[0_0_30px_rgba(16,185,129,0.5)] dark:border-emerald-400/80 dark:shadow-[0_0_40px_rgba(16,185,129,0.4)]';
  return 'border-gold/60 shadow-[0_8px_32px_-8px_rgba(212,175,55,0.4)] dark:border-gold/50 dark:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.4)]';
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const xp = useEngagement((s) => s.xp);
  const level = levelFromXp(xp);
  const closeMenu = () => setIsOpen(false);

  const navBorder = getNavbarBorderStyle(level);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pointer-events-none">

      <div className="mx-auto max-w-7xl group">
        {/* Glow effect behind the navbar */}
        <div className={`absolute inset-0 blur-[40px] opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none scale-105 rounded-full ${level >= 50 ? 'bg-fuchsia-500/40 animate-pulse' : level >= 25 ? 'bg-orange-500/40 animate-pulse' : 'bg-batik-gold/30'}`} />
        
        <nav className={`relative bg-background/80 dark:bg-background/60 backdrop-blur-3xl rounded-full border-2 ${navBorder} pointer-events-auto transition-all duration-500 overflow-hidden hover:brightness-110`}>
          
          {/* Inner ambient light */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 pointer-events-none" />
          
          <div className="px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="flex justify-between items-center h-16 md:h-[72px]">
              <div className="flex-shrink-0">
            <Link to="/" id="nav-home" className="flex items-center gap-2 group">
              <KawungLogo className="h-7 w-7 md:h-8 md:w-8 text-foreground transition-transform group-hover:rotate-90 duration-700" />
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-foreground group-hover:opacity-80 transition-opacity">
                BatikLens.
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-6">
            <Link
              id="nav-catalog"
              to="/catalog"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.catalog')}
            </Link>
            <Link
              id="nav-museum"
              to="/museum"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.museum')}
            </Link>
            <Link
              id="nav-daily"
              to="/daily"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.daily')}
            </Link>
            <Link to="/scan" id="nav-scan">
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 px-6 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-transform active:scale-95"
              >
                <ScanLine className="w-3.5 h-3.5" />
                {t('nav.scan')}
              </Button>
            </Link>

            <div className="h-6 w-px bg-border/50 mx-2 hidden lg:block" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <StreakIndicator />
              <UserMenu />
              <LanguageSwitcher />
              <ThemeToggle className="static" />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
            <StreakIndicator compact />
            <UserMenu />
            <ThemeToggle className="static" />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-foreground/5 -mr-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-3xl border-l border-foreground/5 w-[280px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full py-12 px-6">
                  <div className="flex justify-between items-start mb-2">
                    <SheetTitle className="text-left font-serif text-2xl flex items-center gap-2">
                      <KawungLogo className="h-6 w-6" />
                      BatikLens.
                    </SheetTitle>
                  </div>
                  <SheetDescription className="text-[10px] uppercase tracking-widest text-muted-foreground mb-8 pb-4 border-b border-foreground/5">
                    {t('nav.tagline')}
                  </SheetDescription>
                  <nav className="flex flex-col space-y-5">
                    <Link to="/" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2">
                      {t('nav.home')}
                    </Link>
                    <Link to="/catalog" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2">
                      {t('nav.catalog')}
                    </Link>
                    <Link to="/museum" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2">
                      {t('nav.museum')}
                    </Link>
                    <Link to="/daily" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      {t('nav.daily')}
                    </Link>
                    <Link to="/scan" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2 flex items-center gap-2">
                      <ScanLine className="w-4 h-4" />
                      {t('nav.scan')}
                    </Link>
                  </nav>

                  <div className="mt-auto pt-8 border-t border-foreground/5 space-y-4">
                    <UserMenu variant="mobile" onAction={closeMenu} />
                    <div className="flex items-center gap-2 pt-2 border-t border-foreground/5">
                      <LanguageSwitcher />
                    </div>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">
                      {t('nav.preserving')}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </nav>
      </div>
    </div>
  );
};

/** Tiny inline SVG of a Kawung-inspired motif used as the brand mark. */
function KawungLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <ellipse cx="16" cy="6.5" rx="5" ry="7" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="16" cy="25.5" rx="5" ry="7" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="6.5" cy="16" rx="7" ry="5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="25.5" cy="16" rx="7" ry="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}
