import { cgiOnlyTools, fusion360Tools, getProjectBySlug, getProjectPath, type MediaAsset, type ThumbnailFit, type VideoOrientation } from './projects'

export type ArchiveVideo = {
  slug: string
  src: string
  title: string
  alt: string
  year: string
  href: string
  orientation: VideoOrientation
  thumbnailFit?: ThumbnailFit
  youtubeUrl?: string
  tools?: string[]
  gallery?: MediaAsset[]
}

export type ArchiveVideoDefinition = Omit<ArchiveVideo, 'href'>

/** Build an archive video with its canonical detail route. */
export const defineArchiveVideo = ({ slug, ...video }: ArchiveVideoDefinition): ArchiveVideo => ({
  ...video,
  slug,
  href: `/cgi/${slug}`,
})

const archiveMedia = `${import.meta.env.BASE_URL}media/archive`
const streamMedia = `${import.meta.env.BASE_URL}media/stream`

const createProjectVideo = (slug: string): ArchiveVideo => {
  const project = getProjectBySlug(slug)
  if (!project || project.thumbnail.kind !== 'video' || !project.year) {
    throw new Error(`Expected video project "${slug}"`)
  }

  return defineArchiveVideo({
    slug: project.slug,
    src: project.thumbnail.src,
    title: project.title,
    alt: project.thumbnail.alt,
    year: project.year,
    orientation: project.orientation ?? 'landscape',
    thumbnailFit: project.thumbnailFit,
    tools: project.tools,
    gallery: project.gallery,
  })
}

export const cgiVideos: ArchiveVideo[] = [
  createProjectVideo('bottle-animation'),
  defineArchiveVideo({
    slug: 'invincible',
    src: `${streamMedia}/invincible4final.mp4`,
    title: 'Invincible - Season 4 Unofficial Teaser Trailer',
    alt: 'Invincible animation',
    year: '2025',
    orientation: 'landscape',
    tools: cgiOnlyTools,
    youtubeUrl: 'https://www.youtube.com/watch?v=MD6KvNZ-Djc',
  }),
  defineArchiveVideo({
    slug: 'final-animation',
    src: `${streamMedia}/final.mp4`,
    title: 'Arcane - Ma Meilleure Ennemie but in LEGO',
    alt: 'Final animation export',
    year: '2025',
    orientation: 'landscape',
    thumbnailFit: 'cover',
    tools: cgiOnlyTools,
    youtubeUrl: 'https://www.youtube.com/watch?v=8ZDylshw-cs',
  }),
  createProjectVideo('drone-deconstruction-animation'),
  defineArchiveVideo({
    slug: 'lego-debate',
    src: `${streamMedia}/debate2-final.mp4`,
    title: 'Trump and Harris Presidential Debate but in LEGO',
    alt: 'LEGO debate animation',
    year: '2024',
    orientation: 'landscape',
    tools: cgiOnlyTools,
    youtubeUrl: 'https://www.youtube.com/watch?v=YlhEZTxmDlA',
  }),
  defineArchiveVideo({
    slug: 'lego-grammy',
    src: `${streamMedia}/grammy-final.mp4`,
    title: 'Kanye West Wins Grammy Best Rap Album Speech but in LEGO',
    alt: 'LEGO Grammy animation',
    year: '2024',
    orientation: 'portrait',
    tools: cgiOnlyTools,
    youtubeUrl: 'https://www.youtube.com/watch?v=7DuW4mAjFag',
  }),
  defineArchiveVideo({
    slug: 'lego-field-trip',
    src: `${streamMedia}/field-trip.mp4`,
    title: 'Kanye West – FIELD TRIP | Music Video',
    alt: 'LEGO Field Trip animation',
    year: '2024',
    orientation: 'landscape',
    thumbnailFit: 'cover',
    tools: cgiOnlyTools,
    youtubeUrl: 'https://www.youtube.com/watch?v=LMruuUC5wAw',
  }),
  defineArchiveVideo({
    slug: 'lego-bomb',
    src: `${streamMedia}/bomb-final.mp4`,
    title: 'Kanye West - BOMB (feat. North West) | LEGO Music Video',
    alt: 'LEGO Bomb animation',
    year: '2024',
    orientation: 'landscape',
    thumbnailFit: 'cover',
    tools: cgiOnlyTools,
    youtubeUrl: 'https://www.youtube.com/watch?v=8mdvX56404U',
  }),
  createProjectVideo('carbon-fiber-tiny-whoop-product-animation'),
  defineArchiveVideo({
    slug: 'shortform',
    src: `${streamMedia}/shortform.mp4`,
    title: 'Wholly Custom LEGO Set, Box, and Rendering',
    alt: 'Shortform animation',
    year: '2025',
    orientation: 'portrait',
    tools: cgiOnlyTools,
    gallery: [{ src: `${streamMedia}/wholly-custom-lego-set.jpg`, alt: 'Wholly custom LEGO set', kind: 'image' }],
  }),
]

