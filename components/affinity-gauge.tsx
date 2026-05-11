"use client"

export function AffinityGauge() {
  const careers = [
    { name: "Tester QA", score: 98, color: "rgb(16, 185, 129)", label: "Match Perfecto" },
    { name: "Analista de Datos", score: 94, color: "rgb(132, 204, 22)", label: "Match Muy Alto" },
    { name: "Gestión Documental", score: 90, color: "rgb(234, 179, 8)", label: "Match Alto" },
  ]

  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {careers.map((career, index) => (
        <div key={index} className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">{career.name}</h3>
            <p className="text-sm text-zinc-600">{career.label}</p>
          </div>

          {/* Gauge */}
          <div className="relative mx-auto aspect-square w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(229, 231, 235)" strokeWidth="8" />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={career.color}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - career.score / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: career.color }}>
                {career.score}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
