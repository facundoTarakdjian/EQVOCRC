"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const interests = [
  { name: "Estabilidad y Seguridad", level: 5, description: "Motor Principal" },
  { name: "Sistemas y Tecnología", level: 4, description: "Interés Técnico" },
  { name: "Justicia y Ética", level: 4, description: "Valor Central" },
  { name: "Trabajo de Oficina/Gabinete", level: 5, description: "Preferencia de Entorno" },
  { name: "Competencia / Liderazgo", level: 1, description: "Drenaje de Energía" },
]

export function InterestsChart() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-medium">Intereses y Motivaciones</CardTitle>
        <CardDescription className="text-base">Nivel de energía por área de interés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {interests.map((interest, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium text-card-foreground">{interest.name}</span>
                <span className="text-xs font-medium text-muted-foreground">{interest.description}</span>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 flex-1 rounded-full transition-all ${
                      i < interest.level ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
