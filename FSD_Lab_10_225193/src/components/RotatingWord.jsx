import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Cycles through a list of words with a vertical slide transition.
// The wrapper width animates to fit the current word.
export default function RotatingWord({ words, interval = 2200 }) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState()
  const refs = useRef([])

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  useLayoutEffect(() => {
    const measure = () => setWidth(refs.current[index]?.offsetWidth)
    measure()
    document.fonts?.ready.then(measure)
  }, [index])

  const prev = (index - 1 + words.length) % words.length

  return (
    <span className="rotating" style={{ width }}>
      <span className="sr-only">{words[index]}</span>
      {words.map((w, i) => (
        <span
          key={w}
          ref={(el) => (refs.current[i] = el)}
          className={`rotating__word ${i === index ? 'is-current' : ''} ${i === prev ? 'is-prev' : ''}`}
          aria-hidden="true"
        >
          {w}
        </span>
      ))}
    </span>
  )
}
