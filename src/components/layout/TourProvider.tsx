import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useLanguage } from '@/lib/LanguageContext';

export const TourProvider = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('batiklens-tour-seen');
    if (hasSeenTour) return;

    const tourDriver = driver({
      showProgress: true,
      animate: true,
      allowClose: true, // Allow user to skip
      doneBtnText: language === 'id' ? 'Selesai' : 'Done',
      nextBtnText: language === 'id' ? 'Lanjut' : 'Next',
      prevBtnText: language === 'id' ? 'Kembali' : 'Prev',
      steps: [
        {
          element: '#nav-home',
          popover: {
            title: language === 'id' ? 'Selamat Datang di BatikLens!' : 'Welcome to BatikLens!',
            description: language === 'id' 
              ? 'Mari saya tunjukkan bagaimana aplikasi ini dapat membantu Anda mengeksplorasi dunia batik.'
              : 'Let me show you how this app can help you explore the world of batik.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#nav-scan',
          popover: {
            title: language === 'id' ? 'Pemindai AI' : 'AI Scanner',
            description: language === 'id'
              ? 'Gunakan fitur ini untuk memindai kain batik asli dengan kamera. AI kami akan mengenali motifnya secara langsung!'
              : 'Use this feature to scan real batik fabrics with your camera. Our AI will recognize the motif instantly!',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#nav-museum',
          popover: {
            title: language === 'id' ? 'Museum 3D' : '3D Museum',
            description: language === 'id'
              ? 'Eksplorasi galeri batik virtual secara 3D. Berjalan-jalan dan temukan motif langka!'
              : 'Explore a virtual batik gallery in 3D. Walk around and discover rare motifs!',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#nav-catalog',
          popover: {
            title: language === 'id' ? 'Katalog Utama' : 'Main Catalog',
            description: language === 'id'
              ? 'Temukan ratusan motif batik beserta sejarah dan makna filosofisnya.'
              : 'Discover hundreds of batik motifs along with their history and philosophical meanings.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#nav-daily',
          popover: {
            title: language === 'id' ? 'Tantangan Harian' : 'Daily Challenge',
            description: language === 'id'
              ? 'Mainkan kuis tebak motif setiap hari untuk mengumpulkan XP dan memanjat peringkat!'
              : 'Play the daily motif guessing quiz to collect XP and climb the ranks!',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#nav-profile',
          popover: {
            title: language === 'id' ? 'Profil & Gamifikasi' : 'Profile & Gamification',
            description: language === 'id'
              ? 'Lihat progress XP, lencana (badge) yang terbuka, dan selesaikan misi-misi seru untuk naik level.'
              : 'View your XP progress, unlocked badges, and complete fun missions to level up.',
            side: 'bottom',
            align: 'end'
          }
        }
      ],
      onDestroyStarted: () => {
        if (!tourDriver.hasNextStep() || confirm(language === 'id' ? 'Yakin ingin melewati panduan ini?' : 'Are you sure you want to skip the tour?')) {
          localStorage.setItem('batiklens-tour-seen', 'true');
          tourDriver.destroy();
        }
      },
    });

    // Slight delay to ensure DOM elements (Navbar) are fully mounted
    setTimeout(() => {
      tourDriver.drive();
    }, 1000);

  }, [language]);

  return null;
};
