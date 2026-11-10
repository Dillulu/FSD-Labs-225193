import { profile, stats } from '../data/portfolio'
import aboutImg from '../assets/img/about-wave.jpg'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Counter from './Counter'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <Reveal className="about__media">
          <img src={aboutImg} alt="Abstract gradient waves in violet and blue" loading="lazy" />
          <div className="about__badge">
            <span className="about__badge-label">Currently</span>
            <span>Building with React 19 &amp; Node</span>
          </div>
        </Reveal>

        <div className="about__body">
          <SectionHeading index="01" label="About" title="Code that is" accent="quietly good." />

          <Reveal as="p" className="about__text" delay={80}>
            I’m <strong>{profile.name}</strong>, a {profile.degree} student at {profile.university}.
            I enjoy the whole journey of a product — sketching the interface, modelling the data,
            writing the API and polishing the last pixel until it feels right.
          </Reveal>
          <Reveal as="p" className="about__text" delay={140}>
            My focus is the JavaScript ecosystem: React on the front, Node and Express on the back,
            and MongoDB or PostgreSQL underneath. I care about performance, accessibility and
            interfaces that get out of the user’s way.
          </Reveal>

          <Reveal className="about__stats" delay={200}>
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat__value">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
