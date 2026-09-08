import { Link, useParams } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { Reveal } from '../components/Reveal'
import { getArchiveVideoBySlug } from '../content/archive'

function MissingVideo() {
  return (
    <main className="not-found page-shell">
      <p className="eyebrow">CGI archive / No match</p>
      <h1>This video is not here.</h1>
      <p>Choose another animation from the CGI archive.</p>
      <Link className="button button-primary" to="/cgi">Back to CGI archive <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

export function CGIVideoPage() {
  const { slug } = useParams()
  const video = getArchiveVideoBySlug(slug)

  if (!video) return <MissingVideo />

  return (
    <main className={`project-page project-page-cgi archive-video-page archive-video-page-${video.orientation === 'portrait' ? 'portrait' : 'landscape'}`}>
      <section className="project-hero page-shell" aria-labelledby="cgi-video-title">
        <Link className="back-link" to="/cgi"><span aria-hidden="true">←</span> Back to CGI archive</Link>
        <div className="project-hero-copy">
          <div>
            <p className="eyebrow"><span className="category-dot" aria-hidden="true" />CGI / Video archive</p>
            <h1 id="cgi-video-title">{video.title}</h1>
          </div>
          <p className="project-summary">{video.alt}</p>
        </div>
        <Reveal className="project-hero-media">
          <MediaFrame
            asset={{ src: video.src, alt: video.alt, kind: 'video' }}
            variant="detail"
            controls
            loading="eager"
          />
        </Reveal>
      </section>

      <section className="project-meta-section page-shell" aria-label="Video details">
        <dl className="project-meta-grid">
          <div><dt>Type</dt><dd>CGI animation</dd></div>
          <div><dt>Format</dt><dd>{video.orientation === 'portrait' ? 'Vertical' : 'Landscape'}</dd></div>
          {video.youtubeUrl && (
            <div><dt>Watch</dt><dd><a href={video.youtubeUrl} target="_blank" rel="noreferrer">YouTube <span aria-hidden="true">↗</span></a></dd></div>
          )}
        </dl>
      </section>

      <nav className="project-next page-shell" aria-label="CGI video navigation">
        <Link className="back-link" to="/cgi"><span aria-hidden="true">←</span> Back to CGI archive</Link>
        {video.youtubeUrl && (
          <a className="next-project-link" href={video.youtubeUrl} target="_blank" rel="noreferrer">
            <span className="eyebrow">External video</span>
            <strong>Watch on YouTube</strong>
            <span className="next-arrow" aria-hidden="true">↗</span>
          </a>
        )}
      </nav>
    </main>
  )
}
