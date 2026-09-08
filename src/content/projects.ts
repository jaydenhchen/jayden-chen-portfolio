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
  nextSlug?: string
}

const suppliedMedia = '/media/stream'

export const projects: Project[] = [
  {
    slug: 'ducted-drone-frame',
    title: 'Ducted drone frame',
    category: 'engineering',
    eyebrow: 'Drone / Design',
    summary: 'A drone frame shaped in Fusion 360 and tested as a physical build.',
    role: 'Design and build',
    tools: ['Fusion 360', 'CAD', 'Prototype'],
    thumbnail: {
      src: `${suppliedMedia}/drone-cad.png`,
      alt: 'Four-rotor ducted drone frame shown in a Fusion 360 CAD workspace',
      kind: 'image',
      caption: 'Supplied CAD capture: drone january v7.',
    },
    heroMedia: {
      src: `${suppliedMedia}/drone-cad.png`,
      alt: 'Four-rotor ducted drone frame shown in a Fusion 360 CAD workspace',
      kind: 'image',
      caption: 'Supplied CAD capture: drone january v7.',
    },
    sections: [
      {
        heading: 'The idea',
        body: 'A compact frame with four circular guards and an open center, modeled in Fusion 360.',
      },
      {
        heading: 'The build',
        body: 'The supplied photo shows three small ducted drones on a workbench, moving the idea from screen to hand.',
      },
    ],
    gallery: [
      {
        src: `${suppliedMedia}/img-1638.jpeg`,
        alt: 'Three small ducted quadcopter prototypes arranged on a wooden workbench',
        kind: 'image',
        caption: 'Supplied prototype photograph.',
      },
    ],
    nextSlug: 'bamboo-cast-vessel',
  },
  {
    slug: 'bamboo-cast-vessel',
    title: 'Bamboo cast vessel',
    category: 'engineering',
    eyebrow: 'Object / Design',
    summary: 'A bamboo-inspired vessel, from first sketch to cast test.',
    role: 'Object design',
    tools: ['CAD', 'Mold design', 'Casting'],
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
    nextSlug: 'figma-showcase',
  },
  {
    slug: 'figma-showcase',
    title: 'Figma showcase',
    category: 'other',
    eyebrow: 'Interface / Design',
    summary: 'A short look at a digital product in motion.',
    role: 'Interface design',
    tools: ['Figma', 'Interface', 'Motion'],
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
    nextSlug: 'animation-study',
  },
  {
    slug: 'animation-study',
    title: 'Animation study',
    category: 'cgi',
    eyebrow: 'Animation / Motion',
    summary: 'A moving image study built around timing, light, and atmosphere.',
    role: 'Animation',
    tools: ['Blender', 'Animation', 'Motion'],
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
    nextSlug: 'mobile-kiosk-render',
  },
  {
    slug: 'mobile-kiosk-render',
    title: 'Mobile kiosk render',
    category: 'cgi',
    eyebrow: 'Object / 3D image',
    summary: 'A wheeled kiosk brought to life with light, color, and shape.',
    role: '3D design',
    tools: ['3D design', 'Materials', 'Lighting'],
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
    nextSlug: 'motion-study-0001',
  },
  {
    slug: 'motion-study-0001',
    title: 'Motion study 0001',
    category: 'cgi',
    eyebrow: 'Animation / Motion',
    summary: 'Another moving image study from the archive.',
    role: 'Animation',
    tools: ['Blender', 'Animation', 'Compositing'],
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
  projects.filter((project) => project.category === category)

export const getProjectBySlug = (slug: string | undefined): Project | undefined =>
  projects.find((project) => project.slug === slug)
