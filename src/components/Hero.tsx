import { motion } from "framer-motion";
import hero640 from "@/assets/hero-cakes-640.webp";
import hero1280 from "@/assets/hero-cakes-1280.webp";
import hero1920 from "@/assets/hero-cakes-1920.webp";

const Hero = () => {
  return (
    <section className="relative h-[calc(100dvh-3.5rem)] md:h-[calc(100dvh-4rem)] min-h-[560px] flex items-center justify-center overflow-hidden pb-16">

      <motion.img
        src={hero1280}
        srcSet={`${hero640} 640w, ${hero1280} 1280w, ${hero1920} 1920w`}
        sizes="(max-width: 768px) 640px, (max-width: 1280px) 1280px, 1920px"
        alt="Tortas de cumpleaños artesanales"
        className="absolute inset-0 bottom-16 w-full h-full object-cover object-center"
        width={1920} height={1080}
        loading="eager"
        decoding="async"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Badge decorativo */}
        <motion.div
          className="flex items-center justify-center gap-1 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <span className="block w-16 h-px bg-white/60" />
          <span className="text-white/80 text-xs tracking-[0.3em] uppercase font-sans">
            Tortas Artesanales
          </span>
          <span className="block w-16 h-px bg-white/60" />
        </motion.div>

        {/* Título: entra desde la izquierda */}
        <motion.h1
          className="font-serif text-[52px] md:text-7xl lg:text-7xl text-white leading-tight mb-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Una Torta única,{" "}
          <span className="italic text-green-200 text-shadow-sm">para un momento </span>especial
        </motion.h1>

        {/* Párrafo: entra desde la derecha con blur */}
        <motion.p
          className="text-white text-lg md:text-lg font-sans max-w-xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ x: 40, opacity: 0, filter: "blur(5px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.85 }}
        >
          Diseños únicos para cada festejo. Tortas, cupcakes, popcakes y más — con amor artesanal.
        </motion.p>

        {/* CTA: fade simple al final */}
        <motion.a
          href="https://wa.me/5491125419191"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-10 py-3 border border-white/60 text-white text-sm uppercase font-medium tracking-[0.2em] hover:bg-white/10 transition-colors rounded-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
        >
          Pedí tu torta
        </motion.a>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;