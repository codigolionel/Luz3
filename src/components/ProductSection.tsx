import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import cakeClassic from "@/assets/cake-classic.jpg";
import cupcake from "@/assets/gallery-cupcakes.jpg";
import cakePop from "@/assets/gallery-cakepops.jpg";
import oreo from "@/assets/chocolate-covered-oreos.png";
import icePop from "@/assets/gallery-popsicles.jpg";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

const products = [
  {
    subtitle: "RECETA ARTESANAL",
    title: "Torta",
    description:
      "Capas suaves y rellenos caseros preparados a mano, con decoraciones delicadas y ese toque artesanal de pastelería de barrio hecha con dedicación.",
    image: cakeClassic,
    color: "bg-[#F28B66]",
  },
  {
    subtitle: "RECETA ARTESANAL",
    title: "Cupcake",
    description:
      "Pequeños bocados esponjosos con toppings cremosos y detalles únicos, ideales para compartir momentos dulces y especiales.",
    image: cupcake,
    color: "bg-[#BCA68E]",
  },
  {
    subtitle: "RECETA ARTESANAL",
    title: "Cake pop",
    description:
      "Bizcochuelo húmedo cubierto en chocolate y decorado a mano, combinando sabor casero y presentación divertida.",
    image: cakePop,
    color: "bg-[#F8B2CC]",
  },
  {
    subtitle: "RECETA ARTESANAL",
    title: "Oreo bañadas",
    description:
      "Galletitas bañadas en chocolate con terminaciones artesanales y diseños dulces que hacen cada pieza distinta y especial.",
    image: oreo,
    color: "bg-[#C7E35E]",
  },
  {
    subtitle: "RECETA ARTESANAL",
    title: "Ice pop",
    description:
      "Paletas heladas artesanales con sabores frescos, colores suaves y una presentación pensada para disfrutar algo rico y simple.",
    image: icePop,
    color: "bg-[#9FE3D6]",
  },
];

const ProductSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const titleRef = useScrollReveal();
  const gridRef = useStaggerReveal(":scope > div", { staggerMs: 150 });

  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + products.length) % products.length : null)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % products.length : null)), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, prev, next]);

  return (
    <section id="products" className="pt-24 md:pt-32 pb-8 md:pb-12 bg-background relative overflow-hidden">
      {/* Decorative large blurred circle behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans">Nuestras especialidades</span>
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mt-4">La Colección</h2>
          <ElegantDivider />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-3">
          {products.map((p, i) => (
            <div key={p.title} className="group flex flex-col items-center">
              <div
                className="relative w-full h-[520px] md:h-[600px] overflow-hidden rounded-none bg-white shadow-lg ring-1 ring-black/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="flex h-full flex-col">
                  {/* Top photo */}
                  <div className="h-[48%] w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom solid block */}
                  <div className={`${p.color} h-[52%] px-8 pt-8 pb-7 text-white`}>
                    <span className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-white/90">
                      {p.subtitle}
                    </span>

                    <h3 className="mt-6 font-sans text-[44px] leading-[1.05] tracking-tight text-white">
                      {p.title}
                    </h3>

                    <a
                      href="https://wa.me/5491125419191"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-white/90 border-b-2 border-white/70 pb-1 hover:border-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      PEDIR AHORA
                    </a>

                    <p className="mt-5 font-sans text-xs leading-relaxed text-white/85">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" strokeWidth={1} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" strokeWidth={1} />
          </button>

          <img
            src={products[lightboxIndex].image}
            alt={products[lightboxIndex].title}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl animate-in zoom-in-95 duration-300 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" strokeWidth={1} />
          </button>

          <div className="absolute bottom-10 text-center w-full">
            <p className="text-white font-serif italic text-2xl tracking-wide">
              {products[lightboxIndex].title}
            </p>
            <p className="text-white/60 font-sans mt-2 max-w-xl mx-auto px-6 text-sm">
              {products[lightboxIndex].description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
