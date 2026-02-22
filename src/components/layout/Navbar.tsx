import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/lib/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-foreground group-hover:opacity-80 transition-opacity">
                BatikLens.
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-6">
            <Link
              to="/catalog"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.catalog')}
            </Link>
            <Link
              to="/museum"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.museum')}
            </Link>
            <Link to="/scan">
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 px-6 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-transform active:scale-95"
              >
                <ScanLine className="w-3.5 h-3.5" />
                {t('nav.scan')}
              </Button>
            </Link>

            <div className="h-6 w-px bg-border/50 mx-2" />

            <LanguageSwitcher />
            <ThemeToggle className="static" />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
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
                    <SheetTitle className="text-left font-serif text-2xl">
                      BatikLens.
                    </SheetTitle>
                  </div>
                  <SheetDescription className="text-[10px] uppercase tracking-widest text-muted-foreground mb-8 pb-4 border-b border-foreground/5">
                    Heritage Vision Explorer
                  </SheetDescription>
                  <nav className="flex flex-col space-y-6">
                    <Link to="/" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2">
                      {t('nav.home')}
                    </Link>
                    <Link to="/catalog" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2">
                      {t('nav.catalog')}
                    </Link>
                    <Link to="/museum" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2">
                      {t('nav.museum')}
                    </Link>
                    <Link to="/scan" onClick={closeMenu} className="text-lg font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors py-2">
                      {t('nav.scan')}
                    </Link>
                  </nav>

                  <div className="mt-auto pt-8 border-t border-foreground/5">
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">
                      Preserving the Infinite Thread
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};