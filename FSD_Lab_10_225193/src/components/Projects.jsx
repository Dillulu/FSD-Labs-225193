import { useMemo, useState } from 'react'
import { projectFilters, projects } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import './Projects.css'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const countFor = (f) => (f === 'All' ? projects.length : projects.filter((p) => p.category === f).length)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="projects__head">
          <SectionHeading index="03" label="Projects" title="Selected" accent="work.">
            A few things I’ve designed and built recently. Filter by type to explore.
          </SectionHeading>

          <Reveal className="filter" role="group" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button
                key={f}
                className={filter === f ? 'is-active' : ''}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className="filter__count">{countFor(f)}</span>
              </button>
            ))}
          </Reveal>
        </div>

        {/* key on filter re-mounts the grid so the cards animate in again */}
        <div className="projects__grid" key={filter}>
          {visible.map((p, i) => (
            <div className="projects__item" style={{ '--i': i }} key={p.id}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
