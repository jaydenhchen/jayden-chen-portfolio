import { type MouseEvent } from 'react'
import { Navigate, Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { Reveal } from '../components/Reveal'
import { getArchiveVideoBySlug } from '../content/archive'

function MissingVideo() {
  return (
    <main className="not-found page-shell text-reveal">
      <p className="eyebrow">CGI archive / No match</p>
      <h1>This video is not here</h1>
      <p>Choose another animation from the CGI archive</p>
      <Link className="button button-primary" to="/cgi">
        Back to CGI archive <span aria-hidden="true">↗</span>
      </Link>
    </main>
  )
}

export function CGIVideoPage() {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const video = getArchiveVideoBySlug(slug)

  if (!video) return <MissingVideo />
  if (video.href !== `/cgi/${video.slug}`) return <Navigate to={video.href} replace />

  const fromPath = typeof location.state?.from === 'string' && location.state.from.startsWith('/') ? location.state.from : undefined
  const backPath = fromPath ?? '/cgi'
  const handleBack = fromPath
    ? (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        navigate(-1)
      }
    : undefined
  const heroAsset = { src: video.src, alt: video.alt, kind: 'video' as const }
  const projectMedia = [heroAsset, ...(video.gallery ?? [])]
  return (
    <main
      className={`project-page project-page-cgi archive-video-page archive-video-page-${video.orientation === 'portrait' ? 'portrait' : 'landscape'} archive-video-page-${video.slug}`}
    >
      <section className="project-hero page-shell" aria-labelledby="cgi-video-title">
        <Link className="back-link" to={backPath} onClick={handleBack}>
          <span aria-hidden="true">←</span> Back to CGI archive
        </Link>
        <div className="project-hero-copy text-reveal">
          <div>
            <h1 id="cgi-video-title">{video.title}</h1>
          </div>
        </div>
        <Reveal className="project-hero-media">
          <MediaFrame
            asset={heroAsset}
            variant="detail"
            autoplayPreview
            autoplayMuted={false}
            muteToggle
            showCaption={false}
            expandMedia
            expandGallery={projectMedia}
            expandIndex={0}
          />
        </Reveal>
      </section>

      {video.gallery && video.gallery.length > 0 && (
        <section className="project-gallery page-shell" aria-label="Additional project media">
          <div className="gallery-grid">
            {video.gallery.map((asset, index) => (
              <MediaFrame
                key={asset.src}
                asset={asset}
                variant="detail"
                expandMedia
                expandGallery={projectMedia}
                expandIndex={index + 1}
                autoplayPreview={asset.kind === 'video'}
                autoplayMuted={false}
                controls={false}
                muteToggle={asset.kind === 'video'}
                showCaption={false}
                loading="eager"
              />
            ))}
          </div>
        </section>
      )}

      <section className="project-meta-section page-shell" aria-label="Video details">
        <dl className="project-meta-grid text-reveal">
          <div>
            <dt>Type</dt>
            <dd>CGI animation</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{video.orientation === 'portrait' ? 'Vertical' : 'Landscape'}</dd>
          </div>
          {video.tools && video.tools.length > 0 && (
            <div>
              <dt>Made with</dt>
              <dd>{video.tools.join(' · ')}</dd>
            </div>
          )}
          <div className="project-meta-year">
            <dt>Year</dt>
            <dd>{video.year}</dd>
          </div>
        </dl>
      </section>

      {video.youtubeUrl && (
        <nav className="project-next page-shell text-reveal" aria-label="CGI video navigation">
          <a className="next-project-link" href={video.youtubeUrl} target="_blank" rel="noreferrer">
            <span className="eyebrow">External video</span>
            <strong>Watch on YouTube</strong>
            <span className="next-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </nav>
      )}
    </main>
  )
}
