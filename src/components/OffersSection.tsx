import { useScrollReveal } from "@/hooks/useScrollReveal";
import sweetProductsGroup from "@/assets/offers.png";

const OffersSection = () => {
  const revealTitle = useScrollReveal({ delay: 100 });
  const revealImage = useScrollReveal({ delay: 200 });
  const revealBottom = useScrollReveal({ delay: 300 });

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        {/* Top Header */}
        <div ref={revealTitle} className="mb-10">
          <h2 className="text-[#5d473a] font-sans text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-wide leading-tight">
            Diferentes tipos de tortas y dulces
          </h2>
          <p className="text-[#bca68e] font-sans text-sm md:text-base font-medium uppercase tracking-[0.15em] mt-4">
            Encontrarás solo los mejores productos
          </p>
        </div>

        {/* Central Image */}
        <div ref={revealImage} className="flex justify-center mb-10">
          <img
            src={sweetProductsGroup}
            alt="Grupo de tortas y dulces artesanales"
            className="w-full max-w-[620px] h-auto object-contain transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Bottom Section */}
        <div ref={revealBottom} className="flex flex-col items-center">
          <span className="text-[#f28b66] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3">
            Mejorando dia a dia, solo por pasion
          </span>
          <div className="w-12 h-[2px] bg-[#f28b66] mb-5" />
          <p className="text-foreground/60 font-sans text-sm md:text-base max-w-[480px] leading-relaxed">
            Ofrecemos una propuesta diferente para cada uno de nuestros clientes, garantizando una experiencia dulce y memorable en cada bocado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
