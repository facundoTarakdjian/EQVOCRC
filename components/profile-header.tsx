import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProfileHeader() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-5xl font-medium tracking-tight text-foreground sm:text-6xl">Tu Perfil</h1>
          <p className="text-lg text-muted-foreground">Análisis de Orientación Vocacional</p>
        </div>
        <Badge variant="outline" className="h-fit border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
          Perfil Convencional-Investigativo
        </Badge>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardContent className="space-y-6 p-8">
          <h2 className="text-3xl font-medium text-foreground">El Estratega Silencioso</h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Presentas un perfil <strong className="text-foreground">Convencional-Investigativo</strong>{" "}
              altamente definido, caracterizado por una búsqueda incesante de precisión, estructura y lógica. Lejos de
              la desorientación inicial, su perfil revela a un{" "}
              <strong className="text-foreground">analista metódico natural</strong>: posee la rara habilidad de
              encontrar orden en el caos y detectar detalles que escapan a la observación promedio.
            </p>
            <p>
              Tu identidad vocacional no se construye sobre la exposicion o el liderazgo carismatico, sino sobre la{" "}
              <strong className="text-foreground">fiabilidad tecnica</strong>. Brillas en entornos donde las reglas
              son claras y el éxito depende de la calidad del resultado, no de la gestión política. Es un "arquitecto de
              procesos" en potencia, impulsado por una motivación central: la seguridad a través del control y el
              conocimiento experto.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
