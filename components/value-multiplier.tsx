import { Card } from "@/components/ui/card"

const indicators = [
  {
    name: "Salario Inicial Esperado",
    local: 100,
    global: 140,
    insight: "+40%",
  },
  {
    name: "Dominio de Inglés Técnico",
    local: 40,
    global: 95,
    insight: "Fluidez Profesional",
  },
  {
    name: "Autonomía Personal",
    local: 50,
    global: 100,
    insight: "Autogestión Total",
  },
]

export function ValueMultiplier() {
  return (
    <Card className="border-border/50 bg-card/50 p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-foreground">Multiplicador de Valor</h3>
        <p className="mt-2 text-muted-foreground">El ROI (Retorno de Inversión) de salir de tu zona de confort</p>
      </div>

      <div className="space-y-8">
        {indicators.map((indicator, index) => (
          <div key={index}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-medium text-foreground">{indicator.name}</h4>
              <span className="text-sm font-semibold text-blue-600">{indicator.insight}</span>
            </div>

            <div className="space-y-2">
              {/* Local Bar */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-xs text-muted-foreground">Local</span>
                <div className="h-8 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-full rounded-lg bg-gray-400 transition-all"
                    style={{ width: `${indicator.local}%` }}
                  />
                </div>
              </div>

              {/* Global Bar */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-xs font-medium text-blue-600">Global</span>
                <div className="h-8 flex-1 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div
                    className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                    style={{ width: `${indicator.global}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">Insight:</span> "Volver con inglés fluido no es un lujo, es la herramienta que
          te permite trabajar para USA desde tu casa en Argentina."
        </p>
      </div>
    </Card>
  )
}
