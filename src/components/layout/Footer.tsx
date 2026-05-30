import { Link } from 'react-router-dom';
import { Sparkles, ArrowUp, ScanLine, BookOpen, Brain, Gamepad2, LogIn } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const label = (id: string, en: string) => language === 'id' ? id : en;

  return (
    <footer className="bg-background border-t border-foreground/5 mt-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-foreground/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-4xl font-serif font-bold tracking-tighter text-foreground">BatikLens.</h3>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              {label(
                'Penghargaan teknologi untuk motif tekstil sakral Indonesia. Melestarikan sejarah melalui kecerdasan visual.',
                "A technological tribute to Indonesia's sacred textile patterns. Preserving history through the precision of vision intelligence."
              )}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-1.5 rounded-full border border-foreground/10 text-[10px] font-bold uppercase tracking-widest bg-foreground/[0.03]">
                Archival Grade AI
              </div>
              <div className="px-4 py-1.5 rounded-full border border-foreground/10 text-[10px] font-bold uppercase tracking-widest bg-foreground/[0.03]">
                Heritage v3.0
              </div>
              <div className="px-4 py-1.5 rounded-full border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
                ● {label('Aktif', 'Live')}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/50">
              {label('Navigasi', 'Navigation')}
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  {label('Beranda', 'Home')}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  {label('Katalog', 'Catalog')}
                </Link>
              </li>
              <li>
                <Link to="/scan" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ScanLine className="w-3.5 h-3.5" />
                  {label('Pindai', 'Scan')}
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Brain className="w-3.5 h-3.5" />
                  {label('Kuis', 'Quiz')}
                </Link>
              </li>
              <li>
                <Link to="/minigame" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  {label('Mini Game', 'Mini Game')}
                </Link>
              </li>
              {!user && (
                <li>
                  <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <LogIn className="w-3.5 h-3.5" />
                    {label('Masuk', 'Sign In')}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/50">
              {label('Tentang', 'About')}
            </h4>
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              {label(
                '"Menenun masa lalu ke dalam masa digital, benang demi benang."',
                '"Weaving the past into the digital present, thread by thread."'
              )}
            </p>
            <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
              {label(
                'Meskipun proyek ini memiliki kemampuan AI, ada batasan jumlah permintaan ke server AI di seluruh aplikasi dalam periode waktu tertentu.',
                'Although this project has AI capabilities, there is a limit on the number of requests that can be made to the AI servers across all user apps in a given time period.'
              )}
            </p>
            <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em]">
              <Sparkles className="w-3 h-3" />
              Powered by Gemini AI
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} BatikLens. {label('Hak Cipta Dilindungi.', 'All Rights Reserved.')}
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            {label('Kembali ke Atas', 'Back to Top')}
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
