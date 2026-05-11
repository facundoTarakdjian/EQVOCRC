"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingModal } from "@/components/ui/loading-modal"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import { createFormHelpers } from "@/lib/form-helpers"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts"
import { ChartErrorBoundary } from "@/components/assessments/chart-error-boundary"

// ── Data ──────────────────────────────────────────────────────────────────────
type Dim = "S" | "F" | "A" | "E" | "D"

const ITEMS: { text: string; dim: Dim }[] = [
  // Bloque 1 — "QUISIERA QUE MI CARRERA ME PERMITA"
  { text: "Evitarme preocupaciones futuras.", dim: "F" },
  { text: "Ser más valorado por papá y mamá.", dim: "D" },
  { text: "Ser considerado exitoso.", dim: "E" },
  { text: "Estar satisfecho con mi trabajo.", dim: "S" },
  { text: "Llevar a cabo tareas de prevención y de ayuda.", dim: "A" },
  { text: "Sentir que mis padres me aceptan más.", dim: "D" },
  { text: "Solucionar mi preocupación sobre el futuro laboral.", dim: "F" },
  { text: "Sentirme plenamente realizado con mis tareas.", dim: "S" },
  { text: "Enfrentar el futuro sin preocupaciones.", dim: "F" },
  { text: "Tener un alto cargo en una empresa.", dim: "E" },
  { text: "Colaborar con la solución de problemas sociales.", dim: "A" },
  { text: "Que mi profesión sea mi pasatiempo favorito.", dim: "S" },
  { text: "Ser reconocido por mis triunfos laborales.", dim: "E" },
  { text: "Ser más comprendido por mi familia.", dim: "D" },
  { text: "Mejorar la calidad de vida de muchas personas.", dim: "A" },
  { text: "Que mi ocupación me ayude a sentirme pleno/a y realizado/a.", dim: "S" },
  { text: "Ganar un sueldo lo más alto posible.", dim: "E" },
  { text: "Ser más querido por mis padres.", dim: "D" },
  { text: "Colaborar con el bien común y general.", dim: "A" },
  { text: "Que ejercerla me produzca gran placer.", dim: "S" },
  { text: "Tener en la vida un camino seguro.", dim: "F" },
  { text: "Obtener dinero y prestigio.", dim: "E" },
  { text: "Sentir que mi trabajo me permite desarrollar mi personalidad.", dim: "S" },
  { text: "Conseguir que mi familia esté tranquila sobre mi vocación.", dim: "D" },
  { text: "Trabajar para mejorar la situación social de muchas personas.", dim: "A" },
  // Bloque 2 — "VOY A ELEGIR UNA CARRERA PARA"
  { text: "Evitarme en el futuro problemas de empleo.", dim: "F" },
  { text: "Tener una ocupación que no me aburra.", dim: "S" },
  { text: "Alcanzar un alto nivel social y ser influyente.", dim: "E" },
  { text: "Evitar que mis padres se angustien por mi destino.", dim: "D" },
  { text: "Ayudar a mejorar la comunidad.", dim: "A" },
  { text: "Poder tener un futuro asegurado.", dim: "F" },
  { text: "Lograr un alto nivel económico.", dim: "E" },
  { text: "Poder vivir sin sobresaltos ni ansiedad.", dim: "F" },
  { text: "Efectuar tareas útiles para los demás.", dim: "A" },
  { text: "Dar una respuesta a los deseos de mis padres.", dim: "D" },
  { text: "Que me proporcione muchas satisfacciones.", dim: "S" },
  { text: "Tener una alta valoración y reconocimiento social.", dim: "E" },
  { text: "Hacer un aporte positivo a la sociedad.", dim: "A" },
  { text: "Lograr que mis padres se preocupen menos por mí.", dim: "D" },
  { text: "Darme cuenta que mi trabajo me satisface.", dim: "S" },
  { text: "Tener un camino seguro el día de mañana.", dim: "F" },
  { text: "Tener prestigio en mi vida laboral.", dim: "E" },
  { text: "Mejorar la calidad de vida de la gente.", dim: "A" },
  { text: "Poder en el futuro recoger los frutos de mi esfuerzo.", dim: "F" },
  { text: "Conseguir que mis padres vean que puedo tener logros.", dim: "D" },
]

