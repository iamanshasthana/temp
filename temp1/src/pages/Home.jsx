import { useState } from 'react'
import FloatingHearts from '../components/FloatingHearts'
import AudioPlayer, { audioEngine } from '../components/AudioPlayer'

// Explicitly using src/assets/img3.jpg as primary image requested by user!
import primaryHeroImg from '../assets/img3.jpg'

export default function Home({ onOpenGift }) {
  const [imgError, setImgError] = useState(false)
  const [clicked, setClicked] = useState(false)

  function handleOpenGift() {
    audioEngine.playHeartSound()
    audioEngine.playSparkleSound()
    setClicked(true)
    setTimeout(() => {
      if (onOpenGift) onOpenGift()
    }, 450)
  }

  return (
    <div className="page-wrapper home-page">
      {/* Floating hearts & click spawner background */}
      <FloatingHearts count={24} />

      {/* Top Bar with Audio Player */}
      <div className="top-nav-bar">
        <AudioPlayer />
      </div>

      <main className="home-card pop-anim" role="main">
        {/* Cute Sparkle Badges */}
        <div className="hero-top-badge">
          <span>💖 Made Exclusively For You 💖</span>
        </div>

        {/* Primary Hero Image with romantic ring glow & polaroid floral frame */}
        <div className="image-wrapper primary-hero">
          <div className="image-glow-ring" aria-hidden="true" />
          <div className="image-glow-mask" aria-hidden="true" />
          <div className="corner-heart-badge">👑 Hero Photo</div>

          {imgError ? (
            <div className="couple-image-placeholder">
              👸❤️
            </div>
          ) : (
            <img
              className="couple-image"
              src={primaryHeroImg}
              alt="My Princess - Primary Photo"
              style={{ objectPosition: 'center top' }}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Romantic Title */}
        <h1 className="home-title">
          To My Beautiful Princess ❤️
        </h1>

        {/* Subtitle */}
        <p className="home-subtitle">
          Meri Jeevan Sangini... a special surprise made just for you ✨
        </p>

        {/* Romantic quote */}
        <blockquote className="home-quote">
          "In a room full of art, I would still stare at you.<br />
          You are my favorite place to go when my mind searches for peace. 💖"
        </blockquote>

        {/* Interactive Open Gift Button */}
        <button
          id="open-gift-btn"
          className={`gift-button ${clicked ? 'opening' : ''}`}
          onClick={handleOpenGift}
          disabled={clicked}
          aria-label="Open your romantic gift"
        >
          <span className="gift-button-emoji" aria-hidden="true">💌</span>
          <span className="gift-button-text">Open Your Gift 🎁</span>
          <span className="sparkle-trail">✨</span>
        </button>
      </main>
    </div>
  )
}
