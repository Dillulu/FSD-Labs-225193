import { journey } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import './Journey.css'

export default function Journey() {
  return (
    <section id="journey" className="section journey">
      <div className="container journey__grid">
        <SectionHeading index="04" label="Journey" title="Education &" accent="experience.">
          Where I’ve been learning and building.
        </SectionHeading>

        <ol className="timeline">
          {journey.map((item, i) => (
            <Reveal as="li" className="timeline__item" key={item.title} delay={i * 100}>
              <span className="timeline__period">{item.period}</span>
              <div className="timeline__content">
                <h3>{item.title}</h3>
                <p className="timeline__place">{item.place}</p>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
