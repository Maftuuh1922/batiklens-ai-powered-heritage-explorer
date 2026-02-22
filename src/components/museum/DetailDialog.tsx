import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Info, Globe, Palette, Share2, Maximize, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailDialogProps {
    selectedBatik: any;
    onClose: () => void;
    language: 'id' | 'en';
}

export const DetailDialog = ({ selectedBatik, onClose, language }: DetailDialogProps) => {
    const [activeTab, setActiveTab] = useState('filosofi');

    const tabs = [
        { id: 'filosofi', label: 'Filosofi & Narasi', icon: Info },
        { id: 'teknik', label: 'Teknik Pembuatan', icon: Palette },
        { id: 'asal', label: 'Asal Daerah', icon: MapPin },
        { id: 'motif', label: 'Motif Serupa', icon: Maximize },
    ];

    return (
        <Dialog open={!!selectedBatik} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl bg-black/95 backdrop-blur-3xl border-gold/20 text-white p-0 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] rounded-3xl border">
                {selectedBatik && (
                    <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden">
                        {/* Left Content Area */}
                        <div className="w-full lg:w-3/5 p-12 lg:p-16 flex flex-col justify-between bg-gradient-to-br from-black via-[#080808] to-[#111]">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-[9px] font-black uppercase tracking-[0.4em] text-gold">
                                        Artifact Archive • v3.0
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                                </div>

                                <DialogHeader className="mb-10">
                                    <DialogTitle className="text-7xl font-serif font-black text-white leading-[0.9] mb-4 tracking-tighter italic">
                                        {selectedBatik.name}
                                    </DialogTitle>
                                    <div className="flex items-center gap-6 text-gold/60 uppercase tracking-[0.3em] font-black text-[10px]">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={12} className="text-gold" />
                                            <span>{selectedBatik.origin}, Indonesia</span>
                                        </div>
                                        <div className="w-px h-4 bg-white/10" />
                                        <div className="flex items-center gap-2">
                                            <Globe size={12} />
                                            <span>Jawa Region</span>
                                        </div>
                                    </div>
                                </DialogHeader>

                                {/* Tabs Navigation */}
                                <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all whitespace-nowrap border ${activeTab === tab.id
                                                    ? 'bg-gold text-black border-gold font-black'
                                                    : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'
                                                }`}
                                        >
                                            <tab.icon size={14} />
                                            <span className="text-[10px] uppercase tracking-widest">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="min-h-[250px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {activeTab === 'filosofi' && (
                                                <div className="space-y-6">
                                                    <p className="text-xl text-white/90 leading-relaxed font-light italic border-l-4 border-gold/30 pl-8 py-2">
                                                        {selectedBatik.meaning[language]}
                                                    </p>
                                                    <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                                                        <h6 className="text-[10px] text-gold font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <Share2 size={12} /> Share & Preservation
                                                        </h6>
                                                        <div className="flex gap-4">
                                                            <Button variant="ghost" className="bg-white/5 text-[10px] font-bold text-white/70 hover:bg-white/10 rounded-lg">Copy Reference</Button>
                                                            <Button variant="ghost" className="bg-white/5 text-[10px] font-bold text-white/70 hover:bg-white/10 rounded-lg">Heritage Library</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'teknik' && (
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                                        <h6 className="text-[10px] text-gold font-black uppercase tracking-widest mb-3">Teknik Pewarnaan</h6>
                                                        <p className="text-sm text-white/60">Menggunakan bahan alami dari tumbuhan lokal, melalui proses pencelupan berulang hingga mencapai kematangan warna yang sempurna.</p>
                                                    </div>
                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                                        <h6 className="text-[10px] text-gold font-black uppercase tracking-widest mb-3">Palet Warna Dominan</h6>
                                                        <div className="flex gap-3">
                                                            {['#3d2b1f', '#d4a017', '#fdf5e6', '#1a1a1a', '#5c3d1e'].map(c => (
                                                                <div key={c} className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'asal' && (
                                                <div className="relative aspect-video bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group shadow-2xl">
                                                    <div className="absolute inset-0 opacity-30 grayscale bg-[url('https://images.unsplash.com/photo-1596496334963-718216fc4167?q=80&w=1000')] bg-cover bg-center" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="relative">
                                                            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                                                                <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_30px_#b8860b]" />
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                    <div className="absolute bottom-6 left-6 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
                                                        <p className="text-[10px] text-white font-bold tracking-widest">{selectedBatik.origin.toUpperCase()} ARCHIVE COORDINATES</p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="mt-12 flex gap-4">
                                <Button className="flex-1 bg-gold hover:bg-white text-black font-black uppercase tracking-[0.3em] py-10 text-lg rounded-2xl transition-all shadow-3xl transform active:scale-[0.98]" onClick={onClose}>
                                    KEMBALI KE EKSPLORASI
                                </Button>
                            </div>
                        </div>

                        {/* Right Immersive Image Area */}
                        <div className="w-full lg:w-2/5 relative min-h-[500px] lg:min-h-0 bg-[#050505] p-2">
                            <img src={selectedBatik.imageUrl} alt={selectedBatik.name} className="w-full h-full object-cover rounded-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-10 right-10 flex flex-col gap-4">
                                {['Heritage Artifact', 'Verified Origin', 'Cinematic Scan'].map(tag => (
                                    <div key={tag} className="px-5 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-[9px] text-white font-black uppercase tracking-widest shadow-2xl">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
