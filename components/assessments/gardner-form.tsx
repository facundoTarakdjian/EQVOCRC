"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingModal } from "@/components/ui/loading-modal"
import { gardnerQuestions, gardnerLabels } from "@/lib/questionnaires/gardner-questions"
import { createFormHelpers } from "@/lib/form-helpers"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import type { GardnerResponse } from "@/lib/types"

type IntelligenceKey = keyof typeof gardnerQuestions

const intelligenceKeys: IntelligenceKey[] = [
  "logicoMatematica",
  "linguistica",
  "espacial",
  "corporalCinetica",
  "musical",
  "naturalista",
  "intrapersonal",
  "interpersonal",
]

const scaleLabels = {
  1: "Nunca",
  2: "Casi Nunca",
  3: "A Veces",
  4: "Casi Siempre",
  5: "Siempre",
}

export function GardnerForm() {
  const [currentIntelligence, setCurrentIntelligence] = useState<IntelligenceKey>("logicoMatematica")
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const [responses, setResponses] = useState<GardnerResponse>({
    logicoMatematica: {},
    linguistica: {},
    espacial: {},
    corporalCinetica: {},
    musical: {},
    naturalista: {},
    intrapersonal: {},
    interpersonal: {},
  })

  const currentIndex = intelligenceKeys.indexOf(currentIntelligence)
  const progress = ((currentIndex + 1) / intelligenceKeys.length) * 100
  const currentQuestions = gardnerQuestions[currentIntelligence]
  const currentResponses = responses[currentIntelligence]

  const handleResponse = (questionIndex: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [currentIntelligence]: {
        ...prev[currentIntelligence],
        [questionIndex]: value,
      },
    }))
  }

  const answeredCount = Object.keys(currentResponses).length

  const handleSave = async () => {
    const formHelpers = createFormHelpers()

    setIsSaving(true)
    console.log("Saving Gardner responses:", responses)

    try {
      // Format responses as JSON object for each intelligence type
      const formattedResponses: any[] = []
      let questionNumber = 1

      Object.entries(gardnerQuestions).forEach(([intelligenceType, intelligenceQuestions]) => {
        const intelligenceResponses = responses[intelligenceType as IntelligenceKey]
        
        // Create JSON object with question: scaleLabel mapping
        const responseJson: Record<string, string> = {}
        intelligenceQuestions.forEach((question: string, questionIndex: number) => {
          const answer = intelligenceResponses[questionIndex]
          if (answer !== undefined) {
            responseJson[question] = scaleLabels[answer as keyof typeof scaleLabels]
          }
        })

        // Only add if there are responses for this intelligence
        if (Object.keys(responseJson).length > 0) {
          formattedResponses.push({
            questionNumber,
            question: intelligenceType,
            responseText: JSON.stringify(responseJson)
          })
          questionNumber++
        }
      })

      await formHelpers.saveFormData(SECTION_IDS.GARDNER, formattedResponses, {
        totalIntelligences: intelligenceKeys.length,
        section: "gardner"
      })

      // Mark as completed and redirect
      setAssessmentCompleted("gardner")
    } catch (error) {
      // Error handling is done in formHelpers
    } finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  const isFormComplete = () => {
    return intelligenceKeys.every(intelligenceKey => {
      const intelligenceResponses = responses[intelligenceKey]
      const questions = gardnerQuestions[intelligenceKey]
      return Object.keys(intelligenceResponses).length === questions.length
    })
  }

  return (
    <>
      <LoadingModal open={isSaving} />

      <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">IV. Inteligencias Múltiples (GARDNER)</h2>
            <p className="mt-2 text-sm text-muted-foreground">Teoría de Howard Gardner.</p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium">Consigna:</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Puntúe cada ítem con la escala: 1-NUNCA / 2-CASI NUNCA / 3-A VECES / 4-CASI SIEMPRE / 5-SIEMPRE.
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-primary">
                Inteligencia {currentIndex + 1} de {intelligenceKeys.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Current Intelligence */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-primary">{gardnerLabels[currentIntelligence]}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Respondidas: {answeredCount} de {currentQuestions.length}
          </p>
        </div>

        <div className="space-y-6">
          {currentQuestions.map((question, index) => {
            const response = currentResponses[index]
            const letter = String.fromCharCode(97 + index) // a, b, c, etc.

            return (
              <div
                key={index}
                className={`space-y-3 rounded-lg border p-4 transition-all ${
                  response ? "border-primary/50 bg-primary/5" : ""
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">
                  <span className="text-primary">{letter})</span> {question}
                </p>

                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      variant={response === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleResponse(index, value)}
                      className="flex flex-col gap-1 h-auto py-2"
                    >
                      <span className="text-lg font-bold">{value}</span>
                      <span className="text-[10px] leading-tight">
                        {scaleLabels[value as keyof typeof scaleLabels]}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Navigation */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIntelligence(intelligenceKeys[currentIndex - 1])}
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">{gardnerLabels[currentIntelligence]}</span>
          {currentIndex === intelligenceKeys.length - 1 ? (
            <Button
              onClick={handleSave}
              disabled={!isFormComplete() || isSaving}
              className="min-w-[100px]"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </Button>
          ) : (
            <Button
              variant="outline"
            disabled={currentIndex === intelligenceKeys.length - 1}  onClick={() => setCurrentIntelligence(intelligenceKeys[currentIndex + 1])}
            >
              Siguiente
            </Button>
          )}
        </div>
      </Card>
    </div>
    </>
  )
}
