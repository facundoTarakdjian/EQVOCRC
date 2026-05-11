"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts"

const data = [
  { subject: "Convencional (C)", value: 10, fullMark: 10 },
  { subject: "Investigativo (I)", value: 9, fullMark: 10 },
  { subject: "Realista (R)", value: 6, fullMark: 10 },
  { subject: "Social (S)", value: 4, fullMark: 10 },
  { subject: "Artístico (A)", value: 2, fullMark: 10 },
  { subject: "Emprendedor (E)", value: 1, fullMark: 10 },
]

export function RadarChart() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-medium">Modelo Holland / RIASEC</CardTitle>
        <CardDescription className="text-base">
          Perfil de intereses vocacionales según el modelo hexagonal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsRadar data={data}>
            <PolarGrid stroke="hsl(var(--border))" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 13, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 12 }} />
            <Radar
              name="Tu perfil"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                padding: "12px",
              }}
            />
          </RechartsRadar>
        </ResponsiveContainer>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Pico máximo en Convencional (10/10) e Investigativo (9/10)
        </p>
      </CardContent>
    </Card>
  )
}