const DIM_LABELS: Record<Dim, string> = {
  S: "Satisfacción",
  F: "Futuro",
  A: "Altruismo",
  E: "Éxito",
  D: "Dependencia familiar",
}

const DIM_COLORS: Record<Dim, string> = {
  S: "#6366f1",
  F: "#0ea5e9",
  A: "#10b981",
  E: "#f59e0b",
  D: "#ec4899",
}

const RATING_LABELS = [
  "Nada importante",
  "Muy poca importancia",
  "Lo considero, pero no mucho",
  "Bastante importante",
  "Totalmente importante",
]
const ITEMS_PER_PAGE = 5
const TOTAL_CONTENT_PAGES = Math.ceil(ITEMS.length / ITEMS_PER_PAGE) // 9
const RESULTS_PAGE = TOTAL_CONTENT_PAGES

// Bloque 1 ends at item 25 (index 24), bloque 2 starts at index 25
const BLOCK_2_START = 25

function calculateScores(responses: Record<number, number>) {
  const scores: Record<Dim, number> = { S: 0, F: 0, A: 0, E: 0, D: 0 }
  const counts: Record<Dim, number> = { S: 0, F: 0, A: 0, E: 0, D: 0 }
  ITEMS.forEach((item, idx) => {
    counts[item.dim]++
    const val = responses[idx]
    if (val !== undefined) scores[item.dim] += val
  })
  return { scores, counts }
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload?.length && payload[0]?.payload) {
    const d = payload[0].payload
    return (
      <div className="rounded-lg border bg-card px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold">{d.label}</p>
        <p className="text-muted-foreground">
          Puntaje: <span className="font-bold text-primary">{d.score} / {d.max}</span>
        </p>
      </div>
    )
  }
  return null
}

