import PhotoGallery from '../components/PhotoGallery'
import FlowerCanvas from '../components/FlowerCanvas'

export default function Gift() {
  return (
    <div className="page-wrapper gift-page" role="main">

      {/* ── Header ── */}
      <header className="gift-header">
        <h1 className="gift-title">
          <span className="gift-title-line">For You,</span>
          <span className="gift-title-line">My Love ❤️</span>
        </h1>
        <p className="gift-subtitle">
          Har tasveer apne andar ek kahani rakhti hai...
        </p>

        {/* Decorative divider */}
        <div className="gift-divider" aria-hidden="true">
          <div className="gift-divider-line" />
          <span className="gift-divider-heart">❤️</span>
          <div className="gift-divider-line" />
        </div>
      </header>

      {/* ── Photo Gallery ── */}
      <PhotoGallery />

      {/* ── Flower Canvas ── */}
      <section className="flower-section" aria-label="Animated flower garden">
        <p className="flower-section-title">
          🌸 A little garden, just for you 🌸
        </p>
        <div className="flower-canvas-wrapper">
          <FlowerCanvas />
        </div>
      </section>

      {/* ── Final Romantic Message ── */}
      <section className="final-message" aria-label="Final romantic message">
        <p className="final-message-line1">
          And just like these flowers...
        </p>
        <p className="final-message-line2">
          I hope our story keeps blooming forever. ❤️
        </p>
        <div className="final-divider" aria-hidden="true" />
        <p className="made-with-love">
          Made with <span aria-label="love">❤️</span> just for you.
        </p>
      </section>

    </div>
  )
}
