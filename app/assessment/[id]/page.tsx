import { EntrevistaPautadaForm } from "@/components/assessments/entrevista-pautada-form"
import { CUMOForm } from "@/components/assessments/cumo-form"
import { KuderForm } from "@/components/assessments/kuder-form"
import { Encuestas360Form } from "@/components/assessments/encuestas-360-form"
import { IPPRForm } from "@/components/assessments/ippr-form"
import { MIPSForm } from "@/components/assessments/mips-form"
import { RIASECForm } from "@/components/assessments/riasec-form"
import { HerrmannForm } from "@/components/assessments/herrmann-form"
import { GardnerForm } from "@/components/assessments/gardner-form"
import { ProyectivasForm } from "@/components/assessments/proyectivas-form"
import { AutodescubrimientoForm } from "@/components/assessments/autodescubrimiento-form"
import { EstiloVidaForm } from "@/components/assessments/estilo-vida-form"
import { VisionFuturoForm } from "@/components/assessments/vision-futuro-form"
import { ArbolGenealogico } from "@/components/assessments/arbol-genealogico-form"
import { UniversidadForm } from "@/components/assessments/universidad-form"
import { DynamicUserHeader } from "@/components/dynamic-user-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { SECTION_IDS } from "@/lib/questionnaire-calculator"
import { SectionIdSetter } from "@/components/assessments/section-id-setter"

const assessments = {
  "entrevista-pautada": {
    component: EntrevistaPautadaForm,
    title: "Entrevista Pautada",
    sectionId: SECTION_IDS.BRAVITO,
  },
  cumo: {
    component: CUMOForm,
    title: "CUMO - Motivaciones Vocacionales",
    sectionId: SECTION_IDS.BRAVITO,
  },
  kuder: {
    component: KuderForm,
    title: "KUDER - Preferencias Ocupacionales",
    sectionId: SECTION_IDS.BRAVITO,
  },
  "encuestas-360": {
    component: Encuestas360Form,
    title: "Encuestas 360°",
    sectionId: SECTION_IDS.BRAVITO,
  },
  // Intereses y Preferencias
  ippr: {
    component: IPPRForm,
    title: "IPPR - Intereses y Preferencias Profesionales",
    sectionId: SECTION_IDS.IPPR,
  },
  // Personalidad
  mips: {
    component: MIPSForm,
    title: "MIPS - MILLON",
    sectionId: SECTION_IDS.MILLON,
  },
  riasec: {
    component: RIASECForm,
    title: "RIASEC - HOLLAND",
    sectionId: SECTION_IDS.RIASEC,
  },
  herrmann: {
    component: HerrmannForm,
    title: "NED HERRMANN",
    sectionId: SECTION_IDS.HERRMANN,
  },
  gardner: {
    component: GardnerForm,
    title: "GARDNER",
    sectionId: SECTION_IDS.GARDNER,
  },
  proyectivas: {
    component: ProyectivasForm,
    title: "FRASES INCOMPLETAS",
    sectionId: SECTION_IDS.PROYECTIVA,
  },
  autodescubrimiento: {
    component: AutodescubrimientoForm,
    title: "AUTO-DESCUBRIMIENTO",
    sectionId: SECTION_IDS.AUTODESC,
  },
  "estilo-vida": {
    component: EstiloVidaForm,
    title: "ESTILO DE VIDA",
    sectionId: SECTION_IDS.LIFESTYLE,
  },
  "vision-futuro": {
    component: VisionFuturoForm,
    title: "VISIÓN Y PROYECCIÓN A FUTURO",
    sectionId: SECTION_IDS.FUTURO,
  },
  "arbol-genealogico": {
    component: ArbolGenealogico,
    title: "ÁRBOL GENEALÓGICO",
    sectionId: SECTION_IDS.FAMILIA,
  },
  // Universidad
  universidad: {
    component: UniversidadForm,
    title: "ELECCIÓN DE UNIVERSIDAD",
    sectionId: SECTION_IDS.UNIVERSIDAD,
  },
}

export default async function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const assessment = assessments[id as keyof typeof assessments]

  if (!assessment) {
    return (
      <div className="min-h-screen bg-background">
        <DynamicUserHeader />
        <div className="p-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-2xl font-bold text-foreground">Evaluacion no encontrada</h1>
            <Link href="/">
              <Button className="mt-4">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const AssessmentComponent = assessment.component

  return (
    <div className="min-h-screen bg-background">
      <SectionIdSetter sectionId={assessment.sectionId} />
      <DynamicUserHeader />

      <div className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="bg-transparent">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver a categorias
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-6 py-8">
        <AssessmentComponent />
      </div>
    </div>
  )
}
