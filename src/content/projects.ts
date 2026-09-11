export type ProjectCategory = 'engineering' | 'cgi' | 'other'
export type ProjectInputCategory = 'cad' | 'cgi' | 'other'
export type VideoOrientation = 'landscape' | 'portrait'
export type ThumbnailFit = 'contain' | 'cover'

export type MediaAsset = {
  src: string
  alt: string
  kind: 'image' | 'video'
  poster?: string
  caption?: string
}

export type ProjectSection = {
  heading: string
  body: string
}

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  eyebrow: string
  summary: string
  year: string
  orientation?: VideoOrientation
  thumbnailFit?: ThumbnailFit
  role?: string
  tools: string[]
  thumbnail: MediaAsset
  heroMedia: MediaAsset
  sections: ProjectSection[]
  gallery: MediaAsset[]
}
/** Input shape for defineProject; output always has complete page media. */
export type ProjectDefinition = Omit<Project, 'category' | 'heroMedia' | 'sections' | 'gallery' | 'tools'> & {
  category: ProjectInputCategory
  tools?: string[]
  heroMedia?: MediaAsset
  sections?: ProjectSection[]
  gallery?: MediaAsset[]
}

/** Build a project with the canonical media and page defaults. */
export const defineProject = ({ category, thumbnail, heroMedia, sections = [], gallery = [], tools = [], ...project }: ProjectDefinition): Project => ({
  ...project,
  category: category === 'cad' ? 'engineering' : category,
  tools,
  thumbnail,
  heroMedia: heroMedia ?? thumbnail,
  sections,
  gallery,
})

const suppliedMedia = `${import.meta.env.BASE_URL}media/stream`
export const fusion360Tools = ['Fusion 360']
export const cgiOnlyTools = ['Blender', 'Premiere Pro', 'Nuke', 'Photoshop']
export const sharedCadCgiTools = [...fusion360Tools, ...cgiOnlyTools]
export const getProjectPath = (slug: string) => {
  const project = projects.find((candidate) => candidate.slug === slug)
  if (!project) return `/work/${slug}`
  if (project.category === 'engineering') return `/cad/${slug}`
  if (project.category === 'cgi' && project.thumbnail.kind === 'video') return `/cgi/${slug}`
  return `/work/${slug}`
}
export const getProjectBackLabel = (fromPath: string | undefined, fallback: string) => {
  if (!fromPath) return fallback
  if (fromPath === '/' || fromPath.startsWith('/?') || fromPath.startsWith('/#')) return 'Back to work'
  if (fromPath.startsWith('/cad')) return 'Back to CAD'
  if (fromPath.startsWith('/cgi')) return 'Back to CGI archive'
  if (fromPath.startsWith('/other')) return 'Back to other projects'
  return fallback
}

