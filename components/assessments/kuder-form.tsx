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

// ── Data ──────────────────────────────────────────────────────────────────────
type Area = "O" | "M" | "C" | "Ci" | "P" | "A" | "L" | "Mu" | "S" | "Of"

interface KuderItem { text: string; area: Area }
interface KuderGroup { items: [KuderItem, KuderItem, KuderItem] }

const GROUPS: KuderGroup[] = [
  { items: [{ text: "Cuidar un jardín", area: "O" }, { text: "Reparar una radio", area: "M" }, { text: "Llevar registros contables", area: "Of" }] },
  { items: [{ text: "Escribir artículos", area: "L" }, { text: "Tocar un instrumento", area: "Mu" }, { text: "Ayudar a personas enfermas", area: "S" }] },
  { items: [{ text: "Hacer cálculos matemáticos", area: "C" }, { text: "Diseñar carteles", area: "A" }, { text: "Vender productos", area: "P" }] },
  { items: [{ text: "Trabajar al aire libre", area: "O" }, { text: "Armar motores", area: "M" }, { text: "Investigar enfermedades", area: "Ci" }] },
  { items: [{ text: "Redactar cuentos", area: "L" }, { text: "Dirigir una orquesta", area: "Mu" }, { text: "Trabajar en servicio social", area: "S" }] },
  { items: [{ text: "Analizar datos estadísticos", area: "C" }, { text: "Pintar cuadros", area: "A" }, { text: "Convencer clientes", area: "P" }] },
  { items: [{ text: "Explorar la naturaleza", area: "O" }, { text: "Construir maquinarias", area: "M" }, { text: "Organizar archivos", area: "Of" }] },
  { items: [{ text: "Investigar plantas medicinales", area: "Ci" }, { text: "Escribir poesía", area: "L" }, { text: "Enseñar a otros", area: "S" }] },
  { items: [{ text: "Hacer presupuestos", area: "C" }, { text: "Esculpir figuras", area: "A" }, { text: "Dar discursos", area: "P" }] },
  { items: [{ text: "Acampar y explorar", area: "O" }, { text: "Diseñar motores", area: "M" }, { text: "Llevar libros contables", area: "Of" }] },
  { items: [{ text: "Estudiar animales", area: "Ci" }, { text: "Componer música", area: "Mu" }, { text: "Orientar a jóvenes", area: "S" }] },
  { items: [{ text: "Trabajar con números", area: "C" }, { text: "Ilustrar libros", area: "A" }, { text: "Negociar contratos", area: "P" }] },
  { items: [{ text: "Plantar árboles", area: "O" }, { text: "Reparar aparatos", area: "M" }, { text: "Archivar documentos", area: "Of" }] },
  { items: [{ text: "Investigar el espacio", area: "Ci" }, { text: "Narrar historias", area: "L" }, { text: "Colaborar en hospitales", area: "S" }] },
  { items: [{ text: "Calcular estructuras", area: "C" }, { text: "Fotografiar paisajes", area: "A" }, { text: "Liderar equipos", area: "P" }] },
  { items: [{ text: "Trabajar en granjas", area: "O" }, { text: "Instalar sistemas", area: "M" }, { text: "Clasificar información", area: "Of" }] },
  { items: [{ text: "Analizar muestras de laboratorio", area: "Ci" }, { text: "Cantar en un coro", area: "Mu" }, { text: "Ayudar a familias", area: "S" }] },
  { items: [{ text: "Resolver ecuaciones", area: "C" }, { text: "Decorar espacios", area: "A" }, { text: "Presentar proyectos", area: "P" }] },
  { items: [{ text: "Cuidar animales salvajes", area: "O" }, { text: "Programar máquinas", area: "M" }, { text: "Registrar datos", area: "Of" }] },
  { items: [{ text: "Estudiar el clima", area: "Ci" }, { text: "Escribir obras de teatro", area: "L" }, { text: "Apoyar a comunidades", area: "S" }] },
]

const AREA_LABELS: Record<Area, string> = {
  O: "Aire Libre", M: "Mecánica", C: "Cálculo", Ci: "Científica",
  P: "Persuasión", A: "Arte", L: "Literatura", Mu: "Música",
  S: "Servicio Social", Of: "Oficina",
}

const AREA_COLORS: Record<Area, string> = {
  O: "#10b981", M: "#6366f1", C: "#0ea5e9", Ci: "#8b5cf6",
  P: "#f59e0b", A: "#ec4899", L: "#14b8a6", Mu: "#f97316",
  S: "#06b6d4", Of: "#84cc16",
}

type GroupResponse = { mas: number | null; menos: number | null }
type KuderResponses = Record<number, GroupResponse>

const RESULTS_PAGE = GROUPS.length

function calculateScores(responses: KuderResponses) {
  const scores: Partial<Record<Area, number>> = {}
  GROUPS.forEach((group, gi) => {
    const resp = responses[gi]
    if (resp?.mas !== null && resp?.mas !== undefined) {
      const area = group.items[resp.mas].area
      scores[area] = (scores[area] ?? 0) + 1
    }
  })
  return scores
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className="rounded-lg border bg-card px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold">{d.label}</p>
        <p className="text-muted-foreground">Selecciones MÁS: <span className="font-bold text-primary">{d.score}</span></p>
      </div>
    )
  }
  return null
}

