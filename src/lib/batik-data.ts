// Define Translatable type for multi-language support
type Translatable = {
  en: string;
  id: string;
};

export interface Batik {
  id: string;
  name: string;
  origin: string;
  meaning: Translatable;
  history: Translatable;
  imageUrl: string;
  category: string;
  referenceUrl: string; // Valid reference link
}

export const batiks: Batik[] = [
  {
    id: 'batik-aceh',
    name: 'Batik Aceh (Pintu Aceh)',
    origin: 'Aceh',
    meaning: {
      en: 'The "Pintu Aceh" (Aceh Door) symbolizes the open-heartedness and friendliness of the Acehnese people towards visitors, despite their strict adherence to customs and religion. The intricate geometric grills represent the ventilation of traditional houses, teaching transparency and the flow of blessings based on Islamic values.',
      id: 'Motif "Pintu Aceh" melambangkan keterbukaan hati dan keramahan masyarakat Aceh terhadap tamu, meskipun mereka sangat teguh pada adat dan agama. Kisi-kisi geometris yang rumit merepresentasikan ventilasi rumah adat, mengajarkan transparansi dan aliran berkah berdasarkan nilai-nilai Islam.'
    },
    history: {
      en: 'Historically, this motif was carved on the ventilation of traditional Acehnese houses (Rumoh Aceh). It was adapted into batik to preserve the architectural heritage. The colors are typically bold—red, yellow, green—reflecting the bravery and royal identity of the Acehnese Sultanate.',
      id: 'Secara historis, motif ini diukir pada ventilasi rumah adat Aceh (Rumoh Aceh). Kemudian diadaptasi ke dalam batik untuk melestarikan warisan arsitektur. Warna-warnanya biasanya berani—merah, kuning, hijau—mencerminkan keberanian dan identitas kerajaan Kesultanan Aceh.'
    },
    imageUrl: '/batik-images/batik-aceh/hf_git_1134_Aceh11.jpg',
    category: 'Cultural',
    referenceUrl: 'https://id.wikipedia.org/wiki/Pintu_Aceh'
  },
  {
    id: 'batik-bali',
    name: 'Batik Bali',
    origin: 'Bali',
    meaning: {
      en: 'Balinese batik is a celebration of nature and spirituality, emphasizing the Tri Hita Karana philosophy—harmony between people, nature, and the divine. The patterns often blend traditional Javanese influences with free-spirited Balinese artistic expression, representing joy, tropical beauty, and ceremonial sanctity.',
      id: 'Batik Bali adalah perayaan alam dan spiritualitas, menekankan filosofi Tri Hita Karana—keharmonisan antara manusia, alam, dan Tuhan. Polanya sering memadukan pengaruh Jawa tradisional dengan ekspresi seni Bali yang bebas, mewakili kegembiraan, keindahan tropis, dan kesucian upacara.'
    },
    history: {
      en: 'Unlike Javanese batik which has strict royal rules, Balinese batik emerged as a form of creative expression for religious ceremonies and daily wear. It gained prominence in the 1970s, integrating local Hindu symbols like frangipani flowers and temples into the wax-resist dyeing tradition.',
      id: 'Berbeda dengan batik Jawa yang memiliki aturan keraton yang ketat, batik Bali muncul sebagai bentuk ekspresi kreatif untuk upacara keagamaan dan pakaian sehari-hari. Mulai populer pada tahun 1970-an, mengintegrasikan simbol Hindu lokal seperti bunga kamboja dan pura ke dalam tradisi pewarnaan perintang lilin.'
    },
    imageUrl: '/batik-images/batik-bali/1.jpg',
    category: 'Regional',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Bali'
  },
  {
    id: 'batik-bali_barong',
    name: 'Batik Bali Barong',
    origin: 'Bali',
    meaning: {
      en: 'The Barong is the King of Spirits, a symbol of health and good fortune, representing the triumph of good (Dharma) over evil (Adharma). Wearing this motif is believed to grant spiritual protection and ward off negative energies, acting as a talisman for the wearer.',
      id: 'Barong adalah Raja Roh, simbol kesehatan dan keberuntungan, mewakili kemenangan kebaikan (Dharma) atas kejahatan (Adharma). Mengenakan motif ini dipercaya memberikan perlindungan spiritual dan menangkal energi negatif, bertindak sebagai jimat bagi pemakainya.'
    },
    history: {
      en: 'Adapted from the sacred Barong dance costumes, this pattern brings the mythological guardian lion into textile form. The Barong figure is central to Balinese mythology, often depicted in battle with Rangda (the demon queen) to maintain cosmic balance.',
      id: 'Diadaptasi dari kostum tari Barong yang sakral, pola ini membawa singa penjaga mitologis ke dalam bentuk tekstil. Sosok Barong adalah pusat mitologi Bali, sering digambarkan dalam pertempuran dengan Rangda (ratu iblis) untuk menjaga keseimbangan kosmik.'
    },
    imageUrl: '/batik-images/batik-bali_barong/hf_git_2043_Bali_Barong44.jpg',
    category: 'Spiritual',
    referenceUrl: 'https://id.wikipedia.org/wiki/Barong_Bali'
  },
  {
    id: 'batik-bali_merak',
    name: 'Batik Bali Merak (Peacock)',
    origin: 'Bali',
    meaning: {
      en: 'The Peacock (Merak) symbolizes beauty, dignity, and immortality. In Balinese art, the peacock is often associated with Saraswati, the goddess of knowledge. The motif teaches one to display inner beauty and wisdom with grace, much like the peacock displaying its magnificent feathers.',
      id: 'Merak melambangkan keindahan, martabat, dan keabadian. Dalam seni Bali, merak sering dikaitkan dengan Saraswati, dewi ilmu pengetahuan. Motif ini mengajarkan seseorang untuk menampilkan kecantikan batin dan kebijaksanaan dengan anggun, seperti merak yang memamerkan bulunya yang indah.'
    },
    history: {
      en: 'Birds have always held a special place in Balinese art. The Merak motif became popular as a symbol of tropical elegance, often used in fabrics for dance costumes and festive Balinese temple attire.',
      id: 'Burung selalu memiliki tempat khusus dalam seni Bali. Motif Merak menjadi populer sebagai simbol keanggunan tropis, sering digunakan dalam kain untuk kostum tari dan pakaian adat Bali yang meriah.'
    },
    imageUrl: '/batik-images/batik-bali_merak/hf_git_283_Bali_Merak27.jpg',
    category: 'Animal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Burung_merak'
  },
  {
    id: 'batik-betawi',
    name: 'Batik Betawi (Pucuk Rebung)',
    origin: 'Jakarta',
    meaning: {
      en: 'Batik Betawi captures the vibrant, multicultural soul of Jakarta. Common motifs like Ondel-Ondel symbolize protection, while the triangular Pucuk Rebung represents the human connection to the divine. The bright contrasting colors reflect the dynamic and open nature of the Betawi people.',
      id: 'Batik Betawi menangkap jiwa Jakarta yang hidup dan multikultural. Motif umum seperti Ondel-Ondel melambangkan perlindungan, sedangkan Pucuk Rebung segitiga mewakili hubungan manusia dengan Tuhan. Warna-warna kontras yang cerah mencerminkan sifat dinamis dan terbuka masyarakat Betawi.'
    },
    history: {
      en: 'Betawi batik was revived in the 20th century to assert the cultural identity of Jakarta\'s native people. It fuses Chinese (colors), Arab (geometric), and Dutch (floral) influences, mirroring Jakarta\'s history as a melting pot (Batavia).',
      id: 'Batik Betawi dihidupkan kembali pada abad ke-20 untuk menegaskan identitas budaya penduduk asli Jakarta. Ini memadukan pengaruh Cina (warna), Arab (geometris), dan Belanda (bunga), mencerminkan sejarah Jakarta sebagai tempat peleburan budaya (Batavia).'
    },
    imageUrl: '/batik-images/batik-betawi/1.jpg',
    category: 'Cultural',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Betawi'
  },
  {
    id: 'batik-celup',
    name: 'Batik Celup (Jumputan)',
    origin: 'Nusantara',
    meaning: {
      en: 'While technically a tie-dye (shibori) technique, in Indonesia this is known as "Batik Jumputan". The circular bursts of color representing stars or flowers symbolize sudden joy and the blossoming of hope. It teaches that beauty can emerge from pressure (the tying process).',
      id: 'Meskipun secara teknis teknik ikat celup (shibori), di Indonesia ini dikenal sebagai "Batik Jumputan". Semburan warna melingkar yang mewakili bintang atau bunga melambangkan kegembiraan yang tiba-tiba dan mekarnya harapan. Mengajarkan bahwa keindahan bisa muncul dari tekanan (proses pengikatan).'
    },
    history: {
      en: 'An ancient resist-dyeing technique found across the archipelago, from Palembang to Java. Unlike wax-resist batik, this uses thread to block color. Historically worn by commoners for its ease of production compared to canting batik.',
      id: 'Teknik pewarnaan perintang kuno yang ditemukan di seluruh nusantara, dari Palembang hingga Jawa. Berbeda dengan batik tulis lilin, ini menggunakan benang untuk menahan warna. Secara historis dikenakan oleh rakyat biasa karena kemudahan pembuatannya dibandingkan batik canting.'
    },
    imageUrl: '/batik-images/batik-celup/1.jpg',
    category: 'Technique',
    referenceUrl: 'https://id.wikipedia.org/wiki/Jumputan'
  },
  {
    id: 'batik-cendrawasih',
    name: 'Batik Papua Cendrawasih',
    origin: 'Papua',
    meaning: {
      en: 'The Cendrawasih (Bird of Paradise) is considered the "Bird of God" in Papuan belief. This motif symbolizes high dignity, rare beauty, and the connection between the earth and the heavens. It represents the pride and untouched natural spirit of the Papuan land.',
      id: 'Cendrawasih dianggap sebagai "Burung Dewa" dalam kepercayaan Papua. Motif ini melambangkan martabat tinggi, keindahan langka, dan hubungan antara bumi dan surga. Mewakili kebanggaan dan semangat alam tanah Papua yang belum terjamah.'
    },
    history: {
      en: 'Papuan batik is a relatively modern development compared to Javanese batik, created to celebrate local identity. The Cendrawasih is the provincial mascot and a protected species, immortalized in fabric to promote conservation awareness.',
      id: 'Batik Papua adalah perkembangan yang relatif modern dibandingkan batik Jawa, diciptakan untuk merayakan identitas lokal. Cendrawasih adalah maskot provinsi dan spesies yang dilindungi, diabadikan dalam kain untuk mempromosikan kesadaran konservasi.'
    },
    imageUrl: '/batik-images/batik-cendrawasih/1.jpg',
    category: 'Animal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Papua'
  },
  {
    id: 'batik-ceplok',
    name: 'Batik Ceplok',
    origin: 'Yogyakarta / Solo',
    meaning: {
      en: 'Ceplok is a category of geometric patterns based on circular rosettes, stars, or crosses. It symbolizes the cosmic order and balance of the four cardinal directions. The repetitive structure teaches discipline, regularity, and the harmonious alignment of human life with the laws of the universe.',
      id: 'Ceplok adalah kategori pola geometris berdasarkan mawar melingkar, bintang, atau salib. Ini melambangkan tatanan kosmik dan keseimbangan empat arah mata angin. Struktur yang berulang mengajarkan disiplin, keteraturan, dan penyelarasan harmonis kehidupan manusia dengan hukum alam semesta.'
    },
    history: {
      en: 'One of the oldest batik classifications, dating back to the pre-Islamic era. Ceplok motifs were arguably inspired by the cross-sections of fruits (like Kawung) or temple ornaments found in Borobudur and Prambanan bas-reliefs.',
      id: 'Salah satu klasifikasi batik tertua, berasal dari era pra-Islam. Motif Ceplok kemungkinan terinspirasi oleh penampang buah (seperti Kawung) atau ornamen candi yang ditemukan dalam relief Borobudur dan Prambanan.'
    },
    imageUrl: '/batik-images/batik-ceplok/10.jpg',
    category: 'Geometric',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Ceplok'
  },
  {
    id: 'batik-ciamis',
    name: 'Batik Ciamis (Priangan)',
    origin: 'West Java',
    meaning: {
      en: 'Batik Ciamis (Ciamisan) is known for its simplicity and naturalism, often lacking the complex "isen-isen" (dots/fillers) of Central Javanese batik. It symbolizes a simple, unpretentious life and harmony with nature, reflecting the modest and polite character of the Sundanese people.',
      id: 'Batik Ciamis (Ciamisan) dikenal karena kesederhanaan dan naturalismenya, seringkali tidak memiliki "isen-isen" (titik/pengisi) yang rumit dari batik Jawa Tengah. Ini melambangkan kehidupan yang sederhana, tidak sok, dan harmonis dengan alam, mencerminkan karakter orang Sunda yang rendah hati dan sopan.'
    },
    history: {
      en: 'Developed in the Ciamis kingdom era, this style was influenced by the Mataram kingdom but adapted to local tastes. It became a major industry in the early 20th century, known as "Batik Dermayon" or coastal-influenced highland batik.',
      id: 'Dikembangkan pada era kerajaan Ciamis, gaya ini dipengaruhi oleh kerajaan Mataram tetapi disesuaikan dengan selera lokal. Menjadi industri besar pada awal abad ke-20, dikenal sebagai "Batik Dermayon" atau batik dataran tinggi yang dipengaruhi pesisir.'
    },
    imageUrl: '/batik-images/batik-ciamis/1.jpg',
    category: 'Regional',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Ciamis'
  },
  {
    id: 'batik-corak_insang',
    name: 'Batik Corak Insang',
    origin: 'Pontianak (West Kalimantan)',
    meaning: {
      en: 'Inspired by the gills (insang) of fish, this motif symbolizes the breath of life and movement. Just as fish cannot survive without gills, culture and tradition are the breath of the Malay society in Pontianak. It teaches adaptation and resilience in the flow of life.',
      id: 'Terinspirasi oleh insang ikan, motif ini melambangkan nafas kehidupan dan pergerakan. Sama seperti ikan tidak dapat bertahan hidup tanpa insang, budaya dan tradisi adalah nafas masyarakat Melayu di Pontianak. Mengajarkan adaptasi dan ketahanan dalam arus kehidupan.'
    },
    history: {
      en: 'Traditionally used by the Malay community in Pontianak, particularly along the Kapuas River. It was originally reserved for nobility but is now an icon of Pontianak city, often worn during weddings and official ceremonies.',
      id: 'Secara tradisional digunakan oleh masyarakat Melayu di Pontianak, khususnya di sepanjang Sungai Kapuas. Awalnya dikhususkan untuk bangsawan tetapi sekarang menjadi ikon kota Pontianak, sering dikenakan saat pernikahan dan upacara resmi.'
    },
    imageUrl: '/batik-images/batik-corak_insang/hf_git_1056_Corak_Insang6.jpg',
    category: 'Maritime',
    referenceUrl: 'https://id.wikipedia.org/wiki/Kain_Corak_Insang'
  },
  {
    id: 'batik-garutan',
    name: 'Batik Garutan',
    origin: 'Garut (West Java)',
    meaning: {
      en: 'Garutan batik features pastel colors and diagonal geometric patterns (Rereng). It symbolizes the cheerful, open, and practical nature of the Sundanese people. The brighter, softer colors (cream, pink, light blue) represent the cool, misty climate of the Garut highlands.',
      id: 'Batik Garutan menampilkan warna-warna pastel dan pola geometris diagonal (Rereng). Melambangkan sifat ceria, terbuka, dan praktis orang Sunda. Warna-warna yang lebih cerah dan lembut (krem, merah muda, biru muda) mewakili iklim sejuk dan berkabut dataran tinggi Garut.'
    },
    history: {
      en: 'Flourished in the 1940s-1960s as a golden era of Garut batik. It is distinct from court batiks because it was developed by merchants and commoners, allowing for more freedom in design and color choices.',
      id: 'Berkembang pesat pada tahun 1940-an hingga 1960-an sebagai era keemasan batik Garut. Berbeda dari batik keraton karena dikembangkan oleh pedagang dan rakyat biasa, memungkinkan lebih banyak kebebasan dalam desain dan pilihan warna.'
    },
    imageUrl: '/batik-images/batik-garutan/1.jpg',
    category: 'Regional',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Garutan'
  },
  {
    id: 'batik-gentongan',
    name: 'Batik Gentongan',
    origin: 'Madura (Tanjung Bumi)',
    meaning: {
      en: 'Named after the "gentong" (clay barrel) used for dyeing. This batik is distinct for its bold, abstract colors. It symbolizes strength, durability, and the bold character of the Madurese people. The lengthy soaking process teaches patience to achieve lasting quality.',
      id: 'Dinamai dari "gentong" (drum tanah liat) yang digunakan untuk pewarnaan. Batik ini khas karena warnanya yang berani dan abstrak. Melambangkan kekuatan, daya tahan, dan karakter berani orang Madura. Proses perendaman yang panjang mengajarkan kesabaran untuk mencapai kualitas abadi.'
    },
    history: {
      en: 'The unique Gentongan process involves soaking the cloth in a clay barrel for months to lock in the natural dyes (indigo and morinda). This ancient technique makes the colors incredibly vivid and fade-resistant, famously lasting for generations.',
      id: 'Proses Gentongan yang unik melibatkan perendaman kain dalam gentong tanah liat selama berbulan-bulan untuk mengunci pewarna alami (nila dan mengkudu). Teknik kuno ini membuat warna menjadi sangat hidup dan tahan luntur, terkenal bertahan selama beberapa generasi.'
    },
    imageUrl: '/batik-images/batik-gentongan/1.jpg',
    category: 'Technique',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Madura'
  },
  {
    id: 'batik-ikat_celup',
    name: 'Batik Ikat Celup / Sasirangan',
    origin: 'South Kalimantan / Nusantara',
    meaning: {
      en: 'Often confused with simple tie-dye, traditional Ikat Celup (like Sasirangan) has deep medicinal and protective meanings. The specific colors (yellow for jaundice, green for paralysis) were traditionally believed to cure illnesses and ward off evil spirits.',
      id: 'Sering disamakan dengan tie-dye sederhana, Ikat Celup tradisional (seperti Sasirangan) memiliki makna pengobatan dan perlindungan yang mendalam. Warna-warna tertentu (kuning untuk penyakit kuning, hijau untuk kelumpuhan) secara tradisional dipercaya dapat menyembuhkan penyakit dan menangkal roh jahat.'
    },
    history: {
      en: 'In South Kalimantan, fabrics like Sasirangan were originally "Pamatan" (to heal). Shaman would prescribe specific patterns and colors. Today, it has evolved from a healing cloth into a fashion symbol of Banjar identity.',
      id: 'Di Kalimantan Selatan, kain seperti Sasirangan awalnya adalah "Pamatan" (untuk menyembuhkan). Dukun akan meresepkan pola dan warna tertentu. Hari ini, telah berevolusi dari kain penyembuhan menjadi simbol mode identitas Banjar.'
    },
    imageUrl: '/batik-images/batik-ikat_celup/hf_git_1274_Ikat_Celup43.jpg',
    category: 'Technique',
    referenceUrl: 'https://id.wikipedia.org/wiki/Kain_Sasirangan'
  },
  {
    id: 'batik-jakarta_ondel_ondel',
    name: 'Batik Ondel-Ondel',
    origin: 'Jakarta',
    meaning: {
      en: 'Ondel-ondel are the giant puppet guardians of Jakarta. In batik, they symbolize protection against disaster and bad luck. The pattern celebrates the joy, festivity, and welcoming spirit of the indigenous Betawi culture of Jakarta.',
      id: 'Ondel-ondel adalah boneka raksasa penjaga Jakarta. Dalam batik, mereka melambangkan perlindungan dari bencana dan nasib buruk. Pola ini merayakan kegembiraan, kemeriahan, dan semangat ramah budaya asli Betawi Jakarta.'
    },
    history: {
      en: 'A modern batik motif popularized to preserve Betawi arts. Ondel-ondel figures, which used to be scary village guardians, have been transformed into cheerful icons of the capital city.',
      id: 'Motif batik modern yang dipopulerkan untuk melestarikan kesenian Betawi. Sosok ondel-ondel yang dulunya adalah penjaga desa yang menakutkan, telah diubah menjadi ikon ceria ibu kota.'
    },
    imageUrl: '/batik-images/batik-jakarta_ondel_ondel/hf_git_1576_Jakarta_Ondel_Ondel36.jpg',
    category: 'Cultural',
    referenceUrl: 'https://id.wikipedia.org/wiki/Ondel-ondel'
  },
  {
    id: 'batik-jawa_barat_megamendung',
    name: 'Batik Megamendung',
    origin: 'Cirebon',
    meaning: {
      en: 'Megamendung means "Cloudy Skies". The motif depicts seven gradations of color, representing the seven layers of the sky in Sufism. It symbolizes patience, emotional control, and the leader\'s duty to provide shelter (rain) to the people. A leader should be cool and calm like a cloud, not angry like thunder.',
      id: 'Megamendung berarti "Langit Berawan". Motif ini menggambarkan tujuh gradasi warna, mewakili tujuh lapisan langit dalam tasawuf. Melambangkan kesabaran, pengendalian emosi, dan kewajiban pemimpin untuk memberikan perlindungan (hujan) kepada rakyat. Seorang pemimpin harus sejuk dan tenang seperti awan, tidak marah seperti petir.'
    },
    history: {
      en: 'Created by Prince Cakrabuana of Cirebon in the 16th century, heavily influenced by Chinese porcelain art brought by traders. However, unlike Chinese circular clouds, Cirebon clouds are triangular, reflecting the shape of mountains in Java.',
      id: 'Diciptakan oleh Pangeran Cakrabuana dari Cirebon pada abad ke-16, sangat dipengaruhi oleh seni porselen Cina yang dibawa oleh pedagang. Namun, tidak seperti awan melingkar Cina, awan Cirebon berbentuk segitiga, mencerminkan bentuk pegunungan di Jawa.'
    },
    imageUrl: '/batik-images/batik-jawa_barat_megamendung/hf_git_330_Jawa_Barat_Megamendung125.jpg',
    category: 'Nature',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Megamendung'
  },
  {
    id: 'batik-jawa_timur_pring',
    name: 'Batik Pring Sedapur',
    origin: 'Magetan (East Java)',
    meaning: {
      en: 'Depicts a clump of bamboo (pring sedapur). Bamboo symbolizes resilience—it bends with the wind but does not break. It also represents community strength; bamboo grows in clumps, supporting one another. It teaches us to stay strong together and useful in all aspects of life.',
      id: 'Menggambarkan serumpun bambu (pring sedapur). Bambu melambangkan ketahanan—ia membungkuk mengikuti angin tetapi tidak patah. Juga mewakili kekuatan komunitas; bambu tumbuh dalam rumpun, saling mendukung. Mengajarkan kita untuk tetap kuat bersama dan berguna dalam segala aspek kehidupan.'
    },
    history: {
      en: 'Originating from the village of Sidomukti in Magetan. The bamboo motif is inspired by the bamboo forests surrounding the village. It is a symbol of the simple, harmonious rural life of East Java.',
      id: 'Berasal dari desa Sidomukti di Magetan. Motif bambu terinspirasi oleh hutan bambu yang mengelilingi desa. Merupakan simbol kehidupan pedesaan Jawa Timur yang sederhana dan harmonis.'
    },
    imageUrl: '/batik-images/batik-jawa_timur_pring/hf_git_1873_Jawa_Timur_Pring14.jpg',
    category: 'Nature',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Pring_Sedapur'
  },
  {
    id: 'batik-kalimantan_dayak',
    name: 'Batik Dayak (Batang Garing)',
    origin: 'Central Kalimantan',
    meaning: {
      en: 'Often features the "Batang Garing" or Tree of Life. It symbolizes the connection between the Upper World (Deities), Middle World (Humans), and Lower World (Water/Dragon). It teaches balance, the cycle of life, and the connection between humans and the divine.',
      id: 'Sering menampilkan "Batang Garing" atau Pohon Kehidupan. Melambangkan hubungan antara Dunia Atas (Dewa), Dunia Tengah (Manusia), dan Dunia Bawah (Air/Naga). Mengajarkan keseimbangan, siklus kehidupan, dan hubungan antara manusia dan ilahi.'
    },
    history: {
      en: 'Dayak patterns were originally created through beadwork and tattoos. Translating these sacred tribal designs onto batik fabric allows the Dayak philosophy to be preserved and worn as modern clothing while honoring ancestral spirits.',
      id: 'Pola Dayak awalnya dibuat melalui manik-manik dan tato. Menerjemahkan desain suku suci ini ke kain batik memungkinkan filosofi Dayak dilestarikan dan dikenakan sebagai pakaian modern sambil menghormati roh leluhur.'
    },
    imageUrl: '/batik-images/batik-kalimantan_dayak/hf_git_1000_Kalimantan_Dayak26.jpg',
    category: 'Tribal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Suku_Dayak'
  },
  {
    id: 'kawung',
    name: 'Batik Kawung',
    origin: 'Yogyakarta',
    meaning: {
      en: 'One of the oldest forbidden patterns (Larangan). It depicts the cross-section of the Areca palm fruit (Kolang-Kaling). The four lobes represent the four cardinal directions with the center as the source of power (sedulur papat lima pancer). It symbolizes purity, honesty, and the ideal conscience of a leader.',
      id: 'Salah satu pola larangan tertua. Menggambarkan penampang buah aren (Kolang-Kaling). Empat lobus mewakili empat arah mata angin dengan pusat sebagai sumber kekuatan (sedulur papat lima pancer). Melambangkan kemurnian, kejujuran, dan hati nurani ideal seorang pemimpin.'
    },
    history: {
      en: 'Dating back to the 13th century Majapahit era. Historically, it was reserved for the Sultan and his family. The geometric perfection represents the controlled and orderly conduct expected of royalty.',
      id: 'Berasal dari era Majapahit abad ke-13. Secara historis, dicadangkan untuk Sultan dan keluarganya. Kesempurnaan geometris mewakili perilaku terkendali dan tertib yang diharapkan dari bangsawan.'
    },
    imageUrl: '/batik-images/batik-kawung/1.jpg',
    category: 'Royal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Kawung'
  },
  {
    id: 'batik-keraton',
    name: 'Batik Keraton (Classic)',
    origin: 'Yogyakarta / Solo',
    meaning: {
      en: 'Refers to the classical patterns developed within the Royal Courts (Keraton). They are characterized by soga (brown) colors and strict geometric/symbolic rules. These batiks are visual prayers, bringing serenity, dignity, and spiritual wisdom to the wearer.',
      id: 'Mengacu pada pola klasik yang dikembangkan di dalam Keraton. Dicirikan oleh warna soga (coklat) dan aturan geometris/simbolis yang ketat. Batik ini adalah doa visual, membawa ketenangan, martabat, dan kebijaksanaan spiritual bagi pemakainya.'
    },
    history: {
      en: 'For centuries, batik art was a form of meditation for royal women. The intricate dots and lines were drawn with deep concentration and prayer, infusing the cloth with spiritual power. Commoners were forbidden from wearing certain Keraton patterns.',
      id: 'Selama berabad-abad, seni batik adalah bentuk meditasi bagi wanita kerajaan. Titik-titik dan garis-garis rumit digambar dengan konsentrasi dan doa yang dalam, menanamkan kekuatan spiritual pada kain. Rakyat jelata dilarang mengenakan pola Keraton tertentu.'
    },
    imageUrl: '/batik-images/batik-keraton/1.jpg',
    category: 'Royal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Keraton'
  },
  {
    id: 'batik-lampung_gajah',
    name: 'Batik Lampung (Elephant)',
    origin: 'Lampung',
    meaning: {
      en: 'The Elephant is the icon of Lampung (Way Kambas). It symbolizes tremendous strength, wisdom, and loyalty. In local culture, the elephant is respected as a vehicle of kings and a guardian of the forest. The motif teaches leadership and protecting the weak.',
      id: 'Gajah adalah ikon Lampung (Way Kambas). Melambangkan kekuatan luar biasa, kebijaksanaan, dan kesetiaan. Dalam budaya lokal, gajah dihormati sebagai kendaraan raja dan penjaga hutan. Motif ini mengajarkan kepemimpinan dan melindungi yang lemah.'
    },
    history: {
      en: 'While Lampung is famous for Tapis (woven gold thread), batik was introduced to broaden the textile tradition. The elephant motif serves as a modern regional identity maker for the people of Lampung.',
      id: 'Sementara Lampung terkenal dengan Tapis (benang emas tenun), batik diperkenalkan untuk memperluas tradisi tekstil. Motif gajah berfungsi sebagai penanda identitas regional modern bagi masyarakat Lampung.'
    },
    imageUrl: '/batik-images/batik-lampung_gajah/hf_git_0_Lampung_Gajah26.jpg',
    category: 'Animal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Lampung'
  },
  {
    id: 'batik-lasem',
    name: 'Batik Lasem (Tiga Negeri)',
    origin: 'Rembang (Central Java)',
    meaning: {
      en: 'Known as "Batik Tiga Negeri" (Three Realms) because it combines colors from three regions: Red (Lasem/China), Blue (Pekalongan/Dutch), and Brown (Solo/Java). It symbolizes the beautiful assimilation of Chinese and Javanese cultures—a message of tolerance and harmony.',
      id: 'Dikenal sebagai "Batik Tiga Negeri" karena menggabungkan warna dari tiga daerah: Merah (Lasem/Cina), Biru (Pekalongan/Belanda), dan Coklat (Solo/Jawa). Melambangkan asimilasi indah budaya Cina dan Jawa—pesan toleransi dan harmoni.'
    },
    history: {
      en: 'Lasem is called "Little China". In the 15th century, Cheng Ho\'s fleet landed here. The unique output is the "Blood Chicken Red" (Abang Getih Pitik) color which cannot be replicated elsewhere due to the unique minerals in Lasem\'s water.',
      id: 'Lasem disebut "Tiongkok Kecil". Pada abad ke-15, armada Cheng Ho mendarat di sini. Output uniknya adalah warna "Merah Darah Ayam" (Abang Getih Pitik) yang tidak dapat ditiru di tempat lain karena mineral unik dalam air Lasem.'
    },
    imageUrl: '/batik-images/batik-lasem/1.jpg',
    category: 'Cultural',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Lasem'
  },
  {
    id: 'batik-madura_mataketeran',
    name: 'Batik Madura (Mata Keteran)',
    origin: 'Madura',
    meaning: {
      en: 'The "Perkutut Eye" pattern. It depicts the eye of a turtledove. It is believed to heighten the wearer\'s intuition and awareness. Madurese batik is characteristically bold and expressive, reflecting the straightforward and brave character of the islanders.',
      id: 'Pola "Mata Perkutut". Ini menggambarkan mata burung perkutut. Dipercaya dapat meningkatkan intuisi dan kewaspadaan pemakainya. Batik Madura secara karakteristik berani dan ekspresif, mencerminkan karakter lugas dan berani penduduk pulau tersebut.'
    },
    history: {
      en: 'Madura has a strong tradition of bold coastal batik. The Mata Keteran motif is a classic design found in the everyday wear of Madurese women, celebrating the local love for keeping turtledoves.',
      id: 'Madura memiliki tradisi kuat batik pesisir yang berani. Motif Mata Keteran adalah desain klasik yang ditemukan dalam pakaian sehari-hari wanita Madura, merayakan kecintaan lokal memelihara burung perkutut.'
    },
    imageUrl: '/batik-images/batik-madura_mataketeran/hf_git_2396_Madura_Mataketeran42.jpg',
    category: 'Regional',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Madura'
  },
  {
    id: 'batik-maluku_pala',
    name: 'Batik Maluku Pala (Nutmeg)',
    origin: 'Maluku',
    meaning: {
      en: 'Depicts the Nutmeg fruit (Pala), the "Gold of the East". It symbolizes the natural wealth and historical significance of the Spice Islands. It teaches gratitude for nature\'s abundance and remembrance of the region\'s pivotal role in world history.',
      id: 'Menggambarkan buah Pala, "Emas dari Timur". Melambangkan kekayaan alam dan signifikansi historis Kepulauan Rempah. Mengajarkan rasa syukur atas kelimpahan alam dan mengingat peran penting wilayah tersebut dalam sejarah dunia.'
    },
    history: {
      en: 'Maluku is the legendary Spice Island. While batik is not native to Maluku, this motif was developed to tell the history of the spice trade that once drew explorers from all over the world to these islands.',
      id: 'Maluku adalah Pulau Rempah yang legendaris. Meskipun batik bukan asli Maluku, motif ini dikembangkan untuk menceritakan sejarah perdagangan rempah yang pernah menarik penjelajah dari seluruh dunia ke pulau-pulau ini.'
    },
    imageUrl: '/batik-images/batik-maluku_pala/hf_git_598_Maluku_Pala46.jpg',
    category: 'Heritage',
    referenceUrl: 'https://id.wikipedia.org/wiki/Kepulauan_Maluku'
  },
  {
    id: 'mega-mendung',
    name: 'Mega Mendung',
    origin: 'Cirebon',
    meaning: {
      en: 'The Iconic Cloud pattern of Cirebon. It symbolizes the upper world, expansive and boundless. The distinct triangular shape of the clouds (unlike Chinese rounded clouds) represents the masculine energy and the mountains of Java. It teaches emotional stability—staying cool in any situation.',
      id: 'Pola Awan Ikonik dari Cirebon. Melambangkan dunia atas, luas dan tak terbatas. Bentuk segitiga awan yang khas (tidak seperti awan melingkar Cina) mewakili energi maskulin dan pegunungan Jawa. Mengajarkan stabilitas emosi—tetap tenang dalam situasi apa pun.'
    },
    history: {
      en: 'Introduced in the 16th century via Chinese trade and marriage alliances with the Cirebon Sultanate. The gradations of color originally numbered 7, representing the 7 layers of heaven.',
      id: 'Diperkenalkan pada abad ke-16 melalui perdagangan Cina dan aliansi pernikahan dengan Kesultanan Cirebon. Gradasi warna awalnya berjumlah 7, mewakili 7 lapisan langit.'
    },
    imageUrl: '/batik-images/batik-megamendung/1.jpg',
    category: 'Nature',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Megamendung'
  },
  {
    id: 'batik-ntb_lumbung',
    name: 'Batik NTB (Lumbung)',
    origin: 'Nusa Tenggara Barat',
    meaning: {
      en: 'Features the "Lumbung" (Traditional Rice Barn) or "Uma Lengge". It symbolizes food security, thriftiness, and prosperity. It teaches the value of saving for the future and respecting the harvest as a blessing from God.',
      id: 'Menampilkan "Lumbung" (Gudang Beras Tradisional) atau "Uma Lengge". Melambangkan ketahanan pangan, hemat, dan kemakmuran. Mengajarkan nilai menabung untuk masa depan dan menghormati panen sebagai berkah dari Tuhan.'
    },
    history: {
      en: 'Based on the traditional Sasak and Bima architecture. The rice barn is the center of agricultural life in NTB, and its depiction on fabric is a prayer for continuous welfare.',
      id: 'Berdasarkan arsitektur tradisional Sasak dan Bima. Lumbung adalah pusat kehidupan pertanian di NTB, dan penggambarannya pada kain adalah doa untuk kesejahteraan yang berkelanjutan.'
    },
    imageUrl: '/batik-images/batik-ntb_lumbung/hf_git_1913_NTB_Lumbung80.jpg',
    category: 'Architecture',
    referenceUrl: 'https://id.wikipedia.org/wiki/Lumbung'
  },
  {
    id: 'batik-papua_asmat',
    name: 'Batik Asmat',
    origin: 'Papua',
    meaning: {
      en: 'Inspired by the world-famous woodcarvings of the Asmat tribe. The stylized human figures and totems represent respect for ancestors and the connection between the living and the spirit world. It symbolizes courage and tribal identity.',
      id: 'Terinspirasi oleh ukiran kayu suku Asmat yang terkenal di dunia. Sosok manusia dan totem yang digayakan mewakili penghormatan kepada leluhur dan hubungan antara yang hidup dan dunia roh. Melambangkan keberanian dan identitas suku.'
    },
    history: {
      en: 'The Asmat people are renowned for their intricate wood carving. This batik motif translates those 3D carvings into 2D textile art, preserving the visual language of one of Papua\'s most prominent tribes.',
      id: 'Suku Asmat terkenal dengan ukiran kayunya yang rumit. Motif batik ini menerjemahkan ukiran 3D tersebut menjadi seni tekstil 2D, melestarikan bahasa visual salah satu suku paling menonjol di Papua.'
    },
    imageUrl: '/batik-images/batik-papua_asmat/hf_git_100_Papua_Asmat11.jpg',
    category: 'Tribal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Suku_Asmat'
  },
  {
    id: 'batik-papua_cendrawasih',
    name: 'Batik Cendrawasih',
    origin: 'Papua',
    meaning: {
      en: 'The Bird of Paradise is the symbol of ultimate beauty and freedom. In batik, it is often drawn with tail feathers originating from the mouth, symbolizing that beauty comes from truthful speech. It represents the exotic and vibrant soul of Eastern Indonesia.',
      id: 'Cendrawasih adalah simbol keindahan dan kebebasan tertinggi. Dalam batik, sering digambar dengan bulu ekor yang berasal dari mulut, melambangkan bahwa keindahan berasal dari ucapan yang jujur. Mewakili jiwa Indonesia Timur yang eksotis dan bersemangat.'
    },
    history: {
      en: 'Modern Papuan batik features bright, vibrant colors (orange, red, lush green) that mirror the untouched tropical forests of the island.',
      id: 'Batik Papua modern menampilkan warna-warna cerah dan bersemangat (oranye, merah, hijau subur) yang mencerminkan hutan tropis pulau yang belum terjamah.'
    },
    imageUrl: '/batik-images/batik-papua_cendrawasih/hf_git_2217_Papua_Cendrawasih38.jpg',
    category: 'Animal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Cenderawasih'
  },
  {
    id: 'batik-papua_tifa',
    name: 'Batik Tifa',
    origin: 'Papua',
    meaning: {
      en: 'The Tifa is the traditional drum of Papua. It symbolizes the heartbeat of the community, unity, and the rhythm of life. The sound of the Tifa gathers people for ceremonies, thus the motif represents togetherness and social harmony.',
      id: 'Tifa adalah gendang tradisional Papua. Melambangkan detak jantung komunitas, persatuan, dan irama kehidupan. Suara Tifa mengumpulkan orang-orang untuk upacara, sehingga motif ini mewakili kebersamaan dan harmoni sosial.'
    },
    history: {
      en: 'Tifa drums are sacred instruments used in traditional dances. Putting them on batik pays homage to the musical and oral traditions of the Papuan people.',
      id: 'Tifa adalah instrumumen sakral yang digunakan dalam tarian tradisional. Meletakkannya di atas batik memberi penghormatan kepada tradisi musik dan lisan orang Papua.'
    },
    imageUrl: '/batik-images/batik-papua_tifa/hf_git_1795_Papua_Tifa33.jpg',
    category: 'Musical',
    referenceUrl: 'https://id.wikipedia.org/wiki/Tifa'
  },
  {
    id: 'batik-parang',
    name: 'Batik Parang Rusak',
    origin: 'Yogyakarta / Solo',
    meaning: {
      en: 'The "Broken Machete" or "Cliff" pattern. The s-shaped interlocking lines symbolize ocean waves crashing against a cliff—never ceasing. It represents an unyielding spirit, continuous self-improvement, and the struggle for truth. It teaches the wearer to never give up.',
      id: 'Pola "Parang Rusak" atau "Tebing". Garis-garis yang saling mengunci berbentuk S melambangkan ombak laut yang menghantam tebing—tidak pernah berhenti. Mewakili semangat pantang menyerah, perbaikan diri yang berkelanjutan, dan perjuangan demi kebenaran. Mengajarkan pemakainya untuk tidak pernah menyerah.'
    },
    history: {
      en: 'Created by Sultan Agung of Mataram during meditation on the southern coast of Java. For centuries, this was a "Larangan" (Forbidden) motif, worn only by the King and crowned prince. The larger the Parang (Parang Barong), the higher the rank.',
      id: 'Diciptakan oleh Sultan Agung dari Mataram saat meditasi di pantai selatan Jawa. Selama berabad-abad, ini adalah motif "Larangan", hanya dikenakan oleh Raja dan putra mahkota. Semakin besar Parang (Parang Barong), semakin tinggi pangkatnya.'
    },
    imageUrl: '/batik-images/batik-parang/1.jpg',
    category: 'Royal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Parang'
  },
  {
    id: 'batik-pekalongan',
    name: 'Batik Pekalongan (Jlamprang)',
    origin: 'Pekalongan',
    meaning: {
      en: 'Pekalongan is the "World City of Batik". Its motifs are free, colorful, and naturalistic (buketan). They symbolize dynamism, adaptation, and joy. The Jlamprang motif (geometric dots) specifically is believed to ward off evil and represents the cosmic lotus.',
      id: 'Pekalongan adalah "Kota Batik Dunia". Motifnya bebas, penuh warna, dan naturalistik (buketan). Melambangkan dinamisme, adaptasi, dan kegembiraan. Motif Jlamprang (titik-titik geometris) secara khusus dipercaya menangkal kejahatan dan mewakili teratai kosmik.'
    },
    history: {
      en: 'As a coastal port city, Pekalongan absorbed influences from Arab, Chinese, Dutch, and Japanese traders. This resulted in "Batik Pesisir" which broke the strict rules of inland Keraton batik, using brighter colors and realistic flower/animal motifs.',
      id: 'Sebagai kota pelabuhan pesisir, Pekalongan menyerap pengaruh dari pedagang Arab, Cina, Belanda, dan Jepang. Ini menghasilkan "Batik Pesisir" yang membongkar aturan ketat batik Keraton pedalaman, menggunakan warna yang lebih cerah dan motif bunga/hewan yang realistis.'
    },
    imageUrl: '/batik-images/batik-pekalongan/1.jpg',
    category: 'Coastal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Pekalongan'
  },
  {
    id: 'batik-priangan',
    name: 'Batik Priangan',
    origin: 'Tasikmalaya / Garut',
    meaning: {
      en: 'Reflects the "Mojang Priangan" (Sundanese girls)—beautiful, graceful, and natural. The patterns often feature orchids or weeds (rereng) arranged neatly. It symbolizes modesty, natural beauty, and the serene life of the Sundanese highlands.',
      id: 'Mencerminkan "Mojang Priangan" (gadis Sunda)—cantik, anggun, dan alami. Polanya sering menampilkan anggrek atau ilalang (rereng) yang ditata rapi. Melambangkan kesederhanaan, kecantikan alami, dan kehidupan tenang di dataran tinggi Sunda.'
    },
    history: {
      en: 'Priangan batik saw a resurgence after the independence war. Many batik artisans from Central Java fled to Tasikmalaya during conflicts, merging their techniques with local Sundanese aesthetics.',
      id: 'Batik Priangan mengalami kebangkitan setelah perang kemerdekaan. Banyak pengrajin batik dari Jawa Tengah melarikan diri ke Tasikmalaya selama konflik, menggabungkan teknik mereka dengan estetika Sunda lokal.'
    },
    imageUrl: '/batik-images/batik-priangan/1.jpg',
    category: 'Regional',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Priangan'
  },
  {
    id: 'sekar-jagad',
    name: 'Sekar Jagad',
    origin: 'Yogyakarta / Solo',
    meaning: {
      en: 'Literally means "Flowers of the Universe" or "Map of the World". The pattern looks like islands or irregular patches of flowers. It symbolizes the diversity and beauty of the world. It teaches that differences, when united, create a beautiful harmony (Unity in Diversity).',
      id: 'Secara harfiah berarti "Bunga Jagad Raya" atau "Peta Dunia". Polanya terlihat seperti pulau atau petak-petak bunga yang tidak beraturan. Melambangkan keragaman dan keindahan dunia. Mengajarkan bahwa perbedaan, bila disatukan, menciptakan harmoni yang indah (Bhinneka Tunggal Ika).'
    },
    history: {
      en: 'A classic motif that is often worn at weddings by the parents of the couple. It signifies the hope that the couple\'s happiness will be as vast as the world and that they can adapt to the diverse challenges of life.',
      id: 'Motif klasik yang sering dikenakan pada pernikahan oleh orang tua mempelai. Menandakan harapan agar kebahagiaan pasangan itu seluas dunia dan bahwa mereka dapat beradaptasi dengan beragam tantangan hidup.'
    },
    imageUrl: '/batik-images/batik-sekar/1.jpg',
    category: 'Floral',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Sekar_Jagad'
  },
  {
    id: 'batik-sidoluhur',
    name: 'Batik Sido Luhur',
    origin: 'Solo',
    meaning: {
      en: '"Sido" means to become, "Luhur" means noble. This motif expresses the hope that the wearer acts with nobility, integrity, and high moral standards. It is often worn by the bride/groom or their parents, praying for a household that is respected and honorable.',
      id: '"Sido" berarti menjadi, "Luhur" berarti mulia. Motif ini mengungkapkan harapan agar pemakainya bertindak dengan kemuliaan, integritas, dan standar moral yang tinggi. Sering dikenakan oleh pengantin atau orang tua mereka, berdoa untuk rumah tangga yang dihormati dan terhormat.'
    },
    history: {
      en: 'One of the "Sido" family motifs (like Sidomukti, Sidoasih). These are considered primary ceremonial batiks in Javanese culture, heavily laden with prayers and hopes for the future.',
      id: 'Salah satu motif keluarga "Sido" (seperti Sidomukti, Sidoasih). Ini dianggap sebagai batik upacara utama dalam budaya Jawa, yang sarat dengan doa dan harapan untuk masa depan.'
    },
    imageUrl: '/batik-images/batik-sidoluhur/1.jpg',
    category: 'Spiritual',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Sido_Luhur'
  },
  {
    id: 'sidomukti',
    name: 'Batik Sido Mukti',
    origin: 'Solo',
    meaning: {
      en: '"Sido" means to become, "Mukti" means prosperous/happy. This is the ultimate wedding batik. It symbolizes the prayer for a life full of happiness, prosperity, and inner peace. It teaches that the ultimate goal of marriage is not just wealth, but spiritual contentment.',
      id: '"Sido" berarti menjadi, "Mukti" berarti makmur/bahagia. Ini adalah batik pernikahan pamungkas. Melambangkan doa untuk hidup penuh kebahagiaan, kemakmuran, dan kedamaian batin. Mengajarkan bahwa tujuan akhir pernikahan bukan hanya kekayaan, tetapi kepuasan spiritual.'
    },
    history: {
      en: 'Traditionally dyed with natural Sogan (brown) materials. Many versions exist, often incorporating enclosed motifs like butterflies (hope) or houses (shelter) within the larger geometric grid.',
      id: 'Secara tradisional diwarnai dengan bahan Sogan (coklat) alami. Banyak versi ada, seringkali menggabungkan motif tertutup seperti kupu-kupu (harapan) atau rumah (tempat berlindung) di dalam kotak geometris yang lebih besar.'
    },
    imageUrl: '/batik-images/batik-sidomukti/1.jpg',
    category: 'Wedding',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Sidomukti'
  },
  {
    id: 'batik-sogan',
    name: 'Batik Sogan',
    origin: 'Solo / Yogyakarta',
    meaning: {
      en: 'Named after the "Soga" tree bark used for the brown dye. Sogan is the quintessential classic batik. The color connects the wearer to the earth (grounding). It symbolizes humility, tradition, and the classic Javanese philosophy of "Alon-alon waton kelakon" (slowly but surely).',
      id: 'Dinamai dari kulit pohon "Soga" yang digunakan untuk pewarnaan coklat. Sogan adalah batik klasik klasik. Warnanya menghubungkan pemakainya dengan bumi (membumi). Melambangkan kerendahan hati, tradisi, dan filosofi Jawa klasik "Alon-alon waton kelakon" (pelan tapi pasti).'
    },
    history: {
      en: 'For centuries, Sogan was the only color palette available for inland batik. The specific shade of brown can actually indicate whether a batik is from Solo (golden brown) or Yogya (dark/white contrast).',
      id: 'Selama berabad-abad, Sogan adalah satu-satunya palet warna yang tersedia untuk batik pedalaman. Warna coklat tertentu sebenarnya dapat menunjukkan apakah batik itu dari Solo (coklat keemasan) atau Yogya (kontras gelap/putih).'
    },
    imageUrl: '/batik-images/batik-sogan/1.jpg',
    category: 'Natural',
    referenceUrl: 'https://www.gramedia.com/literasi/batik-sogan/'
  },
  {
    id: 'batik-solo_parang',
    name: 'Batik Solo Parang',
    origin: 'Solo',
    meaning: {
      en: 'The Solo variation of Parang is distinctively slimmer and features a darker, golden-brown (Sogan) hue compared to the bolder Yogya style. This slimness represents "Kehalusan" (refinement) and "Semu" (subtlety)—teaching that strength should be carried with grace and humility. It maintains the core Parang philosophy of unceasing self-improvement.',
      id: 'Variasi Parang Solo secara khas lebih ramping dan memiliki warna coklat keemasan (Sogan) yang lebih gelap dibandingkan gaya Yogya yang tegas. Kerampingan ini melambangkan "Kehalusan" dan "Semu" (kesamaran/tersirat)—mengajarkan bahwa kekuatan harus dibawa dengan keanggunan dan kerendahan hati. Tetap mempertahankan filosofi inti Parang tentang perbaikan diri yang tak henti-hentinya.'
    },
    history: {
      en: 'The name "Parang" comes from "Pereng" (cliff/slope). The diagonal pattern mimics the slope of a cliff. In the Solo tradition (Surakarta), the design evolved after the Gianti Treaty (1755) to be more intricate and flowy, reflecting the court\'s emphasis on refined etiquette over the warrior-like boldness of Yogyakarta.',
      id: 'Nama "Parang" berasal dari "Pereng" (tebing/lereng). Pola diagonal meniru lereng tebing. Dalam tradisi Solo (Surakarta), desain ini berevolusi setelah Perjanjian Giyanti (1755) menjadi lebih rumit dan mengalir, mencerminkan penekanan keraton pada etiket yang halus dibandingkan keberanian prajurit Yogyakarta.'
    },
    imageUrl: '/batik-images/batik-solo_parang/hf_git_2087_Solo_Parang8.jpg',
    category: 'Royal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Parang'
  },
  {
    id: 'batik-sulawesi_selatan_lontara',
    name: 'Batik Lontara',
    origin: 'South Sulawesi (Makassar)',
    meaning: {
      en: 'Features the ancient Lontara script characters arranged artistically. It symbolizes knowledge, the high literacy of the Bugis-Makassar ancestors, and the preservation of wisdom. It teaches respect for history and the power of the written word.',
      id: 'Menampilkan karakter aksara Lontara kuno yang disusun secara artistik. Melambangkan pengetahuan, literasi tinggi leluhur Bugis-Makassar, dan pelestarian kebijaksanaan. Mengajarkan penghormatan terhadap sejarah dan kekuatan kata-kata tertulis.'
    },
    history: {
      en: 'The I La Galigo epic (the longest epic in the world) was written in Lontara script. This batik is a modern homage to that immense literary heritage, often worn by intellectuals and cultural figures in Sulawesi.',
      id: 'Epik I La Galigo (epik terpanjang di dunia) ditulis dalam aksara Lontara. Batik ini adalah penghormatan modern terhadap warisan sastra yang sangat besar itu, sering dikenakan oleh para intelektual dan tokoh budaya di Sulawesi.'
    },
    imageUrl: '/batik-images/batik-sulawesi_selatan_lontara/hf_git_1715_Sulawesi_Selatan_Lontara1.jpg',
    category: 'Script',
    referenceUrl: 'https://id.wikipedia.org/wiki/Lontara'
  },
  {
    id: 'batik-sumatera_barat_rumah_minang',
    name: 'Batik Rumah Gadang',
    origin: 'West Sumatra (Padang)',
    meaning: {
      en: 'Depicts the iconic "Bagonjong" roof of the Minangkabau traditional house (**Rumah Gadang**). It symbolizes the matriarchal society of Minang, family unity, and reaching for the divine (the pointed roof). It teaches that family is the primary pillar of life.',
      id: 'Menggambarkan atap "Bagonjong" yang ikonik dari rumah adat Minangkabau (Rumah Gadang). Melambangkan masyarakat matriarkal Minang, persatuan keluarga, dan menggapai yang ilahi (atap runcing). Mengajarkan bahwa keluarga adalah pilar utama kehidupan.'
    },
    history: {
      en: 'Known as "Batik Tanah Liek" (Clay Batik), traditional Minang batik uses clay for dyeing. The architecture motif is a proud symbol of Minang identity, famously known for their wandering (merantau) culture—carrying the memory of home wherever they go.',
      id: 'Dikenal sebagai "Batik Tanah Liek", batik tradisional Minang menggunakan tanah liat untuk pewarnaan. Motif arsitektur adalah simbol kebanggaan identitas Minang, yang terkenal dengan budaya merantau mereka—membawa kenangan akan rumah ke mana pun mereka pergi.'
    },
    imageUrl: '/batik-images/batik-sumatera_barat_rumah_minang/hf_git_1341_Sumatera_Barat_Rumah_Minang36.jpg',
    category: 'Architecture',
    referenceUrl: 'https://id.wikipedia.org/wiki/Rumah_Gadang'
  },
  {
    id: 'batik-sumatera_utara_boraspati',
    name: 'Batik Boraspati (Gorga)',
    origin: 'North Sumatra',
    meaning: {
      en: 'Based on the "Gorga" woodcarvings of the Batak Toba people. The Boraspati Ni Tano (Gecko) is a deity of the earth. It symbolizes fertility, adaptable survival (like a lizard regenerating its tail), and protection of the home. It teaches resilience and connection to the land.',
      id: 'Berdasarkan ukiran kayu "Gorga" orang Batak Toba. Boraspati Ni Tano (Cicak) adalah dewa bumi. Melambangkan kesuburan, kelangsungan hidup yang mudah beradaptasi (seperti cicak yang meregenerasi ekornya), dan perlindungan rumah. Mengajarkan ketahanan dan hubungan dengan tanah.'
    },
    history: {
      en: 'Originally, Gorga was only found carved on Bolon houses in red, black, and white. This batik adapts those sacred curves and spirals into textile form, allowing the Batak cultural identity to be worn as modern attire.',
      id: 'Awalnya, Gorga hanya ditemukan terukir di rumah Bolon dalam warna merah, hitam, dan putih. Batik ini mengadaptasi lekukan dan spiral suci tersebut ke dalam bentuk tekstil, memungkinkan identitas budaya Batak dikenakan sebagai pakaian modern.'
    },
    imageUrl: '/batik-images/batik-sumatera_utara_boraspati/hf_git_746_Sumatera_Utara_Boraspati61.jpg',
    category: 'Tribal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Gorga_Batak'
  },
  {
    id: 'batik-tambal',
    name: 'Batik Tambal',
    origin: 'Yogyakarta',
    meaning: {
      en: '"Tambal" means to patch. The motif is a collage of many different batik patterns (Parang, Ceplok, etc.) arranged in a patchwork. It symbolizes healing and repair. It is believed that wearing this batik can help heal a sick person by "patching up" their energy.',
      id: '"Tambal" berarti menambal. Motifnya adalah kolase dari banyak pola batik yang berbeda (Parang, Ceplok, dll.) yang disusun seperti tambalan. Melambangkan penyembuhan dan perbaikan. Dipercaya bahwa memakai batik ini dapat membantu menyembuhkan orang sakit dengan "menambal" energi mereka.'
    },
    history: {
      en: 'Historically used as a "Selimut Obat" (Healing Blanket). When a family member was ill, they were covered with Batik Tambal in the hope that the diverse prayers contained in the multiple motifs would cure them.',
      id: 'Secara historis digunakan sebagai "Selimut Obat". Ketika anggota keluarga sakit, mereka ditutupi dengan Batik Tambal dengan harapan bahwa beragam doa yang terkandung dalam berbagai motif akan menyembuhkan mereka.'
    },
    imageUrl: '/batik-images/batik-tambal/1.jpg',
    category: 'Unity',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Tambal'
  },
  {
    id: 'batik-yogyakarta_kawung',
    name: 'Batik Yogya Kawung',
    origin: 'Yogyakarta',
    meaning: {
      en: 'The classic Yogya Kawung is stark white and dark brown/black. It symbolizes the purity of the heart (white) and the strength of structure (black). It represents the emptiness of worldly desires and focus on spiritual discipline, reflecting the ascetic values of the Yogya Sultanate.',
      id: 'Kawung Yogya klasik berwarna putih bersih dan coklat tua/hitam. Melambangkan kemurnian hati (putih) dan kekuatan struktur (hitam). Mewakili kekosongan keinginan duniawi dan fokus pada disiplin spiritual, mencerminkan nilai-nilai asketik Kesultanan Yogya.'
    },
    history: {
      en: 'The Yogyakarta style adheres strictly to the classic "Batik Keraton" guidelines established by Sultan Hamengkubuwono I. The Kawung is ubiquitous in Yogya court ceremonies and dance costumes.',
      id: 'Gaya Yogyakarta mematuhi secara ketat pedoman "Batik Keraton" klasik yang ditetapkan oleh Sultan Hamengkubuwono I. Kawung ada di mana-mana dalam upacara keraton Yogya dan kostum tari.'
    },
    imageUrl: '/batik-images/batik-yogyakarta_kawung/hf_git_2474_Yogyakarta_Kawung87.jpg',
    category: 'Royal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Kawung'
  },
  {
    id: 'batik-yogyakarta_parang',
    name: 'Batik Yogya Parang',
    origin: 'Yogyakarta',
    meaning: {
      en: 'Yogya Parang is characterized by a strong diagonal white band (Mlinjon) separating the motifs. It symbolizes the sharp distinction between right and wrong. It represents the warrior spirit, alertness, and the power of the King to enforce justice.',
      id: 'Parang Yogya dicirikan oleh pita putih diagonal yang kuat (Mlinjon) yang memisahkan motif. Melambangkan perbedaan tajam antara benar dan salah. Mewakili semangat prajurit, kewaspadaan, dan kekuatan Raja untuk menegakkan keadilan.'
    },
    history: {
      en: 'During the colonial era, this motif was a symbol of resistance. The infinite wave represents a struggle that never ends. It is the most instantly protecting pattern, often worn by guards and soldiers of the palace.',
      id: 'Pada era kolonial, motif ini adalah simbol perlawanan. Gelombang tak terbatas mewakili perjuangan yang tidak pernah berakhir. Ini adalah pola pelindung paling instan, sering dikenakan oleh penjaga dan prajurit istana.'
    },
    imageUrl: '/batik-images/batik-yogyakarta_parang/hf_git_1421_Yogyakarta_Parang19.jpg',
    category: 'Royal',
    referenceUrl: 'https://id.wikipedia.org/wiki/Batik_Parang'
  }
];
