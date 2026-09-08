import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { cgiVideos, type ArchiveVideo } from '../content/archive'

const landscapeVideos = cgiVideos.filter((video) => video.orientation !== 'portrait')
const portraitVideos = cgiVideos.filter((video) => video.orientation === 'portrait')

function VideoGrid({ videos }: { videos: ArchiveVideo[] }) {
  return (
    <div className="archive-video-grid">
      {videos.map((video) => (
        <article className={`archive-video-card${video.orientation === 'portrait' ? ' is-portrait' : ''}`} key={video.src}>
          <Link
            className="archive-video-link"
            to={`/cgi/${video.slug}`}
            aria-label={`View ${video.title} details`}
          >
            <MediaFrame asset={{ src: video.src, alt: video.alt, kind: 'video' }} variant="detail" autoplayPreview hoverAudio />
          </Link>
          <div className="archive-card-copy">
            <h3>{video.title}</h3>
          </div>
        </article>
      ))}
    </div>
  )
}

export function CGIPage() {
  return (
    <main className="archive-page cgi-page">
      <section className="archive-hero page-shell" aria-labelledby="cgi-title">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        <p className="eyebrow"><span className="category-dot" aria-hidden="true" />CGI videos</p>
        <h1 id="cgi-title">CGI videos.</h1>
        <p className="archive-lede">A collection of CGI videos, short studies, product motion, and LEGO stories.</p>
      </section>
      <section className="archive-video-group page-shell" aria-labelledby="cgi-landscape-title">
        <h2 id="cgi-landscape-title" className="archive-group-title">Landscape work</h2>
        <VideoGrid videos={landscapeVideos} />
      </section>
      <section className="archive-video-group archive-video-group-portrait page-shell" aria-labelledby="cgi-portrait-title">
        <h2 id="cgi-portrait-title" className="archive-group-title">Vertical work</h2>
        <VideoGrid videos={portraitVideos} />
      </section>
      <div className="archive-footer page-shell">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
      </div>
    </main>
  )
}
