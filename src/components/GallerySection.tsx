import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

import galBack from "@/assets/gal-back.webp";

import amongUs from "@/assets/among-us.webp";
import batman from "@/assets/batman.webp";
import bautistaAuto from "@/assets/bautista-auto.webp";
import benraiza from "@/assets/Benraiza.webp";
import egresados from "@/assets/egresados.webp";
import fernet2 from "@/assets/fernet2.webp";
import harryPotter from "@/assets/harry-Potter.webp";
import laura from "@/assets/laura.webp";
import maciel from "@/assets/Maciel.webp";
import minions from "@/assets/minions.webp";

const images: { src: string; alt: string; fit?: "contain" | "cover"; className?: string }[] = [
  { src: minions, alt: "personajes minions" },
  { src: harryPotter, alt: "harry-Potter" },
  { src: batman, alt: "Batman", fit: "cover" },
  { src: amongUs, alt: "personaje rojo 3D", fit: "cover" },
  { src: bautistaAuto, alt: "Aauto azul con nombre" },
  { src: egresados, alt: "Gorro egresado mas estrella" },
  { src: benraiza, alt: "lavarropas con muñeco" },
  { src: laura, alt: "útiles escolares coloridos" },
  // Center the last row (4/4/2) on mobile/tablet.
  { src: maciel, alt: "Piolín y personajes Looney Tunes", className: "col-start-2 sm:col-start-2 lg:col-auto" },
  { src: fernet2, alt: "lata de Fernet realista", fit: "cover" },
];

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      {/* Background image (parallax-like fixed on md+) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-65 saturate-[1.25] contrast-[1.1] will-change-transform"
        style={{ backgroundImage: `url(${galBack})` }}
        aria-hidden="true"
      />

      {/* Darken for contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/65"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="text-center mb-16 md:mb-20 relative z-10">
          <motion.h2
            className="font-serif text-4xl md:text-5xl text-white mt-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Mi trabajo
          </motion.h2>
          <motion.p
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans mt-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            Galería
          </motion.p>
          <ElegantDivider />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-6 relative z-10 max-w-6xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`relative rounded-none overflow-hidden group cursor-pointer aspect-[3/4] bg-white/10 ${img.className ?? ""}`}
              onClick={() => setLightboxIndex(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
            >
              <div className="absolute inset-2 border border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full h-full ${img.fit === "cover" ? "object-cover" : "object-contain"} group-hover:scale-[1.02] transition-transform duration-700 filter brightness-95 group-hover:brightness-100`}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center relative z-10">
          <a
            href="https://www.facebook.com/luz.de.rosa.2025"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-chocolate px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-chocolate/20 transition-colors hover:bg-rose hover:shadow-rose/20"
          >
            Ver mas Productos en Facebook
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {
        lightboxIndex !== null && (
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

            <div className="absolute bottom-16 md:bottom-14 text-center w-full">
              <div className="mx-auto inline-block rounded-xl bg-black/70 px-5 py-3">
                <p className="text-white font-serif italic text-xl tracking-wide">{images[lightboxIndex].alt}</p>
                <p className="text-white/60 font-sans text-xs tracking-[0.2em] uppercase mt-2">{lightboxIndex + 1} &mdash; {images.length}</p>
              </div>
            </div>
          </div>
        )
      }
    </section >
  );
};

export default GallerySection;
