import flavorVanilla from "@/assets/flavor-vanilla.webp";
import flavorChoco from "@/assets/flavor-choco-cake.webp";
import flavorRedvelvet from "@/assets/flavor-redvelvet.webp";
import { motion } from "framer-motion";

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
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            className="font-serif text-4xl md:text-[2.75rem] text-[#1a1a1a] mb-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            De la idea al resultado final
          </motion.h2>
          <p className="text-gray-500 text-lg lg:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
            No es solo hornear. Es escuchar lo que necesitás, diseñarlo y hacerlo realidad con los mejores ingredientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={`${feature.bgClass} h-[500px] md:h-[600px] relative overflow-hidden flex flex-col group`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
            >
              <div className="p-8 md:p-10 z-10 relative">
                <div
                  className="text-white text-[25px] lg:text-xl font-semibold font-sans mb-4"
                >
                  {feature.title}
                </div>
                <p className="font-sans text-lg lg:text-base text-white/90 leading-relaxed mb-8">
                  {feature.description}
                </p>

              </div>

              <div className="absolute bottom-0 left-0 w-full h-[55%] md:h-[60%] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlavorsSection;
