"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingModal } from "@/components/ui/loading-modal"
import {
  gardnerQuestions,
  gardnerKeys,
  gardnerLabels,
  gardnerShortLabels,
  type GardnerKey,
} from "@/lib/questionnaires/gardner-questions"
import { createFormHelpers } from "@/lib/form-helpers"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts"

// Scale: 0–10
const SCALE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const THRESHOLD = 70 // fortaleza si total >= 70 (de 100)
const RESULTS_INDEX = gardnerKeys.length // index 8 = pantalla de resultados

type GardnerResponses = Record<GardnerKey, Record<number, number>>

function initialResponses(): GardnerResponses {
  return Object.fromEntries(gardnerKeys.map((k) => [k, {}])) as GardnerResponses
}

function totalFor(responses: GardnerResponses, key: GardnerKey): number {
  return Object.values(responses[key]).reduce((sum, v) => sum + v, 0)
}

function ChartTooltip({ active, payload }: any) {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className="rounded-lg border bg-card px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold">{d.name}</p>
        <p className="text-muted-foreground">
          Total: <span className="font-bold text-primary">{d.score} / 100</span>
        </p>
      </div>
    )
  }
  return null
}

export function GardnerForm() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [responses, setResponses] = useState<GardnerResponses>(initialResponses)

  const isResults = currentIndex === RESULTS_INDEX
  const currentKey = isResults ? null : gardnerKeys[currentIndex]
  const totalSections = gardnerKeys.length
  const progress = isResults ? 100 : ((currentIndex + 1) / totalSections) * 100

  const handleRate = (itemIndex: number, value: number) => {
    if (!currentKey) return
    setResponses((prev) => ({
      ...prev,
      [currentKey]: { ...prev[currentKey], [itemIndex]: value },
    }))
  }

  const currentAnswered = currentKey ? Object.keys(responses[currentKey]).length : 0
  const currentTotal = currentKey ? gardnerQuestions[currentKey].length : 0
  const currentComplete = currentAnswered === currentTotal

  const isFormComplete = gardnerKeys.every(
    (k) => Object.keys(responses[k]).length === gardnerQuestions[k].length
  )

  const handleSave = async () => {
    const formHelpers = createFormHelpers()
    setIsSaving(true)
    try {
      const formatted = gardnerKeys.map((key, i) => {
        const detail: Record<string, number> = {}
        gardnerQuestions[key].forEach((q, idx) => {
          const val = responses[key][idx]
          if (val !== undefined) detail[q] = val
        })
        return {
          questionNumber: i + 1,
          question: gardnerLabels[key],
          responseText: JSON.stringify({ total: totalFor(responses, key), items: detail }),
        }
      })
      await formHelpers.saveFormData(SECTION_IDS.GARDNER, formatted, { section: "gardner" })
      setAssessmentCompleted("gardner")
    } catch { /* handled */ }
    finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  // Chart data
  const chartData = gardnerKeys.map((key) => ({
    key,
    name: gardnerLabels[key],
    short: gardnerShortLabels[key],
    score: totalFor(responses, key),
  }))
  const highlighted = chartData.filter((d) => d.score >= THRESHOLD)

  return (
    <>
      <LoadingModal open={isSaving} />
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Inteligencias Múltiples (GARDNER)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              8 tipos de inteligencia · 10 preguntas por tipo · Escala 0–10
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium">Consigna:</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Puntuá cada ítem del <strong>0</strong> (ninguna eficacia o aptitud desarrollada) al <strong>10</strong> (eficacia o aptitud sobresaliente).
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-primary">
                {isResults ? "Resultados" : `Inteligencia ${currentIndex + 1} de ${totalSections}`}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </Card>

        {/* Questions */}
        {!isResults && currentKey && (
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                {String.fromCharCode(65 + currentIndex) /* A, B, C… */}
              </span>
              <div>
                <h3 className="text-xl font-bold text-primary">{gardnerLabels[currentKey]}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentAnswered} de {currentTotal} respondidas
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {gardnerQuestions[currentKey].map((question, idx) => {
                const selected = responses[currentKey][idx]
                const answered = selected !== undefined

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 transition-all ${
                      answered ? "border-primary/30 bg-primary/5" : "border-border"
                    }`}
                  >
                    <p className="mb-3 text-sm font-medium leading-relaxed">
                      <span className="mr-2 text-xs font-bold text-muted-foreground">{idx + 1}.</span>
                      {question}
                    </p>

                    {/* 11 buttons 0-10 — compact on mobile */}
                    <div className="flex gap-1">
                      {SCALE.map((val) => {
                        const isSelected = selected === val
                        return (
                          <button
                            key={val}
                            onClick={() => handleRate(idx, val)}
                            className={`flex-1 min-w-0 rounded-lg border-2 py-2 text-center text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            {val}
                          </button>
                        )
                      })}
                    </div>

                    {/* Scale legend — only shown once at top */}
                    {idx === 0 && (
                      <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground px-0.5">
                        <span>0 = Ninguna aptitud</span>
                        <span>10 = Sobresaliente</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* Results */}
        {isResults && (
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary">Tus inteligencias múltiples</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Puntaje total por inteligencia (máx. 100). En color destacado: inteligencias con 70 o más.
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickCount={6} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="short" width={80} tick={{ fontSize: 11 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={24}>
                    {chartData.map((d, i) => (
                      <Cell key={i} fill={d.score >= THRESHOLD ? "#6366f1" : "#cbd5e1"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {highlighted.length > 0 ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-semibold text-primary">
                  Tus inteligencias más desarrolladas:
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {highlighted.map((d) => `${d.name} (${d.score})`).join(" · ")}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border bg-muted/40 p-4">
                <p className="text-sm text-muted-foreground">
                  Ninguna inteligencia superó el umbral de 70. Recordá que todas las inteligencias son valiosas.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#6366f1]" /> Fortaleza (≥ 70)</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#cbd5e1]" /> En desarrollo (&lt; 70)</span>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              Anterior
            </Button>

            <span className="text-xs text-muted-foreground text-center">
              {isResults
                ? "¡Completaste todas las inteligencias!"
                : currentKey ? gardnerLabels[currentKey] : ""}
            </span>

            {isResults ? (
              <Button
                onClick={handleSave}
                disabled={!isFormComplete || isSaving}
                className="min-w-[120px]"
              >
                {isSaving ? "Guardando..." : "Guardar y salir"}
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={!currentComplete}
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                {currentIndex === totalSections - 1 ? "Ver resultados →" : "Siguiente"}
              </Button>
            )}
          </div>

          {!isResults && !currentComplete && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Respondé todos los ítems para continuar ({currentAnswered}/{currentTotal})
            </p>
          )}
        </Card>
      </div>
    </>
  )
}
