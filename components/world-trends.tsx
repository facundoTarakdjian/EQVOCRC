import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, Cloud, Scale, TrendingUp, TrendingDown, Sparkles } from "lucide-react"

interface TechForce {
  icon: React.ReactNode
  label: string
  strength: "strong" | "medium" | "structural" | "emerging"
  reason: string
}

interface Skill {
  label: string
  trend: "decline" | "emerging"
  description: string
}

interface CareerEvolution {
  stage: string
  year: string
  roles: string[]
}

const techForces: TechForce[] = [
  {
    icon: <Brain className="h-6 w-6" />,
    label: "Inteligencia Artificial Generativa",
    strength: "strong",
    reason: "La IA genera código, pero alucina. Lucas es quien audita que la IA diga la verdad.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    label: "Ciberseguridad (Zero Trust)",
    strength: "medium",
    reason: "La paranoia y precaución de Lucas son activos vitales para proteger sistemas.",
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    label: "Cloud Computing",
    strength: "structural",
    reason: "Los archivos y datos ya no están en bibliotecas físicas, sino en la nube.",
  },
  {
    icon: <Scale className="h-6 w-6" />,
    label: "Compliance & Ética",
    strength: "emerging",
    reason: "Las empresas necesitan cumplir leyes de datos. El perfil normativo de Lucas es clave aquí.",
  },
]

const skills: Skill[] = [
  {
    label: "Carga manual de datos (Data Entry)",
    trend: "decline",
    description: "Automatizable",
  },
  {
    label: "Limpieza estratégica de datos (Data Curation)",
    trend: "emerging",
    description: "Humano/Crítico",
  },
  {
    label: "Ejecución de test repetitivos",
    trend: "decline",
    description: "Automatizable",
  },
  {
    label: "Diseño de escenarios de prueba (Creatividad lógica)",
    trend: "emerging",
    description: "Humano/Crítico",
  },
  {
    label: "Memorización de sintaxis",
    trend: "decline",
    description: "Automatizable",
  },
  {
    label: 'Lógica de programación (Entender el "por qué")',
    trend: "emerging",
    description: "Humano/Crítico",
  },
  {
    label: "Gestión de archivos físicos",
    trend: "decline",
    description: "Automatizable",
  },
  {
    label: "Arquitectura de información digital",
    trend: "emerging",
    description: "Humano/Crítico",
  },
]

const careerEvolution: CareerEvolution[] = [
  {
    stage: "HOY - 2025",
    year: "2025",
    roles: ["Tester QA Manual", "Analista de Datos Junior", "Asistente de Archivo"],
  },
  {
    stage: "MAÑANA - 2028",
    year: "2028",
    roles: [
      "QA Automation Engineer (Escribir scripts que testean solos)",
      "Data Steward (El 'mayordomo' de los datos: cuida su calidad y seguridad)",
    ],
  },
  {
    stage: "FUTURO - 2032+",
    year: "2032+",
    roles: [
      "Auditor de Algoritmos (Verificar que una IA no discrimine)",
      "Curador de Memoria Digital (Preservación de patrimonio en el Metaverso/Web3)",
      "Analista Forense de Datos (Investigación de errores post-incidente)",
    ],
  },
]

