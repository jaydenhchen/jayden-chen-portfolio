import { Link, useLocation } from 'react-router-dom'
import { getProjectPath, type Project } from '../content/projects'
import { Reveal } from './Reveal'
import { MediaFrame } from './MediaFrame'
type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const location = useLocation()
  const from = `${location.pathname}${location.search}${location.hash}`

  return (
    <Reveal className="project-card-reveal">
      <article className={`project-card project-card-${project.category} project-card-${project.slug}`}>
        <Link className="project-card-link" to={getProjectPath(project.slug)} state={{ from }}>
          <MediaFrame
            asset={project.thumbnail}
            variant="card"
            autoplayPreview={project.thumbnail.kind === 'video'}
            hoverAudio={project.thumbnail.kind === 'video'}
          />
          <div className="project-card-body text-reveal">
            <div className="project-card-meta">
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.year}</p>
          </div>
        </Link>
      </article>
    </Reveal>
  )
}
