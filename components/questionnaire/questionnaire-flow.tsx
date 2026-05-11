"use client"

import { useState } from "react"
import { WelcomeScreen } from "./welcome-screen"
import { PersonalDataForm, type PersonalData } from "./personal-data"
import { CareerStatus } from "./career-status"
import { CareerChangeQuestions } from "./career-change-questions"
import { InitialQuestion } from "./initial-question"
import { CareerInput } from "./career-input"
import { PersonaValidator } from "./persona-validator"
import type { CareerCount, UserPersona } from "@/types/questionnaire"
import { setUserName } from "@/lib/questionnaire-storage"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"

// Function to set current section in localStorage
const setSectionId = (sectionId: number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sectionId', sectionId.toString())
  }
}
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface QuestionnaireFlowProps {
  onComplete: (persona: UserPersona) => void
  sessionId: string
}

type Step = "welcome" | "personalData" | "careerStatus" | "careerChangeQuestions" | "initial" | "careerInput" | "validation" | "restart"

export function QuestionnaireFlow({ onComplete, sessionId }: QuestionnaireFlowProps) {
  const [step, setStep] = useState<Step>("welcome")
  const [personalData, setPersonalData] = useState<PersonalData | null>(null)
  const [careerStatus, setCareerStatus] = useState<"first" | "change" | null>(null)

  const [careerChangeData, setCareerChangeData] = useState<{
    previousCareer: string
    duration: string
    enrollmentReason: string
    quitReason: string
    hatedActivities: string[]
    likedSomething: string
    likedDetail?: string
    nonNegotiable: string
  } | null>(null)

  const [selectedCount, setSelectedCount] = useState<CareerCount | null>(null)
  const [userCareers, setUserCareers] = useState<string[]>([])
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0)
  const [availablePersonas, setAvailablePersonas] = useState<UserPersona[]>([])

  const handlePersonalDataComplete = (data: PersonalData) => {
    setPersonalData(data)
    setUserName(data.firstName, data.lastName)
    setStep("careerStatus")
  }

  const handleCareerStatusSelect = (status: "first" | "change") => {
    setCareerStatus(status)
    if (status === "first") {
      setStep("initial")
    } else {
      setStep("careerChangeQuestions")
    }
  }

  const handleCareerChangeComplete = (data: {
    previousCareer: string
    duration: string
    enrollmentReason: string
    quitReason: string
    hatedActivities: string[]
    likedSomething: string
    likedDetail?: string
    nonNegotiable: string
  }) => {
    setCareerChangeData(data)
    setStep("initial")
  }

  const allPersonas: UserPersona[] = [
    "buscador",
    "multipotencial",
    "analitico",
    "practico",
    "determinado",
    "enfocado",
    "estratega",
    "reinventado",
  ]

  const handleCountSelect = (count: CareerCount) => {
    setSelectedCount(count)
    if (count === "0") {
      setAvailablePersonas(allPersonas)
      setStep("validation")
    } else {
      setStep("careerInput")
    }
  }
  //  const handleCountSelect = (count: CareerCount) => {
    //     setSelectedCount(count)
    //     if (count === "0") {
    //       const personas = careerCountToPersonas[count]
    //       setAvailablePersonas(personas)
    //       setCurrentPersonaIndex(0)
    //       setStep("validation")
    //     } else {
    //       setStep("careerInput")
    //     }
    //   }

  //     const handleCareerSubmit = (careers: string[]) => {
    //     setUserCareers(careers)
    //     const personas = careerCountToPersonas[selectedCount!]
    //     setAvailablePersonas(personas)
    //     setCurrentPersonaIndex(0)
    //     setStep("validation")
    //   }
  const handleCareerSubmit = (careers: string[]) => {
    setUserCareers(careers)
    setAvailablePersonas(allPersonas)
    setStep("validation")
  }

  //  const handlePersonaConfirm = () => {
    //     const confirmedPersona = availablePersonas[currentPersonaIndex]
    //     onComplete(confirmedPersona)
    //   }
  const handlePersonaConfirm = (persona: UserPersona) => {
    onComplete(persona)
  }

  const handleNoneMatch = () => {
    setStep("restart")
  }

  //  const handlePersonaReject = () => {
    //     if (currentPersonaIndex < availablePersonas.length - 1) {
    //       setCurrentPersonaIndex(currentPersonaIndex + 1)
    //     } else {
    //       setStep("restart")
    //     }
    //   }
  const handleRestart = () => {
    setCareerStatus(null)
    setCareerChangeData(null)
    setSelectedCount(null)
    setUserCareers([])
    setCurrentPersonaIndex(0)
    setAvailablePersonas([])
    setStep("careerStatus")
  }

  if (step === "welcome") {
    setSectionId(SECTION_IDS.BRAVITO)
    return <WelcomeScreen onStart={() => setStep("personalData")} />
  }

  if (step === "personalData") {
    setSectionId(SECTION_IDS.BRAVITO)
    return <PersonalDataForm onComplete={handlePersonalDataComplete} sessionId={sessionId} />
  }

  if (step === "careerStatus") {
    setSectionId(SECTION_IDS.BRAVITO)
    return <CareerStatus onSelect={handleCareerStatusSelect} />
  }

  if (step === "careerChangeQuestions") {
    setSectionId(SECTION_IDS.BRAVITO)
    return <CareerChangeQuestions onComplete={handleCareerChangeComplete} />
  }

  if (step === "initial") {
    setSectionId(SECTION_IDS.BRAVITO)
    return <InitialQuestion onSelect={handleCountSelect} />
  }

  if (step === "careerInput" && selectedCount) {
    setSectionId(SECTION_IDS.BRAVITO)
    return <CareerInput careerCount={selectedCount} onSubmit={handleCareerSubmit} />
  }

  if (step === "restart") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-6">
        <Card className="w-full max-w-2xl p-8 sm:p-12">
          <div className="space-y-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <RotateCcw className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">
                Ninguna descripción pareció encajar
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Parece que ninguna de estas descripciones encaja con tu situación actual. Probablemente la cantidad de
                carreras que mencionaste no refleja del todo tu realidad.
              </p>
              <p className="text-base text-muted-foreground text-pretty">
                Empecemos de nuevo para ajustar mejor la puntería.
              </p>
            </div>
            <Button size="lg" onClick={handleRestart} className="gap-2">
              <RotateCcw className="h-5 w-5" />
              Empezar de nuevo
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  setSectionId(SECTION_IDS.BRAVITO)
  return <PersonaValidator personas={availablePersonas} onConfirm={handlePersonaConfirm} onNoneMatch={handleNoneMatch} />
}

//  const currentPersona = availablePersonas[currentPersonaIndex]
//
//   return <PersonaValidator persona={currentPersona} onConfirm={handlePersonaConfirm} onReject={handlePersonaReject} />
// }