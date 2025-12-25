import React from 'react';
import { Sparkles } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold gold-gradient-text">BatikLens</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bridging traditional Indonesian wisdom with modern artificial intelligence. Discover the stories woven into every thread.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="/catalog" className="hover:text-foreground transition-colors">Catalog</a></li>
              <li><a href="/scan" className="hover:text-foreground transition-colors">Scanner</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">Heritage</h4>
            <p className="text-xs text-muted-foreground italic">
              "Batik is not just a cloth; it's a prayer, a story, and a legacy."
            </p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 uppercase tracking-widest pt-4">
              <Sparkles className="w-3 h-3" />
              Powered by Cloudflare AI
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} BatikLens. Indonesia Heritage Explorer.
        </div>
      </div>
    </footer>
  );
}