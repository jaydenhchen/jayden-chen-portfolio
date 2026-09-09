import { MediaFrame } from '../components/MediaFrame'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { getProjectsByCategory, projects } from '../content/projects'
import { legoStlAsset } from '../content/archive'
import { siteProfile } from '../content/site'

const engineeringProjects = getProjectsByCategory('engineering')
const cgiProjects = getProjectsByCategory('cgi')
const featuredProject = cgiProjects[0] ?? projects[0]

export function HomePage() {
  return (
    <main id="top" className="home-page">
      <div className="home-background-model" aria-label={`Interactive ${legoStlAsset.title} background model`}>
        <StlScrollViewer src={legoStlAsset.src} alt={legoStlAsset.alt} title={legoStlAsset.title} background lineOpacity={0.68} edgeThreshold={1} modelOffsetY={-0.08} />
      </div>
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Engineering + Blender</p>
          <h1 id="hero-title">{siteProfile.headline}</h1>
          <p className="hero-intro">{siteProfile.intro}</p>
        </div>
        <Reveal className="hero-media-wrap">
          <div className="hero-media-label"><span>Featured work</span><span>Motion study</span></div>
          <MediaFrame asset={featuredProject?.heroMedia} variant="hero" autoplayPreview={featuredProject?.heroMedia.kind === 'video'} hoverAudio={featuredProject?.heroMedia.kind === 'video'} loading="eager" />
        </Reveal>
      </section>

      <section id="work" className="work-section page-shell" aria-labelledby="work-title">
        <SectionHeading eyebrow="Selected work" title="A mix of things I make." titleId="work-title" intro="A combination of engineering and art." />
        <div className="work-rows">
          <div className="work-row">
            <div className="work-row-heading">
              <div><h3 id="engineering-work-title">Engineering</h3><p>Objects and interfaces that have to work.</p></div>
            </div>
            <div className="project-grid" aria-labelledby="engineering-work-title">
              {engineeringProjects.length > 0 ? engineeringProjects.map((project) => <ProjectCard key={project.slug} project={project} />) : <p className="empty-state">Engineering projects will appear here.</p>}
            </div>
          </div>
          <div className="work-row">
            <div className="work-row-heading">
              <div><h3 id="cgi-work-title">Blender</h3><p>Light, movement, and images that stay with you.</p></div>
            </div>
            <div className="project-grid" aria-labelledby="cgi-work-title">
              {cgiProjects.length > 0 ? cgiProjects.map((project) => <ProjectCard key={project.slug} project={project} />) : <p className="empty-state">CGI projects will appear here.</p>}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section page-shell" aria-labelledby="contact-title">
        <div className="contact-panel">
          <div>
            <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Contact</p>
            <h2 id="contact-title">Have something in mind?</h2>
          </div>
          <div className="contact-action">
            <p>Send a brief, a sketch, or a question.</p>
            {siteProfile.email ? (
              <a className="button button-primary" href={`mailto:${siteProfile.email}`}>Connect via email <span aria-hidden="true">↗</span></a>
            ) : (
              <p className="empty-note">Contact details will appear here once supplied.</p>
            )}
            {(siteProfile.resumeUrl || siteProfile.socials.length > 0) && (
              <div className="contact-socials">
                {siteProfile.socials.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer">{social.label} <span aria-hidden="true">↗</span></a>)}
                {siteProfile.resumeUrl && <a href={siteProfile.resumeUrl} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>}
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
