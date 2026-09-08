import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { bottleStlAsset, cgiVideos, type ArchiveVideo } from '../content/archive'

const landscapeVideos = cgiVideos.filter((video) => video.orientation !== 'portrait')
const portraitVideos = cgiVideos.filter((video) => video.orientation === 'portrait')

function VideoGrid({ videos }: { videos: ArchiveVideo[] }) {
  return (
    <div className="archive-video-grid">
      {videos.map((video) => (
        <article className={`project-card project-card-cgi archive-video-card${video.orientation === 'portrait' ? ' is-portrait' : ''}`} key={video.src}>
          <Link
            className="project-card-link archive-video-link"
            to={`/cgi/${video.slug}`}
            aria-label={`View ${video.title} details`}
          >
            <MediaFrame asset={{ src: video.src, alt: video.alt, kind: 'video' }} variant="detail" autoplayPreview hoverAudio />
            <div className="project-card-body archive-card-copy">
              <div className="project-card-meta">
                <span className="category-label">CGI video</span>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{video.title}</h3>
              <p>{video.alt}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

export function CGIPage() {
  return (
    <main className="archive-page cgi-page">
      <div className="cgi-background-model" aria-label={`Interactive ${bottleStlAsset.title} background model`}>
        <StlScrollViewer
          src={bottleStlAsset.src}
          alt={bottleStlAsset.alt}
          title={bottleStlAsset.title}
          background
          lineOpacity={0.8}
          cameraDistance={2}
          edgeThreshold={1}
          rotationAxis="x"
          initialRotationX={0}
          initialRotationZ={Math.PI / 2}
        />
      </div>
      <section className="archive-hero page-shell" aria-labelledby="cgi-title">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        <h1 id="cgi-title">CGI.</h1>
        <p className="archive-lede">A collection of short studies, product motion, and LEGO stories.</p>
      </section>
      <section className="archive-video-group page-shell" aria-labelledby="cgi-landscape-title">
        <h2 id="cgi-landscape-title" className="archive-group-title">Horizontal videos</h2>
        <VideoGrid videos={landscapeVideos} />
      </section>
      <section className="archive-video-group archive-video-group-portrait page-shell" aria-labelledby="cgi-portrait-title">
        <h2 id="cgi-portrait-title" className="archive-group-title">Vertical videos</h2>
        <VideoGrid videos={portraitVideos} />
      </section>
    </main>
  )
}