// ── Component ──────────────────────────────────────────────────────────────────
export function KuderForm() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [responses, setResponses] = useState<KuderResponses>({})

  const isResults = page === RESULTS_PAGE
  const currentGroup = isResults ? null : GROUPS[page]
  const currentResp = responses[page] ?? { mas: null, menos: null }

  const progress = isResults ? 100 : ((page + 1) / (GROUPS.length + 1)) * 100
  const canAdvance = currentResp.mas !== null && currentResp.menos !== null
  const allAnswered = GROUPS.every((_, i) => {
    const r = responses[i]
    return r?.mas !== null && r?.mas !== undefined && r?.menos !== null && r?.menos !== undefined
  })

  const handleSelect = (itemIdx: number, choice: "mas" | "menos") => {
    setResponses((prev) => {
      const cur = prev[page] ?? { mas: null, menos: null }
      // toggle off if already selected
      if (cur[choice] === itemIdx) {
        return { ...prev, [page]: { ...cur, [choice]: null } }
      }
      // can't be both mas and menos
      const other = choice === "mas" ? "menos" : "mas"
      const newOther = cur[other] === itemIdx ? null : cur[other]
      return { ...prev, [page]: { mas: choice === "mas" ? itemIdx : newOther, menos: choice === "menos" ? itemIdx : newOther } }
    })
  }

  const handleSave = async () => {
    const formHelpers = createFormHelpers()
    setIsSaving(true)
    try {
      const scores = calculateScores(responses)
      const formatted = (Object.keys(AREA_LABELS) as Area[]).map((area, i) => ({
        questionNumber: i + 1,
        question: AREA_LABELS[area],
        responseText: JSON.stringify({ score: scores[area] ?? 0 }),
      }))
      await formHelpers.saveFormData(SECTION_IDS.BRAVITO, formatted, { section: "kuder" })
      setAssessmentCompleted("kuder")
    } catch { /* handled */ }
    finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  // Chart data
  const scores = calculateScores(responses)
  const chartData = (Object.keys(AREA_LABELS) as Area[]).map((area) => ({
    area,
    label: AREA_LABELS[area],
    score: scores[area] ?? 0,
    fill: AREA_COLORS[area],
  }))

  return (
    <>
      <LoadingModal open={isSaving} />
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Header */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Preferencias Ocupacionales (KUDER)</h2>
            <p className="mt-1 text-sm text-muted-foreground">20 grupos de actividades · 10 áreas de interés</p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Consigna:</p>
            <p className="mt-1">En cada grupo de tres actividades, marcá cuál te gustaría hacer <span className="font-semibold text-emerald-600">MÁS</span> y cuál te gustaría hacer <span className="font-semibold text-red-500">MENOS</span>. La tercera queda automáticamente sin marcar.</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-primary">
                {isResults ? "Resultados" : `Grupo ${page + 1} de ${GROUPS.length}`}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </Card>

        {/* Group */}
        {!isResults && currentGroup && (
          <Card className="p-6 space-y-4">
            <p className="text-sm font-medium text-muted-foreground">¿Cuál de estas actividades te gustaría más? ¿Y cuál menos?</p>
            <div className="space-y-3">
              {currentGroup.items.map((item, i) => {
                const isMas = currentResp.mas === i
                const isMenos = currentResp.menos === i
                const isNeutral = !isMas && !isMenos

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                      isMas ? "border-emerald-400 bg-emerald-50" :
                      isMenos ? "border-red-300 bg-red-50" :
                      "border-border bg-background"
                    }`}
                  >
                    <span className={`flex-1 text-sm font-medium ${isMas ? "text-emerald-700" : isMenos ? "text-red-600" : "text-foreground"}`}>
                      {item.text}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSelect(i, "mas")}
                        className={`rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 ${
                          isMas
                            ? "border-emerald-500 bg-emerald-500 text-white shadow"
                            : "border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        MÁS
                      </button>
                      <button
                        onClick={() => handleSelect(i, "menos")}
                        className={`rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 ${
                          isMenos
                            ? "border-red-500 bg-red-500 text-white shadow"
                            : "border-red-300 text-red-500 hover:bg-red-50"
                        }`}
                      >
                        MENOS
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {canAdvance && (
              <p className="text-center text-xs text-emerald-600 font-medium">✓ Podés continuar</p>
            )}
          </Card>
        )}

        {/* Results */}
        {isResults && (
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary">Tus áreas de interés</h3>
              <p className="mt-1 text-sm text-muted-foreground">Cantidad de veces que elegiste cada área como MÁS preferida</p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 32, left: 80, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 8]} tickCount={5} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={22}>
                    {chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {[...chartData].sort((a, b) => b.score - a.score).map((d, i) => (
                <div key={d.area} className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
                  <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                  <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
                  <span className="flex-1 text-xs font-medium">{d.label}</span>
                  <span className="text-xs font-bold" style={{ color: d.fill }}>{d.score}</span>
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
              {isResults ? "¡Completaste el Kuder!" : `Grupo ${page + 1} de ${GROUPS.length}`}
            </span>
            {isResults ? (
              <Button onClick={handleSave} disabled={!allAnswered || isSaving} className="min-w-[120px]">
                {isSaving ? "Guardando..." : "Guardar y salir"}
              </Button>
            ) : (
              <Button variant="outline" disabled={!canAdvance} onClick={() => setPage((p) => p + 1)}>
                {page === GROUPS.length - 1 ? "Ver resultados →" : "Siguiente"}
              </Button>
            )}
          </div>
          {!isResults && !canAdvance && (
            <p className="mt-2 text-center text-xs text-muted-foreground">Elegí MÁS y MENOS para continuar</p>
          )}
        </Card>
      </div>
    </>
  )
}