// ── Component ──────────────────────────────────────────────────────────────────
export function CUMOForm() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [responses, setResponses] = useState<Record<number, number>>({})

  const isResults = page === RESULTS_PAGE
  const pageItems = isResults
    ? []
    : ITEMS.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
  const pageStart = page * ITEMS_PER_PAGE

  // which block header to show
  const showBlock1Header = !isResults && pageStart < BLOCK_2_START
  const showBlock2Header =
    !isResults &&
    pageStart >= BLOCK_2_START ||
    (!isResults && pageStart < BLOCK_2_START && pageStart + ITEMS_PER_PAGE > BLOCK_2_START)

  const pageAnswered = pageItems.every((_, i) => responses[pageStart + i] !== undefined)
  const allAnswered = ITEMS.every((_, i) => responses[i] !== undefined)

  const progress = isResults ? 100 : ((page + 1) / (TOTAL_CONTENT_PAGES + 1)) * 100

  const handleRate = (absoluteIdx: number, value: number) =>
    setResponses((prev) => ({ ...prev, [absoluteIdx]: value }))

  const handleSave = async () => {
    const formHelpers = createFormHelpers()
    setIsSaving(true)
    try {
      const { scores, counts } = calculateScores(responses)
      const formatted = (Object.keys(DIM_LABELS) as Dim[]).map((dim, i) => ({
        questionNumber: i + 1,
        question: DIM_LABELS[dim],
        responseText: JSON.stringify({ score: scores[dim], max: counts[dim] * 4, items: counts[dim] }),
      }))
      await formHelpers.saveFormData(SECTION_IDS.BRAVITO, formatted, { section: "cumo" })
      setAssessmentCompleted("cumo")
    } catch { /* handled */ }
    finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  const { scores, counts } = calculateScores(responses)
  const chartData = (Object.keys(DIM_LABELS) as Dim[]).map((dim) => ({
    dim,
    label: DIM_LABELS[dim],
    score: scores[dim],
    max: counts[dim] * 4,
    fill: DIM_COLORS[dim],
  }))

  return (
    <>
      <LoadingModal open={isSaving} />
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Header */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Cuestionario de Motivaciones (CUMO)</h2>
            <p className="mt-1 text-sm text-muted-foreground">45 frases · 5 dimensiones motivacionales</p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
            <p className="text-sm font-medium">Consigna:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Marcá un valor del <strong>0</strong> al <strong>4</strong> en cada frase, según el grado de importancia que le das a cada motivo a la hora de elegir tu carrera o profesión.
            </p>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-5">
              {RATING_LABELS.map((label, i) => (
                <div key={i} className="flex items-center gap-2 sm:flex-col sm:items-center sm:gap-1 sm:text-center">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i}</span>
                  <span className="text-xs text-muted-foreground leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-primary">
                {isResults ? "Resultados" : `Página ${page + 1} de ${TOTAL_CONTENT_PAGES}`}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </Card>

        {/* Questions */}
        {!isResults && (
          <Card className="p-6 space-y-5">
            {/* Block header — visible en cada página */}
            <div className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
              pageStart < BLOCK_2_START
                ? "bg-primary/8 text-primary border border-primary/20"
                : "bg-accent/10 text-accent-foreground border border-accent/20"
            }`}>
              {pageStart < BLOCK_2_START
                ? "Quisiera que mi carrera / ocupación / profesión me permita:"
                : "Voy a elegir una carrera u ocupación para:"}
            </div>

            {pageItems.map((item, i) => {
              const absIdx = pageStart + i
              const selectedVal = responses[absIdx]
              const answered = selectedVal !== undefined

              return (
                <div
                  key={absIdx}
                  className={`rounded-xl border p-4 transition-all ${
                    answered ? "border-primary/30 bg-primary/5" : "border-border"
                  }`}
                >
                  <p className="mb-3 text-sm font-medium leading-relaxed">
                    <span className="mr-2 text-xs font-bold text-muted-foreground">{absIdx + 1}.</span>
                    {item.text}
                  </p>

                  {/* Botones — desktop: número + label · mobile: solo número */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {RATING_LABELS.map((label, val) => {
                      const selected = selectedVal === val
                      return (
                        <button
                          key={val}
                          onClick={() => handleRate(absIdx, val)}
                          className={`flex flex-col items-center gap-0.5 rounded-lg border-2 px-1 py-2 text-center transition-all hover:scale-105 active:scale-95 ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          <span className="text-sm font-bold leading-none">{val}</span>
                          {/* Label visible solo en desktop */}
                          <span className="hidden sm:block text-[9px] leading-tight text-center">{label}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Mobile: label del valor seleccionado debajo */}
                  {answered && (
                    <p className="sm:hidden mt-2 text-center text-xs font-medium text-primary">
                      {selectedVal} — {RATING_LABELS[selectedVal]}
                    </p>
                  )}
                </div>
              )
            })}
          </Card>
        )}

        {/* Results */}
        {isResults && (
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary">Tus dimensiones motivacionales</h3>
              <p className="mt-1 text-sm text-muted-foreground">Puntaje máximo por dimensión: {counts.S * 4} puntos</p>
            </div>

            <div className="h-64 w-full">
              <ChartErrorBoundary>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="dim" tick={{ fontSize: 13, fontWeight: 600 }} />
                    <YAxis domain={[0, counts.S * 4]} tick={{ fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={56}>
                      {chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartErrorBoundary>
            </div>

            <div className="space-y-2">
              {chartData.sort((a, b) => b.score - a.score).map((d) => (
                <div key={d.dim} className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2">
                  <span className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
                  <span className="text-sm font-semibold w-6">{d.dim}</span>
                  <span className="flex-1 text-sm">{d.label}</span>
                  <span className="text-xs font-bold text-muted-foreground">{d.score}/{d.max}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Navigation */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              Anterior
            </Button>
            <span className="text-xs text-muted-foreground">
              {isResults ? "¡Completaste el CUMO!" : `Ítems ${pageStart + 1}–${Math.min(pageStart + ITEMS_PER_PAGE, ITEMS.length)} de ${ITEMS.length}`}
            </span>
            {isResults ? (
              <Button onClick={handleSave} disabled={!allAnswered || isSaving} className="min-w-[120px]">
                {isSaving ? "Guardando..." : "Guardar y salir"}
              </Button>
            ) : (
              <Button variant="outline" disabled={!pageAnswered} onClick={() => setPage((p) => p + 1)}>
                {page === TOTAL_CONTENT_PAGES - 1 ? "Ver resultados →" : "Siguiente"}
              </Button>
            )}
          </div>
          {!isResults && !pageAnswered && (
            <p className="mt-2 text-center text-xs text-muted-foreground">Respondé todos los ítems para continuar</p>
          )}
        </Card>
      </div>
    </>
  )
}
