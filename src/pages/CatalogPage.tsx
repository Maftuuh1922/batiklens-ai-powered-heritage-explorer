import React, { forwardRef, useRef, useState, useMemo, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { batiks } from '@/lib/batik-data';
import { useLanguage } from '@/lib/LanguageContext';
import { Info, Clock, Search, X, ArrowRight, ExternalLink, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Page Component
const Page = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div
      className={cn(
        "demoPage bg-[#1a1d29] overflow-hidden relative shadow-inner",
        props.className
      )}
      ref={ref}
    >
      <div className="h-full w-full relative">
        {props.children}

        {/* Page Number */}
        <span className={cn(
          "absolute bottom-8 text-sm text-white/40 font-mono",
          props.position === 'left' ? "left-8" : "right-8"
        )}>
          {props.number}
        </span>

        {/* Shadow Gradient for Binding */}
        <div className={cn(
          "absolute top-0 bottom-0 w-16 pointer-events-none z-20",
          props.position === 'left'
            ? "right-0 bg-gradient-to-l from-black/50 to-transparent"
            : "left-0 bg-gradient-to-r from-black/50 to-transparent"
        )} />
      </div>
    </div>
  );
});

const Cover = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="demoPage cover bg-[#0F1419] rounded-r-3xl shadow-2xl overflow-hidden relative" ref={ref}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
      <div className="h-full w-full p-12 flex flex-col items-center justify-center border-r-[16px] border-[#0A0D12]">
        <div className="border-4 border-double border-gold/40 p-16 w-full h-full flex flex-col items-center justify-center bg-[#0F1419]/50 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="font-serif text-4xl text-gold mb-16 tracking-[0.2em] uppercase drop-shadow-lg text-center">BatikLens</div>
          <h1 className="font-serif text-8xl text-white font-normal mb-12 leading-tight drop-shadow-2xl text-center">
            Heritage<br />Index.
          </h1>
          <div className="w-24 h-1.5 bg-gold/50 mb-12 rounded-full"></div>
          <p className="font-sans text-lg text-white/70 max-w-[400px] leading-relaxed mb-20 tracking-wide text-center">
            The Definitive Archive of Javanese Patterns
          </p>
          <div className="px-8 py-3 border border-white/20 rounded-full text-xs text-white/50 uppercase tracking-[0.2em]">
            Volume I • 2024
          </div>
        </div>
      </div>
      {/* Binding Shadow */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>
    </div>
  );
});

const BackCover = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="demoPage bg-[#0F1419] rounded-l-3xl shadow-2xl flex items-center justify-center border-l-[16px] border-[#0A0D12]" ref={ref}>
      <div className="text-center opacity-30">
        <div className="font-serif text-4xl text-white mb-4">BatikLens</div>
        <p className="text-sm text-white uppercase tracking-widest">End of Volume</p>
      </div>
      {/* Binding Shadow */}
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
    </div>
  );
});

