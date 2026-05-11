"use client"

import { useState, use } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2 } from "lucide-react"

// ── Survey definitions ─────────────────────────────────────────────────────────
type QuestionType = "textarea" | "choice"

interface Question {
  text: string
  type: QuestionType
  options?: string[]
}

interface SurveyDef {
  title: string
  intro: string
  questions: Question[]
}

const SURVEYS: Record<string, SurveyDef> = {
  joven: {
    title: "Encuesta del Joven",
    intro: "Esta encuesta es parte de tu proceso de orientación vocacional. Respondé con honestidad — no hay respuestas correctas ni incorrectas.",
    questions: [
      { text: "¿Tu familia desea que continúes estudiando después del colegio? ¿Por qué?", type: "textarea" },
      { text: "¿Hay alguna carrera que en tu familia les gustaría que hicieras?", type: "textarea" },
      { text: "¿Cuáles son los rasgos que tu familia destaca de tu modo de ser?", type: "textarea" },
      { text: "¿A qué te gustaba jugar en tu infancia?", type: "textarea" },
      { text: "¿Qué hacés actualmente en tu tiempo libre?", type: "textarea" },
      { text: "¿Qué habilidades desarrollaste en la escuela?", type: "textarea" },
      {
        text: "¿Qué visión del trabajo te representa más?",
        type: "choice",
        options: [
          "Fuente de ingresos",
          "Realización personal",
          "Aporte a la sociedad",
          "Organización del tiempo",
          "Todas las anteriores",
        ],
      },
      { text: "¿Qué te motiva o entusiasma de trabajar en algo que te guste?", type: "textarea" },
    ],
  },
  pares: {
    title: "Encuesta de Pares",
    intro: "Un/a amigo/a o compañero/a está haciendo su proceso de orientación vocacional. Tu opinión honesta lo/la puede ayudar mucho. Las respuestas son confidenciales.",
    questions: [
      { text: "¿Cómo describirías a esta persona en general?", type: "textarea" },
      { text: "¿Qué cosas destacarías como positivas?", type: "textarea" },
      { text: "¿Y como negativas o a mejorar?", type: "textarea" },
      { text: "¿Cuáles son sus aptitudes y habilidades más notorias?", type: "textarea" },
      { text: "¿Cuáles son sus intereses más evidentes?", type: "textarea" },
      { text: "¿Qué opinás sobre las carreras que está considerando?", type: "textarea" },
    ],
  },
  padres: {
    title: "Encuesta de Padres",
    intro: "Su hijo/a está realizando un proceso de orientación vocacional. Sus respuestas nos ayudarán a entender mejor el perfil y el contexto familiar. Son confidenciales.",
    questions: [
      { text: "¿Cómo describirían la personalidad de su hijo/a?", type: "textarea" },
      { text: "¿Qué rasgos positivos destacan?", type: "textarea" },
      { text: "¿A qué le gustaba jugar en la infancia?", type: "textarea" },
      { text: "¿Qué habilidades le vieron desarrollar en la escuela?", type: "textarea" },
      { text: "¿Desean que realice estudios universitarios? ¿Por qué?", type: "textarea" },
      { text: "¿Hay alguna carrera que les gustaría que hiciera?", type: "textarea" },
      { text: "¿Cómo se desenvuelve tomando decisiones?", type: "textarea" },
      { text: "¿Algún comentario o sugerencia adicional?", type: "textarea" },
    ],
  },
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function SurveyPage({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = use(params)
  const survey = SURVEYS[tipo]

  const [step, setStep] = useState<"intro" | "questions" | "done">("intro")
  const [questionIdx, setQuestionIdx] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})

  if (!survey) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-sm">
          <p className="text-lg font-semibold">Encuesta no encontrada</p>
          <p className="mt-2 text-sm text-muted-foreground">El link que usaste no es válido.</p>
        </Card>
      </div>
    )
  }

  const currentQ = survey.questions[questionIdx]
  const progress = ((questionIdx + 1) / survey.questions.length) * 100
  const currentAnswer = responses[questionIdx] ?? ""
  const canAdvance = currentAnswer.trim().length > 0

  const handleNext = () => {
    if (questionIdx < survey.questions.length - 1) {
      setQuestionIdx((i) => i + 1)
    } else {
      setStep("done")
    }
  }

  const handlePrev = () => {
    if (questionIdx > 0) setQuestionIdx((i) => i - 1)
  }

  // ── Intro ──
  if (step === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-6">
          <Card className="p-8 text-center space-y-4">
            <div className="text-4xl">
              {tipo === "joven" ? "🧑" : tipo === "pares" ? "👥" : "👨‍👩‍👧"}
            </div>
            <h1 className="text-2xl font-bold">{survey.title}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">{survey.intro}</p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>{survey.questions.length} preguntas</span>
              <span>·</span>
              <span>~{Math.ceil(survey.questions.length * 1.5)} minutos</span>
            </div>
          </Card>
          <Button className="w-full" size="lg" onClick={() => setStep("questions")}>
            Comenzar
          </Button>
        </div>
      </div>
    )
  }

  // ── Done ──
  if (step === "done") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-6">
        <Card className="w-full max-w-lg p-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">¡Gracias!</h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Tus respuestas fueron enviadas. Tu aporte es muy valioso para el proceso de orientación vocacional.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Podés cerrar esta ventana.</p>
        </Card>
      </div>
    )
  }

  // ── Questions ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-4">
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{survey.title}</span>
            <span>{questionIdx + 1} / {survey.questions.length}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Question card */}
        <Card className="p-8 space-y-6">
          <p className="text-lg font-semibold leading-snug">{currentQ.text}</p>

          {currentQ.type === "textarea" ? (
            <Textarea
              key={questionIdx}
              value={currentAnswer}
              onChange={(e) => setResponses((prev) => ({ ...prev, [questionIdx]: e.target.value }))}
              placeholder="Escribí tu respuesta aquí..."
              rows={4}
              className="resize-none text-sm"
              autoFocus
            />
          ) : (
            // Choice question
            <div className="space-y-2">
              {currentQ.options!.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setResponses((prev) => ({ ...prev, [questionIdx]: opt }))}
                  className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all hover:scale-[1.01] ${
                    currentAnswer === opt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={questionIdx === 0}
            onClick={handlePrev}
            className="flex-shrink-0"
          >
            Anterior
          </Button>
          <Button
            className="flex-1"
            disabled={!canAdvance}
            onClick={handleNext}
          >
            {questionIdx === survey.questions.length - 1 ? "Enviar respuestas" : "Siguiente →"}
          </Button>
        </div>

        {!canAdvance && (
          <p className="text-center text-xs text-muted-foreground">Escribí tu respuesta para continuar</p>
        )}
      </div>
    </div>
  )
}
