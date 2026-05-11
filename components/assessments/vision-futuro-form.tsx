"use client"

import React from "react"

import { useState } from "react"
import { useRouter} from "next/navigation"
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Progress} from "@/components/ui/progress"
import {LoadingModal} from "@/components/ui/loading-modal"
import {visionFuturoData} from "@/lib/questionnaires/vision-futuro-questions"
import {createFormHelpers} from "@/lib/form-helpers"
import {SECTION_IDS} from "@/lib/questionnaire-calculator"
import {setAssessmentCompleted} from "@/lib/questionnaire-storage"
import { Eye, MapPin, Lightbulb, ChevronRight, ChevronLeft, Check } from "lucide-react"

type VisionFuturoResponse = {
  visualizaciones: { [key: string]: string }
  lugarFantaseado: { [key: string]: string }
  preguntasProfundidad: { [key: string]: string }
}

export function VisionFuturoForm() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()
    const [responses, setResponses] = useState<VisionFuturoResponse>({
    visualizaciones: {},
    lugarFantaseado: {},
    preguntasProfundidad: {},
  })

    const sections = [
        {id: "visualizaciones", title: "Visualizaciones", icon: Eye, subtitle: "Corto, Mediano y Largo Plazo"},
        {id: "lugarFantaseado", title: "Lugar Fantaseado Ocupacional", icon: MapPin, subtitle: "Tu espacio ideal"},
        {
            id: "preguntasProfundidad",
            title: "Preguntas de Profundidad",
            icon: Lightbulb,
            subtitle: "Motivación y Reflexión"
        },
    ]

  const currentSectionData = sections[currentSection]
  const progress = ((currentSection + 1) / sections.length) * 100

  const formHelpers = createFormHelpers()

    const isSectionComplete = (sectionIndex: number) => {
        if (sectionIndex === 0) {
            return Object.values(responses.visualizaciones).some(text => text && text.trim() !== "")
        } else if (sectionIndex === 1) {
            return Object.values(responses.lugarFantaseado).some(text => text && text.trim() !== "")
        } else if (sectionIndex === 2) {
            return Object.values(responses.preguntasProfundidad).some(text => text && text.trim() !== "")
        }
        return false
    }

    const isFormComplete = () => {
        return sections.every((_, index) => isSectionComplete(index))
    }

    const handleSave = async () => {
        if (!isFormComplete()) {
            alert("Por favor completa todas las secciones antes de guardar.")
            return
        }

        setIsSaving(true)
        try {
            const formattedResponses: any[] = []
            let questionNumber = 1

            // Format Visualizaciones section
            if (Object.keys(responses.visualizaciones).length > 0) {
                const visualizacionesJson: Record<string, string> = {}
                Object.entries(responses.visualizaciones).forEach(([itemId, response]) => {
                    const item = visionFuturoData.visualizaciones.find(v => v.id === itemId)
                    if (item && response && response.trim() !== "") {
                        visualizacionesJson[item.description] = response
                    }
                })
                
                if (Object.keys(visualizacionesJson).length > 0) {
                    formattedResponses.push({
                        questionNumber,
                        question: "Visualizaciones",
                        responseText: JSON.stringify(visualizacionesJson)
                    })
                    questionNumber++
                }
            }

            // Format Lugar Fantaseado section
            if (Object.keys(responses.lugarFantaseado).length > 0) {
                const lugarJson: Record<string, string> = {}
                Object.entries(responses.lugarFantaseado).forEach(([itemId, response]) => {
                    const item = visionFuturoData.lugarFantaseado.find(l => l.id === itemId)
                    if (item && response && response.trim() !== "") {
                        lugarJson[item.description] = response
                    }
                })
                
                if (Object.keys(lugarJson).length > 0) {
                    formattedResponses.push({
                        questionNumber,
                        question: "Lugar Fantaseado Ocupacional",
                        responseText: JSON.stringify(lugarJson)
                    })
                    questionNumber++
                }
            }

            // Format Preguntas Profundidad section
            if (Object.keys(responses.preguntasProfundidad).length > 0) {
                const preguntasJson: Record<string, string> = {}
                Object.entries(responses.preguntasProfundidad).forEach(([itemId, response]) => {
                    const item = visionFuturoData.preguntasProfundidad.find(p => p.id === itemId)
                    if (item && response && response.trim() !== "") {
                        preguntasJson[item.question] = response
                    }
                })
                
                if (Object.keys(preguntasJson).length > 0) {
                    formattedResponses.push({
                        questionNumber,
                        question: "Preguntas de Profundidad",
                        responseText: JSON.stringify(preguntasJson)
                    })
                }
            }

            await formHelpers.saveFormData(SECTION_IDS.FUTURO, formattedResponses, {
                totalSections: sections.length,
                section: "vision-futuro"
            })
            setAssessmentCompleted("vision-futuro")
        } catch (error) {
            console.error("Error saving responses:", error)
        } finally {
            setIsSaving(false)
            router.push("/")
        }
    }

    return (
        <>
            <LoadingModal open={isSaving}/>
    <div className="space-y-6">
      <Card className="border-none bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sección {currentSection + 1} de {sections.length}</p>
              <h2 className="text-xl font-bold">{currentSectionData.title}</h2>
              <p className="text-sm text-muted-foreground">{currentSectionData.subtitle}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <currentSectionData.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((section, index) => (
          <Button
            key={section.id}
            variant={currentSection === index ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentSection(index)}
            className="flex-shrink-0"
          >
            <section.icon className="mr-2 h-4 w-4" />
            {section.title}
          </Button>
        ))}
      </div>

                {currentSection === 0 && <VisualizacionesSection responses={responses} setResponses={setResponses}/>}
                {currentSection === 1 && <LugarFantaseadoSection responses={responses} setResponses={setResponses}/>}
                {currentSection === 2 &&
                    <PreguntasProfundidadSection responses={responses} setResponses={setResponses}/>}

                <Card className="border-none bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            disabled={currentSection === 0}
                            onClick={() => setCurrentSection((p) => p - 1)}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4"/>
                            Sección anterior
                        </Button>
                        {currentSection === sections.length - 1 ? (
                            <Button
                                onClick={handleSave}
                                disabled={!isFormComplete()}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Check className="mr-2 h-4 w-4"/>
                                Guardar y Finalizar
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setCurrentSection((p) => p + 1)}
                                disabled={!isSectionComplete(currentSection)}
                            >
                                Siguiente sección
                                <ChevronRight className="ml-2 h-4 w-4"/>
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </>
    )
}

