"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingModal } from "@/components/ui/loading-modal"
import {
  ipprQuestions,
  ipprFieldLabels,
  ipprFieldEmojis,
  ipprFieldKeys,
  type IPPRFieldKey,
} from "@/lib/questionnaires/ippr-questions"
import { createFormHelpers } from "@/lib/form-helpers"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import type { IPPRResponse } from "@/lib/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

// Scale: 0 = No conozco, 1 = Desagrado, 2 = Indiferencia, 3 = Agrado
const scaleOptions = [
  { value: 0, label: "No conozco", emoji: "🤷", color: "bg-slate-100 border-slate-300 text-slate-600", selectedColor: "bg-slate-200 border-slate-500 text-slate-800" },
  { value: 1, label: "Desagrado",  emoji: "😕", color: "bg-red-50 border-red-200 text-red-600",     selectedColor: "bg-red-100 border-red-500 text-red-800" },
  { value: 2, label: "Indiferencia", emoji: "😐", color: "bg-amber-50 border-amber-200 text-amber-600", selectedColor: "bg-amber-100 border-amber-500 text-amber-800" },
  { value: 3, label: "Agrado",    emoji: "😊", color: "bg-emerald-50 border-emerald-200 text-emerald-600", selectedColor: "bg-emerald-100 border-emerald-500 text-emerald-800" },
]

const RESULTS_PAGE_INDEX = ipprFieldKeys.length // index 12 = results screen

const chartColors = [
  "#6366f1", "#0ea5e9", "#10b981", "#f59e0b",
  "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6",
  "#f97316", "#84cc16", "#06b6d4", "#a78bfa",
]

function calculateFieldScore(responses: IPPRResponse, field: IPPRFieldKey): number {
  const fieldResponses = responses[field]
  return Object.values(fieldResponses).reduce((sum, v) => sum + v, 0)
}

function buildChartData(responses: IPPRResponse) {
  return ipprFieldKeys.map((key, i) => ({
    name: ipprFieldLabels[key],
    emoji: ipprFieldEmojis[key],
    score: calculateFieldScore(responses, key),
    fill: chartColors[i % chartColors.length],
  }))
}

// Custom tooltip for the bar chart
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="rounded-lg border bg-card px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold">{d.emoji} {d.name}</p>
        <p className="text-muted-foreground">Puntaje: <span className="font-bold text-primary">{d.score} / 36</span></p>
      </div>
    )
  }
  return null
}

