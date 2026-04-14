import flavorVanilla from "@/assets/flavor-vanilla.jpg";
import flavorChoco from "@/assets/flavor-choco-cake.jpg";
import flavorRedvelvet from "@/assets/flavor-redvelvet.jpg";

const flavors = [
  { name: "Vainilla & Fresas", image: flavorVanilla },
  { name: "Chocolate", image: flavorChoco },
  { name: "Red Velvet", image: flavorRedvelvet },
];

const FlavorsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">Sabores irresistibles</span>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-3">Nuestros Sabores</h2>
        <div className="w-16 h-px bg-primary mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {flavors.map((f) => (
          <div key={f.name} className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={f.image}
                alt={f.name}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-serif text-sm text-foreground">{f.name}</span>
            </div>
            <div className="absolute bottom-4 right-4">
              <button className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg hover:bg-primary/90 transition-colors">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FlavorsSection;
