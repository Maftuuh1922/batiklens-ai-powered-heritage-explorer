import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { EngagementProvider } from '@/components/engagement/EngagementProvider';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-foreground selection:text-background">
      <EngagementProvider />
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
};
export default App;
