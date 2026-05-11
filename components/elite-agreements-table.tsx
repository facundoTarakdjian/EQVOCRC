import { Card } from "@/components/ui/card"

const agreements = [
  {
    flag: "🇨🇦",
    university: "British Columbia Inst. of Tech (BCIT)",
    ranking: "Top 5 Tech Canadá",
    type: "🛠️ Pasantía Técnica",
    duration: "3 meses",
    reason: 'Enfoque 100% práctico ("Hands-on"). Canadá es uno de los países más seguros y ordenados del mundo.',
  },
  {
    flag: "🇬🇧",
    university: "University of Leeds",
    ranking: "Russell Group - UK",
    type: "📚 Semestre Académico",
    duration: "6 meses",
    reason: "Bibliotecas históricas silenciosas y un sistema educativo donde la puntualidad y la norma son sagradas.",
  },
  {
    flag: "🇪🇸",
    university: "Univ. Politécnica de Catalunya (UPC)",
    ranking: "Top Tech Europa Sur",
    type: "🎓 Doble Titulación",
    duration: "1 año",
    reason: "Uno de los centros de Supercomputación más grandes de Europa. Entorno técnico de alto nivel en español.",
  },
]

export function EliteAgreementsTable() {
  return (
    <Card className="border-border/50 bg-card/50 p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-foreground">Convenios de Élite</h3>
        <p className="mt-2 text-muted-foreground">Opciones académicas que validan tu búsqueda de calidad</p>
      </div>

      <div className="space-y-4">
        {agreements.map((agreement, index) => (
          <div
            key={index}
            className="rounded-lg border border-border/50 bg-card p-6 transition-all hover:border-border hover:shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-[auto_1fr_auto_1fr]">
              {/* Flag and University */}
              <div className="flex items-center gap-3 md:col-span-2">
                <div className="text-3xl">{agreement.flag}</div>
                <div>
                  <h4 className="font-semibold text-foreground">{agreement.university}</h4>
                  <p className="text-sm text-muted-foreground">{agreement.ranking}</p>
                </div>
              </div>

              {/* Type and Duration */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipo de Convenio</p>
                <p className="mt-1 text-sm text-foreground">{agreement.type}</p>
                <p className="text-xs text-muted-foreground">{agreement.duration}</p>
              </div>

              {/* Reason */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Por qué es para vos</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{agreement.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
