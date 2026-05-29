import flavorVanilla from "@/assets/flavor-vanilla.jpg";
import flavorChoco from "@/assets/flavor-choco-cake.jpg";
import flavorRedvelvet from "@/assets/flavor-redvelvet.jpg";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    title: "Ingredientes frescos, sin conservantes",
    description: "Usamos productos de calidad, seleccionados para que cada bocado sea rico y natural.",
    image: flavorVanilla,
    bgClass: "bg-[#f28b66]"
  },
  {
    title: "Diseño personalizado para cada ocasión",
    description: "Desde cumpleaños hasta baby showers, cada torta es única.",
    image: flavorChoco,
    bgClass: "bg-[#bca68e]"
  },
  {
    title: "Elaboración artesanal y profesionalismo",
    description: "Hecho a mano con dedicación, como en una pastelería de barrio de toda la vida.",
    image: flavorRedvelvet,
    bgClass: "bg-[#f8b2cc]"
  },
];

const FlavorsSection = () => {
  const titleRef = useScrollReveal();
  const gridRef = useStaggerReveal(":scope > div", { staggerMs: 150 });

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-[#1a1a1a] mb-5">Mi compromiso con cada torta</h2>
          <p className="text-gray-500 text-sm font-sans max-w-2xl mx-auto leading-relaxed">
            En cada torta pongo dedicación, ingredientes de calidad y un diseño pensado especialmente para vos. Conocé lo que me hace diferente.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div key={i} className={`${feature.bgClass} h-[500px] md:h-[600px] relative overflow-hidden flex flex-col group`}>
              <div className="p-8 md:p-10 z-10 relative">
                <div
                  className="text-white text-lg lg:text-xl font-semibold font-sans mb-4"
                >
                  {feature.title}
                </div>
                <p className="font-sans text-xs lg:text-sm text-white/90 leading-relaxed mb-8">
                  {feature.description}
                </p>

              </div>

              <div className="absolute bottom-0 left-0 w-full h-[55%] md:h-[60%] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title.replaceAll("\n", " ")}
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
