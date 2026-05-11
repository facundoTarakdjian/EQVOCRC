"use client"

import React from "react"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {LoadingModal} from "@/components/ui/loading-modal"
import {estiloVidaData} from "@/lib/questionnaires/estilo-vida-questions"
import {createFormHelpers} from "@/lib/form-helpers"
import {SECTION_IDS} from "@/lib/questionnaire-calculator"
import {setAssessmentCompleted} from "@/lib/questionnaire-storage"

type EstiloVidaResponse = {
    reconociendoIntereses: {
        meGusta: string[]
        noMeGusta: string[]
        actividadesCotidianas: string[]
        carrerasRelacionadas: string[]
    }
    desiderativoOcupacional: {
        preferencias: { carrera: string; porque: string }[]
        rechazos: { carrera: string; porque: string }[]
    }
    estiloVidaLaboral: {
        [key: string]: string[]
    }
}

export function EstiloVidaForm() {
    const [currentSection, setCurrentSection] = useState(0)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()
    const [responses, setResponses] = useState<EstiloVidaResponse>({
        reconociendoIntereses: {
            meGusta: Array(18).fill(""),
            noMeGusta: Array(18).fill(""),
            actividadesCotidianas: Array(18).fill(""),
            carrerasRelacionadas: Array(9).fill(""),
        },
        desiderativoOcupacional: {
            preferencias: [
                {carrera: "", porque: ""},
                {carrera: "", porque: ""},
                {carrera: "", porque: ""},
            ],
            rechazos: [
                {carrera: "", porque: ""},
                {carrera: "", porque: ""},
                {carrera: "", porque: ""},
            ],
        },
        estiloVidaLaboral: {},
    })

    const sections = [
        {id: "reconociendoIntereses", title: "Reconociendo Intereses"},
        {id: "desiderativoOcupacional", title: "Desiderativo Ocupacional"},
        {id: "estiloVidaLaboral", title: "Explorando tu Estilo de Vida Laboral"},
    ]

    const progress = ((currentSection + 1) / sections.length) * 100

    const formHelpers = createFormHelpers()

    const isSectionComplete = (sectionIndex: number) => {
        if (sectionIndex === 0) {
            const reconociendo = responses.reconociendoIntereses
            return Object.values(reconociendo).some(arr => arr.some(item => item.trim() !== ""))
        } else if (sectionIndex === 1) {
            const hasPreferencias = responses.desiderativoOcupacional.preferencias.some(p => p.carrera.trim() !== "" && p.porque.trim() !== "")
            const hasRechazos = responses.desiderativoOcupacional.rechazos.some(r => r.carrera.trim() !== "" && r.porque.trim() !== "")
            return hasPreferencias && hasRechazos
        } else if (sectionIndex === 2) {
            return Object.values(responses.estiloVidaLaboral).some(arr => arr && arr.length > 0)
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

            // Format Reconociendo Intereses section
            const reconociendoJson: Record<string, string[]> = {}
            Object.entries(estiloVidaData.reconociendoIntereses).forEach(([key, data]) => {
                const values = responses.reconociendoIntereses[key as keyof typeof responses.reconociendoIntereses]
                const filteredValues = values.filter(val => val.trim() !== "")
                if (filteredValues.length > 0) {
                    reconociendoJson[data.description] = filteredValues
                }
            })

            if (Object.keys(reconociendoJson).length > 0) {
                formattedResponses.push({
                    questionNumber,
                    question: "Reconociendo Intereses",
                    responseText: JSON.stringify(reconociendoJson)
                })
                questionNumber++
            }

            // Format Desiderativo Ocupacional - Preferencias
            const preferenciasData = responses.desiderativoOcupacional.preferencias
                .filter(p => p.carrera.trim() !== "" || p.porque.trim() !== "")
                .map(p => `${p.carrera}: ${p.porque}`)
            
            if (preferenciasData.length > 0) {
                formattedResponses.push({
                    questionNumber,
                    question: "¿Cuáles son las tres ocupaciones o carreras que más te gustan al día de hoy? ¿Por qué?",
                    responseText: JSON.stringify(preferenciasData)
                })
                questionNumber++
            }

            // Format Desiderativo Ocupacional - Rechazos
            const rechazosData = responses.desiderativoOcupacional.rechazos
                .filter(r => r.carrera.trim() !== "" || r.porque.trim() !== "")
                .map(r => `${r.carrera}: ${r.porque}`)
            
            if (rechazosData.length > 0) {
                formattedResponses.push({
                    questionNumber,
                    question: "¿Cuáles son las tres ocupaciones o carreras que menos te gustan al día de hoy? ¿Por qué?",
                    responseText: JSON.stringify(rechazosData)
                })
                questionNumber++
            }

            // Format Estilo de Vida Laboral - use label as key
            const estiloVidaJson: Record<string, string[]> = {}
            Object.entries(estiloVidaData.estiloVidaLaboral).forEach(([sectionKey, section]) => {
                Object.entries(section).forEach(([key, item]) => {
                    const selectedValues = responses.estiloVidaLaboral[key]
                    if (selectedValues && selectedValues.length > 0) {
                        estiloVidaJson[item.label] = selectedValues
                    }
                })
            })

            if (Object.keys(estiloVidaJson).length > 0) {
                formattedResponses.push({
                    questionNumber,
                    question: "Explorando tu Estilo de Vida Laboral",
                    responseText: JSON.stringify(estiloVidaJson)
                })
            }

            await formHelpers.saveFormData(SECTION_IDS.LIFESTYLE, formattedResponses, {
                totalSections: sections.length,
                section: "estilo-vida"
            })
            setAssessmentCompleted("estilo-vida")
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
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Header */}
                <Card
                    className="border-none bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white shadow-lg">
                    <h1 className="text-2xl font-bold">Estilo de Vida</h1>
                    <p className="mt-1 text-amber-100">Explora tus preferencias y estilo de vida laboral</p>
                    <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span>Sección {currentSection + 1} de {sections.length}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                            <div
                                className="h-full rounded-full bg-white transition-all duration-300"
                                style={{width: `${progress}%`}}
                            />
                        </div>
                    </div>
                </Card>

                {/* Section Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {sections.map((section, index) => (
                        <Button
                            key={section.id}
                            variant={currentSection === index ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentSection(index)}
                            className="whitespace-nowrap"
                        >
                            {index + 1}. {section.title}
                        </Button>
                    ))}
                </div>

                {/* Content */}
                {currentSection === 0 && (
                    <ReconociendoInteresesSection responses={responses} setResponses={setResponses}/>
                )}
                {currentSection === 1 && (
                    <DesiderativoOcupacionalSection responses={responses} setResponses={setResponses}/>
                )}
                {currentSection === 2 && (
                    <EstiloVidaLaboralSection responses={responses} setResponses={setResponses}/>
                )}

                {/* Navigation */}
                <Card className="border-none bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            disabled={currentSection === 0}
                            onClick={() => setCurrentSection((p) => p - 1)}
                        >
                            ← Anterior
                        </Button>
                        {currentSection < sections.length - 1 ? (
                            <Button
                                onClick={() => setCurrentSection((p) => p + 1)}
                                disabled={!isSectionComplete(currentSection)}
                            >
                                Siguiente →
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSave}
                                disabled={!isFormComplete()}
                                className="bg-gradient-to-r from-amber-600 to-orange-600"
                            >
                                Guardar y Finalizar
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </>
    )
}

function ReconociendoInteresesSection({
                                          responses,
                                          setResponses,
                                      }: {
    responses: EstiloVidaResponse
    setResponses: React.Dispatch<React.SetStateAction<EstiloVidaResponse>>
}) {
    const [currentSubsection, setCurrentSubsection] = useState(0)
    const subsections = Object.entries(estiloVidaData.reconociendoIntereses)

    const handleInputChange = (key: string, index: number, value: string) => {
        setResponses((prev) => {
            const newArray = [...prev.reconociendoIntereses[key as keyof typeof prev.reconociendoIntereses]]
            newArray[index] = value
            return {
                ...prev,
                reconociendoIntereses: {
                    ...prev.reconociendoIntereses,
                    [key]: newArray,
                },
            }
        })
    }

    return (
        <div className="space-y-6">
            {subsections.map(([key, data]) => {
                const currentValues = responses.reconociendoIntereses[key as keyof typeof responses.reconociendoIntereses]

                return (
                    <Card key={key} className="border-none bg-card p-6 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">{data.label}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{data.description}</p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {Array.from({length: data.slots}).map((_, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span className="w-6 text-sm font-medium text-muted-foreground">
                                            {String.fromCharCode(97 + index)}.
                                        </span>
                                        <Input
                                            value={currentValues[index] || ""}
                                            onChange={(e) => handleInputChange(key, index, e.target.value)}
                                            placeholder={`Item ${index + 1}`}
                                            className="flex-1"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}


function DesiderativoOcupacionalSection({
                                            responses,
                                            setResponses,
                                        }: {
    responses: EstiloVidaResponse
    setResponses: React.Dispatch<React.SetStateAction<EstiloVidaResponse>>
}) {
    const handleChange = (
        type: "preferencias" | "rechazos",
        index: number,
        field: "carrera" | "porque",
        value: string
    ) => {
        setResponses((prev) => {
            const newArray = [...prev.desiderativoOcupacional[type]]
            newArray[index] = {...newArray[index], [field]: value}
            return {
                ...prev,
                desiderativoOcupacional: {
                    ...prev.desiderativoOcupacional,
                    [type]: newArray,
                },
            }
        })
    }

    return (
        <div className="space-y-4">
            <Card className="border-none bg-card p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-green-600">
                            {estiloVidaData.desiderativoOcupacional.preferencias.label}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {estiloVidaData.desiderativoOcupacional.preferencias.description}
                        </p>
                    </div>

                    {
                        responses.desiderativoOcupacional.preferencias.map((item, index) => (
                            <div key={index} className="space-y-2 rounded-lg border p-4">
                                <div className="flex items-center gap-2">
                <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                  {index + 1}
                </span>
                                    <Label className="text-sm font-medium">Carrera/Ocupación:</Label>
                                </div>
                                <Input
                                    value={item.carrera}
                                    onChange={(e) => handleChange("preferencias", index, "carrera", e.target.value)}
                                    placeholder="Escribe la carrera u ocupación"
                                />
                                <Label className="text-sm font-medium">¿Por qué?</Label>
                                <Textarea
                                    value={item.porque}
                                    onChange={(e) => handleChange("preferencias", index, "porque", e.target.value)}
                                    placeholder="Explica por qué te gusta"
                                    className="min-h-[80px]"
                                />
                            </div>
                        ))
                    }
                </div>
            </Card>

            <Card className="border-none bg-card p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-red-600">
                            {estiloVidaData.desiderativoOcupacional.rechazos.label}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {estiloVidaData.desiderativoOcupacional.rechazos.description}
                        </p>
                    </div>

                    {responses.desiderativoOcupacional.rechazos.map((item, index) => (
                        <div key={index} className="space-y-2 rounded-lg border p-4">
                            <div className="flex items-center gap-2">
                <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                  {index + 1}
                </span>
                                <Label className="text-sm font-medium">Carrera/Ocupación:</Label>
                            </div>
                            <Input
                                value={item.carrera}
                                onChange={(e) => handleChange("rechazos", index, "carrera", e.target.value)}
                                placeholder="Escribe la carrera u ocupación"
                            />
                            <Label className="text-sm font-medium">¿Por qué?</Label>
                            <Textarea
                                value={item.porque}
                                onChange={(e) => handleChange("rechazos", index, "porque", e.target.value)}
                                placeholder="Explica por qué no te gusta"
                                className="min-h-[80px]"
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

function EstiloVidaLaboralSection({
                                      responses,
                                      setResponses,
                                  }: {
    responses: EstiloVidaResponse
    setResponses: React.Dispatch<React.SetStateAction<EstiloVidaResponse>>
}) {
    const [currentSubsection, setCurrentSubsection] = useState(0)
    const subsections = [
        {
            id: "identidadRechazo",
            title: "A. Identidad y Rechazo",
            data: estiloVidaData.estiloVidaLaboral.identidadRechazo
        },
        {
            id: "valoresRelaciones",
            title: "B. Valores y Relaciones",
            data: estiloVidaData.estiloVidaLaboral.valoresRelaciones
        },
        {
            id: "ritmoOrganizacion",
            title: "C. Ritmo y Organización",
            data: estiloVidaData.estiloVidaLaboral.ritmoOrganizacion
        },
        {
            id: "lugarEntornoEquilibrio",
            title: "D. Lugar, Entorno y Equilibrio",
            data: estiloVidaData.estiloVidaLaboral.lugarEntornoEquilibrio
        },
    ]

    const handleToggle = (key: string, value: string) => {
        setResponses((prev) => {
            const current = prev.estiloVidaLaboral[key] || []
            const newValues = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value]
            return {
                ...prev,
                estiloVidaLaboral: {
                    ...prev.estiloVidaLaboral,
                    [key]: newValues,
                },
            }
        })
    }

    const currentSub = subsections[currentSubsection]

    return (
        <div className="space-y-4">
            <Card className="border-none bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">{currentSub.title}</h3>
                <div className="space-y-6">
                    <div className="mb-6">
                        <p className="text-sm text-muted-foreground">
                            Marcá con una X o resaltá las opciones con las que te identificás.
                        </p>
                    </div>

                    {subsections.map((subsection) => (
                        <Card key={subsection.id} className="border-none bg-card p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold">{subsection.title}</h3>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {Object.entries(subsection.data).map(([key, item]) => (
                                    <div key={key} className="space-y-3">
                                        <Label className="text-sm font-semibold">{item.label}</Label>
                                        <div className="space-y-2">
                                            {item.options.map((option) => (
                                                <div
                                                    key={option}
                                                    className={`flex items-center space-x-2 rounded-lg border p-3 transition-colors cursor-pointer ${
                                                        responses.estiloVidaLaboral[key]?.includes(option)
                                                            ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                                                            : "hover:bg-secondary/50"
                                                    }`}
                                                    onClick={() => handleToggle(key, option)}
                                                >
                                                    <Checkbox
                                                        checked={responses.estiloVidaLaboral[key]?.includes(option) || false}
                                                        onCheckedChange={() => handleToggle(key, option)}
                                                    />
                                                    <span className="text-sm">{option}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
