import galleryCake from "@/assets/gallery-cake.jpg";
import tortas from "@/assets/tortas1.png";
import cakeClassic from "@/assets/cake-classic.jpg";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeThemed from "@/assets/cake-themed.jpg";
import cakeNaked from "@/assets/cake-naked.jpg";
import specialCake from "@/assets/special-cake.jpg";
import flavorVanilla from "@/assets/flavor-vanilla.jpg";
import flavorChoco from "@/assets/flavor-choco-cake.jpg";
import flavorRedvelvet from "@/assets/flavor-redvelvet.jpg";
import promoCake from "@/assets/promo-cake.jpg";
import heroImg from "@/assets/hero-cakes.jpg";

const images = [
  { src: tortas, alt: "Tortas especiales", className: "col-span-1 row-span-2" },
  { src: cakeClassic, alt: "Torta clásica con rosas", className: "col-span-1 row-span-1" },
  { src: cakeChocolate, alt: "Torta de chocolate", className: "col-span-1 row-span-1" },
  { src: galleryCake, alt: "Pastel decorado", className: "col-span-1 row-span-2" },
  { src: cakeThemed, alt: "Torta temática unicornio", className: "col-span-1 row-span-1" },
  { src: cakeNaked, alt: "Naked cake con flores", className: "col-span-1 row-span-1" },
  { src: specialCake, alt: "Torta de autor", className: "col-span-1 row-span-1" },
  { src: flavorVanilla, alt: "Torta de vainilla y fresas", className: "col-span-1 row-span-2" },
  { src: flavorChoco, alt: "Torta de chocolate premium", className: "col-span-1 row-span-1" },
  { src: flavorRedvelvet, alt: "Torta red velvet", className: "col-span-1 row-span-1" },
  { src: promoCake, alt: "Torta regalo", className: "col-span-1 row-span-1" },
  { src: heroImg, alt: "Torta de cumpleaños elegante", className: "col-span-1 row-span-2" },
];

const GallerySection = () => (
  <section id="gallery" className="py-20 md:py-28 bg-chocolate text-primary-foreground">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-primary-foreground/60 font-sans">Inspiración dulce</span>
        <h2 className="font-serif text-3xl md:text-5xl text-cream mt-3">Nuestras Creaciones</h2>
        <div className="w-16 h-px bg-primary mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4">
        {images.map((img, i) => (
          <div key={i} className={`${img.className} rounded-2xl overflow-hidden group`}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
