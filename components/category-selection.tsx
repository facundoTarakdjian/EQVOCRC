"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, User, Globe } from "lucide-react"
import Link from "next/link"
import { UserHeader } from "@/components/user-header"
import { hasCompletedAssessment } from "@/lib/questionnaire-storage"

type Assessment = {
  id: string
  title: string
  subtitle: string
  description: string
  completed: boolean
}

type CategoryGroup = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  assessments: Assessment[]
}

interface CategorySelectionProps {
  userName?: string
}

export function CategorySelection({ userName = "" }: CategorySelectionProps) {
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([
    {
      id: "personalidad",
      name: "PERSONALIDAD",
      icon: <User className="h-5 w-5" />,
      color: "from-violet-500 to-purple-600",
      assessments: [
        {
          id: "entrevista-pautada",
          title: "Entrevista Pautada",
          subtitle: "HISTORIA Y PERFIL PERSONAL",
          description: "Contanos sobre tu historia escolar, intereses y cómo te imaginás el futuro.",
          completed: false,
        },
        {
          id: "ippr",
          title: "Intereses y Preferencias",
          subtitle: "IPPR",
          description: "12 campos temáticos: valorá actividades de cada área profesional y descubrí tus afinidades.",
          completed: false,
        },
        {
          id: "cumo",
          title: "Motivaciones Vocacionales",
          subtitle: "CUMO",
          description: "Descubrí qué motiva tu elección de carrera: satisfacción, futuro, altruismo, éxito o familia.",
          completed: false,
        },
        {
          id: "kuder",
          title: "Preferencias Ocupacionales",
          subtitle: "KUDER",
          description: "En cada grupo de actividades, elegí cuál te gustaría hacer MÁS y cuál MENOS.",
          completed: false,
        },
        {
          id: "riasec",
          title: "Intereses y Aptitudes",
          subtitle: "RIASEC - HOLLAND",
          description: "Tipologías vocacionales: Realista, Investigador, Artístico, Social, Emprendedor, Convencional.",
          completed: false,
        },
        {
          id: "gardner",
          title: "Inteligencias Múltiples",
          subtitle: "GARDNER",
          description: "Descubre tus fortalezas cognitivas.",
          completed: false,
        },
        {
          id: "arbol-genealogico",
          title: "Árbol Genealógico",
          subtitle: "CONTEXTO FAMILIAR",
          description: "Registra los estudios y ocupaciones de tu familia.",
          completed: false,
        },
      ],
    },
    {
      id: "perspectivas",
      name: "PERSPECTIVAS EXTERNAS",
      icon: <Globe className="h-5 w-5" />,
      color: "from-sky-500 to-blue-600",
      assessments: [
        {
          id: "encuestas-360",
          title: "Encuestas 360°",
          subtitle: "PERSPECTIVAS EXTERNAS",
          description: "Tu familia y amigos completan una encuesta breve sobre vos. Compartiles el link.",
          completed: false,
        },
      ],
    },
  ])

  useEffect(() => {
    setCategoryGroups(prevGroups =>
      prevGroups.map(group => ({
        ...group,
        assessments: group.assessments.map(assessment => ({
          ...assessment,
          completed: hasCompletedAssessment(assessment.id as any)
        }))
      }))
    )
  }, [])

  const categories = categoryGroups.flatMap((group) => group.assessments);

  const completedCount = categories.filter((c) => c.completed).length
  const totalCount = categories.length
  const progress = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <UserHeader userName={userName || "Usuario"} />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-lg text-muted-foreground text-pretty">
            Completa las siguientes secciones para descubrir tu perfil vocacional
          </p>

          {/* Progress Bar */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-primary">
                {completedCount} de {totalCount} completadas
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Groups */}
        <div className="space-y-10">
          {categoryGroups.map((group) => {
            const groupCompleted = group.assessments.filter((a) => a.completed).length
            const groupTotal = group.assessments.length
            
            return (
              <div key={group.id}>
                {/* Group Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${group.color} text-white`}>
                    {group.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{group.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {groupCompleted} de {groupTotal} completadas
                    </p>
                  </div>
                </div>

                {/* Assessments Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.assessments.map((assessment, index) => {
                    const CardContent = (
                      <Card className={`group relative h-full overflow-hidden border transition-all duration-300 ${
                        assessment.completed 
                          ? "border-accent bg-accent/5 cursor-not-allowed" 
                          : "cursor-pointer hover:scale-[1.02] hover:border-primary hover:shadow-lg"
                      }`}>
                        <div className="p-5">
                          {/* Status Icon */}
                          <div className="mb-3 flex items-start justify-between">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${group.color} text-white text-sm font-bold`}>
                              {index + 1}
                            </div>
                            {assessment.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-accent" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground/40" />
                            )}
                          </div>

                          {/* Title */}
                          <h3 className={`mb-1 text-base font-bold ${assessment.completed ? "text-muted-foreground" : "text-foreground"}`}>
                            {assessment.title}
                          </h3>

                          {/* Subtitle */}
                          <p className={`mb-2 text-xs font-medium ${assessment.completed ? "text-muted-foreground" : "text-primary"}`}>
                            {assessment.subtitle}
                          </p>

                          {/* Description */}
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {assessment.description}
                          </p>

                          {/* Footer */}
                          <div className="mt-3 flex items-center justify-end border-t border-border pt-3">
                            <span className={`text-xs font-semibold transition-colors ${
                              assessment.completed 
                                ? "text-accent" 
                                : "text-primary group-hover:text-accent"
                            }`}>
                              {assessment.completed ? "✓ Completado" : "Comenzar"}
                            </span>
                          </div>
                        </div>
                      </Card>
                    )

                    return (
                      <div key={assessment.id}>
                        {assessment.completed ? (
                          CardContent
                        ) : (
                          <Link href={`/assessment/${assessment.id}`}>
                            {CardContent}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Puedes completar las secciones en el orden que prefieras. Tu progreso se guarda automáticamente.
          </p>
          <Link href="/orientador" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors underline underline-offset-4">
            Vista orientador →
          </Link>
        </div>
      </div>
    </div>
  )
}
