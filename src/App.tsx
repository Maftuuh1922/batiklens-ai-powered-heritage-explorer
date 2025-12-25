import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
const App = () => {
  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-foreground selection:text-background">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
};
export default App;