import { Link, useLocation } from 'react-router-dom'
import type { ArchiveVideo } from '../content/archive'
import { getProjectPath, type Project } from '../content/projects'
import { Reveal } from './Reveal'
import { MediaFrame } from './MediaFrame'

type ProjectCardItem = Project | ArchiveVideo

const isArchiveVideo = (item: ProjectCardItem): item is ArchiveVideo => 'href' in item

type ProjectCardProps = {
  project: ProjectCardItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const location = useLocation()
  const from = `${location.pathname}${location.search}${location.hash}`
  const archiveVideo = isArchiveVideo(project)
  const asset = archiveVideo ? { src: project.src, alt: project.alt, kind: 'video' as const } : project.thumbnail
  const href = archiveVideo ? project.href : getProjectPath(project.slug)
  const category = archiveVideo ? 'cgi' : project.category

  return (
    <Reveal className="project-card-reveal">
      <article className={`project-card project-card-${category} project-card-${project.slug}`}>
        <Link className="project-card-link" to={href} state={{ from }}>
          <MediaFrame asset={asset} variant="card" autoplayPreview={asset.kind === 'video'} hoverAudio={asset.kind === 'video'} />
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
