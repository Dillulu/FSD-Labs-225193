import useMagnetic from '../hooks/useMagnetic'
import { ArrowRight } from './Icons'
import './Button.css'

// Reusable button. Renders an <a> when `href` is passed, otherwise a <button>.
// variant: 'primary' | 'ghost' | 'light'
export default function Button({
  href,
  variant = 'primary',
  icon = <ArrowRight />,
  magnetic = true,
  className = '',
  children,
  ...rest
}) {
  const ref = useMagnetic(magnetic ? 0.22 : 0)
  const Tag = href ? 'a' : 'button'

  return (
    <Tag ref={ref} href={href} className={`btn btn--${variant} ${className}`} {...rest}>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon">
          <span className="btn__icon-track">
            {icon}
            {icon}
          </span>
        </span>
      )}
    </Tag>
  )
}