export function WorldTrends() {
  return (
    <section className="mt-16">
      {/* Dark Mode Section */}
      <div className="rounded-3xl bg-slate-950 p-8 shadow-xl lg:p-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Contexto y Tendencias del Mundo</h2>
          <p className="mt-2 text-slate-300">El ecosistema donde Lucas orbitará.</p>
        </div>

        {/* Fuerzas Tecnológicas */}
        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-white">Mapa de Fuerzas Tecnológicas</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {techForces.map((force, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-900 p-6"
              >
                <div
                  className={`absolute right-0 top-0 h-32 w-32 opacity-10 ${
                    force.strength === "strong"
                      ? "bg-cyan-500"
                      : force.strength === "medium"
                        ? "bg-blue-500"
                        : force.strength === "structural"
                          ? "bg-purple-500"
                          : "bg-pink-500"
                  } blur-3xl`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                      force.strength === "strong"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : force.strength === "medium"
                          ? "bg-blue-500/20 text-blue-400"
                          : force.strength === "structural"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-pink-500/20 text-pink-400"
                    }`}
                  >
                    {force.icon}
                  </div>
                  <h4 className="mb-2 font-semibold text-white">{force.label}</h4>
                  <p className="text-sm text-slate-400">{force.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vector de Crecimiento */}
        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-white">Vector de Crecimiento</h3>
          <div className="overflow-hidden rounded-xl border border-magenta-500/20 bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900 p-8">
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">2024 - Estabilidad actual</span>
                <span className="text-cyan-400">→</span>
                <span className="text-slate-400">2028 - Regulación de datos</span>
                <span className="text-magenta-400">→</span>
                <span className="text-slate-400">2035 - Auditores de Algoritmos</span>
              </div>
              <div className="h-24 w-full overflow-hidden rounded-lg bg-slate-800/50">
                <div className="h-full w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-magenta-600 opacity-60">
                  <svg className="h-full w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,80 Q100,70 200,40 T400,10" fill="none" stroke="white" strokeWidth="2" opacity="0.8" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-sm italic text-slate-300">
              "A medida que la automatización crece, el valor humano se desplaza de la 'creación' a la 'verificación'.
              Tu rol no desaparece, se vuelve el árbitro de la verdad."
            </p>
          </div>
        </div>

        {/* Habilidades de Supervivencia */}
        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-white">Matriz de Habilidades de Supervivencia</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-slate-500" />
                <h4 className="font-semibold text-slate-400">En Declive</h4>
                <Badge variant="outline" className="border-slate-600 text-slate-500">
                  Automatizable
                </Badge>
              </div>
              <ul className="space-y-2">
                {skills
                  .filter((s) => s.trend === "decline")
                  .map((skill, index) => (
                    <li key={index} className="text-sm text-slate-400 line-through opacity-60">
                      {skill.label}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/30 p-6">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                <h4 className="font-semibold text-cyan-400">Emergente</h4>
                <Badge className="border-cyan-500 bg-cyan-500/20 text-cyan-400">Humano/Crítico</Badge>
              </div>
              <ul className="space-y-2">
                {skills
                  .filter((s) => s.trend === "emerging")
                  .map((skill, index) => (
                    <li key={index} className="text-sm font-medium text-cyan-200">
                      {skill.label}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-sm italic text-slate-300">
            "Tu ventaja no es tipear rápido, es tu capacidad de entender la estructura lógica detrás del caos."
          </p>
        </div>

        {/* Radar de Profesiones Híbridas */}
        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-white">Radar de Profesiones Híbridas</h3>
          <p className="mb-6 text-sm text-slate-400">Tu carrera no es estática, es una evolución segura.</p>
          <div className="space-y-6">
            {careerEvolution.map((stage, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 ${
                  index === 0
                    ? "border-blue-500/30 bg-blue-950/30"
                    : index === 1
                      ? "border-purple-500/30 bg-purple-950/30"
                      : "border-magenta-500/30 bg-magenta-950/30"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                      index === 0
                        ? "bg-blue-500 text-white"
                        : index === 1
                          ? "bg-purple-500 text-white"
                          : "bg-magenta-500 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{stage.stage}</h4>
                    <p className="text-sm text-slate-400">{stage.year}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-13">
                  {stage.roles.map((role, roleIndex) => (
                    <li key={roleIndex} className="text-sm text-slate-300">
                      • {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Insights de Frontera */}
        <div className="rounded-xl border border-magenta-500/30 bg-gradient-to-br from-magenta-950/50 via-purple-950/50 to-cyan-950/50 p-8">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-magenta-400" />
            <h3 className="text-2xl font-bold text-white">THE REVENGE OF THE METHODICAL</h3>
          </div>
          <p className="mb-6 text-lg font-semibold text-cyan-200">La Venganza del Metódico</p>
          <p className="mb-8 text-slate-300">
            En un mundo saturado de contenido generado artificialmente, el activo más escaso será la VERDAD.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  ◆
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-white">El fin del "Generalista Ruidoso"</h4>
                <p className="text-sm text-slate-300">
                  El mercado laboral futuro castigará a quienes hacen "un poco de todo" mal, y premiará a los
                  especialistas obsesivos que aseguran que los sistemas funcionen sin errores.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                  ◆
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-white">Tu Rol como "Filtro Humano"</h4>
                <p className="text-sm text-slate-300">
                  La IA puede escribir un manual o un código en segundos, pero no tiene criterio de realidad. Vos sos el
                  filtro de seguridad. Sin tu "OK", nada sale a producción.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-magenta-500/20 text-magenta-400">
                  ◆
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-white">Seguridad a prueba de Crisis</h4>
                <p className="text-sm text-slate-300">
                  Mientras las áreas creativas sufren la disrupción, las áreas de Auditoría, Control y Calidad crecen.
                  Alguien tiene que vigilar a las máquinas. Ese sos vos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
