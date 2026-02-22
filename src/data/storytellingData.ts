export interface TimelineEvent {
  year: string;
  era: string;
  title: string;
  description: string;
  image_url?: string;
  fun_fact?: string;
}

export interface SymbolElement {
  element_id: string;
  name: string;
  position: { x: number; y: number };
  icon: string;
  meaning: string;
  cultural_context: string;
  detail_image?: string;
}

export interface UsageImage {
  url: string;
  caption: string;
  category: string;
}

export interface StorytellingData {
  motif_id: string;
  story_intro: string;
  timeline_events: TimelineEvent[];
  symbolism_elements: SymbolElement[];
  modern_usage_images: UsageImage[];
  traditional_usage_images: UsageImage[];
}

export const storytellingData: Record<string, StorytellingData> = {
  "parang-rusak": {
    motif_id: "parang-rusak",
    story_intro: "Imagine standing in the royal courts of 17th century Java, where the Sultan himself contemplates the eternal struggle between good and evil. The Parang Rusak motif emerges from this meditation, its diagonal waves representing the unbroken spirit of a warrior who must constantly guard against the forces of chaos.",
    timeline_events: [
      {
        year: "1613",
        era: "Pre-Colonial",
        title: "Royal Birth",
        description: "Sultan Agung of Mataram creates Parang Rusak during deep meditation, envisioning the diagonal pattern as a visual representation of a warrior's unwavering resolve in protecting the kingdom and maintaining moral order.",
        image_url: "/images/timeline/parang-royal-court.jpg",
        fun_fact: "Only the Sultan and his immediate family were permitted to wear this sacred pattern."
      },
      {
        year: "1755",
        era: "Colonial", 
        title: "Dutch Restriction",
        description: "Dutch colonial authorities recognize the pattern's power and restrict its use, attempting to control Javanese cultural identity by limiting access to traditional motifs like Parang Rusak.",
        image_url: "/images/timeline/parang-colonial.jpg",
        fun_fact: "The pattern becomes a symbol of resistance and cultural preservation."
      },
      {
        year: "1945",
        era: "Independence",
        title: "National Symbol",
        description: "With Indonesia's independence, Parang Rusak transforms from royal privilege to national heritage, representing the Indonesian people's struggle for freedom and their unbreakable spirit.",
        image_url: "/images/timeline/parang-independence.jpg",
        fun_fact: "The motif appears on Indonesian currency and official state documents."
      },
      {
        year: "2009",
        era: "Modern",
        title: "UNESCO Recognition",
        description: "UNESCO recognizes Indonesian batik as Intangible Cultural Heritage, with Parang Rusak highlighted as a masterpiece of human creativity and cultural wisdom that continues to inspire contemporary designers.",
        image_url: "/images/timeline/parang-unesco.jpg",
        fun_fact: "Modern fashion houses like Versace have incorporated Parang Rusak in their collections."
      }
    ],
    symbolism_elements: [
      {
        element_id: "diagonal_lines",
        name: "Diagonal Lines",
        position: { x: 25, y: 30 },
        icon: "⚔️",
        meaning: "The diagonal lines represent the unbroken spirit and determination of a warrior. They symbolize the direct path one must follow in life, never deviating from truth and duty.",
        cultural_context: "In Javanese philosophy, diagonal lines are seen as the cosmic stairway connecting heaven and earth, representing the journey of human life and spiritual ascent.",
        detail_image: "/images/symbols/diagonal-detail.jpg"
      },
      {
        element_id: "wave_pattern",
        name: "Wave Pattern",
        position: { x: 50, y: 50 },
        icon: "🌊",
        meaning: "The wave elements symbolize the eternal struggle against evil forces, much like waves constantly crashing against the shore but never ceasing their motion.",
        cultural_context: "In Javanese cosmology, waves represent the life force that continuously tests human resilience while providing the power to overcome obstacles.",
        detail_image: "/images/symbols/wave-detail.jpg"
      },
      {
        element_id: "saw_teeth",
        name: "Saw Teeth",
        position: { x: 75, y: 70 },
        icon: "🦈",
        meaning: "The jagged edges represent the sharp, decisive action needed to cut through deception and evil, protecting the wearer with spiritual armor.",
        cultural_context: "These elements are believed to provide magical protection against negative forces and enhance the wearer's spiritual strength.",
        detail_image: "/images/symbols/saw-detail.jpg"
      }
    ],
    modern_usage_images: [
      {
        url: "/images/usage/modern/parang-fashion.jpg",
        caption: "Contemporary fashion designer incorporates Parang Rusak into evening wear, blending traditional patterns with modern silhouettes.",
        category: "High Fashion"
      },
      {
        url: "/images/usage/modern/parang-corporate.jpg",
        caption: "Modern corporate uniforms feature subtle Parang Rusak accents, connecting Indonesian heritage with professional identity.",
        category: "Corporate"
      },
      {
        url: "/images/usage/modern/parang-accessories.jpg",
        caption: "Luxury accessories use Parang Rusak patterns to create statement pieces that honor traditional craftsmanship.",
        category: "Accessories"
      }
    ],
    traditional_usage_images: [
      {
        url: "/images/usage/traditional/parang-ceremonial.jpg",
        caption: "Royal court ceremonies feature nobles wearing full Parang Rusak attire, signifying high status and spiritual authority.",
        category: "Royal Ceremony"
      },
      {
        url: "/images/usage/traditional/parang-wedding.jpg",
        caption: "Traditional Javanese weddings incorporate Parang Rusak in bridal attire, symbolizing the couple's strength and unity.",
        category: "Wedding"
      },
      {
        url: "/images/usage/traditional/parang-dance.jpg",
        caption: "Court dancers wear Parang Rusak costumes, with the pattern flowing with their movements to tell stories of valor.",
        category: "Traditional Dance"
      }
    ]
  },

  "kawung": {
    motif_id: "kawung",
    story_intro: "Picture yourself in a Javanese village square, where artisans sit cross-legged on the floor, their hands moving with practiced grace as they create the Kawung motif. This simple geometric pattern, inspired by the cross-section of the sugar palm fruit, represents the four cardinal directions and the harmony of universal order.",
    timeline_events: [
      {
        year: "1300s",
        era: "Pre-Colonial",
        title: "Sacred Geometry",
        description: "Javanese courts adopt Kawung as one of the few patterns permitted for commoners, its four-part circular design representing the four elements and cosmic harmony.",
        image_url: "/images/timeline/kawung-geometric.jpg",
        fun_fact: "The pattern's simplicity belies its deep philosophical significance."
      },
      {
        year: "1700s",
        era: "Colonial",
        title: "Trade Secret",
        description: "Dutch traders attempt to copy the pattern but fail to understand its spiritual essence, which Javanese artisans protect through oral tradition.",
        image_url: "/images/timeline/kawung-trade.jpg",
        fun_fact: "The pattern becomes a symbol of cultural resistance through preservation."
      },
      {
        year: "2009",
        era: "Modern",
        title: "Global Recognition",
        description: "Kawung inspires contemporary designers worldwide, who adapt its geometric purity for modern textiles, architecture, and digital art.",
        image_url: "/images/timeline/kawung-modern.jpg",
        fun_fact: "The pattern appears in modern Islamic art and calligraphy."
      }
    ],
    symbolism_elements: [
      {
        element_id: "four_circles",
        name: "Four Circles",
        position: { x: 50, y: 50 },
        icon: "⭕",
        meaning: "The four circles represent the four cardinal directions, four elements, and the four human virtues: wisdom, nobility, strength, and justice.",
        cultural_context: "In Javanese philosophy, the number four symbolizes completeness and cosmic order, representing the harmony of the universe.",
        detail_image: "/images/symbols/kawung-circles.jpg"
      },
      {
        element_id: "center_point",
        name: "Center Point",
        position: { x: 50, y: 30 },
        icon: "🎯",
        meaning: "The center point where all circles meet represents the human heart and spiritual core, the source of all virtues and wisdom.",
        cultural_context: "This central element symbolizes the inner self and the divine spark that connects human consciousness to universal order.",
        detail_image: "/images/symbols/kawung-center.jpg"
      }
    ],
    modern_usage_images: [
      {
        url: "/images/usage/modern/kawung-minimal.jpg",
        caption: "Minimalist home decor uses Kawung patterns to create serene, balanced spaces that honor traditional geometry.",
        category: "Interior Design"
      },
      {
        url: "/images/usage/modern/kawung-fashion.jpg",
        caption: "Contemporary fashion adapts Kawung's circular motifs for flowing fabrics and structured accessories.",
        category: "Fashion"
      }
    ],
    traditional_usage_images: [
      {
        url: "/images/usage/traditional/kawung-ceremonial.jpg",
        caption: "Traditional ceremonies use Kawung in formal attire, representing purity and spiritual readiness.",
        category: "Ceremonial"
      },
      {
        url: "/images/usage/traditional/kawung-daily.jpg",
        caption: "Daily wear incorporates subtle Kawung patterns, bringing sacred geometry into everyday life.",
        category: "Daily Wear"
      }
    ]
  }
};

export const getStorytellingData = (motifId: string): StorytellingData | null => {
  return storytellingData[motifId] || null;
};
