import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

type StlScrollViewerProps = {
  src: string
  alt: string
  background?: boolean
  lineOpacity?: number
  cameraDistance?: number
  edgeThreshold?: number
  rotationAxis?: 'x' | 'y' | 'z' | 'yz' | 'xyz'
  rotationDirection?: 1 | -1
  scrollRotationScale?: number
  modelScale?: number
  modelOffsetY?: number
  initialRotationX?: number
  initialRotationZ?: number
  showCaption?: boolean
  onReady?: () => void
}

export function StlScrollViewer({
  src,
  alt,
  background = false,
  lineOpacity = 0.8,
  cameraDistance = 1.9,
  edgeThreshold = 18,
  scrollRotationScale = 1,
  modelScale = 1,
  rotationAxis = 'z',
  rotationDirection = 1,
  modelOffsetY = 0,
  initialRotationX = -Math.PI / 4,
  initialRotationZ = 0,
  showCaption = true,
  onReady,
}: StlScrollViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const readyNotifiedRef = useRef(false)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  const handleAnimationEnd = () => {
    if (readyNotifiedRef.current) return
    readyNotifiedRef.current = true
    onReadyRef.current?.()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    readyNotifiedRef.current = false
    setIsLoaded(false)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      setHasError(true)
      setIsLoaded(true)
      readyNotifiedRef.current = true
      onReadyRef.current?.()
      return
    }

    let frame: number | null = null
    let mesh: THREE.LineSegments | undefined
    let material: THREE.LineBasicMaterial | undefined
    let modelRadius = 1
    let targetRotation = 0
    let idleRotation = 0
    let previousFrameTime: number | undefined
    let isVisible = false
    let mounted = true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const notifyReady = () => {
      if (!mounted || readyNotifiedRef.current) return
      readyNotifiedRef.current = true
      onReadyRef.current?.()
    }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)
    modelGroup.scale.setScalar(modelScale)

    const setRotation = (value: number) => {
      if (!mesh) return
      if (rotationAxis === 'x') mesh.rotation.x = value
      else if (rotationAxis === 'y') mesh.rotation.y = value
      else if (rotationAxis === 'z') mesh.rotation.z = value
      else if (rotationAxis === 'yz') {
        mesh.rotation.y = value
        mesh.rotation.z = value
      } else {
        mesh.rotation.x = initialRotationX + value
        mesh.rotation.y = value
        mesh.rotation.z = initialRotationZ + value
      }
    }

    const draw = () => renderer.render(scene, camera)
    const getModelColor = () => document.documentElement.dataset.theme === 'light' ? 0x14213d : 0xffffff
    const updateModelColor = () => {
      material?.color.set(getModelColor())
      draw()
    }

    const themeObserver = 'MutationObserver' in window
      ? new MutationObserver(updateModelColor)
      : undefined

    themeObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const stopAnimation = () => {
      previousFrameTime = undefined
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
        frame = null
      }
    }

    const render = (timestamp: number) => {
      frame = null
      if (!mesh || !isVisible || reducedMotion) {
        if (isVisible) draw()
        return
      }
      const elapsed = previousFrameTime === undefined ? 0 : Math.min(timestamp - previousFrameTime, 100)
      previousFrameTime = timestamp
      idleRotation += elapsed * 0.00012 * rotationDirection
      setRotation(targetRotation + idleRotation)
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
      targetRotation = rotationDirection * (progress * Math.PI * 2.4 * scrollRotationScale + Math.sin(progress * Math.PI * 2) * 0.3 * scrollRotationScale)
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

    const addOutline = (outlineGeometry: THREE.BufferGeometry, radius: number) => {
      if (!mounted) {
        outlineGeometry.dispose()
        return
      }
      modelRadius = radius
      modelGroup.position.y = radius * modelOffsetY
      material = new THREE.LineBasicMaterial({ color: getModelColor(), transparent: true, opacity: lineOpacity })
      mesh = new THREE.LineSegments(outlineGeometry, material)
      mesh.rotation.x = initialRotationX
      mesh.rotation.z = initialRotationZ
      modelGroup.add(mesh)
      setIsLoaded(true)
      if (reducedMotion) notifyReady()
      camera.position.set(0, 0, radius * cameraDistance)
      camera.near = Math.max(radius / 100, 0.01)
      camera.far = radius * 20
      camera.updateProjectionMatrix()
      updateScrollTarget()
      startAnimation()
    }
    const loadError = () => {
      if (!mounted) return
      setHasError(true)
      setIsLoaded(true)
      notifyReady()
    }

    if (src.toLowerCase().endsWith('.obj')) {
      new OBJLoader().load(
        src,
        (object) => {
          if (!mounted) return
          object.updateMatrixWorld(true)
          const outlineGeometries: THREE.BufferGeometry[] = []
          object.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return
            const sourceGeometry = child.geometry.clone()
            sourceGeometry.applyMatrix4(child.matrixWorld)
            outlineGeometries.push(new THREE.EdgesGeometry(sourceGeometry, edgeThreshold))
            sourceGeometry.dispose()
          })
          const outlineGeometry = outlineGeometries.length > 0 ? mergeGeometries(outlineGeometries) : null
          outlineGeometries.forEach((geometry) => geometry.dispose())
          object.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return
            child.geometry.dispose()
            const childMaterial = child.material
            if (Array.isArray(childMaterial)) childMaterial.forEach((item) => item.dispose())
            else childMaterial.dispose()
          })
          if (!outlineGeometry) {
            loadError()
            return
          }
          outlineGeometry.computeBoundingBox()
          const center = outlineGeometry.boundingBox?.getCenter(new THREE.Vector3()) || new THREE.Vector3()
          outlineGeometry.translate(-center.x, -center.y, -center.z)
          outlineGeometry.computeBoundingSphere()
          addOutline(outlineGeometry, outlineGeometry.boundingSphere?.radius || 1)
        },
        undefined,
        loadError,
      )
    } else {
      new STLLoader().load(
        src,
        (geometry) => {
          if (!mounted) {
            geometry.dispose()
            return
          }
          geometry.center()
          geometry.computeBoundingSphere()
          const radius = geometry.boundingSphere?.radius || 1
          const outlineGeometry = new THREE.EdgesGeometry(geometry, edgeThreshold)
          geometry.dispose()
          addOutline(outlineGeometry, radius)
        },
        undefined,
        loadError,
      )
    }

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
  }, [src, background, lineOpacity, cameraDistance, edgeThreshold, scrollRotationScale, modelScale, rotationAxis, rotationDirection, modelOffsetY, initialRotationX, initialRotationZ])

  return (
    <figure className={`stl-viewer${isLoaded ? ' is-loaded' : ''}`} onAnimationEnd={isLoaded ? handleAnimationEnd : undefined}>
      <div className="stl-canvas-wrap">
        <canvas ref={canvasRef} role="img" aria-label={alt} />
        {hasError && (
          <div className="stl-status stl-status-error" aria-live="polite">
            3D preview unavailable
          </div>
        )}
      </div>
      {showCaption && <figcaption>3D model</figcaption>}
    </figure>
  )
}
