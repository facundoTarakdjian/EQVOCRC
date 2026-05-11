"use client"

export function ProductivityBento() {
  const apps = [
    {
      name: "Obsidian",
      tag: "Knowledge Base",
      description: "Tu segundo cerebro. Crea notas interconectadas para estudiar lógica y teoría sin distracciones.",
      size: "large",
      color: "from-zinc-700 to-zinc-800",
    },
    {
      name: "Jira",
      tag: "Project Management",
      description: "El estándar de la industria IT. Usalo para organizar tus TPs como si fueran tickets de trabajo.",
      size: "tall",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Forest",
      tag: "Focus / Pomodoro",
      description: "Gamifica tu concentración. Plantá árboles reales mientras estudiás sin tocar el celular.",
      size: "wide",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Notion",
      tag: "All-in-One",
      description: "Organizá calendarios, bases de datos de libros y finanzas personales.",
      size: "small",
      color: "from-zinc-600 to-zinc-700",
    },
  ]

  return (
    <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {apps.map((app) => (
        <div
          key={app.name}
          className={`
            group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 transition-all hover:scale-[1.02]
            ${app.size === "large" ? "sm:col-span-2 sm:row-span-2" : ""}
            ${app.size === "tall" ? "sm:row-span-2" : ""}
            ${app.size === "wide" ? "sm:col-span-2" : ""}
            ${app.color}
          `}
        >
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {app.tag}
              </span>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">{app.name}</h3>
            <p className="mt-auto text-sm leading-relaxed text-white/90">{app.description}</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      ))}
    </div>
  )
}
