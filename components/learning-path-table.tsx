"use client"

export function LearningPathTable() {
  const courses = [
    {
      name: "Google Data Analytics Cert.",
      provider: "(Coursera - 6 meses)",
      level: 2,
      reason: "Es el estándar de oro para empezar. Aprendés a limpiar datos (tu fuerte) con SQL y R.",
    },
    {
      name: "ISTQB Foundation Level",
      provider: "(Udemy - 4 semanas)",
      level: 1,
      reason: "Es la certificación internacional de Tester. Te enseña la terminología correcta para no improvisar.",
    },
    {
      name: "Git & GitHub para Principiantes",
      provider: "(Platzi/YouTube - 2 semanas)",
      level: 1,
      reason: "Fundamental. Es donde se guarda el código. Entender esto te da seguridad técnica inmediata.",
    },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-200">Curso / Proveedor</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-200">Nivel</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-200">El "Por qué" para Lucas</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-white">{course.name}</div>
                    <div className="text-sm text-zinc-400">{course.provider}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${i < course.level ? "bg-green-500" : "bg-zinc-700"}`}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-300">{course.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
