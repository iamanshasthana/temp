import { useEffect, useRef, useState } from 'react'
import { audioEngine } from './AudioPlayer'

// Importing primary hero image explicitly requested by user: src/assets/img3.jpg
import primaryHeroImg from '../assets/img3.jpg'

// Importing photos from temp1/assets
import t1_img1 from '../assets/t1_img1.jpg'
import t1_img2 from '../assets/t1_img2.jpg'
import t1_img3 from '../assets/t1_img3.jpg'
import t1_img4 from '../assets/t1_img4.jpg'
import t1_img5 from '../assets/t1_img5.jpg'
import t1_img6 from '../assets/t1_img6.jpg'

// Importing photos from src/assets
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
import img7 from '../assets/img7.jpg'
import img8 from '../assets/img8.jpg'

const PHOTOS = [
  {
    id: 'primary',
    src: primaryHeroImg,
    isPrimary: true,
    caption: 'My Main Queen & Soulmate ❤️',
    note: 'This is my absolute favorite picture of you. Your gaze, your grace, and your smile instantly light up my entire world.',
    rotation: '-2deg',
    badge: '👑 Primary Love'
  },
  {
    id: 't1_1',
    src: t1_img1,
    caption: 'Unforgettable Memories 🌸',
    note: 'Looking at this picture brings back all the warm feelings of our happiest days together.',
    rotation: '3deg',
    badge: '✨ Sweet Moment'
  },
  {
    id: 't1_2',
    src: t1_img2,
    caption: 'Pure Happiness 🥰',
    note: 'Your laughter in this moment is something I want to preserve in my heart forever.',
    rotation: '-4deg',
    badge: '💕 Heartbeat'
  },
  {
    id: 't1_3',
    src: t1_img3,
    caption: 'Sunlight & Smiles ☀️',
    note: 'Even on cloudy days, your presence feels like warm sunshine wrapping around me.',
    rotation: '2deg',
    badge: '🌟 Sunshine'
  },
  {
    id: 't1_4',
    src: t1_img4,
    caption: 'Together Hand in Hand 🤝',
    note: 'Side by side, hand in hand, through every season of life.',
    rotation: '-3deg',
    badge: '💖 Forever'
  },
  {
    id: 't1_5',
    src: t1_img5,
    caption: 'Cuteness Overload 🐣',
    note: 'How can anyone be this adorable? You melt my heart every single day.',
    rotation: '4deg',
    badge: '🎀 Cute Angel'
  },
  {
    id: 't1_6',
    src: t1_img6,
    caption: 'Forever & Always 💍',
    note: 'A quiet gentle moment that reminds me how blessed I am to have you.',
    rotation: '-2deg',
    badge: '🌷 Precious'
  },
  {
    id: 'img1',
    src: img1,
    caption: 'Our Special Vibe ✨',
    note: 'Every conversation with you feels so effortless and comforting.',
    rotation: '3deg',
    badge: '💌 Memories'
  },
  {
    id: 'img2',
    src: img2,
    caption: 'Sweetest Eyes 👀',
    note: 'Your eyes hold a thousand magical stories that I love reading every day.',
    rotation: '-3deg',
    badge: '💫 Dreamy'
  },
  {
    id: 'img4',
    src: img4,
    caption: 'Little Secret Laughs 🤭',
    note: 'Inside jokes, silly faces, and memories only you and I understand.',
    rotation: '2deg',
    badge: '🎈 Joy'
  },
  {
    id: 'img7',
    src: img7,
    caption: 'Endless Warmth 🧸',
    note: 'Holding you tight and never wanting to let go.',
    rotation: '-4deg',
    badge: '🤗 Hugs'
  },
  {
    id: 'img8',
    src: img8,
    caption: 'My Forever Princess 👸',
    note: 'You will always be the queen of my heart, today, tomorrow, and forever.',
    rotation: '3deg',
    badge: '💖 Royalty'
  }
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const openLightbox = (photo) => {
    audioEngine.playSparkleSound()
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    audioEngine.playPopSound()
    setSelectedPhoto(null)
  }

  return (
    <section className="gallery-section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-badge">📸 Polaroid Collection</span>
        <h2 className="section-title">Our Cute Photo Gallery</h2>
        <p className="section-subtitle">Click any polaroid to zoom in and read a sweet love note!</p>
      </div>

      <div className="polaroid-grid">
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            className={`polaroid-card ${photo.isPrimary ? 'primary-highlight' : ''} ${visible ? 'fade-in' : ''}`}
            style={{
              transform: `rotate(${photo.rotation})`,
              animationDelay: `${i * 0.08}s`
            }}
            onClick={() => openLightbox(photo)}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${photo.caption}`}
          >
            {/* Cute Tape Sticker */}
            <div className="polaroid-tape"></div>

            {/* Badge */}
            <span className="polaroid-badge">{photo.badge}</span>

            {/* Photo frame */}
            <div className="polaroid-img-wrapper">
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <div className="polaroid-overlay">
                <span>Zoom Photo 🔍</span>
              </div>
            </div>

            {/* Caption */}
            <p className="polaroid-caption">{photo.caption}</p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-modal pop-anim" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close photo">
              ✖
            </button>
            <div className="lightbox-content">
              <div className="lightbox-img-container">
                <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
              </div>
              <div className="lightbox-details">
                <span className="lightbox-badge">{selectedPhoto.badge}</span>
                <h3 className="lightbox-title">{selectedPhoto.caption}</h3>
                <div className="lightbox-divider" />
                <p className="lightbox-note">"{selectedPhoto.note}"</p>
                <div className="lightbox-heart-stamp">Made with ❤️ just for you</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
