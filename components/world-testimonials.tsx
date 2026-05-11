import { Card } from "@/components/ui/card"

const testimonials = [
  {
    location: "📍 Vancouver, Canadá",
    quote:
      "Tenía miedo de irme solo, pero la ciudad es tan ordenada que me adapté enseguida. El silencio de las bibliotecas de acá es otro nivel.",
    author: "Martín",
    role: "Estudiante de Sistemas",
    image: "/student-with-laptop-in-modern-library.jpg",
  },
  {
    location: "📍 Barcelona, España",
    quote:
      "En la UPC aprendí procesos de gestión de datos que en Argentina recién están llegando. Fue pura ganancia técnica.",
    author: "Sol",
    role: "Archivista Digital",
    image: "/woman-in-server-laboratory.jpg",
  },
  {
    location: "📍 Leeds, UK",
    quote:
      "Vivir en el campus me dio la independencia que buscaba. Todo funciona, todo es puntual. Es la paz mental que necesitaba.",
    author: "Julián",
    role: "Analista de Datos",
    image: "/calm-student-residence-building.jpg",
  },
]

export function WorldTestimonials() {
  return (
    <Card className="border-border/50 bg-card/50 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground">Testimonios del Mundo</h3>
        <p className="mt-2 text-muted-foreground">Validación social de perfiles similares al tuyo</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-border hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.location}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-3 py-1 backdrop-blur-sm">
                <p className="text-xs font-medium text-white">{testimonial.location}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">"{testimonial.quote}"</p>
              <div className="mt-4 border-t border-border/50 pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
