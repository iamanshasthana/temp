import { useEffect, useRef } from 'react'

const HEARTS = ['❤️', '🩷', '💕', '💗', '💓', '💖', '🌸']

function createHeart(containerWidth, containerHeight) {
  return {
    emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
    x: Math.random() * containerWidth,
    startDelay: Math.random() * 8,
    duration: 8 + Math.random() * 10,
    fontSize: 0.7 + Math.random() * 0.9,
    drift: Math.random() > 0.5 ? 1 : -1,
  }
}

export default function FloatingHearts({ count = 14 }) {
  const containerRef = useRef(null)
  const heartsRef    = useRef([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const W = el.offsetWidth  || window.innerWidth
    const H = el.offsetHeight || window.innerHeight

    heartsRef.current = Array.from({ length: count }, () => createHeart(W, H))

    // Inject hearts as real DOM spans for CSS animation (very lightweight)
    heartsRef.current.forEach((h, i) => {
      const span = document.createElement('span')
      span.className    = 'heart-particle'
      span.textContent  = h.emoji
      span.style.cssText = `
        left: ${h.x}px;
        font-size: ${h.fontSize}rem;
        animation-duration: ${h.duration}s;
        animation-delay: ${h.startDelay}s;
        --drift: ${h.drift * (20 + Math.random() * 30)}px;
      `
      el.appendChild(span)
    })

    return () => {
      // Clean up all heart spans
      while (el.firstChild) el.removeChild(el.firstChild)
    }
  }, [count])

  return (
    <div
      ref={containerRef}
      className="floating-hearts"
      aria-hidden="true"
    />
  )
}
