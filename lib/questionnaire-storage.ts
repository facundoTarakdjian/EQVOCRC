export function setQuestionnaireCompleted() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("questionnaireCompleted", "true")
  }
}

export function hasCompletedQuestionnaire(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("questionnaireCompleted") === "true"
  }
  return false
}

export function resetQuestionnaire() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("questionnaireCompleted")
    sessionStorage.removeItem("userName")
  }
}

// Assessment completion tracking
type AssessmentType = "mips" | "riasec" | "herrmann" | "gardner" | "proyectivas" | "autodescubrimiento" | "estilo-vida" | "vision-futuro" | "arbol-genealogico" | "universidad" | "ippr" | "entrevista-pautada" | "cumo" | "kuder" | "encuestas-360"

export function setAssessmentCompleted(assessmentType: AssessmentType) {
  if (typeof window !== "undefined") {
    localStorage.setItem(`${assessmentType}_completed`, "true")
  }
}

export function hasCompletedAssessment(assessmentType: AssessmentType): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(`${assessmentType}_completed`) === "true"
  }
  return false
}

export function resetAssessment(assessmentType: AssessmentType) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(`${assessmentType}_completed`)
  }
}

export function getAllCompletedAssessments(): AssessmentType[] {
  if (typeof window === "undefined") return []

  const assessmentTypes: AssessmentType[] = [
    "mips", "riasec", "herrmann", "gardner", "proyectivas",
    "autodescubrimiento", "estilo-vida", "vision-futuro",
    "arbol-genealogico", "universidad", "ippr"
  ]

  return assessmentTypes.filter(type => hasCompletedAssessment(type))
}

export function getCompletionStats() {
  const allAssessments: AssessmentType[] = [
    "mips", "riasec", "herrmann", "gardner", "proyectivas",
    "autodescubrimiento", "estilo-vida", "vision-futuro",
    "arbol-genealogico", "universidad", "ippr"
  ]

  const completed = getAllCompletedAssessments()

  return {
    completed: completed.length,
    total: allAssessments.length,
    completedAssessments: completed
  }
}

export function setUserName(firstName: string, lastName: string) {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("userName", `${firstName} ${lastName}`)
    }
}

export function getUserName(): string {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("userName") || ""
    }
    return ""
}

