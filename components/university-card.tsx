"use client"

interface UniversityCardProps {
  institution: string
  career: string
  studyLoad: {
    label: string
    percentage: number
    color: string
  }[]
  investment: {
    level: string
    price: string
    roi: string
  }
  community: {
    label: string
    rating: number
  }[]
  quote: {
    text: string
    author: string
  }
  location: {
    place: string
    context: string
  }
  benefits: {
    type: string
    requirements: string
  }[]
}

export function UniversityCard({
  institution,
  career,
  studyLoad,
  investment,
  community,
  quote,
  location,
  benefits,
}: UniversityCardProps) {
  return (
    <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">{institution}</div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{career}</h3>
      </div>

      {/* Study Load Visualization */}
      <div className="mb-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Carga de Plan de Estudios
        </h4>
        <div className="space-y-2">
          {studyLoad.map((item, index) => (
            <div key={index}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-foreground/80">{item.label}</span>
                <span className="font-semibold text-foreground">{item.percentage}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted/30">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment & ROI */}
      <div className="mb-6 rounded-2xl bg-muted/30 p-5">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Inversión</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {investment.level}
          </span>
        </div>
        <div className="mb-1 text-lg font-bold text-foreground">{investment.price}</div>
        <div className="text-xs text-muted-foreground">Retorno: {investment.roi}</div>
      </div>

      {/* Community Voice */}
      <div className="mb-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Voz de la Comunidad
        </h4>
        <div className="space-y-2">
          {community.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-foreground/80">{item.label}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${i < Math.round(item.rating) ? "bg-primary" : "bg-muted/30"}`}
                  />
                ))}
                <span className="ml-1 text-xs font-semibold text-foreground">{item.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="mb-6 rounded-2xl border-l-4 border-primary/30 bg-muted/20 p-5">
        <p className="mb-2 text-sm italic leading-relaxed text-foreground/90">"{quote.text}"</p>
        <p className="text-xs font-medium text-muted-foreground">— {quote.author}</p>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ubicación</h4>
        <div className="rounded-xl bg-muted/30 p-4">
          <div className="mb-1 font-semibold text-foreground">{location.place}</div>
          <div className="text-xs leading-relaxed text-muted-foreground">{location.context}</div>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Oportunidades de Acceso
        </h4>
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="rounded-xl border border-border/30 bg-muted/20 p-4">
              <div className="mb-1 text-sm font-semibold text-foreground">{benefit.type}</div>
              <div className="text-xs leading-relaxed text-muted-foreground">{benefit.requirements}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
        Ver más información
      </button>
    </div>
  )
}
