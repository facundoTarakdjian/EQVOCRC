"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts"
import {
  ArrowLeft, Brain, Heart, Stethoscope, MessageCircle,
  Palette, BookOpen, Trash2, Plus, User, ShieldCheck,
} from "lucide-react"

// ── Static data ────────────────────────────────────────────────────────────────

const STUDENT = {
  name: "Valentina García",
  age: 17,
  school: "Colegio San Martín",
  completed: 5,
  total: 5,
}

const INTERVIEW_CARDS = [
  { label: "Materias favoritas", value: "Biología, Filosofía, Arte" },
  { label: "Materias que menos le gustaron", value: "Matemática, Física" },
  { label: "Interés actual", value: "Psicología" },
  { label: "Si fuera millonaria…", value: "\"Viajaría y ayudaría a personas en situación vulnerable\"" },
  { label: "Fortalezas percibidas", value: "Empatía, creatividad, escucha activa" },
  { label: "Debilidades", value: "Dificultad con números, procrastinación" },
]

const IPPR_DATA = [
  { name: "Ciencias Naturales", score: 18 },
  { name: "Construcción e Ingeniería", score: 8 },
  { name: "Salud", score: 30 },
  { name: "Humanidades", score: 26 },
  { name: "Derecho", score: 14 },
  { name: "Comunicación", score: 22 },
  { name: "Educación y Psicología", score: 34 },
  { name: "Administración", score: 10 },
  { name: "Informática", score: 6 },
  { name: "Agro y Veterinaria", score: 12 },
  { name: "Artes y Diseño", score: 24 },
  { name: "Música y Artes Escénicas", score: 20 },
]

const RIASEC_DATA = [
  { subject: "Realista", value: 12 },
  { subject: "Investigador", value: 28 },
  { subject: "Artístico", value: 30 },
  { subject: "Social", value: 35 },
  { subject: "Emprendedor", value: 18 },
  { subject: "Convencional", value: 8 },
]

const GARDNER_DATA = [
  { name: "Lógico-Matemática", short: "Lóg-Mat", score: 42 },
  { name: "Lingüística", short: "Lingüíst.", score: 78 },
  { name: "Espacial", short: "Espacial", score: 65 },
  { name: "Corporal-Kinestésica", short: "Corporal", score: 58 },
  { name: "Musical", short: "Musical", score: 70 },
  { name: "Naturalista", short: "Naturalista", score: 55 },
  { name: "Intrapersonal", short: "Intrap.", score: 82 },
  { name: "Interpersonal", short: "Interp.", score: 88 },
]

const CUMO_DATA = [
  { name: "Satisfacción", code: "S", score: 26, max: 30 },
  { name: "Futuro", code: "F", score: 18, max: 30 },
  { name: "Altruismo", code: "A", score: 28, max: 30 },
  { name: "Éxito", code: "E", score: 14, max: 30 },
  { name: "Dependencia familiar", code: "D", score: 8, max: 30 },
]

const KUDER_DATA = [
  { name: "Aire Libre", score: 6, max: 20 },
  { name: "Mecánica", score: 4, max: 20 },
  { name: "Cálculo", score: 5, max: 20 },
  { name: "Científica", score: 14, max: 20 },
  { name: "Persuasión", score: 12, max: 20 },
  { name: "Arte", score: 16, max: 20 },
  { name: "Literatura", score: 18, max: 20 },
  { name: "Música", score: 14, max: 20 },
  { name: "Servicio Social", score: 20, max: 20 },
  { name: "Oficina", score: 4, max: 20 },
]

const CAREERS = [
  { name: "Psicología", icon: Brain, color: "#6366f1", reason: "Alta afinidad con áreas Social e Investigador + Inteligencia Interpersonal destacada" },
  { name: "Trabajo Social", icon: Heart, color: "#ec4899", reason: "Perfil altruista + Motivación por ayudar + RIASEC Social dominante" },
  { name: "Medicina", icon: Stethoscope, color: "#10b981", reason: "IPPR Salud top 3 + Inteligencia Naturalista + perfil Investigador" },
  { name: "Comunicación Social", icon: MessageCircle, color: "#0ea5e9", reason: "IPPR Comunicación alto + Inteligencia Lingüística + perfil Artístico" },
  { name: "Diseño", icon: Palette, color: "#f59e0b", reason: "IPPR Artes alto + Kuder Arte/Literatura top + perfil Artístico" },
  { name: "Docencia", icon: BookOpen, color: "#8b5cf6", reason: "Inteligencia Interpersonal + CUMO Altruismo + IPPR Educación/Psicología máximo" },
]

