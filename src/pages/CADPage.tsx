import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { Reveal } from '../components/Reveal'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { cadProjects, stlAsset, type CadProject } from '../content/archive'

function renderCadProjectCard(project: CadProject) {
  if (!project.media) return null

  return (
    <Reveal className="project-card-reveal">
      <article className="project-card project-card-engineering cad-project-card">
        <Link className="project-card-link" to={project.href}>
          <MediaFrame asset={project.media} variant="card" autoplayPreview={project.media.kind === 'video'} hoverAudio={project.media.kind === 'video'} />
          <div className="project-card-body text-reveal">
            <div className="project-card-meta">
              <span className="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.year}</p>
            {project.tools && project.tools.length > 0 && (
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

const mediaCadProjects = cadProjects.filter((project) => project.media).sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))

export function CADPage() {
  return (
    <main className="archive-page cad-page">
      <div className="cad-background-model" aria-label={`Interactive ${stlAsset.title} background model`}>
        <StlScrollViewer src={stlAsset.src} alt={stlAsset.alt} background lineOpacity={0.8} />
      </div>
      <section className="archive-hero page-shell text-reveal" aria-labelledby="cad-title">
        <h1 id="cad-title">CAD</h1>
        <p className="archive-lede">Designed in Fusion 360 and SolidWorks</p>
      </section>
      <section className="stl-section cad-model-intro page-shell" aria-labelledby="stl-title">
        <Link className="project-card project-card-engineering cad-model-link" to="/cad/tiny-whoop-drone">
          <div className="project-card-body text-reveal">
            <div className="project-card-meta">
              <span className="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3 id="stl-title">{stlAsset.title}</h3>
            <p>Scroll through the page to rotate the model</p>
          </div>
        </Link>
      </section>
      <section className="archive-image-grid page-shell" aria-label="CAD project images">
        {mediaCadProjects.map(renderCadProjectCard)}
      </section>
    </main>
  )
}
