// Reusable card for one skill group. A radial "spotlight" follows the cursor.
export default function SkillCard({ group, index }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <article className="skill-card" onMouseMove={onMove}>
      <header className="skill-card__head">
        <span className="skill-card__index">0{index + 1}</span>
        <h3>{group.title}</h3>
      </header>
      <p className="skill-card__blurb">{group.blurb}</p>
      <ul className="skill-card__list">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <span>{skill.name}</span>
            <span className="level" aria-label={`${skill.level} out of 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <i key={n} className={n <= skill.level ? 'on' : ''} />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
