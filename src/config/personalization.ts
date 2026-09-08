import photo1 from '../assets/1000292121.jpg.jpeg';
import photo2 from '../assets/1000303327.jpg.jpeg';
import photo3 from '../assets/1000452142.jpg.jpeg';
import photo4 from '../assets/1000611553.jpg.jpeg';
import photo5 from '../assets/bc988a82-ac2b-48ba-bc97-77c7389a8bb4-1_all_26282.jpg.jpeg';
import photo6 from '../assets/bc988a82-ac2b-48ba-bc97-77c7389a8bb4-1_all_33950.jpg.jpeg';
import photo7 from '../assets/bc988a82-ac2b-48ba-bc97-77c7389a8bb4-1_all_4738.jpg.jpeg';
import photo8 from '../assets/bc988a82-ac2b-48ba-bc97-77c7389a8bb4-1_all_4739.jpg.jpeg';
import funnyVideo from '../assets/bc988a82-ac2b-48ba-bc97-77c7389a8bb4-1_all_3544 (1).mp4';

/**
 * ============================================================================
 * 🎂 MAGICAL BIRTHDAY WEBSITE PERSONALIZATION CONFIGURATION 🎂
 * ============================================================================
 */

export const BESTIE_NAME = "M Kousalya Naga Rupa (Real one , 90Ml)";
export const BIRTHDAY_DATE = "08-09-2026";
export const YOUR_NAME = "Kishor";

export const FUNNY_MOMENT_VIDEO = {
  url: funnyVideo,
  title: "The 90Ml Chaos Chronicles 😂🎬",
  subtitle: "Proof that M Kousalya Naga Rupa is 100% the funniest, most unhinged bestie!",
  badge: "TOP SECRET BESTIE ARCHIVE 🔐",
  caption: "Caught in 4K: Pure unfiltered comedy. A core memory that never fails to make us cry laughing! 🍿✨",
};

export interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  date?: string;
  tag?: string;
}

export interface TimelineMilestone {
  title: string;
  subtitle: string;
  date: string;
  icon: string;
  description: string;
  badge?: string;
}

export interface ReasonItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FutureMemory {
  title: string;
  icon: string;
  description: string;
}

