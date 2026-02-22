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

export const quizQuestions: Record<string, QuizQuestion[]> = {
  "parang-rusak": [
    {
      question_id: "pr_001",
      motif_id: "parang-rusak",
      question_text: "What does the wave pattern in Parang Rusak symbolize?",
      options: [
        "Ocean waves and water elements",
        "The struggle against evil forces", 
        "Mountains and hills",
        "Floral patterns and nature"
      ],
      correct_answer: "B",
      explanation: "Parang Rusak's diagonal wave-like pattern symbolizes the struggle against evil forces and the human effort to maintain goodness and morality in life.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "pr_002", 
      motif_id: "parang-rusak",
      question_text: "Which royal family first used this motif?",
      options: [
        "Mangkunegara",
        "Pakubuwono", 
        "Hamengkubuwono",
        "Sultan Agung"
      ],
      correct_answer: "C",
      explanation: "Parang Rusak was traditionally reserved for the Sultan of Yogyakarta (Hamengkubuwono dynasty) and could not be worn by commoners.",
      difficulty: 3,
      xp_reward: 30
    },
    {
      question_id: "pr_003",
      motif_id: "parang-rusak", 
      question_text: "What is the traditional meaning of the diagonal lines?",
      options: [
        "Lightning and power",
        "Rivers and streams",
        "The unbroken continuity of life",
        "Mountain ridges"
      ],
      correct_answer: "C",
      explanation: "The diagonal lines in Parang Rusak represent the unbroken continuity of life, symbolizing the flow of human existence and the struggle to maintain goodness.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "pr_004",
      motif_id: "parang-rusak",
      question_text: "When was this pattern believed to be created?",
      options: [
        "1200s",
        "1500s",
        "1700s", 
        "1900s"
      ],
      correct_answer: "B",
      explanation: "Parang Rusak dates back to the 1500s during the Mataram Sultanate period, making it one of the oldest and most sacred batik motifs.",
      difficulty: 3,
      xp_reward: 25
    },
    {
      question_id: "pr_005",
      motif_id: "parang-rusak",
      question_text: "What occasions is this motif appropriate for?",
      options: [
        "Daily casual wear",
        "Weddings and royal ceremonies",
        "Funeral rites",
        "Farming activities"
      ],
      correct_answer: "B",
      explanation: "Due to its sacred status, Parang Rusak is traditionally reserved for important ceremonies, weddings, and royal occasions. It was forbidden for everyday wear.",
      difficulty: 2,
      xp_reward: 20
    }
  ],
  
  "kawung": [
    {
      question_id: "kw_001",
      motif_id: "kawung",
      question_text: "What shape is the basic element in Kawung motif?",
      options: [
        "Circular with four lobes",
        "Square with corners",
        "Triangular pattern",
        "Oval shape"
      ],
      correct_answer: "A",
      explanation: "The Kawung motif features a circular shape divided into four parts or lobes, resembling the kawung palm fruit cross-section.",
      difficulty: 1,
      xp_reward: 15
    },
    {
      question_id: "kw_002",
      motif_id: "kawung",
      question_text: "What does the Kawung motif symbolize?",
      options: [
        "Wealth and prosperity",
        "Power and authority",
        "Purity and perfection",
        "Wisdom and knowledge"
      ],
      correct_answer: "C",
      explanation: "Kawung symbolizes purity, perfection, and sacredness. The four parts represent the four cardinal directions and the four elements of nature.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "kw_003",
      motif_id: "kawung",
      question_text: "Which natural fruit inspired this pattern?",
      options: [
        "Coconut",
        "Kawung palm (sugar palm)",
        "Durian",
        "Mango"
      ],
      correct_answer: "B",
      explanation: "The Kawung motif is inspired by the kawung or sugar palm fruit, which has a distinctive cross-section with four lobes.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "kw_004",
      motif_id: "kawung",
      question_text: "Who was traditionally allowed to wear Kawung?",
      options: [
        "Only the Sultan",
        "Royal family and nobility",
        "All social classes",
        "Only priests"
      ],
      correct_answer: "B",
      explanation: "Unlike Parang Rusak, Kawung could be worn by royal family members and nobility, making it more accessible while still maintaining its prestigious status.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "kw_005",
      motif_id: "kawung",
      question_text: "What philosophical concept does Kawung represent?",
      options: [
        "The cycle of life and death",
        "The four human virtues",
        "The unity of body and soul",
        "The balance of nature"
      ],
      correct_answer: "B",
      explanation: "Kawung represents the four cardinal human virtues: wisdom, nobility, strength, and justice, symbolized by the four lobes of the pattern.",
      difficulty: 3,
      xp_reward: 25
    }
  ],

  "ceplok": [
    {
      question_id: "cp_001",
      motif_id: "ceplok",
      question_text: "What type of pattern is Ceplok?",
      options: [
        "Geometric with squares and circles",
        "Organic floral pattern",
        "Diagonal wave pattern",
        "Abstract irregular shapes"
      ],
      correct_answer: "A",
      explanation: "Ceplok is a geometric pattern featuring squares, circles, stars, and other regular shapes arranged in a repetitive pattern.",
      difficulty: 1,
      xp_reward: 15
    },
    {
      question_id: "cp_002",
      motif_id: "ceplok",
      question_text: "What does 'Ceplok' mean in Javanese?",
      options: [
        "Beautiful",
        "Square or block",
        "Pattern",
        "Sacred"
      ],
      correct_answer: "B",
      explanation: "The word 'Ceplok' comes from Javanese meaning square or block, referring to the geometric nature of the pattern.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "cp_003",
      motif_id: "ceplok",
      question_text: "Which shapes are commonly found in Ceplok patterns?",
      options: [
        "Only circles",
        "Squares, circles, stars, and flowers",
        "Triangles and diamonds",
        "Wavy lines and curves"
      ],
      correct_answer: "B",
      explanation: "Ceplok patterns incorporate various geometric shapes including squares, circles, stars, and stylized flowers arranged in symmetrical patterns.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "cp_004",
      motif_id: "ceplok",
      question_text: "What does Ceplok symbolize?",
      options: [
        "Social harmony and order",
        "Individual freedom",
        "Natural chaos",
        "Military power"
      ],
      correct_answer: "A",
      explanation: "Ceplok represents social harmony, order, and the structured nature of society. The geometric patterns symbolize balance and cosmic order.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "cp_005",
      motif_id: "ceplok",
      question_text: "How is Ceplok different from other batik motifs?",
      options: [
        "It's purely geometric",
        "It uses only natural dyes",
        "It's only for casual wear",
        "It comes from outside Java"
      ],
      correct_answer: "A",
      explanation: "Unlike organic motifs like Semen or Mega Mendung, Ceplok is characterized by its purely geometric and structured patterns.",
      difficulty: 3,
      xp_reward: 25
    }
  ],

  "mega-mendung": [
    {
      question_id: "mm_001",
      motif_id: "mega-mendung",
      question_text: "Where does Mega Mendung originate from?",
      options: [
        "Yogyakarta",
        "Solo (Surakarta)",
        "Cirebon",
        "Pekalongan"
      ],
      correct_answer: "C",
      explanation: "Mega Mendung is a signature motif from Cirebon, West Java, influenced by Chinese and Islamic cultural elements.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "mm_002",
      motif_id: "mega-mendung",
      question_text: "What does 'Mega Mendung' literally mean?",
      options: [
        "Dark clouds",
        "Rainy season",
        "Stormy weather",
        "Sky patterns"
      ],
      correct_answer: "A",
      explanation: "Mega Mendung literally means 'dark clouds' or 'overcast sky', representing clouds that bring rain and life.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "mm_003",
      motif_id: "mega-mendung",
      question_text: "What cultural influences shaped Mega Mendung?",
      options: [
        "Only Javanese culture",
        "Chinese and Islamic influences",
        "European colonial art",
        "Indian Hindu patterns"
      ],
      correct_answer: "B",
      explanation: "Mega Mendung shows strong Chinese cloud motifs combined with Islamic philosophical elements, reflecting Cirebon's multicultural history.",
      difficulty: 3,
      xp_reward: 25
    },
    {
      question_id: "mm_004",
      motif_id: "mega-mendung",
      question_text: "How are the cloud shapes arranged?",
      options: [
        "Random pattern",
        "Horizontal rows with decreasing size",
        "Vertical columns",
        "Circular arrangement"
      ],
      correct_answer: "B",
      explanation: "The clouds are arranged in horizontal rows, with each row having smaller clouds than the one above it, creating a perspective effect.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "mm_005",
      motif_id: "mega-mendung",
      question_text: "What philosophical meaning does Mega Mendung carry?",
      options: [
        "Power and authority",
        "Life's journey and transcendence",
        "Fertility and abundance",
        "Protection and safety"
      ],
      correct_answer: "B",
      explanation: "Mega Mendung symbolizes the human journey from worldly desires to spiritual transcendence, with clouds representing the veil between material and spiritual realms.",
      difficulty: 3,
      xp_reward: 25
    }
  ],

  "general": [
    {
      question_id: "gen_001",
      motif_id: "general",
      question_text: "What is the traditional tool used for applying wax in batik making?",
      options: [
        "Brush",
        "Canting",
        "Stamp",
        "Roller"
      ],
      correct_answer: "B",
      explanation: "The canting is a traditional Javanese tool with a small copper reservoir and bamboo handle used to apply hot wax in fine lines.",
      difficulty: 1,
      xp_reward: 15
    },
    {
      question_id: "gen_002",
      motif_id: "general",
      question_text: "Which UNESCO status did Indonesian batik receive?",
      options: [
        "Natural Heritage Site",
        "Intangible Cultural Heritage",
        "World Heritage Site",
        "Memory of the World"
      ],
      correct_answer: "B",
      explanation: "In 2009, UNESCO recognized Indonesian batik as a Masterpiece of Oral and Intangible Heritage of Humanity.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "gen_003",
      motif_id: "general",
      question_text: "What is the purpose of wax in the batik process?",
      options: [
        "To color the fabric",
        "To resist dye and create patterns",
        "To soften the fabric",
        "To preserve the fabric"
      ],
      correct_answer: "B",
      explanation: "Wax acts as a resist, preventing dye from penetrating certain areas of the fabric, thus creating the desired pattern.",
      difficulty: 2,
      xp_reward: 20
    },
    {
      question_id: "gen_004",
      motif_id: "general",
      question_text: "Which natural dye produces the traditional brown color in batik?",
      options: [
        "Tea leaves",
        "Coffee beans",
        "Soga bark",
        "Cinnamon"
      ],
      correct_answer: "C",
      explanation: "The traditional brown color comes from the bark of the soga tree (Peltophorum pterocarpum), which has been used for centuries in Javanese batik.",
      difficulty: 3,
      xp_reward: 25
    },
    {
      question_id: "gen_005",
      motif_id: "general",
      question_text: "How many main batik style regions are there in Java?",
      options: [
        "2",
        "3",
        "4",
        "5"
      ],
      correct_answer: "B",
      explanation: "There are three main batik styles in Java: Coastal (pesisir) with vibrant colors and foreign influences, Inland (keraton) with traditional colors and royal patterns, and the inland styles of Yogyakarta and Solo.",
      difficulty: 3,
      xp_reward: 25
    }
  ]
};

export const getQuizQuestions = (motifId?: string): QuizQuestion[] => {
  if (motifId && quizQuestions[motifId]) {
    return quizQuestions[motifId];
  }
  return quizQuestions.general;
};

export const getAllMotifIds = (): string[] => {
  return Object.keys(quizQuestions).filter(id => id !== 'general');
};
