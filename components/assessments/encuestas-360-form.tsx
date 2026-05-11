"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"
import { useRouter } from "next/navigation"

const SURVEYS = [
  {
    tipo: "joven",
    label: "Encuesta del Joven",
    description: "Para completar vos mismo/a junto al orientador.",
    color: "from-violet-500 to-purple-600",
    emoji: "🧑",
  },
  {
    tipo: "pares",
    label: "Encuesta de Pares",
    description: "Para que completen tus amigos y compañeros.",
    color: "from-sky-500 to-blue-600",
    emoji: "👥",
  },
  {
    tipo: "padres",
    label: "Encuesta de Padres",
    description: "Para que completen tu papá y/o mamá.",
    color: "from-emerald-500 to-teal-600",
    emoji: "👨‍👩‍👧",
  },
]

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin
  return "http://localhost:3000"
}

export function Encuestas360Form() {
  const router = useRouter()
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (tipo: string) => {
    const url = `${getBaseUrl()}/survey/${tipo}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(tipo)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const handleFinish = () => {
    setAssessmentCompleted("encuestas-360")
    router.push("/")
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="p-6 space-y-3">
        <h2 className="text-2xl font-bold">Encuestas 360°</h2>
        <p className="text-sm text-muted-foreground">
          Las encuestas 360° recopilan perspectivas externas sobre vos: de tus pares y de tu familia.
          Compartiles el link correspondiente para que las completen desde sus dispositivos.
        </p>
      </Card>

      <div className="space-y-4">
        {SURVEYS.map((s) => {
          const url = `${getBaseUrl()}/survey/${s.tipo}`
          const isCopied = copied === s.tipo

          return (
            <Card key={s.tipo} className="p-5">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-2xl`}>
                  {s.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{s.label}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>

                  {/* URL preview */}
                  <div className="mt-3 flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
                    <span className="flex-1 truncate text-xs font-mono text-muted-foreground">{url}</span>
                    <button
                      onClick={() => handleCopy(s.tipo)}
                      className="flex-shrink-0 rounded-md p-1 hover:bg-accent transition-colors"
                      title="Copiar link"
                    >
                      {isCopied ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(s.tipo)}
                      className="gap-1.5 text-xs"
                    >
                      <Copy className="h-3 w-3" />
                      {isCopied ? "¡Copiado!" : "Copiar link"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1.5 text-xs"
                      onClick={() => window.open(`/survey/${s.tipo}`, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Abrir
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-4 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">💡 Tip:</span> Podés compartir los links por WhatsApp, mail o cualquier medio. Las respuestas son anónimas.
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex justify-end">
          <Button onClick={handleFinish} className="min-w-[160px]">
            Marcar como visto y salir
          </Button>
        </div>
      </Card>
    </div>
  )
}
