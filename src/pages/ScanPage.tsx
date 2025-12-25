import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, Scan, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
type ScanState = 'idle' | 'scanning' | 'complete';
export function ScanPage() {
  const [state, setState] = useState<ScanState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        startScan();
      };
      reader.readAsDataURL(file);
    }
  };
  const startScan = () => {
    setState('scanning');
    scanTimeoutRef.current = setTimeout(() => {
      setState('complete');
      toast.success("Identity Confirmed", { description: "Pattern recognized in heritage database." });
      redirectTimeoutRef.current = setTimeout(() => {
        navigate('/result?id=mega-mendung');
      }, 1500);
    }, 4000);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center">
      <div className="py-12 md:py-20 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-8 md:mb-12 space-y-3 md:space-y-4 px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">Motif Analysis</h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-lg mx-auto">Optical characterization of Javanese textile patterns using the Vision Engine.</p>
          </div>
          <div className="relative aspect-square w-full max-w-[min(90vw,448px)] mx-auto rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden glass-card border-foreground/10 group shadow-2xl">
            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 space-y-6 md:space-y-8"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-foreground/5 flex items-center justify-center text-foreground border border-foreground/10 shadow-inner backdrop-blur-[40px]">
                    <Upload className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg md:text-xl font-bold font-serif">Input Sample</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">JPG • PNG • RAW</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFile}
                  />
                  <div className="flex flex-col gap-3 w-full max-w-[280px]">
                    <Button onClick={() => fileInputRef.current?.click()} className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl py-6 md:py-7 text-base md:text-lg font-black uppercase tracking-widest">
                      Upload Plate
                    </Button>
                    <Button variant="ghost" className="rounded-2xl border-foreground/10 py-6 md:py-7 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest">
                      <Camera className="w-4 h-4 mr-2" />
                      Live Capture
                    </Button>
                  </div>
                </motion.div>
              )}
              {state === 'scanning' && preview && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-[12px]" />
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                      animate={{ top: ['-5%', '105%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-[3px] bg-foreground shadow-[0_0_40px_hsl(var(--foreground))] z-20"
                    />
                    <motion.div
                      animate={{ top: ['-5%', '105%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent z-10"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col p-6 z-30">
                    <RefreshCw className="w-10 h-10 text-foreground animate-spin mb-4" />
                    <p className="text-foreground font-serif text-xl md:text-2xl font-bold tracking-[0.2em] uppercase">Processing</p>
                    <p className="text-foreground/60 text-[8px] md:text-[10px] mt-2 font-black tracking-[0.4em] uppercase text-center">Analyzing geometric vectors</p>
                  </div>
                </motion.div>
              )}
              {state === 'complete' && preview && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  <img src={preview} alt="Preview" className="w-full h-full object-cover saturate-0 opacity-40 blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col p-6 backdrop-blur-[20px]">
                    <Scan className="w-12 h-12 text-foreground mb-4" />
                    <p className="text-foreground font-serif text-2xl md:text-3xl font-bold">Analysis Ready</p>
                    <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase mt-2">Opening dossier...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-12 md:mt-16 text-[8px] md:text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Vision: Online
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            Latent: 42ms
            <div className="w-1 h-1 rounded-full bg-border" />
            V2.1-Edge
          </div>
        </motion.div>
      </div>
    </div>
  );
}