import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import cakeClassic from "@/assets/hero-cakes1.webp";
import cupcake from "@/assets/gallery-cupcakes1.webp";
import cakePop from "@/assets/gallery-cakepops1.webp";
import oreo from "@/assets/chocolate-covered-oreos1.webp";
import icePop from "@/assets/gallery-popsicles1.webp";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

type ProductShowcase = {
  title: string;
  description: string;
  image: string;
  color: string;
  subtitle?: string;
};

const products: ProductShowcase[] = [
  {
    title: "Torta",
    description:
      "Capas suaves y rellenos caseros preparados a mano, con decoraciones delicadas y ese toque artesanal de pastelería de barrio.",
    image: cakeClassic,
    color: "bg-[#F28B66]",
  },
  {
    title: "Cupcake",
    description:
      "Pequeños bocados esponjosos con toppings cremosos y detalles únicos, ideales para compartir momentos dulces y especiales.",
    image: cupcake,
    color: "bg-[#BCA68E]",
  },
  {
    title: "Cake pop",
    description:
      "Bizcochuelo húmedo cubierto en chocolate y decorado a mano, combinando sabor casero y presentación divertida.",
    image: cakePop,
    color: "bg-[#F8B2CC]",
  },
  {
    title: "Oreo",
    description:
      "Galletitas bañadas en chocolate con terminaciones artesanales y diseños dulces que hacen cada pieza distinta y especial.",
    image: oreo,
    color: "bg-[#9FB64B]",
  },
  {
    title: "Ice pop",
    description:
      "Paletas heladas artesanales con sabores frescos, colores suaves y una presentación pensada para disfrutar algo rico y simple.",
    image: icePop,
    color: "bg-[#7FB6AB]",
  },
];

const ProductSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans">Nuestras especialidades</span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl text-chocolate mt-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            La Colección
          </motion.h2>
          <ElegantDivider />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-3">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
            >
              <div
                className="relative w-full h-[520px] md:h-[600px] overflow-hidden rounded-none bg-white ring-1 ring-black/5 cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="flex h-full flex-col">
                  {/* Top photo */}
                  <div className="h-[48%] w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Bottom solid block */}
                  <div className={`${p.color} h-[52%] px-8 pt-8 pb-7 text-white`}>
                    {p.subtitle ? (
                      <span className="block font-sans text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-white/90">
                        {p.subtitle}
                      </span>
                    ) : null}

                    <h3 className={`${p.subtitle ? "mt-6" : "mt-0"} font-sans text-[38px] leading-[1.05] tracking-tight text-white`}>
                      {p.title}
                    </h3>

                    <a
                      href="https://wa.me/5491125419191"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-white/90 border-b-2 border-white/70 pb-1 hover:border-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >

                    </a>

                    <p className="mt-5 font-sans text-lg md:text-base leading-relaxed text-white/85">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
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
