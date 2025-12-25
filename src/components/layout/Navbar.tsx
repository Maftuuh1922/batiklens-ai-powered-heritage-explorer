import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-x-0 border-t-0 rounded-none bg-background/70 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-serif font-bold tracking-tighter text-foreground group-hover:opacity-80 transition-opacity">BatikLens.</span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Archive</Link>
            <Link to="/catalog" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Heritage Catalog</Link>
            <Link to="/scan">
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 px-6 rounded-full font-bold uppercase text-[10px] tracking-widest">
                <ScanLine className="w-3 h-3" />
                Scan Motif
              </Button>
            </Link>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-foreground/5">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border w-full sm:max-w-xs">
                <div className="flex flex-col space-y-8 mt-16 px-4">
                  <Link to="/" className="text-3xl font-serif font-bold border-b border-border pb-4">Home</Link>
                  <Link to="/catalog" className="text-3xl font-serif font-bold border-b border-border pb-4">Catalog</Link>
                  <Link to="/scan" className="text-3xl font-serif font-bold border-b border-border pb-4">Scan Batik</Link>
                  <div className="pt-8">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">Preserving the Infinite Thread</p>
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