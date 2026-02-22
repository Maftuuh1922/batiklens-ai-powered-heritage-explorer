import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Upload, Camera, Scan, RefreshCw, X, Check, RotateCcw,
  ZoomIn, ZoomOut, Flashlight, Info, Sparkles,
  BookOpen, ChevronRight, MapPin, AlertCircle, Eye, Keyboard,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/LanguageContext';
import { batiks } from '@/lib/batik-data';

// ─── Types ────────────────────────────────────────────────
type ScanState = 'idle' | 'camera' | 'preview' | 'scanning' | 'complete';
type ModelState = 'idle' | 'loading' | 'ready' | 'error';
interface PredResult {
  label: string;
  confidence: number;
  topK: Array<{ label: string; confidence: number }>;
}

// ─── Constants ────────────────────────────────────────────
const MODEL_LABELS = [
  'batik-aceh', 'batik-bali', 'batik-bali_barong', 'batik-bali_merak',
  'batik-betawi', 'batik-celup', 'batik-ceplok', 'batik-ciamis',
  'batik-corak_insang', 'batik-garutan', 'batik-gentongan', 'batik-ikat_celup',
  'batik-jakarta_ondel_ondel', 'batik-jawa_barat_megamendung', 'batik-jawa_timur_pring',
  'batik-kalimantan_dayak', 'batik-keraton', 'batik-lampung_gajah', 'batik-lasem',
  'batik-madura_mataketeran', 'batik-maluku_pala', 'batik-ntb_lumbung',
  'batik-papua_asmat', 'batik-papua_cendrawasih', 'batik-papua_tifa',
  'batik-pekalongan', 'batik-priangan', 'batik-sekar', 'batik-sidoluhur',
  'batik-sidomukti', 'batik-sogan', 'batik-solo_parang',
  'batik-sulawesi_selatan_lontara', 'batik-sumatera_barat_rumah_minang',
  'batik-sumatera_utara_boraspati', 'batik-tambal',
  'batik-yogyakarta_kawung', 'batik-yogyakarta_parang',
];
const IMG_SIZE = 224;
const CONFIDENCE_THRESHOLD = 0.50;
const SCAN_INTERVAL_MS = 1200;

// ─── Helpers ──────────────────────────────────────────────
function labelToName(label: string) {
  const b = batiks.find(x => x.id === label);
  return b?.name ?? label.replace('batik-', '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
function getBatik(label: string) {
  return batiks.find(x => x.id === label) ?? null;
}

// ─── Confidence Bar ───────────────────────────────────────
function ConfBar({ value, color = '#f59e0b' }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
      <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
        initial={{ width: 0 }} animate={{ width: `${value * 100}%` }} transition={{ duration: 0.5 }} />
    </div>
  );
}

// ─── Scan Frame Overlay ───────────────────────────────────
function ScanFrame({ locked }: { locked: boolean }) {
  const c = locked ? '#22c55e' : '#f59e0b';
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[
        'top-3 left-3 border-l-[3px] border-t-[3px] rounded-tl-2xl',
        'top-3 right-3 border-r-[3px] border-t-[3px] rounded-tr-2xl',
        'bottom-3 left-3 border-l-[3px] border-b-[3px] rounded-bl-2xl',
        'bottom-3 right-3 border-r-[3px] border-b-[3px] rounded-br-2xl',
      ].map((cls, i) => (
        <motion.div key={i} className={`absolute w-10 h-10 ${cls}`}
          style={{ borderColor: c }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12 }} />
      ))}
      {!locked && (
        <motion.div className="absolute left-3 right-3 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${c}, transparent)`, boxShadow: `0 0 10px ${c}` }}
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
      )}
    </div>
  );
}

