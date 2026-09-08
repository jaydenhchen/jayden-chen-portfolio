export type SocialLink = {
  label: string
  href: string
}

export type SiteProfile = {
  name: string
  monogram: string
  headline: string
  intro: string
  location?: string
  email: string
  resumeUrl?: string
  socials: SocialLink[]
}

// Identity, contact, and outbound links come from the supplied resume and profile details.
export const siteProfile: SiteProfile = {
  name: 'Jayden Chen',
  monogram: 'JC',
  headline: 'Design, build, and make it move.',
  intro:
    'I make products, objects, and animations — from first sketch to final frame.',
  email: 'jayden.h.chen@gmail.com',
  resumeUrl: '/media/ChenJayden_Resume.pdf',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jayden-chen-945679211/' },
    { label: 'YouTube', href: 'https://youtube.com/atticanimations' },
  ],
}