function VisualizacionesSection({
  responses,
  setResponses,
}: {
  responses: VisionFuturoResponse
  setResponses: React.Dispatch<React.SetStateAction<VisionFuturoResponse>>
}) {
  const handleChange = (id: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      visualizaciones: {
        ...prev.visualizaciones,
        [id]: value,
      },
    }))
  }

  return (
    <div className="space-y-4">
      <Card className="border-none bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Visualizaciones</h3>
          <p className="text-sm text-muted-foreground">
            Imaginá diferentes momentos de tu futuro y describí cómo te gustaría que fueran.
          </p>
        </div>
      </Card>

      {visionFuturoData.visualizaciones.map((item) => (
        <Card key={item.id} className="border-none bg-card p-6 shadow-sm">
          <div className="space-y-3">
            <div>
              <Label className="text-base font-semibold">{item.title}</Label>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Textarea
              value={responses.visualizaciones[item.id] || ""}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder="Escribí tu respuesta aquí..."
              className="min-h-[120px]"
            />
          </div>
        </Card>
      ))}
    </div>
  )
}

function LugarFantaseadoSection({
  responses,
  setResponses,
}: {
  responses: VisionFuturoResponse
  setResponses: React.Dispatch<React.SetStateAction<VisionFuturoResponse>>
}) {
  const handleChange = (id: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      lugarFantaseado: {
        ...prev.lugarFantaseado,
        [id]: value,
      },
    }))
  }

  return (
    <div className="space-y-4">
      <Card className="border-none bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Lugar Fantaseado Ocupacional</h3>
          <p className="text-sm text-muted-foreground">
            Describí los espacios donde te sentís cómodo y cómo te imaginás tu lugar de trabajo ideal.
          </p>
        </div>
      </Card>

      {visionFuturoData.lugarFantaseado.map((item) => (
        <Card key={item.id} className="border-none bg-card p-6 shadow-sm">
          <div className="space-y-3">
            <div>
              <Label className="text-base font-semibold">{item.title}</Label>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Textarea
              value={responses.lugarFantaseado[item.id] || ""}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder="Escribí tu respuesta aquí..."
              className="min-h-[120px]"
            />
          </div>
        </Card>
      ))}
    </div>
  )
}

function PreguntasProfundidadSection({
  responses,
  setResponses,
}: {
  responses: VisionFuturoResponse
  setResponses: React.Dispatch<React.SetStateAction<VisionFuturoResponse>>
}) {
  const handleChange = (id: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      preguntasProfundidad: {
        ...prev.preguntasProfundidad,
        [id]: value,
      },
    }))
  }

    return (
        <div className="space-y-4">
            <Card className="border-none bg-card p-6 shadow-sm">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Preguntas de Profundidad y Motivación</h3>
                    <p className="text-sm text-muted-foreground">
                        Respondé estas preguntas con honestidad. No hay respuestas correctas o incorrectas, se trata de
                        conocerte mejor.
                    </p>
                </div>
            </Card>

            {visionFuturoData.preguntasProfundidad.map((item, index) => (
                <Card key={item.id} className="border-none bg-card p-6 shadow-sm">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
              <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <Label className="text-base leading-relaxed">{item.question}</Label>
            </div>
            <Textarea
              value={responses.preguntasProfundidad[item.id] || ""}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder="Escribí tu respuesta aquí..."
              className="min-h-[100px]"
            />
          </div>
        </Card>
      ))}
    </div>
  )
}