export function IPPRForm() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  // responses[field][itemIndex] = 0|1|2|3
  const [responses, setResponses] = useState<IPPRResponse>(
    () => Object.fromEntries(ipprFieldKeys.map((k) => [k, {}])) as IPPRResponse
  )

  const isResultsPage = currentIndex === RESULTS_PAGE_INDEX
  const currentField = isResultsPage ? null : ipprFieldKeys[currentIndex]
  const totalSections = ipprFieldKeys.length
  const progress = isResultsPage ? 100 : ((currentIndex + 1) / totalSections) * 100

  const handleResponse = (itemIndex: number, value: number) => {
    if (!currentField) return
    setResponses((prev) => ({
      ...prev,
      [currentField]: {
        ...prev[currentField],
        [itemIndex]: value,
      },
    }))
  }

  const currentFieldAnsweredCount = currentField
    ? Object.keys(responses[currentField]).length
    : 0
  const currentFieldItemCount = currentField ? ipprQuestions[currentField].length : 0
  const currentFieldComplete = currentFieldAnsweredCount === currentFieldItemCount

  const isFormComplete = ipprFieldKeys.every(
    (k) => Object.keys(responses[k]).length === ipprQuestions[k].length
  )

  const handleSave = async () => {
    const formHelpers = createFormHelpers()
    setIsSaving(true)
    try {
      const formattedResponses = ipprFieldKeys.map((key, i) => {
        const fieldResponses = responses[key]
        const score = calculateFieldScore(responses, key)
        const detail: Record<string, string> = {}
        ipprQuestions[key].forEach((q, idx) => {
          const val = fieldResponses[idx]
          if (val !== undefined) {
            const opt = scaleOptions.find((o) => o.value === val)
            detail[q] = opt?.label ?? String(val)
          }
        })
        return {
          questionNumber: i + 1,
          question: ipprFieldLabels[key],
          responseText: JSON.stringify({ score, items: detail }),
        }
      })

      await formHelpers.saveFormData(SECTION_IDS.IPPR, formattedResponses, {
        totalFields: totalSections,
        section: "ippr",
      })

      setAssessmentCompleted("ippr")
    } catch {
      // handled in formHelpers
    } finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  const goNext = () => {
    if (currentIndex < RESULTS_PAGE_INDEX) setCurrentIndex((i) => i + 1)
  }
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  return (
    <>
      <LoadingModal open={isSaving} />

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Intereses y Preferencias Profesionales (IPPR)</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                12 campos temáticos · 12 ítems por campo
              </p>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium">Consigna:</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Para cada actividad, indicá cómo te sentís respecto a ella usando la siguiente escala:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {scaleOptions.map((opt) => (
                  <span
                    key={opt.value}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${opt.color}`}
                  >
                    {opt.emoji} {opt.value} – {opt.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-semibold text-primary">
                  {isResultsPage
                    ? "Resultados"
                    : `Campo ${currentIndex + 1} de ${totalSections}`}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Content: field questions or results */}
        {!isResultsPage && currentField ? (
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{ipprFieldEmojis[currentField]}</span>
                <div>
                  <h3 className="text-xl font-bold text-primary">{ipprFieldLabels[currentField]}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentFieldAnsweredCount} de {currentFieldItemCount} respondidas
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {ipprQuestions[currentField].map((question, idx) => {
                const selected = responses[currentField][idx]
                const answered = selected !== undefined

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 transition-all duration-200 ${
                      answered ? "border-primary/30 bg-primary/5" : "border-border"
                    }`}
                  >
                    <p className="mb-3 text-sm font-medium leading-relaxed">
                      <span className="mr-2 text-xs font-bold text-muted-foreground">
                        {idx + 1}.
                      </span>
                      {question}
                    </p>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {scaleOptions.map((opt) => {
                        const isSelected = selected === opt.value
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleResponse(idx, opt.value)}
                            className={`flex flex-col items-center gap-1 rounded-lg border-2 px-2 py-3 text-center transition-all duration-150 hover:scale-105 active:scale-95 ${
                              isSelected
                                ? opt.selectedColor + " ring-2 ring-offset-1 ring-primary/40 shadow-sm"
                                : opt.color + " hover:opacity-90"
                            }`}
                          >
                            <span className="text-xl leading-none">{opt.emoji}</span>
                            <span className="text-[11px] font-semibold leading-tight">{opt.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        ) : (
          /* Results Page */
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary">Tus resultados por campo</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Puntaje máximo por campo: 36 puntos (12 ítems × 3)
              </p>
            </div>

            {/* Bar Chart */}
            <div className="mb-8 h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={buildChartData(responses)}
                  layout="vertical"
                  margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 36]}
                    tickCount={7}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="emoji"
                    width={32}
                    tick={{ fontSize: 18 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={28}>
                    {buildChartData(responses).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Score list */}
            <div className="grid gap-2 sm:grid-cols-2">
              {buildChartData(responses)
                .sort((a, b) => b.score - a.score)
                .map((d, i) => (
                  <div
                    key={d.name}
                    className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2"
                  >
                    <span className="w-5 text-center text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="text-lg">{d.emoji}</span>
                    <span className="flex-1 text-sm font-medium">{d.name}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                      style={{ backgroundColor: d.fill }}
                    >
                      {d.score}/36
                    </span>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* Navigation */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={goPrev}
            >
              Anterior
            </Button>

            <span className="text-xs text-muted-foreground">
              {isResultsPage
                ? "¡Completaste todos los campos!"
                : currentField
                ? `${ipprFieldEmojis[currentField]} ${ipprFieldLabels[currentField]}`
                : ""}
            </span>

            {isResultsPage ? (
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
                onClick={goNext}
                disabled={!currentFieldComplete}
              >
                {currentIndex === totalSections - 1 ? "Ver resultados →" : "Siguiente"}
              </Button>
            )}
          </div>

          {/* Per-field completion hint */}
          {!isResultsPage && !currentFieldComplete && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Respondé todos los ítems para continuar
              ({currentFieldAnsweredCount}/{currentFieldItemCount})
            </p>
          )}
        </Card>
      </div>
    </>
  )
}
