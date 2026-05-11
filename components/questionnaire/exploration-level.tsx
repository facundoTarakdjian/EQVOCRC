"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ExplorationLevel = "specific" | "explore"

interface ExplorationLevelProps {
  onSelect: (level: ExplorationLevel) => void
}

export function ExplorationLevel({ onSelect }: ExplorationLevelProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-6 py-8">
      <Card className="w-full max-w-2xl p-8 sm:p-10">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">
              ¿Qué nivel de exploración necesitás?
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelect("specific")}
              className="h-auto py-6 px-6 text-left justify-start items-start flex-col gap-1"
            >
              <span className="text-lg font-semibold">Ya sé más o menos qué quiero</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelect("explore")}
              className="h-auto py-6 px-6 text-left justify-start items-start flex-col gap-1"
            >
              <span className="text-lg font-semibold">Quiero investigar todo</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
