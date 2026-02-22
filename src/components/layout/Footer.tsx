import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUp } from 'lucide-react';
export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="bg-background border-t border-foreground/5 mt-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-foreground/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h3 className="text-4xl font-serif font-bold tracking-tighter text-foreground">BatikLens.</h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              A technological tribute to Indonesia's sacred textile patterns. Preserving history through the precision of vision intelligence.
            </p>
            <div className="flex items-center gap-6">
               <div className="px-5 py-2 rounded-full border border-foreground/10 text-[10px] font-bold uppercase tracking-widest bg-foreground/[0.03] backdrop-blur-xl">
                Archival Grade AI
               </div>
               <div className="px-5 py-2 rounded-full border border-foreground/10 text-[10px] font-bold uppercase tracking-widest bg-foreground/[0.03] backdrop-blur-xl">
                Edge Vision v2.1
               </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/50">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Dossier</Link></li>
              <li><Link to="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">Archive</Link></li>
              <li><Link to="/scan" className="text-muted-foreground hover:text-foreground transition-colors">Vision Engine</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/50">Stewardship</h4>
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              "Weaving the past into the digital present, thread by thread."
            </p>
            <div className="pt-4">
              <p className="text-[9px] md:text-[10px] text-muted-foreground/60 leading-tight uppercase tracking-wider">
                Note: Although this project has AI capabilities, there is a limit on the number of requests that can be made to the AI servers across all user apps in a given time period.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] pt-4">
              <Sparkles className="w-3 h-3" />
              Powered by Cloudflare
            </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} BatikLens Protocol. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Back to Apex
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}