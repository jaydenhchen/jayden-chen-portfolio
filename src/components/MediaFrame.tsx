import { useEffect, useRef, useState } from 'react'
import type { MediaAsset } from '../content/projects'

type MediaFrameProps = {
  asset?: MediaAsset
  variant?: 'hero' | 'card' | 'detail'
  autoplayPreview?: boolean
  hoverAudio?: boolean
  controls?: boolean
  loading?: 'eager' | 'lazy'
}

export function MediaFrame({ asset, variant = 'detail', autoplayPreview = false, hoverAudio = false, controls = false, loading = 'lazy' }: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(!asset?.src)
  const [posterFailed, setPosterFailed] = useState(false)

  useEffect(() => {
    setHasError(!asset?.src)
    setPosterFailed(false)
  }, [asset?.src, asset?.poster])

  const showPoster = hasError && Boolean(asset?.poster) && !posterFailed

  const playWithHoverAudio = async () => {
    const video = videoRef.current
    if (!video) return

    document.querySelectorAll<HTMLVideoElement>('[data-hover-audio="true"]').forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.muted = true
    })
    video.muted = false
    try {
      await video.play()
    } catch {
      video.muted = true
      await video.play().catch(() => undefined)
    }
  }

  const muteOnLeave = () => {
    if (videoRef.current) videoRef.current.muted = true
  }

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
            ref={videoRef}
            src={asset.src}
            preload={variant === 'card' ? 'none' : 'metadata'}
            poster={asset.poster}
            muted={autoplayPreview}
            playsInline
            controls={controls}
            autoPlay={autoplayPreview}
            loop={autoplayPreview}
            tabIndex={hoverAudio ? 0 : undefined}
            data-hover-audio={hoverAudio ? 'true' : undefined}
            aria-label={asset.alt}
            onPointerEnter={hoverAudio ? playWithHoverAudio : undefined}
            onPointerLeave={hoverAudio ? muteOnLeave : undefined}
            onFocus={hoverAudio ? playWithHoverAudio : undefined}
            onBlur={hoverAudio ? muteOnLeave : undefined}
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
