import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { bottleModelAsset, cgiVideos, type ArchiveVideo } from '../content/archive'
import { getProjectsByCategory } from '../content/projects'

const sortByYear = (a: { year: string }, b: { year: string }) => Number(b.year) - Number(a.year)
const cgiImageProjects = getProjectsByCategory('cgi').filter((project) => project.thumbnail.kind === 'image')
const landscapeVideos = cgiVideos.filter((video) => video.orientation !== 'portrait').sort(sortByYear)
const portraitVideos = cgiVideos.filter((video) => video.orientation === 'portrait').sort(sortByYear)

function VideoGrid({ videos }: { videos: ArchiveVideo[] }) {
  return (
    <div className="archive-video-grid">
      {videos.map((video) => (
        <Reveal className="project-card-reveal" key={video.src}>
          <article className={`project-card project-card-cgi archive-video-card${video.orientation === 'portrait' ? ' is-portrait' : ''}`}>
            <Link
              className="project-card-link archive-video-link"
              to={video.href}
              aria-label={`View ${video.title} details`}
            >
              <MediaFrame asset={{ src: video.src, alt: video.alt, kind: 'video' }} variant="detail" autoplayPreview hoverAudio />
              <div className="project-card-body archive-card-copy text-reveal">
                <div className="project-card-meta">
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </div>
                <h3>{video.title}</h3>
                <p>{video.year}</p>
              {video.tools && video.tools.length > 0 && (
                <div className="project-card-made-with">
                  <span className="project-card-made-with-label">Made with</span>
                  <ul className="tool-list project-card-tool-list" aria-label={`${video.title} tools`}>
                    {video.tools.map((tool) => <li key={tool}>{tool}</li>)}
                  </ul>
                </div>
              )}
              </div>
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  )
}


export function CGIPage() {
  return (
    <main className="archive-page cgi-page">
      <div className="cgi-background-model" aria-label={`Interactive ${bottleModelAsset.title} background model`}>
        <StlScrollViewer
          src={bottleModelAsset.src}
          alt={bottleModelAsset.alt}
          background
          lineOpacity={0.8}
          modelScale={1.5}
          cameraDistance={4.5}
          edgeThreshold={65}
          rotationAxis="xyz"
          rotationDirection={1}
          initialRotationX={-Math.PI / 2}
          initialRotationZ={0}
        />
      </div>
      <section className="archive-hero page-shell text-reveal" aria-labelledby="cgi-title">
        <h1 id="cgi-title">CGI</h1>
        <p className="archive-lede">Created with Blender, Premiere Pro, and Nuke</p>
      </section>
      <section className="archive-video-group page-shell" aria-labelledby="cgi-landscape-title">
        <div className="text-reveal"><h2 id="cgi-landscape-title" className="archive-group-title">Horizontal videos</h2></div>
        <VideoGrid videos={landscapeVideos} />
      </section>
      <section className="archive-video-group archive-video-group-portrait page-shell" aria-labelledby="cgi-portrait-title">
        <div className="text-reveal"><h2 id="cgi-portrait-title" className="archive-group-title">Vertical videos</h2></div>
        <VideoGrid videos={portraitVideos} />
      </section>
      <section className="archive-video-group archive-image-group page-shell" aria-labelledby="cgi-image-title">
        <div className="text-reveal"><h2 id="cgi-image-title" className="archive-group-title">Rendered images</h2></div>
        <div className="project-grid">{cgiImageProjects.map((project) => <ProjectCard key={project.slug} project={project} showTools />)}</div>
      </section>
    </main>
  )
}
