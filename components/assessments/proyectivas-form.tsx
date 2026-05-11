"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { LoadingModal } from "@/components/ui/loading-modal"
import { proyectivasQuestions } from "@/lib/questionnaires/proyectivas-questions"
import { createFormHelpers } from "@/lib/form-helpers"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import type { ProyectivasResponse } from "@/lib/types"

export function ProyectivasForm() {
  const [responses, setResponses] = useState<ProyectivasResponse>({})
  const [currentPage, setCurrentPage] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const questionsPerPage = 5
  const totalPages = Math.ceil(proyectivasQuestions.length / questionsPerPage)
  const startIndex = currentPage * questionsPerPage
  const endIndex = Math.min(startIndex + questionsPerPage, proyectivasQuestions.length)
  const currentQuestions = proyectivasQuestions.slice(startIndex, endIndex)

  const answeredCount = Object.keys(responses).filter((key) => responses[key].trim() !== "").length
  const progress = (answeredCount / proyectivasQuestions.length) * 100

  const handleResponse = (index: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [startIndex + index]: value,
    }))
  }

  const handleSave = async () => {
    const formHelpers = createFormHelpers()

    setIsSaving(true)
    console.log("Saving Proyectivas responses:", responses)

    try {
      await formHelpers.saveFormData(SECTION_IDS.PROYECTIVA, responses, {
        totalQuestions: proyectivasQuestions.length,
        section: "proyectivas"
      }, proyectivasQuestions)

      // Mark as completed and redirect
      setAssessmentCompleted("proyectivas")
    } catch (error) {
      // Error handling is done in formHelpers
    } finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  const isFormComplete = () => {
    const answeredQuestions = Object.keys(responses).filter((key) => responses[key].trim() !== "")
    return answeredQuestions.length === proyectivasQuestions.length
  }

  return (
    <>
      <LoadingModal open={isSaving} />

      <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <Card className="border-none bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Técnicas Proyectivas</h2>
            <p className="mt-1 text-sm text-muted-foreground">Frases Incompletas - TCF de Casullo</p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              Complete las siguientes frases con lo primero que se le ocurra. Trate de expresar sus verdaderos
              sentimientos.
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium text-primary">
                {answeredCount} / {proyectivasQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {currentQuestions.map((question, index) => {
          const globalIndex = startIndex + index
          const response = responses[globalIndex] || ""

          return (
            <Card key={globalIndex} className="border-none bg-card p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {globalIndex + 1}
                  </span>
                  <p className="flex-1 pt-1 text-base leading-relaxed">{question}</p>
                </div>

                <div className="pl-11">
                  <Textarea
                    value={response}
                    onChange={(e) => handleResponse(index, e.target.value)}
                    placeholder="Escriba su respuesta aquí..."
                    className="min-h-[60px] resize-y"
                  />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Navigation */}
      <Card className="border-none bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" disabled={currentPage === 0} onClick={() => setCurrentPage((p) => p - 1)}>
            ← Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage + 1} de {totalPages}
          </span>
          {currentPage === totalPages - 1 ? (
            <Button
              onClick={handleSave}
              disabled={!isFormComplete() || isSaving}
              className="min-w-[100px]"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </Button>
          ) : (
            <Button
              variant="ghost"
            disabled={currentPage === totalPages - 1}  onClick={() => setCurrentPage((p) => p + 1)}
            >
              Siguiente →
            </Button>
          )}
        </div>
      </Card>
    </div>
    </>
  )
}
