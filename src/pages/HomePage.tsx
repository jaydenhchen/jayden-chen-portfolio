import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { getProjectsByCategory, projects } from '../content/projects'
import { siteProfile } from '../content/site'

const engineeringProjects = getProjectsByCategory('engineering')
const cgiProjects = getProjectsByCategory('cgi')
const featuredProject = cgiProjects[0] ?? projects[0]
const engineeringTools = [...new Set(engineeringProjects.flatMap((project) => project.tools))]
const cgiTools = [...new Set(cgiProjects.flatMap((project) => project.tools))]
const endnoteProject = cgiProjects[0] ?? projects[0]

function ToolCloud({ tools }: { tools: string[] }) {
  if (tools.length === 0) return <p className="empty-note">Add supplied practice details here.</p>

  return (
    <ul className="capability-tools">
      {tools.map((tool) => <li key={tool}>{tool}</li>)}
    </ul>
  )
}

export function HomePage() {
  return (
    <main id="top" className="home-page">
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Engineering + Blender</p>
          <h1 id="hero-title">{siteProfile.headline}</h1>
          <p className="hero-intro">{siteProfile.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View selected work <span aria-hidden="true">↓</span></a>
            <a className="button button-quiet" href="#showreel"><span className="play-icon" aria-hidden="true">▶</span> Play showreel</a>
          </div>
          <div className="hero-aside">
            <span>01 — 02</span>
            <span>Scroll to explore</span>
          </div>
        </div>
        <Reveal className="hero-media-wrap">
          <div id="showreel" className="hero-media-label"><span>Featured work</span><span>Motion study</span></div>
          <MediaFrame asset={featuredProject?.heroMedia} variant="hero" autoplayPreview={featuredProject?.heroMedia.kind === 'video'} hoverAudio={featuredProject?.heroMedia.kind === 'video'} loading="eager" />
        </Reveal>
      </section>

      <section id="work" className="work-section page-shell" aria-labelledby="work-title">
        <SectionHeading index="01" eyebrow="Selected work" title="A mix of things I make." titleId="work-title" intro="Objects, interfaces, and moving images." />
        <div className="work-rows">
          <div className="work-row">
            <div className="work-row-heading">
              <span className="row-number">01</span>
              <div><h3 id="engineering-work-title">Engineering</h3><p>Objects and interfaces that have to work.</p></div>
              <span className="row-count">{String(engineeringProjects.length).padStart(2, '0')} studies</span>
            </div>
            <div className="project-grid" aria-labelledby="engineering-work-title">
              {engineeringProjects.length > 0 ? engineeringProjects.map((project) => <ProjectCard key={project.slug} project={project} />) : <p className="empty-state">Engineering projects will appear here.</p>}
            </div>
          </div>
          <div className="work-row">
            <div className="work-row-heading">
              <span className="row-number">02</span>
              <div><h3 id="cgi-work-title">Blender</h3><p>Light, movement, and images that stay with you.</p></div>
              <span className="row-count">{String(cgiProjects.length).padStart(2, '0')} studies</span>
            </div>
            <div className="project-grid" aria-labelledby="cgi-work-title">
              {cgiProjects.length > 0 ? cgiProjects.map((project) => <ProjectCard key={project.slug} project={project} />) : <p className="empty-state">CGI projects will appear here.</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities-section page-shell" aria-labelledby="capabilities-title">
        <SectionHeading index="02" eyebrow="What I do" title="Make ideas real." titleId="capabilities-title" intro="From first sketch to final frame." />
        <div className="capability-grid">
          <Reveal className="capability-card capability-engineering">
            <p className="capability-number">01 / 02</p>
            <h3>Design &amp; build</h3>
            <p>Shape useful objects and clear interfaces.</p>
            <ToolCloud tools={engineeringTools} />
          </Reveal>
          <Reveal className="capability-card capability-cgi" delay={100}>
            <p className="capability-number">02 / 02</p>
            <h3>Move &amp; render</h3>
            <p>Create images, animation, and atmosphere.</p>
            <ToolCloud tools={cgiTools} />
          </Reveal>
        </div>
      </section>

      <section id="about" className="about-section page-shell" aria-labelledby="about-section-title">
        <SectionHeading index="03" eyebrow="About me" title="A little about the work." titleId="about-section-title" />
        <div className="about-grid">
          <div className="about-lead"><p>{siteProfile.intro}</p></div>
          <div className="about-detail">
            <p className="eyebrow">My approach</p>
            <p>Start with the idea. Make it clear. Keep the details that matter.</p>
            {(siteProfile.resumeUrl || siteProfile.socials.length > 0) && (
              <div className="inline-links">
                {siteProfile.resumeUrl && <a href={siteProfile.resumeUrl} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>}
                {siteProfile.socials.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer">{social.label} <span aria-hidden="true">↗</span></a>)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section page-shell" aria-labelledby="contact-title">
        <div className="contact-panel">
          <div>
            <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />04 / Contact</p>
            <h2 id="contact-title">Have something in mind?</h2>
          </div>
          <div className="contact-action">
            <p>Send a brief, a sketch, or a question.</p>
            {siteProfile.email ? (
              <a className="button button-primary" href={`mailto:${siteProfile.email}`}>Start a conversation <span aria-hidden="true">↗</span></a>
            ) : (
              <p className="empty-note">Contact details will appear here once supplied.</p>
            )}
            {siteProfile.socials.length > 0 && <div className="contact-socials">{siteProfile.socials.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer">{social.label} <span aria-hidden="true">↗</span></a>)}</div>}
          </div>
        </div>
      </section>

      <div className="home-endnote page-shell"><span>End of index</span>{endnoteProject && <Link to={`/work/${endnoteProject.slug}`}>See a project <span aria-hidden="true">↗</span></Link>}</div>
    </main>
  )
}
