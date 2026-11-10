import { ArrowUpRight, Github } from './Icons'

// Reusable project card: image, meta, description, tags and links.
export default function ProjectCard({ project }) {
  const { title, category, year, description, tags, image, live, code, featured } = project

  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <a className="project-card__media" href={live} target="_blank" rel="noreferrer" aria-label={`Open ${title}`}>
        <img src={image} alt={`${title} preview`} loading="lazy" />
        {featured && <span className="project-card__badge">Featured</span>}
        <span className="project-card__open">
          <ArrowUpRight />
        </span>
      </a>
      <div className="project-card__body">
        <p className="project-card__meta">
          <span>{category}</span>
          <span>{year}</span>
        </p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        <ul className="project-card__tags">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="project-card__links">
          <a href={live} target="_blank" rel="noreferrer" className="link-arrow">
            Live demo <ArrowUpRight width={15} height={15} />
          </a>
          <a href={code} target="_blank" rel="noreferrer" className="link-arrow">
            <Github width={15} height={15} /> Source
          </a>
        </div>
      </div>
    </article>
  )
}
