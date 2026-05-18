import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { EngagementProvider } from '@/components/engagement/EngagementProvider';
import { useEngagement, levelFromXp } from '@/lib/engagement';
import { TourProvider } from '@/components/layout/TourProvider';

const getGlobalTheme = (lvl: number) => {
  if (lvl >= 50) return 'from-fuchsia-900/40 via-purple-900/20 to-transparent dark:from-fuchsia-900/60 dark:via-purple-900/30';
  if (lvl >= 25) return 'from-red-900/40 via-orange-900/20 to-transparent dark:from-red-900/60 dark:via-orange-900/30';
  if (lvl >= 10) return 'from-indigo-900/40 via-blue-900/20 to-transparent dark:from-indigo-900/60 dark:via-blue-900/30';
  if (lvl >= 5) return 'from-emerald-900/40 via-teal-900/20 to-transparent dark:from-emerald-900/60 dark:via-teal-900/30';
  return 'from-amber-900/10 via-transparent to-transparent';
};

const App = () => {
  const xp = useEngagement((s) => s.xp);
  const level = levelFromXp(xp);
  const globalTheme = getGlobalTheme(level);

  return (
    <div className={`min-h-screen flex flex-col antialiased selection:bg-foreground selection:text-background relative overflow-hidden`}>
      {/* Global Ambient Glow (Base) */}
      <div className={`fixed inset-0 bg-gradient-to-br ${globalTheme} pointer-events-none -z-10`} />
      
      {/* Top Light overlay to tint everything uniformly without being hidden by backgrounds */}
      {level >= 10 && (
        <div className={`fixed inset-0 bg-gradient-to-br ${globalTheme} mix-blend-screen dark:mix-blend-color pointer-events-none z-30 opacity-40`} />
      )}
      
      {/* Extra floating glow for high ranks */}
      {level >= 25 && (
        <>
          <div className={`fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none z-30 opacity-20 mix-blend-screen ${level >= 50 ? 'bg-fuchsia-500 animate-[pulse_4s_ease-in-out_infinite]' : 'bg-orange-500'}`} />
          <div className={`fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none z-30 opacity-20 mix-blend-screen ${level >= 50 ? 'bg-purple-500 animate-[pulse_5s_ease-in-out_infinite]' : 'bg-red-500'}`} />
        </>
      )}

      <TourProvider />
      <EngagementProvider />
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28 relative z-0">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
};
export default App;
