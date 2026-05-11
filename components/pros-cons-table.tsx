"use client"

export function ProsConsTable() {
  const attributes = [
    {
      name: "Salario Inicial",
      qa: 3,
      data: 3,
      archivo: 2,
    },
    {
      name: "Baja Exposición Social",
      qa: 3,
      data: 2,
      archivo: 3,
    },
    {
      name: "Demanda Futura",
      qa: 3,
      data: 3,
      archivo: 2,
    },
    {
      name: "Posibilidad Remota",
      qa: 3,
      data: 2,
      archivo: 1,
    },
    {
      name: "Curva de Aprendizaje",
      qa: 3,
      data: 2,
      archivo: 3,
    },
  ]

  const renderDots = (level: number) => {
    if (level === 3) {
      return <div className="h-6 w-6 rounded-full bg-zinc-900" />
    } else if (level === 2) {
      return (
        <div className="relative h-6 w-6">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-900" />
          <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden rounded-l-full">
            <div className="h-full w-full rounded-full bg-zinc-900" />
          </div>
        </div>
      )
    } else {
      return <div className="h-6 w-6 rounded-full border-2 border-zinc-300" />
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">Atributo Clave</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-900">QA Tester</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-900">Data Analyst</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-900">Gestión Archivo</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr, index) => (
              <tr key={index} className="border-b border-zinc-200 last:border-0">
                <td className="px-6 py-4 text-sm font-medium text-zinc-900">{attr.name}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">{renderDots(attr.qa)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">{renderDots(attr.data)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">{renderDots(attr.archivo)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-zinc-200 bg-blue-50 px-6 py-4">
        <p className="text-center text-sm font-medium text-blue-600">
          La columna de QA Tester tiene la mayor densidad de círculos negros (Fortalezas)
        </p>
      </div>
    </div>
  )
}