// ─── Desktop Result Panel ─────────────────────────────────
function DesktopResultPanel({
  result, modelState, onViewDetail, onViewPage,
}: {
  result: PredResult | null;
  modelState: ModelState;
  onViewDetail: () => void;
  onViewPage: () => void;
}) {
  const batik = result ? getBatik(result.label) : null;
  const name = result ? labelToName(result.label) : null;
  const pct = result ? Math.round(result.confidence * 100) : 0;
  const high = result ? result.confidence > 0.70 : false;
  const { language } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${modelState === 'ready' ? 'bg-green-400 animate-pulse' : modelState === 'loading' ? 'bg-amber-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-white/50 text-xs font-bold uppercase tracking-widest">
            {modelState === 'ready' ? 'AI Aktif' : modelState === 'loading' ? 'Memuat…' : 'AI Error'}
          </span>
        </div>
        <h2 className="text-white text-xl font-bold font-serif">Live Detection</h2>
        <p className="text-white/40 text-xs mt-0.5">Arahkan kamera ke batik — terdeteksi otomatis</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64 text-center">
              {modelState === 'loading' ? (
                <>
                  <motion.div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full mb-4"
                    animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                  <p className="text-white/60 font-medium">Memuat AI Model…</p>
                  <p className="text-white/30 text-xs mt-1">MobileNetV2 · 2.8MB</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center mb-4">
                    <Scan className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/50 font-medium">Belum terdeteksi</p>
                  <p className="text-white/25 text-xs mt-1 max-w-[180px] leading-relaxed">
                    Posisikan batik dalam frame dengan pencahayaan cukup
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-white/20 text-xs">
                    <Keyboard className="w-3 h-3" />
                    Tekan Spasi untuk capture
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div key={result.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex items-center gap-2 mb-4">
                <motion.span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${high ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}
                  animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Sparkles className="w-3 h-3" />
                  {high ? 'Teridentifikasi' : 'Kemungkinan'}
                </motion.span>
                <span className="text-white/40 text-xs ml-auto font-mono">{pct}%</span>
              </div>

              <div className="flex gap-3 mb-4">
                {batik?.imageUrl && (
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0">
                    <img src={batik.imageUrl} alt={name ?? ''} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
                  {batik && (
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-amber-400/70" />
                      <span className="text-amber-400/80 text-xs">{batik.origin}</span>
                    </div>
                  )}
                  <div className="mt-2">
                    <ConfBar value={result.confidence} color={high ? '#22c55e' : '#f59e0b'} />
                  </div>
                </div>
              </div>

              {batik && (
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
                  <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-widest mb-2">Makna</p>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {batik.meaning[language].substring(0, 160)}…
                  </p>
                </div>
              )}

              {result.topK.length > 1 && (
                <div className="mb-4">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Kemungkinan Lain</p>
                  <div className="space-y-2">
                    {result.topK.slice(1, 3).map((k, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-white/40 text-xs flex-1 truncate">{labelToName(k.label)}</span>
                        <span className="text-white/30 text-xs font-mono">{Math.round(k.confidence * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button onClick={onViewDetail}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-2xl text-sm transition-all active:scale-95">
                  <BookOpen className="w-4 h-4" />
                  Makna & Filosofi Lengkap
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={onViewPage}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white py-2.5 rounded-2xl text-sm transition-all active:scale-95">
                  <Eye className="w-4 h-4" />
                  Lihat Halaman Detail
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="text-[10px] text-white/20 text-center">
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/40">Spasi</kbd> untuk capture manual
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Bottom Sheet ──────────────────────────────────
function MobileResultCard({ result, onViewDetail, onDismiss }: {
  result: PredResult; onViewDetail: () => void; onDismiss: () => void;
}) {
  const batik = getBatik(result.label);
  const name = labelToName(result.label);
  const pct = Math.round(result.confidence * 100);
  const high = result.confidence > 0.70;
  return (
    <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
      className="absolute bottom-0 left-0 right-0 z-20">
      <div className="absolute inset-0 bg-gradient-to-t from-black/96 via-black/85 to-transparent rounded-t-3xl backdrop-blur-lg" />
      <div className="relative px-4 pt-2 pb-6">
        <div className="w-8 h-1 bg-white/30 rounded-full mx-auto mb-3" />
        <div className="flex items-center gap-2 mb-3">
          <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${high ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
            <Sparkles className="w-2.5 h-2.5" />{high ? 'Teridentifikasi' : 'Kemungkinan'}
          </span>
          <span className="text-white/40 text-[10px] ml-auto">{pct}%</span>
        </div>
        <div className="flex gap-3 mb-3">
          {batik?.imageUrl && (
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
              <img src={batik.imageUrl} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-tight truncate">{name}</h3>
            {batik && <p className="text-amber-400/80 text-xs mt-0.5">📍 {batik.origin}</p>}
            <ConfBar value={result.confidence} color={high ? '#22c55e' : '#f59e0b'} />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onViewDetail}
            className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-2xl text-xs transition-all active:scale-95">
            <BookOpen className="w-3.5 h-3.5" />Makna & Filosofi<ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDismiss}
            className="w-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────
export function ScanPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [state, setState] = useState<ScanState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraCapabilities, setCameraCapabilities] = useState<{
    zoom?: { min: number; max: number; step: number };
    torch?: boolean;
  }>({});
  const [modelState, setModelState] = useState<ModelState>('idle');
  const [liveResult, setLiveResult] = useState<PredResult | null>(null);
  const [isInferring, setIsInferring] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tfliteModelRef = useRef<any>(null);

  const isLive = state === 'camera' && isCameraActive;
  const locked = !!liveResult && liveResult.confidence >= CONFIDENCE_THRESHOLD;

  // ── Load ONNX ────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setModelState('loading');
      try {
        const ort = await import('onnxruntime-web');
        ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';
        const session = await ort.InferenceSession.create('/batik_model.onnx', {
          executionProviders: ['wasm'],
        });
        if (!cancelled) {
          tfliteModelRef.current = session;
          setModelState('ready');
        }
      } catch (e) {
        if (!cancelled) setModelState('error');
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // ── Re-attach video stream setelah React remount ─────────
  // Video element di-render selalu (hidden via CSS), tapi saat
  // pertama kali muncul visible, srcObject-nya perlu di-set ulang.
  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      const video = videoRef.current;
      if (video.srcObject !== streamRef.current) {
        video.srcObject = streamRef.current;
        video.play().catch(e => console.warn('Video play:', e));
      }
    }
  }, [isCameraActive, state]);

  // ── Spacebar shortcut ─────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isLive) { e.preventDefault(); capturePhoto(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isLive]);

  // ── Cleanup ───────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      stopCamera();
    };
  }, []);

  // ── Camera ───────────────────────────────────────────────
  const stopCamera = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (scanIntervalRef.current) { clearInterval(scanIntervalRef.current); scanIntervalRef.current = null; }
    setIsCameraActive(false);
    setLiveResult(null);
    setState('idle');
  };

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('no getUserMedia');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;

      const track = stream.getVideoTracks()[0];
      const caps: any = track.getCapabilities?.() ?? {};
      const capState: any = {};
      if ('zoom' in caps) { capState.zoom = { min: caps.zoom.min, max: caps.zoom.max, step: caps.zoom.step || 0.1 }; setZoomLevel(caps.zoom.min); }
      if ('torch' in caps) capState.torch = true;
      if ('focusMode' in caps && caps.focusMode?.includes('continuous')) {
        await track.applyConstraints({ advanced: [{ focusMode: 'continuous' } as any] });
      }
      setCameraCapabilities(capState);

      // Set state AFTER stream ready — useEffect will attach srcObject
      setIsCameraActive(true);
      setState('camera');
      setPreview(null);
      setCapturedImage(null);
      setLiveResult(null);

      // Attach immediately (in case element already mounted)
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => { });
        videoRef.current.onloadedmetadata = () => {
          toast.success('Kamera Siap 🎯', { description: 'AI mendeteksi otomatis — atau tekan Spasi' });
        };
      }
    } catch (err: any) {
      let msg = 'Gunakan http://localhost:3000 bukan IP address.';
      if (err.name === 'NotAllowedError') msg = 'Izin kamera ditolak.';
      if (err.name === 'NotFoundError') msg = 'Kamera tidak ditemukan.';
      toast.error('Kamera Gagal', { description: msg });
    }
  };

  // ── Inference ─────────────────────────────────────────────
  const runInference = useCallback(async (canvas: HTMLCanvasElement): Promise<PredResult | null> => {
    const session = tfliteModelRef.current;
    if (!session) return null;
    try {
      const ort = await import('onnxruntime-web');
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      const imageData = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
      const float32 = new Float32Array(IMG_SIZE * IMG_SIZE * 3);
      for (let i = 0; i < IMG_SIZE * IMG_SIZE; i++) {
        float32[i * 3 + 0] = imageData.data[i * 4 + 0] / 255.0;
        float32[i * 3 + 1] = imageData.data[i * 4 + 1] / 255.0;
        float32[i * 3 + 2] = imageData.data[i * 4 + 2] / 255.0;
      }
      const inputName = session.inputNames[0];
      const tensor = new ort.Tensor('float32', float32, [1, IMG_SIZE, IMG_SIZE, 3]);
      const results = await session.run({ [inputName]: tensor });
      const probs = Array.from(results[session.outputNames[0]].data as Float32Array) as number[];
      const indexed = probs.map((v, i) => ({ label: MODEL_LABELS[i] ?? `cls_${i}`, confidence: v }));
      indexed.sort((a, b) => b.confidence - a.confidence);
      return { label: indexed[0].label, confidence: indexed[0].confidence, topK: indexed.slice(0, 3) };
    } catch (e) { return null; }
  }, []);

  // ── Live scan loop ────────────────────────────────────────
  useEffect(() => {
    if (!isLive || modelState !== 'ready') return;
    scanIntervalRef.current = setInterval(async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2 || isInferring) return;
      setIsInferring(true);
      try {
        canvas.width = IMG_SIZE; canvas.height = IMG_SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, IMG_SIZE, IMG_SIZE);
        const result = await runInference(canvas);
        setLiveResult(result && result.confidence >= CONFIDENCE_THRESHOLD ? result : null);
      } finally { setIsInferring(false); }
    }, SCAN_INTERVAL_MS);
    return () => { if (scanIntervalRef.current) clearInterval(scanIntervalRef.current); };
  }, [isLive, modelState, isInferring, runInference]);

  // ── Zoom / Flash ──────────────────────────────────────────
  const handleZoom = async (dir: 'in' | 'out') => {
    if (!streamRef.current || !cameraCapabilities.zoom) return;
    const track = streamRef.current.getVideoTracks()[0];
    const { min, max, step } = cameraCapabilities.zoom;
    const nz = dir === 'in' ? Math.min(max, zoomLevel + step) : Math.max(min, zoomLevel - step);
    try { await track.applyConstraints({ advanced: [{ zoom: nz } as any] }); setZoomLevel(nz); } catch (e) { }
  };
  const toggleFlash = async () => {
    if (!streamRef.current || !cameraCapabilities.torch) return;
    const next = !flashEnabled;
    try { await streamRef.current.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: next } as any] }); setFlashEnabled(next); } catch (e) { }
  };

  // ── Actions ───────────────────────────────────────────────
  const captureAndNavigate = (result: PredResult) => {
    stopCamera();
    navigate(`/batik/${result.label}`);
  };

  const capturePhoto = () => {
    const video = videoRef.current; const canvas = canvasRef.current;
    if (!video || !canvas || !isCameraActive || video.videoWidth === 0) { toast.error('Kamera belum siap'); return; }
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setCapturedImage(url); setPreview(url); stopCamera();
      startScan(new File([blob], 'capture.jpg', { type: 'image/jpeg' }), url);
    }, 'image/jpeg', 0.95);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setPreview(URL.createObjectURL(file)); setState('preview');
  };

  const confirmUpload = () => {
    if (!preview) return;
    fetch(preview).then(r => r.blob()).then(blob => startScan(new File([blob], 'upload.jpg', { type: blob.type }), preview));
  };

  const retakePhoto = () => {
    if (capturedImage) URL.revokeObjectURL(capturedImage);
    setCapturedImage(null); setPreview(null); setState('idle');
  };

  const startScan = async (file: File, previewUrl?: string) => {
    setState('scanning');
    try {
      const formData = new FormData(); formData.append('file', file);
      const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${API}/predict`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`${res.status}`);
      const result = await res.json();
      if (!result.prediction) throw new Error('No prediction');
      setState('complete');
      toast.success('Teridentifikasi!', { description: `${result.prediction} (${result.percentage || ''})` });
      localStorage.setItem('scanResult', JSON.stringify({ ...result, success: true, uploadedImageUrl: previewUrl || preview }));
      redirectTimeoutRef.current = setTimeout(() => navigate('/result?id=scan-result'), 1500);
    } catch (err) {
      setState('idle');
      const msg = err instanceof Error && err.message.includes('Failed to fetch')
        ? 'Backend tidak berjalan (port 5000).' : 'Coba gambar yang berbeda.';
      toast.error('Scan Gagal', { description: msg });
    }
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center py-8">
      <div className="w-full">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">{t('scan.title')}</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-lg mx-auto">{t('scan.subtitle')}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {/* AI Status */}
            <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${modelState === 'ready' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                modelState === 'loading' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-red-500/10 text-red-400 border-red-500/20'}`}>
              {modelState === 'ready' && <><motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />AI Aktif · 91.8%</>}
              {modelState === 'loading' && <><RefreshCw className="w-3 h-3 animate-spin" />Memuat AI…</>}
              {modelState === 'error' && <><AlertCircle className="w-3 h-3" />Model Error</>}
            </div>

            {/* DB Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-xs font-bold text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 active:scale-95">
                  <Info className="w-3.5 h-3.5" />Lihat Database ({batiks.length} Motif)
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl h-[85vh] flex flex-col bg-[#0F1419] border-white/10 text-white p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 border-b border-white/10">
                  <DialogTitle className="text-2xl font-serif font-bold text-amber-500/90">Koleksi Batik</DialogTitle>
                  <DialogDescription className="text-white/50">AI ditraining mengenali {batiks.length} motif batik Indonesia.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-grow p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
                    {batiks.map(b => (
                      <div key={b.id} className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/40 transition-all group/card">
                        <div className="aspect-square rounded-lg overflow-hidden relative">
                          <img src={b.imageUrl} alt={b.name} className="w-full h-full object-cover opacity-80 group-hover/card:scale-110 transition-all duration-500" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <p className="absolute bottom-1.5 left-2 right-2 text-[9px] font-black uppercase tracking-widest text-white/90 truncate">{b.origin}</p>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-amber-500/90 truncate">{b.name}</h4>
                        <p className="text-[10px] text-white/40 line-clamp-2">{b.meaning[language].substring(0, 50)}…</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* ── Hidden canvas (always in DOM for inference) ── */}
        <canvas ref={canvasRef} className="hidden" />

        {/* ── IDLE / UPLOAD / PREVIEW / SCANNING / COMPLETE ── */}
        {/* Shown when NOT live; hidden when live (CSS only, not unmount) */}
        <div className={isLive ? 'hidden' : 'block'}>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto">
            <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden glass-card border-foreground/10 shadow-2xl">
              <AnimatePresence mode="wait">

                {/* Idle */}
                {state === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                      <Upload className="w-9 h-9" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold font-serif">Input Sample</p>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">JPG • PNG • RAW</p>
                    </div>
                    <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleFile} />
                    <div className="flex flex-col gap-3 w-full max-w-[260px]">
                      <Button onClick={() => fileInputRef.current?.click()}
                        className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl py-6 text-base font-black uppercase tracking-widest">
                        {t('scan.upload_btn')}
                      </Button>
                      <Button variant="ghost" onClick={startCamera}
                        className="rounded-2xl border border-foreground/10 py-6 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest">
                        <Camera className="w-4 h-4 mr-2" />{t('scan.camera_btn')}
                        {modelState === 'ready' && <span className="ml-2 text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">LIVE AI</span>}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Preview */}
                {state === 'preview' && preview && (
                  <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20">
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <div className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"><p className="text-white text-xs">Preview</p></div>
                        <Button onClick={retakePhoto} variant="outline" size="sm" className="bg-black/50 text-white border-white/30 rounded-full"><X className="w-4 h-4" /></Button>
                      </div>
                      <div className="absolute bottom-6 left-4 right-4 flex gap-3">
                        <Button onClick={retakePhoto} variant="outline" className="bg-black/50 text-white border-white/30 rounded-2xl flex-1"><RotateCcw className="w-4 h-4 mr-2" />Retake</Button>
                        <Button onClick={confirmUpload} className="bg-white text-black rounded-2xl flex-1 font-semibold"><Check className="w-4 h-4 mr-2" />Analisis</Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Scanning */}
                {state === 'scanning' && preview && (
                  <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                    <img src={preview} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div animate={{ top: ['-5%', '105%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-0.5 bg-foreground shadow-[0_0_40px_hsl(var(--foreground))] z-20" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                      <RefreshCw className="w-10 h-10 animate-spin mb-4" />
                      <p className="font-serif text-xl font-bold tracking-[0.2em] uppercase">Menganalisis</p>
                      <p className="text-muted-foreground text-[10px] mt-2 font-black tracking-[0.4em] uppercase">Mengenali pola batik…</p>
                    </div>
                  </motion.div>
                )}

                {/* Complete */}
                {state === 'complete' && preview && (
                  <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                    <img src={preview} alt="" className="w-full h-full object-cover saturate-0 opacity-40 blur-sm" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-xl">
                      <Scan className="w-12 h-12 mb-4" />
                      <p className="font-serif text-2xl font-bold">Analysis Ready</p>
                      <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase mt-2">Opening dossier…</p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── LIVE CAMERA — video selalu ada di DOM (tidak pernah unmount) ── */}
        <div className={isLive ? 'block' : 'hidden'}>
          <motion.div animate={{ opacity: isLive ? 1 : 0 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-4 max-w-5xl mx-auto">

            {/* Kiri: Camera */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[480px] rounded-3xl overflow-hidden bg-black shadow-2xl">

              {/* VIDEO — di-render SELALU, srcObject di-attach via useEffect */}
              <video ref={videoRef} autoPlay playsInline muted
                className="absolute inset-0 w-full h-full object-cover" />

              <ScanFrame locked={locked} />

              {/* Top controls */}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                <div className="flex gap-2">
                  {cameraCapabilities.torch && (
                    <button onClick={toggleFlash}
                      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 ${flashEnabled ? 'bg-white text-black' : 'bg-black/50 text-white'}`}>
                      <Flashlight className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={stopCamera}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/30 text-white hover:bg-red-500/60 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <motion.div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border backdrop-blur-sm ${locked ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-black/50 text-white/70 border-white/20'}`}
                  animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                  <div className={`w-1.5 h-1.5 rounded-full ${locked ? 'bg-green-400' : 'bg-amber-400'} animate-pulse`} />
                  {locked ? '🎯 Terkunci' : 'Mendeteksi…'}
                </motion.div>

                {cameraCapabilities.zoom && (
                  <div className="flex gap-1 bg-black/50 backdrop-blur-md rounded-full px-1.5 py-1 border border-white/20">
                    <button onClick={() => handleZoom('out')} disabled={zoomLevel <= cameraCapabilities.zoom!.min}
                      className="text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 disabled:opacity-30">
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-white text-xs self-center px-1 font-mono">{zoomLevel.toFixed(1)}x</span>
                    <button onClick={() => handleZoom('in')} disabled={zoomLevel >= cameraCapabilities.zoom!.max}
                      className="text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 disabled:opacity-30">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile hint */}
              {!locked && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 md:hidden">
                  <motion.div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20"
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Scan className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-white/80 text-xs">Arahkan ke batik…</span>
                  </motion.div>
                </div>
              )}

              {/* Mobile bottom sheet */}
              <div className="md:hidden">
                <AnimatePresence>
                  {locked && liveResult && (
                    <MobileResultCard
                      result={liveResult}
                      onViewDetail={() => captureAndNavigate(liveResult)}
                      onDismiss={() => setLiveResult(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Kanan: Info Panel (Desktop only) */}
            <div className="hidden md:flex flex-col rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <DesktopResultPanel
                result={liveResult}
                modelState={modelState}
                onViewDetail={() => liveResult && captureAndNavigate(liveResult)}
                onViewPage={() => liveResult && navigate(`/batik/${liveResult.label}`)}
              />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-[9px] md:text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${modelState === 'ready' ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
            AI: {modelState === 'ready' ? 'Online' : modelState === 'loading' ? 'Loading…' : 'Offline'}
          </div>
          <div className="w-1 h-1 rounded-full bg-border" /> MobileNetV2
          <div className="w-1 h-1 rounded-full bg-border" /> 38 Motif
        </div>

      </div>
    </div>
  );
}