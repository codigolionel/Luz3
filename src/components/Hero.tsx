import heroImg from "@/assets/hero-macarons.jpg";

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img
      src={heroImg}
      alt="Macarons artesanales"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-chocolate/40" />

    <div className="relative z-10 text-center px-6 max-w-3xl">
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="block w-16 h-px bg-primary-foreground/60" />
        <span className="text-primary-foreground/80 text-xs tracking-[0.3em] uppercase font-sans">
          Repostería Artesanal
        </span>
        <span className="block w-16 h-px bg-primary-foreground/60" />
      </div>

      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-tight mb-6">
        Bienvenidos a{" "}
        <span className="italic text-rose-light">Luz de Rosas</span>
      </h1>

      <p className="text-primary-foreground/80 text-base md:text-lg font-sans max-w-xl mx-auto mb-8">
        Creamos dulces momentos con recetas artesanales, ingredientes selectos y un toque de elegancia en cada bocado.
      </p>

      <a
        href="#products"
        className="inline-block px-8 py-3 border border-primary-foreground/60 text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary-foreground/10 transition-colors rounded-full"
      >
        Descubrir
      </a>
    </div>

    {/* Wave separator */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none">
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill="hsl(var(--background))"
        />
      </svg>
    </div>
  </section>
);

export default Hero;
