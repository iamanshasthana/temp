import { useState } from 'react'
import { audioEngine } from './AudioPlayer'

const QUESTIONS = [
  {
    id: 1,
    question: "Who loves the other person more? 💖",
    options: [
      { text: "Me (You)! 🙋‍♀️", correct: true, note: "Aww, but I love you 3000 more! 🥰" },
      { text: "You (Me)! 🙋‍♂️", correct: true, note: "Correct! I love you to the moon and back! 🌙" },
      { text: "Both of us equally! 💑", correct: true, note: "Bingo! 100% mutual unconditional love! 💕" }
    ]
  },
  {
    id: 2,
    question: "What is my absolute favorite thing about you? ✨",
    options: [
      { text: "Your cute smile & gorgeous eyes 👁️", correct: true, note: "Yes! They melt my heart every single time." },
      { text: "Your warm heart & caring soul 💗", correct: true, note: "Spot on! You have the sweetest heart ever." },
      { text: "Everything! All of the above! 👑", correct: true, note: "PERFECT ANSWER! I love every single bit of you!" }
    ]
  },
  {
    id: 3,
    question: "What is our official love rule for the future? 📜",
    options: [
      { text: "Infinite hugs every day 🤗", correct: true, note: "Rule #1 locked in forever!" },
      { text: "Never go to sleep without a kiss 💋", correct: true, note: "Rule #2 sealed with love!" },
      { text: "Stay by each other's side forever ❤️", correct: true, note: "Forever and always, my princess!" }
    ]
  }
]

export default function CoupleQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [completed, setCompleted] = useState(false)

  const handleSelectOption = (option) => {
    audioEngine.playSparkleSound()
    setScore((prev) => prev + 1)
    setFeedback(option.note)

    setTimeout(() => {
      setFeedback(null)
      if (currentStep + 1 < QUESTIONS.length) {
        setCurrentStep((prev) => prev + 1)
      } else {
        setCompleted(true)
        audioEngine.playHeartSound()
      }
    }, 1400)
  }

  const restartQuiz = () => {
    audioEngine.playPopSound()
    setCurrentStep(0)
    setScore(0)
    setFeedback(null)
    setCompleted(false)
  }

  return (
    <section className="quiz-section">
      <div className="section-header">
        <span className="section-badge">🎯 Mini Love Quiz</span>
        <h2 className="section-title">How Well Do You Know Us?</h2>
        <p className="section-subtitle">Answer these 3 cute questions to reveal your love certificate!</p>
      </div>

      <div className="quiz-card-wrapper">
        {!completed ? (
          <div className="quiz-card">
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="quiz-step-indicator">
              Question {currentStep + 1} of {QUESTIONS.length}
            </div>

            <h3 className="quiz-question">
              {QUESTIONS[currentStep].question}
            </h3>

            <div className="quiz-options">
              {QUESTIONS[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  className="quiz-opt-btn"
                  onClick={() => handleSelectOption(opt)}
                  disabled={feedback !== null}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="quiz-feedback-box pop-anim">
                <span className="feedback-emoji">✨</span> {feedback}
              </div>
            )}
          </div>
        ) : (
          <div className="quiz-certificate-card pop-anim">
            <div className="cert-ribbon">🏆 OFFICIAL CERTIFICATE 🏆</div>
            <h3 className="cert-title">Certified Perfect Girlfriend!</h3>
            <div className="cert-avatar">👸❤️</div>
            <p className="cert-desc">
              Congratulations! You scored <strong>100/100</strong> on the Love Compatibility Test! You are officially declared the sweetest, most gorgeous, and most loved girl in the entire universe!
            </p>
            <div className="cert-stamp">SEALED WITH LOVE 💕</div>

            <button className="quiz-retry-btn" onClick={restartQuiz}>
              Take Quiz Again 💖
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
