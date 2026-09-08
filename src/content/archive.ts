import type { MediaAsset } from './projects'

export type ArchiveVideo = {
  slug: string
  src: string
  title: string
  alt: string
  orientation?: 'landscape' | 'portrait'
  youtubeUrl?: string
}

const archiveMedia = '/media/archive'
const streamMedia = '/media/stream'
export const cgiVideos: ArchiveVideo[] = [
  { slug: 'bottle-study', src: `${streamMedia}/animation1.mp4`, title: 'Bottle study', alt: 'Bottle animation study' },
  { slug: 'invincible', src: `${streamMedia}/invincible4final.mp4`, title: 'Invincible - Season 4 Unofficial Teaser Trailer', alt: 'Invincible animation', youtubeUrl: 'https://www.youtube.com/watch?v=MD6KvNZ-Djc' },
  { slug: 'final-animation', src: `${streamMedia}/final.mp4`, title: 'Arcane - Ma Meilleure Ennemie but in LEGO', alt: 'Final animation export', youtubeUrl: 'https://www.youtube.com/watch?v=8ZDylshw-cs' },
  { slug: 'drone-animation', src: `${streamMedia}/0001.mp4`, title: 'Drone animation', alt: 'Drone animation study' },
  { slug: 'lego-debate', src: `${streamMedia}/debate2-final.mp4`, title: 'Trump and Harris Presidential Debate but in LEGO', alt: 'LEGO debate animation', youtubeUrl: 'https://www.youtube.com/watch?v=YlhEZTxmDlA' },
  { slug: 'lego-grammy', src: `${streamMedia}/grammy-final.mp4`, title: 'Kanye West Wins Grammy Best Rap Album Speech But in LEGO', alt: 'LEGO Grammy animation', orientation: 'portrait', youtubeUrl: 'https://www.youtube.com/watch?v=7DuW4mAjFag' },
  { slug: 'lego-field-trip', src: `${streamMedia}/field-trip.mp4`, title: 'Kanye West – FIELD TRIP | Music Video', alt: 'LEGO Field Trip animation', youtubeUrl: 'https://www.youtube.com/watch?v=LMruuUC5wAw' },
  { slug: 'lego-bomb', src: `${streamMedia}/bomb-final.mp4`, title: 'Kanye West - BOMB (feat. North West) | LEGO Music Video', alt: 'LEGO Bomb animation', youtubeUrl: 'https://www.youtube.com/watch?v=8mdvX56404U' },
  { slug: 'shortform', src: `${streamMedia}/shortform.mp4`, title: 'Shortform', alt: 'Shortform animation', orientation: 'portrait' },
]

export function getArchiveVideoBySlug(slug?: string) {
  return cgiVideos.find((video) => video.slug === slug)
}

export const cadImages: MediaAsset[] = [
  {
    src: `${streamMedia}/drone-cad.png`,
    alt: 'Ducted drone frame in a CAD workspace',
    kind: 'image',
    caption: 'Drone frame study.',
  },
  {
    src: `${streamMedia}/img-1638.jpeg`,
    alt: 'Three ducted quadcopter prototypes on a workbench',
    kind: 'image',
    caption: 'Prototype build.',
  },
  {
    src: `${streamMedia}/img-1639.jpg`,
    alt: 'Wheeled mobile kiosk render',
    kind: 'image',
    caption: 'Kiosk study.',
  },
  {
    src: `${streamMedia}/bamboo-process.png`,
    alt: 'Bamboo vessel design and casting process board',
    kind: 'image',
    caption: 'Bamboo vessel process.',
  },
  {
    src: `${streamMedia}/generic-logo.png`,
    alt: 'Studio-lit mobile kiosk render',
    kind: 'image',
    caption: 'Product render.',
  },
  {
    src: `${streamMedia}/test4.png`,
    alt: 'Supplied design study image',
    kind: 'image',
    caption: 'Additional supplied study.',
  },
]

export const stlAsset = {
  src: `${archiveMedia}/drone-january.stl`,
  title: 'Drone January',
  alt: 'Rotating ducted drone frame STL model',
}
