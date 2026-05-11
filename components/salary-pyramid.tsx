"use client"

export function SalaryPyramid() {
  const levels = [
    {
      level: "SENIOR",
      subtitle: "La Maestría | 5+ Años",
      role: "QA Lead / Data Architect",
      salary: "ARS $3.000.000+ (o USD $2.500+)",
      reality: "Sueldos dolarizados trabajando desde Argentina. Libertad financiera.",
      color: "from-purple-500 to-purple-600",
    },
    {
      level: "SEMI-SENIOR",
      subtitle: "La Consolidación | 2-5 Años",
      role: "QA Automation / Analista de Datos",
      salary: "ARS $1.200.000 - $2.500.000",
      reality: "Capacidad de ahorro real. El inglés técnico marca la diferencia.",
      color: "from-blue-500 to-blue-600",
    },
    {
      level: "JUNIOR",
      subtitle: "El Inicio | 0-2 Años",
      role: "Tester Manual / Asistente de Datos",
      salary: "ARS $700.000 - $950.000",
      reality: "Alcanza para independizarse compartiendo o vivir cómodo con familia.",
      color: "from-teal-500 to-teal-600",
    },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">Ascenso Salarial</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Proyección realista de ingresos (Mercado IT/Admin Argentina 2025)
        </p>
      </div>

      <div className="space-y-4">
        {levels.map((level, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl transition-all hover:shadow-md"
            style={{
              marginLeft: `${index * 40}px`,
              marginRight: `${(2 - index) * 40}px`,
            }}
          >
            <div className={`bg-gradient-to-r ${level.color} p-6 text-white`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-mono text-sm font-bold opacity-90">Nivel {3 - index}</div>
                  <div className="mt-1 text-2xl font-bold">{level.level}</div>
                  <div className="mt-1 text-sm opacity-90">{level.subtitle}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xl font-bold">{level.salary.split(" ")[1]}</div>
                  {level.salary.includes("-") && (
                    <div className="mt-1 font-mono text-sm opacity-90">{level.salary.split(" ")[3]}</div>
                  )}
                </div>
              </div>

              <div className="mt-4 border-t border-white/20 pt-4">
                <div className="text-sm font-medium">{level.role}</div>
                <div className="mt-2 text-sm opacity-90">{level.reality}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
