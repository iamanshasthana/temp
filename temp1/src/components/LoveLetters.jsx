import { useState } from 'react'
import { audioEngine } from './AudioPlayer'

const LETTERS = [
  {
    id: 1,
    title: 'Open when you miss me 💌',
    subtitle: 'A warm hug wrapped in words',
    icon: '🌸',
    color: '#FFB7C5',
    content: `My dearest love,

Whenever you feel lonely or miss me, close your eyes and take a deep breath. Know that no matter the distance between us, my heart is always right there with you. 

You are my favorite thought every morning, my sweet dream every night, and my happiest reality every moment in between. 

Never forget how deeply, truly, and endlessly you are loved. ❤️`
  },
  {
    id: 2,
    title: "Open when you need a smile ✨",
    subtitle: 'Instant mood booster just for you',
    icon: '🐣',
    color: '#FFD1DC',
    content: `Hey beautiful! 😊

Did you know that your smile is literally my absolute favorite thing in the universe? When you smile, the whole world gets brighter, happier, and a thousand times prettier.

So here is a reminder: You are doing amazing, you are incredibly cute, you are smart, kind, and you mean the entire world to me. Now give me that priceless smile! 💖`
  },
  {
    id: 3,
    title: 'Open when you want a hug & kiss 💋',
    subtitle: 'Sending virtual kisses across the miles',
    icon: '🧸',
    color: '#FF9EAA',
    content: `Sending you the biggest, warmest, tightest bear hug right now! 🤗

Consider this card an unlimited lifetime voucher for:
• 1,000,000 warm bear hugs
• Infinite sweet forehead kisses
• Late-night cuddle sessions
• Holding hands forever

I love you more than words could ever express! 💕`
  },
  {
    id: 4,
    title: 'Our Secret Love Note 💖',
    subtitle: 'A promise for our future together',
    icon: '👑',
    color: '#F472B6',
    content: `To my soulmate,

Meeting you was fate, becoming your boyfriend was a choice, but falling in love with you was completely beyond my control. 

Thank you for being my best friend, my rock, and my happiness. I promise to cherish you, laugh with you, hold your hand through everything, and love you more each passing day. 

Forever & Always yours. 🌹`
  }
]

export default function LoveLetters() {
  const [activeLetter, setActiveLetter] = useState(null)

  const openLetter = (letter) => {
    audioEngine.playSparkleSound()
    setActiveLetter(letter)
  }

  const closeLetter = () => {
    audioEngine.playPopSound()
    setActiveLetter(null)
  }

  return (
    <section className="love-letters-section">
      <div className="section-header">
        <span className="section-badge">💌 Special Letters</span>
        <h2 className="section-title">Open When You Need Me</h2>
        <p className="section-subtitle">Click an envelope to open a secret love note written just for you!</p>
      </div>

      <div className="letters-grid">
        {LETTERS.map((letter) => (
          <div
            key={letter.id}
            className="envelope-card"
            onClick={() => openLetter(letter)}
            role="button"
            tabIndex={0}
            aria-label={`Open letter: ${letter.title}`}
          >
            <div className="envelope-top-flap"></div>
            <div className="envelope-body">
              <span className="envelope-stamp">{letter.icon}</span>
              <h3 className="envelope-title">{letter.title}</h3>
              <p className="envelope-sub">{letter.subtitle}</p>
              <div className="envelope-heart-seal">❤️</div>
            </div>
            <div className="envelope-hover-hint">Tap to Open 💌</div>
          </div>
        ))}
      </div>

      {/* Love Letter Modal Modal */}
      {activeLetter && (
        <div className="letter-modal-backdrop" onClick={closeLetter}>
          <div
            className="letter-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: activeLetter.color }}
          >
            <button className="letter-close-btn" onClick={closeLetter} aria-label="Close letter">
              ✖
            </button>

            <div className="letter-paper">
              <div className="letter-paper-header">
                <span className="letter-paper-icon">{activeLetter.icon}</span>
                <h3>{activeLetter.title}</h3>
                <span className="letter-paper-date">Stitched with Love 💕</span>
              </div>

              <div className="letter-paper-divider" />

              <div className="letter-paper-body">
                {activeLetter.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="letter-paper-footer">
                <span>With all my love & heart,</span>
                <span className="handwritten-signature">Yours Always ❤️</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
