import { useRef } from 'react'
import { profile, rotatingWords } from '../data/portfolio'
import heroImg from '../assets/img/hero-sphere.jpg'
import Button from './Button'
import RotatingWord from './RotatingWord'
import Marquee from './Marquee'
import { ArrowUpRight, MapPin } from './Icons'
import './Hero.css'

export default function Hero() {
  const frameRef = useRef(null)

  // 3D tilt that follows the pointer over the hero image.
  const handleMove = (e) => {
    const el = frameRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${px * 10}deg`)
    el.style.setProperty('--rx', `${-py * 10}deg`)
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
  }
  const reset = () => {
    const el = frameRef.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--a" />
        <span className="blob blob--b" />
        <span className="blob blob--c" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="status-pill hero__in" style={{ '--d': 0 }}>
            <span className="status-pill__dot" />
            Open to internships · 2026
          </p>

          <h1 className="hero__title">
            <span className="hero__line hero__in" style={{ '--d': 1 }}>{profile.firstName}</span>
            <span className="hero__line hero__in" style={{ '--d': 2 }}>
              <em>{profile.lastName}</em>
              <span className="hero__role">{profile.role}</span>
            </span>
          </h1>

          <p className="hero__lead hero__in" style={{ '--d': 3 }}>
            CS student at {profile.university.split(',')[0]} who designs and builds{' '}
            <RotatingWord words={rotatingWords} /> that feel fast, calm and carefully made.
          </p>

          <div className="hero__actions hero__in" style={{ '--d': 4 }}>
            <Button href="#projects">View my work</Button>
            <Button href="#contact" variant="ghost" icon={<ArrowUpRight />}>
              Get in touch
            </Button>
          </div>

          <dl className="hero__meta hero__in" style={{ '--d': 5 }}>
            <div>
              <dt>Reg. ID</dt>
              <dd>{profile.regId}</dd>
            </div>
            <div>
              <dt>Program</dt>
              <dd>{profile.degree}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd><MapPin width={14} height={14} /> {profile.location}</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual hero__in" style={{ '--d': 2 }}>
          <div
            className="hero__frame"
            ref={frameRef}
            onMouseMove={handleMove}
            onMouseLeave={reset}
          >
            <img src={heroImg} alt="Soft pastel 3D render of a sphere on flowing ribbons" />
            <span className="hero__glare" aria-hidden="true" />

            <div className="float-card float-card--code">
              <span className="float-card__dots"><i /><i /><i /></span>
              <code>
                <span className="t-key">const</span> hamza = {'{'}<br />
                &nbsp;&nbsp;stack: <span className="t-str">'MERN'</span>,<br />
                &nbsp;&nbsp;coffee: <span className="t-bool">true</span><br />
                {'}'}
              </code>
            </div>

            <div className="float-card float-card--stat">
              <strong>12+</strong>
              <span>projects shipped<br />from idea to deploy</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to About">
        <span />
      </a>

      <Marquee />
    </section>
  )
}
