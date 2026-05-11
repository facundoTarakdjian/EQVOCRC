"use client"

import { Card } from "@/components/ui/card"

const routes = [
  {
    country: "🇬🇧",
    destination: "Cambridge/Londres, UK",
    subtitle: "El nexo de la Tradición y el Orden",
    color: "rgb(59, 130, 246)", // Blue
    security: "Muy Alto",
    environment: "Estructurado",
  },
  {
    country: "🇨🇦",
    destination: "Victoria/Vancouver, Canadá",
    subtitle: "El nexo de la Seguridad y la Naturaleza",
    color: "rgb(6, 182, 212)", // Cyan
    security: "Muy Alto",
    environment: "Estructurado",
  },
  {
    country: "🇪🇸",
    destination: "Barcelona, España",
    subtitle: "El nexo Tecnológico en tu idioma",
    color: "rgb(251, 191, 36)", // Gold
    security: "Alto",
    environment: "Dinámico",
  },
]

export function ExpansionRoutesMap() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-foreground">Rutas de Expansión</h3>
        <p className="mt-2 text-muted-foreground">Conectando tu perfil con los hubs de orden y tecnología</p>
      </div>

      {/* Map Container */}
      <div className="relative mb-8 h-[300px] rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        {/* Origin Point */}
        <div className="absolute bottom-16 left-1/4 flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-blue-600 shadow-lg shadow-blue-500/50" />
          <span className="text-sm font-medium text-foreground">Buenos Aires</span>
        </div>

        {/* Route Arcs Visual Representation */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300">
          {/* Arc to UK */}
          <path
            d="M 150 240 Q 300 50, 500 100"
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
          {/* Arc to Canada */}
          <path
            d="M 150 240 Q 200 80, 400 120"
            fill="none"
            stroke="rgb(6, 182, 212)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
          {/* Arc to Spain */}
          <path
            d="M 150 240 Q 250 120, 450 150"
            fill="none"
            stroke="rgb(251, 191, 36)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        </svg>

        {/* Destination Points */}
        <div className="absolute right-16 top-16">
          <div className="h-2 w-2 rounded-full bg-blue-600" />
        </div>
        <div className="absolute right-32 top-24">
          <div className="h-2 w-2 rounded-full bg-cyan-600" />
        </div>
        <div className="absolute right-24 top-32">
          <div className="h-2 w-2 rounded-full bg-yellow-600" />
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route, index) => (
          <div
            key={index}
            className="group relative rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-border hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{route.country}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: route.color }} />
                  <h4 className="font-semibold text-foreground">{route.destination}</h4>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{route.subtitle}</p>

                {/* Tooltip on hover */}
                <div className="mt-2 hidden text-xs text-muted-foreground group-hover:block">
                  Nivel de Seguridad: {route.security} | Entorno Académico: {route.environment}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
