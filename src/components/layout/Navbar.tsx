import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ScanLine, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-none bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold gold-gradient-text">BatikLens</span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-secondary transition-colors">Home</Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-secondary transition-colors">Heritage Catalog</Link>
            <Link to="/scan">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex items-center gap-2">
                <ScanLine className="w-4 h-4" />
                Scan Motif
              </Button>
            </Link>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border">
                <div className="flex flex-col space-y-6 mt-12">
                  <Link to="/" className="text-lg font-serif">Home</Link>
                  <Link to="/catalog" className="text-lg font-serif">Heritage Catalog</Link>
                  <Link to="/scan" className="text-lg font-serif">Scan Batik</Link>
                  <div className="pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">Preserving Indonesia's Heritage through AI.</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}