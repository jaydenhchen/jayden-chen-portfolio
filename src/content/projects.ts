export type ProjectCategory = 'engineering' | 'cgi' | 'other'

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
  year?: string
  role?: string
  tools: string[]
  thumbnail: MediaAsset
  heroMedia: MediaAsset
  sections: ProjectSection[]
  gallery: MediaAsset[]
}

const suppliedMedia = `${import.meta.env.BASE_URL}media/stream`
const completeCadCgiTools = ['Fusion 360', 'Blender', 'Premiere Pro', 'Photoshop', 'Nuke']
export const getProjectPath = (slug: string) => `/work/${slug}`

export const projects: Project[] = [
  {
    slug: 'custom-helmet',
    title: 'Custom Helmet',
    category: 'engineering',
    eyebrow: 'Helmet / Design',
    summary: 'A custom helmet modeled in Fusion 360 as a focused design study',
    year: '2024',
    tools: completeCadCgiTools,
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
  },
  {
    slug: 'bamboo-cast-project',
    title: 'Bamboo Cast Project',
    category: 'engineering',
    eyebrow: 'Object / Design',
    summary: 'A bamboo-inspired vessel, from first sketch to cast test',
    year: '2025',
    tools: completeCadCgiTools,
    thumbnail: {
      src: `${suppliedMedia}/bamboo-process.png`,
      alt: 'Bamboo vessel design process from inspiration through mold and cast prototype',
      kind: 'image',
      caption: 'Supplied process board: inspiration, design, mold, and cast prototype.',
    },
    heroMedia: {
      src: `${suppliedMedia}/bamboo-process.png`,
      alt: 'Bamboo vessel design process from inspiration through mold and cast prototype',
      kind: 'image',
      caption: 'Supplied process board: inspiration, design, mold, and cast prototype.',
    },
    sections: [
      {
        heading: 'The shape',
        body: 'Bamboo stalks set the direction for a soft, segmented vessel and its circular base.',
      },
      {
        heading: 'The test',
        body: 'The process ends with a green cast piece, labeled as still a work in progress.',
      },
    ],
    gallery: [],
  },
  {
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
  },
  {
    slug: 'bottle-animation',
    title: 'Bottle Animation',
    category: 'cgi',
    eyebrow: 'Animation / Motion',
    summary: 'A moving image study built around timing, light, and atmosphere',
    year: '2026',
    tools: completeCadCgiTools,
    thumbnail: {
      src: `${suppliedMedia}/animation1.mp4`,
      alt: 'Animation study video preview',
      kind: 'video',
    },
    heroMedia: {
      src: `${suppliedMedia}/animation1.mp4`,
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
    gallery: [],
  },
  {
    slug: 'porche-911-gt3-rs-rendering',
    title: 'Porche 911 GT3 RS Rendering',
    category: 'cgi',
    eyebrow: 'Automotive / Rendering',
    summary: 'A studio render study of the Porche 911 GT3 RS',
    year: '2026',
    tools: completeCadCgiTools,
    thumbnail: {
      src: `${suppliedMedia}/test4.png`,
      alt: 'Porche 911 GT3 RS rendering',
      kind: 'image',
      caption: 'Porche 911 GT3 RS rendering.',
    },
    heroMedia: {
      src: `${suppliedMedia}/test4.png`,
      alt: 'Porche 911 GT3 RS rendering',
      kind: 'image',
      caption: 'Porche 911 GT3 RS rendering.',
    },
    sections: [
      {
        heading: 'The render',
        body: 'A studio-lit automotive rendering study focused on the form and finish of the Porche 911 GT3 RS.',
      },
      {
        heading: 'The image',
        body: 'The supplied render presents the car as a clean, resolved CGI composition.',
      },
    ],
    gallery: [],
  },
  {
    slug: 'biomedical-cancer-locating-cart',
    title: 'Biomedical Cancer-Locating Cart',
    category: 'cgi',
    eyebrow: 'Object / 3D image',
    summary: 'A wheeled kiosk brought to life with light, color, and shape',
    year: '2025',
    tools: completeCadCgiTools,
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
  },
  {
    slug: 'drone-deconstruction-animation',
    title: 'Drone Deconstruction Animation',
    category: 'cgi',
    eyebrow: 'Animation / Motion',
    summary: 'Another moving image study from the archive',
    year: '2025',
    tools: completeCadCgiTools,
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
    gallery: [],
  },
]

export const getProjectsByCategory = (category: ProjectCategory): Project[] =>
  projects
    .filter((project) => project.category === category)
    .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))

export const getProjectBySlug = (slug: string | undefined): Project | undefined =>
  projects.find((project) => project.slug === slug)
