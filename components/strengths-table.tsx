import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Brain, FolderArchive, Shield, Ear, Flower2 } from "lucide-react"

const strengths = [
  { icon: Eye, name: "Detección de Errores", tag: "Analítica" },
  { icon: Brain, name: "Pensamiento Lógico-Secuencial", tag: "Cognitiva" },
  { icon: FolderArchive, name: "Clasificación y Orden", tag: "Ejecutiva" },
  { icon: Shield, name: "Prudencia y Gestión de Riesgos", tag: "Estratégica" },
  { icon: Ear, name: "Escucha Activa y Empática", tag: "Interpersonal" },
  { icon: Flower2, name: "Introspección y Autoconocimiento", tag: "Intrapersonal" },
]

export function StrengthsTable() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-medium">Fortalezas Clave</CardTitle>
        <CardDescription className="text-base">Matriz de habilidades cognitivas y blandas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:bg-secondary/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <strength.icon className="h-5 w-5 text-primary" strokeWidth={2} />
                </div>
                <span className="font-medium text-card-foreground">{strength.name}</span>
              </div>
              <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                {strength.tag}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
