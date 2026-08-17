import { useState } from 'react'
import { audioEngine } from './AudioPlayer'

const REASONS = [
  "The adorable way your eyes sparkle when you smile.",
  "How you listen to me and make me feel like the most special person in the world.",
  "Your sweet laugh that instantly brightens up my worst days.",
  "The cute little voice you make when you get excited.",
  "How you make even simple quiet moments feel magical.",
  "Your warm, caring, and kind heart towards everyone.",
  "Because you are my best friend and soulmate all in one.",
  "How cute you look when you're thinking hard or being mischievous.",
  "The comfort I feel whenever I hold your hand or hear your voice.",
  "Your unconditional support and belief in me.",
  "Because your hugs feel like home.",
  "The way you care for tiny little things with so much love.",
  "How you make me laugh harder than anyone else can.",
  "Because you make me want to be a better person every single day.",
  "How adorable you look when you get sleepy.",
  "The way you randomly check up on me to see if I'm doing okay.",
  "Because no matter what happens, life is always sweeter with you.",
  "Your gorgeous hair and the sweet scent of your presence.",
  "Because you are my favorite notification on my phone.",
  "How passionate you get about the things you love.",
  "Because every romantic song suddenly reminds me of you.",
  "How we can talk for hours about everything and nothing at all.",
  "Because you are my dream come true and my forever princess. ❤️"
]

export default function ReasonGenerator() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [heartCount, setHeartCount] = useState(1)

  const getRandomReason = () => {
    audioEngine.playHeartSound()
    setIsAnimating(true)
    setHeartCount((prev) => prev + 1)

    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * REASONS.length)
      if (nextIndex === currentIndex) {
        nextIndex = (currentIndex + 1) % REASONS.length
      }
      setCurrentIndex(nextIndex)
      setIsAnimating(false)
    }, 250)
  }

  return (
    <section className="reason-generator-section">
      <div className="section-header">
        <span className="section-badge">💖 Infinite Love Meter</span>
        <h2 className="section-title">Why You Are So Special To Me</h2>
        <p className="section-subtitle">Tap the heart to discover a new sweet reason why I fell in love with you!</p>
      </div>

      <div className="reason-card-wrapper">
        <div className={`reason-card ${isAnimating ? 'pop-anim' : ''}`}>
          <div className="reason-card-badge">Reason #{currentIndex + 1}</div>
          <blockquote className="reason-text">
            "{REASONS[currentIndex]}"
          </blockquote>
          <div className="reason-card-decor">
            <span>✨</span>
            <span className="mini-heart">💕</span>
            <span>✨</span>
          </div>
        </div>

        <div className="heart-button-container">
          <button
            className="big-heart-btn"
            onClick={getRandomReason}
            aria-label="Generate a cute reason why I love you"
          >
            <span className="heart-icon">💖</span>
            <span className="btn-text">Give Me Another Reason!</span>
          </button>
          <p className="love-counter-tag">
            You have unlocked <strong>{heartCount}</strong> love notes so far! 🥰
          </p>
        </div>
      </div>
    </section>
  )
}
