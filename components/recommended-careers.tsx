import { CareerCard } from "./career-card"

export function RecommendedCareers() {
  const careers = [
    {
      title: "Tester de Software (QA)",
      subtitle: 'La opción de "Zona Maestra"',
      match: 99,
      matchLabel: "Match Perfecto",
      matchColor: "url(#gradient1)",
      description:
        "Esta carrera profesionaliza tu obsesión natural por el detalle. Tu perfil Convencional encuentra aquí un paraíso: reglas claras y procesos lógicos. Como Tester, tu capacidad de observación se convierte en tu mayor activo; te pagan por encontrar el error que otros ignoraron. Es el rol ideal para quien busca impacto tecnológico sin exposición pública: sos el guardián de la calidad desde la seguridad de tu pantalla.",
      pillars: [
        { label: "Habilidades Naturales", value: 5 },
        { label: "Valores Personales", value: 5 },
        { label: "Intereses Técnicos", value: 4 },
        { label: "Oportunidad de Mercado", value: 5 },
      ],
      environment: [
        { icon: "🏠", label: "Remoto/Híbrido", highlighted: true },
        { icon: "💻", label: "Pantalla Única", highlighted: true },
        { icon: "👤", label: "Trabajo Individual", highlighted: true },
        { icon: "🔇", label: "Silencioso", highlighted: true },
        { icon: "📢", label: "Público/Audiencia", highlighted: false },
      ],
      steps: [
        "Curso Intensivo / Bootcamp de Introducción al Testing (3-6 meses).",
        "Certificación ISTQB (Nivel Fundamentos) + Primer rol Junior.",
        "Especialización en Automation (Testing automático con código simple).",
      ],
    },
    {
      title: "Analista de Datos Junior",
      subtitle: 'La opción de "Lógica Pura"',
      match: 95,
      matchLabel: "Alta Compatibilidad",
      matchColor: "#4169E1",
      description:
        "Si tu cerebro busca ordenar el caos, esta es tu profesión. Aquí no hay que vender ni convencer a nadie; los datos son hechos objetivos. Tu inteligencia Lógico-Matemática brilla al limpiar bases de datos desordenadas y transformarlas en reportes claros. Es una carrera que valora el silencio analítico y la capacidad de síntesis visual, permitiéndote trabajar con autonomía y previsibilidad.",
      pillars: [
        { label: "Habilidades Naturales", value: 5 },
        { label: "Valores Personales", value: 4 },
        { label: "Intereses Técnicos", value: 5 },
        { label: "Oportunidad de Mercado", value: 5 },
      ],
      environment: [
        { icon: "🏢", label: "Oficina/Remoto", highlighted: true },
        { icon: "📊", label: "Visualización", highlighted: true },
        { icon: "🧠", label: "Análisis Profundo", highlighted: true },
        { icon: "🤝", label: "Colaboración", highlighted: true },
        { icon: "🎤", label: "Discursos", highlighted: false },
      ],
      steps: [
        "Tecnicatura en Ciencia de Datos o Cursos de SQL + PowerBI.",
        "Rol de Data Entry o Analista Junior (Limpieza de datos).",
        "Analista Semi-Senior (Creación de tableros de control complejos).",
      ],
    },
    {
      title: "Gestión Documental / Archivo",
      subtitle: 'La opción de "Refugio Seguro"',
      match: 92,
      matchLabel: "Zona Segura",
      matchColor: "#FFBF00",
      description:
        "La opción perfecta para tu necesidad de baja presión social y alta estructura. En este rol, sos el dueño absoluto del sistema. Tu perfil metódico garantiza que la información vital esté protegida y accesible. Es un trabajo de ritmo pausado y constante, ideal para evitar el estrés del 'minuto a minuto'. Aquí, tu lealtad y orden son las cualidades más valoradas por las instituciones.",
      pillars: [
        { label: "Habilidades Naturales", value: 4 },
        { label: "Valores Personales", value: 5 },
        { label: "Intereses Técnicos", value: 3 },
        { label: "Oportunidad de Mercado", value: 3 },
      ],
      environment: [
        { icon: "📚", label: "Biblioteca/Archivo", highlighted: true },
        { icon: "🗄️", label: "Sistema Digital", highlighted: true },
        { icon: "🧘", label: "Ritmo Pausado", highlighted: true },
        { icon: "🔇", label: "Silencio Absoluto", highlighted: true },
        { icon: "⚡", label: "Urgencias/Caos", highlighted: false },
      ],
      steps: [
        "Tecnicatura Superior en Bibliotecología o Gestión Documental.",
        "Prácticas en instituciones educativas o archivos corporativos.",
        "Especialización en Archivística Digital (Gestión de documentos electrónicos).",
      ],
    },
  ]

  return (
    <div className="mt-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">Carreras Recomendadas</h2>
        <p className="mt-2 text-lg text-muted-foreground">Basadas en tu perfil vocacional y fortalezas naturales</p>
      </div>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#32CD32" />
          </linearGradient>
        </defs>
      </svg>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {careers.map((career, index) => (
          <CareerCard key={index} {...career} />
        ))}
      </div>
    </div>
  )
}
