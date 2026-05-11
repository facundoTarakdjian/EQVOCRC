"use client"

export function NetworkingMap() {
  const nodes = [
    {
      name: "LinkedIn",
      subtitle: "Perfil Optimizado",
      tip: "No necesitás postear opiniones. Solo compartí tus certificados y comentá: 'Gracias por el recurso' en posts técnicos.",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Discord",
      subtitle: "Comunidades Tech",
      tip: "Unite a servidores como 'FrontendCafe' o 'SysArmy'. Podés leer y aprender en silencio (lurking) hasta que te animes a preguntar.",
      color: "from-indigo-600 to-indigo-700",
    },
    {
      name: "GitHub",
      subtitle: "Tu Portafolio",
      tip: "Tu código habla por vos. Subí tus prácticas de SQL aquí. Es tu mejor carta de presentación silenciosa.",
      color: "from-zinc-700 to-zinc-800",
    },
  ]

  return (
    <div className="relative">
      {/* Center Node */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-900">
              <span className="text-lg font-bold text-white">Lucas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connecting Nodes */}
      <div className="grid gap-6 sm:grid-cols-3">
        {nodes.map((node, index) => (
          <div key={index} className="group relative">
            {/* Connection Line */}
            <div className="absolute bottom-full left-1/2 h-8 w-0.5 -translate-x-1/2 bg-gradient-to-t from-green-500 to-transparent" />

            <div className={`rounded-2xl bg-gradient-to-br p-6 transition-transform hover:scale-105 ${node.color}`}>
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white">{node.name}</h3>
                <p className="text-sm text-white/70">{node.subtitle}</p>
              </div>
              <div className="mt-4 rounded-lg bg-black/20 p-3">
                <p className="text-xs leading-relaxed text-white/90">{node.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
