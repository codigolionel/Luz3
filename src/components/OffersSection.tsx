import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { Heart, Award, Sparkles, MessageCircle } from "lucide-react";
import sweetProductsGroup from "@/assets/offers.webp";

const steps = [
  {
    icon: MessageCircle,
    step: 1,
    title: "Consultá por WhatsApp",
    desc: "Escribinos con tu idea, la fecha y para cuántas porciones. Te respondemos para empezar a armar tu pedido.",
  },
  {
    icon: Sparkles,
    step: 2,
    title: "Elegís diseño y sabor",
    desc: "En este paso elegimos juntos el estilo y los sabores. Te asesoramos para que quede tal cual lo imaginaste.",
  },
  {
    icon: Award,
    step: 3,
    title: "Acordamos fecha y retiro",
    desc: "Confirmamos disponibilidad y coordinamos el día y el horario de retiro (o entrega, según tu zona).",
  },
  {
    icon: Heart,
    step: 4,
    title: "¡Disfrutás tu torta!",
    desc: "La preparamos artesanalmente y la recibís lista para compartir: fresca, rica y con todos los detalles.",
  },
] as const;

const OffersSection = () => {
  const revealTitle = useScrollReveal({ delay: 100 });
  const revealImage = useScrollReveal({ delay: 200 });
  const revealBottom = useScrollReveal({ delay: 300 });
  const highlightsRef = useStaggerReveal(":scope > div", { staggerMs: 120 });

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        {/* Top Header */}
        <div ref={revealTitle} className="mb-10">
          <h2 className="text-[#5d473a] font-sans text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-wide leading-tight">
            Diferentes tipos de tortas y dulces
          </h2>
          <p className="text-[#bca68e] font-sans text-sm md:text-base font-medium uppercase tracking-[0.15em] mt-4">
            Encontrarás solo los mejores productos
          </p>
        </div>

        {/* Central Image */}
        <div ref={revealImage} className="flex justify-center mb-10">
          <img
            src={sweetProductsGroup}
            alt="Grupo de tortas y dulces artesanales"
            className="w-full max-w-[620px] h-auto object-contain transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Bottom Section */}
        <div ref={revealBottom} className="flex flex-col items-center">
          <span className="text-[#f28b66] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3">
            Mejorando dia a dia, solo por pasion
          </span>
          <div className="w-12 h-[2px] bg-[#f28b66] mb-5" />
          <p className="text-foreground/60 font-sans text-sm md:text-base max-w-[480px] leading-relaxed">
            Ofrecemos una propuesta diferente para cada uno de nuestros clientes, garantizando una experiencia dulce y memorable en cada bocado.
          </p>
        </div>

        <div ref={highlightsRef} className="mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-cream/60 p-8 text-center shadow-sm ring-1 ring-black/[0.05] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose/10 hover:ring-rose/20"
              >
                {/* Subtle corner glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose/[0.10] blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-70" />

                <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gold/20">
                  <s.icon className="h-6 w-6 text-gold" strokeWidth={1.6} />
                </div>

                <div className="mt-4 inline-flex items-center justify-center rounded-full bg-rose/90 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  Paso {s.step}
                </div>

                <h3 className="mt-4 font-serif text-xl font-semibold text-chocolate md:text-[17px]">
                  {s.title}
                </h3>

                <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-foreground/60 md:text-xs">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
