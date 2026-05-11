"use client"

import { AffinityGauge } from "./affinity-gauge"
import { ImpactBubbles } from "./impact-bubbles"
import { SkillGapRadar } from "./skill-gap-radar"
import { ProsConsTable } from "./pros-cons-table"

export function ComparativeAnalysis() {
  return (
    <div className="mt-16">
      <div className="mb-12">
        <h2 className="mb-2 text-3xl font-bold text-zinc-900">Análisis Comparativo y Ajuste</h2>
        <p className="text-zinc-600">Decisiones basadas en datos para tu futuro</p>
      </div>

      {/* Affinity Gauge */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Afinímetro de Precisión</h3>
        <p className="mb-6 text-zinc-600">Nivel de encaje final.</p>
        <AffinityGauge />
      </div>

      {/* Impact Bubbles */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Matriz de Decisión "Triple Impacto"</h3>
        <p className="mb-6 text-zinc-600">Dónde poner la ficha.</p>
        <ImpactBubbles />
      </div>

      {/* Skill Gap */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Gap de Habilidades</h3>
        <p className="mb-6 text-zinc-600">Qué te falta para llegar.</p>
        <SkillGapRadar />
      </div>

      {/* Pros Cons */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Tabla de Pros y Contras</h3>
        <p className="mb-6 text-zinc-600">Comparación de alta densidad.</p>
        <ProsConsTable />
      </div>

      {/* Final Message */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
        <p className="text-lg leading-relaxed">
          "Lucas, los datos no mienten. Tu perfil C-I tiene un hogar natural en la tecnología de calidad (QA). Es el
          equilibrio perfecto entre tu necesidad de orden, tu talento analítico y tu deseo de seguridad financiera.
          Tenés el mapa, el vehículo y las herramientas. Ahora solo falta poner primera."
        </p>
      </div>
    </div>
  )
}
