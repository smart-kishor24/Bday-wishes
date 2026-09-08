/**
 * Aesthetic SVG Placeholder Generator
 * Generates beautiful, dreamlike pastel SVG images with soft gradients,
 * sparkles, clouds, and hearts for missing gallery photos.
 */

interface PlaceholderStyle {
  bgGradient: [string, string];
  title: string;
  emoji: string;
  subtext: string;
}

const STYLES: Record<number, PlaceholderStyle> = {
  1: {
    bgGradient: ["#ffd1dc", "#e0c3fc"],
    title: "Day One Memories",
    emoji: "🌸✨",
    subtext: "Where the chaos began",
  },
  2: {
    bgGradient: ["#c2e9fb", "#a1c4fd"],
    title: "Unfiltered Laughs",
    emoji: "😂💖",
    subtext: "Inside jokes & endless giggles",
  },
  3: {
    bgGradient: ["#fbc2eb", "#a6c1ee"],
    title: "Comfort & Warmth",
    emoji: "☕🌷",
    subtext: "Our favorite safe space",
  },
  4: {
    bgGradient: ["#fed6e3", "#a8edd5"],
    title: "Late Night Vibes",
    emoji: "🌙💫",
    subtext: "Talking about everything",
  },
  5: {
    bgGradient: ["#ffe6fa", "#d4fc79"],
    title: "Soulmate Energy",
    emoji: "🫶🎀",
    subtext: "Us being completely us",
  },
  6: {
    bgGradient: ["#fa709a", "#fee140"],
    title: "Precious Moments",
    emoji: "👑💗",
    subtext: "A memory to keep forever",
  },
};

export function getPlaceholderImage(photoId: number): string {
  const style = STYLES[photoId] || STYLES[1];

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <linearGradient id="grad${photoId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${style.bgGradient[0]}" />
        <stop offset="100%" stop-color="${style.bgGradient[1]}" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <!-- Background Gradient -->
    <rect width="800" height="1000" fill="url(#grad${photoId})" />
    
    <!-- Decorative Floating Circles -->
    <circle cx="150" cy="200" r="120" fill="white" opacity="0.15" />
    <circle cx="650" cy="800" r="180" fill="white" opacity="0.12" />
    <circle cx="700" cy="300" r="90" fill="white" opacity="0.2" />

    <!-- Center Card Artwork -->
    <rect x="100" y="150" width="600" height="700" rx="30" fill="rgba(255, 255, 255, 0.45)" stroke="rgba(255, 255, 255, 0.8)" stroke-width="4" filter="url(#glow)" />

    <!-- Icon Emoji -->
    <text x="400" y="440" font-size="110" text-anchor="middle" dominant-baseline="central">${style.emoji}</text>

    <!-- Title -->
    <text x="400" y="580" font-family="'Georgia', serif" font-weight="bold" font-size="44" fill="#332244" text-anchor="middle">
      ${style.title}
    </text>

    <!-- Subtext -->
    <text x="400" y="640" font-family="'sans-serif'" font-size="26" fill="#664466" text-anchor="middle" opacity="0.85">
      ${style.subtext}
    </text>

    <!-- Sparkle Stars -->
    <text x="220" y="300" font-size="40" fill="#fff">✨</text>
    <text x="580" y="320" font-size="40" fill="#fff">💖</text>
    <text x="240" y="720" font-size="40" fill="#fff">🌷</text>
    <text x="560" y="700" font-size="40" fill="#fff">💫</text>

    <text x="400" y="800" font-family="'sans-serif'" font-size="20" fill="#886688" text-anchor="middle" letter-spacing="4">
      TAP TO EDIT / REPLACE PHOTO
    </text>
  </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
