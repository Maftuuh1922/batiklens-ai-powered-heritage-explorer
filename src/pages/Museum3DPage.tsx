
import React, { useState, Suspense, useMemo, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    KeyboardControls,
    ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';
import { batiks } from '@/lib/batik-data';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { X, Map as MapIcon, ChevronRight, Sparkles, Maximize, Minimize } from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Modular Components
import { Environment, Butterfly } from '@/components/museum/Environment';
import { Painting } from '@/components/museum/Painting';
import { Player } from '@/components/museum/Player';
import { MiniMap } from '@/components/museum/MiniMap';
import { DetailDialog } from '@/components/museum/DetailDialog';
import { LoadingScreen } from '@/components/museum/LoadingScreen';
import { MobileControls } from '@/components/museum/MobileControls';

// Decorative Component: Warm Gold Dust Particles
const DustParticles = () => {
    const count = 120;
    const mesh = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 1] = Math.random() * 7 + 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        return pos;
    }, []);
    const speeds = useMemo(() => Array.from({ length: count }, () => Math.random() * 0.3 + 0.05), []);
    useFrame(({ clock }) => {
        if (!mesh.current) return;
        const pos = mesh.current.geometry.attributes.position.array as Float32Array;
        const t = clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] += speeds[i] * 0.004;
            pos[i * 3] += Math.sin(t * 0.08 + i) * 0.0015;
            if (pos[i * 3 + 1] > 7.5) pos[i * 3 + 1] = 0.5;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });
    return (
        <points ref={mesh}>
            <bufferGeometry><bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} /></bufferGeometry>
            <pointsMaterial size={0.06} color="#ffcc44" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
        </points>
    );
};

import { useFrame } from '@react-three/fiber';

// Centerpiece: Glowing Heritage Crest
const HeritageCrest = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.5;
            ref.current.position.y = 4 + Math.sin(clock.getElapsedTime() * 0.8) * 0.2;
        }
    });
    return (
        <group ref={ref} position={[0, 4, 0]}>
            <mesh>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.1} emissive="#b8860b" emissiveIntensity={0.5} />
            </mesh>
            <pointLight intensity={2} distance={10} color="#ffd700" />
            <mesh scale={1.2}>
                <octahedronGeometry args={[0.8, 0]} />
                <meshBasicMaterial color="#ffd700" wireframe transparent opacity={0.2} />
            </mesh>
        </group>
    );
};

