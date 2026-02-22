import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
    // General
    'app.title': {
        en: 'BatikLens',
        id: 'BatikLens'
    },
    'nav.home': {
        en: 'Home',
        id: 'Beranda'
    },
    'nav.scan': {
        en: 'Scan',
        id: 'Pindai'
    },
    'nav.catalog': {
        en: 'Catalog',
        id: 'Katalog'
    },
    'nav.museum': {
        en: '3D Museum',
        id: 'Museum 3D'
    },

    // Scan Page
    'scan.title': {
        en: 'Motif Analysis',
        id: 'Analisis Motif'
    },
    'scan.subtitle': {
        en: 'Optical characterization of Javanese textile patterns using the Vision Engine.',
        id: 'Karakterisasi optik pola tekstil Jawa menggunakan Vision Engine.'
    },
    'scan.upload_btn': {
        en: 'Upload Image',
        id: 'Unggah Gambar'
    },
    'scan.camera_btn': {
        en: 'Live Capture',
        id: 'Kamera Langsung'
    },
    'scan.drag_drop': {
        en: 'Drag and drop an image here, or click to select',
        id: 'Tarik dan lepas gambar di sini, atau klik untuk memilih'
    },

    // Result Page
    'result.provenance': {
        en: 'Provenance',
        id: 'Asal Daerah'
    },
    'result.interpretation': {
        en: 'Interpretation',
        id: 'Interpretasi Makna'
    },
    'result.chronology': {
        en: 'Chronology',
        id: 'Sejarah & Kronologi'
    },
    'result.confidence': {
        en: 'Confidence',
        id: 'Tingkat Kecocokan'
    },
    'result.explore_btn': {
        en: 'Explore Archive',
        id: 'Lihat Arsip'
    },
    'result.analyze_new': {
        en: 'Analyze New',
        id: 'Analisis Baru'
    },
    'result.reference': {
        en: 'Valid Reference',
        id: 'Referensi Valid'
    },
    'result.view_source': {
        en: 'View Source',
        id: 'Lihat Sumber'
    },

    // Home Page
    'home.hero_title': {
        en: 'The Soul of Batik Revealed.',
        id: 'Menyingkap Jiwa Batik.'
    },
    'home.hero_subtitle': {
        en: 'Bridge the gap between ancient Javanese philosophy and modern vision intelligence. Instantly identify motifs with clinical precision.',
        id: 'Jembatan antara filosofi Jawa kuno dan kecerdasan visi modern. Identifikasi motif secara instan dengan presisi klinis.'
    },
    'home.cta_scan': {
        en: 'Start Scanning',
        id: 'Mulai Pindai'
    },
    'home.cta_browse': {
        en: 'Browse Archive',
        id: 'Lihat Arsip'
    },
    'home.ai_limit': {
        en: 'AI service limit across all user apps applies',
        id: 'Batas layanan AI berlaku di semua aplikasi pengguna'
    },
    'home.feat_neural_title': {
        en: 'Neural Classification',
        id: 'Klasifikasi Neural'
    },
    'home.feat_neural_desc': {
        en: 'Trained on high-resolution museum archives to identify motifs with clinical precision.',
        id: 'Dilatih dengan arsip museum resolusi tinggi untuk mengidentifikasi motif dengan presisi klinis.'
    },
    'home.feat_ethical_title': {
        en: 'Ethical Intelligence',
        id: 'Kecerdasan Etis'
    },
    'home.feat_ethical_desc': {
        en: 'Providing cultural context and philosophical depth, ensuring heritage stories are preserved.',
        id: 'Menyediakan konteks budaya dan kedalaman filosofis, memastikan cerita warisan tetap terjaga.'
    },
    'home.feat_steward_title': {
        en: 'Digital Stewardship',
        id: 'Kepengurusan Digital'
    },
    'home.did_you_know': {
        en: 'Did You Know?',
        id: 'Tahukah Anda?'
    },
    'home.batik_wisdom': {
        en: 'Batik Wisdom',
        id: 'Wawasan Batik'
    },
    'home.fact_unesco': {
        en: 'Batik was recognized as a Masterpiece of Oral and Intangible Heritage of Humanity by UNESCO on October 2, 2009.',
        id: 'Batik diakui sebagai Karya Agung Warisan Budaya Lisan dan Nonbendawi Manusia oleh UNESCO pada 2 Oktober 2009.'
    },
    'home.fact_canting': {
        en: 'The "Canting" is a pen-like tool used to apply hot wax (malam) with precision, acting as a resist dye technique.',
        id: '"Canting" adalah alat seperti pena yang digunakan untuk menorehkan lilin panas (malam) dengan presisi sebagai perintang warna.'
    },
    'home.fact_sogan': {
        en: 'The classic brown color "Sogan" comes from the Soga tree bark and symbolizes humility and the earth element.',
        id: 'Warna coklat klasik "Sogan" berasal dari kulit pohon Soga dan melambangkan kerendahan hati serta elemen tanah.'
    },
    'home.fact_parang': {
        en: 'The Parang motif was once a "Forbidden Pattern" (Larangan), reserved exclusively for the King and his family.',
        id: 'Motif Parang dulunya adalah "Pola Larangan", yang dikhususkan hanya untuk Raja dan keluarganya.'
    },
    'home.fact_malam': {
        en: 'The word "Batik" comes from the Javanese words "Amba" (to write) and "Titik" (dot).',
        id: 'Kata "Batik" berasal dari bahasa Jawa "Amba" (menulis) dan "Titik".'
    },
    'footer.rights': {
        en: 'Heritage integrity verified • Global access limits apply • 2024 Protocol',
        id: 'Integritas warisan diverifikasi • Batas akses global berlaku • Protokol 2024'
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('id'); // Default Indonesian

    useEffect(() => {
        const savedLang = localStorage.getItem('app-language') as Language;
        if (savedLang) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app-language', lang);
    };

    const t = (key: string): string => {
        if (!translations[key]) return key;
        return translations[key][language];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
