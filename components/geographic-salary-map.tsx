"use client"

export function GeographicSalaryMap() {
  const zones = [
    {
      name: "CABA / GBA Norte",
      color: "bg-red-500",
      salary: "Altos",
      cost: "Muy Alto",
      savings: "Medio",
      description: "Alquileres caros reducen el margen de ahorro",
    },
    {
      name: "Interior BsAs / Córdoba / Santa Fe",
      color: "bg-green-500",
      salary: "Medios/Altos",
      cost: "Medio",
      savings: "Alto",
      description: "Sweet Spot: Sueldo de Capital, costo de Interior",
      highlight: true,
    },
    {
      name: "Remoto Global",
      color: "bg-blue-500",
      salary: "USD/EUR",
      cost: "Local (ARS)",
      savings: "Muy Alto",
      description: "Escenario ideal en 5 años",
    },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">Calor Geográfico Salarial</h3>
        <p className="mt-2 text-sm text-muted-foreground">¿Dónde rinde más tu sueldo?</p>
      </div>

      <div className="space-y-4">
        {zones.map((zone, index) => (
          <div
            key={index}
            className={`rounded-xl border-2 p-6 transition-all ${
              zone.highlight ? "border-green-500 bg-green-500/5" : "border-border bg-muted/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`h-12 w-12 shrink-0 rounded-lg ${zone.color} flex items-center justify-center text-white font-bold`}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">{zone.name}</h4>
                  {zone.highlight && (
                    <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                      Recomendado
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Salarios</div>
                    <div className="mt-1 font-mono text-sm font-semibold text-foreground">{zone.salary}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Costo Vida</div>
                    <div className="mt-1 font-mono text-sm font-semibold text-foreground">{zone.cost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Ahorro</div>
                    <div className="mt-1 font-mono text-sm font-semibold text-foreground">{zone.savings}</div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">{zone.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
        💡 Tu perfil permite vivir en una ciudad tranquila (Tandil, Mar del Plata) con sueldo de Capital trabajando
        remoto.
      </div>
    </div>
  )
}
