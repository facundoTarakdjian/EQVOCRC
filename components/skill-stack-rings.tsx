"use client"

export function SkillStackRings() {
  const skills = [
    { name: "SQL", description: "Lenguaje de Bases de Datos", relevance: 100, ring: 1 },
    { name: "Excel / Power BI", description: "Análisis de Datos", relevance: 90, ring: 2 },
    { name: "Python", description: "Básico", relevance: 70, ring: 3 },
    { name: "Jira / Trello", description: "Gestión de Proyectos", relevance: 60, ring: 4 },
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <radialGradient id="ringGradient">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Rings */}
        {[1, 2, 3, 4].map((ring) => {
          const radius = 180 - (ring - 1) * 40
          return (
            <circle
              key={ring}
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke="rgb(39, 39, 42)"
              strokeWidth="2"
              className="opacity-50"
            />
          )
        })}

        {/* Skill markers */}
        {skills.map((skill, index) => {
          const angle = (index * Math.PI * 2) / skills.length - Math.PI / 2
          const radius = 180 - (skill.ring - 1) * 40
          const x = 200 + radius * Math.cos(angle)
          const y = 200 + radius * Math.sin(angle)

          return (
            <g key={index}>
              <circle cx={x} cy={y} r="8" fill="rgb(34, 197, 94)" className="animate-pulse" />
              <circle cx={x} cy={y} r="12" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="2" opacity="0.3" />
            </g>
          )
        })}

        {/* Center */}
        <circle cx="200" cy="200" r="20" fill="rgb(34, 197, 94)" opacity="0.8" />
        <text x="200" y="206" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          Core
        </text>
      </svg>

      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid gap-2">
          {skills.map((skill, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-semibold text-white">{skill.name}</div>
              <div className="text-xs text-zinc-400">{skill.relevance}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
