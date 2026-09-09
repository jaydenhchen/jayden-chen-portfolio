import { Navigate, Link, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { Reveal } from '../components/Reveal'
import { getArchiveVideoBySlug } from '../content/archive'

function MissingVideo() {
  return (
    <main className="not-found page-shell text-reveal">
      <p className="eyebrow">CGI archive / No match</p>
      <h1>This video is not here</h1>
      <p>Choose another animation from the CGI archive</p>
      <Link className="button button-primary" to="/cgi">Back to CGI archive <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

export function CGIVideoPage() {
  const { slug } = useParams()
  const video = getArchiveVideoBySlug(slug)

  if (!video) return <MissingVideo />
  if (video.href !== `/cgi/${video.slug}`) return <Navigate to={video.href} replace />

  return (
    <main className={`project-page project-page-cgi archive-video-page archive-video-page-${video.orientation === 'portrait' ? 'portrait' : 'landscape'}`}>
      <section className="project-hero page-shell" aria-labelledby="cgi-video-title">
        <Link className="back-link" to="/cgi"><span aria-hidden="true">←</span> Back to CGI archive</Link>
        <div className="project-hero-copy text-reveal">
          <div>
            <h1 id="cgi-video-title">{video.title}</h1>
          </div>
        </div>
        <Reveal className="project-hero-media">
          <MediaFrame
            asset={{ src: video.src, alt: video.alt, kind: 'video' }}
            variant="detail"
            autoplayPreview
            muteToggle
            showCaption={false}
            loading="eager"
          />
        </Reveal>
      </section>

      <section className="project-meta-section page-shell" aria-label="Video details">
        <dl className="project-meta-grid text-reveal">
          <div><dt>Type</dt><dd>CGI animation</dd></div>
          <div><dt>Format</dt><dd>{video.orientation === 'portrait' ? 'Vertical' : 'Landscape'}</dd></div>
          <div><dt>Year</dt><dd>{video.year}</dd></div>
        </dl>
      </section>

      {video.youtubeUrl && (
        <nav className="project-next page-shell text-reveal" aria-label="CGI video navigation">
          <a className="next-project-link" href={video.youtubeUrl} target="_blank" rel="noreferrer">
            <span className="eyebrow">External video</span>
            <strong>Watch on YouTube</strong>
            <span className="next-arrow" aria-hidden="true">↗</span>
          </a>
        </nav>
      )}
    </main>
  )
}
