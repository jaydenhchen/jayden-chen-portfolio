import { useState } from 'react'
import type { MediaAsset } from '../content/projects'

type MediaFrameProps = {
  asset?: MediaAsset
  variant?: 'hero' | 'card' | 'detail'
  autoplayPreview?: boolean
  loading?: 'eager' | 'lazy'
}

export function MediaFrame({ asset, variant = 'detail', autoplayPreview = false, loading = 'lazy' }: MediaFrameProps) {
  const [hasError, setHasError] = useState(!asset?.src)
  const [posterFailed, setPosterFailed] = useState(false)

  const showPoster = hasError && Boolean(asset?.poster) && !posterFailed

  return (
    <figure className={`media-frame media-frame-${variant}`}>
      <div className="media-frame-visual">
        {!asset || hasError ? (
          showPoster && asset ? (
            <img
              src={asset.poster}
              alt={asset.alt}
              loading={loading}
              decoding="async"
              onError={() => setPosterFailed(true)}
            />
          ) : (
            <div className="media-fallback" role="img" aria-label="Media unavailable">
              <span className="fallback-mark" aria-hidden="true">＋</span>
              <span>Media placeholder</span>
              <small>Supply an image or reel to complete this frame.</small>
            </div>
          )
        ) : asset.kind === 'video' ? (
          <video
            src={asset.src}
            poster={asset.poster}
            muted={autoplayPreview}
            playsInline
            preload="metadata"
            controls={!autoplayPreview}
            autoPlay={autoplayPreview}
            loop={autoplayPreview}
            aria-label={asset.alt}
            onError={() => setHasError(true)}
          />
        ) : (
          <img
            src={asset.src}
            alt={asset.alt}
            loading={loading}
            decoding="async"
            onError={() => setHasError(true)}
          />
        )}
        <span className="media-frame-corner" aria-hidden="true" />
      </div>
      {asset?.caption && <figcaption>{asset.caption}</figcaption>}
    </figure>
  )
}
