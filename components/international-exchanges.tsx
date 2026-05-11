import { ExpansionRoutesMap } from "@/components/expansion-routes-map"
import { EliteAgreementsTable } from "@/components/elite-agreements-table"
import { ValueMultiplier } from "@/components/value-multiplier"
import { BenefitsEcosystem } from "@/components/benefits-ecosystem"
import { WorldTestimonials } from "@/components/world-testimonials"

export function InternationalExchanges() {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Intercambios y Experiencias Internacionales</h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Expandí tu horizonte profesional conectando con los centros de excelencia global
        </p>
      </div>

      <div className="space-y-8">
        {/* Expansion Routes Map */}
        <ExpansionRoutesMap />

        {/* Elite Agreements Table */}
        <EliteAgreementsTable />

        {/* Value Multiplier and Benefits */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ValueMultiplier />
          <BenefitsEcosystem />
        </div>

        {/* World Testimonials */}
        <WorldTestimonials />
      </div>
    </section>
  )
}
