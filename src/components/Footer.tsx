import { useEffect, useRef, useState } from "react";
import { Instagram, Facebook, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadMap, setLoadMap] = useState(false);
  const mapMountRef = useRef<HTMLDivElement | null>(null);
  const showRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        tickingRef.current = false;
        const next = window.scrollY > window.innerHeight * 0.75;
        if (next !== showRef.current) {
          showRef.current = next;
          setShowScrollTop(next);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = mapMountRef.current;
    if (!el || loadMap) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        if (anyVisible) {
          setLoadMap(true);
          obs.disconnect();
        }
      },
      // Start loading shortly before it becomes visible.
      { root: null, rootMargin: "300px 0px", threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMap]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-gradient-to-r from-[#F8B2CC] to-[#F28B66] text-white relative">
      <motion.div
        className="container mx-auto px-6 md:px-8 py-20 max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-stretch">

          {/* Left Column: Contact and Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pr-12">
            <div>
              <h3 className="font-serif text-xs font-bold tracking-[0.2em] text-white uppercase">
                contacto
              </h3>
              <div className="h-[1.5px] w-6 bg-white/25 mt-2 mb-6"></div>
              <ul className="space-y-4 text-base lg:text-sm font-sans text-white/85">
                <li>
                  <span className="font-semibold text-white">Celular:</span> <a className="underline underline-offset-4 decoration-white/40 hover:decoration-white" href="https://wa.me/5491125419191" target="_blank" rel="noopener noreferrer">+54 9 11 2541 9191</a>
                </li>
                <li>
                  <span className="font-semibold text-white">Email:</span> B_romina2024@hotmail.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xs font-bold tracking-[0.2em] text-white uppercase">
                navegación
              </h3>
              <div className="h-[1.5px] w-6 bg-white/25 mt-2 mb-6"></div>
              <ul className="space-y-3 text-base lg:text-sm font-sans text-white/85">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTop();
                    }}
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#catalogo"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("catalogo");
                    }}
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("about");
                    }}
                  >
                    Quién Soy
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("faq");
                    }}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Center Column: Logo and Socials */}
          <div className="lg:px-12 border-t lg:border-t-0 lg:border-x border-white/15 py-8 lg:py-0 flex flex-col items-center justify-center text-center">
            <h2 className="font-serif text-[2.75rem] md:text-[3.5rem] font-extrabold tracking-tighter text-white mb-8 leading-none">
              Luz de Rosa
            </h2>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/luz_de_rosa_pasteleria?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center bg-white/10 text-white/80 transition-all hover:bg-white/15 hover:text-white hover:border-white/40 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.facebook.com/luz.de.rosa.2025"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center bg-white/10 text-white/80 transition-all hover:bg-white/15 hover:text-white hover:border-white/40 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://wa.me/5491125419191"
                className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center bg-white/10 text-white/80 transition-all hover:bg-white/15 hover:text-white hover:border-white/40 hover:-translate-y-0.5"
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
                  <path d="M12.04 0C5.44 0 .06 5.38.06 11.99c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.62a11.9 11.9 0 0 0 5.84 1.49h.01c6.6 0 11.98-5.38 11.99-11.99A11.9 11.9 0 0 0 12.04 0Zm6.94 17.35c-.29.82-1.7 1.56-2.34 1.65-.58.09-1.34.13-2.17-.14-.5-.16-1.14-.37-1.96-.73-3.45-1.5-5.7-5.15-5.87-5.39-.17-.24-1.4-1.87-1.4-3.57 0-1.7.9-2.53 1.22-2.88.32-.35.7-.44.93-.44.24 0 .47 0 .67.01.22.01.5-.08.78.6.29.7 1 2.44 1.09 2.62.09.18.15.4.03.65-.12.24-.18.4-.35.62-.18.21-.37.47-.53.63-.18.18-.36.37-.15.72.22.35.97 1.6 2.09 2.59 1.44 1.28 2.65 1.67 3.02 1.86.37.18.58.15.8-.09.22-.24.92-1.08 1.17-1.45.25-.37.5-.3.84-.17.35.12 2.2 1.04 2.58 1.23.38.18.63.28.72.43.09.15.09.88-.2 1.7Z" />
                </svg>
              </a>
            </div>

            <div className="mt-6">
              <a
                href="/privacy"
                className="text-white/90 hover:text-white text-base font-sans transition-colors underline underline-offset-4"
              >
                Política de Privacidad
              </a>
            </div>
          </div>

          {/* Right Column: Mini Map & Privacy Policy */}
          <div className="lg:pl-12 flex flex-col justify-between">
            <div className="w-full" ref={mapMountRef}>
              {loadMap ? (
                <iframe
                  src="https://maps.google.com/maps?q=Aguaribay%202678,%20B1714BYV%20Ituzaing%C3%B3,%20Provincia%20de%20Buenos%20Aires&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="shadow-sm border border-white/15"
                  title="Mapa de ubicación en Ituzaingó"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setLoadMap(true)}
                  className="w-full h-[150px] rounded-lg border border-white/20 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-sans tracking-[0.14em] uppercase hover:bg-white/25 transition-colors"
                  aria-label="Cargar mapa"
                >
                  Ver mapa
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/15 mt-12 pt-8 text-center">
          <p className="text-white/80 text-[10px] font-sans">
            © {new Date().getFullYear()} Luz de Rosa. All rights reserved.
          </p>
        </div>
      </motion.div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-black text-white shadow-lg transition-all duration-300 hover:bg-gray-800 ${showScrollTop
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
