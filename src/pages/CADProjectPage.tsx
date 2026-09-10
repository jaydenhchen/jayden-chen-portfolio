import { type MouseEvent } from 'react'
import { Navigate, Link, useLocation, useNavigate, useParams } from 'react-router-dom'
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
      <Link className="button button-primary" to="/cad">
        Back to CAD archive <span aria-hidden="true">↗</span>
      </Link>
    </main>
  )
}

export function CADProjectPage() {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const project = getCadProjectBySlug(slug)

  if (!project) return <MissingCadProject />
  if (project.href !== `/cad/${project.slug}`) return <Navigate to={project.href} replace />

  const fromPath = typeof location.state?.from === 'string' && location.state.from.startsWith('/') ? location.state.from : undefined
  const backPath = fromPath ?? '/cad'
  const handleBack = fromPath
    ? (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        navigate(-1)
      }
    : undefined
  const isUniformImageProject = project.slug === 'bamboo-cast-project'
  const projectImages = project.media ? [project.media, ...(project.gallery ?? [])] : []

  return (
    <main className={`project-page project-page-engineering project-page-${project.slug} cad-project-detail`}>
      <section className={`project-hero page-shell${isUniformImageProject ? ' project-hero-images' : ''}`} aria-labelledby="cad-project-title">
        <Link className="back-link" to={backPath} onClick={handleBack}>
          <span aria-hidden="true">←</span> Back to CAD archive
        </Link>
        {isUniformImageProject ? (
          <div className="project-hero-copy text-reveal">
            <h1 id="cad-project-title">{project.title}</h1>
          </div>
        ) : (
          <>
            <div className="project-hero-copy text-reveal">
              <div>
                <h1 id="cad-project-title">{project.title}</h1>
              </div>
            </div>
            <Reveal className={`project-hero-media${project.stl && (project.media || project.gallery?.length) ? ' cad-project-media-collection' : ''}`}>
              {project.stl && (
                <StlScrollViewer
                  src={project.stl.src}
                  alt={project.stl.alt}
                  lineOpacity={0.8}
                  showCaption={false}
                  cameraDistance={project.slug === 'tiny-whoop-drone' ? 3.6 : undefined}
                  modelOffsetY={project.slug === 'tiny-whoop-drone' ? 0.1 : undefined}
                />
              )}
              {project.media && (
                <MediaFrame
                  asset={project.media}
                  variant="detail"
                  expandMedia
                  expandGallery={projectImages}
                  expandIndex={0}
                  autoplayPreview={project.media.kind === 'video'}
                  autoplayMuted={false}
                  muteToggle={project.media.kind === 'video'}
                  showCaption={false}
                  loading="eager"
                />
              )}
              {project.gallery?.map((asset, index) => (
                <MediaFrame
                  key={asset.src}
                  asset={asset}
                  variant="detail"
                  expandMedia
                  expandGallery={projectImages}
                  expandIndex={index + 1}
                  autoplayPreview={asset.kind === 'video'}
                  autoplayMuted={false}
                  controls={false}
                  muteToggle={asset.kind === 'video'}
                  showCaption={false}
                  loading="eager"
                />
              ))}
            </Reveal>
          </>
        )}
      </section>

      {isUniformImageProject && (
        <section className="project-gallery project-image-gallery page-shell" aria-label="Project images">
          <div className="gallery-grid">
            {projectImages.map((asset, index) => (
              <MediaFrame
                key={asset.src}
                asset={asset}
                variant="detail"
                expandMedia
                expandGallery={projectImages}
                expandIndex={index}
                showCaption={false}
                loading="eager"
              />
            ))}
          </div>
        </section>
      )}

      <section className="project-meta-section page-shell" aria-label="CAD project details">
        <dl className="project-meta-grid text-reveal" aria-label="CAD project details">
          <div>
            <dt>Type</dt>
            <dd>CAD project</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>
              {project.stl && (project.media || project.gallery?.length)
                ? 'Interactive STL + Design media'
                : project.stl
                  ? 'Interactive STL'
                  : project.media?.kind === 'video' || project.gallery?.some((asset) => asset.kind === 'video')
                    ? 'Animation'
                    : project.media || project.gallery?.length
                      ? 'Design images'
                      : 'Design image'}
            </dd>
          </div>
          {project.tools && project.tools.length > 0 && (
            <div>
              <dt>Made with</dt>
              <dd>{project.tools.join(' · ')}</dd>
            </div>
          )}
          {project.year && (
            <div className="project-meta-year">
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          )}
        </dl>
      </section>
    </main>
  )
}
