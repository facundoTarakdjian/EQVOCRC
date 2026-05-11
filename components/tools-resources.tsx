"use client"

import { ProductivityBento } from "./productivity-bento"
import { LearningPathTable } from "./learning-path-table"
import { SkillStackRings } from "./skill-stack-rings"
import { NetworkingMap } from "./networking-map"
import { FlipCards } from "./flip-cards"

export function ToolsResources() {
  return (
    <div className="mt-16">
      <div className="mb-12">
        <h2 className="mb-2 text-3xl font-bold text-zinc-900">Herramientas y Recursos Recomendados</h2>
        <p className="text-zinc-600">Tu arsenal digital para el éxito académico y profesional</p>
      </div>

      {/* Bento Grid */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">El Bento Grid de Productividad</h3>
        <p className="mb-6 text-zinc-600">Tu ecosistema digital de orden.</p>
        <ProductivityBento />
      </div>

      {/* Learning Path */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Ruta de Aprendizaje Paralelo (MOOCs)</h3>
        <p className="mb-6 text-zinc-600">Cursos que validan tu perfil antes de recibirte.</p>
        <LearningPathTable />
      </div>

      {/* Skill Stack */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Stack de Software Técnico</h3>
        <p className="mb-6 text-zinc-600">Qué tenés que instalar en tu cerebro.</p>
        <SkillStackRings />
      </div>

      {/* Networking */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Mapa de Red de Networking</h3>
        <p className="mb-6 text-zinc-600">Conectar sin exponerse.</p>
        <NetworkingMap />
      </div>

      {/* Reading Materials */}
      <div className="mb-16">
        <h3 className="mb-6 text-xl font-bold text-zinc-900">Materiales de Consulta Rápida</h3>
        <p className="mb-6 text-zinc-600">Lectura para tu mente lógica.</p>
        <FlipCards />
      </div>
    </div>
  )
}
