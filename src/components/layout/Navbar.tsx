import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ScanLine, Brain, BookOpen, Home, LayoutGrid, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/lib/LanguageContext';
import { UserMenu } from '@/components/auth/UserMenu';
import { useEngagement, levelFromXp } from '@/lib/engagement';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const getNavbarBorderStyle = (lvl: number) => {
  if (lvl >= 50) return 'border-fuchsia-500/60 shadow-[0_0_24px_rgba(217,70,239,0.35)]';
  if (lvl >= 25) return 'border-orange-500/60 shadow-[0_0_24px_rgba(249,115,22,0.35)]';
  if (lvl >= 10) return 'border-indigo-500/60 shadow-[0_0_24px_rgba(99,102,241,0.35)]';
  if (lvl >= 5)  return 'border-emerald-500/60 shadow-[0_0_24px_rgba(16,185,129,0.35)]';
  return 'border-gold/40 shadow-[0_8px_24px_-8px_rgba(212,175,55,0.3)]';
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const xp  = useEngagement((s) => s.xp);
  const streak = useEngagement((s) => s.streak);
  const level = levelFromXp(xp);
  const { pathname } = useLocation();
  const closeMenu = () => setIsOpen(false);
  const navBorder = getNavbarBorderStyle(level);

  const navLinks = [
    { to: '/catalog', label: t('nav.catalog'), icon: <LayoutGrid className="w-4 h-4" /> },
    { to: '/museum',  label: t('nav.museum'),  icon: <BookOpen className="w-4 h-4" /> },
    { to: '/daily',   label: t('nav.daily'),   icon: <Brain className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
      <div className="mx-auto max-w-7xl">
        <nav className={cn(
          'relative bg-background/85 dark:bg-background/70 backdrop-blur-2xl rounded-2xl border pointer-events-auto transition-all duration-500',
          navBorder
        )}>
          {/* Inner shine */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />

          <div className="px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between h-14 md:h-16">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
                <KawungLogo className="h-6 w-6 md:h-7 md:w-7 text-foreground transition-transform group-hover:rotate-90 duration-700" />
                <span className="text-lg md:text-xl font-serif font-bold tracking-tighter text-foreground group-hover:opacity-80 transition-opacity">
                  BatikLens.
                </span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-5 lg:gap-6">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={cn(
                      'text-[10px] font-black uppercase tracking-[0.2em] transition-colors',
                      pathname === l.to ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {l.label}
                  </Link>
                ))}

                <Link to="/scan">
                  <Button
                    size="sm"
                    className="bg-foreground text-background hover:bg-foreground/90 flex items-center gap-1.5 px-5 rounded-full font-black uppercase text-[10px] tracking-[0.15em] active:scale-95 transition-transform h-8"
                  >
                    <ScanLine className="w-3.5 h-3.5" />
                    {t('nav.scan')}
                  </Button>
                </Link>

                <div className="h-5 w-px bg-border/50" />

                <div className="flex items-center gap-1.5">
                  {streak > 0 && (
                    <Link to="/profile" className="inline-flex items-center gap-1 rounded-full border border-orange-400/30 bg-orange-400/5 px-2 py-1 hover:bg-orange-400/10 transition-colors">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span className="text-[10px] font-black text-orange-600 dark:text-orange-400">{streak}</span>
                    </Link>
                  )}
                  <UserMenu />
                  <LanguageSwitcher />
                  <ThemeToggle className="static" />
                </div>
              </div>

              {/* Mobile right — hanya UserMenu + ThemeToggle + Hamburger */}
              <div className="md:hidden flex items-center gap-1">
                {streak > 0 && (
                  <Link to="/profile" className="inline-flex items-center gap-1 rounded-full border border-orange-400/30 bg-orange-400/5 px-2 py-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="text-[10px] font-black text-orange-600 dark:text-orange-400">{streak}</span>
                  </Link>
                )}
                <UserMenu />
                <ThemeToggle className="static" />
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-foreground/8 rounded-xl">
                      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-background/95 backdrop-blur-3xl border-l border-foreground/5 w-[260px] p-0">
                    <div className="flex flex-col h-full py-10 px-6">
                      <div className="mb-2">
                        <SheetTitle className="text-left font-serif text-xl flex items-center gap-2">
                          <KawungLogo className="h-5 w-5" />
                          BatikLens.
                        </SheetTitle>
                      </div>
                      <SheetDescription className="text-[9px] uppercase tracking-widest text-muted-foreground mb-8 pb-4 border-b border-foreground/5">
                        {t('nav.tagline')}
                      </SheetDescription>

                      <nav className="flex flex-col space-y-1">
                        {[
                          { to: '/',        label: t('nav.home'),    icon: <Home className="w-4 h-4" /> },
                          { to: '/catalog', label: t('nav.catalog'), icon: <LayoutGrid className="w-4 h-4" /> },
                          { to: '/museum',  label: t('nav.museum'),  icon: <BookOpen className="w-4 h-4" /> },
                          { to: '/daily',   label: t('nav.daily'),   icon: <Brain className="w-4 h-4" /> },
                          { to: '/scan',    label: t('nav.scan'),    icon: <ScanLine className="w-4 h-4" /> },
                        ].map((l) => (
                          <Link
                            key={l.to}
                            to={l.to}
                            onClick={closeMenu}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors',
                              pathname === l.to
                                ? 'bg-foreground/8 text-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                            )}
                          >
                            {l.icon}
                            {l.label}
                          </Link>
                        ))}
                      </nav>

                      <div className="mt-auto pt-6 border-t border-foreground/5 space-y-4">
                        <UserMenu variant="mobile" onAction={closeMenu} />
                        <div className="flex items-center justify-between pt-2 border-t border-foreground/5">
                          <LanguageSwitcher />
                          <ThemeToggle className="static" />
                        </div>
                        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.3em]">
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

function KawungLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <ellipse cx="16" cy="6.5"  rx="5" ry="7" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="16" cy="25.5" rx="5" ry="7" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="6.5"  cy="16" rx="7" ry="5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="25.5" cy="16" rx="7" ry="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}
