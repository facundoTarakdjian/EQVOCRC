"use client"

export function ImpactBubbles() {
  return (
    <div className="relative h-96 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-white p-8">
      {/* Axes */}
      <div className="absolute bottom-8 left-8 right-8 top-8">
        <div className="relative h-full w-full">
          {/* X axis */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-300" />
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-8 items-center justify-center">
            <span className="text-xs text-zinc-600">Demanda</span>
          </div>

          {/* Y axis */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-zinc-300" />
          <div className="absolute left-0 top-1/2 flex -translate-x-8 -translate-y-1/2 -rotate-90 items-center justify-center">
            <span className="text-xs text-zinc-600">Satisfacción</span>
          </div>

          {/* Bubbles */}
          {/* QA Tester - Top Right */}
          <div className="absolute" style={{ right: "10%", top: "15%" }}>
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-blue-500/20 backdrop-blur-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-blue-600">QA</span>
                <span className="text-xs text-blue-600">Tester</span>
              </div>
            </div>
          </div>

          {/* Data Analyst - Top Middle */}
          <div className="absolute" style={{ right: "25%", top: "30%" }}>
            <div className="relative">
              <div className="h-28 w-28 rounded-full bg-cyan-500/20 backdrop-blur-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-cyan-600">Data</span>
                <span className="text-xs text-cyan-600">Analyst</span>
              </div>
            </div>
          </div>

          {/* Gestión Documental - Bottom Left */}
          <div className="absolute" style={{ left: "20%", bottom: "25%" }}>
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-zinc-400/20 backdrop-blur-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-zinc-600">Archivo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