const INITIAL_ENCOUNTERS = [
  { fecha: "10/03/2025", tema: "Presentación y entrevista pautada", tarea: "Completar entrevista online", observaciones: "Valentina llegó con ideas claras sobre psicología" },
  { fecha: "24/03/2025", tema: "Resultados IPPR y Holland", tarea: "Revisar carreras del área social", observaciones: "Sorprendida con el resultado artístico" },
  { fecha: "07/04/2025", tema: "Gardner y CUMO", tarea: "Investigar 2 carreras de su interés", observaciones: "Muy reflexiva en el módulo de motivaciones" },
  { fecha: "21/04/2025", tema: "Integración de resultados", tarea: "Completar hoja de ruta", observaciones: "Dudas entre Psicología y Trabajo Social" },
  { fecha: "05/05/2025", tema: "Cierre y perfil final", tarea: "Redactar su perfil vocacional", observaciones: "" },
]

const INITIAL_NOTES = [
  {
    id: 1,
    fecha: "10/03/2025",
    texto: "Primera sesión muy fluida. Valentina tiene claridad sobre sus afinidades hacia lo social pero aún no dimensiona el alcance de las carreras disponibles. Explorar opciones fuera de Psicología.",
  },
  {
    id: 2,
    fecha: "07/04/2025",
    texto: "Los resultados del CUMO confirman orientación altruista. Baja puntuación en Dependencia familiar es un buen indicador de autonomía en la decisión. Trabajar el miedo a la salida laboral.",
  },
  {
    id: 3,
    fecha: "05/05/2025",
    texto: "Cierre excelente. Valentina llega con una decisión más madura. Primera opción: Psicología UBA. Segunda: Trabajo Social UBA. Recomendar visitar ambas facultades antes de inscribirse.",
  },
]

// ── Chart helpers ──────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, unit = "" }: any) {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className="rounded-lg border bg-card px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold">{d.name || d.subject}</p>
        <p className="text-muted-foreground">
          Puntaje: <span className="font-bold text-primary">{payload[0].value}{unit}</span>
        </p>
      </div>
    )
  }
  return null
}

