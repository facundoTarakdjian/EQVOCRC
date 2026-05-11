import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const dials = [
  {
    title: "Dinámica Social",
    left: "Individual",
    right: "Grupal",
    position: 10,
    note: 'Requiere "burbujas de concentración". Funciona mejor solo o en duplas técnicas.',
  },
  {
    title: "Estructura del Entorno",
    left: "Flexible",
    right: "Estructurado",
    position: 95,
    note: "Necesita procesos definidos y reglas claras. La improvisación bloquea su rendimiento.",
  },
  {
    title: "Enfoque de Contenido",
    left: "Teórico",
    right: "Práctico",
    position: 70,
    note: "Prefiere ver resultados concretos antes que teorías abstractas sin aplicación.",
  },
]

export function StyleDials() {
  return (
    <Card className="border-border/50 shadow-sm lg:col-span-2">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-medium">Estilo de Aprendizaje y Trabajo</CardTitle>
        <CardDescription className="text-base">Configuración del entorno ideal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-3">
          {dials.map((dial, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-center font-medium text-card-foreground">{dial.title}</h3>

              <div className="relative px-2">
                <div className="h-1.5 rounded-full bg-muted" />
                <div
                  className="absolute top-0 h-1.5 rounded-full bg-primary transition-all"
                  style={{ width: `${dial.position}%` }}
                />
                <div
                  className="absolute -top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-card shadow-md transition-all"
                  style={{ left: `calc(${dial.position}% - 8px)` }}
                />
              </div>

              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                <span>{dial.left}</span>
                <span>{dial.right}</span>
              </div>

              <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">{dial.note}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
