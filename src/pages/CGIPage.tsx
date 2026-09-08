import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { cgiVideos } from '../content/archive'

export function CGIPage() {
  return (
    <main className="archive-page cgi-page">
      <section className="archive-hero page-shell" aria-labelledby="cgi-title">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        <p className="eyebrow"><span className="category-dot" aria-hidden="true" />CGI / Video archive</p>
        <h1 id="cgi-title">Moving images.</h1>
        <p className="archive-lede">The full animation set: short studies, product motion, and LEGO stories.</p>
      </section>
      <section className="archive-video-grid page-shell" aria-label="CGI videos">
        {cgiVideos.map((video, index) => (
          <article className="archive-video-card" key={video.src}>
            <MediaFrame asset={{ src: video.src, alt: video.alt, kind: 'video' }} variant="detail" />
            <div className="archive-card-copy">
              <span className="archive-number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{video.title}</h2>
            </div>
          </article>
        ))}
      </section>
      <div className="archive-footer page-shell">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
      </div>
    </main>
  )
}
