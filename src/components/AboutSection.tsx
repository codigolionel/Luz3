import aboutImg from "@/assets/about-us.webp";
import { Heart, Award, Sparkles } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

const highlights = [
  { icon: Heart, label: "Ingredientes frescos, sin conservantes", desc: "Usamos productos de calidad, seleccionados para que cada bocado sea rico y natural." },
  { icon: Sparkles, label: "Diseño personalizado para cada ocasión", desc: "Desde cumpleaños hasta baby showers, cada torta es única." },
  { icon: Award, label: "Elavoracion artesanal y profesionalismo", desc: "Hecho a mano con dedicación, como en una pastelería de barrio de toda la vida." },
];

const AboutSection = () => {
  const imgRef = useScrollReveal();
  const textRef = useScrollReveal({ delay: 200 });
  const highlightsRef = useStaggerReveal(":scope > div", { staggerMs: 120 });

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative floral-like blurred background blob */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div ref={imgRef} className="lg:w-1/2 relative">
            <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl border-8 border-white">
              <img
                src={aboutImg}
                alt="Nuestra pastelera creando una torta"
                loading="lazy"
                width={800}
                height={1000}
                className="w-full aspect-[3/4] object-cover rounded-xl"
              />
            </div>
          </div>
          <div ref={textRef} className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans">Nuestra esencia</span>
            <h2 className="font-serif text-4xl md:text-5xl text-chocolate mt-4 leading-tight">
              Arte en cada bocado
            </h2>
            <div className="flex justify-center lg:justify-start">
              <ElegantDivider />
            </div>

            <p className="text-foreground/80 font-sans font-light mt-2 text-lg leading-relaxed">
              En <span className="font-serif italic text-chocolate font-medium">Luz de Rosa</span> hacemos tortas que cuentan historias. Cada pieza es pensada para vos, con ingredientes frescos y ese toque artesanal que hace la diferencia.
            </p>

            <div ref={highlightsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50">
              {highlights.map((h) => (
                <div key={h.label} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5">
                    <h.icon className="w-6 h-6 md:w-5 md:h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl md:text-base text-chocolate font-medium">{h.label}</h3>
                  <p className="text-[15px] md:text-xs text-foreground/60 font-sans font-light leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
