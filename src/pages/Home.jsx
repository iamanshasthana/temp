import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingHearts from '../components/FloatingHearts'
import coupleImg from '../assets/img1.jpg'

export default function Home() {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const [clicked, setClicked] = useState(false)

  function handleOpenGift() {
    setClicked(true)
    setTimeout(() => navigate('/gift'), 420)
  }

  return (
    <div className="page-wrapper home-page">
      {/* Floating hearts background */}
      <FloatingHearts count={16} />

      <main className="home-card" role="main">
        {/* Couple image with glow ring */}
        <div className="image-wrapper">
          <div className="image-glow-ring" aria-hidden="true" />
          <div className="image-glow-mask" aria-hidden="true" />
          {imgError ? (
            <div className="couple-image-placeholder" aria-label="Couple photo placeholder">
              💑
            </div>
          ) : (
            <img
              className="couple-image"
              src={coupleImg}
              alt="Us together"
              style={{ objectPosition: 'top center' }}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Title */}
        <h1 className="home-title">
          Meri Jeevan Sangini Ji ❤️
        </h1>

        {/* Subtitle */}
        <p className="home-subtitle">
          aapke liye ek chhota sa gift...
        </p>

        {/* Heartfelt quote */}
        <blockquote className="home-quote">
          "Kuch cheezein lafzon mein nahi,<br />
          bas dil se mehsoos ki jaati hain. ❤️"
        </blockquote>

        {/* Open Gift button */}
        <button
          id="open-gift-btn"
          className="gift-button"
          onClick={handleOpenGift}
          disabled={clicked}
          aria-label="Open your romantic gift"
          style={clicked ? { opacity: 0.8, pointerEvents: 'none' } : {}}
        >
          <span className="gift-button-emoji" aria-hidden="true">🎁</span>
          Open Gift
        </button>
      </main>
    </div>
  )
}
