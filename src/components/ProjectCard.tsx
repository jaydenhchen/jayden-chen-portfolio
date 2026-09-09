import { Link } from 'react-router-dom'
import { getProjectPath, type Project } from '../content/projects'
import { Reveal } from './Reveal'
import { MediaFrame } from './MediaFrame'
type ProjectCardProps = {
  project: Project
  showTools?: boolean
}

export function ProjectCard({ project, showTools = false }: ProjectCardProps) {

  return (
    <Reveal className="project-card-reveal">
      <article className={`project-card project-card-${project.category}`}>
        <Link className="project-card-link" to={getProjectPath(project.slug)}>
          <MediaFrame asset={project.thumbnail} variant="card" autoplayPreview={project.thumbnail.kind === 'video'} hoverAudio={project.thumbnail.kind === 'video'} />
          <div className="project-card-body text-reveal">
            <div className="project-card-meta">
              <span className="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.year}</p>
            {showTools && project.tools.length > 0 && (
              <div className="project-card-made-with">
                <span className="project-card-made-with-label">Made with</span>
                <ul className="tool-list project-card-tool-list" aria-label={`${project.title} tools`}>
                  {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </div>
            )}
          </div>
        </Link>
      </article>
    </Reveal>
  )
}
