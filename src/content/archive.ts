import { getProjectBySlug, getProjectPath, type MediaAsset } from './projects'

export type ArchiveVideo = {
  slug: string
  src: string
  title: string
  alt: string
  year: string
  href: string
  orientation?: 'landscape' | 'portrait'
  youtubeUrl?: string
}

const archiveMedia = `${import.meta.env.BASE_URL}media/archive`
const streamMedia = `${import.meta.env.BASE_URL}media/stream`

const createProjectVideo = (slug: string): ArchiveVideo => {
  const project = getProjectBySlug(slug)
  if (!project || project.thumbnail.kind !== 'video' || !project.year) {
    throw new Error(`Expected video project "${slug}"`)
  }

  return {
    slug: project.slug,
    src: project.thumbnail.src,
    title: project.title,
    alt: project.thumbnail.alt,
    year: project.year,
    href: getProjectPath(project.slug),
  }
}

export const cgiVideos: ArchiveVideo[] = [
  createProjectVideo('bottle-animation'),
  { slug: 'invincible', src: `${streamMedia}/invincible4final.mp4`, title: 'Invincible - Season 4 Unofficial Teaser Trailer', alt: 'Invincible animation', year: '2025', href: '/cgi/invincible', youtubeUrl: 'https://www.youtube.com/watch?v=MD6KvNZ-Djc' },
  { slug: 'final-animation', src: `${streamMedia}/final.mp4`, title: 'Arcane - Ma Meilleure Ennemie but in LEGO', alt: 'Final animation export', year: '2025', href: '/cgi/final-animation', youtubeUrl: 'https://www.youtube.com/watch?v=8ZDylshw-cs' },
  createProjectVideo('drone-deconstruction-animation'),
  { slug: 'lego-debate', src: `${streamMedia}/debate2-final.mp4`, title: 'Trump and Harris Presidential Debate but in LEGO', alt: 'LEGO debate animation', year: '2024', href: '/cgi/lego-debate', youtubeUrl: 'https://www.youtube.com/watch?v=YlhEZTxmDlA' },
  { slug: 'lego-grammy', src: `${streamMedia}/grammy-final.mp4`, title: 'Kanye West Wins Grammy Best Rap Album Speech but in LEGO', alt: 'LEGO Grammy animation', year: '2024', orientation: 'portrait', href: '/cgi/lego-grammy', youtubeUrl: 'https://www.youtube.com/watch?v=7DuW4mAjFag' },
  { slug: 'lego-field-trip', src: `${streamMedia}/field-trip.mp4`, title: 'Kanye West – FIELD TRIP | Music Video', alt: 'LEGO Field Trip animation', year: '2024', href: '/cgi/lego-field-trip', youtubeUrl: 'https://www.youtube.com/watch?v=LMruuUC5wAw' },
  { slug: 'lego-bomb', src: `${streamMedia}/bomb-final.mp4`, title: 'Kanye West - BOMB (feat. North West) | LEGO Music Video', alt: 'LEGO Bomb animation', year: '2024', href: '/cgi/lego-bomb', youtubeUrl: 'https://www.youtube.com/watch?v=8mdvX56404U' },
  { slug: 'shortform', src: `${streamMedia}/shortform.mp4`, title: 'Wholly Custom LEGO Set, Box, and Rendering', alt: 'Shortform animation', year: '2025', orientation: 'portrait', href: '/cgi/shortform' },
]

export function getArchiveVideoBySlug(slug?: string) {
  return cgiVideos.find((video) => video.slug === slug)
}

export const cadImages: MediaAsset[] = [
  {
    src: `${streamMedia}/img-1638.jpeg`,
    alt: '83mm Tiny Whoop drones on a workbench',
    kind: 'image',
    caption: 'Final product',
  },
  {
    src: `${streamMedia}/img-1639.jpg`,
    alt: '83mm Tiny Whoop drone project detail',
    kind: 'image',
    caption: 'Fusion 360 file',
  },
]

export const stlAsset = {
  src: `${archiveMedia}/drone-january.stl`,
  title: 'Tiny Whoop Drone',
  alt: 'Rotating Tiny Whoop drone frame STL model',
}

export const bottleModelAsset = {
  src: `${archiveMedia}/mike-and-pattys-bottle.obj`,
  title: "Mike & Patty's Bottle",
  alt: "Rotating Mike and Patty's bottle OBJ model",
}
export const otherStlAsset = {
  src: `${archiveMedia}/in-class.stl`,
  title: 'In Class',
  alt: 'Rotating in-class STL model',
}

export const legoStlAsset = {
  src: `${archiveMedia}/lego.stl`,
  title: 'LEGO Model',
  alt: 'Rotating LEGO model STL asset',
}

export type CadProject = {
  slug: string
  title: string
  alt: string
  year?: string
  href: string
  media?: MediaAsset
  gallery?: MediaAsset[]
  stl?: typeof stlAsset
}

const createCadProject = (slug: string): CadProject => {
  const project = getProjectBySlug(slug)
  if (!project) throw new Error(`Expected project "${slug}"`)

  return {
    slug: project.slug,
    title: project.title,
    alt: project.thumbnail.alt,
    year: project.year,
    href: getProjectPath(project.slug),
    media: project.thumbnail,
  }
}

export const cadProjects: CadProject[] = [
  { slug: 'tiny-whoop-drone', title: '83mm Tiny Whoop Drones', alt: cadImages[0].alt, year: '2026', href: '/cad/tiny-whoop-drone', media: cadImages[0], gallery: [cadImages[1]], stl: stlAsset },
  createCadProject('bamboo-cast-project'),
  createCadProject('bottle-animation'),
  createCadProject('drone-deconstruction-animation'),
  createCadProject('biomedical-cancer-locating-cart'),
  createCadProject('custom-helmet'),
]

export function getCadProjectBySlug(slug?: string) {
  return cadProjects.find((project) => project.slug === slug)
}
