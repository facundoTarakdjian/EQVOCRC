"use client"

export function LifeBalanceGauge() {
  // Gauge value from 0-100 (50 = center/balanced)
  const gaugeValue = 55 // Slightly toward work-study balance

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">Balance Vida-Estudio</h3>
        <p className="mt-2 text-sm text-muted-foreground">¿Puedo trabajar y estudiar sin quemarme?</p>
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        {/* Gauge background arc */}
        <svg viewBox="0 0 200 120" className="w-full">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Colored sections */}
          {/* Red zone (left) */}
          <path
            d="M 20 100 A 80 80 0 0 1 66.4 41.6"
            fill="none"
            stroke="#ef4444"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Green zone (center) */}
          <path
            d="M 66.4 41.6 A 80 80 0 0 1 133.6 41.6"
            fill="none"
            stroke="#10b981"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Yellow zone (right) */}
          <path
            d="M 133.6 41.6 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Needle */}
          <g transform={`rotate(${-90 + gaugeValue * 1.8} 100 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="35"
              stroke="hsl(var(--foreground))"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill="hsl(var(--foreground))" />
          </g>

          {/* Labels */}
          <text x="30" y="115" className="fill-muted-foreground text-[8px] font-medium">
            Solo Estudio
          </text>
          <text x="155" y="115" className="fill-muted-foreground text-[8px] font-medium" textAnchor="end">
            Solo Trabajo
          </text>
        </svg>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-600">
            <span className="text-base">✓</span>
            COMPATIBLE CON EMPLEO PART-TIME (4-6hs)
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Las carreras elegidas tienen baja presencialidad. Tu capacidad de organización te permite gestionar ambos
            mundos manteniendo disciplina.
          </p>
        </div>
      </div>
    </div>
  )
}
