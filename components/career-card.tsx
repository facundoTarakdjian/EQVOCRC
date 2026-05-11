"use client"

interface CareerCardProps {
  title: string
  subtitle: string
  match: number
  matchLabel: string
  matchColor: string
  description: string
  pillars: {
    label: string
    value: number
  }[]
  environment: {
    icon: string
    label: string
    highlighted: boolean
  }[]
  steps: string[]
}

export function CareerCard({
  title,
  subtitle,
  match,
  matchLabel,
  matchColor,
  description,
  pillars,
  environment,
  steps,
}: CareerCardProps) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (match / 100) * circumference

  return (
    <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-md">
      {/* Header con Match */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Circular Match Indicator */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="48"
              cy="48"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-muted/20"
            />
            <circle
              cx="48"
              cy="48"
              r="45"
              stroke={matchColor}
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold tracking-tight">{match}%</div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{matchLabel}</div>
          </div>
        </div>
      </div>

      {/* Match Vocacional Description */}
      <div className="mb-8 rounded-2xl bg-muted/30 p-6">
        <p className="text-sm leading-relaxed text-foreground/90">{description}</p>
      </div>

      {/* Pillars */}
      <div className="mb-8">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pilares de la Carrera
        </h4>
        <div className="space-y-3">
          {pillars.map((pillar, index) => (
            <div key={index}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-foreground/80">{pillar.label}</span>
                <span className="font-medium text-foreground">{pillar.value}/5</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted/30">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(pillar.value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment */}
      <div className="mb-8">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Entorno de Trabajo
        </h4>
        <div className="flex flex-wrap gap-2">
          {environment.map((env, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                env.highlighted
                  ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "bg-muted/30 text-muted-foreground/50"
              }`}
            >
              <span>{env.icon}</span>
              <span className="font-medium">{env.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Steps */}
      <div>
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Ruta de Implementación
        </h4>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </div>
              <p className="flex-1 pt-0.5 text-sm leading-relaxed text-foreground/80">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
