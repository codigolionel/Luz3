import specialCake from "@/assets/special-cake.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

const SpecialProductSection = () => {
  const imgRef = useScrollReveal();
  const textRef = useScrollReveal({ delay: 200 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-rose-light/60 via-cream to-rose-light/30">
      {/* Premium background texture (dot matrix) */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#4a2b29_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Modern vibrant decorative blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-light/80 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4 mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gold/20 rounded-full blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4 mix-blend-multiply" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div ref={imgRef} className="w-full lg:w-1/2 relative px-4 lg:px-0 flex justify-center">
            {/* Organic/Arch shaped image container with stronger presence */}
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-t-full rounded-b-[40px] overflow-hidden shadow-[0_30px_60px_rgba(74,43,41,0.15)] border-[10px] border-white/80 backdrop-blur-sm">
              <img
                src={specialCake}
                alt="Torta especial de cumpleaños"
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Subtle decorative dot pattern or accent behind image */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 w-32 h-32 bg-rose-light rounded-full -z-10 blur-xl opacity-60" />
          </div>

          <div ref={textRef} className="w-full lg:w-1/2">
            {/* Glassmorphism Card for Text Content to give depth */}
            <div className="relative bg-white/50 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/40 rounded-full blur-2xl pointer-events-none" />
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 text-primary font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm border border-white">
                Obra Maestra
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-chocolate leading-[1.1]">
                Torta de Autor
              </h2>
              <div className="mt-6">
                <ElegantDivider />
              </div>
              
              <p className="text-chocolate/70 font-sans font-light mt-6 leading-relaxed text-lg">
                Cada torta es un diseño único pensado para vos. Contanos la ocasión y lo hacemos realidad, con todo el amor y la dedicación de lo artesanal.
              </p>

              <ul className="mt-8 space-y-5">
                {["Personalización de diseño y temática", "Ingredientes frescos y caseros", "Consultamos contigo cada detalle"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-light/50 flex items-center justify-center shrink-0 border border-white">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-serif text-xl italic text-chocolate/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <a
                  href="https://wa.me/5491125419191"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex px-10 py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest rounded-full hover:bg-primary/90 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  Quiero la mía
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialProductSection;