export const CatalogPage = () => {
  const { language } = useLanguage();
  const bookRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 550, height: 750 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 1024;
      setIsMobile(mobile);

      if (mobile) {
        // Mobile dimensions - responsive width, aspect ratio preserved
        const targetW = Math.min(width - 30, 450); // padding
        setDimensions({ width: targetW, height: targetW * 1.4 });
      } else {
        // Desktop dimensions
        setDimensions({ width: 550, height: 750 });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = useMemo(() => {
    const generatedPages = [];
    generatedPages.push(<Cover key="cover" />);

    batiks.forEach((batik, index) => {
      // Left Page: Image
      generatedPages.push(
        <Page key={`left-${batik.id}`} number={index * 2 + 1} position="left" className="rounded-l-3xl border-r-0">
          <div className="w-full h-full p-4 md:p-10 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] group bg-black">
              <img
                src={batik.imageUrl}
                alt={batik.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{batik.name}</h2>
                <div className="w-12 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">{batik.origin}</span>
            </div>
          </div>
        </Page>
      );

      // Right Page: Content
      generatedPages.push(
        <Page key={`right-${batik.id}`} number={index * 2 + 2} position="right" className="rounded-r-3xl border-l-0">
          <div className="h-full flex flex-col p-8 md:p-16 pl-6 md:pl-12 text-white relative">
            {/* Header with ID */}
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Heritage ID</span>
                <span className="font-mono text-xl text-white/80">#{batik.id.substring(0, 6).toUpperCase()}</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full border border-gold/30"></div>
              </div>
            </div>

            {/* Title & Origin */}
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
              {batik.name}
            </h2>
            <div className="flex items-center gap-2 mb-10">
              <div className="h-[1px] w-8 bg-gold/50"></div>
              <span className="text-xs uppercase tracking-widest text-white/60">{batik.origin}</span>
            </div>

            {/* Scrollable Content Area */}
            <div
              className="space-y-12 flex-grow overflow-y-auto pr-4 custom-scrollbar overscroll-contain"
              onWheel={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >

              {/* Meaning Box */}
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md relative mx-1 my-1">
                <div className="absolute top-0 left-0 w-2 h-full bg-gold/60 rounded-l-full"></div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-gold mb-6 font-bold opacity-90">
                  <Info className="w-4 h-4" /> Meaning
                </div>
                <p className="font-serif text-xl italic text-white/95 leading-relaxed tracking-wide">
                  "{batik.meaning[language]}"
                </p>
              </div>

              {/* Chronology Text */}
              <div className="pl-6 border-l-2 border-white/10">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-gold/80 mb-4 font-semibold">
                  <Clock className="w-4 h-4" /> Chronology
                </div>
                <p className="font-sans text-[15px] text-white/80 leading-[1.8] text-justify tracking-wide">
                  {batik.history[language]}
                </p>
              </div>

              {/* Map Section - Dark Themed for Book */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg h-[180px] group/map opacity-80 hover:opacity-100 transition-opacity">
                <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
                  <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{batik.origin}</span>
                </div>
                <iframe
                  width="100%"
                  height="100%"
                  title="Origin Map"
                  style={{ border: 0, filter: 'grayscale(100%) invert(0.9) contrast(1.2)' }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(batik.origin + ", Indonesia")}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>

            </div>

            <style>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 4px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: transparent;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: rgba(255, 255, 255, 0.2);
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: rgba(255, 255, 255, 0.4);
                            }
                            .custom-scrollbar {
                                scrollbar-width: thin;
                                scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
                            }
                        `}</style>

            {/* Footer Link & Reference */}
            <div className="mt-10 pt-10 border-t border-white/10 flex justify-between items-center group/footer">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/30 group-hover/footer:text-white/50 transition-colors">Ref. {batik.id}</span>
                {batik.referenceUrl && (
                  <a
                    href={batik.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-gold/60 hover:text-gold uppercase tracking-wider transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Source Valid
                  </a>
                )}
              </div>
              <Link to={`/batik/${batik.id}`} className="flex items-center gap-3 group/link bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-all">
                <span className="text-xs font-bold uppercase tracking-widest text-gold group-hover/link:text-white transition-colors">
                  Open Detail
                </span>
                <ArrowRight className="w-4 h-4 text-gold group-hover/link:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </Page>
      );
    });

    generatedPages.push(<BackCover key="back" />);
    return generatedPages;
  }, [batiks, language, dimensions.width]); // Add width dependency for responsive text/padding if needed


  // Sidebar Content (Reusable)
  const sidebarContent = (
    <div className="bg-[#0F1419]/95 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl w-full h-full lg:w-[320px] lg:h-[650px] lg:max-h-[85vh] flex flex-col transition-all duration-300 hover:border-gold/20 group/panel">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pl-1">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">Index & Search</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>

      {/* Search Bar - Di Atas */}
      <div className="relative mb-6 group/search">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-3.5 h-3.5 text-white/40 group-focus-within/search:text-gold transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const q = e.target.value;
            setSearchQuery(q);
          }}
          placeholder="Find heritage..."
          className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-9 pr-9 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-all font-sans tracking-wide"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-white/30 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* "Akurasi" / Accuracy / Result Count */}
      <div className="mb-3 px-1 flex justify-between items-center text-[10px] text-white/40 font-mono border-b border-white/5 pb-2">
        <span>{searchQuery ? 'SEARCH RESULTS' : 'TABLE OF CONTENTS'}</span>
        <span>
          {searchQuery
            ? batiks.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).length
            : batiks.length} AVAILABLE MODELS
        </span>
      </div>

      {/* Daftar Isi (Table of Contents) - Scrollable List */}
      <div className="flex-grow overflow-y-auto space-y-2 mb-4 pr-1 custom-scrollbar">
        {batiks
          .filter(b =>
            !searchQuery ||
            b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.origin.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((batik, idx) => {
            // Calculate actual index in original array to flip correctly
            const originalIndex = batiks.findIndex(b => b.id === batik.id);
            return (
              <button
                key={batik.id}
                onClick={() => bookRef.current?.pageFlip()?.flip(1 + originalIndex * 2)}
                className="w-full text-left bg-transparent hover:bg-white/5 p-3 rounded-xl group/item transition-all border border-transparent hover:border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm text-white/80 group-hover/item:text-gold transition-colors font-medium truncate w-[190px]">
                    {batik.name}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">
                    {batik.origin}
                  </div>
                </div>
                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <ArrowRight className="w-3.5 h-3.5 text-gold/50" />
                </div>
              </button>
            );
          })}

        {/* Empty State */}
        {searchQuery && batiks.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
          <div className="text-center py-12 text-white/30 text-sm italic">
            No matching heritage found.
          </div>
        )}
      </div>

      {/* Navigation Buttons (Bawahnya Daftar Isi) */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="bg-white/5 hover:bg-white/10 rounded-xl py-3 flex items-center justify-center text-white/70 hover:text-white transition-all text-xs font-medium border border-white/5 uppercase tracking-wider"
        >
          ← Previous
        </button>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="bg-white/5 hover:bg-white/10 rounded-xl py-3 flex items-center justify-center text-white/70 hover:text-white transition-all text-xs font-medium border border-white/5 uppercase tracking-wider"
        >
          Next →
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-background transition-all duration-500 flex flex-col items-center justify-center overflow-hidden relative ${isMobile ? 'pl-0' : 'pl-[350px]'}`}>

      {/* Background Texture Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: "url('/batik-day.png')", backgroundSize: '400px', backgroundRepeat: 'repeat' }}
      />

      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[80vh] bg-amber-500/5 dark:bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Mobile Sidebar Trigger */}
      <div className="lg:hidden absolute top-6 left-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-md border-foreground/10 hover:bg-background shadow-lg text-foreground">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-transparent border-none w-[320px]">
            <div className="h-full pt-6 pl-4">
              <SheetTitle className="sr-only">Batik Index</SheetTitle>
              {sidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Book Container */}
      <div className="relative z-10 transition-all duration-700 ease-out origin-center"
        style={{
          transform: isMobile ? 'none' : 'perspective(1500px)',
        }}
      >
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1400}
          maxShadowOpacity={0.6}
          showCover={true}
          mobileScrollSupport={true}
          ref={bookRef}
          className="shadow-[0_60px_120px_rgba(0,0,0,0.8)]"
          style={{ margin: '0 auto' }}
          startPage={0}
          drawShadow={true}
          flippingTime={1100}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages}
        </HTMLFlipBook>
      </div>

      {/* Controls, Search, & Table of Contents Panel (SIDE LEFT - BIGGER) - DESKTOP ONLY */}
      <div className="hidden lg:flex fixed top-1/2 left-10 -translate-y-1/2 z-50 flex-col items-start">
        {sidebarContent}
      </div>

    </div>
  );
};
