import Reveal from './Reveal'
import './SectionHeading.css'

// Reusable section heading: a numbered eyebrow label plus a title.
// `accent` is rendered in the italic serif face for contrast.
export default function SectionHeading({ index, label, title, accent, children, align = 'left' }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__line" />
        {label}
      </p>
      <h2 className="section-title">
        {title} {accent && <em>{accent}</em>}
      </h2>
      {children && <p className="section-sub">{children}</p>}
    </Reveal>
  )
}
