"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type NavSection = {
  id: string
  label: string
  subsections?: { id: string; label: string }[]
}

const sections: NavSection[] = [
  {
    id: "persona",
    label: "Persona",
    subsections: [
      { id: "estratega-silencioso", label: "El estratega silencioso" },
      { id: "modelo-holland", label: "Modelo Holland RIASEC" },
      { id: "fortalezas-clave", label: "Fortalezas Clave" },
      { id: "intereses-motivaciones", label: "Intereses y Motivaciones" },
      { id: "estilo-trabajo", label: "Estilo de aprendizaje y trabajo" },
      { id: "mapa-compatibilidad", label: "Mapa de Compatibilidad Profesional" },
    ],
  },
  {
    id: "carreras",
    label: "Carreras",
    subsections: [
      { id: "carreras-recomendadas", label: "Carreras recomendadas" },
      { id: "vida-universitaria", label: "Vida universitaria y empleabilidad" },
      { id: "analisis-comparativo", label: "Análisis comparativo y ajuste" },
      { id: "matriz-decision", label: "Matriz de decisión triple impacto" },
      { id: "gap-habilidades", label: "Gap de habilidades" },
      { id: "pros-contras", label: "Tabla de pros y contras" },
    ],
  },
  {
    id: "universidades",
    label: "Universidades",
    subsections: [
      { id: "alternativas-universidades", label: "Alternativas de universidades" },
      { id: "metodologia-universitaria", label: "Características de la metodología universitaria" },
    ],
  },
  {
    id: "ambiente-laboral",
    label: "Ambiente Laboral",
    subsections: [
      { id: "ascenso-salarial", label: "Ascenso Salarial" },
      { id: "calor-geografico", label: "Calor Geográfico Salarial" },
      { id: "contexto-tendencias", label: "Contexto y tendencias del mundo" },
      { id: "mapa-fuerzas", label: "Mapa de Fuerzas" },
      { id: "vector-crecimiento", label: "Vector de crecimiento" },
      { id: "matriz-habilidades", label: "Matriz de habilidades de supervivencia" },
      { id: "radar-profesiones", label: "Radar de profesiones híbridas" },
      { id: "testimonios-mundo", label: "Testimonios del mundo" },
      { id: "stack-conocimientos", label: "Stack de conocimientos necesarios" },
      { id: "multiplicador-valor", label: "Multiplicador de valor" },
    ],
  },
  {
    id: "herramientas",
    label: "Herramientas útiles",
    subsections: [
      { id: "herramientas-recursos", label: "Herramientas y recursos recomendados" },
      { id: "ruta-aprendizaje", label: "Ruta de aprendizaje paralelo MOOCs" },
      { id: "mapa-networking", label: "Mapa de red de networking" },
      { id: "materiales-consulta", label: "Materiales de consulta rápida" },
    ],
  },
]

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState("")
  const [expandedSections, setExpandedSections] = useState<string[]>(["persona"])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)

      section.subsections?.forEach((sub) => {
        const subEl = document.getElementById(sub.id)
        if (subEl) observer.observe(subEl)
      })
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <nav className="sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Navegación</h2>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => {
                scrollToSection(section.id)
                toggleSection(section.id)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                activeSection === section.id ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
              )}
            >
              {section.label}
              {section.subsections && (
                <svg
                  className={cn("h-4 w-4 transition-transform", expandedSections.includes(section.id) && "rotate-180")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            {section.subsections && expandedSections.includes(section.id) && (
              <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                {section.subsections.map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => scrollToSection(sub.id)}
                      className={cn(
                        "w-full rounded-lg px-3 py-1.5 text-left text-xs transition-colors",
                        activeSection === sub.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {sub.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
