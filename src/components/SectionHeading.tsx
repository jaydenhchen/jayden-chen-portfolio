import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  titleId?: string
  intro?: string
}

export function SectionHeading({ eyebrow, title, titleId, intro }: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={titleId}>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </Reveal>
  )
}
