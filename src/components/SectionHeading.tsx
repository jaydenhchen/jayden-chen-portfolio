type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: string
  titleId?: string
  intro?: string
}

export function SectionHeading({ index, eyebrow, title, titleId, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="section-index" aria-hidden="true">{index}</p>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </div>
  )
}
