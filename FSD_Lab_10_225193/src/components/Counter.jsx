import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'

// Counts up from 0 to `value` once it scrolls into view.
export default function Counter({ value, suffix = '', duration = 1400 }) {
  const [ref, inView] = useInView({ threshold: 0.6 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {n}
      <sup>{suffix}</sup>
    </span>
  )
}
