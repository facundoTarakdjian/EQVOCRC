import { LifeBalanceGauge } from "./life-balance-gauge"
import { EmployabilityBridges } from "./employability-bridges"
import { DailyTimeline } from "./daily-timeline"
import { SalaryPyramid } from "./salary-pyramid"
import { GeographicSalaryMap } from "./geographic-salary-map"

export function UniversityLife() {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Vida Universitaria y Empleabilidad</h2>
        <p className="mt-2 text-muted-foreground">Balance realista entre estudios, trabajo y desarrollo profesional</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <LifeBalanceGauge />
        <EmployabilityBridges />

        <div className="lg:col-span-2">
          <DailyTimeline />
        </div>

        <SalaryPyramid />
        <GeographicSalaryMap />
      </div>
    </section>
  )
}
