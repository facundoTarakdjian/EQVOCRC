import type React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Globe, Settings, Award, Building, Target, Zap, Home, BarChart } from "lucide-react"

interface ProfessionalProfile {
  name: string
  role: string
  company: string
  achievement: string
  initials: string
}

interface MethodologyData {
  name: string
  career: string
  theme: string
  methodology: {
    practice: number
    theory: number
    group: number
    practiceLabel: string
    theoryLabel: string
    groupLabel: string
  }
  effort: {
    level: number
    zone: string
    description: string
    insight: string
  }
  reputation: {
    level: number
    category: string
    insight: string
  }
  professionals: ProfessionalProfile[]
  attributes: Array<{
    icon: React.ReactNode
    label: string
    description: string
  }>
}

const methodologies: MethodologyData[] = [
  {
    name: "ISTEA",
    career: "Tecnología / QA",
    theme: "tech",
    methodology: {
      practice: 70,
      theory: 20,
      group: 10,
      practiceLabel: "Práctica de Laboratorio",
      theoryLabel: "Teoría de Fundamentos",
      groupLabel: "Proyectos Grupales Técnicos",
    },
    effort: {
      level: 75,
      zone: "Fluidez Técnica",
      description: "No requiere memorizar libros enteros, sino entender la lógica y practicarla.",
      insight:
        "Ideal para tu inteligencia Lógico-Matemática. La exigencia está en mantenerse actualizado, no en la complejidad académica.",
    },
    reputation: {
      level: 80,
      category: "Muy Alto en Nicho IT",
      insight:
        'Los reclutadores de tecnología valoran más lo que sabés hacer (Portafolio) que el nombre de la universidad. ISTEA tiene fama de sacar gente "lista para trabajar".',
    },
    professionals: [
      {
        name: "Martín L.",
        role: "QA Lead",
        company: "Mercado Libre",
        achievement: "Automatizó el sistema de pagos",
        initials: "ML",
      },
      {
        name: "Sofía R.",
        role: "Tester",
        company: "Globant",
        achievement: "Trabaja 100% remoto para proyectos en USA",
        initials: "SR",
      },
    ],
    attributes: [
      {
        icon: <Settings className="h-4 w-4" />,
        label: "Perfil Operativo",
        description: "Sabe usar las herramientas",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        label: "Metodología Ágil",
        description: "Entiende el ritmo de la industria",
      },
      {
        icon: <Target className="h-4 w-4" />,
        label: "Resolutivo",
        description: "Enfocado en solucionar problemas",
      },
    ],
  },
  {
    name: "IFTS N° 13",
    career: "Bibliotecología / Archivo",
    theme: "institutional",
    methodology: {
      practice: 50,
      theory: 40,
      group: 10,
      practiceLabel: "Normativa y Reglas",
      theoryLabel: "Procesamiento Técnico",
      groupLabel: "Humanidades",
    },
    effort: {
      level: 50,
      zone: "Constancia Estructurada",
      description: "Ritmo predecible y pausado. Exige precisión y memoria, no velocidad.",
      insight: "Perfecto para tu necesidad de seguridad. Las reglas no cambian sorpresivamente.",
    },
    reputation: {
      level: 100,
      category: "Referente Absoluto en el Estado",
      insight:
        "Es la institución más respetada para cargos en Bibliotecas Públicas, Museos y Archivos Gubernamentales. El título abre puertas institucionales.",
    },
    professionals: [
      {
        name: "Carlos M.",
        role: "Jefe de Archivo",
        company: "Banco Nación",
        achievement: "Digitalizó 100 años de historia",
        initials: "CM",
      },
      {
        name: "Ana G.",
        role: "Bibliotecaria Escolar",
        company: "Centro de Recursos",
        achievement: "Gestiona un centro de recursos en silencio y paz",
        initials: "AG",
      },
    ],
    attributes: [
      {
        icon: <FileText className="h-4 w-4" />,
        label: "Normativo",
        description: "Experto en reglas y clasificación",
      },
      {
        icon: <Building className="h-4 w-4" />,
        label: "Institucional",
        description: "Perfil formal y serio",
      },
      {
        icon: <Award className="h-4 w-4" />,
        label: "Detallista",
        description: "Obsesión por el orden",
      },
    ],
  },
  {
    name: "Universidad Siglo 21",
    career: "Modalidad Distancia",
    theme: "digital",
    methodology: {
      practice: 80,
      theory: 20,
      group: 0,
      practiceLabel: "Asincrónico / Plataforma",
      theoryLabel: "Evaluación Standard",
      groupLabel: "Exposición Oral",
    },
    effort: {
      level: 70,
      zone: "Autogestión Disciplinada",
      description: "La dificultad académica es moderada. El reto es organizarse solo (algo que vos hacés bien).",
      insight: "Elimina por completo el estrés social del aula presencial.",
    },
    reputation: {
      level: 60,
      category: "Masivo / Habilitante",
      insight:
        'Es un título oficial valioso para pasar filtros de RRHH en empresas grandes. Te da la "chapa" universitaria necesaria para ascender.',
    },
    professionals: [
      {
        name: "Lucas P.",
        role: "Analista de Datos Freelance",
        company: "Independiente",
        achievement: "Viaja mientras trabaja (Nómada Digital)",
        initials: "LP",
      },
      {
        name: "Julia T.",
        role: "Analista Funcional",
        company: "Aseguradora",
        achievement: "Trabaja para una aseguradora desde su casa",
        initials: "JT",
      },
    ],
    attributes: [
      {
        icon: <Globe className="h-4 w-4" />,
        label: "Digital Nativo",
        description: "Manejo total de entornos virtuales",
      },
      {
        icon: <Home className="h-4 w-4" />,
        label: "Autónomo",
        description: "No necesita supervisión constante",
      },
      {
        icon: <BarChart className="h-4 w-4" />,
        label: "Adaptable",
        description: "Acostumbrado a la tecnología",
      },
    ],
  },
]

