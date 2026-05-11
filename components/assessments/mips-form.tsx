"use client"

import { createFormHelpers } from "@/lib/form-helpers"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingModal } from "@/components/ui/loading-modal"
import { mipsQuestions } from "@/lib/questionnaires/mips-questions"
import type { MIPSResponse } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"

export function MIPSForm() {
  const [responses, setResponses] = useState<MIPSResponse>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const totalQuestions: number = mipsQuestions.length
  const answeredCount = Object.keys(responses).length
  const progress = (answeredCount / totalQuestions) * 100

  const handleResponse = (value: boolean) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }))

    if (currentQuestion < totalQuestions - 1) {
      // setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
      // }, 200)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1 && responses[currentQuestion] !== undefined) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handleFinish = async () => {
    const formHelpers = createFormHelpers()

    setIsSaving(true)
    console.log("Saving MIPS responses:", responses)

    try {
      await formHelpers.saveFormData(SECTION_IDS.MILLON, responses, {
        totalQuestions: mipsQuestions.length,
        section: "mips"
      }, mipsQuestions)


      // Mark as completed and redirect
      setAssessmentCompleted("mips")
    } catch (error) {
      // Error handling is done in formHelpers
    } finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  const isLastQuestion = currentQuestion === totalQuestions - 1

  return (
    <>
      <LoadingModal open={isSaving} />

      <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <Card className="border-none bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Personalidad y Estilos</h2>
            <p className="mt-1 text-sm text-muted-foreground">MIPS - Inventario de Millon</p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">Lea cada frase y decida si describe o no su forma de ser.</p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium text-primary">
                {answeredCount} / {totalQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Question Card */}
      <Card className="border-none bg-card p-8 shadow-sm">
        <div className="space-y-8">
          {/* Question number and text */}
          <div className="min-h-[120px] space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {currentQuestion + 1}
              </span>
              <span className="text-xs text-muted-foreground">de {totalQuestions}</span>
            </div>

            <p className="text-lg leading-relaxed text-foreground">{mipsQuestions[currentQuestion]}</p>
          </div>

          {/* Fixed True/False buttons */}
          <div className="flex gap-4">
            <Button
              size="lg"
              variant={responses[currentQuestion] === true ? "default" : "outline"}
              className="flex-1 text-base"
              onClick={() => handleResponse(true)}
            >
              {responses[currentQuestion] === true && <CheckCircle2 className="mr-2 h-5 w-5" />}
              Verdadero
            </Button>
            <Button
              size="lg"
              variant={responses[currentQuestion] === false ? "default" : "outline"}
              className="flex-1 text-base"
              onClick={() => handleResponse(false)}
            >
              {responses[currentQuestion] === false && <CheckCircle2 className="mr-2 h-5 w-5" />}
              Falso
            </Button>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <Card className="border-none bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" disabled={currentQuestion === 0} onClick={handlePrevious}>
            ← Anterior
          </Button>

          <span className="text-sm text-muted-foreground">
            Pregunta {currentQuestion + 1} de {totalQuestions}
          </span>

          {isLastQuestion ? (
            <Button variant="default" onClick={handleFinish}>
              Finalizar
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleNext} disabled={responses[currentQuestion] === undefined}>
              Siguiente →
            </Button>
          )}
        </div>
      </Card>
    </div>
    </>
  )
}
