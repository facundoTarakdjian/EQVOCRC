"use client"

import { UniversityCard } from "./university-card"
import { useState } from "react"

export function UniversityOptions() {
  const [filter, setFilter] = useState("TODAS")

  const universities = [
    {
      institution: "ISTEA (Instituto Superior)",
      career: "Tecnicatura Superior en Desarrollo de Software",
      tags: ["TECNOLOGÍA", "PRESENCIAL CABA"],
      studyLoad: [
        { label: "Práctica Técnica", percentage: 60, color: "#4169E1" },
        { label: "Teoría de Sistemas", percentage: 20, color: "#40E0D0" },
        { label: "Inglés Técnico", percentage: 10, color: "#32CD32" },
        { label: "Gestión de Proyectos", percentage: 10, color: "#FFB347" },
      ],
      investment: {
        level: "Medio-Accesible",
        price: "$180.000 - $220.000/mes",
        roi: "Alto (Salida laboral rápida en IT)",
      },
      community: [
        { label: "Calidad Académica", rating: 4.2 },
        { label: "Infraestructura Tech", rating: 4.8 },
        { label: "Bolsa de Trabajo", rating: 4.9 },
      ],
      quote: {
        text: "Lo mejor es que no perdés tiempo. Vas, te sentás en la compu, programás y te vas. Los profesores son gente que trabaja en la industria, no te dan teoría vieja. Ideal si querés trabajar rápido.",
        author: "Egresado 2023",
      },
      location: {
        place: "Microcentro, CABA",
        context: "Zona de oficinas, fácil acceso en subte. Edificio corporativo, no campus abierto.",
      },
      benefits: [
        {
          type: "Beca 'Talento Tech'",
          requirements: "Promedio secundario > 8.0. Entrevista de admisión técnica.",
        },
        {
          type: "Convenio Empresas",
          requirements: "Descuento del 20% si trabajás en empresas partner (Cámara de Software).",
        },
      ],
    },
    {
      institution: "IFTS N° 13 (Estatal)",
      career: "Tecnicatura Superior en Bibliotecología",
      tags: ["GESTIÓN", "PRESENCIAL CABA"],
      studyLoad: [
        {
          label: "Procesamiento Técnico",
          percentage: 50,
          color: "#4169E1",
        },
        {
          label: "Gestión de Unidades",
          percentage: 30,
          color: "#40E0D0",
        },
        {
          label: "Tecnología / Digitalización",
          percentage: 10,
          color: "#32CD32",
        },
        { label: "Formación General", percentage: 10, color: "#FFB347" },
      ],
      investment: {
        level: "Gratuito",
        price: "$0 (Bono cooperadora opcional)",
        roi: "Estable (Empleo estatal o instituciones privadas)",
      },
      community: [
        { label: "Calidad Académica", rating: 4.7 },
        { label: "Infraestructura", rating: 3.0 },
        { label: "Clima Estudiantil", rating: 5.0 },
      ],
      quote: {
        text: "Es un lugar chico donde todos se conocen pero se respeta mucho el espacio del otro. Los profesores son muy exigentes con el orden y la normativa. Si te gusta la estructura, es acá.",
        author: "Estudiante de 2° Año",
      },
      location: {
        place: "Barrio de Monserrat, CABA",
        context: "Zona histórica, cerca de bibliotecas públicas importantes.",
      },
      benefits: [
        {
          type: "Ingreso Directo",
          requirements: "Título secundario completo. Inscripción online en fechas GCBA.",
        },
        {
          type: "Beca Ciudad",
          requirements: "Ayuda económica para materiales según nivel socioeconómico.",
        },
      ],
    },
    {
      institution: "Universidad Siglo 21",
      career: "Licenciatura en Informática (Modalidad Distancia)",
      tags: ["TECNOLOGÍA", "100% REMOTO"],
      studyLoad: [
        { label: "Plataforma Virtual (SAM)", percentage: 40, color: "#4169E1" },
        { label: "Contenidos Teóricos", percentage: 30, color: "#40E0D0" },
        { label: "Trabajos Prácticos", percentage: 20, color: "#32CD32" },
        { label: "Exámenes", percentage: 10, color: "#FFB347" },
      ],
      investment: {
        level: "Medio-Alto",
        price: "$280.000 - $350.000/mes",
        roi: "Medio/Alto (Título universitario habilitante)",
      },
      community: [
        { label: "Plataforma Digital", rating: 4.8 },
        { label: "Flexibilidad", rating: 5.0 },
        { label: "Networking", rating: 2.5 },
      ],
      quote: {
        text: "Lo elegí porque me daba ansiedad ir a cursar presencial. Acá entro a la plataforma cuando quiero, leo los módulos, rindo los parciales online y listo. Nadie me controla, dependo de mí mismo.",
        author: "Alumno Modalidad Distancia",
      },
      location: {
        place: "Campus Virtual (Tu Casa)",
        context: "Sedes (CAU) en todo el país solo para rendir exámenes finales (si aplica).",
      },
      benefits: [
        {
          type: "Beca 'Amigo'",
          requirements: "20% de descuento si te inscribís con alguien más.",
        },
        {
          type: "Pago Anticipado",
          requirements: "Descuentos importantes por pagar el semestre completo.",
        },
      ],
    },
  ]

  const filters = ["TODAS", "TECNOLOGÍA", "GESTIÓN", "100% REMOTO", "PRESENCIAL CABA"]

  const filteredUniversities =
    filter === "TODAS" ? universities : universities.filter((uni) => uni.tags.includes(filter))

  return (
    <div className="mt-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">Alternativas de Universidades</h2>
        <p className="mt-2 text-lg text-muted-foreground">Opciones educativas alineadas a tu perfil y objetivos</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* University Cards */}
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {filteredUniversities.map((university, index) => (
          <UniversityCard key={index} {...university} />
        ))}
      </div>
    </div>
  )
}
