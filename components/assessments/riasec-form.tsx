"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingModal } from "@/components/ui/loading-modal"
import { createFormHelpers } from "@/lib/form-helpers"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, Tooltip, ResponsiveContainer,
} from "recharts"
import { ChartErrorBoundary } from "@/components/assessments/chart-error-boundary"

// ── Data ──────────────────────────────────────────────────────────────────────

type RIASECType = "R" | "I" | "A" | "S" | "E" | "C"

// 90 oraciones en orden. La posición determina el tipo según la tabla:
// posición % 6 === 1 → R, 2 → I, 3 → A, 4 → S, 5 → E, 0 → C
const STATEMENTS: string[] = [
  "Es importante para mi tener un cuerpo fuerte y ágil.",
  "Necesito tener una comprensión completa de las cosas.",
  "La música, el color, la belleza de cualquier clase pueden realmente afectar mi manera de ser.",
  "La gente enriquece mi vida y le da sentido.",
  "Tengo confianza en mí mismo/a como para poder hacer las cosas.",
  "Me interesa tener claras las pautas para saber qué hacer.",
  "Usualmente puedo construir o sostener cosas sólidas por mí mismo.",
  "Puedo estar absorto por horas en mis pensamientos.",
  "Aprecio la belleza a mi alrededor, el color y el diseño significan mucho para mi.",
  "Me gusta estar acompañado.",
  "Me gusta la competencia.",
  "Necesito tener mi entorno en orden antes de iniciar un proyecto.",
  "Disfruto haciendo manualidades.",
  "Es gratificante explorar nuevas ideas.",
  "Siempre estoy buscando nuevas formas para expresar mi creatividad.",
  "Valoro la capacidad de compartir cosas personales con los demás.",
  "Me gusta ser una persona clave del grupo.",
  "Me enorgullece ser cuidadoso en todos los detalles de mis trabajos.",
  "No me molesta ensuciarme las manos.",
  "Veo la educación como un proceso que se da a lo largo de la vida, que desarrolla y marca mi mente.",
  "Me encanta vestirme de manera informal, intentar nuevos colores y estilos.",
  "Casi siempre me doy cuenta cuando alguien necesita hablar.",
  "Me alegra encontrar gente organizada y en acción.",
  "Una buena rutina ayuda a hacer el trabajo.",
  "Me gusta comprar materiales para hacer las cosas por mi mismo/a.",
  "A veces puedo estar sentado/a por largo tiempo armando rompecabezas o leyendo o sólo pensando acerca de la vida.",
  "Tengo una gran imaginación.",
  "Me hace sentir bien cuidar a la gente.",
  "Me gusta que me tengan confianza para hacer un trabajo.",
  "Estoy satisfecho/a sabiendo que hice un buen trabajo cuidadosa y completamente.",
  "Me gusta hacer cosas prácticas y manuales.",
  "Me meto de lleno a leer sobre temas que despierten mi curiosidad.",
  "Me gusta aplicar creativamente nuevas ideas.",
  "Si tengo un problema con alguien me gusta hablar y resolverlo.",
  "Para tener éxito hay que apuntar alto.",
  "Prefiero estar en una posición en la que no tenga responsabilidad en las decisiones.",
  "No me gusta perder mucho tiempo en discusiones. Lo que es así es así.",
  "Necesito analizar profundamente un problema antes de actuar.",
  "Me gusta arreglar las cosas a mi alrededor para que parezcan únicas y diferentes.",
  "Cuando me siento deprimido/a, busco un amigo para hablar.",
  "Después de sugerir un plan, prefiero dejarle a otros la atención de los detalles.",
  "En general me siento cómodo/a en cualquier parte.",
  "Es estimulante realizar tareas al aire libre.",
  "Sigo preguntando. ¿Por qué?",
  "Deseo que mi trabajo sea una expresión de mi manera de ser y mis sentimientos.",
  "Me gustaría encontrar medios para hacer que la gente se interese más por el prójimo.",
  "Es emocionante ser parte de decisiones importantes.",
  "Me gusta que haya alguien más que se ocupe.",
  "Me gusta que lo que me rodea sea comprensible y práctico.",
  "Necesito meterme en el problema hasta encontrar una respuesta.",
  "La belleza de la naturaleza toca algo muy profundo dentro de mi.",
  "Las relaciones familiares son muy importantes para mi.",
  "Ascender y progresar es importante para mi.",
  "La eficiencia para mi significa armar a diario el conjunto de manera cuidadosa y equilibrada.",
  "Un sistema de leyes fuertes y el orden son importantes para prevenir el caos.",
  "Los libros que desafían la manera de pensar siempre amplían mi perspectiva.",
  "Busco ir a espectáculos artísticos, musicales y ver buenas películas.",
  "Cuando paso un tiempo sin ver a alguien, quisiera saber en qué está.",
  "Influir en la gente es algo atractivo.",
  "Cuando me comprometo a hacer algo tengo en cuenta cada detalle.",
  "Y bien el trabajo físico duro no le hace mal a nadie.",
  "Me gustaría aprender todo sobre los temas que me interesan.",
  "No me gusta ser del montón, quiero hacer las cosas de manera diferente.",
  "Dime cómo te puedo ayudar.",
  "Estoy dispuesto a asumir riesgos para seguir adelante.",
  "Quiero instrucciones precisas y reglas claras cuando comienzo algo.",
  "Lo primero que busco en un auto es un motor bien construido.",
  "Algunas personas son intelectualmente estimulantes.",
  "Cuando estoy creando, no presto atención a otras cosas.",
  "Estoy convencido que mucha gente en nuestra sociedad necesita ayuda.",
  "Es divertido obtener ideas a través de la gente.",
  "Odio que cambien los esquemas cuando ya los entendí.",
  "Usualmente sé como actuar en situaciones de emergencia.",
  "Es atrapante leer sobre nuevos descubrimientos.",
  "Me gusta crear situaciones fuera de lo común.",
  "Con frecuencia dejo mis cosas para prestar atención a la gente que parece solitaria y sin amigos.",
  "Me encanta el intercambio.",
  "No me gusta hacer cosas de las que no estoy seguro de su consistencia.",
  "Los deportes son importantes para alcanzar la fortaleza física.",
  "Siempre he tenido curiosidad acerca de la modalidad de los trabajos al aire libre.",
  "Es divertido tener condiciones para tratar o hacer algo inusual.",
  "Creo que la gente es básicamente buena.",
  "Si no puedo hacer algo en el primer intento, trato otra vez con entusiasmo y energía.",
  "Aprecio saber exactamente qué es lo que la gente espera de mí.",
  "Me gusta poner distancia en las cosas para ver si puedo asegurarlas.",
  "No hay que apurarse, se pueden pensar y planificar los movimientos lógicamente.",
  "Sería duro imaginar la vida sin belleza alrededor.",
  "A menudo la gente me confía sus problemas.",
  "En general, me acerco a la gente que me pone en contacto con distintos recursos.",
  "No necesito demasiado para ser feliz.",
]

