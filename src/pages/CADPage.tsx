import { Link } from 'react-router-dom'
import { MediaFrame } from '../components/MediaFrame'
import { StlScrollViewer } from '../components/StlScrollViewer'
import { cadImages, stlAsset } from '../content/archive'

export function CADPage() {
  return (
    <main className="archive-page cad-page">
      <section className="archive-hero page-shell" aria-labelledby="cad-title">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />CAD / Object archive</p>
        <h1 id="cad-title">Things that take shape.</h1>
        <p className="archive-lede">Models, prototypes, and process images from the design archive.</p>
      </section>
      <section className="stl-section page-shell" aria-labelledby="stl-title">
        <div className="stl-heading">
          <div><p className="eyebrow">Interactive model</p><h2 id="stl-title">Drone January</h2></div>
          <p>Scroll through the page to turn the supplied STL.</p>
        </div>
        <StlScrollViewer src={stlAsset.src} alt={stlAsset.alt} />
      </section>
      <section className="archive-image-grid page-shell" aria-label="CAD and design images">
        {cadImages.map((asset) => <MediaFrame key={asset.src} asset={asset} variant="detail" />)}
      </section>
      <div className="archive-footer page-shell">
        <Link className="back-link" to="/#work"><span aria-hidden="true">←</span> Back to work</Link>
      </div>
    </main>
  )
}
