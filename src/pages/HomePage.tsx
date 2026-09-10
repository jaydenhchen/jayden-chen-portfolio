import { Link } from 'react-router-dom'
import { useState } from 'react'
import { MediaFrame } from '../components/MediaFrame'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { getProjectPath, getProjectsByCategory, projects } from '../content/projects'
import { legoStlAsset } from '../content/archive'
import { siteProfile } from '../content/site'

const engineeringProjects = getProjectsByCategory('engineering')
const cgiProjects = getProjectsByCategory('cgi')
const homeCgiProjects = cgiProjects.filter((project) => !['bottle-animation', 'biomedical-cancer-locating-cart'].includes(project.slug))
const featuredProject = cgiProjects[0] ?? projects[0]

export function HomePage() {
  const [backgroundReady, setBackgroundReady] = useState(false)
  return (
    <main className="home-page">
      <div className="home-background-model" aria-label={`Interactive ${legoStlAsset.title} background model`}>
        <StlScrollViewer
          src={legoStlAsset.src}
          alt={legoStlAsset.alt}
          background
          lineOpacity={0.8}
          edgeThreshold={1}
          modelOffsetY={-0.08}
          onReady={() => setBackgroundReady(true)}
        />
      </div>
      {backgroundReady && <>
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy text-reveal">
          <h1 id="hero-title">{siteProfile.headline}</h1>
          <p className="eyebrow hero-name asset-rise">Jayden Chen</p>
        </div>
        <Reveal className="hero-media-wrap">
          <div className="hero-media-label"><span>Featured work</span></div>
          <Link className="featured-work-link" to={getProjectPath(featuredProject.slug)} aria-label={`View ${featuredProject.title} project`}>
            <MediaFrame asset={featuredProject.heroMedia} variant="hero" autoplayPreview={featuredProject.heroMedia.kind === 'video'} hoverAudio={featuredProject.heroMedia.kind === 'video'} loading="eager" />
          </Link>
        </Reveal>
      </section>

      <section id="work" className="work-section page-shell" aria-labelledby="work-title">
        <SectionHeading title="Selected work" titleId="work-title" intro="Combining constrained engineering and artistic freedom" />
        <div className="work-rows">
          <div className="work-row">
            <Reveal className="work-row-heading">
              <div><Link className="work-row-title" to="/cad"><h3 id="engineering-work-title">Engineering</h3></Link><p>Fusion 360 and hands-on work</p></div>
            </Reveal>
            <div className="project-grid" aria-labelledby="engineering-work-title">
              {engineeringProjects.length > 0 ? engineeringProjects.map((project) => <ProjectCard key={project.slug} project={project} />) : <p className="empty-state">Engineering projects will appear here.</p>}
            </div>
          </div>
          <div className="work-row">
            <Reveal className="work-row-heading">
              <div><Link className="work-row-title" to="/cgi"><h3 id="cgi-work-title">Blender</h3></Link><p>Design, animate, render, composite</p></div>
            </Reveal>
            <div className="project-grid" aria-labelledby="cgi-work-title">
              {homeCgiProjects.length > 0 ? homeCgiProjects.map((project) => <ProjectCard key={project.slug} project={project} />) : <p className="empty-state">CGI projects will appear here.</p>}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section page-shell" aria-labelledby="contact-title">
        <Reveal className="contact-panel-reveal">
          <div className="contact-panel">
            <div className="text-reveal">
              <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Contact</p>
              <h2 id="contact-title">Have something in mind?</h2>
            </div>
            <div className="contact-action text-reveal">
              <p>Send a brief, a sketch, or a question.</p>
              {siteProfile.email ? (
                <a className="button button-primary" href={`mailto:${siteProfile.email}`}>CONNECT VIA EMAIL</a>
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
        </Reveal>
      </section>

      </>}
    </main>
  )
}
