import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import galleryCupcakes from "@/assets/gallery-cupcakes.jpg";
import galleryDonuts from "@/assets/gallery-donuts.jpg";
import galleryMacarons from "@/assets/gallery-macarons.jpg";
import galleryCake from "@/assets/gallery-cake.jpg";

const miniGallery = [galleryCupcakes, galleryDonuts, galleryMacarons, galleryCake];

const Footer = () => (
  <footer className="bg-chocolate text-cream">
    {/* Wave top */}
    <svg viewBox="0 0 1440 60" className="w-full block -mb-px" preserveAspectRatio="none">
      <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="hsl(var(--chocolate))" />
    </svg>

    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Contact */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl mb-6">Contacto</h3>
          <div className="flex items-start gap-3 text-sm font-sans text-cream/70">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <span>Calle de la Dulzura 42, Madrid, España</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-sans text-cream/70">
            <Phone className="w-4 h-4 shrink-0 text-primary" />
            <span>+34 912 345 678</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-sans text-cream/70">
            <Mail className="w-4 h-4 shrink-0 text-primary" />
            <span>hola@bellaria.es</span>
          </div>
        </div>

        {/* Logo center */}
        <div className="text-center">
          <h2 className="font-serif text-4xl mb-4">Luz de Rosas</h2>
          <p className="text-cream/60 font-sans text-sm leading-relaxed max-w-xs mx-auto">
            Repostería artesanal con alma. Cada creación es una obra de arte comestible.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <a href="#" className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mini gallery */}
        <div>
          <h3 className="font-serif text-xl mb-6 text-center md:text-right">Galería</h3>
          <div className="grid grid-cols-2 gap-2 max-w-[200px] ml-auto">
            {miniGallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Galería"
                loading="lazy"
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 mt-12 pt-8 text-center">
        <p className="text-cream/40 text-xs font-sans"><p className="text-cream/40 text-xs font-sans">© 2026 Luz de Rosas. Todos los derechos reservados.</p>. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
