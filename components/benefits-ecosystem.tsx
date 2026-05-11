import { Card } from "@/components/ui/card"

export function BenefitsEcosystem() {
  return (
    <Card className="border-border/50 bg-card/50 p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-foreground">Ecosistema de Beneficios</h3>
        <p className="mt-2 text-muted-foreground">La síntesis de tu transformación</p>
      </div>

      {/* Venn Diagram */}
      <div className="relative mx-auto h-[400px] max-w-2xl">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          {/* Left Circle - Academic Rigor */}
          <circle
            cx="150"
            cy="180"
            r="100"
            fill="rgb(59, 130, 246)"
            opacity="0.15"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
          />
          {/* Right Circle - Silent Networking */}
          <circle
            cx="250"
            cy="180"
            r="100"
            fill="rgb(6, 182, 212)"
            opacity="0.15"
            stroke="rgb(6, 182, 212)"
            strokeWidth="2"
          />
          {/* Bottom Circle - Personal Security */}
          <circle
            cx="200"
            cy="260"
            r="100"
            fill="rgb(251, 191, 36)"
            opacity="0.15"
            stroke="rgb(251, 191, 36)"
            strokeWidth="2"
          />

          {/* Center Intersection */}
          <circle cx="200" cy="210" r="40" fill="rgb(139, 92, 246)" opacity="0.2" />
        </svg>

        {/* Labels */}
        <div className="absolute left-8 top-32 max-w-[140px]">
          <div className="rounded-lg bg-card p-3 shadow-sm">
            <h4 className="text-sm font-semibold text-blue-600">Rigor Académico</h4>
            <p className="mt-1 text-xs text-muted-foreground">Acceso a laboratorios y bibliotecas del primer mundo</p>
          </div>
        </div>

        <div className="absolute right-8 top-32 max-w-[140px]">
          <div className="rounded-lg bg-card p-3 shadow-sm">
            <h4 className="text-sm font-semibold text-cyan-600">Networking Silencioso</h4>
            <p className="mt-1 text-xs text-muted-foreground">Conectar con colegas técnicos sin necesidad de fiestas</p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 max-w-[140px] -translate-x-1/2">
          <div className="rounded-lg bg-card p-3 shadow-sm">
            <h4 className="text-sm font-semibold text-yellow-600">Seguridad Personal</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Vivir la experiencia de caminar tranquilo a cualquier hora
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-lg bg-purple-600 px-4 py-2 text-center shadow-lg">
            <p className="text-xs font-bold text-white">PERFIL GLOBAL</p>
            <p className="text-xs font-bold text-white">ESTRATÉGICO</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