export const projects: Project[] = [
  defineProject({
    slug: 'custom-helmet',
    title: 'Custom Helmet',
    category: 'cad',
    eyebrow: 'Helmet / Design',
    summary: 'A custom helmet modeled in Fusion 360 as a focused design study',
    year: '2024',
    tools: fusion360Tools,
    thumbnail: {
      src: `${suppliedMedia}/drone-cad.png`,
      alt: 'Custom helmet shown in a Fusion 360 CAD workspace',
      kind: 'image',
      caption: 'Supplied CAD capture: custom helmet study.',
    },
    heroMedia: {
      src: `${suppliedMedia}/drone-cad.png`,
      alt: 'Custom helmet shown in a Fusion 360 CAD workspace',
      kind: 'image',
      caption: 'Supplied CAD capture: custom helmet study.',
    },
    sections: [
      {
        heading: 'The form',
        body: 'A custom helmet profile modeled in Fusion 360, balancing a clear silhouette with functional volume.',
      },
      {
        heading: 'The study',
        body: 'The supplied CAD capture documents the helmet as a focused object-design exploration.',
      },
    ],
    gallery: [],
  }),
  defineProject({
    slug: 'bamboo-cast-project',
    title: 'Bamboo Cast Project',
    category: 'cad',
    eyebrow: 'Object / Design',
    summary: 'A bamboo-inspired vessel, from first sketch to cast test',
    year: '2025',
    tools: fusion360Tools,
    thumbnail: {
      src: `${suppliedMedia}/bamboo-1420.jpg`,
      alt: 'Finished bamboo vessel project detail',
      kind: 'image',
    },
    heroMedia: {
      src: `${suppliedMedia}/bamboo-process.png`,
      alt: 'Bamboo vessel design process from inspiration through mold and cast',
      kind: 'image',
      caption: 'Supplied process board: inspiration, design, mold, and cast.',
    },
    sections: [
      {
        heading: 'The shape',
        body: 'Bamboo stalks set the direction for a soft, segmented vessel and its circular base.',
      },
      {
        heading: 'The test',
        body: 'The process ends with a green cast piece as the first physical test.',
      },
    ],
    gallery: [
      { src: `${suppliedMedia}/bamboo-1860.jpg`, alt: 'Bamboo vessel project detail', kind: 'image' },
      { src: `${suppliedMedia}/bamboo-1420.jpg`, alt: 'Finished bamboo vessel project detail', kind: 'image' },
    ],
  }),
  defineProject({
    slug: 'figma-showcase',
    title: 'Figma Showcase',
    category: 'other',
    eyebrow: 'Interface / Design',
    summary: 'A short look at a digital product in motion',
    year: '2025',
    tools: ['Figma'],
    thumbnail: {
      src: `${suppliedMedia}/figma-showcase.mp4`,
      alt: 'Figma interface showcase video preview',
      kind: 'video',
    },
    heroMedia: {
      src: `${suppliedMedia}/figma-showcase.mp4`,
      alt: 'Figma interface showcase video',
      kind: 'video',
      caption: 'Supplied Figma showcase export.',
    },
    sections: [
      {
        heading: 'The flow',
        body: 'A supplied showcase video brings the main screens and transitions together.',
      },
      {
        heading: 'The details',
        body: 'The video stays playable with native controls, so each moment can be paused and explored.',
      },
    ],
    gallery: [],
  }),
  defineProject({
    slug: 'clone-trooper-helmet-collection',
    title: 'Animated Phase II Clone Helmet',
    category: 'other',
    eyebrow: 'Helmet / Fabrication',
    summary: 'A collection of 3D-printed Clone Trooper helmets taken from raw print to painted finish',
    year: '2024',
    tools: ['3D Printing', 'Sanding', 'Spray Paint', 'Painting'],
    thumbnail: {
      src: `${suppliedMedia}/clone-helmet-final.webp`,
      alt: 'Finished blue-striped Clone Trooper helmet',
      kind: 'image',
    },
    heroMedia: {
      src: `${suppliedMedia}/clone-helmet-collection.webp`,
      alt: 'Collection of finished Clone Trooper helmets',
      kind: 'image',
    },
    sections: [
      {
        heading: 'The collection',
        body: 'A group of Clone Trooper helmets explores different finishes while keeping the same printed form.',
      },
      {
        heading: 'The process',
        body: 'Raw prints are sanded, spray painted, masked, and hand painted into finished display pieces.',
      },
    ],
    gallery: [
      { src: `${suppliedMedia}/clone-helmet-raw-print.webp`, alt: 'Raw 3D-printed Clone Trooper helmet on a post', kind: 'image' },
      { src: `${suppliedMedia}/clone-helmet-mask-process.webp`, alt: 'Clone Trooper helmet masked during painting', kind: 'image' },
      { src: `${suppliedMedia}/clone-helmet-tape-process.webp`, alt: 'Clone Trooper helmet covered with masking tape during detail work', kind: 'image' },
      { src: `${suppliedMedia}/clone-helmet-paint-process.webp`, alt: 'Clone Trooper helmet during blue paint masking', kind: 'image' },
      { src: `${suppliedMedia}/clone-helmet-final.webp`, alt: 'Finished blue-striped Clone Trooper helmet', kind: 'image' },
    ],
  }),
  defineProject({
    slug: 'clone-trooper-helmet',
    title: 'Live Action Phase II Clone Helmet',
    category: 'other',
    eyebrow: 'Helmet / Fabrication',
    summary: 'A 3D-printed Clone Trooper helmet finished by hand through sanding, spray paint, and detail painting',
    year: '2023',
    tools: ['3D Printing', 'Sanding', 'Spray Paint', 'Painting'],
    thumbnail: {
      src: `${suppliedMedia}/clone-trooper-0998.jpg`,
      alt: 'Finished weathered Clone Trooper helmet',
      kind: 'image',
    },
    heroMedia: {
      src: `${suppliedMedia}/clone-trooper-4303.jpg`,
      alt: 'White Clone Trooper helmet after painting',
      kind: 'image',
    },
    sections: [
      {
        heading: 'The build',
        body: 'A full-scale helmet assembled from 3D-printed parts and prepared by hand for a clean finish.',
      },
      {
        heading: 'The finish',
        body: 'Sanding, spray paint, and hand painting turn the printed form into a weathered Clone Trooper helmet.',
      },
    ],
    gallery: [
      { src: `${suppliedMedia}/clone-trooper-4419.jpg`, alt: 'Clone Trooper helmet during surface preparation', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-4420.jpg`, alt: 'Black-painted Clone Trooper helmet shell', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-special.jpg`, alt: 'Red-painted small Clone Trooper helmet', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-4435.jpg`, alt: 'Blue-masked Clone Trooper helmet during painting', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-4441.jpg`, alt: 'Partially painted white Clone Trooper helmet', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-4444.jpg`, alt: 'Glossy white Clone Trooper helmet with visor', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-4449.jpg`, alt: 'Unpainted Clone Trooper helmet on a work surface', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-4452.jpg`, alt: 'Gray 3D-printed Clone Trooper helmet', kind: 'image' },
      { src: `${suppliedMedia}/clone-trooper-0998.jpg`, alt: 'Finished weathered Clone Trooper helmet', kind: 'image' },
    ],
  }),
  defineProject({
    slug: 'wood-carving-panel',
    title: 'Wood Carving Panel Project',
    category: 'other',
    eyebrow: 'Wood / Carving',
    summary: 'A carved wood panel developed from a Clone Trooper drawing through milling, chiseling, and finishing',
    year: '2026',
    tools: ['Chiseling', 'Milling', 'Finishing'],
    thumbnail: {
      src: `${suppliedMedia}/wood-carving-0832.jpg`,
      alt: 'Finished wood carving panel with a Clone Trooper helmet',
      kind: 'image',
    },
    heroMedia: {
      src: `${suppliedMedia}/wood-carving-9681.jpg`,
      alt: 'Finished wood carving panel with a Clone Trooper helmet',
      kind: 'image',
    },
    sections: [
      {
        heading: 'The drawing',
        body: 'A Clone Trooper helmet sketch sets the direction for the carved panel and its framed composition.',
      },
      {
        heading: 'The finish',
        body: 'Milling, chiseling, and finishing shape the relief and bring out the grain across the final wood panel.',
      },
    ],
    gallery: [
      { src: `${suppliedMedia}/wood-carving-9772.jpg`, alt: 'Finished wood carving panel in the workshop', kind: 'image' },
      { src: `${suppliedMedia}/wood-carving-0131.jpg`, alt: 'Clone Trooper helmet drawing used for the carving', kind: 'image' },
      { src: `${suppliedMedia}/wood-carving-0210.jpg`, alt: 'Wood panel during the early carving stage', kind: 'image' },
      { src: `${suppliedMedia}/wood-carving-0217.jpg`, alt: 'Wood panel with the helmet relief taking shape', kind: 'image' },
      { src: `${suppliedMedia}/wood-carving-0292.jpg`, alt: 'Detailed wood carving in progress', kind: 'image' },
      { src: `${suppliedMedia}/wood-carving-0300.jpg`, alt: 'Wood carving with the textured background developed', kind: 'image' },
      { src: `${suppliedMedia}/wood-carving-0303.jpg`, alt: 'Wood carving panel nearing completion', kind: 'image' },
      { src: `${suppliedMedia}/wood-carving-helmet-final.webp`, alt: 'Finished wood carving panel with a Clone Trooper helmet', kind: 'image' },
    ],
  }),
  defineProject({
    slug: 'doodle-4-google',
    title: 'Google Hand-Drawn Animation',
    category: 'other',
    eyebrow: 'Illustration / Animation',
    summary: 'A hand-drawn animation built from illustrated plant forms and lettering',
    year: '2024',
    tools: ['Procreate', 'Premiere Pro'],
    thumbnail: {
      src: `${suppliedMedia}/doodle-4-google.mp4`,
      alt: 'Google hand-drawn animation with colorful illustrated plant forms',
      kind: 'video',
    },
    heroMedia: {
      src: `${suppliedMedia}/doodle-4-google.mp4`,
      alt: 'Google hand-drawn animation',
      kind: 'video',
      caption: 'Hand-drawn animation made in Procreate and edited in Premiere Pro.',
    },
    sections: [
      {
        heading: 'The drawing',
        body: 'Illustrated plant forms and lettering develop across the frame in a hand-drawn animation.',
      },
      {
        heading: 'The edit',
        body: 'Procreate drawings are assembled and timed in Premiere Pro.',
      },
    ],
    gallery: [],
  }),
  defineProject({
    slug: 'bottle-animation',
    title: 'Bottle Animation',
    category: 'cgi',
    orientation: 'landscape',
    eyebrow: 'Animation / Motion',
    summary: 'A moving image study built around timing, light, and atmosphere',
    year: '2026',
    tools: sharedCadCgiTools,
    thumbnail: {
      src: `${suppliedMedia}/bottle-primary.mp4`,
      alt: 'Animation study video preview',
      kind: 'video',
    },
    heroMedia: {
      src: `${suppliedMedia}/bottle-primary.mp4`,
      alt: 'Animation study video',
      kind: 'video',
    },
    sections: [
      {
        heading: 'The motion',
        body: 'Camera movement, timing, and changing light shape the feeling of the scene.',
      },
      {
        heading: 'The final cut',
        body: 'The supplied export is the main artifact, ready to watch at your own pace.',
      },
    ],
    gallery: [{ src: `${suppliedMedia}/bottle-roll.mp4`, alt: 'Bottle animation with bottles rolling through the scene', kind: 'video' }],
  }),
  defineProject({
    slug: 'porche-911-gt3-rs-rendering',
    title: 'Porsche 911 GT3 RS Rendering',
    category: 'cgi',
    eyebrow: 'Automotive / Rendering',
    summary: 'A studio render study of the Porsche 911 GT3 RS',
    year: '2026',
    tools: cgiOnlyTools,
    thumbnail: {
      src: `${suppliedMedia}/test4.png`,
      alt: 'Porsche 911 GT3 RS rendering',
      kind: 'image',
      caption: 'Porsche 911 GT3 RS rendering.',
    },
    heroMedia: {
      src: `${suppliedMedia}/test4.png`,
      alt: 'Porsche 911 GT3 RS rendering',
      kind: 'image',
      caption: 'Porsche 911 GT3 RS rendering.',
    },
    sections: [
      {
        heading: 'The render',
        body: 'A studio-lit automotive rendering study focused on the form and finish of the Porsche 911 GT3 RS.',
      },
      {
        heading: 'The image',
        body: 'The supplied render presents the car as a clean, resolved CGI composition.',
      },
    ],
    gallery: [
      { src: `${suppliedMedia}/porche-back.jpg`, alt: 'Front view of a Porsche 911 GT3 RS rendering', kind: 'image' },
      { src: `${suppliedMedia}/porche-ipad.jpg`, alt: 'Close-up Porsche 911 GT3 RS rendering detail', kind: 'image' },
    ],
  }),
  defineProject({
    slug: 'biomedical-cancer-locating-cart',
    title: 'Biomedical Cancer-Locating Cart',
    category: 'cgi',
    eyebrow: 'Object / 3D image',
    summary: 'A wheeled kiosk brought to life with light, color, and shape',
    year: '2025',
    tools: sharedCadCgiTools,
    thumbnail: {
      src: `${suppliedMedia}/generic-logo.png`,
      alt: 'Studio-lit render of a wheeled mobile kiosk with a raised display',
      kind: 'image',
      caption: 'Supplied product render.',
    },
    heroMedia: {
      src: `${suppliedMedia}/generic-logo.png`,
      alt: 'Studio-lit render of a wheeled mobile kiosk with a raised display',
      kind: 'image',
      caption: 'Supplied product render.',
    },
    sections: [
      {
        heading: 'The object',
        body: 'A small wheeled unit with curved rails, a raised screen, and a clean two-tone body.',
      },
      {
        heading: 'The image',
        body: 'Soft light, bright highlights, and a blue floor give the object a calm studio setting.',
      },
    ],
    gallery: [],
  }),
  defineProject({
    slug: 'drone-deconstruction-animation',
    title: 'Drone Deconstruction Animation',
    category: 'cgi',
    orientation: 'landscape',
    eyebrow: 'Animation / Motion',
    summary: 'Another moving image study from the archive',
    year: '2025',
    tools: sharedCadCgiTools,
    thumbnail: {
      src: `${suppliedMedia}/0001.mp4`,
      alt: 'Motion study 0001 video preview',
      kind: 'video',
    },
    heroMedia: {
      src: `${suppliedMedia}/0001.mp4`,
      alt: 'Motion study 0001 video',
      kind: 'video',
      caption: 'Supplied 0001 animation export.',
    },
    sections: [
      {
        heading: 'The frame',
        body: 'A supplied animation export gives the sequence room to speak for itself.',
      },
      {
        heading: 'The motion',
        body: 'Pause, scrub, and replay the video with native controls.',
      },
    ],
    gallery: [{ src: `${suppliedMedia}/drone-deconstruction.jpg`, alt: 'Assembled 83mm Tiny Whoop drone photographed on a workbench', kind: 'image' }],
  }),
  defineProject({
    slug: 'carbon-fiber-tiny-whoop-product-animation',
    title: 'Carbon Fiber Tiny Whoop Product Animation',
    category: 'cgi',
    orientation: 'landscape',
    thumbnailFit: 'cover',
    eyebrow: 'Animation / Product',
    summary: 'A carbon fiber Tiny Whoop product study built around form, motion, and detail',
    year: '2024',
    tools: sharedCadCgiTools,
    thumbnail: {
      src: `${suppliedMedia}/carbon-fiber-tiny-whoop-product-animation.mp4`,
      alt: 'Carbon fiber Tiny Whoop drone product animation',
      kind: 'video',
    },
    heroMedia: {
      src: `${suppliedMedia}/carbon-fiber-tiny-whoop-product-animation.mp4`,
      alt: 'Carbon fiber Tiny Whoop drone product animation',
      kind: 'video',
      caption: 'Supplied carbon fiber Tiny Whoop product animation.',
    },
    sections: [
      {
        heading: 'The product',
        body: 'A carbon fiber Tiny Whoop frame presented as a compact product study.',
      },
      {
        heading: 'The animation',
        body: 'Camera movement and changing angles reveal the frame from multiple viewpoints.',
      },
    ],
  }),
]

export function validateProjectCatalog(catalog: readonly Project[]): void {
  const slugs = new Set<string>()

  catalog.forEach((project) => {
    if (slugs.has(project.slug)) throw new Error(`Duplicate project slug "${project.slug}"`)
    slugs.add(project.slug)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error(`Invalid project slug "${project.slug}"`)
    if (!/^\d{4}$/.test(project.year)) throw new Error(`Invalid project year for "${project.slug}"`)
    if (!project.thumbnail.src || !project.heroMedia.src) throw new Error(`Missing project media for "${project.slug}"`)
    if (project.thumbnail.kind !== project.heroMedia.kind) throw new Error(`Thumbnail and hero media kinds differ for "${project.slug}"`)
    if (project.category === 'cgi' && project.thumbnail.kind === 'video' && !project.orientation) {
      throw new Error(`CGI video "${project.slug}" needs a landscape or portrait orientation`)
    }
    if (project.thumbnailFit && project.thumbnail.kind !== 'video') {
      throw new Error(`Thumbnail fit only applies to video project "${project.slug}"`)
    }
  })
}

validateProjectCatalog(projects)

export const getProjectsByCategory = (category: ProjectCategory): Project[] =>
  projects.filter((project) => project.category === category).sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))

export const getProjectBySlug = (slug: string | undefined): Project | undefined => projects.find((project) => project.slug === slug)