// Mapping: (1-based index - 1) % 6 → type
// pos%6: 0→R, 1→I, 2→A, 3→S, 4→E, 5→C
const TYPE_ORDER: RIASECType[] = ["R", "I", "A", "S", "E", "C"]

function getType(zeroBasedIdx: number): RIASECType {
  return TYPE_ORDER[zeroBasedIdx % 6]
}

const TYPE_LABELS: Record<RIASECType, string> = {
  R: "Realista",
  I: "Investigador",
  A: "Artístico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
}

const TYPE_COLORS: Record<RIASECType, string> = {
  R: "#6366f1",
  I: "#0ea5e9",
  A: "#ec4899",
  S: "#10b981",
  E: "#f59e0b",
  C: "#8b5cf6",
}

const TYPE_DESCRIPTIONS: Record<RIASECType, string> = {
  R: "Práctico, concreto, le gustan las actividades manuales y al aire libre.",
  I: "Analítico, curioso, disfruta investigar y resolver problemas complejos.",
  A: "Creativo, expresivo, valora la originalidad y la belleza.",
  S: "Empático, colaborativo, disfruta ayudar y trabajar con personas.",
  E: "Líder, ambicioso, le gusta persuadir y tomar decisiones.",
  C: "Organizado, metódico, prefiere estructuras claras y tareas definidas.",
}

const ITEMS_PER_PAGE = 6
const TOTAL_PAGES = Math.ceil(STATEMENTS.length / ITEMS_PER_PAGE) // 15
const RESULTS_PAGE = TOTAL_PAGES

function calculateScores(marked: Set<number>): Record<RIASECType, number> {
  const scores: Record<RIASECType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  marked.forEach((idx) => { scores[getType(idx)]++ })
  return scores
}

// ── Component ──────────────────────────────────────────────────────────────────

