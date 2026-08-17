import { useEffect, useState } from 'react'

const EMOJIS = ['❤️', '💖', '💕', '💗', '🌸', '✨', '🌹', '🎀']

export default function FloatingHearts({ count = 20 }) {
  const [clickParticles, setClickParticles] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now() + Math.random()
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      const newParticle = {
        id,
        x: e.clientX,
        y: e.clientY,
        emoji,
        size: Math.random() * 1.2 + 1.2
      }

      setClickParticles((prev) => [...prev.slice(-15), newParticle])

      setTimeout(() => {
        setClickParticles((prev) => prev.filter((p) => p.id !== id))
      }, 1500)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="floating-hearts-layer" aria-hidden="true">
      {/* Background floating elements */}
      {Array.from({ length: count }).map((_, i) => {
        const emoji = EMOJIS[i % EMOJIS.length]
        const left = Math.random() * 100
        const duration = Math.random() * 8 + 6
        const delay = Math.random() * 5
        const size = Math.random() * 1.5 + 0.8

        return (
          <span
            key={i}
            className="floating-heart"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              fontSize: `${size}rem`
            }}
          >
            {emoji}
          </span>
        )
      })}

      {/* Interactive click particles */}
      {clickParticles.map((p) => (
        <span
          key={p.id}
          className="click-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}rem`
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
