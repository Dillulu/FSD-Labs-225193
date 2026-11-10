import { useState } from 'react'
import { skillGroups } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import SkillCard from './SkillCard'
import Reveal from './Reveal'
import './Skills.css'

export default function Skills() {
  // On small screens the groups become tabs; on desktop all three cards show.
  const [activeTab, setActiveTab] = useState(skillGroups[0].id)

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading index="02" label="Skills" title="A toolkit for the" accent="full stack.">
          The languages, frameworks and tools I reach for — from the first wireframe to production.
        </SectionHeading>

        <Reveal className="skills__tabs" role="tablist" aria-label="Skill groups">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={activeTab === g.id}
              className={activeTab === g.id ? 'is-active' : ''}
              onClick={() => setActiveTab(g.id)}
            >
              {g.title}
            </button>
          ))}
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.id}
              delay={i * 90}
              className={`skills__cell ${activeTab === group.id ? 'is-active' : ''}`}
            >
              <SkillCard group={group} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
