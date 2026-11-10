import { marqueeItems } from '../data/portfolio'
import './Marquee.css'

// Infinite horizontal ticker of technologies. The list is rendered twice
// so the CSS animation can loop seamlessly.
export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= marqueeItems.length}>
            {item}
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
