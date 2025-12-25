export interface Batik {
  id: string;
  name: string;
  origin: string;
  meaning: string;
  history: string;
  imageUrl: string;
  category: string;
}
export const batiks: Batik[] = [
  {
    id: 'mega-mendung',
    name: 'Mega Mendung',
    origin: 'Cirebon',
    meaning: 'Symbolizes rain clouds that bring fertility and life. It also represents calmness and patience in facing life issues.',
    history: 'Influenced by Chinese merchants who brought ceramics to Cirebon. Local artisans adapted the cloud motifs into their own unique style.',
    imageUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=800',
    category: 'Nature'
  },
  {
    id: 'parang-rusak',
    name: 'Parang Rusak',
    origin: 'Solo/Yogyakarta',
    meaning: 'Represents the struggle of humans against their own desires. It symbolizes strength and resilience, like waves hitting a cliff.',
    history: 'One of the oldest motifs in Indonesia, once reserved exclusively for royalty (Batik Keraton). Created by Sultan Agung of Mataram.',
    imageUrl: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&q=80&w=800',
    category: 'Royal'
  },
  {
    id: 'kawung',
    name: 'Kawung',
    origin: 'Central Java',
    meaning: 'A geometric motif representing four palm fruits. It symbolizes wisdom, self-control, and the universe in harmony.',
    history: 'Known since the 13th century in the Majapahit era. It is said to represent the four points of the compass with the center as the source of power.',
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800',
    category: 'Geometric'
  },
  {
    id: 'tujuh-rupa',
    name: 'Sekar Jagad',
    origin: 'Pekalongan',
    meaning: 'The name means "flower of the world". It represents the beauty and diversity of the Indonesian archipelago.',
    history: 'Pekalongan batik is famous for its vibrant colors and coastal influences, often mixing diverse cultural elements into one cloth.',
    imageUrl: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=800',
    category: 'Floral'
  },
  {
    id: 'sidomukti',
    name: 'Sido Mukti',
    origin: 'Solo',
    meaning: 'The word "Sido" means to become, and "Mukti" means prosperity. It symbolizes the hope for a prosperous and happy future.',
    history: 'Usually worn by brides and grooms during traditional Javanese wedding ceremonies to wish them a life full of nobility.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    category: 'Ceremonial'
  },
  {
    id: 'truntum',
    name: 'Truntum',
    origin: 'Solo',
    meaning: 'Symbolizes blossoming love that grows back or endures. It represents unconditional love and loyalty.',
    history: 'Created by a Queen of Sunan Pakubuwana III who felt lonely. She looked at the stars and painted them on cloth, winning back the King\'s heart.',
    imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800',
    category: 'Love'
  }
];