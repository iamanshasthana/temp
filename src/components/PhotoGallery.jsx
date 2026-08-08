import { useEffect, useRef, useState } from 'react'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
import img7 from '../assets/img7.jpg'
import img8 from '../assets/img8.jpg'

const PHOTOS = [
  { src: img1, alt: 'Our memory 1' },
  { src: img2, alt: 'Our memory 2' },
  { src: img3, alt: 'Our memory 3' },
  { src: img4, alt: 'Our memory 4' },
  { src: img5, alt: 'Our memory 5' },
  { src: img6, alt: 'Our memory 6' },
  { src: img7, alt: 'Our memory 7' },
  { src: img8, alt: 'Our memory 8' },
]

function PhotoItem({ photo, index, isVisible }) {
  const [imgError, setImgError] = useState(false)

  const animationDelay = `${index * 0.13}s`

  return (
    <div
      className={`photo-item ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay }}
    >
      <div className="photo-inner">
        {imgError ? (
          <div className="photo-placeholder">
            <span className="photo-placeholder-icon">📷</span>
            <span className="photo-placeholder-text">photo {index + 1}</span>
          </div>
        ) : (
          <img
            src={photo.src}
            alt={photo.alt}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        <div className="photo-overlay">
          <span className="photo-overlay-heart">❤️</span>
        </div>
      </div>
    </div>
  )
}

export default function PhotoGallery() {
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

  return (
    <section className="gallery-section" ref={sectionRef}>
      <p className="gallery-section-title">
        ✦ Our Little Moments ✦
      </p>
      <div className="photo-gallery">
        {PHOTOS.map((photo, i) => (
          <PhotoItem
            key={photo.src}
            photo={photo}
            index={i}
            isVisible={visible}
          />
        ))}
      </div>
    </section>
  )
}
