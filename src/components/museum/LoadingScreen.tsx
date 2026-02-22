import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const quotes = [
    "Batik adalah doa yang diuntai dalam malam.",
    "Setiap titik adalah hembusan nafas tradisi.",
    "Warisan Nusantara, kebanggaan dunia.",
    "Menjaga jejak leluhur dalam harmoni modern.",
];

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        const quoteInterval = setInterval(() => {
            setQuoteIndex(prev => (prev + 1) % quotes.length);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearInterval(quoteInterval);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-10 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute inset-0 opacity-10 blur-3xl bg-[radial-gradient(circle_at_center,_#b8860b_0%,_transparent_70%)]" />

            <div className="relative z-10 w-full max-w-xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                >
                    <h2 className="text-white text-6xl font-serif font-black italic tracking-tighter mb-4">BATIK LENS</h2>
                    <div className="h-1 w-24 bg-gold mx-auto rounded-full" />
                </motion.div>

                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8 relative">
                    <motion.div
                        className="absolute h-full bg-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between items-center text-[10px] text-gold font-black uppercase tracking-[0.4em] mb-12">
                    <span>Inisialisasi Museum</span>
                    <span>{progress}%</span>
                </div>

                <motion.div
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-12"
                >
                    <p className="text-white/40 text-sm font-light italic leading-relaxed">
                        "{quotes[quoteIndex]}"
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-12 text-white/10 text-[8px] uppercase tracking-[1em] font-black">
                A Google Deepmind Collaboration Concept
            </div>
        </div>
    );
};
