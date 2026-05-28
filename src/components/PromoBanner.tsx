import promoCake from "@/assets/promo-cake.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

const PromoBanner = () => {
  const textRef = useScrollReveal();
  const imgRef = useScrollReveal({ delay: 200 });

  return (
    <section className="relative overflow-hidden bg-rose-light py-24 md:py-32">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-16 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div ref={textRef} className="flex-1 text-center md:text-left">
              <span className="text-chocolate/60 text-xs font-semibold tracking-[0.3em] uppercase font-sans">Momentos Inolvidables</span>
              <h2 className="font-serif text-4xl md:text-5xl text-chocolate mt-4 leading-tight">
                ¿Tenés un festejo en puerta?
              </h2>
              <div className="flex justify-center md:justify-start">
                <ElegantDivider />
              </div>
              <p className="text-chocolate/80 font-sans font-light mt-4 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                Diseños elaborados a la medida de tus deseos. Seleccionamos cuidadosamente las flores, los colores y los ingredientes que representarán a la perfección tu nueva vuelta al sol.
              </p>
              <a
                href="https://wa.me/5491125419191"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-8 px-10 py-4 bg-chocolate text-white text-xs uppercase font-semibold tracking-[0.2em] rounded hover:bg-gold transition-colors duration-300"
              >
                Consultá disponibilidad
              </a>
            </div>

            <div ref={imgRef} className="flex-1 max-w-md relative">
              <div className="absolute inset-0 bg-gold/10 transform rotate-6 rounded-3xl" />
              <img
                src={promoCake}
                alt="Torta de cumpleaños premium"
                loading="lazy"
                width={800}
                height={800}
                className="relative rounded-3xl shadow-xl w-full object-cover aspect-[4/3] border-[6px] border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
