import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

const faqs = [
  {
    question: "¿Con cuánta anticipación debo hacer el pedido?",
    answer: "Recomendamos realizar el pedido con al menos 5 a 7 días de anticipación. Para diseños personalizados complejos o fechas de alta demanda (fines de semana, feriados), lo ideal es reservar con 10 a 14 días.",
  },
  {
    question: "¿Puedo pedir una torta con un diseño específico o temática?",
    answer: "¡Sí! Trabajamos con diseños totalmente personalizados. Podés enviarnos una foto de referencia, describirnos la temática o contarnos la ocasión y creamos algo único para vos.",
  },
  {
    question: "¿Hacen entregas a domicilio o solo retiro?",
    answer: "[COMPLETAR CON RESPUESTA REAL — ej: Hacemos entregas a domicilio en [zona]. El costo de envío varía según la distancia. También podés coordinar el retiro en nuestro local.]",
  },
  {
    question: "¿Cuál es el tamaño mínimo disponible y para cuántas porciones?",
    answer: "[COMPLETAR CON RESPUESTA REAL — ej: El tamaño mínimo es para X porciones. También hacemos porciones individuales como cupcakes, cake pops y más para grupos más pequeños.]",
  },
  {
    question: "¿Cómo se confirma y abona el pedido?",
    answer: "[COMPLETAR CON RESPUESTA REAL — ej: Para confirmar el pedido se requiere una seña del 50% por transferencia o Mercado Pago. El saldo restante se abona al momento de la entrega o retiro.]",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleRef = useScrollReveal();
  const listRef = useStaggerReveal(".faq-item", { staggerMs: 60 });

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="pt-24 md:pt-32 pb-12 md:pb-16 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans">Información Importante</span>
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mt-4">Preguntas Frecuentes</h2>
          <ElegantDivider />
        </div>

        <div ref={listRef} className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="faq-item border-b border-border/50 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-7 md:py-5 text-left gap-4"
                >
                  <span className="font-serif text-xl md:text-lg text-chocolate leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center shrink-0 transition-transform duration-500 bg-gold/5 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 text-gold" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-8 text-[15px] md:text-sm text-foreground/70 font-sans font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
