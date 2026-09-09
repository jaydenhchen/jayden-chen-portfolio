import { useEffect, useRef, useState } from 'react'
import type { MediaAsset } from '../content/projects'

type MediaFrameProps = {
  asset?: MediaAsset
  variant?: 'hero' | 'card' | 'detail'
  autoplayPreview?: boolean
  hoverAudio?: boolean
  controls?: boolean
  muteToggle?: boolean
  showCaption?: boolean
  loading?: 'eager' | 'lazy'
}

export function MediaFrame({ asset, variant = 'detail', autoplayPreview = false, hoverAudio = false, controls = false, muteToggle = false, showCaption = true, loading = 'lazy' }: MediaFrameProps) {
  const mediaRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(!asset?.src)
  const [posterFailed, setPosterFailed] = useState(false)
  const [isMuted, setIsMuted] = useState(!muteToggle)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setHasError(!asset?.src)
    setPosterFailed(false)
    setIsMuted(!muteToggle)
  }, [asset?.src, asset?.poster, muteToggle])
  useEffect(() => {
    const element = mediaRef.current
    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [asset?.src, variant])

  useEffect(() => {
    if (!autoplayPreview || asset?.kind !== 'video') return
    const video = videoRef.current
    if (!video) return

    video.muted = !muteToggle
    video.play().catch(() => {
      if (!muteToggle) return
      video.muted = true
      setIsMuted(true)
      video.play().catch(() => undefined)
    })
  }, [asset?.src, asset?.kind, autoplayPreview, muteToggle])

  const showPoster = hasError && Boolean(asset?.poster) && !posterFailed

  const showMuteToggle = asset?.kind === 'video' && muteToggle
  const usesHoverAudio = asset?.kind === 'video' && hoverAudio && !muteToggle

  const playWithHoverAudio = async () => {
    const video = videoRef.current
    if (!video) return

    document.querySelectorAll<HTMLVideoElement>('[data-hover-audio="true"]').forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.muted = true
    })
    video.muted = false
    await video.play().catch(() => undefined)
  }

  const muteOnLeave = () => {
    if (videoRef.current) videoRef.current.muted = true
  }

  const toggleMute = async () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted) await video.play().catch(() => undefined)
  }

  return (
    <figure ref={mediaRef} className={`media-frame media-frame-${variant} asset-rise media-scroll-reveal${isVisible ? ' is-visible' : ''}`}>
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
          <>
            <video
              ref={videoRef}
              src={asset.src}
              preload={variant === 'card' ? 'none' : 'metadata'}
              poster={asset.poster}
              muted={muteToggle ? isMuted : Boolean(autoplayPreview || usesHoverAudio)}
              playsInline
              controls={controls && !muteToggle}
              autoPlay={autoplayPreview}
              loop={autoplayPreview}
              data-hover-audio={usesHoverAudio ? 'true' : undefined}
              aria-label={asset.alt}
              onPointerEnter={usesHoverAudio ? playWithHoverAudio : undefined}
              onPointerLeave={usesHoverAudio ? muteOnLeave : undefined}
              onError={() => setHasError(true)}
            />
            {showMuteToggle && (
              <button
                className="media-mute-toggle"
                type="button"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                aria-pressed={!isMuted}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  void toggleMute()
                }}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
            )}
          </>
        ) : (
          <img
            src={asset.src}
            alt={asset.alt}
            loading={loading}
            decoding="async"
            onError={() => setHasError(true)}
          />
        )}
      </div>
      {showCaption && asset?.caption && variant !== 'card' && <figcaption>{asset.caption}</figcaption>}
    </figure>
  )
}
