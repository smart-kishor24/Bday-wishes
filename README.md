# 🎂 A Magical Birthday Journey for My Girl Bestie 🎂✨

An interactive, 3D digital birthday surprise website built with **React**, **TypeScript**, **Three.js / React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

---

## ✨ Features

- 🌟 **3D Interactive Night Sky & Particle Background**: Floating glowing stars, hearts, and responsive camera parallax.
- 🖼️ **3D Floating Polaroid Memory Gallery**: Interactive 3D photos that float, tilt, glow, and expand into a detailed lightbox modal.
- 🎂 **3D Interactive Birthday Cake**: Lit candles, flame animation, and an interactive "Blow the Candles" trigger with particle smoke, confetti explosions, and floating balloons.
- 💖 **Heartfelt Typewriter Letter**: Floating glassmorphism message card with smooth typing animation.
- ⏳ **Friendship Era Timeline**: Animated vertical timeline tracking your friendship chapters.
- 🎀 **"How Well Do You Know Your Bestie?" Quiz**: 6 interactive trivia questions with live scoring and witty feedback.
- 💫 **Future Memories & Grand Finale**: Cinematic closing message with starry glows and a "Replay Our Story" button.
- 🎵 **Web Audio Synthesizer**: Built-in fairy lullaby / music box chime generator with a toggleable mute/unmute control.
- 📱 **Fully Responsive**: Optimized for desktop, mobile touch gestures, and smooth scrolling.

---

## 🎨 How to Personalize

All customization settings are centralized in **a single configuration file**:

📁 `src/config/personalization.ts`

### 1. Changing Names & Birthday Date
Open `src/config/personalization.ts` and edit the top variables:

```typescript
export const PERSONALIZATION = {
  BESTIE_NAME: "Her Name",          // e.g. "Maya", "Sarah"
  BIRTHDAY_DATE: "October 14th",    // Her Birthday
  YOUR_NAME: "Your Name",           // Your Name or Nickname
};
```

### 2. Replacing Gallery Photos
1. Drop your 6 photo files into the `public/images/` folder:
   - `public/images/photo1.jpg`
   - `public/images/photo2.jpg`
   - `public/images/photo3.jpg`
   - `public/images/photo4.jpg`
   - `public/images/photo5.jpg`
   - `public/images/photo6.jpg`

2. Update captions or paths in `src/config/personalization.ts`:

```typescript
PHOTOS: [
  {
    id: 1,
    url: "/images/photo1.jpg",
    caption: "The beginning of our chaos 💀",
    date: "Day One",
    tag: "Iconic",
  },
  // ...
]
```

*(Note: If image files are missing, aesthetic SVG placeholder artwork with pastel gradients and sparkles will render automatically as fallbacks!)*

### 3. Customizing Messages, Timeline & Quiz
Inside `src/config/personalization.ts`, you can also edit:
- `HEARTFELT_MESSAGE`: The letter content in Page 2.
- `TIMELINE`: The milestones in Page 4.
- `REASONS`: The 5 reasons why she is special in Page 6.
- `QUIZ`: The 6 quiz questions and answers in Page 7.
- `FINALE`: The final letter and greeting in Page 9.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🛠️ Built With

- **React 19** + **TypeScript**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **Framer Motion**
- **Tailwind CSS v4**
- **Canvas Confetti** & **Lucide Icons**
