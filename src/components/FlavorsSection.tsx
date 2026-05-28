import flavorVanilla from "@/assets/flavor-vanilla.jpg";
import flavorChoco from "@/assets/flavor-choco-cake.jpg";
import flavorRedvelvet from "@/assets/flavor-redvelvet.jpg";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const flavors = [
  { 
    subtitle: "RECETA ARTESANAL",
    name: "Vainilla\n&\nCanelo", 
    image: flavorVanilla,
    bgColor: "bg-[#f28b66]"
  },
  { 
    subtitle: "RECETA ARTESANAL",
    name: "Chocolate\nIntenso\n70%", 
    image: flavorChoco,
    bgColor: "bg-[#bca68e]"
  },
  { 
    subtitle: "RECETA ARTESANAL",
    name: "Red Velvet\nClásico", 
    image: flavorRedvelvet,
    bgColor: "bg-[#f8b2cc]"
  },
];

const FlavorsSection = () => {
  const titleRef = useScrollReveal();
  const gridRef = useStaggerReveal(":scope > div", { staggerMs: 150 });

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-[#1a1a1a] mb-5">Sabores de la Casa</h2>
          <p className="text-gray-500 text-sm font-sans max-w-2xl mx-auto leading-relaxed">
            Tres clásicos que siempre vuelven. Combinaciones equilibradas, ingredientes premium y ese toque casero que se nota en cada bocado.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {flavors.map((f, i) => (
            <div key={i} className={`${f.bgColor} h-[500px] md:h-[600px] relative overflow-hidden flex flex-col group`}>
              <div className="p-8 md:p-10 z-10 relative">
                <span className="text-white/90 text-[10px] font-semibold tracking-[0.15em] uppercase font-sans mb-4 block">
                  {f.subtitle}
                </span>
                <h3 className="font-serif text-4xl lg:text-[2.75rem] text-white leading-[1.1] mb-8 whitespace-pre-line">
                  {f.name}
                </h3>
                <a
                  href="https://wa.me/5491125419191"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white uppercase text-[11px] font-bold tracking-[0.15em] border-b-2 border-white/80 pb-1 hover:border-white transition-colors inline-block"
                >
                  PEDIR AHORA
                </a>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-[55%] md:h-[60%] overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name.replaceAll("\n", " ")}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlavorsSection;
