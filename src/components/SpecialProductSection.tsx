import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { ElegantDivider } from "@/components/ui/ElegantDivider";
import { Star } from "lucide-react";

import avatarMariana from "@/assets/avatars/mariana-l.svg";
import avatarLucas from "@/assets/avatars/lucas-p.svg";
import avatarSofia from "@/assets/avatars/sofia-m.svg";
import avatarValeria from "@/assets/avatars/valeria-c.svg";
const testimonials = [
  {
    name: "Mariana L.",
    avatar: avatarMariana,
    text: "Las tortas más ricas que probé. Se nota el amor y la dedicación en cada detalle. ¡Totalmente recomendadas para cualquier evento!",
    rating: 5,
  },
  {
    name: "Lucas P.",
    avatar: avatarLucas,
    text: "El cake pop fue la estrella del cumpleaños. Increíble sabor y una presentación hermosa que a todos les encantó.",
    rating: 5,
  },
  {
    name: "Sofía M.",
    avatar: avatarSofia,
    text: "Todo impecable, la presentación de los ice pops es hermosa y el sabor superó nuestras expectativas. ¡Volveremos a pedir!",
    rating: 5,
  },
  {
    name: "Valeria C.",
    avatar: avatarValeria,
    text: "Pedí una mesa dulce para el baby shower y fue un éxito. Las oreos bañadas son una delicia total. ¡Súper recomendable!",
    rating: 5,
  },
];



const CommunitySection = () => {
  const titleRef = useScrollReveal();
  const testRef = useStaggerReveal(":scope > div", { staggerMs: 150 });


  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-cream via-white to-rose-light/20">
      <div className="container mx-auto px-6 relative z-10">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase font-sans">Lo que dicen y vemos</span>
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mt-4">Nuestra Comunidad</h2>
          <div className="flex justify-center mt-6">
            <ElegantDivider />
          </div>
          <p className="text-chocolate/70 font-sans font-light mt-6 leading-relaxed max-w-2xl mx-auto text-lg">
            Gracias por ser parte de la familia Luz de Rosa. Cada reseña y foto compartida nos inspira a seguir creando momentos dulces.
          </p>
        </div>

        {/* Testimonials */}
        <div ref={testRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm ring-1 ring-black/5 hover:shadow-xl hover:-translate-y-1 hover:shadow-rose/10 transition-all duration-300 relative group">
              <div className="absolute top-0 right-0 p-8 text-rose-light/30 group-hover:text-rose/20 transition-colors">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-sans text-chocolate/80 font-light italic mb-8 relative z-10 leading-relaxed text-sm md:text-base">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={`Perfil de ${t.name}`}
                  className="h-10 w-10 rounded-full ring-2 ring-rose/20 bg-white object-cover"
                  loading="lazy"
                />
                <p className="font-serif font-bold text-chocolate uppercase tracking-wider text-xs">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
};

export default CommunitySection;