export function RIASECForm() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  // Set of 0-based statement indices that are marked
  const [marked, setMarked] = useState<Set<number>>(new Set())

  const isResults = page === RESULTS_PAGE
  const pageStart = page * ITEMS_PER_PAGE
  const pageStatements = STATEMENTS.slice(pageStart, pageStart + ITEMS_PER_PAGE)
  const progress = isResults ? 100 : ((page + 1) / (TOTAL_PAGES + 1)) * 100

  const toggle = (idx: number) => {
    setMarked((prev) => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  const scores = calculateScores(marked)

  // Sort types by score descending for results
  const sortedTypes = (Object.keys(scores) as RIASECType[]).sort((a, b) => scores[b] - scores[a])
  const topThree = sortedTypes.slice(0, 3)

  const radarData = (Object.keys(TYPE_LABELS) as RIASECType[]).map((t) => ({
    subject: `${t} — ${TYPE_LABELS[t]}`,
    type: t,
    value: scores[t],
  }))

  const handleSave = async () => {
    const formHelpers = createFormHelpers()
    setIsSaving(true)
    try {
      const formatted = (Object.keys(TYPE_LABELS) as RIASECType[]).map((t, i) => ({
        questionNumber: i + 1,
        question: `${t} — ${TYPE_LABELS[t]}`,
        responseText: JSON.stringify({ score: scores[t], max: 15 }),
      }))
      await formHelpers.saveFormData(SECTION_IDS.RIASEC, formatted, { section: "riasec" })
      setAssessmentCompleted("riasec")
    } catch { /* handled */ }
    finally {
      setIsSaving(false)
      router.push("/")
    }
  }

  return (
    <>
      <LoadingModal open={isSaving} />
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Header */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Intereses y Aptitudes Vocacionales (RIASEC - HOLLAND)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              90 oraciones · 6 tipos vocacionales: Realista, Investigador, Artístico, Social, Emprendedor, Convencional
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium">Consigna:</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Marcá las oraciones que sientas claramente que son cosas que dirías, harías o pensarías.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-primary">
                {isResults ? "Resultados" : `Pantalla ${page + 1} de ${TOTAL_PAGES}`}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </Card>

        {/* Statements */}
        {!isResults && (
          <Card className="p-6 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Oraciones {pageStart + 1}–{Math.min(pageStart + ITEMS_PER_PAGE, STATEMENTS.length)} de {STATEMENTS.length}
            </p>

            {pageStatements.map((statement, i) => {
              const absIdx = pageStart + i
              const isMarked = marked.has(absIdx)

              return (
                <button
                  key={absIdx}
                  onClick={() => toggle(absIdx)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] ${
                    isMarked
                      ? "border-primary bg-primary/8 shadow-sm"
                      : "border-border bg-background hover:border-primary/30 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox visual */}
                    <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${
                      isMarked
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40 bg-background"
                    }`}>
                      {isMarked && (
                        <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="mr-1.5 text-xs font-bold text-muted-foreground">{absIdx + 1}.</span>
                      <span className={`text-sm leading-relaxed ${isMarked ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                        {statement}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </Card>
        )}

        {/* Results */}
        {isResults && (
          <div className="space-y-6">
            {/* Radar chart */}
            <Card className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-primary">Tu perfil Holland</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Puntaje máximo por tipo: 15 oraciones
                </p>
              </div>

              <div className="h-72 w-full">
                <ChartErrorBoundary>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 15]} tick={{ fontSize: 9 }} tickCount={4} />
                      <Radar
                        name="RIASEC"
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Tooltip formatter={(v) => [`${v} / 15`, "Puntaje"]} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartErrorBoundary>
              </div>

              {/* Profile code */}
              <div className="rounded-xl border bg-primary/5 border-primary/20 p-4 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tu perfil Holland</p>
                <p className="text-3xl font-bold tracking-widest text-primary">
                  {topThree.join("")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {topThree.map((t) => TYPE_LABELS[t]).join(" — ")}
                </p>
              </div>

              {/* Top 3 badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                {topThree.map((t, rank) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-bold"
                    style={{ borderColor: TYPE_COLORS[t], color: TYPE_COLORS[t], backgroundColor: `${TYPE_COLORS[t]}15` }}
                  >
                    <span className="text-xs text-muted-foreground font-normal">#{rank + 1}</span>
                    {t} — {TYPE_LABELS[t]}
                    <span className="text-xs text-muted-foreground font-normal">({scores[t]})</span>
                  </span>
                ))}
              </div>
            </Card>

            {/* Type descriptions */}
            <Card className="p-6 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">Descripción de tus tipos dominantes</h4>
              {topThree.map((t) => (
                <div key={t} className="flex items-start gap-3 rounded-lg border p-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: TYPE_COLORS[t] }}
                  >
                    {t}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{TYPE_LABELS[t]}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{TYPE_DESCRIPTIONS[t]}</p>
                  </div>
                </div>
              ))}

              {/* All scores mini summary */}
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {(Object.keys(TYPE_LABELS) as RIASECType[]).map((t) => (
                  <div key={t} className="rounded-lg border bg-muted/30 p-2 text-center">
                    <p className="text-xs font-bold" style={{ color: TYPE_COLORS[t] }}>{t}</p>
                    <p className="text-lg font-bold">{scores[t]}</p>
                    <p className="text-[10px] text-muted-foreground">/ 15</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>

            <span className="text-xs text-muted-foreground">
              {isResults
                ? `${marked.size} oraciones marcadas`
                : `${Array.from(marked).filter((i) => i >= pageStart && i < pageStart + ITEMS_PER_PAGE).length} marcadas en esta pantalla`}
            </span>

            {isResults ? (
              <Button onClick={handleSave} disabled={isSaving} className="min-w-[120px]">
                {isSaving ? "Guardando..." : "Guardar y salir"}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
              >
                {page === TOTAL_PAGES - 1 ? "Ver resultados →" : "Siguiente"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  )
}
