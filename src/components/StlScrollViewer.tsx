import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

type StlScrollViewerProps = {
  src: string
  alt: string
  title?: string
  background?: boolean
}

export function StlScrollViewer({ src, alt, title = 'Tiny Whoop Drone', background = false }: StlScrollViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setClearColor(0x000000, 0)
    } catch {
      setStatus('error')
      return
    }

    let frame: number | null = null
    let mesh: THREE.LineSegments | undefined
    let material: THREE.LineBasicMaterial | undefined
    let modelRadius = 1
    let targetRotation = 0
    let isVisible = false
    let mounted = true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    const draw = () => renderer.render(scene, camera)

    const modelColor = () => document.documentElement.dataset.theme === 'light' ? 0x173a63 : 0xffffff
    const themeObserver = 'MutationObserver' in window
      ? new MutationObserver(() => {
          material?.color.set(modelColor())
          draw()
        })
      : undefined

    themeObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const stopAnimation = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
        frame = null
      }
    }

    const render = () => {
      frame = null
      if (!mesh || !isVisible || reducedMotion) {
        if (isVisible) draw()
        return
      }
      const rotationDistance = Math.abs(targetRotation - mesh.rotation.z)
      if (rotationDistance < 0.001) {
        mesh.rotation.z = targetRotation
        draw()
        return
      }
      mesh.rotation.z += (targetRotation - mesh.rotation.z) * 0.05
      draw()
      frame = window.requestAnimationFrame(render)
    }

    const startAnimation = () => {
      if (!isVisible) return
      if (!reducedMotion && frame === null) frame = window.requestAnimationFrame(render)
      else draw()
    }

    const resize = () => {
      const width = canvas.clientWidth || 1
      const height = canvas.clientHeight || 1
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      draw()
    }

    const updateScrollTarget = () => {
      if (reducedMotion || !mesh) return
      const progress = background
        ? Math.min(1, Math.max(0, window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)))
        : (() => {
            const bounds = canvas.getBoundingClientRect()
            return Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)))
          })()
      targetRotation = progress * Math.PI * 2.4 + Math.sin(progress * Math.PI * 2) * 0.3
      startAnimation()
    }

    const visibilityObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting
          if (isVisible) startAnimation()
          else stopAnimation()
        }, { threshold: 0.01 })
      : undefined

    if (visibilityObserver) visibilityObserver.observe(canvas)
    else isVisible = true

    const loader = new STLLoader()
    loader.load(
      src,
      (geometry) => {
        if (!mounted) {
          geometry.dispose()
          return
        }
        geometry.center()
        geometry.computeBoundingSphere()
        modelRadius = geometry.boundingSphere?.radius || 1
        const radius = modelRadius
        const outlineGeometry = new THREE.EdgesGeometry(geometry, 18)
        geometry.dispose()
        material = new THREE.LineBasicMaterial({ color: modelColor(), transparent: true, opacity: 0.4 })
        mesh = new THREE.LineSegments(outlineGeometry, material)
        mesh.rotation.x = -Math.PI / 4
        modelGroup.add(mesh)
        camera.position.set(0, 0, radius * 1.7)
        camera.near = Math.max(radius / 100, 0.01)
        camera.far = radius * 20
        camera.updateProjectionMatrix()
        setStatus('ready')
        updateScrollTarget()
        startAnimation()
      },
      undefined,
      () => {
        if (mounted) setStatus('error')
      },
    )

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', updateScrollTarget, { passive: true })

    return () => {
      mounted = false
      stopAnimation()
      visibilityObserver?.disconnect()
      themeObserver?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateScrollTarget)
      if (mesh) {
        mesh.geometry.dispose()
        const material = mesh.material
        if (Array.isArray(material)) material.forEach((item) => item.dispose())
        else material.dispose()
      }
      renderer.dispose()
    }
  }, [src, background])

  return (
    <figure className="stl-viewer">
      <div className="stl-canvas-wrap">
        <canvas ref={canvasRef} role="img" aria-label={alt} />
        <div className={`stl-status stl-status-${status}`} aria-live="polite">
          {status === 'loading' && 'Loading model'}
          {status === 'ready' && 'Scroll to rotate'}
          {status === 'error' && '3D preview unavailable'}
        </div>
      </div>
      <figcaption>{title} STL · scroll to turn the model</figcaption>
    </figure>
  )
}
