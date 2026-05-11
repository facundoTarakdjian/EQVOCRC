"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"
import { setAssessmentCompleted } from "@/lib/questionnaire-storage"

type Responses = {
  // Pantalla 1 — Historia escolar
  rindioMaterias: "si" | "no" | null
  cualesMaterias: string
  materiasGustaron: string
  materiasDisgustaron: string
  // Pantalla 2 — Sobre vos
  desempenoAcademico: string
  fortalezas: string
  debilidades: string
  // Pantalla 3 — Intereses
  profesionesVida: string
  profesionActual: string
  siFueraMillon: string
  // Pantalla 4 — Futuro
  familiaEstudios: string
  carreraFamilia: string
  imagenFuturo: string
}

const TOTAL_SCREENS = 5 // 4 secciones + 1 cierre

export function EntrevistaPautadaForm() {
  const router = useRouter()
  const [screen, setScreen] = useState(0)
  const [responses, setResponses] = useState<Responses>({
    rindioMaterias: null,
    cualesMaterias: "",
    materiasGustaron: "",
    materiasDisgustaron: "",
    desempenoAcademico: "",
    fortalezas: "",
    debilidades: "",
    profesionesVida: "",
    profesionActual: "",
    siFueraMillon: "",
    familiaEstudios: "",
    carreraFamilia: "",
    imagenFuturo: "",
  })

  const set = (field: keyof Responses, value: string) =>
    setResponses((prev) => ({ ...prev, [field]: value }))

  const progress = (screen / (TOTAL_SCREENS - 1)) * 100

  const canAdvance = () => {
    if (screen === 0)
      return (
        responses.rindioMaterias !== null &&
        responses.materiasGustaron.trim() !== "" &&
        responses.materiasDisgustaron.trim() !== ""
      )
    if (screen === 1)
      return (
        responses.desempenoAcademico.trim() !== "" &&
        responses.fortalezas.trim() !== "" &&
        responses.debilidades.trim() !== ""
      )
    if (screen === 2)
      return (
        responses.profesionesVida.trim() !== "" &&
        responses.profesionActual.trim() !== "" &&
        responses.siFueraMillon.trim() !== ""
      )
    if (screen === 3)
      return (
        responses.familiaEstudios.trim() !== "" &&
        responses.imagenFuturo.trim() !== ""
      )
    return true
  }

  const handleFinish = () => {
    setAssessmentCompleted("entrevista-pautada")
    setScreen(4) // pantalla de cierre
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Entrevista Pautada</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Historia y perfil personal · 4 secciones
            </p>
          </div>
          {screen < 4 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-semibold text-primary">
                  Sección {screen + 1} de 4
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </Card>

      {/* Pantalla 1 — Historia escolar */}
      {screen === 0 && (
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-primary">1. Historia escolar</h3>

          {/* Rindió materias */}
          <div className="space-y-3">
            <p className="text-sm font-medium leading-relaxed">
              ¿Tuviste que rendir materias en diciembre o febrero?
            </p>
            <div className="flex gap-3">
              {(["si", "no"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    setResponses((prev) => ({ ...prev, rindioMaterias: opt }))
                  }
                  className={`flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-150 hover:scale-105 ${
                    responses.rindioMaterias === opt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {opt === "si" ? "Sí" : "No"}
                </button>
              ))}
            </div>
            {responses.rindioMaterias === "si" && (
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">¿Cuáles materias?</label>
                <Textarea
                  value={responses.cualesMaterias}
                  onChange={(e) => set("cualesMaterias", e.target.value)}
                  placeholder="Escribí las materias que rendiste..."
                  rows={2}
                  className="resize-none"
                />
              </div>
            )}
          </div>

          {/* Materias que gustaron */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Las 3 materias que más te gustaron y por qué
            </label>
            <Textarea
              value={responses.materiasGustaron}
              onChange={(e) => set("materiasGustaron", e.target.value)}
              placeholder="Ej: Biología — me gustaba estudiar los seres vivos..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Materias que disgustaron */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Las 3 materias que más te disgustaron y por qué
            </label>
            <Textarea
              value={responses.materiasDisgustaron}
              onChange={(e) => set("materiasDisgustaron", e.target.value)}
              placeholder="Ej: Matemática — me costaba mucho el álgebra..."
              rows={3}
              className="resize-none"
            />
          </div>
        </Card>
      )}

      {/* Pantalla 2 — Sobre vos */}
      {screen === 1 && (
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-primary">2. Sobre vos</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Cómo describirías tu desempeño académico en general?
            </label>
            <Textarea
              value={responses.desempenoAcademico}
              onChange={(e) => set("desempenoAcademico", e.target.value)}
              placeholder="Ej: Soy bastante aplicado/a en las materias que me interesan..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Cuáles son tus fortalezas percibidas?
            </label>
            <Textarea
              value={responses.fortalezas}
              onChange={(e) => set("fortalezas", e.target.value)}
              placeholder="Ej: Soy muy creativo/a, me llevo bien con la gente..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">¿Y tus debilidades?</label>
            <Textarea
              value={responses.debilidades}
              onChange={(e) => set("debilidades", e.target.value)}
              placeholder="Ej: Me cuesta mucho organizarme, postergo las cosas..."
              rows={3}
              className="resize-none"
            />
          </div>
        </Card>
      )}

      {/* Pantalla 3 — Intereses */}
      {screen === 2 && (
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-primary">3. Intereses</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Qué profesiones te interesaron a lo largo de tu vida?
            </label>
            <Textarea
              value={responses.profesionesVida}
              onChange={(e) => set("profesionesVida", e.target.value)}
              placeholder="Ej: De chico quería ser astronauta, después me interesó la medicina..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Cuál te interesa más en este momento?
            </label>
            <Textarea
              value={responses.profesionActual}
              onChange={(e) => set("profesionActual", e.target.value)}
              placeholder="Ej: Ahora estoy pensando en estudiar diseño gráfico..."
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Si fueras millonario/a y no necesitaras trabajar, ¿a qué te dedicarías?
            </label>
            <Textarea
              value={responses.siFueraMillon}
              onChange={(e) => set("siFueraMillon", e.target.value)}
              placeholder="Ej: Viajaría y aprendería idiomas, haría música..."
              rows={3}
              className="resize-none"
            />
          </div>
        </Card>
      )}

      {/* Pantalla 4 — Futuro */}
      {screen === 3 && (
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-primary">4. Futuro</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Tu familia desea que continúes estudiando después del colegio? ¿Por qué?
            </label>
            <Textarea
              value={responses.familiaEstudios}
              onChange={(e) => set("familiaEstudios", e.target.value)}
              placeholder="Ej: Sí, mis padres siempre me alentaron a ir a la universidad porque..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Hay alguna carrera que en tu familia les gustaría que hicieras?
            </label>
            <Textarea
              value={responses.carreraFamilia}
              onChange={(e) => set("carreraFamilia", e.target.value)}
              placeholder="Ej: Mi papá siempre quiso que estudiara medicina, aunque a mí..."
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Cómo te imaginás trabajando dentro de 10 años?
            </label>
            <Textarea
              value={responses.imagenFuturo}
              onChange={(e) => set("imagenFuturo", e.target.value)}
              placeholder="Ej: Me veo trabajando de forma independiente, con mi propio emprendimiento..."
              rows={3}
              className="resize-none"
            />
          </div>
        </Card>
      )}

      {/* Pantalla 5 — Cierre */}
      {screen === 4 && (
        <Card className="p-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">¡Muchas gracias!</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Tus respuestas fueron registradas. Esta información es muy valiosa para tu proceso de orientación vocacional.
            </p>
          </div>
          <Button onClick={() => router.push("/")} className="min-w-[160px]">
            Volver al inicio
          </Button>
        </Card>
      )}

      {/* Navegación */}
      {screen < 4 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              disabled={screen === 0}
              onClick={() => setScreen((s) => s - 1)}
            >
              Anterior
            </Button>

            <span className="text-xs text-muted-foreground">
              {["Historia escolar", "Sobre vos", "Intereses", "Futuro"][screen]}
            </span>

            {screen < 3 ? (
              <Button
                variant="outline"
                disabled={!canAdvance()}
                onClick={() => setScreen((s) => s + 1)}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                disabled={!canAdvance()}
                onClick={handleFinish}
                className="min-w-[100px]"
              >
                Finalizar
              </Button>
            )}
          </div>

          {!canAdvance() && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Completá todos los campos para continuar
            </p>
          )}
        </Card>
      )}
    </div>
  )
}
