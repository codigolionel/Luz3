import promoCake from "@/assets/promo-cake.jpg";

const PromoBanner = () => (
  <section className="relative overflow-hidden">
    {/* Wave top */}
    <svg viewBox="0 0 1440 60" className="w-full block -mb-px" preserveAspectRatio="none">
      <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="hsl(var(--rose-light))" />
    </svg>

    <div className="bg-rose-light py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">Celebra con nosotros</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-3 leading-tight">
            La torta perfecta para tu cumpleaños
          </h2>
          <p className="text-muted-foreground font-sans mt-4 max-w-md leading-relaxed">
            Diseñamos y elaboramos tortas únicas para cumpleaños, con sabores exquisitos y decoraciones personalizadas que harán de tu celebración algo inolvidable.
          </p>
          <a
            href="#reservation"
            className="inline-block mt-8 px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest rounded-full hover:bg-primary/90 transition-colors"
          >
            Hacer Pedido
          </a>
        </div>

        <div className="flex-1 max-w-md">
          <img
            src={promoCake}
            alt="Torta de cumpleaños premium"
            loading="lazy"
            width={800}
            height={800}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* Wave bottom */}
    <svg viewBox="0 0 1440 60" className="w-full block -mt-px" preserveAspectRatio="none">
      <path d="M0,0 L1440,0 L1440,30 C960,60 480,0 0,30 Z" fill="hsl(var(--rose-light))" />
    </svg>
  </section>
);

export default PromoBanner;
