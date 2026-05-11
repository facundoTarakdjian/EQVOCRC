"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CareerCount } from "@/types/questionnaire"

interface InitialQuestionProps {
  onSelect: (count: CareerCount) => void
}

export function InitialQuestion({ onSelect }: InitialQuestionProps) {
  const options: { value: CareerCount; label: string; description: string }[] = [
    {
      value: "1",
      label: "1 Carrera",
      description: "Una opción específica",
    },
    {
      value: "2-3",
      label: "2 o 3 Carreras",
      description: "Algunas opciones concretas",
    },
    {
      value: "many",
      label: "Muchas Carreras",
      description: "Varias áreas de interés",
    },
    {
      value: "0",
      label: "Ninguna",
      description: "Sin opciones claras",
    },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-4">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">
              ¿Cuántas carreras tenés en mente?
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="h-auto flex-col items-start gap-1 p-4 text-left transition-all hover:scale-[1.02] hover:border-primary hover:bg-primary/5 bg-transparent"
                onClick={() => onSelect(option.value)}
              >
                <span className="text-lg font-bold text-foreground">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
