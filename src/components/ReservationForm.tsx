import { useState } from "react";
import reservationBg from "@/assets/reservation-bg.jpg";

const ReservationForm = () => {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", form);
  };

  return (
    <section id="reservation" className="relative py-20 md:py-28 overflow-hidden">
      <img
        src={reservationBg}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 container mx-auto px-6 max-w-xl">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">Contáctanos</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-3">Pide Tu Torta</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Su nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-5 py-3 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-3 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-5 py-3 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Tipo de torta</option>
            <option value="clasica">Torta Clásica</option>
            <option value="chocolate">Torta de Chocolate</option>
            <option value="tematica">Torta Temática</option>
            <option value="naked">Naked Cake</option>
            <option value="autor">Torta de Autor</option>
          </select>
          <textarea
            placeholder="Cuéntanos sobre tu celebración (fecha, cantidad de personas, diseño deseado...)"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-border bg-card/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          />
          <div className="text-center">
            <button
              type="submit"
              className="px-10 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest rounded-full hover:bg-primary/90 transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;
