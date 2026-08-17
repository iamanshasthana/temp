import t1_img1 from '../assets/t1_img1.jpg'
import t1_img2 from '../assets/t1_img2.jpg'
import t1_img3 from '../assets/t1_img3.jpg'
import t1_img4 from '../assets/t1_img4.jpg'
import img3 from '../assets/img3.jpg'
import img5 from '../assets/img5.jpg'

const TIMELINE_EVENTS = [
  {
    id: 1,
    title: 'The Spark That Started It All ✨',
    tag: 'First Chapter',
    image: t1_img1,
    description: 'The unforgettable day our paths crossed. From the very first moment, there was something undeniably magical about your smile.',
    date: 'A Beautiful Memory'
  },
  {
    id: 2,
    title: 'Our Late Night Laughter 🌙',
    tag: 'Precious Moments',
    image: t1_img2,
    description: 'Hours turned into minutes whenever we talked. Sharing secrets, silly jokes, and realizing we were made for each other.',
    date: 'Endless Chats'
  },
  {
    id: 3,
    title: 'My Favorite Girl ❤️',
    tag: 'Primary Hero Spotlight',
    image: img3, // Explicitly using src/assets/img3.jpg
    description: 'Looking into your eyes and knowing that I never want to let you go. You bring so much grace, joy, and warmth into my life.',
    date: 'Always In My Heart'
  },
  {
    id: 4,
    title: 'Adventures & Sweet Smiles 🌸',
    tag: 'Together Forever',
    image: t1_img3,
    description: 'Every place becomes beautiful when I am by your side. Here is to a lifetime of creating cute memories together.',
    date: 'Our Endless Journey'
  },
  {
    id: 5,
    title: 'Hand In Hand Through Everything 🤝',
    tag: 'Unbreakable Bond',
    image: t1_img4,
    description: 'No matter what challenges life throws our way, holding your hand gives me strength, comfort, and infinite peace.',
    date: 'Forever Yours'
  }
]

export default function MemoryTimeline() {
  return (
    <section className="timeline-section">
      <div className="section-header">
        <span className="section-badge">⏳ Our Journey</span>
        <h2 className="section-title">Chapters of Our Love</h2>
        <p className="section-subtitle">A walk down memory lane with the moments that brought us close.</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        {TIMELINE_EVENTS.map((event, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={event.id}
              className={`timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}`}
            >
              <div className="timeline-dot">💖</div>
              <div className="timeline-card">
                <div className="timeline-card-image-wrap">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  <span className="timeline-badge">{event.tag}</span>
                </div>
                <div className="timeline-card-content">
                  <span className="timeline-date">{event.date}</span>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-desc">{event.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
