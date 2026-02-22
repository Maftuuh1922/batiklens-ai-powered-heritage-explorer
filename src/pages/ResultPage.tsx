import React, { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info, History, ArrowLeft, AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';
import { batiks } from '@/lib/batik-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ResultPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  // Check if this is a scan result
  const scanResult = id === 'scan-result' ? JSON.parse(localStorage.getItem('scanResult') || 'null') : null;

  // Deteksi apakah "Bukan Batik" (dari flag backend atau string prediction)
  const isNonBatik = scanResult?.is_batik === false || scanResult?.prediction === 'Bukan Batik';

  // Find batik data - if scan result, try to match by prediction name
  let batik = batiks.find(b => b.id === id);

  if (scanResult && !batik) {
    // Try to find batik data that matches the scan result prediction
    batik = batiks.find(b =>
      b.id === scanResult.prediction ||
      (scanResult.prediction && scanResult.prediction.includes(b.id)) ||
      (b.id && scanResult.prediction && b.id.includes(scanResult.prediction.replace('batik-', '').replace('_', '-')))
    );
  }

  // Redirect to scan if no data available
  useEffect(() => {
    if (!batik && !scanResult) {
      // Optional: Redirect or just show empty state
    }
  }, [batik, scanResult, navigate]);

  if (!batik && !scanResult) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 md:py-40 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Data Not Found</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">Please try scanning again.</p>
          </div>
          <Link to="/scan">
            <Button variant="outline" className="rounded-full border-foreground/20 hover:bg-foreground/5 px-8 py-6 font-black uppercase text-[10px] tracking-widest">
              Back to Scanner
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Helper untuk konten multilingual dari object Batik
  const getMeaning = () => {
    if (batik) return batik.meaning[language];
    if (isNonBatik) return language === 'id'
      ? "Objek yang dipindai tidak teridentifikasi sebagai motif batik yang valid dalam database kami."
      : "The scanned object is not identified as a valid batik motif in our database.";
    return `Classified with ${scanResult?.percentage} confidence`;
  };

  const getHistory = () => {
    if (batik) return batik.history[language];
    if (isNonBatik) return language === 'id'
      ? "Sistem mendeteksi bahwa gambar ini memiliki probabilitas rendah sebagai batik. Pastikan pencahayaan cukup dan objek terlihat jelas."
      : "The system detected low probability for this image being batik. Ensure good lighting and clear visibility.";
    return `AI Classification Result: ${scanResult?.prediction}`;
  };

  const displayData = {
    name: batik ? batik.name : (isNonBatik ? (language === 'id' ? "BUKAN BATIK" : "NON-BATIK") : scanResult?.prediction),
    imageUrl: (scanResult?.uploadedImageUrl) ? scanResult.uploadedImageUrl : (batik ? batik.imageUrl : '/batik-day.png'),
    origin: batik ? batik.origin : (isNonBatik ? 'Unknown' : 'Indonesia'),
    category: batik ? batik.category : (isNonBatik ? 'Unidentified' : 'AI Detection'),
    referenceUrl: batik?.referenceUrl,
    meaning: getMeaning(),
    history: getHistory()
  };

  // TEMA WARNA: Merah jika Non-Batik, Default jika Batik
  const theme = isNonBatik ? {
    title: "text-red-600",
    badge: "bg-red-600 text-white",
    border: "border-red-200",
    icon: "text-red-500",
    bgMuted: "bg-red-50"
  } : {
    title: "monochrome-gradient-text",
    badge: "bg-foreground text-background",
    border: "border-border/40",
    icon: "text-foreground",
    bgMuted: "bg-muted"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-16">
        <div className="mb-8 md:mb-12">
          <Link to="/scan" className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('result.analyze_new')}
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* KOLOM KIRI: GAMBAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8"
          >
            <div className={`relative aspect-square w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card shadow-2xl ${isNonBatik ? 'border-4 border-red-500' : 'border-foreground/10'}`}>
              <img
                src={displayData.imageUrl}
                alt={displayData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = '/batik-day.png';
                }}
              />
              <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Badge className={`${theme.badge} font-black text-[9px] md:text-[10px] uppercase tracking-widest px-4 md:px-5 py-2 rounded-full border-none shadow-2xl cursor-help flex items-center gap-2`}>
                        {scanResult ? `Confidence: ${scanResult.percentage}` : 'Verified'}
                        <Info className="w-3 h-3 opacity-70" />
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[250px] bg-black/90 backdrop-blur border border-white/10 text-white text-xs p-3 rounded-xl shadow-xl">
                      <p>
                        {language === 'id'
                          ? "Angka ini menunjukkan seberapa yakin AI terhadap hasil prediksinya. Semakin tinggi (mendekati 100%), semakin akurat."
                          : "This number indicates how confident the AI is in its prediction. Higher (closer to 100%) means more accurate."}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* MAP SECTION - Ditampilkan jika ada lokasi */}
            {!isNonBatik && displayData.origin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl overflow-hidden glass-card border border-foreground/10 h-64 shadow-lg relative group"
              >
                <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur px-3 py-1 rounded-full border border-foreground/10">
                  <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {t('result.provenance')}: {displayData.origin}
                  </p>
                </div>
                <iframe
                  width="100%"
                  height="100%"
                  title="Batik Origin Map"
                  style={{ border: 0, filter: 'grayscale(100%) invert(0.9) contrast(1.2)' }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(displayData.origin + ", Indonesia")}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                ></iframe>
                {/* Overlay interaktif */}
                <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-foreground/5 transition-colors" />
              </motion.div>
            )}
          </motion.div>

          {/* KOLOM KANAN: DETAIL INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-10 md:space-y-14"
          >
            {/* Header Nama & Asal */}
            <div className="space-y-4 md:space-y-6">
              <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter ${theme.title} leading-[0.9] break-words`}>
                {displayData.name}
              </h1>

              <div className="flex flex-wrap gap-3">
                <div className={`flex items-center gap-3 ${theme.badge} w-fit px-5 py-2 rounded-full shadow-xl`}>
                  {isNonBatik ? <AlertTriangle className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                    {isNonBatik ? "WARNING: LOW CONFIDENCE" : `${t('result.provenance')}: ${displayData.origin}`}
                  </span>
                </div>
                {displayData.category && (
                  <div className="flex items-center gap-3 bg-muted text-foreground w-fit px-5 py-2 rounded-full shadow-sm border border-foreground/10">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">{displayData.category}</span>
                  </div>
                )}
                {/* Reference Link Button */}
                {displayData.referenceUrl && (
                  <a href={displayData.referenceUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 transition-colors w-fit px-5 py-2 rounded-full shadow-sm border border-blue-200 dark:border-blue-800">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                        {t('result.view_source')}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Konten Detail */}
            <div className="space-y-10 md:space-y-12">

              {/* Meaning / Interpretation */}
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${isNonBatik ? 'text-red-500' : 'text-foreground/40'}`}>
                  <Info className="w-4 h-4" />
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em]">{t('result.interpretation')}</h3>
                </div>
                <div className={`relative pl-6 md:pl-8 border-l-2 ${isNonBatik ? 'border-red-300' : 'border-border/60'}`}>
                  <p className={`text-xl md:text-3xl font-serif italic ${isNonBatik ? 'text-red-700' : 'text-foreground'} leading-relaxed`}>
                    "{displayData.meaning}"
                  </p>
                </div>
              </div>

              {/* History / Chronology */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-foreground/40">
                  <History className="w-4 h-4" />
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em]">{t('result.chronology')}</h3>
                </div>
                <div className="relative pl-6 md:pl-8">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {displayData.history}
                  </p>
                </div>
              </div>

              {/* Top Predictions List (Jika ada) */}
              {scanResult?.top_5_predictions && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-black uppercase text-[9px] tracking-[0.4em] text-foreground/40 mb-4">Top Matches</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {scanResult.top_5_predictions.slice(0, 3).map((pred: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-muted/50 border border-foreground/5">
                        <span className="font-serif capitalize">{pred.class}</span>
                        <span className="text-xs font-bold font-mono">{pred.percentage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Action Buttons */}
            <div className={`pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t ${theme.border}`}>
              <Link to="/catalog">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/80 py-6 md:py-7 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                  {t('result.explore_btn')}
                </Button>
              </Link>
              <Link to="/scan">
                <Button variant="outline" className={`w-full ${isNonBatik ? 'border-red-200 hover:bg-red-50 text-red-600' : 'border-foreground/10 hover:border-foreground/30'} py-6 md:py-7 rounded-2xl font-black uppercase tracking-widest text-[10px]`}>
                  {t('result.analyze_new')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}