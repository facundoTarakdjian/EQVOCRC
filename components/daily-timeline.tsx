"use client"

import { useState } from "react"

export function DailyTimeline() {
  const [scenario, setScenario] = useState<"normal" | "exams">("normal")

  const normalSchedule = [
    {
      start: 8,
      end: 14,
      label: "Trabajo Remoto",
      color: "bg-emerald-500",
      description: "Part-time administrativo o QA",
    },
    { start: 14, end: 15, label: "Almuerzo", color: "bg-gray-400", description: "Desconexión" },
    { start: 15, end: 18, label: "Estudio Profundo", color: "bg-orange-500", description: "Clases grabadas, TPs" },
    { start: 18, end: 20, label: "Tiempo Libre", color: "bg-gray-600", description: "Gaming, descanso" },
    { start: 20, end: 22, label: "Cursada/Cena", color: "bg-blue-600", description: "Clases sincrónicas" },
  ]

  const examSchedule = [
    {
      start: 8,
      end: 14,
      label: "Trabajo Remoto",
      color: "bg-emerald-500",
      description: "Part-time administrativo o QA",
    },
    { start: 14, end: 15, label: "Almuerzo", color: "bg-gray-400", description: "Desconexión" },
    { start: 15, end: 20, label: "Estudio Intensivo", color: "bg-orange-500", description: "Preparación de parciales" },
    { start: 20, end: 22, label: "Cena/Repaso", color: "bg-blue-600", description: "Revisión final" },
  ]

  const schedule = scenario === "normal" ? normalSchedule : examSchedule

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Un Día en tu Vida</h3>
            <p className="mt-2 text-sm text-muted-foreground">La verdad de tu agenda diaria</p>
          </div>

          <div className="flex gap-2 rounded-lg bg-muted p-1">
            <button
              onClick={() => setScenario("normal")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                scenario === "normal"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Semana Normal
            </button>
            <button
              onClick={() => setScenario("exams")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                scenario === "exams"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Semana de Parciales
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((block, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-24 shrink-0 font-mono text-sm text-muted-foreground">
              {String(block.start).padStart(2, "0")}:00 - {String(block.end).padStart(2, "0")}:00
            </div>
            <div className="flex-1">
              <div className={`rounded-lg ${block.color} p-4 text-white`}>
                <div className="font-semibold">{block.label}</div>
                <div className="mt-1 text-sm opacity-90">{block.description}</div>
              </div>
            </div>
            <div className="w-16 text-right font-mono text-sm font-bold text-muted-foreground">
              {block.end - block.start}hs
            </div>
          </div>
        ))}
      </div>

      {scenario === "exams" && (
        <div className="mt-6 rounded-lg bg-orange-500/10 p-4 text-sm text-orange-600">
          El estudio se expande durante parciales, pero como sos organizado, no hay trasnoche desesperada.
        </div>
      )}
    </div>
  )
}
