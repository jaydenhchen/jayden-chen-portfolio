import { type MouseEvent } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { Reveal } from '../components/Reveal'
import { getProjectBySlug, type ProjectCategory } from '../content/projects'

const uniformImageProjectSlugs = new Set(['clone-trooper-helmet', 'wood-carving-panel'])

function getCategoryLabel(category: ProjectCategory) {
  if (category === 'cgi') return 'CGI / Animation'
  if (category === 'other') return 'Other project'
  return 'Engineering'
}

function MissingProject() {
  return (
    <main className="not-found page-shell text-reveal">
      <p className="eyebrow">Archive / No match</p>
      <h1>This project is not here</h1>
      <p>Choose another project from the work page</p>
      <Link className="button button-primary" to="/#work">
        Back to work <span aria-hidden="true">↗</span>
      </Link>
    </main>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const project = getProjectBySlug(slug)

  if (!project) return <MissingProject />

  const fromPath = typeof location.state?.from === 'string' && location.state.from.startsWith('/') ? location.state.from : undefined
  const backPath = fromPath ?? (project.category === 'engineering' ? '/cad' : project.category === 'cgi' ? '/cgi' : '/other')
  const backLabel = fromPath?.startsWith('/other') ? 'Back to other projects' : 'Back to work'
  const handleBack = fromPath
    ? (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        navigate(-1)
      }
    : undefined
  const categoryLabel = getCategoryLabel(project.category)
  const isUniformImageProject = uniformImageProjectSlugs.has(project.slug)
  const projectImages = [project.heroMedia, ...project.gallery]
  const heroHasAudio = project.heroMedia.kind === 'video'

  return (
    <main className={`project-page project-page-${project.category} project-page-${project.slug}`}>
      <section className={`project-hero page-shell${isUniformImageProject ? ' project-hero-images' : ''}`} aria-labelledby="project-title">
        <Link className="back-link" to={backPath} onClick={handleBack}>
          <span aria-hidden="true">←</span> {backLabel}
        </Link>
        {isUniformImageProject ? (
          <div className="project-hero-copy text-reveal">
            <h1 id="project-title">{project.title}</h1>
          </div>
        ) : (
          <>
            <div className="project-hero-copy text-reveal">
              <h1 id="project-title">{project.title}</h1>
            </div>
            <Reveal className="project-hero-media">
              <MediaFrame
                asset={project.heroMedia}
                variant="detail"
                expandMedia
                expandGallery={projectImages}
                expandIndex={0}
                autoplayPreview={project.heroMedia.kind === 'video'}
                autoplayMuted={false}
                controls={false}
                muteToggle={heroHasAudio}
                hoverAudio={heroHasAudio}
                showCaption={false}
                loading="eager"
              />
            </Reveal>
          </>
        )}
      </section>

      {isUniformImageProject && (
        <section className="project-gallery project-image-gallery page-shell" aria-label="Project images">
          <div className="gallery-grid">
            {projectImages.map((asset, index) => (
              <MediaFrame key={asset.src} asset={asset} variant="detail" expandMedia expandGallery={projectImages} expandIndex={index} showCaption={false} />
            ))}
          </div>
        </section>
      )}

      {!isUniformImageProject && project.gallery.length > 0 && (
        <section className="project-gallery page-shell" aria-label="Additional project images">
          <div className="gallery-grid">
            {project.gallery.map((asset, index) => (
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
              />
            ))}
          </div>
        </section>
      )}

      <section className="project-meta-section page-shell" aria-label="Project details">
        <dl className="project-meta-grid text-reveal">
          <div>
            <dt>Type</dt>
            <dd>{categoryLabel}</dd>
          </div>
          {project.role && (
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          <div>
            <dt>Made with</dt>
            <dd>{project.tools.join(' · ')}</dd>
          </div>
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
