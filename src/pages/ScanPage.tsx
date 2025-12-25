import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, Loader2, Scan, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
type ScanState = 'idle' | 'scanning' | 'complete';
export function ScanPage() {
  const [state, setState] = useState<ScanState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
    setTimeout(() => {
      setState('complete');
      toast.success("Identity Confirmed", { description: "Pattern recognized in heritage database." });
      setTimeout(() => {
        navigate('/result?id=mega-mendung');
      }, 1500);
    }, 4000);
  };
  const reset = () => {
    setState('idle');
    setPreview(null);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center">
      <div className="py-20 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">Motif Analysis</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">Optical characterization of Javanese textile patterns using the BatikLens Vision Engine.</p>
          </div>
          <div className="relative aspect-square max-w-md mx-auto rounded-[2rem] overflow-hidden glass-card border-border/60 group shadow-2xl shadow-black/20 dark:shadow-white/5">
            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 space-y-8"
                >
                  <div className="w-24 h-24 rounded-3xl bg-foreground/5 flex items-center justify-center text-foreground border border-border shadow-inner group-hover:scale-105 transition-transform duration-500">
                    <Upload className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold font-serif">Input Sample</p>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">JPG • PNG • RAW</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFile}
                  />
                  <div className="flex flex-col gap-3 w-full">
                    <Button onClick={() => fileInputRef.current?.click()} className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl py-7 text-lg font-bold">
                      Upload Plate
                    </Button>
                    <Button variant="ghost" className="rounded-2xl border-border py-7 text-muted-foreground hover:text-foreground">
                      <Camera className="w-5 h-5 mr-3" />
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
                  <div className="absolute inset-0 bg-background/40 backdrop-grayscale-[0.5]" />
                  {/* High Glow Scan Line */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                      animate={{ top: ['-10%', '110%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_30px_rgba(255,255,255,1)] z-20"
                    />
                    <motion.div
                      animate={{ top: ['-10%', '110%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                      className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-10"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col bg-background/20">
                    <div className="p-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-6">
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <p className="text-white font-serif text-2xl font-bold tracking-[0.2em] uppercase">Processing...</p>
                    <p className="text-white/60 text-[10px] mt-4 font-bold tracking-[0.4em] uppercase">Analyzing geometric vectors</p>
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
                  <img src={preview} alt="Preview" className="w-full h-full object-cover saturate-0 opacity-50 blur-sm" />
                  <div className="absolute inset-0 bg-foreground/10 backdrop-blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="w-20 h-20 rounded-full border-2 border-foreground flex items-center justify-center mb-6">
                      <Scan className="w-10 h-10 text-foreground" />
                    </div>
                    <p className="text-foreground font-serif text-3xl font-bold">Analysis Ready</p>
                    <p className="text-muted-foreground text-sm font-bold tracking-widest uppercase mt-2">Opening dossier...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-16 text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Vision Engine: Online
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            Latent: 42ms
          </div>
        </motion.div>
      </div>
    </div>
  );
}