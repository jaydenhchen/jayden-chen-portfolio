import { ProjectCard } from '../components/ProjectCard'
import { useState } from 'react'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { getProjectsByCategory } from '../content/projects'
import { otherStlAsset } from '../content/archive'

const otherProjects = getProjectsByCategory('other')

export function OtherProjectsPage() {
  const [firstBackgroundReady, setFirstBackgroundReady] = useState(false)
  const [secondBackgroundReady, setSecondBackgroundReady] = useState(false)
  const backgroundReady = firstBackgroundReady && secondBackgroundReady
  return (
    <main className="archive-page other-page">
      <div className="other-background-model" aria-label={`Interactive ${otherStlAsset.title} background models`}>
        <div className="other-background-model-pair">
          <StlScrollViewer src={otherStlAsset.src} alt={`${otherStlAsset.alt} clockwise`} background lineOpacity={0.8} cameraDistance={3.2} rotationDirection={1} onReady={() => setFirstBackgroundReady(true)} />
          <StlScrollViewer src={otherStlAsset.src} alt={`${otherStlAsset.alt} counterclockwise`} background lineOpacity={0.8} cameraDistance={3.2} rotationDirection={-1} onReady={() => setSecondBackgroundReady(true)} />
        </div>
      </div>
      {backgroundReady && <>
      <section className="archive-hero page-shell text-reveal" aria-labelledby="other-title">
        <h1 id="other-title">Other projects</h1>
        <p className="archive-lede">Work and projects outside of CGI and CAD</p>
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
      </>}
    </main>
  )
}
