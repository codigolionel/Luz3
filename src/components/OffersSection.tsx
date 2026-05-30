import { motion } from "framer-motion";
import { Heart, Award, Sparkles, MessageCircle } from "lucide-react";
import sweetProductsGroup from "@/assets/offers.webp";

const steps = [
  {
    icon: MessageCircle,
    step: 1,
    title: "Consultá por WhatsApp",
    desc: "Mandame un mensaje con tu idea, la fecha y para cuántas personas es. Con eso ya arrancamos.",
  },
  {
    icon: Sparkles,
    step: 2,
    title: "Elegís diseño y sabor",
    desc: "Armamos juntos qué estilo y sabores. Te voy guiando para que quede justo como lo tenías en mente.",
  },
  {
    icon: Award,
    step: 3,
    title: "Acordamos fecha y retiro",
    desc: "Nos ponemos de acuerdo en todo y coordinamos cuándo y cómo lo queres recibir.",
  },
  {
    icon: Heart,
    step: 4,
    title: "A disfrutar el pedido",
    desc: "¡Lo tenés! Con todos los detalles que pediste. Solo te queda elegir quién corta la torta.",
  },
] as const;

const OffersSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        {/* Top Header */}
        <div className="mb-10">
          <motion.h2
            className="text-[#5d473a] font-sans text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-wide leading-tight"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Tortas que se hacen a medida, no en serie
          </motion.h2>
          <p className="text-[#bca68e] font-sans text-sm md:text-base font-medium uppercase tracking-[0.15em] mt-4">
            Desde cumpleaños hasta bodas — cada pedido es único
          </p>
        </div>

        {/* Central Image */}
        <div className="flex justify-center mb-10">
          <img
            src={sweetProductsGroup}
            alt="Grupo de tortas y dulces artesanales"
            className="w-full max-w-[620px] h-auto object-contain transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center">
          <span className="text-[#f28b66] font-sans text-base md:text-lg font-bold uppercase tracking-[0.25em] mb-3">
            Hecho con tiempo, dedicación y mucho amor
          </span>
          <div className="w-12 h-[2px] bg-[#f28b66] mb-5" />
          <p className="text-foreground/60 font-sans text-lg md:text-lg max-w-[480px] leading-relaxed">
            Porque detrás de cada torta hay un festejo, una persona y un momento que no se repite. Por eso cada pedido lo trabajo como si fuera el mío.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
            {steps.map((s) => (
              <motion.div
                key={s.step}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-cream/60 p-8 lg:p-10 text-center shadow-sm ring-1 ring-black/[0.05] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose/10 hover:ring-rose/20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: (s.step - 1) * 0.12 }}
              >
                {/* Subtle corner glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose/[0.10] blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-70" />

                <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gold/20">
                  <s.icon className="h-6 w-6 text-gold" strokeWidth={1.6} />
                </div>

                <div className="mt-4 inline-flex items-center justify-center rounded-full bg-rose/90 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  Paso {s.step}
                </div>

                <h3 className="mt-4 font-serif text-xl font-semibold text-chocolate md:text-[16px]">
                  {s.title}
                </h3>

                <p className="mt-3 font-sans text-[18px] font-light leading-relaxed text-foreground/60 md:text-base">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
