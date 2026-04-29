/**
 * Bilingual batik quiz questions.
 *
 * Each question's `question_text`, `options`, and `explanation` are stored as
 * `{ id: string; en: string }`. Use `getLocalizedQuizQuestions(motifId, lang)`
 * to get a flat-string shape suitable for `<QuizComponent />`.
 */

export type Language = 'id' | 'en';

export interface LocalizedString {
  id: string;
  en: string;
}

export interface BilingualQuizQuestion {
  question_id: string;
  motif_id: string;
  question_text: LocalizedString;
  options: LocalizedString[];
  correct_answer: string;
  explanation: LocalizedString;
  difficulty: number;
  xp_reward: number;
}

export interface QuizQuestion {
  question_id: string;
  motif_id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: number;
  xp_reward: number;
}

export const quizQuestions: Record<string, BilingualQuizQuestion[]> = {
  'parang-rusak': [
    {
      question_id: 'pr_001',
      motif_id: 'parang-rusak',
      question_text: {
        en: 'What does the wave pattern in Parang Rusak symbolize?',
        id: 'Apa makna pola gelombang pada motif Parang Rusak?',
      },
      options: [
        { en: 'Ocean waves and water elements', id: 'Ombak laut dan unsur air' },
        { en: 'The struggle against evil forces', id: 'Perjuangan melawan kejahatan' },
        { en: 'Mountains and hills', id: 'Pegunungan dan perbukitan' },
        { en: 'Floral patterns and nature', id: 'Pola bunga dan alam' },
      ],
      correct_answer: 'B',
      explanation: {
        en: "Parang Rusak's diagonal wave-like pattern symbolizes the struggle against evil forces and the human effort to maintain goodness and morality in life.",
        id: 'Pola diagonal menyerupai gelombang pada Parang Rusak melambangkan perjuangan melawan kejahatan dan upaya manusia menjaga kebaikan serta moralitas dalam hidup.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'pr_002',
      motif_id: 'parang-rusak',
      question_text: {
        en: 'Which royal family first used this motif?',
        id: 'Keluarga kerajaan mana yang pertama kali memakai motif ini?',
      },
      options: [
        { en: 'Mangkunegara', id: 'Mangkunegara' },
        { en: 'Pakubuwono', id: 'Pakubuwono' },
        { en: 'Hamengkubuwono', id: 'Hamengkubuwono' },
        { en: 'Sultan Agung', id: 'Sultan Agung' },
      ],
      correct_answer: 'C',
      explanation: {
        en: 'Parang Rusak was traditionally reserved for the Sultan of Yogyakarta (Hamengkubuwono dynasty) and could not be worn by commoners.',
        id: 'Parang Rusak secara tradisional hanya boleh dipakai oleh Sultan Yogyakarta (dinasti Hamengkubuwono) dan dilarang dikenakan oleh rakyat biasa.',
      },
      difficulty: 3,
      xp_reward: 30,
    },
    {
      question_id: 'pr_003',
      motif_id: 'parang-rusak',
      question_text: {
        en: 'What is the traditional meaning of the diagonal lines?',
        id: 'Apa makna tradisional dari garis-garis diagonal pada motif ini?',
      },
      options: [
        { en: 'Lightning and power', id: 'Petir dan kekuatan' },
        { en: 'Rivers and streams', id: 'Sungai dan aliran air' },
        { en: 'The unbroken continuity of life', id: 'Kesinambungan hidup yang tak terputus' },
        { en: 'Mountain ridges', id: 'Pegunungan dan punggung bukit' },
      ],
      correct_answer: 'C',
      explanation: {
        en: 'The diagonal lines in Parang Rusak represent the unbroken continuity of life, symbolizing the flow of human existence and the struggle to maintain goodness.',
        id: 'Garis diagonal pada Parang Rusak melambangkan kesinambungan hidup yang tidak terputus, mewakili alur eksistensi manusia dan perjuangan menjaga kebaikan.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'pr_004',
      motif_id: 'parang-rusak',
      question_text: {
        en: 'When was this pattern believed to be created?',
        id: 'Kapan motif ini diyakini pertama kali diciptakan?',
      },
      options: [
        { en: '1200s', id: 'Abad ke-13' },
        { en: '1500s', id: 'Abad ke-16' },
        { en: '1700s', id: 'Abad ke-18' },
        { en: '1900s', id: 'Abad ke-20' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'Parang Rusak dates back to the 1500s during the Mataram Sultanate period, making it one of the oldest and most sacred batik motifs.',
        id: 'Parang Rusak diyakini muncul pada abad ke-16 di masa Kesultanan Mataram, menjadikannya salah satu motif batik tertua dan paling sakral.',
      },
      difficulty: 3,
      xp_reward: 25,
    },
    {
      question_id: 'pr_005',
      motif_id: 'parang-rusak',
      question_text: {
        en: 'What occasions is this motif appropriate for?',
        id: 'Pada acara apa motif ini lazim dikenakan?',
      },
      options: [
        { en: 'Daily casual wear', id: 'Pakaian santai sehari-hari' },
        { en: 'Weddings and royal ceremonies', id: 'Pernikahan dan upacara kerajaan' },
        { en: 'Funeral rites', id: 'Upacara pemakaman' },
        { en: 'Farming activities', id: 'Aktivitas bertani' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'Due to its sacred status, Parang Rusak is traditionally reserved for important ceremonies, weddings, and royal occasions. It was forbidden for everyday wear.',
        id: 'Karena statusnya yang sakral, Parang Rusak secara tradisi disediakan untuk upacara penting, pernikahan, dan acara kerajaan, serta dilarang untuk pakaian sehari-hari.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
  ],

  kawung: [
    {
      question_id: 'kw_001',
      motif_id: 'kawung',
      question_text: {
        en: 'What shape is the basic element in Kawung motif?',
        id: 'Apa bentuk dasar elemen pada motif Kawung?',
      },
      options: [
        { en: 'Circular with four lobes', id: 'Lingkaran dengan empat kelopak' },
        { en: 'Square with corners', id: 'Persegi bersudut' },
        { en: 'Triangular pattern', id: 'Pola segitiga' },
        { en: 'Oval shape', id: 'Bentuk oval' },
      ],
      correct_answer: 'A',
      explanation: {
        en: 'The Kawung motif features a circular shape divided into four parts or lobes, resembling the kawung palm fruit cross-section.',
        id: 'Motif Kawung berbentuk lingkaran yang terbagi menjadi empat bagian atau kelopak, menyerupai irisan buah aren (kolang-kaling).',
      },
      difficulty: 1,
      xp_reward: 15,
    },
    {
      question_id: 'kw_002',
      motif_id: 'kawung',
      question_text: {
        en: 'What does the Kawung motif symbolize?',
        id: 'Apa yang dilambangkan oleh motif Kawung?',
      },
      options: [
        { en: 'Wealth and prosperity', id: 'Kekayaan dan kemakmuran' },
        { en: 'Power and authority', id: 'Kekuasaan dan otoritas' },
        { en: 'Purity and perfection', id: 'Kesucian dan kesempurnaan' },
        { en: 'Wisdom and knowledge', id: 'Kebijaksanaan dan pengetahuan' },
      ],
      correct_answer: 'C',
      explanation: {
        en: 'Kawung symbolizes purity, perfection, and sacredness. The four parts represent the four cardinal directions and the four elements of nature.',
        id: 'Kawung melambangkan kesucian, kesempurnaan, dan kesakralan. Empat bagian pada motif merepresentasikan empat arah mata angin dan empat unsur alam.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'kw_003',
      motif_id: 'kawung',
      question_text: {
        en: 'Which natural fruit inspired this pattern?',
        id: 'Buah apa yang menginspirasi bentuk motif ini?',
      },
      options: [
        { en: 'Coconut', id: 'Kelapa' },
        { en: 'Kawung palm (sugar palm)', id: 'Aren / kawung (kolang-kaling)' },
        { en: 'Durian', id: 'Durian' },
        { en: 'Mango', id: 'Mangga' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'The Kawung motif is inspired by the kawung or sugar palm fruit, which has a distinctive cross-section with four lobes.',
        id: 'Motif Kawung terinspirasi oleh buah aren atau kawung, yang memiliki irisan khas berbentuk empat kelopak.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'kw_004',
      motif_id: 'kawung',
      question_text: {
        en: 'Who was traditionally allowed to wear Kawung?',
        id: 'Siapa yang secara tradisi diperbolehkan mengenakan motif Kawung?',
      },
      options: [
        { en: 'Only the Sultan', id: 'Hanya Sultan' },
        { en: 'Royal family and nobility', id: 'Keluarga kerajaan dan bangsawan' },
        { en: 'All social classes', id: 'Semua lapisan masyarakat' },
        { en: 'Only priests', id: 'Hanya rohaniwan' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'Unlike Parang Rusak, Kawung could be worn by royal family members and nobility, making it more accessible while still maintaining its prestigious status.',
        id: 'Berbeda dengan Parang Rusak, motif Kawung boleh dipakai oleh keluarga kerajaan maupun bangsawan, sehingga lebih luas penggunaannya namun tetap bergengsi.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'kw_005',
      motif_id: 'kawung',
      question_text: {
        en: 'What philosophical concept does Kawung represent?',
        id: 'Konsep filosofis apa yang diwakili oleh Kawung?',
      },
      options: [
        { en: 'The cycle of life and death', id: 'Siklus hidup dan mati' },
        { en: 'The four human virtues', id: 'Empat keutamaan manusia' },
        { en: 'The unity of body and soul', id: 'Kesatuan jiwa dan raga' },
        { en: 'The balance of nature', id: 'Keseimbangan alam' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'Kawung represents the four cardinal human virtues: wisdom, nobility, strength, and justice, symbolized by the four lobes of the pattern.',
        id: 'Kawung mewakili empat keutamaan utama manusia: kebijaksanaan, keluhuran, kekuatan, dan keadilan, yang dilambangkan oleh empat kelopak pada motifnya.',
      },
      difficulty: 3,
      xp_reward: 25,
    },
  ],

  ceplok: [
    {
      question_id: 'cp_001',
      motif_id: 'ceplok',
      question_text: {
        en: 'What type of pattern is Ceplok?',
        id: 'Termasuk jenis pola apa Ceplok?',
      },
      options: [
        { en: 'Geometric with squares and circles', id: 'Geometris dengan persegi dan lingkaran' },
        { en: 'Organic floral pattern', id: 'Pola bunga organik' },
        { en: 'Diagonal wave pattern', id: 'Pola gelombang diagonal' },
        { en: 'Abstract irregular shapes', id: 'Bentuk abstrak tak beraturan' },
      ],
      correct_answer: 'A',
      explanation: {
        en: 'Ceplok is a geometric pattern featuring squares, circles, stars, and other regular shapes arranged in a repetitive pattern.',
        id: 'Ceplok adalah pola geometris yang menampilkan persegi, lingkaran, bintang, dan bentuk teratur lain yang tersusun berulang.',
      },
      difficulty: 1,
      xp_reward: 15,
    },
    {
      question_id: 'cp_002',
      motif_id: 'ceplok',
      question_text: {
        en: "What does 'Ceplok' mean in Javanese?",
        id: "Apa arti kata 'Ceplok' dalam bahasa Jawa?",
      },
      options: [
        { en: 'Beautiful', id: 'Indah' },
        { en: 'Square or block', id: 'Persegi atau kotak' },
        { en: 'Pattern', id: 'Pola' },
        { en: 'Sacred', id: 'Suci' },
      ],
      correct_answer: 'B',
      explanation: {
        en: "The word 'Ceplok' comes from Javanese meaning square or block, referring to the geometric nature of the pattern.",
        id: "Kata 'Ceplok' berasal dari bahasa Jawa yang berarti persegi atau kotak, merujuk pada sifat geometris dari motif ini.",
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'cp_003',
      motif_id: 'ceplok',
      question_text: {
        en: 'Which shapes are commonly found in Ceplok patterns?',
        id: 'Bentuk apa saja yang umum ditemukan pada motif Ceplok?',
      },
      options: [
        { en: 'Only circles', id: 'Hanya lingkaran' },
        { en: 'Squares, circles, stars, and flowers', id: 'Persegi, lingkaran, bintang, dan bunga' },
        { en: 'Triangles and diamonds', id: 'Segitiga dan belah ketupat' },
        { en: 'Wavy lines and curves', id: 'Garis bergelombang dan lengkungan' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'Ceplok patterns incorporate various geometric shapes including squares, circles, stars, and stylized flowers arranged in symmetrical patterns.',
        id: 'Motif Ceplok memadukan berbagai bentuk geometris seperti persegi, lingkaran, bintang, dan stilasi bunga yang tersusun simetris.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'cp_004',
      motif_id: 'ceplok',
      question_text: {
        en: 'What does Ceplok symbolize?',
        id: 'Apa yang dilambangkan oleh motif Ceplok?',
      },
      options: [
        { en: 'Social harmony and order', id: 'Keharmonisan dan keteraturan sosial' },
        { en: 'Individual freedom', id: 'Kebebasan individu' },
        { en: 'Natural chaos', id: 'Kekacauan alam' },
        { en: 'Military power', id: 'Kekuatan militer' },
      ],
      correct_answer: 'A',
      explanation: {
        en: 'Ceplok represents social harmony, order, and the structured nature of society. The geometric patterns symbolize balance and cosmic order.',
        id: 'Ceplok mewakili keharmonisan sosial, keteraturan, dan struktur masyarakat. Pola geometrisnya melambangkan keseimbangan dan tatanan kosmik.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'cp_005',
      motif_id: 'ceplok',
      question_text: {
        en: 'How is Ceplok different from other batik motifs?',
        id: 'Apa yang membedakan Ceplok dari motif batik lainnya?',
      },
      options: [
        { en: "It's purely geometric", id: 'Sepenuhnya geometris' },
        { en: 'It uses only natural dyes', id: 'Hanya memakai pewarna alami' },
        { en: "It's only for casual wear", id: 'Hanya untuk pakaian santai' },
        { en: 'It comes from outside Java', id: 'Berasal dari luar Jawa' },
      ],
      correct_answer: 'A',
      explanation: {
        en: 'Unlike organic motifs like Semen or Mega Mendung, Ceplok is characterized by its purely geometric and structured patterns.',
        id: 'Berbeda dengan motif organik seperti Semen atau Mega Mendung, Ceplok khas dengan pola yang sepenuhnya geometris dan terstruktur.',
      },
      difficulty: 3,
      xp_reward: 25,
    },
  ],

  'mega-mendung': [
    {
      question_id: 'mm_001',
      motif_id: 'mega-mendung',
      question_text: {
        en: 'Where does Mega Mendung originate from?',
        id: 'Dari daerah mana Mega Mendung berasal?',
      },
      options: [
        { en: 'Yogyakarta', id: 'Yogyakarta' },
        { en: 'Solo (Surakarta)', id: 'Solo (Surakarta)' },
        { en: 'Cirebon', id: 'Cirebon' },
        { en: 'Pekalongan', id: 'Pekalongan' },
      ],
      correct_answer: 'C',
      explanation: {
        en: 'Mega Mendung is a signature motif from Cirebon, West Java, influenced by Chinese and Islamic cultural elements.',
        id: 'Mega Mendung adalah motif khas Cirebon, Jawa Barat, yang dipengaruhi oleh unsur budaya Tionghoa dan Islam.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'mm_002',
      motif_id: 'mega-mendung',
      question_text: {
        en: "What does 'Mega Mendung' literally mean?",
        id: "Apa arti harfiah dari 'Mega Mendung'?",
      },
      options: [
        { en: 'Dark clouds', id: 'Awan gelap' },
        { en: 'Rainy season', id: 'Musim hujan' },
        { en: 'Stormy weather', id: 'Cuaca badai' },
        { en: 'Sky patterns', id: 'Pola langit' },
      ],
      correct_answer: 'A',
      explanation: {
        en: "Mega Mendung literally means 'dark clouds' or 'overcast sky', representing clouds that bring rain and life.",
        id: "Mega Mendung secara harfiah berarti 'awan gelap' atau 'langit mendung', menggambarkan awan yang membawa hujan dan kehidupan.",
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'mm_003',
      motif_id: 'mega-mendung',
      question_text: {
        en: 'What cultural influences shaped Mega Mendung?',
        id: 'Pengaruh budaya apa yang membentuk Mega Mendung?',
      },
      options: [
        { en: 'Only Javanese culture', id: 'Hanya budaya Jawa' },
        { en: 'Chinese and Islamic influences', id: 'Pengaruh Tionghoa dan Islam' },
        { en: 'European colonial art', id: 'Seni kolonial Eropa' },
        { en: 'Indian Hindu patterns', id: 'Pola Hindu India' },
      ],
      correct_answer: 'B',
      explanation: {
        en: "Mega Mendung shows strong Chinese cloud motifs combined with Islamic philosophical elements, reflecting Cirebon's multicultural history.",
        id: 'Mega Mendung memperlihatkan pengaruh kuat motif awan khas Tionghoa yang berpadu dengan elemen filosofis Islam, mencerminkan sejarah multikultural Cirebon.',
      },
      difficulty: 3,
      xp_reward: 25,
    },
    {
      question_id: 'mm_004',
      motif_id: 'mega-mendung',
      question_text: {
        en: 'How are the cloud shapes arranged?',
        id: 'Bagaimana susunan bentuk-bentuk awan pada motif ini?',
      },
      options: [
        { en: 'Random pattern', id: 'Pola acak' },
        { en: 'Horizontal rows with decreasing size', id: 'Baris horizontal dengan ukuran mengecil' },
        { en: 'Vertical columns', id: 'Kolom vertikal' },
        { en: 'Circular arrangement', id: 'Susunan melingkar' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'The clouds are arranged in horizontal rows, with each row having smaller clouds than the one above it, creating a perspective effect.',
        id: 'Awan-awan disusun dalam baris horizontal, dengan tiap baris berisi awan yang lebih kecil dari baris di atasnya, sehingga menciptakan efek perspektif.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'mm_005',
      motif_id: 'mega-mendung',
      question_text: {
        en: 'What philosophical meaning does Mega Mendung carry?',
        id: 'Makna filosofis apa yang dibawa oleh Mega Mendung?',
      },
      options: [
        { en: 'Power and authority', id: 'Kekuasaan dan otoritas' },
        { en: "Life's journey and transcendence", id: 'Perjalanan hidup dan transendensi' },
        { en: 'Fertility and abundance', id: 'Kesuburan dan kelimpahan' },
        { en: 'Protection and safety', id: 'Perlindungan dan keselamatan' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'Mega Mendung symbolizes the human journey from worldly desires to spiritual transcendence, with clouds representing the veil between material and spiritual realms.',
        id: 'Mega Mendung melambangkan perjalanan manusia dari keinginan duniawi menuju transendensi spiritual, dengan awan sebagai tabir antara alam material dan alam spiritual.',
      },
      difficulty: 3,
      xp_reward: 25,
    },
  ],

  general: [
    {
      question_id: 'gen_001',
      motif_id: 'general',
      question_text: {
        en: 'What is the traditional tool used for applying wax in batik making?',
        id: 'Alat tradisional apa yang digunakan untuk menorehkan malam pada batik?',
      },
      options: [
        { en: 'Brush', id: 'Kuas' },
        { en: 'Canting', id: 'Canting' },
        { en: 'Stamp', id: 'Cap' },
        { en: 'Roller', id: 'Rol' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'The canting is a traditional Javanese tool with a small copper reservoir and bamboo handle used to apply hot wax in fine lines.',
        id: 'Canting adalah alat tradisional Jawa berbahan tembaga kecil dengan gagang bambu, digunakan untuk menorehkan malam panas dalam garis halus.',
      },
      difficulty: 1,
      xp_reward: 15,
    },
    {
      question_id: 'gen_002',
      motif_id: 'general',
      question_text: {
        en: 'Which UNESCO status did Indonesian batik receive?',
        id: 'Status UNESCO apa yang diterima oleh batik Indonesia?',
      },
      options: [
        { en: 'Natural Heritage Site', id: 'Situs Warisan Alam' },
        { en: 'Intangible Cultural Heritage', id: 'Warisan Budaya Takbenda' },
        { en: 'World Heritage Site', id: 'Situs Warisan Dunia' },
        { en: 'Memory of the World', id: 'Memory of the World' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'In 2009, UNESCO recognized Indonesian batik as a Masterpiece of Oral and Intangible Heritage of Humanity.',
        id: 'Pada tahun 2009, UNESCO menetapkan batik Indonesia sebagai Mahakarya Warisan Budaya Lisan dan Takbenda Manusia.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'gen_003',
      motif_id: 'general',
      question_text: {
        en: 'What is the purpose of wax in the batik process?',
        id: 'Apa fungsi malam (lilin) dalam proses pembuatan batik?',
      },
      options: [
        { en: 'To color the fabric', id: 'Untuk mewarnai kain' },
        { en: 'To resist dye and create patterns', id: 'Untuk menahan pewarna dan membentuk motif' },
        { en: 'To soften the fabric', id: 'Untuk melembutkan kain' },
        { en: 'To preserve the fabric', id: 'Untuk mengawetkan kain' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'Wax acts as a resist, preventing dye from penetrating certain areas of the fabric, thus creating the desired pattern.',
        id: 'Malam berfungsi sebagai perintang yang mencegah pewarna meresap di area tertentu, sehingga membentuk pola yang diinginkan.',
      },
      difficulty: 2,
      xp_reward: 20,
    },
    {
      question_id: 'gen_004',
      motif_id: 'general',
      question_text: {
        en: 'Which natural dye produces the traditional brown color in batik?',
        id: 'Pewarna alami apa yang menghasilkan warna cokelat khas pada batik?',
      },
      options: [
        { en: 'Tea leaves', id: 'Daun teh' },
        { en: 'Coffee beans', id: 'Biji kopi' },
        { en: 'Soga bark', id: 'Kulit kayu soga' },
        { en: 'Cinnamon', id: 'Kayu manis' },
      ],
      correct_answer: 'C',
      explanation: {
        en: 'The traditional brown color comes from the bark of the soga tree (Peltophorum pterocarpum), which has been used for centuries in Javanese batik.',
        id: 'Warna cokelat tradisional berasal dari kulit pohon soga (Peltophorum pterocarpum) yang telah digunakan berabad-abad dalam batik Jawa.',
      },
      difficulty: 3,
      xp_reward: 25,
    },
    {
      question_id: 'gen_005',
      motif_id: 'general',
      question_text: {
        en: 'How many main batik style regions are there in Java?',
        id: 'Ada berapa wilayah gaya batik utama di Pulau Jawa?',
      },
      options: [
        { en: '2', id: '2' },
        { en: '3', id: '3' },
        { en: '4', id: '4' },
        { en: '5', id: '5' },
      ],
      correct_answer: 'B',
      explanation: {
        en: 'There are three main batik styles in Java: Coastal (pesisir) with vibrant colors and foreign influences, Inland (keraton) with traditional colors and royal patterns, and the inland styles of Yogyakarta and Solo.',
        id: 'Terdapat tiga gaya batik utama di Jawa: pesisir dengan warna cerah dan pengaruh luar, keraton dengan warna tradisional dan motif kerajaan, serta gaya pedalaman Yogyakarta dan Solo.',
      },
      difficulty: 3,
      xp_reward: 25,
    },
  ],
};

const localizeQuestion = (q: BilingualQuizQuestion, lang: Language): QuizQuestion => ({
  question_id: q.question_id,
  motif_id: q.motif_id,
  question_text: q.question_text[lang],
  options: q.options.map((o) => o[lang]),
  correct_answer: q.correct_answer,
  explanation: q.explanation[lang],
  difficulty: q.difficulty,
  xp_reward: q.xp_reward,
});

export const getLocalizedQuizQuestions = (
  motifId: string | undefined,
  lang: Language,
): QuizQuestion[] => {
  const bucket = motifId && quizQuestions[motifId] ? quizQuestions[motifId] : quizQuestions.general;
  return bucket.map((q) => localizeQuestion(q, lang));
};

/**
 * Returns the full bilingual records for a given motif (used by the daily quiz
 * which needs to localize on the fly when the user toggles language mid-quiz).
 */
export const getBilingualQuizQuestions = (motifId?: string): BilingualQuizQuestion[] => {
  if (motifId && quizQuestions[motifId]) return quizQuestions[motifId];
  return quizQuestions.general;
};

/**
 * Backwards-compatible helper. Defaults to English so existing callers keep
 * working until they're migrated to `getLocalizedQuizQuestions`.
 *
 * @deprecated Prefer `getLocalizedQuizQuestions(motifId, language)`.
 */
export const getQuizQuestions = (motifId?: string): QuizQuestion[] =>
  getLocalizedQuizQuestions(motifId, 'en');

export const getAllMotifIds = (): string[] => {
  return Object.keys(quizQuestions).filter((id) => id !== 'general');
};
