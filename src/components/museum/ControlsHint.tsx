import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ControlsHint = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 12000);
        return () => clearTimeout(timer);
    }, []);

    const keys = [
        { label: 'W', desc: 'Maju' },
        { label: 'A', desc: 'Kiri' },
        { label: 'S', desc: 'Mundur' },
        { label: 'D', desc: 'Kanan' },
        { label: 'Arrows', desc: 'Rotate' },
        { label: 'SHIFT', desc: 'Sprint' },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute left-10 top-1/2 -translate-y-1/2 z-20"
                >
                    <div className="bg-[#111111]/90 backdrop-blur-3xl p-8 rounded-3xl border border-white/10 shadow-3xl text-white">
                        <h4 className="text-[10px] text-gold font-black uppercase tracking-[0.4em] mb-8 text-center border-b border-white/5 pb-4">
                            Navigasi Manual
                        </h4>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            {keys.map(k => (
                                <div key={k.label} className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-xs text-white group-hover:bg-gold group-hover:text-black transition-all shadow-inner">
                                        {k.label}
                                    </div>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-white transition-colors">
                                        {k.desc}
                                    </span>
                                </div>
                            ))}
                            <div className="col-span-2 mt-4 pt-4 border-t border-white/5 flex items-center gap-5 group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xs group-hover:bg-gold group-hover:text-black transition-all">
                                    🖱️
                                </div>
                                <span className="text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-white transition-colors">
                                    Drag: Pandangan
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setVisible(false)}
                            className="w-full mt-10 py-3 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
                        >
                            Sembunyikan Manual
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