export const Museum3DPage = () => {
    const { language } = useLanguage();
    const [selectedBatik, setSelectedBatik] = useState<any>(null);
    const [started, setStarted] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 0 });
    const [visited, setVisited] = useState<Set<string>>(new Set());
    const [isSprinting, setIsSprinting] = useState(false);

    // Mobile & Control States
    const [isMobile, setIsMobile] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // FIX 1 & 4: Mobile Handlers and Navbar Hiding
    const mobileHandlers = useRef({
        onMove: (x: number, y: number) => { },
        onLook: (dx: number, dy: number) => { },
        onSprint: (s: boolean) => { },
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Hide Navbar/Header
        const navbar = document.querySelector('nav') as HTMLElement;
        const header = document.querySelector('header') as HTMLElement;
        if (navbar) navbar.style.display = 'none';
        if (header) header.style.display = 'none';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('resize', checkMobile);
            if (navbar) navbar.style.display = '';
            if (header) header.style.display = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                toast.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const museumBatiks = useMemo(() => {
        return batiks.slice(0, 20).map((batik, i) => {
            const x = (i % 10 - 4.5) * 11;
            const z = i < 10 ? -57.5 : 57.5;
            const rotationY = i < 10 ? 0 : Math.PI;
            return {
                ...batik,
                position: [x, 3.8, z] as [number, number, number],
                rotation: [0, rotationY, 0] as [number, number, number]
            };
        });
    }, []);

    const butterflyPositions: [number, number, number][] = useMemo(() => [
        [-15, 4.5, -20], [10, 3.8, -30], [-5, 5.2, -15],
        [20, 4.2, -20], [0, 4.8, 0], [-25, 3.5, 10],
        [15, 5.0, 10], [-10, 4.0, -5]
    ], []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Escape' && selectedBatik) {
                setSelectedBatik(null);
                if (!isMobile) setTimeout(() => document.body.requestPointerLock(), 150);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedBatik, isMobile]);

    const handleSelect = useCallback((batik: any) => {
        setSelectedBatik(batik);
        if (!visited.has(batik.id)) {
            setVisited(prev => new Set(prev).add(batik.id));
            if (visited.size === 0) {
                toast.success("Selamat Datang!", {
                    description: isMobile ? "Gunakan joystick di kiri dan geser layar di kanan." : "Arahkan target ke lukisan dan klik untuk detail.",
                    duration: 6000,
                    icon: <Sparkles className="text-gold" />
                });
            }
        }
    }, [visited, isMobile]);

    const handlePositionChange = useCallback((pos: { x: number, z: number }) => {
        setPlayerPosition(pos);
    }, []);

    if (!loaded) return <LoadingScreen onComplete={() => setLoaded(true)} />;

    return (
        <div
            className="bg-[#e8d5a3] font-sans"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                overflow: 'hidden',
                touchAction: 'none'
            }}
        >
            <Toaster position="top-right" expand={false} richColors theme="dark" />

            {/* Vignette CSS Overlay */}
            {started && (
                <div
                    className='absolute inset-0 pointer-events-none z-10'
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(60,20,0,0.55) 100%)',
                    }}
                />
            )}

            {/* Mobile Controls Overlay */}
            <MobileControls
                visible={started && !selectedBatik && isMobile}
                onMove={(x, y) => mobileHandlers.current.onMove(x, y)}
                onLook={(dx, dy) => mobileHandlers.current.onLook(dx, dy)}
                onSprint={(s) => mobileHandlers.current.onSprint(s)}
            />

            {/* Target Crosshair */}
            {started && !selectedBatik && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-5 h-px bg-black/40 shadow-lg" />
                    <div className="h-5 w-px bg-black/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg" />
                </div>
            )}

            {/* Version Header */}
            <div className={`absolute ${isMobile ? 'top-2 left-2 scale-[0.55] origin-top-left' : 'top-10 left-10'} z-20 pointer-events-none group`}>
                <div className="bg-[#111111]/90 backdrop-blur-3xl p-8 rounded-3xl border border-white/10 flex items-center gap-8 shadow-2xl transition-all">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-inner group-hover:scale-110 transition-transform">
                        <MapIcon className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                        <h1 className="text-white font-serif font-black text-3xl leading-none tracking-tighter italic">GALLERY OF HERITAGE</h1>
                        <div className="flex items-center gap-3 mt-3">
                            <p className="text-gold/60 text-[10px] uppercase tracking-[0.4em] font-black">Archive Experience • ver 7.7</p>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{visited.size}/20 EXPLORED</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`absolute ${isMobile ? 'top-4 right-4' : 'top-10 right-10'} z-30 flex gap-2 md:gap-4`}>
                {started && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/10 text-white rounded-full w-10 h-10 md:w-14 md:h-14 border border-white/20 hover:bg-white/20 backdrop-blur-md"
                        onClick={toggleFullscreen}
                    >
                        {isFullscreen ? <Minimize className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize className="w-5 h-5 md:w-6 md:h-6" />}
                    </Button>
                )}
                <Button variant="ghost" size="icon" className="bg-red-600/10 text-red-500 rounded-full w-10 h-10 md:w-14 md:h-14 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all shadow-xl" onClick={() => window.history.back()}>
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
            </div>

            {!started && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl px-6 text-center">
                    <div className="mb-12 origin-center scale-90 md:scale-100 animate-in fade-in zoom-in duration-700">
                        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30 shadow-[0_0_30px_rgba(184,134,11,0.2)]">
                            <Sparkles className="w-10 h-10 text-gold" />
                        </div>
                        <h2 className="text-white font-serif text-5xl font-black italic tracking-tighter mb-2">ARCHIVE LENS</h2>
                        <p className="text-gold/60 text-[10px] md:text-xs uppercase tracking-[0.5em] font-black">Digital Heritage Explorer • v7.7</p>
                    </div>

                    <Button
                        onClick={() => {
                            setStarted(true);
                            toggleFullscreen();
                        }}
                        size="lg"
                        className="group bg-gold hover:bg-white text-black font-black px-12 md:px-32 py-10 md:py-14 text-xl md:text-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-2 active:scale-95"
                    >
                        <span className="flex items-center">
                            {isMobile ? 'MULAI FULLSCREEN' : 'ENGAGE FULLSCREEN'}
                            <ChevronRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                        </span>
                    </Button>

                    <div className="mt-10 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-8 bg-white/20" />
                            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold italic">
                                Optimized Experience
                            </p>
                            <div className="h-px w-8 bg-white/20" />
                        </div>
                        <p className="text-white/30 text-[9px] md:text-[10px] max-w-xs leading-relaxed uppercase tracking-widest text-center mt-2">
                            Layar akan otomatis masuk ke mode Fullscreen untuk fokus maksimal pada Galeri Batik
                        </p>
                    </div>
                </div>
            )}

            {started && <MiniMap playerPosition={playerPosition} paintings={museumBatiks} />}

            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
                    { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
                    { name: 'left', keys: ['KeyA', 'a'] },
                    { name: 'right', keys: ['KeyD', 'd'] },
                    { name: 'sprint', keys: ['ShiftLeft'] },
                ]}
            >
                <div
                    className='h-screen w-full relative'
                    style={{
                        filter: 'sepia(0.18) saturate(1.15) brightness(0.97)',
                        touchAction: 'none'
                    }}
                >
                    <Canvas
                        dpr={[1, 1.5]}
                        shadows="soft"
                        camera={{ position: [0, 1.7, 0], fov: 65, near: 0.1, far: 200 }}
                        gl={{
                            antialias: true,
                            powerPreference: "high-performance",
                            logarithmicDepthBuffer: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                            toneMappingExposure: 1.3
                        }}
                    >
                        <color attach="background" args={['#e8d5a3']} />
                        <fog attach="fog" args={['#e8d5a3', 75, 150]} />

                        <ambientLight intensity={0.9} color='#ffe8b0' />
                        <hemisphereLight
                            intensity={0.7}
                            color='#ffcc66'
                            groundColor='#5c2e00'
                        />
                        <directionalLight
                            position={[15, 20, 5]}
                            intensity={1.8}
                            color='#ffb347'
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                            shadow-camera-left={-65}
                            shadow-camera-right={65}
                            shadow-camera-top={65}
                            shadow-camera-bottom={-65}
                            shadow-camera-far={150}
                        />

                        {/* Warm fill from within */}
                        <pointLight position={[0, 6, 0]} intensity={1.2} color='#ffaa33' distance={120} decay={2} />
                        <pointLight position={[-30, 5, 0]} intensity={0.5} color='#ff9922' distance={80} decay={2} />
                        <pointLight position={[30, 5, 0]} intensity={0.5} color='#ff9922' distance={80} decay={2} />
                        <pointLight position={[0, 5, -30]} intensity={0.4} color='#ffbb44' distance={80} decay={2} />
                        <pointLight position={[0, 5, 30]} intensity={0.4} color='#ffbb44' distance={80} decay={2} />

                        <Suspense fallback={null}>
                            <Environment museumBatiks={museumBatiks} />
                            <HeritageCrest />
                            <DustParticles />

                            <ContactShadows
                                position={[0, 0.01, 0]}
                                opacity={0.4}
                                scale={120}
                                blur={2.5}
                                far={10}
                                color="#2a1800"
                            />

                            {museumBatiks.map((batik) => (
                                <Painting
                                    key={batik.id}
                                    batik={batik}
                                    isVisited={visited.has(batik.id)}
                                    position={batik.position as [number, number, number]}
                                    rotation={batik.rotation as [number, number, number]}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </Suspense>

                        {butterflyPositions.map((pos, i) => (
                            <Butterfly key={i} position={pos} />
                        ))}

                        <Player
                            started={started}
                            paused={!!selectedBatik}
                            onPositionChange={handlePositionChange}
                            onSprintChange={setIsSprinting}
                            mobileHandlers={mobileHandlers}
                        />
                    </Canvas>
                </div>
            </KeyboardControls>

            <DetailDialog
                selectedBatik={selectedBatik}
                onClose={() => setSelectedBatik(null)}
                language={language}
            />
        </div>
    );
};
