import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { getProjectsByCategory } from '../content/projects'

const otherProjects = getProjectsByCategory('other')

export function OtherProjectsPage() {
  return (
    <main className="archive-page other-page">
      <section className="archive-hero page-shell" aria-labelledby="other-title">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Other projects</p>
        <h1 id="other-title">Other projects.</h1>
        <p className="archive-lede">Interface work and projects that sit outside the CAD and CGI archives.</p>
      </section>
      <section className="other-projects-grid page-shell" aria-label="Other projects">
        {otherProjects.length > 0 ? (
          <div className="project-grid">
            {otherProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        ) : (
          <p className="empty-state">Other projects will appear here.</p>
        )}
      </section>
      <div className="archive-footer page-shell">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
      </div>
    </main>
  )
}