export const PERSONALIZATION = {
  // 1. CORE PERSONAL DETAILS
  BESTIE_NAME,
  BIRTHDAY_DATE,
  YOUR_NAME,
  FUNNY_MOMENT_VIDEO,

  // 2. HERO LANDING SEQUENCE
  HERO: {
    GREETING: "Heyyy M Kousalya Naga Rupa (Real one , 90Ml)… 💗",
    SUSPENSE: "Someone very special has a birthday today…",
    REVEAL: "HAPPY BIRTHDAY KOUSALYA! 🎂✨",
    BUTTON_TEXT: "Open Your Birthday Surprise →",
    SUBTITLE: "A little digital universe created just for you.",
  },

  // 3. HEARTFELT LETTER / MESSAGE (PAGE 2)
  HEARTFELT_MESSAGE: {
    HEADING: "Letter to M Kousalya Naga Rupa (Real one , 90Ml) 💕",
    LETTER: `Happy Birthday to the girl who somehow makes every ordinary moment feel special.
From random conversations and stupid jokes to unforgettable memories, I’m genuinely grateful that life gave me a bestie like you.

You’re not just my best friend — you’re my comfort person, my chaos partner, my personal therapist, and one of the most precious people in my life. (The Real one, 90Ml!)

I hope this year gives you everything your heart secretly wishes for. You deserve all the happiness, love, success, laughter, and beautiful moments in the world.

Never forget how incredibly special you are. 💗`,
    SIGN_OFF: "Love you always & forever ✨",
  },

  // 4. MEMORY GALLERY PHOTOS (PAGE 3)
  PHOTOS: [
    {
      id: 1,
      url: photo1,
      caption: "The Real One in all her glory 💖",
      date: "Forever Memory",
      tag: "Iconic",
    },
    {
      id: 2,
      url: photo2,
      caption: "That smile that fixes any bad day 🌸",
      date: "Special Day",
      tag: "Pure Sunshine",
    },
    {
      id: 3,
      url: photo3,
      caption: "90Ml energy & endless laughter 😂✨",
      date: "Unforgettable",
      tag: "Pure Laughs",
    },
    {
      id: 4,
      url: photo4,
      caption: "Forever partners in crime 🫶",
      date: "Core Memory",
      tag: "Besties",
    },
    {
      id: 5,
      url: photo5,
      caption: "Unfiltered, dramatic, and iconic 💅",
      date: "Drama Queen",
      tag: "Main Character",
    },
    {
      id: 6,
      url: photo6,
      caption: "The Queen of our universe 👑✨",
      date: "Golden Moment",
      tag: "Precious",
    },
    {
      id: 7,
      url: photo7,
      caption: "Golden hour with my favorite human 🌷",
      date: "Magic Hour",
      tag: "Comfort",
    },
    {
      id: 8,
      url: photo8,
      caption: "A core memory sealed in our story 💕",
      date: "Always & Forever",
      tag: "Soulmates",
    },
  ] as PhotoItem[],

  // 5. FRIENDSHIP TIMELINE (PAGE 4)
  TIMELINE: [
    {
      title: "The Beginning 🌸",
      subtitle: "Chapter 1",
      date: "The Spark",
      icon: "Sparkles",
      description: "Somehow, two random people became inseparable best friends.",
      badge: "Where it started",
    },
    {
      title: "The Chaos Era 😂",
      subtitle: "Chapter 2",
      date: "The Madness",
      icon: "Laugh",
      description: "Too many inside jokes, 90Ml banter, and not enough brain cells.",
      badge: "Unstoppable",
    },
    {
      title: "The Unforgettable Moments ✨",
      subtitle: "Chapter 3",
      date: "The Adventures",
      icon: "Heart",
      description: "Adventures, deep conversations, endless laughter, and real memories.",
      badge: "Pure Gold",
    },
    {
      title: "Today 💗",
      subtitle: "Chapter 4",
      date: "The Celebration",
      icon: "Cake",
      description: "And here we are, celebrating YOU, M Kousalya Naga Rupa!",
      badge: "Special Day",
    },
    {
      title: "Forever ♾️",
      subtitle: "Chapter 5",
      date: "The Next Era",
      icon: "Infinity",
      description: "More memories, more trips, more chaos, and more celebrations.",
      badge: "Always",
    },
  ] as TimelineMilestone[],

  // 6. CAKE & WISH EXPERIENCE (PAGE 5)
  CAKE: {
    HEADING: "Make a Wish, Kousalya ✨",
    SUBTITLE: "Close your eyes, think of what your heart desires, and blow out the candles!",
    BUTTON_BLOW: "Blow the Candles 🕯️",
    BUTTON_BLOWN: "Candles Blown! ✨",
    WISH_MESSAGE: "May every single wish you make come true today! 💫",
    SUB_WISH_MESSAGE: "The universe is blessing you with endless happiness & love! 💖",
  },

  // 7. WHY YOU'RE SO SPECIAL (PAGE 6)
  REASONS: [
    {
      id: "01",
      title: "Your Smile 🌷",
      description: "It can instantly make a bad day better and brightens up every room.",
      icon: "Smile",
    },
    {
      id: "02",
      title: "Your 90Ml Chaos 😂",
      description: "Life would be so boring without your daily nonsense and laughs.",
      icon: "Zap",
    },
    {
      id: "03",
      title: "Your Beautiful Heart 🫶",
      description: "You care so deeply about the people in your life, more than you know.",
      icon: "Heart",
    },
    {
      id: "04",
      title: "Your Strength ✨",
      description: "You handle everything life throws at you with grace and power.",
      icon: "Star",
    },
    {
      id: "05",
      title: "The Real One 💕",
      description: "You don't need to change anything. You're simply irreplaceable.",
      icon: "Crown",
    },
  ] as ReasonItem[],

  // 8. BESTIE QUIZ (PAGE 7)
  QUIZ: {
    TITLE: "How Well Do You Know Your Bestie?",
    SUBTITLE: "Answer these 6 super serious (and totally chaotic) questions about Kousalya & Kishor!",
    QUESTIONS: [
      {
        id: 1,
        question: "Who is more likely to start unnecessary drama?",
        options: ["Obviously Kousalya 😂", "Definitely Kishor 😇", "Both of us simultaneously 🔥", "The cat"],
        correctIndex: 0,
        explanation: "100% drama queen (Real one), no debate! 👑",
      },
      {
        id: 2,
        question: "Who takes longer to reply?",
        options: ["Kousalya (leaving me on read 💀)", "Kishor (working hard)", "We both reply in 0.2s", "Only after 3 business days"],
        correctIndex: 0,
        explanation: "She sees the notification, responds in her head, and forgets for 5 hours! 📱",
      },
      {
        id: 3,
        question: "Who would survive a zombie apocalypse?",
        options: ["Kousalya (ruthless energy)", "Kishor (I'd hide)", "Neither (we'd die arguing)", "We'd join the zombies"],
        correctIndex: 2,
        explanation: "We'd be arguing over what food to pack while the zombies arrive! 🧟‍♀️",
      },
      {
        id: 4,
        question: "Who is more dramatic over minor inconveniences?",
        options: ["Kousalya 1000%", "Kishor", "Equal level of main character energy", "The weather"],
        correctIndex: 0,
        explanation: "A minor inconvenience = full theatrical Oscar performance! 🎭",
      },
      {
        id: 5,
        question: "Who would spend money on something completely unnecessary?",
        options: ["Kousalya ('it was cute okay??')", "Kishor ('I needed it')", "Both of us broke together", "Shopping therapy!"],
        correctIndex: 0,
        explanation: "Impulse buying champ 🏆",
      },
      {
        id: 6,
        question: "Who is more likely to say 'I'm fine' when they're absolutely NOT fine?",
        options: ["Kousalya (needs 50 hugs)", "Kishor", "We read each other's minds anyway", "Secret code!"],
        correctIndex: 0,
        explanation: "That's why I'm always checking in on you! 💗",
      },
    ] as QuizQuestion[],
    SUCCESS_TITLE: "Congratulations! 🎉",
    SUCCESS_MESSAGE: "You officially know your bestie way too well. Forever the Real One! 😂💗",
  },

  // 9. FUTURE MEMORIES (PAGE 8)
  FUTURE: {
    HEADING: "To Be Continued… ✨",
    SUBTITLE: "We haven't made all our memories yet, Kousalya.",
    MEMORIES: [
      { title: "More late-night talks 🌙", icon: "Moon", description: "Venting about everything under the stars" },
      { title: "More random adventures 🚗", icon: "Car", description: "Unplanned trips & wrong turns" },
      { title: "More uncontrollable laughter 😂", icon: "Laugh", description: "Stomach aches from laughing too hard" },
      { title: "More pictures we'll cringe at later 📸", icon: "Camera", description: "Unfiltered core memories" },
      { title: "More years of being besties 🫶", icon: "HeartHandshake", description: "Side by side, no matter what" },
    ] as FutureMemory[],
    ENDING_NOTE: "This is only the beginning of our friendship journey…",
  },

  // 10. GRAND FINALE (PAGE 9)
  FINALE: {
    HEADING: "HAPPY BIRTHDAY, KOUSALYA! 🎂💗",
    SUBTITLE: "Thank you for being one of the most beautiful parts of my life.",
    FINAL_LETTER: `No matter where life takes us, I hope you always remember that you have someone cheering for you, laughing with you, annoying you, and standing beside you.

Here's to another year of being amazing, chaotic, dramatic, and completely YOU (The Real one , 90Ml).

Happy Birthday, my bestie. 🫶

Love you always. 💗✨`,
    REPLAY_BUTTON: "Replay Our Story ↻",
  },
};
