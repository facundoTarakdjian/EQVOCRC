import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const heatmapData = {
  high: [
    "QA Testing / Control de Calidad",
    "Análisis de Datos (Junior)",
    "Gestión Documental / Archivo",
    "Administración de Bases de Datos",
  ],
  medium: [
    "Administración de Personal (RRHH Hard)",
    "Back Office Bancario",
    "Soporte Técnico Nivel 1",
    "Bibliotecología",
  ],
  low: ["Ventas y Comercialización", "Relaciones Públicas", "Docencia de Grupos Grandes", "Emprendedurismo de Riesgo"],
}

export function CompatibilityHeatmap() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-medium">Mapa de Compatibilidad Profesional</CardTitle>
        <CardDescription className="text-base">
          Áreas vocacionales según nivel de afinidad con el perfil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <h3 className="text-lg font-medium text-foreground">Zona Maestra</h3>
            </div>
            <p className="text-sm text-muted-foreground">Alta compatibilidad - Áreas ideales</p>
            <div className="space-y-3">
              {heatmapData.high.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground transition-all hover:border-primary/40 hover:bg-primary/10"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-accent" />
              <h3 className="text-lg font-medium text-foreground">Zona de Confort</h3>
            </div>
            <p className="text-sm text-muted-foreground">Media compatibilidad - Áreas viables</p>
            <div className="space-y-3">
              {heatmapData.medium.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm leading-relaxed text-foreground transition-all hover:border-accent/40 hover:bg-accent/10"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              <h3 className="text-lg font-medium text-foreground">Zona Fría</h3>
            </div>
            <p className="text-sm text-muted-foreground">Baja compatibilidad - Evitar</p>
            <div className="space-y-3">
              {heatmapData.low.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
