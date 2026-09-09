import { Navigate, Link, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { Reveal } from '../components/Reveal'
import { getCadProjectBySlug } from '../content/archive'

function MissingCadProject() {
  return (
    <main className="not-found page-shell text-reveal">
      <p className="eyebrow">CAD archive / No match</p>
      <h1>This CAD project is not here</h1>
      <p>Choose another project from the CAD archive</p>
      <Link className="button button-primary" to="/cad">Back to CAD archive <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

export function CADProjectPage() {
  const { slug } = useParams()
  const project = getCadProjectBySlug(slug)

  if (!project) return <MissingCadProject />
  if (project.href !== `/cad/${project.slug}`) return <Navigate to={project.href} replace />

  return (
    <main className="project-page project-page-engineering cad-project-detail">
      <section className="project-hero page-shell" aria-labelledby="cad-project-title">
        <Link className="back-link" to="/cad"><span aria-hidden="true">←</span> Back to CAD archive</Link>
        <div className="project-hero-copy text-reveal">
          <div>
            <h1 id="cad-project-title">{project.title}</h1>
          </div>
        </div>
        <Reveal className={`project-hero-media${project.stl && (project.media || project.gallery?.length) ? ' cad-project-media-collection' : ''}`}>
          {project.stl && (
            <StlScrollViewer src={project.stl.src} alt={project.stl.alt} lineOpacity={0.8} />
          )}
          {project.media && <MediaFrame asset={project.media} variant="detail" showCaption={false} loading="eager" />}
          {project.gallery?.map((asset) => <MediaFrame key={asset.src} asset={asset} variant="detail" showCaption={false} loading="eager" />)}
        </Reveal>
      </section>

      <section className="project-meta-section page-shell" aria-label="CAD project details">
        <dl className="project-meta-grid text-reveal" aria-label="CAD project details">
          <div><dt>Type</dt><dd>CAD project</dd></div>
          <div><dt>Format</dt><dd>{project.stl && (project.media || project.gallery?.length) ? 'Interactive STL + Design images' : project.stl ? 'Interactive STL' : project.media || project.gallery?.length ? 'Design images' : 'Design image'}</dd></div>
        </dl>
      </section>

    </main>
  )
}
