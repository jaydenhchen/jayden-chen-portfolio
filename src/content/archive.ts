import type { MediaAsset } from './projects'

export type ArchiveVideo = {
  src: string
  title: string
  alt: string
}

const archiveMedia = '/media/archive'

export const cgiVideos: ArchiveVideo[] = [
  { src: `${archiveMedia}/animation1.mp4`, title: 'Bottle study', alt: 'Bottle animation study' },
  { src: `${archiveMedia}/figma-showcase.mp4`, title: 'Figma showcase', alt: 'Figma showcase video' },
  { src: `${archiveMedia}/invincible4final.mp4`, title: 'Invincible', alt: 'Invincible animation' },
  { src: `${archiveMedia}/final.mp4`, title: 'Final animation', alt: 'Final animation export' },
  { src: `${archiveMedia}/0001.mp4`, title: 'Drone animation', alt: 'Drone animation study' },
  { src: `${archiveMedia}/debate2-final.mp4`, title: 'Debate 02', alt: 'LEGO debate animation' },
  { src: `${archiveMedia}/grammy-final.mp4`, title: 'Grammy', alt: 'LEGO Grammy animation' },
  { src: `${archiveMedia}/field-trip.mp4`, title: 'Field Trip', alt: 'Field Trip animation' },
  { src: `${archiveMedia}/bomb-final.mp4`, title: 'Bomb', alt: 'LEGO Bomb animation' },
  { src: `${archiveMedia}/shortform.mp4`, title: 'Shortform', alt: 'Shortform animation' },
]

export const cadImages: MediaAsset[] = [
  {
    src: `${archiveMedia}/drone-cad.png`,
    alt: 'Ducted drone frame in a CAD workspace',
    kind: 'image',
    caption: 'Drone frame study.',
  },
  {
    src: `${archiveMedia}/img-1638.jpeg`,
    alt: 'Three ducted quadcopter prototypes on a workbench',
    kind: 'image',
    caption: 'Prototype build.',
  },
  {
    src: `${archiveMedia}/img-1639.jpg`,
    alt: 'Wheeled mobile kiosk render',
    kind: 'image',
    caption: 'Kiosk study.',
  },
  {
    src: `${archiveMedia}/bamboo-process.png`,
    alt: 'Bamboo vessel design and casting process board',
    kind: 'image',
    caption: 'Bamboo vessel process.',
  },
  {
    src: `${archiveMedia}/generic-logo.png`,
    alt: 'Studio-lit mobile kiosk render',
    kind: 'image',
    caption: 'Product render.',
  },
  {
    src: `${archiveMedia}/test4.png`,
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
