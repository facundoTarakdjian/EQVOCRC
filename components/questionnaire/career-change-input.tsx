"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"

interface CareerChangeInputProps {
  onSubmit: (previousCareer: string, changeReason: string) => void
}

export function CareerChangeInput({ onSubmit }: CareerChangeInputProps) {
  const [previousCareer, setPreviousCareer] = useState("")
  const [changeReason, setChangeReason] = useState("")

  const handleSubmit = () => {
    if (previousCareer.trim() && changeReason.trim()) {
      onSubmit(previousCareer.trim(), changeReason.trim())
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-6 py-8">
      <Card className="w-full max-w-2xl p-8 sm:p-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground text-balance">
              ¿Qué estudiaste y por qué querés cambiar?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Carrera anterior</label>
              <Textarea
                placeholder="Ej: Ingeniería Industrial"
                value={previousCareer}
                onChange={(e) => setPreviousCareer(e.target.value)}
                className="min-h-[60px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Motivo del cambio</label>
              <Textarea
                placeholder="Ej: No me gustaba la parte técnica, prefiero algo más creativo"
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!previousCareer.trim() || !changeReason.trim()}
            className="w-full gap-2"
          >
            Continuar
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
