import { Link, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { Reveal } from '../components/Reveal'
import { getProjectBySlug, type ProjectCategory } from '../content/projects'

function getCategoryLabel(category: ProjectCategory) {
  if (category === 'cgi') return 'CGI / Animation'
  if (category === 'other') return 'Other project'
  return 'Engineering'
}

function MissingProject() {
  return (
    <main className="not-found page-shell">
      <p className="eyebrow">Archive / No match</p>
      <h1>This project is not here.</h1>
      <p>Choose another project from the work page.</p>
      <Link className="button button-primary" to="/#work">Back to work <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <MissingProject />

  const nextProject = getProjectBySlug(project.nextSlug)
  const categoryLabel = getCategoryLabel(project.category)

  return (
    <main className={`project-page project-page-${project.category}`}>
      <section className="project-hero page-shell" aria-labelledby="project-title">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        <div className="project-hero-copy">
          <h1 id="project-title">{project.title}</h1>
          <p className="project-summary">{project.summary}</p>
        </div>
        <Reveal className="project-hero-media">
          <MediaFrame asset={project.heroMedia} variant="detail" autoplayPreview={project.heroMedia.kind === 'video'} hoverAudio={project.heroMedia.kind === 'video'} loading="eager" />
        </Reveal>
      </section>

      <section className="project-meta-section page-shell" aria-label="Project details">
        <dl className="project-meta-grid">
          <div><dt>Type</dt><dd>{categoryLabel}</dd></div>
          {project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}
          {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
          <div><dt>Made with</dt><dd>{project.tools.join(' · ')}</dd></div>
        </dl>
      </section>


      {project.gallery.length > 0 && (
        <section className="project-gallery page-shell" aria-labelledby="gallery-title">
          <div className="gallery-heading"><p className="eyebrow">More images</p><h2 id="gallery-title">A closer look.</h2></div>
          <div className="gallery-grid">{project.gallery.map((asset) => <MediaFrame key={asset.src} asset={asset} variant="detail" />)}</div>
        </section>
      )}

      {nextProject && (
        <nav className="project-next page-shell" aria-label="Project navigation">
          <Link className="next-project-link" to={`/work/${nextProject.slug}`}><span className="eyebrow">Next / {getCategoryLabel(nextProject.category)}</span><strong>{nextProject.title}</strong><span className="next-arrow" aria-hidden="true">↗</span></Link>
        </nav>
      )}
    </main>
  )
}
