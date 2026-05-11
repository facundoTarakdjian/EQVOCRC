"use client"

export function SkillGapRadar() {
  const skills = [
    { name: "Lógica", current: 95, required: 80 },
    { name: "Orden", current: 95, required: 85 },
    { name: "Inglés", current: 60, required: 75 },
    { name: "Comunicación", current: 70, required: 70 },
  ]

  const angleStep = (2 * Math.PI) / skills.length
  const radius = 80

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2
    const r = (value / 100) * radius
    return {
      x: 100 + r * Math.cos(angle),
      y: 100 + r * Math.sin(angle),
    }
  }

  const currentPath =
    skills
      .map((skill, i) => {
        const point = getPoint(skill.current, i)
        return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`
      })
      .join(" ") + " Z"

  const requiredPath =
    skills
      .map((skill, i) => {
        const point = getPoint(skill.required, i)
        return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`
      })
      .join(" ") + " Z"

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8">
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-sm text-zinc-600">Tu nivel actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full border-2 border-dashed border-red-500 bg-transparent" />
          <span className="text-sm text-zinc-600">Nivel requerido</span>
        </div>
      </div>

      <svg viewBox="0 0 200 200" className="mx-auto h-80 w-80">
        {/* Grid circles */}
        {[20, 40, 60, 80].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgb(229, 231, 235)" strokeWidth="1" />
        ))}

        {/* Grid lines */}
        {skills.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          const x = 100 + 80 * Math.cos(angle)
          const y = 100 + 80 * Math.sin(angle)
          return <line key={i} x1="100" y1="100" x2={x} y2={y} stroke="rgb(229, 231, 235)" strokeWidth="1" />
        })}

        {/* Required path (dashed) */}
        <path
          d={requiredPath}
          fill="rgb(239, 68, 68)"
          fillOpacity="0.1"
          stroke="rgb(239, 68, 68)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Current path (solid) */}
        <path d={currentPath} fill="rgb(59, 130, 246)" fillOpacity="0.2" stroke="rgb(59, 130, 246)" strokeWidth="2" />

        {/* Labels */}
        {skills.map((skill, i) => {
          const angle = i * angleStep - Math.PI / 2
          const x = 100 + 95 * Math.cos(angle)
          const y = 100 + 95 * Math.sin(angle)
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              className="fill-zinc-700 text-xs font-medium"
            >
              {skill.name}
            </text>
          )
        })}
      </svg>

      {/* Gap indicator */}
      <div className="mt-6 rounded-lg bg-red-50 p-4">
        <p className="text-center text-sm font-medium text-red-600">
          GAP DETECTADO: Necesitás mejorar tu nivel de Inglés
        </p>
      </div>
    </div>
  )
}
