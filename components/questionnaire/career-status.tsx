"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CareerStatusProps {
  onSelect: (status: "first" | "change") => void
}

export function CareerStatus({ onSelect }: CareerStatusProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-6 py-8">
      <Card className="w-full max-w-2xl p-8 sm:p-10">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">¿Es tu primera carrera?</h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelect("first")}
              className="h-auto py-6 px-6 text-left justify-start items-start flex-col gap-1"
            >
              <span className="text-lg font-semibold">Primera carrera</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelect("change")}
              className="h-auto py-6 px-6 text-left justify-start items-start flex-col gap-1"
            >
              <span className="text-lg font-semibold">Me quiero cambiar</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
