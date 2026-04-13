import galleryCupcakes from "@/assets/gallery-cupcakes.jpg";
import galleryDonuts from "@/assets/gallery-donuts.jpg";
import galleryPopsicles from "@/assets/gallery-popsicles.jpg";
import galleryMacarons from "@/assets/gallery-macarons.jpg";
import galleryCake from "@/assets/gallery-cake.jpg";
import tortas from "@/assets/tortas1.png";
import galleryEclairs from "@/assets/gallery-eclairs.jpg";
import galleryProfiteroles from "@/assets/gallery-profiteroles.jpg";
import galleryTarts from "@/assets/gallery-tarts.jpg";
import galleryCakepops from "@/assets/gallery-cakepops.jpg";
import galleryTruffles from "@/assets/gallery-truffles.jpg";
import galleryMillefeuille from "@/assets/gallery-millefeuille.jpg";

const images = [
  { src: galleryCupcakes, alt: "Cupcakes artesanales", className: "col-span-1 row-span-1" },
  { src: galleryMacarons, alt: "Torre de macarons", className: "col-span-1 row-span-2" },
  { src: galleryDonuts, alt: "Donuts coloridos", className: "col-span-1 row-span-1" },
  { src: galleryCake, alt: "Pastel decorado", className: "col-span-1 row-span-2" },
  { src: galleryPopsicles, alt: "Paletas de fresa", className: "col-span-1 row-span-1" },
  { src: tortas, alt: "Tortas especiales", className: "col-span-1 row-span-1" },
  { src: galleryEclairs, alt: "Éclairs franceses", className: "col-span-1 row-span-1" },
  { src: galleryProfiteroles, alt: "Profiteroles", className: "col-span-1 row-span-2" },
  { src: galleryTarts, alt: "Mini tartas de frutas", className: "col-span-1 row-span-1" },
  { src: galleryCakepops, alt: "Cake pops", className: "col-span-1 row-span-1" },
  { src: galleryTruffles, alt: "Trufas de chocolate", className: "col-span-1 row-span-1" },
  { src: galleryMillefeuille, alt: "Milhojas", className: "col-span-1 row-span-2" },
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
