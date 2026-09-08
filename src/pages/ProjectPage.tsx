import { Link, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { Reveal } from '../components/Reveal'
import { getProjectBySlug } from '../content/projects'

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
  const categoryLabel = project.category === 'cgi' ? 'CGI / Animation' : 'Engineering'

  return (
    <main className={`project-page project-page-${project.category}`}>
      <section className="project-hero page-shell" aria-labelledby="project-title">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        <div className="project-hero-copy">
          <p className="eyebrow"><span className="category-dot" aria-hidden="true" />{project.eyebrow}</p>
          <h1 id="project-title">{project.title}</h1>
          <p className="project-summary">{project.summary}</p>
        </div>
        <Reveal className="project-hero-media">
          <MediaFrame asset={project.heroMedia} variant="detail" loading="eager" />
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

      <section className="case-study-section page-shell" aria-labelledby="case-study-title">
        <div className="case-study-intro"><p className="eyebrow">About the project</p><h2 id="case-study-title">How it came together.</h2></div>
        <div className="case-study-sections">
          {project.sections.map((section, index) => (
            <Reveal key={section.heading} className="case-study-block" delay={index * 70}>
              <span className="case-study-number">0{index + 1}</span>
              <div><h3>{section.heading}</h3><p>{section.body}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="project-gallery page-shell" aria-labelledby="gallery-title">
          <div className="gallery-heading"><p className="eyebrow">More images</p><h2 id="gallery-title">A closer look.</h2></div>
          <div className="gallery-grid">{project.gallery.map((asset) => <MediaFrame key={asset.src} asset={asset} variant="detail" />)}</div>
        </section>
      )}

      <nav className="project-next page-shell" aria-label="Project navigation">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        {nextProject && <Link className="next-project-link" to={`/work/${nextProject.slug}`}><span className="eyebrow">Next / {nextProject.category === 'cgi' ? 'Animation' : 'Engineering'}</span><strong>{nextProject.title}</strong><span className="next-arrow" aria-hidden="true">↗</span></Link>}
      </nav>
    </main>
  )
}
