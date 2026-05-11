"use client"

export function EmployabilityBridges() {
  const paths = [
    {
      role: "Data Entry / Back Office",
      percentage: 40,
      color: "bg-blue-500",
      description: "Cargar datos, sin hablar",
    },
    {
      role: "Soporte Técnico Nivel 1",
      percentage: 30,
      color: "bg-teal-500",
      description: "Responder mails de ayuda, remoto",
    },
    {
      role: "Tester QA Manual",
      percentage: 20,
      color: "bg-purple-500",
      description: "Changas de testing en plataformas",
    },
    {
      role: "Ayudante de Archivo",
      percentage: 10,
      color: "bg-amber-500",
      description: "Puestos en instituciones",
    },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">Puentes de Empleabilidad</h3>
        <p className="mt-2 text-sm text-muted-foreground">¿De qué trabajan los estudiantes como vos MIENTRAS cursan?</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
            <span className="text-sm font-medium text-muted-foreground">
              Estudiante
              <br />
              1er/2do Año
            </span>
          </div>

          <div className="flex-1 space-y-3">
            {paths.map((path) => (
              <div key={path.role} className="group relative">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${path.color} transition-all duration-300 group-hover:opacity-90`}
                      style={{ width: `${path.percentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className="text-xs font-semibold text-foreground">{path.role}</span>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-foreground">{path.percentage}%</span>
                </div>
                <p className="ml-4 mt-1 text-xs text-muted-foreground">{path.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
