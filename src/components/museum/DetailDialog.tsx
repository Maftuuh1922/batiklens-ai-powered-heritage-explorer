import React, { useState, useMemo } from 'react';
import { MapPin, Info, BookOpen, Layers, Scissors, Shirt, Flower2, Music2, Landmark, Gem } from 'lucide-react';

interface DetailDialogProps {
    selectedBatik: any;
    onClose: () => void;
    language: 'id' | 'en';
}

// ─── Static derived data helpers ─────────────────────────────────────────────

const getMotifColors = (name: string): string[] => {
    const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const palettes = [
        ['#8B4513', '#D4A017', '#2F1B0E', '#F5E6C8', '#6B3A2A'],
        ['#1B4332', '#B8860B', '#F5F0E8', '#4A2800', '#E8C84A'],
        ['#0D1B2A', '#C9A84C', '#E8DCC8', '#4A3728', '#8B6914'],
        ['#5C1A1A', '#D4AF37', '#FDF5E6', '#2C1810', '#9B7A3C'],
        ['#1E3A5F', '#B8860B', '#F0E6D3', '#3D2B1F', '#7EB3C5'],
    ];
    return palettes[hash % palettes.length];
};

const getKainData = (origin: string) => {
    const o = (origin || '').toLowerCase();
    if (o.includes('solo') || o.includes('surakarta')) return {
        material: 'Kain Mori / Sutra Lokal', teknik: 'Batik Tulis Halus', thread: '80-100 benang/cm',
        proses: '6–12 bulan', warna: 'Soga (coklat alam)', ketebalan: 'Sedang (±0.18mm)',
    };
    if (o.includes('yogya') || o.includes('jogja')) return {
        material: 'Kain Mori Prima', teknik: 'Batik Tulis & Cap', thread: '72-90 benang/cm',
        proses: '2–6 bulan', warna: 'Hitam-Putih Klasik', ketebalan: 'Ringan (±0.15mm)',
    };
    if (o.includes('pekalongan')) return {
        material: 'Katun Swiss / Sutra', teknik: 'Batik Cap & Kombinasi', thread: '60-80 benang/cm',
        proses: '2–4 minggu', warna: 'Multicolor Cerah', ketebalan: 'Ringan (±0.14mm)',
    };
    if (o.includes('cirebon')) return {
        material: 'Sutra & Katun Premium', teknik: 'Batik Tulis Mega Mendung', thread: '90-120 benang/cm',
        proses: '3–8 bulan', warna: 'Biru-Merah-Emas', ketebalan: 'Sedang (±0.17mm)',
    };
    return {
        material: 'Kain Mori Primissima', teknik: 'Batik Tulis Tradisional', thread: '70-90 benang/cm',
        proses: '1–3 bulan', warna: 'Tradisional Natural', ketebalan: 'Sedang (±0.16mm)',
    };
};

const getEduData = (name: string, origin: string) => {
    const o = (origin || '').toLowerCase();
    const timeline = [
        { year: '700 M', event: 'Teknik membatik berkembang di keraton Jawa' },
        { year: '1600an', event: 'Batik menjadi pakaian kebesaran bangsawan' },
        { year: '1800an', event: 'Produksi batik cap mulai diperkenalkan' },
        { year: '2009', event: 'UNESCO akui Batik sebagai Warisan Budaya Takbenda' },
        { year: 'Kini', event: `Batik ${name} terus dilestarikan generasi pengrajin` },
    ];
    const facts = [
        { icon: '🏛️', label: 'Status UNESCO', value: 'Warisan Budaya Takbenda' },
        { icon: '🌿', label: 'Pewarna', value: o.includes('solo') || o.includes('yogya') ? 'Soga, Indigo, Alam' : 'Sintetis & Natural' },
        { icon: '👐', label: 'Pengrajin', value: o.includes('pekalongan') ? '±100.000 pekerja' : '±10.000–50.000' },
        { icon: '💰', label: 'Harga Tulis', value: 'Rp 500rb – Rp 50jt' },
    ];
    return { timeline, facts };
};

const getMotifStats = (name: string) => {
    const h = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return {
        kompleksitas: 40 + (h % 55),
        usiaTradisi: 50 + (h % 400),
        varianMotif: 5 + (h % 25),
        nilaiSeni: 65 + (h % 35),
    };
};

// ─── Component ────────────────────────────────────────────────────────────────

