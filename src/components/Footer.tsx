import { useEffect, useState } from "react";
import { Instagram, Facebook, ChevronUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const footerRef = useScrollReveal();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-r from-[#F8B2CC] to-[#F28B66] text-gray-900 relative">
      <div ref={footerRef} className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-stretch">
          
          {/* Left Column: Contact and Navigation */}
          <div className="grid grid-cols-2 gap-8 lg:pr-12">
            <div>
              <h3 className="font-serif text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                contacto
              </h3>
              <div className="h-[1.5px] w-6 bg-black/20 mt-2 mb-6"></div>
              <ul className="space-y-4 text-xs font-sans text-gray-800">
                <li>
                  <span className="font-semibold text-gray-900">Celular:</span> +54 9 11 1234-5678
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Email:</span> contacto@luzderosa.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                navegación
              </h3>
              <div className="h-[1.5px] w-6 bg-black/20 mt-2 mb-6"></div>
              <ul className="space-y-3 text-xs font-sans text-gray-800">
                <li>
                  <a href="#" className="hover:text-black transition-colors">Inicio</a>
                </li>
                <li>
                  <a href="#catalogo" className="hover:text-black transition-colors">Productos</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-black transition-colors">Sobre Nosotros</a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Center Column: Logo and Socials */}
          <div className="lg:px-12 border-t lg:border-t-0 lg:border-x border-black/10 py-8 lg:py-0 flex flex-col items-center justify-center text-center">
            <h2 className="font-serif text-[2.75rem] md:text-[3.5rem] font-extrabold tracking-tighter text-gray-900 mb-8 leading-none">
              Luz de Rosa
            </h2>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center bg-white/10 text-gray-900/70 transition-all hover:bg-white/15 hover:text-gray-900 hover:border-black/30 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center bg-white/10 text-gray-900/70 transition-all hover:bg-white/15 hover:text-gray-900 hover:border-black/30 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://wa.me/5491125419191"
                className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center bg-white/10 text-gray-900/70 transition-all hover:bg-white/15 hover:text-gray-900 hover:border-black/30 hover:-translate-y-0.5"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 0C5.44 0 .06 5.38.06 11.99c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.62a11.9 11.9 0 0 0 5.84 1.49h.01c6.6 0 11.98-5.38 11.99-11.99A11.9 11.9 0 0 0 12.04 0Zm6.94 17.35c-.29.82-1.7 1.56-2.34 1.65-.58.09-1.34.13-2.17-.14-.5-.16-1.14-.37-1.96-.73-3.45-1.5-5.7-5.15-5.87-5.39-.17-.24-1.4-1.87-1.4-3.57 0-1.7.9-2.53 1.22-2.88.32-.35.7-.44.93-.44.24 0 .47 0 .67.01.22.01.5-.08.78.6.29.7 1 2.44 1.09 2.62.09.18.15.4.03.65-.12.24-.18.4-.35.62-.18.21-.37.47-.53.63-.18.18-.36.37-.15.72.22.35.97 1.6 2.09 2.59 1.44 1.28 2.65 1.67 3.02 1.86.37.18.58.15.8-.09.22-.24.92-1.08 1.17-1.45.25-.37.5-.3.84-.17.35.12 2.2 1.04 2.58 1.23.38.18.63.28.72.43.09.15.09.88-.2 1.7Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Mini Map & Privacy Policy */}
          <div className="lg:pl-12 flex flex-col justify-between">
            <div className="w-full">
              <iframe 
                src="https://maps.google.com/maps?q=Ituzaing%C3%B3,%20Buenos%20Aires,%20Argentina&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="150" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-sm border border-black/5"
                title="Mapa de ubicación en Ituzaingó"
              ></iframe>
            </div>
            <div className="mt-4 text-center lg:text-left">
              <a
                href="/privacy"
                className="text-gray-800 hover:text-black text-xs font-sans transition-colors underline underline-offset-4"
              >
                Política de Privacidad
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-black/10 mt-16 pt-8 text-center">
          <p className="text-gray-700 text-[10px] font-sans">
            © {new Date().getFullYear()} Luz de Rosa. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-black text-white shadow-lg transition-all duration-300 hover:bg-gray-800 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
