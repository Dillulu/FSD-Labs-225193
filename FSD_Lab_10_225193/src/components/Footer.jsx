import { navLinks, profile } from '../data/portfolio'
import { ArrowUp } from './Icons'
import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__big" aria-hidden="true">
          {profile.firstName} <em>{profile.lastName}</em>
        </p>
        <div className="footer__row">
          <p>
            © {year} {profile.name} · Reg. ID {profile.regId}
          </p>
          <nav aria-label="Footer">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`}>{l.label}</a>
            ))}
          </nav>
          <a href="#home" className="footer__top">
            Back to top <ArrowUp width={15} height={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
