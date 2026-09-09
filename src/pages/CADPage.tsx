import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { cadProjects, stlAsset } from '../content/archive'

export function CADPage() {
  return (
    <main className="archive-page cad-page">
      <div className="cad-background-model" aria-label={`Interactive ${stlAsset.title} background model`}>
        <StlScrollViewer src={stlAsset.src} alt={stlAsset.alt} title={stlAsset.title} background />
      </div>
      <section className="archive-hero page-shell" aria-labelledby="cad-title">
        <h1 id="cad-title">CAD.</h1>
        <p className="archive-lede">Models, prototypes, and process images from the design archive.</p>
      </section>
      <section className="stl-section cad-model-intro page-shell" aria-labelledby="stl-title">
        <Link className="project-card project-card-engineering cad-model-link" to="/cad/tiny-whoop-drone">
          <div className="project-card-body">
            <div className="project-card-meta">
              <span className="category-label">CAD / Interactive</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3 id="stl-title">{stlAsset.title}</h3>
            <p>Scroll through the page to turn the model behind the archive.</p>
          </div>
        </Link>
      </section>
      <section className="archive-image-grid page-shell" aria-label="CAD and design projects">
        {cadProjects.filter((project) => project.media).map((project) => (
          <article className="project-card project-card-engineering cad-project-card" key={project.slug}>
            <Link className="project-card-link" to={`/cad/${project.slug}`}>
              <MediaFrame asset={project.media!} variant="card" />
              <div className="project-card-body">
                <div className="project-card-meta">
                  <span className="category-label">CAD project</span>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.alt}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
