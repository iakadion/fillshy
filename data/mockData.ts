import type { ContentItem } from '../types';

export const mockContent: Record<string, ContentItem[]> = {
  movies: [
    {
      id: 'movie-1',
      title: 'Starlight Echo',
      description: 'In the silent expanse of the void, a lone archivist discovers a cosmic library where galaxies are books and black holes are the final chapters. She must read the story of a dead universe to prevent her own from suffering the same fate.',
      imageUrl: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop',
    },
    {
      id: 'movie-2',
      title: 'The Last Garden',
      description: 'On a scorched Earth, a young botanist discovers the last viable seed. Pursued by factions who want to control the future of life, she must embark on a perilous journey to a mythical sanctuary where it can grow.',
      imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 'movie-3',
      title: 'Neon Shadows',
      description: 'The cybernetically enhanced detective stared out at the rain-slicked neon streets of Neo-Kyoto. His target: a rogue android with stolen memories. The case was personal.',
      imageUrl: 'https://images.unsplash.com/photo-1549488344-cbb6c144a495?q=80&w=2070&auto=format&fit=crop',
    },
     {
      id: 'movie-4',
      title: 'Ocean\'s Whisper',
      description: 'A deep-sea biologist discovers a form of sentient coral that communicates through bioluminescent patterns. When a corporation threatens its existence, she must become its unlikely protector.',
      imageUrl: 'https://images.unsplash.com/photo-1551287536-0f731152a1d8?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 'movie-5',
      title: 'Clockwork City',
      description: 'In a city powered by intricate clockwork mechanisms, a young inventor uncovers a conspiracy to stop time itself. He must race against the gears of fate to save his world from freezing forever.',
      imageUrl: 'https://images.unsplash.com/photo-1533319323602-a1a7988a15b1?q=80&w=2070&auto=format&fit=crop',
    }
  ],
  websites: [
    {
        id: 'website-1',
        title: 'ConnectSphere - Weave Your Thoughts',
        description: '**Problem:** Information overload makes focused learning and creative brainstorming difficult. **Solution:** A visual, node-based platform that allows users to map out ideas, connect concepts, and collaborate in a shared mental space.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'website-2',
        title: 'NomadCart - Local Artisans, Global Market',
        description: '**Problem:** Local artisans struggle to reach a global audience. **Solution:** An e-commerce platform that connects consumers with authentic, handmade crafts from around the world, complete with the story of the artisan.',
        imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'website-3',
        title: 'SkillSwap - Learn by Teaching',
        description: '**Problem:** Online courses are often passive and lack real-world application. **Solution:** A peer-to-peer learning platform where users trade skills. Teach an hour of guitar, and earn an hour of coding lessons.',
        imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
    },
     {
        id: 'website-4',
        title: 'UrbanGarden - Your Digital Greenhouse',
        description: '**Problem:** City dwellers lack the space and knowledge to grow their own food. **Solution:** An app that provides personalized planting schedules, watering reminders, and pest identification for small-space urban gardening.',
        imageUrl: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1974&auto=format&fit=crop',
    }
  ],
  music: [
      {
          id: 'music-1',
          title: 'Winding Road',
          description: '(Chorus)\n(C)Oh, this winding (G)road is my only home\n(D)Underneath the starry (G)dome\n(C)Don\'t know where I\'m (G)goin\', but I\'m not (D)alone\nWith the rhythm of the (G)road...',
          imageUrl: 'https://images.unsplash.com/photo-1471644339439-715974f488de?q=80&w=2070&auto=format&fit=crop',
      },
      {
          id: 'music-2',
          title: 'City Lights Lullaby',
          description: '(Chorus)\n(C)Hold me close, let the world disap(G)pear\n(Am)Whisper all the things I need to (F)hear\n(C)In this city lights lulla(G)by, I have no (C)fear.',
          imageUrl: 'https://images.unsplash.com/photo-1502960237444-4913c859d332?q=80&w=2070&auto=format&fit=crop',
      },
      {
          id: 'music-3',
          title: 'Forest Hymn',
          description: '(Chorus)\n(C)Listen close, you can (G)hear it now\n(D)A whisper on the (Em)wind\n(C)The secret language of the (G)bough\n(D)Where new stories be(G)gin.',
          imageUrl: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?q=80&w=2070&auto=format&fit=crop',
      },
      {
          id: 'music-4',
          title: 'Rust and Bone',
          description: '(Chorus)\n(G)Yeah, we\'re all just rust and (D)bone\n(A)Tryin\' to find a place to call our (Bm)own\n(G)On this long and dusty road we\'re (D)thrown\n(A)Just a travelin\' song, a lonesome (Bm)moan.',
          imageUrl: 'https://images.unsplash.com/photo-1508247967583-7d982ea01546?q=80&w=1972&auto=format&fit=crop',
      }
  ],
  stories: [
    {
        id: 'story-1',
        title: 'The Crimson Locket',
        description: 'The rain hammered against the window of my office, each drop a tiny fist trying to get in from the cold. Inside, the only light came from a flickering neon sign across the street, painting my dusty desk in shades of blood and regret. That\'s when she walked in.',
        imageUrl: 'https://images.unsplash.com/photo-1550536733-93e58a74e141?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 'story-2',
        title: 'City of Glass',
        description: 'They built the city to be perfect. Gleaming spires that touched the clouds, automated vehicles that hummed through pristine streets. But perfection is a fragile thing. I found the first crack in the system on a Tuesday, hidden in the reflection of a chrome-plated maintenance drone.',
        imageUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c97321?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'story-3',
        title: 'The Last Bookstore',
        description: 'In a world where all knowledge was digital, Arthur maintained the last bookstore on Earth. It was a dusty sanctuary of paper and ink. One day, a young girl with glowing cybernetic eyes walked in, seeking something the network couldn\'t provide: a story with a soul.',
        imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 'story-4',
        title: 'Whispers of the Deepwood',
        description: 'The old maps called it the Deepwood, a place where the trees grew so close they blotted out the sun. Legend said the forest had a mind of its own. Armed with only a compass and my grandfather\'s journal, I took my first step into its eternal twilight.',
        imageUrl: 'https://images.unsplash.com/photo-1484199529342-371cb1204554?q=80&w=1969&auto=format&fit=crop',
    }
  ],
  tech: [
    {
        id: 'tech-1',
        title: 'Review: The "Chrono-Lens"',
        description: 'This augmented reality contact lens lets you see moments from the past layered over your vision. A revolutionary tool for historians and detectives, but with serious privacy implications. **Verdict:** A glimpse of the future that we may not be ready for. 9/10 for innovation.',
        imageUrl: 'https://images.unsplash.com/photo-1581092921462-420101a2f646?q=80&w=1964&auto=format&fit=crop',
    },
    {
        id: 'tech-2',
        title: 'First Look: "Kinetic Weaver" Fabric',
        description: 'Imagine a shirt that charges your phone as you walk. That\'s the promise of the Kinetic Weaver. It converts your movement into electrical energy. **Verdict:** An amazing concept that needs a few more generations to be practical. 6.5/10',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop',
    },
    {
        id: 'tech-3',
        title: 'Unboxing the "Aura" Smart Lamp',
        description: 'The Aura isn\'t just a lamp; it\'s a mood-setter. It analyzes ambient sound and projects a dynamic, responsive light show. **Verdict:** A fantastic, if pricey, addition to any smart home focused on wellness. 8/10',
        imageUrl: 'https://images.unsplash.com/photo-1543508185-369467822afd?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 'tech-4',
        title: 'Is the "Porta-Scribe" Worth It?',
        description: 'This e-ink tablet promises a distraction-free writing experience. It feels remarkably like writing on paper, but is that enough? **Verdict:** Perfect for authors and academics, but a tough sell for everyone else. 7/10',
        imageUrl: 'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=2008&auto=format&fit=crop',
    }
  ],
  ascii: [
    {
        id: 'ascii-1',
        title: 'Castle in the Clouds',
        description: 'A majestic castle with towering spires, seemingly floating amidst a sea of fluffy clouds under a crescent moon.',
        imageUrl: 'https://images.unsplash.com/photo-1568668392135-31b34a413f39?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 'ascii-2',
        title: 'Ocean Waves',
        description: 'The rhythmic and calming pattern of ocean waves rolling onto a sandy shore, with seagulls flying overhead.',
        imageUrl: 'https://images.unsplash.com/photo-1502675133393-cbc928c1df29?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'ascii-3',
        title: 'Curious Cat',
        description: 'A simple yet charming depiction of a cat with wide, inquisitive eyes and perky ears, ready to pounce.',
        imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'ascii-4',
        title: 'Retro Rocket Ship',
        description: 'A classic, finned rocket ship blasting off into the stars, leaving a trail of smoke and adventure behind.',
        imageUrl: 'https://images.unsplash.com/photo-1608222351213-82417531985f?q=80&w=1974&auto=format&fit=crop',
    }
  ],
  social: [
    {
        id: 'social-1',
        title: 'Post for "Dawn Patrol Coffee"',
        description: 'Wake up your senses with Dawn Patrol! ☀️ Our new single-origin beans are ethically sourced from the high mountains of Peru, offering a smooth, chocolatey flavor with a hint of citrus. Every cup supports fair trade for our farmers.',
        imageUrl: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1964&auto=format&fit=crop',
    },
    {
        id: 'social-2',
        title: 'Launch of "Evergreen Notebooks"',
        description: 'Introducing Evergreen: the last notebook you\'ll ever buy. Made from recycled stone paper, it\'s waterproof, tear-resistant, and infinitely reusable. 🌿 Write, scan, erase, and repeat.',
        imageUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop',
    },
    {
        id: 'social-3',
        title: 'Travel with "Atlas Packs"',
        description: 'Designed for the modern adventurer. Our Atlas Pack features modular compartments, hidden security pockets, and weather-resistant fabric to protect your gear, whether you\'re scaling a mountain or navigating a bustling city.',
        imageUrl: 'https://images.unsplash.com/photo-1551651516-2b5a8f4c34d3?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 'social-4',
        title: '"Chrono Watch" - Timeless Design',
        description: 'Elegance is in the details. The Chrono watch combines classic minimalist design with a modern sapphire crystal face and a self-winding automatic movement. It\'s not just a timepiece; it\'s a statement.',
        imageUrl: 'https://images.unsplash.com/photo-1542496658-34c9f1ba9435?q=80&w=2070&auto=format&fit=crop',
    }
  ],
  twitter: [
    {
        id: 'twitter-1',
        title: 'Thread on the Tardigrade',
        description: 'Meet the Tardigrade (or water bear), a microscopic animal that can survive the vacuum of space, extreme radiation, and being boiled alive. 🤯 #Science',
        imageUrl: 'https://images.unsplash.com/photo-1574866072041-f633c8a93df7?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 'twitter-2',
        title: 'The Real Sound of Space',
        description: 'Most people think space is completely silent. But NASA has technology to "sonify" data from celestial objects, converting radio waves into sound we can hear. #Space',
        imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
    },
    {
        id: 'twitter-3',
        title: 'The Carrington Event of 1859',
        description: 'Did you know the largest solar storm ever recorded hit Earth in 1859? It was so powerful that telegraph systems worldwide shorted out, and the aurora was visible in Cuba. #History',
        imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256ec346?q=80&w=1994&auto=format&fit=crop',
    },
    {
        id: 'twitter-4',
        title: 'Finland\'s "Failure Day"',
        description: 'In Finland, they celebrate a "Day for Failure" every October 13th. It\'s a national event encouraging people to share their mistakes and learn from them without shame. #Culture',
        imageUrl: 'https://images.unsplash.com/photo-1604937455095-ce2d3a37334a?q=80&w=2070&auto=format&fit=crop',
    }
  ],
};