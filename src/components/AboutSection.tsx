import aboutImg from "@/assets/about-us.webp";
import logo from "@/assets/logo.webp";
import { motion } from "framer-motion";
import { ElegantDivider } from "@/components/ui/ElegantDivider";

const AboutSection = () => {
  return (
    <section id="about" className="py-10 md:py-10 bg-background relative overflow-hidden">
      {/* Decorative floral-like blurred background blob */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl border-8 border-white">
              <img
                src={aboutImg}
                alt="Nuestra pastelera creando una torta"
                loading="lazy"
                width={800}
                height={1000}
                className="w-full aspect-[3/4] object-cover rounded-xl"
              />
            </div>
          </motion.div>

          <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans">Quién soy</span>

            <motion.h2
              className="font-serif text-4xl md:text-5xl text-chocolate mt-12 leading-tight"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Mi verdadera Pasión
            </motion.h2>
            <div className="flex justify-center lg:justify-start">
              <ElegantDivider />
            </div>

            <motion.p
              className="text-foreground/80 font-sans font-light mt-2 text-lg leading-relaxed"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              Hago <span className="font-serif italic text-chocolate font-medium">tortas</span>  que cuentan historias. Cada pieza la pienso para vos, con ingredientes frescos y ese toque artesanal que marca la diferencia. <br></br>Porque cada festejo merece algo único — no una torta más, sino una especial para ese momento .<br></br>
              Desde el diseño hasta el último detalle, le pongo el mismo cuidado y amor a cada pedido, sea un cumpleaños, una boda o cualquier festejo que valga la pena recordar.
            </motion.p>
            <p className="mt-4"></p>
            <p className="text-chocolate text-sm font-medium mt-24  text-center">
              Romina Brito - Creadora de tortas y dulces personalizados
            </p>
            <div className="mt-4 flex justify-center">
              <img
                src={logo}
                alt="Luz de Rosa"
                className="h-14 md:h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div >
    </section >
  );
};

export default AboutSection;