function SectionCard({ number, title, description, children }: {
  number: string; title: string; description: string; children: React.ReactNode
}) {
  return (
    <Card className="p-6 space-y-4">
      <div className="border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">{number}</span>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground pl-9">{description}</p>
      </div>
      {children}
    </Card>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function OrientadorPage() {
  const [activeTab, setActiveTab] = useState<"resultados" | "cronograma" | "notas">("resultados")
  const [encounters, setEncounters] = useState(INITIAL_ENCOUNTERS)
  const [notes, setNotes] = useState(INITIAL_NOTES)

  const progress = (STUDENT.completed / STUDENT.total) * 100

  const updateEncounter = (idx: number, field: string, value: string) => {
    setEncounters((prev) => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e))
  }

  const addEncounter = () => {
    setEncounters((prev) => [...prev, { fecha: "", tema: "", tarea: "", observaciones: "" }])
  }

  const updateNote = (id: number, field: string, value: string) => {
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, [field]: value } : n))
  }

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const addNote = () => {
    const today = new Date().toLocaleDateString("es-AR")
    setNotes((prev) => [...prev, { id: Date.now(), fecha: today, texto: "" }])
  }

  const tabs = [
    { id: "resultados", label: "Resultados" },
    { id: "cronograma", label: "Cronograma" },
    { id: "notas", label: "Notas" },
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">

      {/* ── Header ── */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div className="h-5 w-px bg-border" />
            <span className="text-lg font-bold text-primary">Bravito</span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/20">
              Vista Orientador
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Panel privado</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">

        {/* ── Student card ── */}
        <Card className="p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-2xl font-bold">
              VG
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{STUDENT.name}</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {STUDENT.age} años · {STUDENT.school}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-700">{STUDENT.completed}/{STUDENT.total} módulos completados</span>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progreso del proceso</span>
                  <span className="font-semibold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </Card>

        {/* ── Tabs nav ── */}
        <div className="flex gap-1 rounded-xl border bg-muted/40 p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-card shadow-sm text-primary border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            TAB 1 — RESULTADOS
        ══════════════════════════════════════════════════════ */}
        {activeTab === "resultados" && (
          <div className="space-y-6">

            {/* Sección 1 — Entrevista Pautada */}
            <SectionCard number="1" title="Entrevista Pautada" description="Respuestas clave de la sesión inicial">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {INTERVIEW_CARDS.map((card) => (
                  <div key={card.label} className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{card.label}</p>
                    <p className="text-sm leading-relaxed">{card.value}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Sección 2 — IPPR */}
            <SectionCard number="2" title="IPPR — Intereses y Preferencias Profesionales" description="Puntaje por campo temático (máx. 36). En azul: campos con puntaje ≥ 24.">
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={IPPR_DATA} margin={{ top: 0, right: 40, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 36]} tickCount={7} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 11 }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={22}>
                      {IPPR_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.score >= 24 ? "#6366f1" : "#cbd5e1"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#6366f1]" /> Puntaje alto (≥ 24)</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#cbd5e1]" /> Puntaje bajo (&lt; 24)</span>
              </div>
            </SectionCard>

            {/* Sección 3 — RIASEC */}
            <SectionCard number="3" title="Holland / RIASEC — Tipologías Vocacionales" description="Perfil de personalidad vocacional en 6 dimensiones (máx. 40 c/u)">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={RIASEC_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 40]} tick={{ fontSize: 9 }} />
                      <Radar name="RIASEC" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                      <Tooltip formatter={(v) => [`${v}`, "Puntaje"]} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Tipos dominantes</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { code: "S", label: "Social", color: "bg-violet-100 text-violet-700 border-violet-200" },
                        { code: "A", label: "Artístico", color: "bg-pink-100 text-pink-700 border-pink-200" },
                        { code: "I", label: "Investigador", color: "bg-sky-100 text-sky-700 border-sky-200" },
                      ].map((t) => (
                        <span key={t.code} className={`rounded-full border px-3 py-1 text-sm font-bold ${t.color}`}>
                          {t.code} — {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border bg-primary/5 p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Perfil</p>
                    <p className="text-base font-bold text-primary">ISA</p>
                    <p className="text-sm text-muted-foreground mt-1">Social — Investigador — Artístico</p>
                  </div>
                  <div className="space-y-2">
                    {RIASEC_DATA.sort((a, b) => b.value - a.value).map((d) => (
                      <div key={d.subject} className="flex items-center gap-2 text-sm">
                        <span className="w-24 text-muted-foreground">{d.subject}</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary/60" style={{ width: `${(d.value / 40) * 100}%` }} />
                        </div>
                        <span className="w-6 text-right text-xs font-semibold">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Sección 4 — Gardner */}
            <SectionCard number="4" title="Gardner — Inteligencias Múltiples" description="Puntaje por tipo de inteligencia (máx. 100). En violeta: inteligencias destacadas (≥ 70).">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GARDNER_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="short" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {GARDNER_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.score >= 70 ? "#8b5cf6" : "#cbd5e1"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-lg border bg-violet-50 border-violet-100 p-3">
                <p className="text-sm font-semibold text-violet-700">
                  Inteligencias destacadas: Interpersonal (88) · Intrapersonal (82) · Lingüística (78) · Musical (70)
                </p>
              </div>
            </SectionCard>

            {/* Sección 5 — CUMO */}
            <SectionCard number="5" title="CUMO — Motivaciones Vocacionales" description="Puntaje por dimensión motivacional (máx. 30 c/u)">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CUMO_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="code" tick={{ fontSize: 13, fontWeight: 600 }} />
                    <YAxis domain={[0, 30]} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v, _, p) => [`${v}/30`, p.payload.name]} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={52}>
                      {CUMO_DATA.map((_, i) => (
                        <Cell key={i} fill={["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899"][i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {CUMO_DATA.map((d, i) => (
                  <span key={d.code} className="flex items-center gap-1 rounded-full border px-2.5 py-1 font-medium">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ["#6366f1","#0ea5e9","#10b981","#f59e0b","#ec4899"][i] }} />
                    {d.code} — {d.name}: {d.score}
                  </span>
                ))}
              </div>
              <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
                Valentina está motivada principalmente por el <strong>altruismo</strong> y la <strong>satisfacción personal</strong>. Baja dependencia familiar en su decisión.
              </div>
            </SectionCard>

            {/* Sección 6 — Kuder */}
            <SectionCard number="6" title="Kuder — Preferencias Ocupacionales" description="Cantidad de elecciones 'MÁS' por área (máx. 20)">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={KUDER_DATA} margin={{ top: 0, right: 32, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 20]} tickCount={5} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={20} fill="#14b8a6">
                      {KUDER_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.score >= 14 ? "#0ea5e9" : "#cbd5e1"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            {/* Sección 7 — Integración */}
            <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 via-accent/5 to-background border-primary/20">
              <div className="border-b border-primary/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-xs font-bold text-primary">✦</span>
                  <h3 className="text-lg font-bold">Integración Holland + IPPR + Kuder</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground pl-9">Áreas convergentes entre los tres instrumentos</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Áreas fuertes", items: ["Educación / Psicología", "Salud", "Humanidades", "Artes"], color: "border-violet-200 bg-violet-50" },
                  { title: "Perfil de personalidad", items: ["Social", "Investigador", "Artístico"], color: "border-sky-200 bg-sky-50" },
                  { title: "Motivación principal", items: ["Altruismo", "Satisfacción personal"], color: "border-emerald-200 bg-emerald-50" },
                ].map((col) => (
                  <div key={col.title} className={`rounded-xl border p-4 ${col.color}`}>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{col.title}</p>
                    <div className="space-y-1.5">
                      {col.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Carreras sugeridas</h4>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {CAREERS.map((career) => (
                    <div key={career.name} className="flex items-start gap-3 rounded-xl border bg-card p-4 hover:shadow-sm transition-shadow">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${career.color}20` }}>
                        <career.icon className="h-5 w-5" style={{ color: career.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm">{career.name}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{career.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 2 — CRONOGRAMA
        ══════════════════════════════════════════════════════ */}
        {activeTab === "cronograma" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Cronograma de encuentros</h3>
                <p className="text-sm text-muted-foreground">{encounters.length} encuentros registrados · Las observaciones son editables</p>
              </div>
              <Button size="sm" className="gap-1.5" onClick={addEncounter}>
                <Plus className="h-4 w-4" />
                Agregar encuentro
              </Button>
            </div>

            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {["N°", "Fecha", "Tema del encuentro", "Tarea asignada", "Observaciones"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {encounters.map((enc, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-center">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Input
                          value={enc.fecha}
                          onChange={(e) => updateEncounter(i, "fecha", e.target.value)}
                          className="h-8 w-28 text-sm border-0 bg-transparent p-0 focus-visible:ring-1 focus-visible:ring-primary/40"
                          placeholder="dd/mm/aaaa"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={enc.tema}
                          onChange={(e) => updateEncounter(i, "tema", e.target.value)}
                          className="h-8 min-w-[180px] text-sm border-0 bg-transparent p-0 focus-visible:ring-1 focus-visible:ring-primary/40"
                          placeholder="Tema..."
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={enc.tarea}
                          onChange={(e) => updateEncounter(i, "tarea", e.target.value)}
                          className="h-8 min-w-[160px] text-sm border-0 bg-transparent p-0 focus-visible:ring-1 focus-visible:ring-primary/40"
                          placeholder="Tarea..."
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Textarea
                          value={enc.observaciones}
                          onChange={(e) => updateEncounter(i, "observaciones", e.target.value)}
                          className="min-w-[200px] text-sm resize-none h-16 bg-muted/30 border-muted focus-visible:ring-1 focus-visible:ring-primary/40"
                          placeholder="Observaciones..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 3 — NOTAS
        ══════════════════════════════════════════════════════ */}
        {activeTab === "notas" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Notas del orientador</h3>
                <p className="text-sm text-muted-foreground">Registro privado de observaciones clínicas</p>
              </div>
              <Button size="sm" className="gap-1.5" onClick={addNote}>
                <Plus className="h-4 w-4" />
                Nueva nota
              </Button>
            </div>

            {notes.map((note) => (
              <Card key={note.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fecha:</span>
                    <Input
                      value={note.fecha}
                      onChange={(e) => updateNote(note.id, "fecha", e.target.value)}
                      className="h-7 w-32 text-sm border-muted focus-visible:ring-1 focus-visible:ring-primary/40"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={note.texto}
                  onChange={(e) => updateNote(note.id, "texto", e.target.value)}
                  className="resize-none text-sm leading-relaxed min-h-[100px] bg-muted/20 border-muted focus-visible:ring-1 focus-visible:ring-primary/40"
                  placeholder="Escribí tus observaciones..."
                />
              </Card>
            ))}

            {notes.length === 0 && (
              <Card className="p-10 text-center">
                <p className="text-muted-foreground text-sm">No hay notas todavía. Hacé clic en "Nueva nota" para comenzar.</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