export function validateArchiveVideos(videos: readonly ArchiveVideo[]): void {
  const slugs = new Set<string>()

  videos.forEach((video) => {
    if (slugs.has(video.slug)) throw new Error(`Duplicate CGI archive slug "${video.slug}"`)
    slugs.add(video.slug)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(video.slug)) throw new Error(`Invalid CGI archive slug "${video.slug}"`)
    if (!/^\d{4}$/.test(video.year)) throw new Error(`Invalid CGI archive year for "${video.slug}"`)
    if (video.href !== `/cgi/${video.slug}`) throw new Error(`CGI archive route mismatch for "${video.slug}"`)
  })
}

validateArchiveVideos(cgiVideos)

export function getArchiveVideoBySlug(slug?: string) {
  return cgiVideos.find((video) => video.slug === slug)
}

export const cadImages: MediaAsset[] = [
  {
    src: `${streamMedia}/img-1639.jpg`,
    alt: '83mm Tiny Whoop drone frame in a Fusion 360 workspace',
    kind: 'image',
    caption: 'Fusion 360 file',
  },
  {
    src: `${streamMedia}/img-1638.jpeg`,
    alt: 'Three assembled 83mm Tiny Whoop drones on a workbench',
    kind: 'image',
    caption: 'Final product',
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
  year: string
  href: string
  media?: MediaAsset
  thumbnail?: MediaAsset
  gallery?: MediaAsset[]
  stl?: typeof stlAsset
  tools?: string[]
}

export type CadProjectDefinition = Omit<CadProject, 'href'>

/** Build a CAD entry with its canonical detail route. */
export const defineCadProject = ({ slug, ...project }: CadProjectDefinition): CadProject => ({
  ...project,
  slug,
  href: `/cad/${slug}`,
})

/** Link a project catalog entry into the CAD archive. */
const createCadProject = (slug: string): CadProject => {
  const project = getProjectBySlug(slug)
  if (!project) throw new Error(`Expected project "${slug}"`)
  return defineCadProject({
    slug: project.slug,
    title: project.title,
    alt: project.heroMedia.alt,
    year: project.year,
    tools: project.tools,
    media: project.heroMedia,
    thumbnail: project.thumbnail,
    gallery: project.gallery,
  })
}

export const cadProjects: CadProject[] = [
  defineCadProject({
    slug: 'tiny-whoop-drone',
    title: '83mm Tiny Whoop Drones',
    alt: cadImages[0].alt,
    year: '2026',
    tools: fusion360Tools,
    media: cadImages[0],
    gallery: [cadImages[1]],
    stl: stlAsset,
  }),
  createCadProject('bamboo-cast-project'),
  createCadProject('bottle-animation'),
  createCadProject('drone-deconstruction-animation'),
  createCadProject('carbon-fiber-tiny-whoop-product-animation'),
  createCadProject('biomedical-cancer-locating-cart'),
  createCadProject('custom-helmet'),
]

export function validateCadProjects(projects: readonly CadProject[]): void {
  const slugs = new Set<string>()

  projects.forEach((project) => {
    if (slugs.has(project.slug)) throw new Error(`Duplicate CAD archive slug "${project.slug}"`)
    slugs.add(project.slug)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error(`Invalid CAD archive slug "${project.slug}"`)
    if (!/^\d{4}$/.test(project.year)) throw new Error(`Invalid CAD archive year for "${project.slug}"`)
    if (project.href !== `/cad/${project.slug}`) throw new Error(`CAD archive route mismatch for "${project.slug}"`)
    if (!project.media && !project.gallery?.length && !project.stl) throw new Error(`CAD archive entry "${project.slug}" needs media or an STL`)
  })
}

validateCadProjects(cadProjects)

export function getCadProjectBySlug(slug?: string) {
  return cadProjects.find((project) => project.slug === slug)
}
