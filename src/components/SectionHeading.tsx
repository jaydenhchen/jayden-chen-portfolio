type SectionHeadingProps = {
  eyebrow?: string
  title: string
  titleId?: string
  intro?: string
}

export function SectionHeading({ eyebrow, title, titleId, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="text-reveal">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={titleId}>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </div>
  )
}
