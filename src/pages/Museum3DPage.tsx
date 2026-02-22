
import React, { useState, Suspense, useMemo, useCallback, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { batiks } from '@/lib/batik-data';
import { useLanguage } from '@/lib/LanguageContext';
import { Sparkles } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import { Environment, Butterfly } from '@/components/museum/Environment';
import { Painting } from '@/components/museum/Painting';
import { Player } from '@/components/museum/Player';
import { DetailDialog } from '@/components/museum/DetailDialog';
import { LoadingScreen } from '@/components/museum/LoadingScreen';
import { MobileControls } from '@/components/museum/MobileControls';

// ─────────────────────────────────────────────────────────────────────────────
// MODULE-LEVEL components (NEVER redefined inside render → no remount bug)
// ─────────────────────────────────────────────────────────────────────────────

// Spinning decorative crest
const HeritageCrest = () => {
    const ref = useRef<THREE.Group>(null);
    const frame = useRef(0);
    useFrame(({ clock }) => {
        frame.current++;
        if (frame.current % 2 !== 0) return;
        if (!ref.current) return;
        ref.current.rotation.y = clock.getElapsedTime() * 0.4;
        ref.current.position.y = 3.8 + Math.sin(clock.getElapsedTime() * 0.7) * 0.18;
    });
    return (
        <group ref={ref} position={[0, 3.8, 0]}>
            <mesh castShadow>
                <octahedronGeometry args={[0.85, 1]} />
                <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.05} emissive="#b8860b" emissiveIntensity={0.6} />
            </mesh>
            <pointLight intensity={3} distance={14} color="#ffd060" castShadow={false} />
            <mesh scale={1.25}>
                <octahedronGeometry args={[0.85, 0]} />
                <meshBasicMaterial color="#ffe080" wireframe transparent opacity={0.15} depthWrite={false} />
            </mesh>
        </group>
    );
};

