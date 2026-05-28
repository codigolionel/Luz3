import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

import galleryCake from "@/assets/gallery-cake.jpg";
import tortas from "@/assets/tortas1.png";
import cakeClassic from "@/assets/cake-classic.jpg";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeThemed from "@/assets/cake-themed.jpg";
import cakeNaked from "@/assets/cake-naked.jpg";
import specialCake from "@/assets/special-cake.jpg";
import flavorVanilla from "@/assets/flavor-vanilla.jpg";
import flavorChoco from "@/assets/flavor-choco-cake.jpg";
import flavorRedvelvet from "@/assets/flavor-redvelvet.jpg";
import promoCake from "@/assets/promo-cake.jpg";
import heroImg from "@/assets/hero-cakes.jpg";
import galleryRoses from "@/assets/gallery-roses.png";
import galleryPastel from "@/assets/gallery-pastel.png";
import galleryDrip from "@/assets/gallery-drip.png";
import galleryUnicorn from "@/assets/gallery-unicorn.png";

const images = [
  // Column 1
  { src: tortas, alt: "Tortas especiales", span: 2 },
  { src: cakeClassic, alt: "Torta clásica con rosas", span: 1 },
  { src: galleryRoses, alt: "Torta con rosas premium", span: 1 },
  // Column 2
  { src: cakeChocolate, alt: "Torta de chocolate", span: 1 },
  { src: galleryCake, alt: "Pastel decorado", span: 2 },
  { src: cakeThemed, alt: "Torta temática unicornio", span: 1 },
  // Column 3
  { src: cakeNaked, alt: "Naked cake con flores", span: 1 },
  { src: specialCake, alt: "Torta de autor", span: 1 },
  { src: flavorVanilla, alt: "Torta de vainilla y fresas", span: 2 },
  // Column 4
  { src: galleryPastel, alt: "Torta pastel de pisos", span: 2 },
  { src: flavorChoco, alt: "Torta de chocolate premium", span: 1 },
  { src: flavorRedvelvet, alt: "Torta red velvet", span: 1 },
  // Extra row for mobile balance
  { src: galleryDrip, alt: "Torta drip de chocolate", span: 1 },
  { src: promoCake, alt: "Torta regalo", span: 1 },
  { src: galleryUnicorn, alt: "Torta unicornio", span: 1 },
  { src: heroImg, alt: "Torta de cumpleaños elegante", span: 1 },
];

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const titleRef = useScrollReveal();
  const gridRef = useStaggerReveal(":scope > div", { staggerMs: 60 });

  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)), []);

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
    <section id="gallery" className="pt-16 pb-24 md:pt-20 md:pb-32 bg-white text-primary-foreground relative overflow-hidden">
      {/* Parallax background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-fixed bg-center bg-cover opacity-65 saturate-125 contrast-110"
        style={{ backgroundImage: `url(${flavorChoco})` }}
        aria-hidden="true"
      />

      {/* Darken for contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/65"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div ref={titleRef} className="text-center mb-16 md:mb-20 relative z-10">
          <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans">Galería</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-4">Inspiración Dulce</h2>
          <ElegantDivider />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[220px] gap-4 lg:gap-6 relative z-10"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-none overflow-hidden group cursor-pointer ${
                img.span === 2 ? "row-span-2" : "row-span-1"
              }`}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="absolute inset-2 border border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center relative z-10">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-chocolate px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-chocolate/20 transition-colors hover:bg-rose hover:shadow-rose/20"
          >
            Ver mas Productos en Instangram
          </a>
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
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" strokeWidth={1} />
          </button>

          <div className="absolute bottom-10 text-center w-full">
            <p className="text-white font-serif italic text-xl tracking-wide">{images[lightboxIndex].alt}</p>
            <p className="text-white/40 font-sans text-xs tracking-[0.2em] uppercase mt-2">{lightboxIndex + 1} &mdash; {images.length}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
