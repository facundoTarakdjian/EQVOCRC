"use client"

import { useState } from "react"

export function FlipCards() {
  const materials = [
    {
      title: "Hábitos Atómicos",
      author: "James Clear",
      description: "La biblia del sistema. Te enseña a mejorar un 1% cada día mediante procesos, no motivación.",
    },
    {
      title: "The Pragmatic Programmer",
      author: "El Programador Pragmático",
      description:
        "Consejos de oro sobre responsabilidad, entropía del software y cómo no dejar 'ventanas rotas' en tu código.",
    },
    {
      title: "Data Science Weekly",
      author: "Newsletter",
      description: "Un mail semanal con las novedades justas. Ideal para estar al día sin scrollear redes sociales.",
    },
  ]

  const [flipped, setFlipped] = useState<number[]>([])

  const toggleFlip = (index: number) => {
    setFlipped((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {materials.map((material, index) => (
        <div key={index} className="group h-64 cursor-pointer perspective-1000" onClick={() => toggleFlip(index)}>
          <div
            className={`relative h-full w-full transition-transform duration-500 preserve-3d ${
              flipped.includes(index) ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-2 inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
                    Click para leer
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{material.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{material.author}</p>
                </div>
                <div className="text-center text-xs text-zinc-500">Toca para voltear</div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-zinc-900 p-6">
              <div className="flex h-full flex-col justify-center">
                <p className="text-sm leading-relaxed text-zinc-300">{material.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
