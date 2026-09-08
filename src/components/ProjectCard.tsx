import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import { MediaFrame } from './MediaFrame'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const categoryLabel = project.category === 'cgi' ? 'CGI / Animation' : 'Engineering'

  return (
    <article className={`project-card project-card-${project.category}`}>
      <Link className="project-card-link" to={`/work/${project.slug}`}>
        <MediaFrame asset={project.thumbnail} variant="card" />
        <div className="project-card-body">
          <div className="project-card-meta">
            <span className="category-label">{categoryLabel}</span>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <ul className="tool-list" aria-label={`${project.title} tools`}>
            {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      </Link>
    </article>
  )
}
