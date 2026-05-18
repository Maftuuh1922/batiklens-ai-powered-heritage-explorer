import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronLeft, RotateCcw, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useEngagement } from '@/lib/engagement';
import { batiks } from '@/lib/batik-data';
import { useLanguage } from '@/lib/LanguageContext';

const GRAVITY = 0.4;
const JUMP_STRENGTH = -7.5;
const BASE_PIPE_SPEED = 3.5;
const PIPE_WIDTH = 64;
const PIPE_GAP = 160;
const BIRD_SIZE = 42;

export const MiniGamePage = () => {
    const { language } = useLanguage();
    const { awardXp, level } = useEngagement();
    
    // Game state
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [currentBatikIndex, setCurrentBatikIndex] = useState(0);
    const [birdY, setBirdY] = useState(300);
    
    // Using refs for mutable game values to avoid constant re-renders during loop
    const birdYRef = useRef(300);
    const velocityRef = useRef(0);
    const pipesRef = useRef<Array<{ x: number, topHeight: number, passed: boolean, batik: any }>>([]);
    const frameRef = useRef<number>();
    const gameAreaRef = useRef<HTMLDivElement>(null);

    // BGM
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/museum-bgm.mp3'); // Reuse existing bgm
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const spawnPipe = (areaWidth: number, areaHeight: number) => {
        const minHeight = 60;
        const maxHeight = areaHeight - PIPE_GAP - minHeight;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        const randomBatik = batiks[Math.floor(Math.random() * batiks.length)];
        return { x: areaWidth, topHeight, passed: false, batik: randomBatik };
    };

    const startGame = () => {
        setGameState('PLAYING');
        setScore(0);
        setCurrentBatikIndex(0);
        birdYRef.current = 300;
        velocityRef.current = 0;
        if (gameAreaRef.current) {
            pipesRef.current = [spawnPipe(gameAreaRef.current.clientWidth, gameAreaRef.current.clientHeight)];
        }
        
        if (audioRef.current) {
            audioRef.current.play().catch(() => {});
        }
    };

    const jump = useCallback((e?: React.SyntheticEvent | Event) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (gameState === 'PLAYING') {
            velocityRef.current = JUMP_STRENGTH;
        } else if (gameState === 'START' || gameState === 'GAME_OVER') {
            startGame();
        }
    }, [gameState]);

    // Handle spacebar / click
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [jump]);

    const gameOver = () => {
        setGameState('GAME_OVER');
        if (score > highScore) setHighScore(score);
        
        // Award XP! (10 XP per score)
        if (score > 0) {
            const xpToAward = score * 10;
            awardXp('minigame', xpToAward);
            toast.success('Permainan Selesai!', {
                description: `Skor: ${score} | Kamu mendapatkan +${xpToAward} XP!`,
                icon: <Trophy className="text-gold" />,
            });
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    // Game Loop
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        const updateGame = () => {
            if (!gameAreaRef.current) return;
            const areaHeight = gameAreaRef.current.clientHeight;
            const areaWidth = gameAreaRef.current.clientWidth;

            // Physics
            velocityRef.current += GRAVITY;
            birdYRef.current += velocityRef.current;

            // Collision with floor/ceiling
            if (birdYRef.current < 0 || birdYRef.current + BIRD_SIZE > areaHeight) {
                gameOver();
                return;
            }

            // Calculate progressive pipe speed (increases every 5 score)
            const currentPipeSpeed = BASE_PIPE_SPEED + Math.floor(score / 5) * 0.5;

            // Pipes logic
            let currentPipes = [...pipesRef.current];
            let newScore = score;

            for (let i = 0; i < currentPipes.length; i++) {
                const pipe = currentPipes[i];
                pipe.x -= currentPipeSpeed;

                // Collision detection
                const birdLeft = 50; // fixed horizontal position of bird
                const birdRight = birdLeft + BIRD_SIZE;
                const birdTop = birdYRef.current;
                const birdBottom = birdYRef.current + BIRD_SIZE;

                const pipeLeft = pipe.x;
                const pipeRight = pipe.x + PIPE_WIDTH;
                const topPipeBottom = pipe.topHeight;
                const bottomPipeTop = pipe.topHeight + PIPE_GAP;

                // Check if bird is within pipe horizontal bounds
                if (birdRight > pipeLeft && birdLeft < pipeRight) {
                    // Check if bird hits top or bottom pipe
                    if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
                        gameOver();
                        return;
                    }
                }

                // Check if passed pipe
                if (pipe.x + PIPE_WIDTH < birdLeft && !pipe.passed) {
                    pipe.passed = true;
                    newScore += 1;
                    
                    // Change Batik every 5 points
                    if (newScore % 5 === 0) {
                        setCurrentBatikIndex(prev => {
                            const next = (prev + 1) % batiks.length;
                            toast(language === 'id' ? 'Batik Baru!' : 'New Batik!', {
                                description: `Motif: ${batiks[next].name}`,
                            });
                            return next;
                        });
                    }
                }
            }

            // Remove off-screen pipes
            if (currentPipes.length > 0 && currentPipes[0].x < -PIPE_WIDTH) {
                currentPipes.shift();
            }

            // Add new pipe
            if (currentPipes.length === 0 || areaWidth - currentPipes[currentPipes.length - 1].x > 300) {
                currentPipes.push(spawnPipe(areaWidth, areaHeight));
            }

            pipesRef.current = currentPipes;
            setScore(newScore);
            setBirdY(birdYRef.current);

            frameRef.current = requestAnimationFrame(updateGame);
        };

        frameRef.current = requestAnimationFrame(updateGame);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [gameState, score, language]);

    const currentBatik = batiks[currentBatikIndex];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
            <Toaster position="top-center" richColors theme="dark" />
            
            {/* Ambient Background based on level */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 z-0" />

            <div className="relative z-10 flex flex-col h-screen">
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                    <Link to="/profile">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold font-serif font-bold text-sm hover:bg-gold/10 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                            {language === 'id' ? 'Kembali' : 'Back'}
                        </button>
                    </Link>
                    <div className="text-center">
                        <h1 className="font-serif font-bold text-xl text-gold">Batik Flap</h1>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">
                            {language === 'id' ? 'Kumpulkan Skor & XP' : 'Collect Score & XP'}
                        </p>
                    </div>
                    <div className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-black text-sm tabular-nums">
                        {language === 'id' ? 'Skor Terbaik: ' : 'Best: '} {highScore}
                    </div>
                </div>

                {/* Game Area Container - Responsive Proportion */}
                <div className="flex-1 px-4 md:px-8 pb-4 md:pb-8 w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
                    
                    {/* The Canvas */}
                    <div 
                        ref={gameAreaRef}
                        className="w-full h-full min-h-[60vh] bg-sky-200/80 dark:bg-sky-900/60 border-[6px] border-gold/40 rounded-3xl relative overflow-hidden cursor-pointer shadow-2xl shadow-gold/20 select-none touch-none"
                        onPointerDown={jump}
                    >
                        {/* Parallax Background using Batik Motif */}
                        <div 
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage: `url(${currentBatik.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(100%) blur(2px)',
                            }}
                        />

                        {/* Bird - Classic Flappy Proportions */}
                        {gameState !== 'START' && (
                            <motion.div 
                                className="absolute left-[50px] z-30"
                                style={{ 
                                    top: birdY, 
                                    width: 48, 
                                    height: 36,
                                    rotate: Math.min(Math.max(velocityRef.current * 4, -45), 90) // Tilt based on velocity
                                }}
                            >
                                {/* Lower Beak */}
                                <div className="absolute right-[-12px] top-[20px] w-[20px] h-[10px] bg-[#e84118] rounded-b-full border-[3px] border-[#2f3640] z-10" />

                                {/* Upper Beak */}
                                <div className="absolute right-[-16px] top-[10px] w-[26px] h-[14px] bg-[#e84118] rounded-r-full rounded-l-sm border-[3px] border-[#2f3640] z-30 shadow-[inset_0_4px_0_rgba(255,255,255,0.3)]" />

                                {/* Body (Batik Pattern) */}
                                <div 
                                    className="absolute inset-0 rounded-[45%] border-[3px] border-[#2f3640] z-20 overflow-hidden shadow-[inset_0_4px_0_rgba(255,255,255,0.4)]"
                                >
                                    <div 
                                        className="w-full h-full"
                                        style={{
                                            backgroundImage: `url(${currentBatik.imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                </div>
                                
                                {/* Eye */}
                                <div className="absolute top-[2px] right-[2px] w-[20px] h-[22px] bg-white rounded-full border-[3px] border-[#2f3640] z-40 flex items-center justify-end pr-1">
                                    <div className="w-[4px] h-[8px] bg-[#2f3640] rounded-sm" />
                                </div>

                                {/* Wing */}
                                <div className="absolute bottom-[4px] left-[-6px] w-[22px] h-[14px] bg-white rounded-full border-[3px] border-[#2f3640] z-40 shadow-[inset_0_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center">
                                    <div className="w-[10px] h-[4px] bg-gray-200 rounded-full" />
                                </div>
                            </motion.div>
                        )}

                        {/* Pipes */}
                        {gameState !== 'START' && pipesRef.current.map((pipe, idx) => (
                            <React.Fragment key={idx}>
                                {/* Top Pipe */}
                                <div 
                                    className="absolute top-0 border-x-4 border-b-4 border-amber-950 rounded-b-lg overflow-hidden flex justify-center items-end pb-2"
                                    style={{ 
                                        left: pipe.x, 
                                        width: PIPE_WIDTH, 
                                        height: pipe.topHeight,
                                        backgroundImage: `url(${pipe.batik.imageUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/40" />
                                    <div className="relative z-10 text-[9px] font-black text-white whitespace-nowrap uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,1)]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                        {pipe.batik.name}
                                    </div>
                                    <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                {/* Bottom Pipe */}
                                <div 
                                    className="absolute bottom-0 border-x-4 border-t-4 border-amber-950 rounded-t-lg overflow-hidden flex justify-center items-start pt-2"
                                    style={{ 
                                        left: pipe.x, 
                                        width: PIPE_WIDTH, 
                                        height: gameAreaRef.current!.clientHeight - pipe.topHeight - PIPE_GAP,
                                        backgroundImage: `url(${pipe.batik.imageUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/40" />
                                    <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-black/60 to-transparent" />
                                    <div className="relative z-10 text-[9px] font-black text-white whitespace-nowrap uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,1)]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                        {pipe.batik.name}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}

                        {/* Overlays */}
                        {gameState === 'START' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                                <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-2 tracking-wide text-center">
                                    BATIK FLAP
                                </h2>
                                <p className="text-gold/80 uppercase tracking-widest text-xs font-black mb-8 text-center max-w-xs">
                                    {language === 'id' 
                                        ? 'Ketuk layar atau spasi untuk terbang. Ganti motif setiap 5 skor!' 
                                        : 'Tap or Space to fly. Motif changes every 5 score!'}
                                </p>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                                    className="flex items-center gap-2 px-8 py-4 bg-gold text-black rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-transform"
                                >
                                    <Play className="fill-black w-5 h-5" />
                                    {language === 'id' ? 'MAIN SEKARANG' : 'PLAY NOW'}
                                </button>
                            </div>
                        )}

                        {gameState === 'GAME_OVER' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20">
                                <h2 className="text-5xl font-serif font-black text-red-500 mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                    {language === 'id' ? 'JATUH!' : 'CRASHED!'}
                                </h2>
                                <div className="bg-background/80 border border-gold/20 p-6 rounded-3xl flex flex-col items-center mb-8 min-w-[250px]">
                                    <p className="text-muted-foreground uppercase text-xs font-black tracking-widest mb-1">Skor Akhir</p>
                                    <p className="text-6xl font-black font-serif text-white tabular-nums mb-4">{score}</p>
                                    
                                    <div className="w-full h-[1px] bg-gold/20 mb-4" />
                                    
                                    <p className="text-emerald-500 font-bold flex items-center gap-2">
                                        <Trophy className="w-4 h-4" />
                                        +{score * 10} XP
                                    </p>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                                    className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-transform"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    {language === 'id' ? 'MAIN LAGI' : 'PLAY AGAIN'}
                                </button>
                            </div>
                        )}

                        {/* Real-time HUD */}
                        {gameState === 'PLAYING' && (
                            <div className="absolute top-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
                                <span className="text-6xl font-serif font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] stroke-black tabular-nums">
                                    {score}
                                </span>
                            </div>
                        )}
                        
                        {/* Motif Indicator */}
                        {gameState === 'PLAYING' && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
                                <span className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                    {currentBatik.name}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-muted-foreground font-medium">
                            {language === 'id' ? 'Cara bermain: Ketuk layar HP Anda atau tekan SPASI untuk melompat.' : 'How to play: Tap the screen or press SPACE to jump.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