// ProximityDetector — OUTSIDE Museum3DPage so it's never recreated
// Uses a callback+ref pattern so setNearPainting is only called on ACTUAL CHANGE
interface ProximityProps {
    batiks: { id: string; position: [number, number, number] }[];
    onNearChange: (b: any) => void;
    paused: boolean;
}
const ProximityDetector = ({ batiks: bList, onNearChange, paused }: ProximityProps) => {
    const { camera } = useThree();
    const lastId = useRef<string | null>(null);
    const frameCount = useRef(0);

    useFrame(() => {
        if (paused) return;
        frameCount.current++;
        // Only check every 8 frames (~8fps check) to save CPU
        if (frameCount.current % 8 !== 0) return;

        let closest: any = null;
        let minDist = 8.5;

        for (const batik of bList) {
            const dx = camera.position.x - batik.position[0];
            const dz = camera.position.z - batik.position[2];
            const dist = Math.sqrt(dx * dx + dz * dz);
            if (dist < minDist) { closest = batik; minDist = dist; }
        }

        const newId = closest ? closest.id : null;
        if (newId !== lastId.current) {
            lastId.current = newId;
            onNearChange(closest); // only fires when painting changes → minimal re-renders
        }
    });
    return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const Museum3DPage = () => {
    const { language } = useLanguage();
    const [selectedBatik, setSelectedBatik] = useState<any>(null);
    const [started, setStarted] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [visited, setVisited] = useState<Set<string>>(new Set());
    const [nearPainting, setNearPainting] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [muted, setMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const mobileHandlers = useRef({
        onMove: (_x: number, _y: number) => { },
        onLook: (_dx: number, _dy: number) => { },
        onSprint: (_s: boolean) => { },
    });

    // Stable noop callbacks at top level — Rules of Hooks requires no hooks after conditional returns
    const noopPos = useCallback(() => { }, []);
    const noopSprint = useCallback((_s: boolean) => { }, []);

    // BGM: autoplay Ladrang Pangkur when museum starts
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (started) {
            audio.volume = 0;
            audio.play().catch(() => { }); // browser may block, user gesture already happened
            // Fade in over 2 seconds
            let vol = 0;
            const fade = setInterval(() => {
                vol = Math.min(vol + 0.02, muted ? 0 : 0.55);
                audio.volume = vol;
                if (vol >= 0.55) clearInterval(fade);
            }, 40);
            return () => clearInterval(fade);
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [started]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = muted ? 0 : 0.55;
    }, [muted]);

    // Detect mobile & hide navbar
    useEffect(() => {
        const check = () => setIsMobile(
            /Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024
        );
        check();
        window.addEventListener('resize', check);

        const nav = document.querySelector('nav') as HTMLElement;
        const header = document.querySelector('header') as HTMLElement;
        if (nav) nav.style.display = 'none';
        if (header) header.style.display = 'none';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('resize', check);
            if (nav) nav.style.display = '';
            if (header) header.style.display = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    // Batik layout (stable reference — never recalculated)
    const museumBatiks = useMemo(() =>
        batiks.slice(0, 20).map((batik, i) => ({
            ...batik,
            position: [(i % 10 - 4.5) * 11, 3.8, i < 10 ? -57.5 : 57.5] as [number, number, number],
            rotation: [0, i < 10 ? 0 : Math.PI, 0] as [number, number, number],
        })),
        []);

    const butterflyPositions = useMemo<[number, number, number][]>(() => [
        [-15, 4.5, -20], [10, 3.8, -30], [-5, 5.2, -15],
        [20, 4.2, -20], [0, 4.8, 0], [-25, 3.5, 10],
        [15, 5.0, 10], [-10, 4.0, -5],
    ], []);

    // Escape key → close dialog
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Escape' && selectedBatik) {
                setSelectedBatik(null);
            }
            if (e.code === 'KeyE' && !selectedBatik && nearPainting) {
                openDetail(nearPainting);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedBatik, nearPainting]);

    // Open detail: set state FIRST so player pauses, THEN release pointer lock
    const openDetail = useCallback((batik: any) => {
        setSelectedBatik(batik);                                 // paused=true → player stops
        setVisited(prev => new Set(prev).add(batik.id));
        if (document.pointerLockElement) document.exitPointerLock(); // safe now
    }, []);

    const handleSelect = useCallback((batik: any) => {
        if (visited.size === 0) {
            toast.success('Selamat Datang!', {
                description: 'Jelajahi setiap motif warisan nusantara.',
                duration: 4000,
                icon: <Sparkles className="text-gold" />,
            });
        }
        openDetail(batik);
    }, [visited, openDetail]);

    const handleClose = useCallback(() => setSelectedBatik(null), []);

    // Stable handler for proximity (stable ref → no child re-render)
    const nearRef = useRef<any>(null);
    const handleNearChange = useCallback((b: any) => {
        nearRef.current = b;
        setNearPainting(b);
    }, []);

    if (!loaded) return <LoadingScreen onComplete={() => setLoaded(true)} />;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            overflow: 'hidden', touchAction: 'none',
            background: '#c8b89a',
        }}>
            <Toaster position="top-right" richColors theme="dark" />

            {/* Background music — Ladrang Pangkur */}
            <audio
                ref={audioRef}
                src="/museum-bgm.mp3"
                loop
                preload="auto"
                style={{ display: 'none' }}
            />

            {/* Vignette overlay */}
            {started && (
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
                    background: 'radial-gradient(ellipse at center, transparent 52%, rgba(40,15,0,0.65) 100%)',
                }} />
            )}

            {/* Mobile controls */}
            <MobileControls
                visible={started && !selectedBatik && isMobile}
                onMove={(x, y) => mobileHandlers.current.onMove(x, y)}
                onLook={(dx, dy) => mobileHandlers.current.onLook(dx, dy)}
                onSprint={s => mobileHandlers.current.onSprint(s)}
            />

            {/* Exit button */}
            {started && (
                <button
                    onPointerDown={() => window.history.back()}
                    style={{
                        position: 'fixed', top: 12, right: 12, zIndex: 300,
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'rgba(200,40,40,0.88)',
                        border: '1.5px solid rgba(255,255,255,0.2)',
                        color: 'white', fontSize: 18, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                        touchAction: 'manipulation',
                    }}
                >✕</button>
            )}

            {/* Mute / Unmute BGM button */}
            {started && (
                <button
                    onClick={() => setMuted(m => !m)}
                    title={muted ? 'Aktifkan Musik' : 'Matikan Musik'}
                    style={{
                        position: 'fixed', top: 12, right: 60, zIndex: 300,
                        width: 40, height: 40, borderRadius: '50%',
                        background: muted ? 'rgba(80,80,80,0.88)' : 'rgba(184,134,11,0.88)',
                        border: '1.5px solid rgba(255,255,255,0.2)',
                        color: 'white', fontSize: 18, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                        touchAction: 'manipulation',
                        transition: 'background 0.2s',
                    }}
                >{muted ? '🔇' : '🎵'}</button>
            )}

            {/* HUD */}
            {started && (
                <>
                    {/* Progress bar */}
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, height: 3,
                        background: 'rgba(255,255,255,0.08)', zIndex: 200, pointerEvents: 'none',
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${(visited.size / 20) * 100}%`,
                            background: 'linear-gradient(90deg, #b8860b, #f5c518)',
                            transition: 'width 0.5s ease',
                            boxShadow: '0 0 8px #b8860b',
                        }} />
                    </div>

                    {/* Badge */}
                    {!selectedBatik && (
                        <div style={{
                            position: 'fixed', top: 16, right: 60, zIndex: 200,
                            background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(184,134,11,0.4)', borderRadius: 999,
                            padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8,
                            pointerEvents: 'none',
                        }}>
                            <div style={{
                                width: 7, height: 7, borderRadius: '50%',
                                background: visited.size > 0 ? '#f5c518' : '#555',
                                boxShadow: visited.size > 0 ? '0 0 6px #f5c518' : 'none',
                            }} />
                            <span style={{
                                color: '#f5c518', fontSize: 10, fontWeight: 900,
                                letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif',
                            }}>{visited.size}/20 BATIK</span>
                        </div>
                    )}

                    {/* Crosshair */}
                    {!selectedBatik && (
                        <div style={{
                            position: 'fixed', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 100, pointerEvents: 'none',
                            opacity: nearPainting ? 1 : 0.4, transition: 'opacity 0.3s',
                        }}>
                            <div style={{ position: 'relative', width: 20, height: 20 }}>
                                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: nearPainting ? '#f5c518' : 'white' }} />
                                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: nearPainting ? '#f5c518' : 'white' }} />
                                {nearPainting && (
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 28, height: 28, borderRadius: '50%',
                                        border: '1.5px solid #f5c518',
                                        animation: 'pulse 1s infinite',
                                    }} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* LIHAT DETAIL button — DOM level, no Three.js raycast needed */}
                    {!selectedBatik && nearPainting && (
                        <button
                            onPointerDown={() => handleSelect(nearPainting)}
                            style={{
                                position: 'fixed',
                                bottom: isMobile ? 160 : 48,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 200,
                                background: 'linear-gradient(135deg, #b8860b, #d4a017)',
                                color: '#000', fontWeight: 900, fontSize: 13,
                                letterSpacing: '0.15em', textTransform: 'uppercase',
                                fontFamily: 'sans-serif',
                                padding: '14px 32px', borderRadius: 999,
                                border: '2px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 8px 32px rgba(184,134,11,0.55)',
                                cursor: 'pointer', touchAction: 'manipulation',
                                display: 'flex', alignItems: 'center', gap: 10,
                            }}
                        >
                            <span>▶ LIHAT DETAIL</span>
                            {!isMobile && (
                                <span style={{
                                    background: 'rgba(0,0,0,0.22)', borderRadius: 6,
                                    padding: '2px 8px', fontSize: 11, fontWeight: 700,
                                }}>E</span>
                            )}
                        </button>
                    )}
                </>
            )}

            {/* START SCREEN — position:fixed zIndex:9999 so it's always on top */}
            {!started && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'linear-gradient(160deg, #0d0800 0%, #1a0e00 40%, #2a1600 70%, #0d0800 100%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    cursor: 'default',
                }}>
                    {/* Decorative rings — pointerEvents:none so they don't block button */}
                    {[600, 420, 260].map((s, i) => (
                        <div key={i} style={{
                            position: 'absolute', width: s, height: s, borderRadius: '50%',
                            border: `1px solid rgba(184,134,11,${0.06 + i * 0.05})`,
                            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                        }} />
                    ))}
                    {/* Corner brackets — pointerEvents:none */}
                    {[
                        { top: 24, left: 24, borderTop: '2px solid #b8860b', borderLeft: '2px solid #b8860b' },
                        { top: 24, right: 24, borderTop: '2px solid #b8860b', borderRight: '2px solid #b8860b' },
                        { bottom: 24, left: 24, borderBottom: '2px solid #b8860b', borderLeft: '2px solid #b8860b' },
                        { bottom: 24, right: 24, borderBottom: '2px solid #b8860b', borderRight: '2px solid #b8860b' },
                    ].map((s, i) => (
                        <div key={i} style={{ position: 'absolute', width: 40, height: 40, opacity: 0.6, pointerEvents: 'none', ...s }} />
                    ))}

                    <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'none' }}>
                        <div style={{ width: 32, height: 1, background: 'rgba(184,134,11,0.5)' }} />
                        <span style={{ color: '#b8860b', fontSize: 10, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>WARISAN NUSANTARA</span>
                        <div style={{ width: 32, height: 1, background: 'rgba(184,134,11,0.5)' }} />
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(48px,13vw,88px)', fontWeight: 900, fontStyle: 'italic',
                        fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', lineHeight: 1, margin: 0,
                        color: 'transparent', pointerEvents: 'none',
                        backgroundImage: 'linear-gradient(135deg, #d4a017 0%, #f5c518 40%, #b8860b 70%, #e8b840 100%)',
                        WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    }}>BatikLens</h1>

                    <p style={{
                        color: 'rgba(245,197,24,0.5)', fontSize: 11, fontWeight: 700,
                        letterSpacing: '0.5em', textTransform: 'uppercase', fontFamily: 'sans-serif',
                        marginBottom: 48, marginTop: 8, pointerEvents: 'none',
                    }}>Galeri Digital Interaktif</p>

                    <div style={{
                        display: 'flex', gap: 32, marginBottom: 52,
                        padding: '16px 32px', borderRadius: 12,
                        border: '1px solid rgba(184,134,11,0.2)',
                        background: 'rgba(184,134,11,0.05)',
                        pointerEvents: 'none',
                    }}>
                        {[['20', 'Koleksi Batik'], ['3D', 'Interaktif'], ['HD', 'Gambar Detail']].map(([v, l], i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ color: '#f5c518', fontSize: 22, fontWeight: 900, fontFamily: 'sans-serif' }}>{v}</div>
                                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: 2 }}>{l}</div>
                            </div>
                        ))}
                    </div>

                    {/* Button — onClick for Firefox, explicit z-index, position:relative to stay above decorations */}
                    <button
                        onClick={() => setStarted(true)}
                        style={{
                            position: 'relative', zIndex: 1,
                            background: 'linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #f5c518 100%)',
                            color: '#000', fontWeight: 900, fontSize: 14,
                            letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif',
                            padding: '18px 48px', borderRadius: 999, border: 'none',
                            cursor: 'pointer', touchAction: 'manipulation',
                            boxShadow: '0 0 40px rgba(184,134,11,0.45), 0 8px 32px rgba(0,0,0,0.6)',
                            userSelect: 'none', WebkitUserSelect: 'none',
                        }}
                    >{isMobile ? '▶  MULAI JELAJAH' : '▶  MASUK GALERI'}</button>

                    <p style={{
                        marginTop: 28, color: 'rgba(255,255,255,0.2)', fontSize: 9,
                        letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif',
                        pointerEvents: 'none',
                    }}>{isMobile ? 'Joystick Kiri • Geser Kanan' : 'WASD / Arrow • Mouse Aim • E = Detail'}</p>
                </div>
            )}

            {/* 3D CANVAS */}
            <KeyboardControls map={[
                { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
                { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
                { name: 'left', keys: ['KeyA'] },
                { name: 'right', keys: ['KeyD'] },
                { name: 'sprint', keys: ['ShiftLeft'] },
            ]}>
                <div style={{ width: '100vw', height: '100vh', touchAction: 'none', pointerEvents: started ? 'auto' : 'none' }}>
                    <Canvas
                        dpr={Math.min(window.devicePixelRatio, 2)}
                        shadows
                        camera={{ position: [0, 1.72, 0], fov: 62, near: 0.08, far: 180 }}
                        gl={{
                            antialias: true,
                            powerPreference: 'high-performance',
                            toneMapping: THREE.ACESFilmicToneMapping,
                            toneMappingExposure: 1.25,
                        }}
                        performance={{ min: 0.6 }}
                    >
                        <color attach="background" args={['#c8b89a']} />
                        <fog attach="fog" args={['#c8b89a', 80, 160]} />

                        <ambientLight intensity={0.75} color="#ffe4b0" />
                        <hemisphereLight intensity={0.55} color="#ffcc66" groundColor="#4a2800" />
                        <directionalLight
                            position={[20, 28, 8]} intensity={2.2} color="#ffcb7a"
                            castShadow
                            shadow-mapSize={[2048, 2048]}
                            shadow-camera-near={0.5} shadow-camera-far={200}
                            shadow-camera-left={-70} shadow-camera-right={70}
                            shadow-camera-top={70} shadow-camera-bottom={-70}
                            shadow-bias={-0.0005}
                        />
                        <pointLight position={[0, 7.5, -52]} intensity={1.6} color="#ffe090" distance={100} decay={2} castShadow={false} />
                        <pointLight position={[0, 7.5, 52]} intensity={1.6} color="#ffe090" distance={100} decay={2} castShadow={false} />
                        <pointLight position={[0, 6, 0]} intensity={1.0} color="#ffaa44" distance={120} decay={2} castShadow={false} />

                        <Suspense fallback={null}>
                            <Environment museumBatiks={museumBatiks} />
                            <HeritageCrest />

                            {/* ProximityDetector is module-level → stable identity → no remount */}
                            <ProximityDetector
                                batiks={museumBatiks}
                                onNearChange={handleNearChange}
                                paused={!!selectedBatik}
                            />

                            {museumBatiks.map(batik => (
                                <Painting
                                    key={batik.id}
                                    batik={batik}
                                    isVisited={visited.has(batik.id)}
                                    position={batik.position}
                                    rotation={batik.rotation}
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
                            onPositionChange={noopPos}
                            onSprintChange={noopSprint}
                            mobileHandlers={mobileHandlers}
                        />
                    </Canvas>
                </div>
            </KeyboardControls>

            {/* Detail Dialog — pure React, outside Canvas, no 3D conflict */}
            <DetailDialog
                selectedBatik={selectedBatik}
                onClose={handleClose}
                language={language}
            />
        </div>
    );
};
