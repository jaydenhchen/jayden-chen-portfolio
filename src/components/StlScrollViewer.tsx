import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

type StlScrollViewerProps = {
  src: string
  alt: string
}

export function StlScrollViewer({ src, alt }: StlScrollViewerProps) {
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
    let mesh: THREE.Mesh | undefined
    let targetRotation = 0
    let targetTilt = 0
    let isVisible = false
    let mounted = true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)
    scene.add(new THREE.HemisphereLight(0xe9f6d2, 0x142029, 2.2))

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.3)
    keyLight.position.set(3, 5, 4)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x75bdd5, 2.2)
    rimLight.position.set(-4, 2, -3)
    scene.add(rimLight)

    const draw = () => renderer.render(scene, camera)

    const stopAnimation = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
        frame = null
      }
    }

    const render = () => {
      frame = null
      if (!mesh || !isVisible || reducedMotion) {
        draw()
        return
      }
      mesh.rotation.y += (targetRotation - mesh.rotation.y) * 0.08
      mesh.rotation.x += (-Math.PI / 2 + targetTilt - mesh.rotation.x) * 0.08
      draw()
      frame = window.requestAnimationFrame(render)
    }

    const startAnimation = () => {
      if (!reducedMotion && isVisible && frame === null) frame = window.requestAnimationFrame(render)
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
      const bounds = canvas.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)))
      targetRotation = progress * Math.PI * 4
      targetTilt = (progress - 0.5) * 0.35
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
        geometry.computeVertexNormals()
        geometry.computeBoundingSphere()
        const radius = geometry.boundingSphere?.radius || 1
        const material = new THREE.MeshStandardMaterial({ color: 0xb9e84d, metalness: 0.45, roughness: 0.3 })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.x = -Math.PI / 2
        modelGroup.add(mesh)
        camera.position.set(0, 0, radius * 3.6)
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
  }, [src])

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
      <figcaption>Drone January STL · scroll to turn the model</figcaption>
    </figure>
  )
}