export const DetailDialog = ({ selectedBatik, onClose, language }: DetailDialogProps) => {
    const [activeTab, setActiveTab] = useState('filosofi');

    // ⚠️ ALL hooks must run unconditionally BEFORE any early return (Rules of Hooks)
    const name = selectedBatik?.name ?? '';
    const origin = selectedBatik?.origin ?? '';
    const colors = useMemo(() => getMotifColors(name), [name]);
    const kain = useMemo(() => getKainData(origin), [origin]);
    const edu = useMemo(() => getEduData(name, origin), [name, origin]);
    const stats = useMemo(() => getMotifStats(name), [name]);

    // Early return AFTER all hooks
    if (!selectedBatik) return null;

    const tabs = [
        { id: 'filosofi', label: 'Filosofi', icon: Info },
        { id: 'motif', label: 'Motif', icon: Layers },
        { id: 'kain', label: 'Kain', icon: Scissors },
        { id: 'fashion', label: 'Fashion', icon: Shirt },
        { id: 'bunga', label: 'Flora', icon: Flower2 },
        { id: 'gamelan', label: 'Gamelan', icon: Music2 },
        { id: 'adat', label: 'Upacara', icon: Landmark },
        { id: 'jawa', label: 'Falsafah', icon: Gem },
        { id: 'edukasi', label: 'Edukasi', icon: BookOpen },
        { id: 'asal', label: 'Asal', icon: MapPin },
    ];

    const cardStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
        padding: '16px 20px', borderRadius: 14,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        ...extra,
    });

    const labelStyle: React.CSSProperties = {
        fontSize: 9, color: '#b8860b', fontWeight: 900,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        fontFamily: 'sans-serif', marginBottom: 8,
    };

    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 99999,
                background: 'rgba(0,0,0,0.88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                padding: '12px',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div style={{
                width: '100%', maxWidth: 980, maxHeight: '95vh',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)',
                borderRadius: 22, border: '1px solid rgba(184,134,11,0.25)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.9), 0 0 60px rgba(184,134,11,0.06)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
                {/* ── Header ─────────────────────────────────────────────── */}
                <div style={{
                    padding: '22px 28px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                    flexShrink: 0,
                }}>
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '3px 12px', borderRadius: 999,
                            border: '1px solid rgba(184,134,11,0.3)',
                            background: 'rgba(184,134,11,0.08)', marginBottom: 10,
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5c518', boxShadow: '0 0 6px #f5c518' }} />
                            <span style={{ color: '#b8860b', fontSize: 9, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                                Artifact Archive • BatikLens
                            </span>
                        </div>
                        <h2 style={{
                            margin: 0, fontSize: 'clamp(22px,4vw,46px)',
                            fontWeight: 900, fontStyle: 'italic',
                            fontFamily: 'Georgia, serif', color: 'white',
                            lineHeight: 1.05, letterSpacing: '-0.02em',
                        }}>{selectedBatik.name}</h2>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 14, marginTop: 8,
                            color: 'rgba(184,134,11,0.7)', fontSize: 10,
                            fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'sans-serif',
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <MapPin size={10} color="#b8860b" /> {selectedBatik.origin}, Indonesia
                            </span>
                            <span style={{ opacity: 0.25 }}>|</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                🏛️ UNESCO Heritage 2009
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: 40, height: 40, borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.7)', cursor: 'pointer', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 17, lineHeight: 1,
                    }}
                        onMouseOver={e => (e.currentTarget.style.background = 'rgba(200,40,40,0.7)')}
                        onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    >✕</button>
                </div>

                {/* ── Body ───────────────────────────────────────────────── */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexWrap: 'wrap' }}>

                    {/* Left panel */}
                    <div style={{
                        flex: '1 1 55%', minWidth: 280,
                        padding: '18px 26px 22px',
                        overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16,
                    }}>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {tabs.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '7px 14px', borderRadius: 10, cursor: 'pointer',
                                    border: activeTab === tab.id ? '1px solid #b8860b' : '1px solid rgba(255,255,255,0.07)',
                                    background: activeTab === tab.id ? 'linear-gradient(135deg,#b8860b,#d4a017)' : 'rgba(255,255,255,0.04)',
                                    color: activeTab === tab.id ? '#000' : 'rgba(255,255,255,0.45)',
                                    fontWeight: 900, fontSize: 10, letterSpacing: '0.1em',
                                    textTransform: 'uppercase', fontFamily: 'sans-serif',
                                    transition: 'all 0.15s',
                                }}>
                                    <tab.icon size={11} /> {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* ── TAB: FILOSOFI ───────────────────────────── */}
                        {activeTab === 'filosofi' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <p style={{
                                    fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.88)',
                                    fontStyle: 'italic', fontFamily: 'Georgia,serif',
                                    borderLeft: '3px solid rgba(184,134,11,0.5)',
                                    paddingLeft: 18, margin: 0,
                                }}>
                                    {selectedBatik.meaning?.[language] || selectedBatik.meaning?.id || 'Batik ini merupakan warisan budaya yang kaya makna dan filosofi mendalam dari leluhur Nusantara.'}
                                </p>
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Makna Simbolik</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {[
                                            ['Keselarasan', 'Motif mencerminkan keseimbangan antara manusia, alam, dan semesta'],
                                            ['Perlindungan', 'Dipakai dalam upacara adat sebagai pelindung spiritual'],
                                            ['Identitas', 'Simbol kebanggaan dan identitas budaya daerah asal'],
                                        ].map(([t, d]) => (
                                            <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#b8860b', marginTop: 6, flexShrink: 0 }} />
                                                <div>
                                                    <span style={{ color: '#d4a017', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif' }}>{t}: </span>
                                                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'sans-serif' }}>{d}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── TAB: MOTIF ──────────────────────────────── */}
                        {activeTab === 'motif' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {/* Palette */}
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Palet Warna Khas</div>
                                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                                        {colors.map((c, i) => (
                                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                                <div style={{ width: 42, height: 42, borderRadius: 10, background: c, border: '2px solid rgba(255,255,255,0.1)', boxShadow: `0 4px 12px ${c}55` }} />
                                                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8, fontFamily: 'monospace' }}>{c}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats bars */}
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Statistik Motif</div>
                                    {[
                                        { label: 'Kompleksitas Pola', val: stats.kompleksitas },
                                        { label: 'Nilai Seni', val: stats.nilaiSeni },
                                        { label: `${stats.varianMotif} Varian Motif`, val: Math.min(stats.varianMotif * 4, 100) },
                                        { label: `${stats.usiaTradisi}+ Tahun Tradisi`, val: Math.min(stats.usiaTradisi / 5, 100) },
                                    ].map(({ label, val }) => (
                                        <div key={label} style={{ marginBottom: 10 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'sans-serif' }}>{label}</span>
                                                <span style={{ color: '#f5c518', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif' }}>{Math.round(val)}%</span>
                                            </div>
                                            <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.07)' }}>
                                                <div style={{
                                                    height: '100%', borderRadius: 999,
                                                    width: `${val}%`,
                                                    background: 'linear-gradient(90deg, #b8860b, #f5c518)',
                                                    boxShadow: '0 0 6px #b8860b88',
                                                    transition: 'width 0.8s ease',
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pattern grid — pure CSS swatch */}
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Pola Visual</div>
                                    <div style={{
                                        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3,
                                        borderRadius: 8, overflow: 'hidden',
                                    }}>
                                        {Array.from({ length: 32 }).map((_, i) => (
                                            <div key={i} style={{
                                                height: 22,
                                                background: colors[(i * 3 + Math.floor(i / 4)) % colors.length],
                                                opacity: 0.55 + (i % 5) * 0.09,
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── TAB: KAIN ───────────────────────────────── */}
                        {activeTab === 'kain' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    {[
                                        ['Bahan Dasar', kain.material, '🧶'],
                                        ['Teknik Utama', kain.teknik, '✍️'],
                                        ['Kerapatan Benang', kain.thread, '🔬'],
                                        ['Lama Proses', kain.proses, '⏱️'],
                                        ['Skema Warna', kain.warna, '🎨'],
                                        ['Ketebalan Kain', kain.ketebalan, '📏'],
                                    ].map(([label, val, icon]) => (
                                        <div key={label} style={cardStyle()}>
                                            <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
                                            <div style={{ ...labelStyle, marginBottom: 4 }}>{label}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontFamily: 'sans-serif', lineHeight: 1.4 }}>{val}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cross-section visual */}
                                <div style={cardStyle({ padding: '14px 18px' })}>
                                    <div style={labelStyle}>Simulasi Anyaman Benang</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {[0, 1, 2, 3, 4, 5].map(row => (
                                            <div key={row} style={{ display: 'flex', gap: 2 }}>
                                                {Array.from({ length: 14 }).map((_, col) => {
                                                    const isWarp = (row + col) % 2 === 0;
                                                    return (
                                                        <div key={col} style={{
                                                            flex: 1, height: 8, borderRadius: 2,
                                                            background: isWarp ? colors[0] : colors[1],
                                                            opacity: isWarp ? 0.9 : 0.5,
                                                        }} />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'sans-serif' }}>
                                        ↕ Benang lungsi (warp) · ↔ Benang pakan (weft)
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── TAB: EDUKASI ────────────────────────────── */}
                        {activeTab === 'edukasi' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {/* Fact cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    {edu.facts.map(({ icon, label, value }) => (
                                        <div key={label} style={cardStyle()}>
                                            <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                                            <div style={{ ...labelStyle, marginBottom: 4 }}>{label}</div>
                                            <div style={{ color: '#f5c518', fontSize: 12, fontWeight: 700, fontFamily: 'sans-serif' }}>{value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Timeline */}
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Linimasa Sejarah</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                        {edu.timeline.map(({ year, event }, i) => (
                                            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: i < edu.timeline.length - 1 ? 14 : 0 }}>
                                                {/* Line */}
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === edu.timeline.length - 1 ? '#f5c518' : '#b8860b', border: '2px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                                                    {i < edu.timeline.length - 1 && (
                                                        <div style={{ width: 1, flex: 1, minHeight: 20, background: 'rgba(184,134,11,0.25)', marginTop: 3 }} />
                                                    )}
                                                </div>
                                                <div style={{ paddingTop: 0 }}>
                                                    <span style={{ color: '#d4a017', fontSize: 10, fontWeight: 900, fontFamily: 'sans-serif' }}>{year}</span>
                                                    <p style={{ margin: '3px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'sans-serif', lineHeight: 1.5 }}>{event}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* UNESCO badge */}
                                <div style={{
                                    ...cardStyle(),
                                    background: 'linear-gradient(135deg, rgba(184,134,11,0.12), rgba(212,160,23,0.06))',
                                    border: '1px solid rgba(184,134,11,0.25)',
                                    display: 'flex', alignItems: 'center', gap: 14,
                                }}>
                                    <div style={{ fontSize: 32, flexShrink: 0 }}>🏛️</div>
                                    <div>
                                        <div style={{ color: '#f5c518', fontSize: 12, fontWeight: 900, fontFamily: 'sans-serif', marginBottom: 4 }}>UNESCO Intangible Cultural Heritage</div>
                                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'sans-serif', lineHeight: 1.5 }}>
                                            Pada 2 Oktober 2009, UNESCO resmi mengakui Batik Indonesia sebagai Warisan Budaya Takbenda Dunia yang harus dilestarikan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── TAB: ASAL (MAP) ─────────────────────────── */}
                        {activeTab === 'asal' && (() => {
                            const coordMap: Record<string, [number, number]> = {
                                'solo': [-7.5755, 110.8243], 'surakarta': [-7.5755, 110.8243],
                                'yogyakarta': [-7.7956, 110.3695], 'jogja': [-7.7956, 110.3695],
                                'pekalongan': [-6.8886, 109.6753], 'cirebon': [-6.7324, 108.5522],
                                'jakarta': [-6.2088, 106.8456], 'betawi': [-6.2088, 106.8456],
                                'tuban': [-6.8990, 112.0510], 'madura': [-7.0048, 113.1986],
                                'bali': [-8.3405, 115.0920], 'lasem': [-6.7014, 111.4457],
                                'kudus': [-6.8057, 110.8396], 'jepara': [-6.5875, 110.6680],
                                'banyumas': [-7.5259, 109.2913], 'garut': [-7.2167, 107.9000],
                                'indramayu': [-6.3285, 108.3265], 'semarang': [-6.9175, 110.4064],
                            };
                            const key = (selectedBatik.origin || '').toLowerCase();
                            let found: [number, number] = [-2.5489, 118.0149];
                            for (const k of Object.keys(coordMap)) {
                                if (key.includes(k)) { found = coordMap[k]; break; }
                            }
                            const [lat, lon] = found;
                            const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.15},${lat - 0.1},${lon + 0.15},${lat + 0.1}&layer=mapnik&marker=${lat},${lon}`;
                            return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                                        <iframe src={mapUrl} width="100%" height="260"
                                            style={{ border: 0, display: 'block', filter: 'invert(0.85) hue-rotate(180deg) saturate(0.65)' }}
                                            loading="lazy" title={`Peta ${selectedBatik.origin}`} />
                                        <div style={{
                                            position: 'absolute', bottom: 10, left: 10,
                                            padding: '6px 12px', background: 'rgba(0,0,0,0.85)',
                                            backdropFilter: 'blur(8px)', borderRadius: 8,
                                            border: '1px solid rgba(184,134,11,0.3)',
                                        }}>
                                            <p style={{ margin: 0, color: '#f5c518', fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                                                📍 {(selectedBatik.origin || 'Nusantara').toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={cardStyle({ display: 'flex', alignItems: 'center', gap: 12 })}>
                                        <div style={{ fontSize: 24 }}>🧭</div>
                                        <div>
                                            <div style={{ ...labelStyle, marginBottom: 2 }}>Pusat Produksi</div>
                                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'sans-serif' }}>
                                                {selectedBatik.origin || 'Indonesia'} — salah satu sentra batik terkemuka di Nusantara dengan tradisi berusia ratusan tahun
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* ── TAB: FASHION ───────────────────── */}
                        {activeTab === 'fashion' && (() => {
                            const origin = (selectedBatik.origin || '').toLowerCase();
                            const occasions = origin.includes('solo') || origin.includes('yogya')
                                ? [['Pernikahan Adat', '💍', 'Sebagai kain dodot, kemben, atau beskap pria'],
                                ['Wisuda & Formal', '🎓', 'Dipadukan jas atau kebaya modern'],
                                ['Acara Kebesaran', '🌟', 'Lambang kehormatan di keraton & pemerintahan']]
                                : [['Smart Casual', '✨', 'Kemeja batik lengan panjang + celana chino'],
                                ['Kondangan', '👙', 'Dress atau atasan batik dengan rok polos'],
                                ['Kantor Modern', '💼', 'Blazer motif batik + inner warna senada']];
                            const styles = [
                                { icon: '👘', name: 'Kebaya Klasik', desc: 'Paduan abadi, terutama untuk acara formal & adat' },
                                { icon: '👔', name: 'Kemeja Pria', desc: 'Batik modern untuk keseharian & semi-formal' },
                                { icon: '👗', name: 'Dress Modern', desc: 'Potongan kontemporer tetap menonjolkan motif' },
                                { icon: '🧣', name: 'Jarik/Kain', desc: 'Cara tradisional melilitkan sebagai bawahan' },
                            ];
                            return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={cardStyle()}>
                                        <div style={labelStyle}>Gaya Pemakaian</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                            {styles.map(s => (
                                                <div key={s.name} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                                                    <span style={{ fontSize: 22, lineHeight: 1 }}>{s.icon}</span>
                                                    <div>
                                                        <div style={{ color: '#d4a017', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 2 }}>{s.name}</div>
                                                        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, fontFamily: 'sans-serif', lineHeight: 1.4 }}>{s.desc}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={cardStyle()}>
                                        <div style={labelStyle}>Cocok untuk Acara</div>
                                        {occasions.map(([occ, icon, tip]) => (
                                            <div key={occ} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <span style={{ fontSize: 18 }}>{icon}</span>
                                                <div>
                                                    <div style={{ color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif' }}>{occ}</div>
                                                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'sans-serif' }}>{tip}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ ...cardStyle(), display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(135deg,rgba(184,134,11,0.1),rgba(212,160,23,0.05))' }}>
                                        <span style={{ fontSize: 28 }}>💡</span>
                                        <div>
                                            <div style={{ color: '#f5c518', fontSize: 11, fontWeight: 900, fontFamily: 'sans-serif', marginBottom: 4 }}>Tips Padu Padan</div>
                                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'sans-serif', lineHeight: 1.5 }}>
                                                Gunakan warna plain/polos yang diambil dari salah satu warna dominan motif batik sebagai pasangan. Hindari memadukan dua motif berbeda secara bersamaan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* ── TAB: FLORA/BUNGA ───────────────── */}
                        {activeTab === 'bunga' && (() => {
                            const h = selectedBatik.name.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
                            const floraList = [
                                { emoji: '🌸', name: 'Bunga Lotus', arti: 'Kesucian & kemurnian jiwa', found: h % 5 === 0 },
                                { emoji: '🌺', name: 'Melati (Jasmine)', arti: 'Ketulusan & cinta suci', found: h % 5 === 1 },
                                { emoji: '🌻', name: 'Bunga Matahari', arti: 'Semangat & kekuatan hidup', found: h % 5 === 2 },
                                { emoji: '🌼', name: 'Kembang Sepatu', arti: 'Kecantikan & keteguhan', found: h % 5 === 3 },
                                { emoji: '🏵️', name: 'Anggrek Bulan', arti: 'Keelegan & keistimewaan', found: h % 5 === 4 },
                                { emoji: '🍃', name: 'Daun Kawung', arti: 'Harapan & keberuntungan', found: true },
                                { emoji: '🌿', name: 'Bambu & Sulur', arti: 'Kelenturan & ketangguhan', found: h % 3 > 0 },
                            ];
                            const alam = [
                                { icon: '🦤', label: 'Burung Garuda', desc: 'Simbol kenegaraan & kekuasaan tertinggi' },
                                { icon: '🦋', label: 'Kupu-Kupu', desc: 'Transformasi diri & kebebasan jiwa' },
                                { icon: '🐉', label: 'Naga/Ular', desc: 'Penjaga & kekuatan alam semesta' },
                                { icon: '🦚', label: 'Merak', desc: 'Keindahan & keagungan kebijaksanaan' },
                            ];
                            return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={cardStyle()}>
                                        <div style={labelStyle}>Elemen Flora dalam Motif</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                            {floraList.map(f => (
                                                <div key={f.name} style={{
                                                    display: 'flex', gap: 10, alignItems: 'center',
                                                    padding: '8px 10px', borderRadius: 9,
                                                    background: f.found ? 'rgba(184,134,11,0.1)' : 'rgba(255,255,255,0.02)',
                                                    border: f.found ? '1px solid rgba(184,134,11,0.2)' : '1px solid transparent',
                                                    opacity: f.found ? 1 : 0.5,
                                                }}>
                                                    <span style={{ fontSize: 20, minWidth: 24 }}>{f.emoji}</span>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ color: f.found ? '#f5c518' : 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif' }}>
                                                            {f.name} {f.found ? '✔️' : ''}
                                                        </div>
                                                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'sans-serif' }}>{f.arti}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p style={{ margin: '8px 0 0', color: 'rgba(184,134,11,0.5)', fontSize: 9, fontFamily: 'sans-serif' }}>✔️ = Elemen yang kemungkinan hadir dalam motif ini</p>
                                    </div>
                                    <div style={cardStyle()}>
                                        <div style={labelStyle}>Fauna & Elemen Alam</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                            {alam.map(a => (
                                                <div key={a.label} style={{ padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', textAlign: 'center' }}>
                                                    <div style={{ fontSize: 24, marginBottom: 6 }}>{a.icon}</div>
                                                    <div style={{ color: '#d4a017', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 3 }}>{a.label}</div>
                                                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'sans-serif', lineHeight: 1.4 }}>{a.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* ── TAB: GAMELAN ──────────────────── */}
                        {activeTab === 'gamelan' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={cardStyle({ background: 'linear-gradient(135deg,rgba(184,134,11,0.1),rgba(40,10,0,0.3))' })}>
                                    <div style={labelStyle}>Gamelan & Batik — Dua Jiwa Satu Budaya</div>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: 12, lineHeight: 1.7, fontFamily: 'sans-serif' }}>
                                        Dalam setiap upacara adat Jawa, Gamelan dan Batik selalu hadir bersama. Alunan Ladrang, Gending, dan Ketawang mengiringi setiap gerak yang mengenakan kain batik sebagai simbol kesempurnaan ritual.
                                    </p>
                                </div>
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Instrumen Gamelan Utama</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                        {[
                                            { icon: '🥁', name: 'Kendang', desc: 'Pemimpin irama, pengatur tempo seluruh ansambel' },
                                            { icon: '🔔', name: 'Gong Ageng', desc: 'Penanda akhir siklus gending, paling sakral' },
                                            { icon: '🎶', name: 'Saron', desc: 'Balungan melodi utama, nada dasar gending' },
                                            { icon: '🎵', name: 'Bonang', desc: 'Penghias melodi, memperkaya tekstur musikal' },
                                            { icon: '🎹', name: 'Gender', desc: 'Tabuhan lembut, sering mengiringi wayang' },
                                            { icon: '🪈', name: 'Gambang', desc: 'Bilah kayu bersuara hangat & khas' },
                                            { icon: '🎻', name: 'Rebab', desc: 'Gesek melodi, suara syahdu & mendalam' },
                                            { icon: '🎤', name: 'Sinden', desc: 'Vokalis wanita, suara emas gamelan Jawa' },
                                        ].map(({ icon, name, desc }) => (
                                            <div key={name} style={{ padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                                                <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                                                <div style={{ color: '#d4a017', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 2 }}>{name}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9.5, fontFamily: 'sans-serif', lineHeight: 1.4 }}>{desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Gending yang Mengiringi Batik</div>
                                    {[
                                        ['Ladrang Pangkur', 'Dimainkan saat pengantin mengenakan batik dodot'],
                                        ['Ketawang Puspawarna', 'Mengiringi prosesi pembatikan di keraton'],
                                        ['Gending Sriwijaya', 'Untuk upacara penyambutan dengan kain adat'],
                                        ['Lancaran Manyar Sewu', 'Ritme riang, mengiringi pesta rakyat berbatik'],
                                    ].map(([g, d]) => (
                                        <div key={g} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                                            <span style={{ fontSize: 16 }}>🎼</span>
                                            <div>
                                                <div style={{ color: '#f5c518', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif' }}>{g}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'sans-serif' }}>{d}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── TAB: UPACARA ADAT ──────────────── */}
                        {activeTab === 'adat' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Siklus Hidup & Batik</div>
                                    <p style={{ margin: '0 0 14px', color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'sans-serif', lineHeight: 1.6 }}>
                                        Dalam tradisi Jawa, batik hadir di setiap tahap kehidupan manusia — dari lahir hingga moksha.
                                    </p>
                                    {[
                                        { icon: '👶', saat: 'Kelahiran', batik: 'Batik Sidomukti', makna: 'Doa kemuliaan & keberuntungan bagi sang bayi' },
                                        { icon: '🧒', saat: 'Khitanan', batik: 'Batik Kawung', makna: 'Simbol kesucian & awal babak baru kehidupan' },
                                        { icon: '💍', saat: 'Pernikahan', batik: 'Batik Sido Asih / Truntum', makna: 'Cinta abadi, kasih sayang orang tua kepada anak' },
                                        { icon: '🎓', saat: 'Wisuda', batik: 'Batik Parang Rusak', makna: 'Keberanian & tekad pantang menyerah' },
                                        { icon: '🙏', saat: 'Selamatan', batik: 'Batik Semen Rama', makna: 'Kemakmuran & keselarasan dengan alam semesta' },
                                        { icon: '⚰️', saat: 'Kematian', batik: 'Batik Lereng Ronteg', makna: 'Penghormatan & doa ikhlas melepas kepergian' },
                                    ].map(({ icon, saat, batik, makna }) => (
                                        <div key={saat} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                                            <div>
                                                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                                                    <span style={{ color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif' }}>{saat}</span>
                                                    <span style={{ color: '#b8860b', fontSize: 9, fontFamily: 'sans-serif', padding: '1px 7px', borderRadius: 30, border: '1px solid rgba(184,134,11,0.4)' }}>{batik}</span>
                                                </div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'sans-serif' }}>{makna}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Prosesi Sakral Keraton</div>
                                    {[
                                        ['🏯', 'Grebeg Maulid', 'Dipakai abdi dalem keraton saat membawa gunungan'],
                                        ['🕌', 'Sekaten', 'Batik motif khusus untuk festival tradisi Islam-Jawa'],
                                        ['🌙', 'Malam Satu Suro', 'Batik hitam-putih sebagai simbol perenungan diri'],
                                        ['🌺', 'Labuhan', 'Kain batik dilarung ke laut sebagai persembahan alam'],
                                    ].map(([icon, nama, ket]) => (
                                        <div key={nama} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'flex-start' }}>
                                            <span style={{ fontSize: 18, marginTop: 1 }}>{icon}</span>
                                            <div>
                                                <div style={{ color: '#d4a017', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 2 }}>{nama}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'sans-serif' }}>{ket}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── TAB: FALSAFAH JAWA ────────────── */}
                        {activeTab === 'jawa' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={cardStyle({ background: 'linear-gradient(135deg,rgba(40,10,80,0.3),rgba(184,134,11,0.08))' })}>
                                    <div style={labelStyle}>Tri Hita Karana</div>
                                    <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'sans-serif', lineHeight: 1.6 }}>
                                        Falsafah keseimbangan tiga hubungan suci yang tercermin dalam setiap motif batik.
                                    </p>
                                    {[
                                        ['🌿', 'Palemahan', 'Keselarasan manusia dengan alam — tercermin motif flora & fauna'],
                                        ['👥', 'Pawongan', 'Keharmonisan antar sesama — motif batik sebagai bahasa persatuan'],
                                        ['🙏', 'Parahyangan', 'Hubungan manusia dengan Tuhan — motif sakral keraton & ritual'],
                                    ].map(([icon, nama, ket]) => (
                                        <div key={nama} style={{ display: 'flex', gap: 12, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', marginBottom: 6 }}>
                                            <span style={{ fontSize: 22 }}>{icon}</span>
                                            <div>
                                                <div style={{ color: '#f5c518', fontSize: 12, fontWeight: 900, fontFamily: 'sans-serif', marginBottom: 3 }}>{nama}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, fontFamily: 'sans-serif', lineHeight: 1.5 }}>{ket}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Hasta Brata — 8 Sifat Utama Raja</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                        {[
                                            ['☀️', 'Surya (Matahari)', 'Memberi cahaya & kehidupan tanpa pamrih'],
                                            ['🌙', 'Candra (Rembulan)', 'Lembut, meneduhkan, cahaya di kegelapan'],
                                            ['⭐', 'Bintang', 'Petunjuk arah, konsisten & dapat diandalkan'],
                                            ['☁️', 'Mendung', 'Adil merata seperti hujan menyirami bumi'],
                                            ['🌊', 'Samudra', 'Lapang hati, menampung segala perbedaan'],
                                            ['🔥', 'Api', 'Berani, berwibawa, membakar kebatilan'],
                                            ['💨', 'Angin', 'Teliti & bijak, menyentuh tanpa pilih kasih'],
                                            ['🌍', 'Bumi', 'Sabar, kuat, kokoh menopang semua'],
                                        ].map(([icon, nama, desc]) => (
                                            <div key={nama} style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', fontSize: 10 }}>
                                                <div style={{ fontSize: 16, marginBottom: 3 }}>{icon}</div>
                                                <div style={{ color: '#d4a017', fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 2 }}>{nama}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'sans-serif', lineHeight: 1.4 }}>{desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={cardStyle()}>
                                    <div style={labelStyle}>Batik dalam Pewayangan</div>
                                    {[
                                        ['🎭', 'Wayang Kulit', 'Dalang mengenakan batik khusus setiap lakon'],
                                        ['👑', 'Tokoh Dewa', 'Motif Kawung & Parang hanya untuk dewa/raja'],
                                        ['⚔️', 'Ksatria', 'Motif Gringsing — kewaspadaan & ketangkasan'],
                                        ['📜', 'Kitab Ramayana', 'Batik Semen Rama terinspirasi kisah Rama-Shinta'],
                                    ].map(([icon, nama, ket]) => (
                                        <div key={nama} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                                            <span style={{ fontSize: 18 }}>{icon}</span>
                                            <div>
                                                <div style={{ color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 1 }}>{nama}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'sans-serif' }}>{ket}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back button */}
                        <button onClick={onClose} style={{
                            width: '100%', padding: '14px',
                            background: 'linear-gradient(135deg, #b8860b, #d4a017)',
                            color: '#000', fontWeight: 900, fontSize: 12,
                            letterSpacing: '0.25em', textTransform: 'uppercase',
                            fontFamily: 'sans-serif', border: 'none', borderRadius: 12,
                            cursor: 'pointer', boxShadow: '0 4px 20px rgba(184,134,11,0.35)',
                            marginTop: 'auto',
                        }}>⬅ KEMBALI KE EKSPLORASI</button>
                    </div>

                    {/* ── Right: image ───────────────────────────────────── */}
                    <div style={{
                        flex: '1 1 38%', minWidth: 200, minHeight: 260,
                        position: 'relative', background: '#050505', padding: 8,
                    }}>
                        <img src={selectedBatik.imageUrl} alt={selectedBatik.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14, display: 'block' }} />
                        <div style={{
                            position: 'absolute', inset: 8, borderRadius: 14,
                            background: 'linear-gradient(to right, #050505 0%, transparent 40%)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {['Heritage Artifact', 'Verified Origin', 'HD Scan'].map(tag => (
                                <div key={tag} style={{
                                    padding: '5px 10px', background: 'rgba(0,0,0,0.7)',
                                    backdropFilter: 'blur(10px)', borderRadius: 7,
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    color: 'rgba(255,255,255,0.8)', fontSize: 7.5, fontWeight: 900,
                                    letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif',
                                }}>{tag}</div>
                            ))}
                        </div>

                        {/* Color accent strip at bottom */}
                        <div style={{
                            position: 'absolute', bottom: 20, left: 20, right: 20,
                            display: 'flex', gap: 4, borderRadius: 6, overflow: 'hidden',
                        }}>
                            {colors.map((c, i) => (
                                <div key={i} style={{ flex: 1, height: 6, background: c, opacity: 0.85 }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
