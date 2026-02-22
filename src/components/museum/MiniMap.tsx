import React from 'react';
import { motion } from 'framer-motion';

interface MiniMapProps {
    playerPosition: { x: number; z: number };
    paintings: any[];
}

export const MiniMap = ({ playerPosition, paintings }: MiniMapProps) => {
    // Map size: 160x160. World: -55 to 55.
    const scale = 160 / 110;
    const toMapX = (val: number) => 80 + (val * scale);
    const toMapY = (val: number) => 80 + (val * scale);

    return (
        <div className="absolute bottom-10 right-10 z-20 pointer-events-none">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl p-1 rounded-2xl border border-white/10 shadow-3xl overflow-hidden">
                <div className="relative w-40 h-40 bg-black/40 rounded-xl">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-5">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="border border-white" />
                        ))}
                    </div>

                    {/* Corridor Markers (Visual aid) */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full bg-white/5" />

                    {/* Paintings */}
                    {paintings.map((p, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-gold rounded-full shadow-[0_0_5px_#b8860b]"
                            style={{
                                left: `${toMapX(p.position[0])}px`,
                                top: `${toMapY(p.position[2])}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    ))}

                    {/* Player Marker */}
                    <motion.div
                        animate={{
                            left: toMapX(playerPosition.x),
                            top: toMapY(playerPosition.z)
                        }}
                        className="absolute w-3 h-3 z-10"
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="w-full h-full bg-white rounded-full relative">
                            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
                        </div>
                    </motion.div>
                </div>
                <div className="mt-2 text-[8px] text-white/30 uppercase font-black text-center tracking-[0.3em]">
                    Real-time Navigation
                </div>
            </div>
        </div>
    );
};
