import { useEffect, useRef, useState } from 'react'

// Synthetic romantic chime engine using Web Audio API
class AudioEngine {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.timer = null
    this.step = 0
    // Sweet lullaby chord progression (Cmaj7 -> Am7 -> Fmaj7 -> G7)
    this.notes = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ]
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playNote(freq, type = 'sine', duration = 1.2, volume = 0.08) {
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(0, this.ctx.currentTime)
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.1)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch (e) {
      console.warn(e)
    }
  }

  playPopSound() {
    this.init()
    this.playNote(523.25 + Math.random() * 200, 'sine', 0.15, 0.12)
  }

  playSparkleSound() {
    this.init()
    const freqs = [1046.5, 1318.5, 1567.98, 2093.0]
    freqs.forEach((f, i) => {
      setTimeout(() => this.playNote(f, 'triangle', 0.4, 0.06), i * 70)
    })
  }

  playHeartSound() {
    this.init()
    this.playNote(329.63, 'sine', 0.2, 0.15)
    setTimeout(() => this.playNote(440.00, 'sine', 0.3, 0.15), 100)
    setTimeout(() => this.playNote(523.25, 'sine', 0.5, 0.15), 200)
  }

  startMusic() {
    this.init()
    if (this.isPlaying) return
    this.isPlaying = true
    this.step = 0

    const schedule = () => {
      if (!this.isPlaying) return
      const chordIndex = Math.floor(this.step / 4) % this.notes.length
      const chord = this.notes[chordIndex]
      const noteFreq = chord[this.step % chord.length]

      // Play soft ambient sine pad note
      this.playNote(noteFreq, 'sine', 2.0, 0.05)

      // Occasional gentle sparkle high note
      if (this.step % 3 === 0) {
        this.playNote(noteFreq * 2, 'triangle', 1.0, 0.02)
      }

      this.step++
      this.timer = setTimeout(schedule, 650)
    }

    schedule()
  }

  stopMusic() {
    this.isPlaying = false
    if (this.timer) clearTimeout(this.timer)
  }
}

export const audioEngine = new AudioEngine()

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)

  const toggleMusic = () => {
    if (playing) {
      audioEngine.stopMusic()
      setPlaying(false)
    } else {
      audioEngine.startMusic()
      audioEngine.playSparkleSound()
      setPlaying(true)
    }
  }

  return (
    <button
      className={`music-toggle-btn ${playing ? 'is-playing' : ''}`}
      onClick={toggleMusic}
      title={playing ? 'Mute Sweet Music' : 'Play Sweet Background Melody'}
      aria-label="Toggle romantic background music"
    >
      <span className="music-icon">{playing ? '🎵' : '🔇'}</span>
      <span className="music-label">{playing ? 'Music On ✨' : 'Play Melody 💖'}</span>
      {playing && (
        <div className="music-waves">
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
        </div>
      )}
    </button>
  )
}