export function UniversityMethodology() {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Características de la Metodología Universitaria
        </h2>
        <p className="mt-2 text-muted-foreground">
          Desmitificar la experiencia diaria. Para Lucas, buscamos entornos de Baja Incertidumbre y Alta Estructura.
        </p>
      </div>

      <div className="space-y-12">
        {methodologies.map((methodology, index) => (
          <div key={index} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground">{methodology.name}</h3>
              <p className="text-lg text-muted-foreground">{methodology.career}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* ADN Metodológico */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">ADN Metodológico</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{methodology.methodology.practiceLabel}</span>
                      <span className="font-medium text-foreground">{methodology.methodology.practice}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                        style={{ width: `${methodology.methodology.practice}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{methodology.methodology.theoryLabel}</span>
                      <span className="font-medium text-foreground">{methodology.methodology.theory}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        style={{ width: `${methodology.methodology.theory}%` }}
                      />
                    </div>
                  </div>

                  {methodology.methodology.group > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{methodology.methodology.groupLabel}</span>
                        <span className="font-medium text-foreground">{methodology.methodology.group}%</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-gradient-to-r from-slate-400 to-slate-500"
                          style={{ width: `${methodology.methodology.group}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm italic text-muted-foreground">
                  {methodology.theme === "tech" &&
                    'Metodología "Hands-on": escribís código y testeás software desde la primera semana. Poca teoría abstracta.'}
                  {methodology.theme === "institutional" &&
                    "Enfoque estructurado basado en estándares internacionales. El orden es la ley."}
                  {methodology.theme === "digital" &&
                    "El aula es tu computadora. Vos decidís cuándo leer y cuándo rendir. Cero improvisación."}
                </p>
              </div>

              {/* Esfuerzo y Fluidez */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Esfuerzo y Fluidez</h4>
                <div className="relative h-32">
                  <div className="absolute inset-0 flex items-end justify-center">
                    <div className="h-24 w-full overflow-hidden rounded-full bg-gradient-to-r from-red-100 via-yellow-100 to-green-100">
                      <div className="relative h-full">
                        <div
                          className="absolute bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg"
                          style={{
                            left: `calc(${methodology.effort.level}% - 1rem)`,
                          }}
                        >
                          <div className="h-3 w-3 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 rounded-xl bg-secondary/50 p-4">
                  <p className="font-medium text-foreground">{methodology.effort.zone}</p>
                  <p className="text-sm text-muted-foreground">{methodology.effort.description}</p>
                  <p className="text-sm font-medium text-primary">{methodology.effort.insight}</p>
                </div>
              </div>

              {/* Peso en el Mercado */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Peso en el Mercado</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{methodology.reputation.category}</span>
                    <span className="text-sm font-medium text-foreground">{methodology.reputation.level}%</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80"
                      style={{ width: `${methodology.reputation.level}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm italic text-muted-foreground">{methodology.reputation.insight}</p>
              </div>

              {/* Faros Profesionales */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Faros Profesionales</h4>
                <div className="space-y-3">
                  {methodology.professionals.map((prof, profIndex) => (
                    <div
                      key={profIndex}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
                    >
                      <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
                        <AvatarFallback>{prof.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">{prof.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {prof.role} en {prof.company}
                        </p>
                        <p className="text-xs italic text-primary">{prof.achievement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atributos del Egresado */}
              <div className="space-y-4 lg:col-span-2">
                <h4 className="font-semibold text-foreground">Atributos del Egresado</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  {methodology.attributes.map((attr, attrIndex) => (
                    <div
                      key={attrIndex}
                      className="flex flex-col items-start gap-2 rounded-xl border border-border bg-background p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {attr.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{attr.label}</p>
                        <p className="text-sm text-muted-foreground">{attr.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
