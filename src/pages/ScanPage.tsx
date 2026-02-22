import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, Scan, RefreshCw, X, Check, RotateCcw, ZoomIn, ZoomOut, Focus, Flashlight, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/LanguageContext';
import { batiks } from '@/lib/batik-data';

type ScanState = 'idle' | 'camera' | 'preview' | 'scanning' | 'complete';

export function ScanPage() {
  const { t, language } = useLanguage();
  const [state, setState] = useState<ScanState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraCapabilities, setCameraCapabilities] = useState<{
    zoom?: { min: number; max: number; step: number };
    torch?: boolean;
    focusMode?: string[];
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setState('idle');
  };

  const startCamera = async () => {
    try {
      console.log('Requesting camera access...');

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('getUserMedia not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 },
        },
        audio: false,
      });

      console.log('Camera stream obtained:', stream);

      if (!videoRef.current) {
        console.error('Video ref not available');
        return;
      }

      // Set state first so video element becomes visible
      streamRef.current = stream;
      setIsCameraActive(true);
      setState('camera');
      setPreview(null);
      setCapturedImage(null);

      // Get camera capabilities for zoom, flash, and focus
      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities?.();

      if (capabilities) {
        const caps: any = {};

        // Check zoom capability
        if ('zoom' in capabilities) {
          caps.zoom = {
            min: (capabilities as any).zoom.min,
            max: (capabilities as any).zoom.max,
            step: (capabilities as any).zoom.step || 0.1,
          };
          setZoomLevel((capabilities as any).zoom.min);
        }

        // Check torch (flash) capability
        if ('torch' in capabilities) {
          caps.torch = true;
        }

        // Check focus mode capability
        if ('focusMode' in capabilities) {
          caps.focusMode = (capabilities as any).focusMode;
          // Enable continuous autofocus if available
          if (caps.focusMode.includes('continuous')) {
            await videoTrack.applyConstraints({
              advanced: [{ focusMode: 'continuous' } as any]
            });
          }
        }

        setCameraCapabilities(caps);
        console.log('Camera capabilities:', caps);
      }

      // Then assign stream to video
      videoRef.current.srcObject = stream;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
          })
          .catch((err) => {
            console.warn('Autoplay blocked, waiting for user gesture', err);
          });
      }

      videoRef.current.onloadedmetadata = () => {
        console.log('Video metadata loaded, dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
        toast.success('Camera Ready', {
          description: 'Posisikan batik di frame lalu tekan capture',
        });
      };
    } catch (error: any) {
      console.error('Camera error:', error);
      let errorMsg = 'Camera access denied or not supported. Please try uploading an image.';

      if (error.name === 'NotAllowedError') {
        errorMsg = 'Camera permission denied. Please allow camera access and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMsg = 'No camera found. Please use upload instead.';
      }

      toast.error('Camera Access Failed', {
        description: errorMsg,
      });
    }
  };

  const handleZoom = async (direction: 'in' | 'out') => {
    if (!streamRef.current || !cameraCapabilities.zoom) return;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    const { min, max, step } = cameraCapabilities.zoom;

    let newZoom = zoomLevel;
    if (direction === 'in') {
      newZoom = Math.min(max, zoomLevel + step);
    } else {
      newZoom = Math.max(min, zoomLevel - step);
    }

    try {
      await videoTrack.applyConstraints({
        advanced: [{ zoom: newZoom } as any]
      });
      setZoomLevel(newZoom);
    } catch (err) {
      console.error('Failed to apply zoom:', err);
    }
  };

  const toggleFlash = async () => {
    if (!streamRef.current || !cameraCapabilities.torch) return;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    const newFlashState = !flashEnabled;

    try {
      await videoTrack.applyConstraints({
        advanced: [{ torch: newFlashState } as any]
      });
      setFlashEnabled(newFlashState);
      toast.success(newFlashState ? 'Flash On' : 'Flash Off');
    } catch (err) {
      console.error('Failed to toggle flash:', err);
      toast.error('Flash not supported on this device');
    }
  };

  const triggerAutofocus = async () => {
    if (!streamRef.current) return;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    const capabilities = videoTrack.getCapabilities?.();

    if (capabilities && 'focusMode' in capabilities) {
      try {
        // Trigger single autofocus
        await videoTrack.applyConstraints({
          advanced: [{ focusMode: 'single-shot' } as any]
        });
        toast.success('Autofocus triggered');

        // Return to continuous after a moment
        setTimeout(async () => {
          await videoTrack.applyConstraints({
            advanced: [{ focusMode: 'continuous' } as any]
          });
        }, 1000);
      } catch (err) {
        console.error('Failed to trigger autofocus:', err);
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      console.log('Capturing photo...', {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        readyState: video.readyState
      });

      // Check if video is ready
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        toast.error("Camera not ready", {
          description: "Please wait for camera to initialize"
        });
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        // Gunakan kualitas gambar tertinggi
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Gunakan PNG untuk kualitas maksimal (lossless)
        canvas.toBlob((blob) => {
          if (blob) {
            const objectUrl = URL.createObjectURL(blob);
            setCapturedImage(objectUrl);
            setPreview(objectUrl);
            stopCamera();
            toast.success("Photo captured!", {
              description: "Starting analysis..."
            });

            // Langsung analisis tanpa perlu tekan tombol lagi
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            startScan(file, objectUrl);
          } else {
            toast.error("Capture failed", {
              description: "Could not capture image. Please try again."
            });
          }
        }, 'image/jpeg', 0.95); // JPEG quality 95 untuk konsistensi
      }
    } else {
      toast.error("Camera not active", {
        description: "Please start camera first"
      });
    }
  };

  const confirmCapture = () => {
    if (capturedImage && preview) {
      // Convert objectUrl back to File for API
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          startScan(file, preview);
        });
    }
  };

  const retakePhoto = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
    setCapturedImage(null);
    setPreview(null);
    setState('idle');
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setState('preview');
    }
  };

  // Helper function to resize image to target dimensions
  const resizeImage = (file: File, width: number, height: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: false });

      img.onload = () => {
        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          // Ensure consistent color space and rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Fill with white background first (in case of transparency)
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);

          // Draw image centered and scaled to fit
          ctx.drawImage(img, 0, 0, width, height);

          // Use PNG for lossless compression (consistent across devices)
          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.png'), {
                type: 'image/png',
                lastModified: Date.now()
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to resize image'));
            }
          }, 'image/png'); // PNG lossless - no quality loss
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const confirmUpload = () => {
    if (preview) {
      fetch(preview)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'uploaded-image.jpg', { type: blob.type });
          startScan(file, preview);
        });
    }
  };


  const startScan = async (file: File, previewUrl?: string) => {
    setState('scanning');

    try {
      console.log('Starting scan with file:', file.name);

      // Send original image file - let backend handle all preprocessing
      const formData = new FormData();
      formData.append('file', file);

      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      console.log('Sending request to:', `${API_URL}/predict`);

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Classification failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Scan result:', result);

      // Cek jika ada error dari backend
      if (result.error) {
        throw new Error(result.error);
      }

      // Pastikan ada prediction
      if (!result.prediction) {
        throw new Error('No prediction returned from backend');
      }

      // Langsung ke state complete dan redirect
      setState('complete');
      toast.success("Identity Confirmed", {
        description: `Pattern recognized: ${result.prediction} (${result.percentage || ''})`
      });

      // Simpan hasil dan redirect ke halaman result
      const resultWithImage = {
        ...result,
        success: true,
        uploadedImageUrl: previewUrl || preview
      };
      localStorage.setItem('scanResult', JSON.stringify(resultWithImage));

      // Redirect setelah 1.5 detik
      redirectTimeoutRef.current = setTimeout(() => {
        navigate('/result?id=scan-result');
      }, 1500);

    } catch (error) {
      console.error('Scan error:', error);
      setState('idle');

      let errorMessage = "Please try again with a different image.";
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "Backend server is not running. Please start the backend.";
        } else if (error.message.includes('Classification failed')) {
          errorMessage = "Classification service error. Check backend logs.";
        }
      }

      toast.error("Scan Failed", {
        description: errorMessage
      });
    }
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">{t('scan.title')}</h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-lg mx-auto">{t('scan.subtitle')}</p>
            <div className="flex flex-col items-center gap-3 pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs font-bold text-amber-400 bg-amber-500/10 px-6 py-2.5 rounded-full border border-amber-500/20 backdrop-blur-sm hover:bg-amber-500/20 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.4)] group active:scale-95">
                    <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>View Supported Database ({batiks.length} Models)</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl h-[85vh] flex flex-col bg-[#0F1419] border-white/10 text-white p-0 overflow-hidden">
                  <DialogHeader className="p-6 pb-2 border-b border-white/10 bg-[#0F1419] z-10">
                    <DialogTitle className="text-2xl font-serif font-bold text-amber-500/90">Batik Collection</DialogTitle>
                    <DialogDescription className="text-white/50">
                      Our AI model is currently trained to recognize these {batiks.length} unique batik patterns from across Indonesia.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="flex-grow p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
                      {batiks.map((batik) => (
                        <div key={batik.id} className="flex flex-col gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/40 hover:bg-white/10 transition-all group/card">
                          <div className="aspect-square rounded-lg overflow-hidden bg-black/40 relative">
                            <img
                              src={batik.imageUrl}
                              alt={batik.name}
                              className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-[9px] font-black uppercase tracking-widest text-white/90 truncate">{batik.origin}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-sm text-amber-500/90 truncate leading-tight" title={batik.name}>{batik.name}</h4>
                            <p className="text-[10px] text-white/40 mt-1 line-clamp-2 leading-relaxed">{batik.meaning[language].substring(0, 50)}...</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest max-w-xs leading-relaxed">
                Tip: Ensure good lighting for best results
              </p>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-[min(90vw,448px)] mx-auto rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden glass-card border-foreground/10 group shadow-2xl">
            {/* Hidden canvas for photo capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera video stream - always in DOM, visibility controlled by CSS */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${state === 'camera' && isCameraActive ? 'block' : 'hidden'}`}
            />

            <AnimatePresence mode="wait">
              {state === 'idle' && !isCameraActive && (
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
                      {t('scan.upload_btn')}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={startCamera}
                      className="rounded-2xl border-foreground/10 py-6 md:py-7 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {t('scan.camera_btn')}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Camera active state */}
              {state === 'camera' && isCameraActive && (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10"
                >
                  {/* Camera overlay with frame guide - full screen view */}
                  <div className="absolute inset-0 z-20 flex flex-col">
                    {/* Top controls - Flash and Autofocus */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto z-30">
                      <div className="flex gap-2">
                        {cameraCapabilities.torch && (
                          <Button
                            onClick={toggleFlash}
                            size="sm"
                            variant="outline"
                            className={`rounded-full w-10 h-10 p-0 backdrop-blur-md border-white/30 ${flashEnabled
                              ? 'bg-white text-black hover:bg-white/90'
                              : 'bg-black/50 text-white hover:bg-black/70'
                              }`}
                          >
                            <Flashlight className="w-5 h-5" />
                          </Button>
                        )}
                        {cameraCapabilities.focusMode && (
                          <Button
                            onClick={triggerAutofocus}
                            size="sm"
                            variant="outline"
                            className="bg-black/50 text-white border-white/30 hover:bg-black/70 rounded-full w-10 h-10 p-0 backdrop-blur-md"
                          >
                            <Focus className="w-5 h-5" />
                          </Button>
                        )}
                      </div>

                      {/* Zoom controls */}
                      {cameraCapabilities.zoom && (
                        <div className="flex gap-2 bg-black/50 backdrop-blur-md rounded-full px-2 py-1 border border-white/30">
                          <Button
                            onClick={() => handleZoom('out')}
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                            disabled={zoomLevel <= cameraCapabilities.zoom.min}
                          >
                            <ZoomOut className="w-4 h-4" />
                          </Button>
                          <span className="text-white text-xs font-medium self-center px-2">
                            {zoomLevel.toFixed(1)}x
                          </span>
                          <Button
                            onClick={() => handleZoom('in')}
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                            disabled={zoomLevel >= cameraCapabilities.zoom.max}
                          >
                            <ZoomIn className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Scanning frame - covers most of the screen */}
                    <div className="absolute inset-4 pointer-events-none">
                      {/* Corner guides - larger and more visible */}
                      <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-white/90 rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-white/90 rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-white/90 rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-white/90 rounded-br-lg" />
                    </div>

                    {/* Bottom controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pointer-events-auto">
                      <div className="flex gap-6 justify-center mb-4">
                        <Button
                          onClick={capturePhoto}
                          size="lg"
                          className="bg-white text-black hover:bg-white/90 rounded-full w-20 h-20 p-0 shadow-lg z-30 border-4 border-white/50"
                        >
                          <Camera className="w-10 h-10" />
                        </Button>
                        <Button
                          onClick={stopCamera}
                          variant="outline"
                          size="lg"
                          className="bg-black/50 text-white border-white/30 hover:bg-black/70 rounded-full w-16 h-16 p-0 z-30"
                        >
                          <X className="w-6 h-6" />
                        </Button>
                      </div>
                      <p className="text-white text-sm font-medium text-center">
                        Posisikan batik dalam frame
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        {cameraCapabilities.zoom && 'Gunakan zoom untuk detail lebih baik'}
                        {!cameraCapabilities.zoom && 'Tekan tombol putih untuk foto'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preview captured photo state */}
              {state === 'preview' && preview && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0"
                >
                  <img src={preview} alt="Captured" className="w-full h-full object-cover" />

                  {/* Preview overlay with controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20">
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <div className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        <p className="text-white text-xs font-medium">Preview</p>
                      </div>
                      <Button
                        onClick={retakePhoto}
                        variant="outline"
                        size="sm"
                        className="bg-black/50 text-white border-white/30 hover:bg-black/70 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="absolute bottom-6 left-4 right-4 flex gap-4 justify-center">
                      <Button
                        onClick={retakePhoto}
                        variant="outline"
                        className="bg-black/50 text-white border-white/30 hover:bg-black/70 rounded-2xl px-6 py-3 flex-1 max-w-[140px]"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Retake
                      </Button>
                      <Button
                        onClick={capturedImage ? confirmCapture : confirmUpload}
                        className="bg-white text-black hover:bg-white/90 rounded-2xl px-6 py-3 flex-1 max-w-[140px] font-semibold"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Analyze
                      </Button>
                    </div>

                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                      <p className="text-white/90 text-sm font-medium text-center mb-1">
                        {capturedImage ? 'Photo captured successfully' : 'Image ready for analysis'}
                      </p>
                      <p className="text-white/60 text-xs text-center">
                        Review your image before scanning
                      </p>
                    </div>
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