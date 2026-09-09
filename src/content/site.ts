export type SocialLink = {
  label: string
  href: string
}

export type SiteProfile = {
  name: string
  monogram: string
  headline: string
  location?: string
  email: string
  resumeUrl?: string
  socials: SocialLink[]
}

// Identity, contact, and outbound links come from the supplied resume and profile details.
export const siteProfile: SiteProfile = {
  name: 'Jayden Chen',
  monogram: 'JC',
  headline: 'Design, create, then make it move',
  email: 'jayden.h.chen@gmail.com',
  resumeUrl: `${import.meta.env.BASE_URL}media/ChenJayden_Resume.pdf`,
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jayden-chen-945679211/' },
    { label: 'YouTube', href: 'https://youtube.com/atticanimations' },
  ],
}
