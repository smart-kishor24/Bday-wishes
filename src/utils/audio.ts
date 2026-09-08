/**
 * Dreamy Web Audio API Synthesizer & Audio Engine
 * Generates a soft, magical, ethereal music box / fairy lullaby melody
 * without external audio file dependencies, with mute/unmute control.
 */

class DreamyAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;

  // Magical Pentatonic / Lydian Scale Frequencies (Dreamy Music Box)
  private scale = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50, // C6
    1174.66, // D6
    1318.51, // E6
    1567.98, // G6
  ];

  // Whimsical lullaby melody sequence (note indices into scale)
  private melody = [
    0, 2, 4, 7, 5, 4, 2, 0,
    3, 5, 7, 8, 7, 5, 4, 2,
    1, 3, 5, 7, 6, 4, 2, 0,
    2, 4, 7, 8, 7, 5, 3, 1
  ];

  constructor() {
    // Lazy init audio context on user interaction
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 0.15; // Soft ambient volume
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playNote(freq: number, duration = 1.2) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Sine wave with subtle triangle harmonic for a music-box/celesta sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Envelope: fast attack, exponential soft decay
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.4, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio context silenced or blocked
    }
  }

  public startMelody() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;

    const tick = () => {
      if (!this.isPlaying) return;

      const noteIdx = this.melody[this.currentNoteIndex % this.melody.length];
      const freq = this.scale[noteIdx];
      
      // Pluck main note
      this.playNote(freq, 1.6);

      // Occasionally add a soft harmony note
      if (this.currentNoteIndex % 4 === 0) {
        const harmonyFreq = this.scale[(noteIdx + 2) % this.scale.length] * 0.5;
        this.playNote(harmonyFreq, 2.0);
      }

      this.currentNoteIndex++;
      this.timerId = window.setTimeout(tick, 450); // Gentle 133 BPM eighth notes
    };

    tick();
  }

  public stopMelody() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : 0.15,
        this.ctx.currentTime
      );
    }
    if (!this.isPlaying && !this.isMuted) {
      this.startMelody();
    }
    return this.isMuted;
  }

  public playSparkleSound() {
    this.init();
    if (this.isMuted) return;

    // Quick ascending magical sparkle chime
    const sparkleNotes = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02];
    sparkleNotes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.6);
      }, idx * 60);
    });
  }

  public playBlowCandleSound() {
    this.init();
    if (this.isMuted) return;

    // Soft wind swoosh + magical triumph chord
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach(freq => this.playNote(freq, 2.5));
    this.playSparkleSound();
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new DreamyAudioEngine();
