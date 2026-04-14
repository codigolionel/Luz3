import cakeClassic from "@/assets/cake-classic.jpg";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeThemed from "@/assets/cake-themed.jpg";
import cakeNaked from "@/assets/cake-naked.jpg";

const products = [
  { title: "Torta Clásica", description: "Elegante torta de pisos con buttercream, rosas y detalles dorados.", image: cakeClassic },
  { title: "Torta de Chocolate", description: "Irresistible torta de chocolate con ganache, frutos rojos y decoración premium.", image: cakeChocolate },
  { title: "Torta Temática", description: "Diseños creativos y personalizados para cada temática de cumpleaños.", image: cakeThemed },
  { title: "Naked Cake", description: "Torta rústica con capas visibles, flores naturales y frutas frescas.", image: cakeNaked },
];

const ProductSection = () => (
  <section id="products" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">Nuestras especialidades</span>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-3">Nuestras Tortas</h2>
        <div className="w-16 h-px bg-primary mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.title} className="group bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-border/50">
            <div className="aspect-square overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={512}
                height={512}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="font-serif text-lg text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductSection;
