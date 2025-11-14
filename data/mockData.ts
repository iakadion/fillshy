import { ContentItem } from '../types';

export const mockContent: Record<string, ContentItem[]> = {
  movies: [
    {
      id: 'movie-1',
      title: 'Starlight Echo',
      description: 'In the silent expanse of the void, a lone archivist discovers a cosmic library where galaxies are books and black holes are the final chapters. She must read the story of a dead universe to prevent her own from suffering the same fate.',
      imageUrl: 'https://images.unsplash.com/photo-1534351829090-143521404162?q=80&w=1920&auto=format&fit=crop',
      category: 'movies',
    },
    {
      id: 'movie-2',
      title: 'Neon & Chrome',
      description: 'A grizzled detective in a rain-drenched cyberpunk city hunts a rogue android who believes it\'s the reincarnation of a 20th-century poet. The trail leads him through bio-hacker dens and corporate towers, forcing him to question the nature of soul.',
      imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1920&auto=format&fit=crop',
      category: 'movies',
    }
  ],
  websites: [
    {
        id: 'website-1',
        title: 'LearnSphere - Your Universe of Knowledge',
        description: 'LearnSphere is a revolutionary EdTech platform that uses AI to create personalized learning paths for students. It tackles educational inequality by providing adaptive courses that adjust to each student\'s pace and learning style, making quality education accessible to all.',
        imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1920&auto=format&fit=crop',
        category: 'websites',
    },
    {
        id: 'website-2',
        title: 'ChronoWeave - The Fabric of Time',
        description: 'An innovative startup pitch for a service that creates interactive, personalized timelines of historical events. ChronoWeave allows users to explore history from multiple perspectives, making learning engaging and dynamic.',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
        category: 'websites',
    }
  ],
  music: [
    {
      id: 'music-1',
      title: 'Dusty Roads Serenade',
      description: 'A folk anthem about the call of the open road and the freedom found in leaving the familiar behind. With simple chords and an uplifting melody, it\'s a song for wanderers, dreamers, and anyone who feels the pull of a distant horizon.',
      imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3e1b912ee?q=80&w=1920&auto=format&fit=crop',
      category: 'music',
    },
    {
      id: 'music-2',
      title: 'Electric Midnight',
      description: 'A synthwave track with pulsating basslines and shimmering melodies, capturing the feeling of a late-night drive through a neon-lit city. The lyrics speak of fleeting connections and the bittersweet beauty of the night.',
      imageUrl: 'https://images.unsplash.com/photo-1593697821028-152dd8854746?q=80&w=1920&auto=format&fit=crop',
      category: 'music',
    }
  ],
  stories: [
    {
      id: 'stories-1',
      title: 'The Crimson Canary',
      description: 'The rain came down in sheets, washing the neon glow of the city into the gutters. Inside his office, Detective Jack Corrigan stared at the photo of a missing lounge singer, a case as cold as the November wind rattling his window.',
      imageUrl: 'https://images.unsplash.com/photo-1522202684359-23678b3b88a7?q=80&w=1920&auto=format&fit=crop',
      category: 'stories',
    },
    {
      id: 'stories-2',
      title: 'The Clockwork Forest',
      description: 'In a world powered by steam and gears, a young apprentice discovers a hidden forest where the trees are made of brass and the creatures are intricate clockwork automata. She must unravel the forest\'s secrets to save her city from a creeping mechanical decay.',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1920&auto=format&fit=crop',
      category: 'stories',
    }
  ],
  tech: [
      {
          id: 'tech-1',
          title: 'Review: The NeuroLink Band',
          description: 'A revolutionary wearable that translates thoughts into text messages. Our review covers its sleek design, mind-bending functionality, and the ethical questions it raises. Is this the future of communication or a step too far?',
          imageUrl: 'https://images.unsplash.com/photo-1581451184343-9f5a542a4463?q=80&w=1920&auto=format&fit=crop',
          category: 'tech',
      }
  ],
  twitter: [
      {
          id: 'twitter-1',
          title: 'Viral Thread: The Octopus Enigma',
          description: 'A deep dive into the alien-like intelligence of octopuses, exploring their decentralized nervous system and camouflage abilities. This thread broke down complex biology into a viral sensation.',
          imageUrl: 'https://images.unsplash.com/photo-1549487436-231d35445218?q=80&w=1920&auto=format&fit=crop',
          category: 'twitter',
      }
  ]
};
