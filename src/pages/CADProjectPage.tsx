import { Link, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { Reveal } from '../components/Reveal'
import { getCadProjectBySlug } from '../content/archive'

function MissingCadProject() {
  return (
    <main className="not-found page-shell">
      <p className="eyebrow">CAD archive / No match</p>
      <h1>This CAD project is not here.</h1>
      <p>Choose another project from the CAD archive.</p>
      <Link className="button button-primary" to="/cad">Back to CAD archive <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

export function CADProjectPage() {
  const { slug } = useParams()
  const project = getCadProjectBySlug(slug)

  if (!project) return <MissingCadProject />

  return (
    <main className="project-page project-page-engineering cad-project-detail">
      <section className="project-hero page-shell" aria-labelledby="cad-project-title">
        <Link className="back-link" to="/cad"><span aria-hidden="true">←</span> Back to CAD archive</Link>
        <div className="project-hero-copy">
          <div>
            <h1 id="cad-project-title">{project.title}</h1>
          </div>
        </div>
        <Reveal className="project-hero-media">
          {project.media ? (
            <MediaFrame asset={project.media} variant="detail" loading="eager" />
          ) : project.stl ? (
            <StlScrollViewer src={project.stl.src} alt={project.stl.alt} title={project.stl.title} />
          ) : null}
        </Reveal>
      </section>

      <section className="project-meta-section page-shell" aria-label="CAD project details">
        <dl className="project-meta-grid">
          <div><dt>Type</dt><dd>CAD project</dd></div>
          <div><dt>Format</dt><dd>{project.stl ? 'Interactive STL' : 'Design image'}</dd></div>
        </dl>
      </section>

    </main>
  )
}
