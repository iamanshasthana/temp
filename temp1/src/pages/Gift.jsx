import { useState } from 'react'
import FloatingHearts from '../components/FloatingHearts'
import AudioPlayer, { audioEngine } from '../components/AudioPlayer'
import PhotoGallery from '../components/PhotoGallery'
import LoveLetters from '../components/LoveLetters'
import ReasonGenerator from '../components/ReasonGenerator'
import FlowerCanvas from '../components/FlowerCanvas'
import MemoryTimeline from '../components/MemoryTimeline'
import CoupleQuiz from '../components/CoupleQuiz'

// Primary photo explicitly requested
import primaryHeroImg from '../assets/img3.jpg'

export default function Gift({ onBack }) {
  const [activeTab, setActiveTab] = useState('gallery')
  const [showFireworks, setShowFireworks] = useState(false)

  const handleTriggerFireworks = () => {
    audioEngine.playSparkleSound()
    audioEngine.playHeartSound()
    setShowFireworks(true)
  }

  return (
    <div className="page-wrapper gift-page" role="main">
      <FloatingHearts count={28} />

      {/* Navigation Top Bar */}
      <header className="gift-nav-bar">
        <button
          className="back-btn"
          onClick={() => {
            if (onBack) onBack()
          }}
          aria-label="Back to landing page"
        >
          ⬅ Back Home 💕
        </button>
        <AudioPlayer />
      </header>

      {/* Hero Spotlight Section */}
      <section className="gift-hero-banner">
        <div className="hero-primary-avatar-wrap">
          <img
            src={primaryHeroImg}
            alt="Primary Love Hero"
            className="hero-primary-avatar"
          />
          <span className="hero-avatar-heart">💖</span>
        </div>
        <h1 className="gift-title">
          For You, My Sweet Princess ❤️
        </h1>
        <p className="gift-subtitle">
          "Har tasveer apne andar ek kahani rakhti hai, par tum meri poori zindagi ho."
        </p>

        {/* Category Navigation Pills */}
        <nav className="category-nav" aria-label="Gift experience sections">
          <button
            className={`nav-pill ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            📸 Photo Gallery
          </button>
          <button
            className={`nav-pill ${activeTab === 'letters' ? 'active' : ''}`}
            onClick={() => setActiveTab('letters')}
          >
            💌 Love Letters
          </button>
          <button
            className={`nav-pill ${activeTab === 'reasons' ? 'active' : ''}`}
            onClick={() => setActiveTab('reasons')}
          >
            💖 Love Generator
          </button>
          <button
            className={`nav-pill ${activeTab === 'garden' ? 'active' : ''}`}
            onClick={() => setActiveTab('garden')}
          >
            🌸 Flower Garden
          </button>
          <button
            className={`nav-pill ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            ⏳ Memory Journey
          </button>
          <button
            className={`nav-pill ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            🎯 Couple Quiz
          </button>
        </nav>
      </section>

      {/* Active Tab Content */}
      <main className="tab-content-area">
        {activeTab === 'gallery' && <PhotoGallery />}
        {activeTab === 'letters' && <LoveLetters />}
        {activeTab === 'reasons' && <ReasonGenerator />}
        {activeTab === 'garden' && (
          <section className="flower-section">
            <div className="section-header">
              <span className="section-badge">🌸 Interactive Flower Garden</span>
              <h2 className="section-title">A Garden That Blooms For You</h2>
              <p className="section-subtitle">Click anywhere inside the garden canvas to grow sparkling, blooming flowers!</p>
            </div>
            <div className="flower-canvas-wrapper">
              <FlowerCanvas />
            </div>
          </section>
        )}
        {activeTab === 'timeline' && <MemoryTimeline />}
        {activeTab === 'quiz' && <CoupleQuiz />}
      </main>

      {/* Celebration Banner */}
      <section className="final-celebration-box">
        <h3>Press for a Special Surprise Explosion! 🎆</h3>
        <button
          className="celebration-btn"
          onClick={handleTriggerFireworks}
        >
          <span className="btn-icon">💖</span>
          <span>I LOVE YOU SO MUCH!</span>
          <span className="btn-icon">✨</span>
        </button>
        <p className="made-with-love">
          Crafted with endless <span aria-label="love">❤️</span> just for you.
        </p>
      </section>

      {/* Grand Fireworks Modal */}
      {showFireworks && (
        <div className="fireworks-backdrop" onClick={() => setShowFireworks(false)}>
          <div className="fireworks-modal pop-anim" onClick={(e) => e.stopPropagation()}>
            <div className="fireworks-header">
              <span>💖 INFALLIBLE LOVE EXPLOSION 💖</span>
            </div>
            <div className="fireworks-emoji-rain">
              🎉 💖 👑 🌹 🎂 ✨ 💋 💕 🌸 🎈
            </div>
            <h2>You are my today and all of my tomorrows!</h2>
            <p>
              Thank you for bringing so much happiness, light, and warmth into my life every single day. I love you more than words can ever say! ❤️
            </p>
            <button
              className="fireworks-close-btn"
              onClick={() => setShowFireworks(false)}
            >
              Back To Our Gift 💕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
