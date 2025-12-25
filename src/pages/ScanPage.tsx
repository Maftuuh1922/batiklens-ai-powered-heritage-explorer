import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, Loader2, Scan, RefreshCw } from 'lucide-react';
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
    // Simulate AI analysis time
    setTimeout(() => {
      setState('complete');
      toast.success("Analysis Complete!", { description: "Mega Mendung motif detected." });
      setTimeout(() => {
        navigate('/result?id=mega-mendung');
      }, 1500);
    }, 3500);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20 lg:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Analyze Your Batik</h1>
          <p className="text-muted-foreground mb-12">Upload a photo of your batik cloth to identify its motif and origin.</p>
          <div className="relative aspect-[4/3] max-w-md mx-auto rounded-3xl overflow-hidden glass-card group">
            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                    <Upload className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop your image here</p>
                    <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFile}
                  />
                  <div className="flex gap-4">
                    <Button onClick={() => fileInputRef.current?.click()} className="bg-secondary text-secondary-foreground rounded-full px-6">
                      Upload File
                    </Button>
                    <Button variant="outline" className="rounded-full border-white/20 px-6">
                      <Camera className="w-4 h-4 mr-2" />
                      Camera
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
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-1 bg-secondary shadow-[0_0_15px_rgba(200,169,81,0.8)] z-10"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <RefreshCw className="w-12 h-12 text-secondary animate-spin mb-4" />
                    <p className="text-white font-serif text-xl tracking-widest uppercase">Analyzing Motif...</p>
                    <p className="text-white/60 text-xs mt-2">Checking heritage database</p>
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
                  <img src={preview} alt="Preview" className="w-full h-full object-cover blur-sm scale-110" />
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <Scan className="w-16 h-16 text-white mb-4" />
                    <p className="text-white font-serif text-2xl font-bold">Analysis Ready</p>
                    <p className="text-white/80">Redirecting to results...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-12 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-secondary" />
            <span>AI vision server: Healthy</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}