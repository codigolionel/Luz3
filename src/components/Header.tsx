import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Quién Soy", href: "#about" },
  { label: "Productos", href: "#catalogo" },
  { label: "Galería", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const lastHiddenRef = useRef(false);
  const lastScrolledRef = useRef(false);

  useEffect(() => {
    const update = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    update();
    window.addEventListener("resize", update, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    lastHiddenRef.current = hidden;
    lastScrolledRef.current = scrolled;

    const compute = () => {
      tickingRef.current = false;
      const y = window.scrollY;
      const lastY = lastYRef.current;

      const nextScrolled = y > 50;

      let nextHidden = false;
      if (!mobileOpen) {
        // Keep navigation always visible on mobile.
        if (isMobile) {
          nextHidden = false;
        } else
        if (y < 24) {
          nextHidden = false;
        } else {
          const goingDown = y > lastY;
          nextHidden = goingDown && y > 120;
        }
      }

      if (nextScrolled !== lastScrolledRef.current) {
        lastScrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (nextHidden !== lastHiddenRef.current) {
        lastHiddenRef.current = nextHidden;
        setHidden(nextHidden);
      }

      lastYRef.current = y;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    // Run once on mount/update.
    compute();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, isMobile]);

  // If the menu opens, force header visible.
  useEffect(() => {
    if (mobileOpen) setHidden(false);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-[transform,box-shadow,border-color] duration-300 ${
          !isMobile && hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled ? "shadow-md border-b border-border/40" : "border-b border-black/5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-20 md:h-16">
          <a href="#" className="flex items-center h-full py-0 my-0" aria-label="Ir al inicio">
              <img
                src={logo}
                alt="Luz de Rosa"
                className="h-full max-h-full object-contain block py-0 my-0"
              />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-chocolate/80 transition-colors hover:bg-rose hover:text-white"
            >
              {link.label}
            </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/5491125419191"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex px-5 py-2.5 bg-rose text-white font-sans text-xs uppercase font-bold tracking-[0.2em] rounded hover:bg-chocolate hover:text-white transition-colors duration-300"
            >
              Tomar Pedido
            </a>
            <button
              className="md:hidden text-chocolate/80 hover:text-chocolate"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
                {mobileOpen ? <X className="w-7 h-7" strokeWidth={1.5} /> : <Menu className="w-7 h-7" strokeWidth={1.5} />}
              </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-[100]"
            role="dialog"
            aria-modal="true"
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              className="absolute inset-0 bg-black/35 backdrop-blur-sm"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.18 } },
                exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.14 } },
              }}
            />

            {/* Fullscreen panel */}
            <motion.div
              className="absolute inset-0 h-full w-full rounded-none bg-background/70 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 overflow-hidden"
              variants={{
                hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 },
                show: prefersReducedMotion
                  ? { opacity: 1, transition: { duration: 0 } }
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 520, damping: 44 },
                    },
                exit: prefersReducedMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.16 } },
              }}
            >
              <div className="flex h-full flex-col">
                {/* Top section */}
                <div className="relative flex-1 bg-black/90 text-white px-8 py-10">
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      aria-label="Cerrar menú"
                      className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                    >
                      <X className="h-5 w-5" strokeWidth={1.75} />
                    </button>

                    <motion.nav
                      className="mt-16 space-y-6 text-center"
                      variants={{
                        hidden: {},
                        show: {
                          transition: prefersReducedMotion
                            ? { staggerChildren: 0 }
                            : { staggerChildren: 0.06, delayChildren: 0.02 },
                        },
                        exit: { transition: prefersReducedMotion ? {} : { staggerChildren: 0.03, staggerDirection: -1 } },
                      }}
                    >
                      {navLinks.map((link) => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className="block text-base font-bold tracking-[0.22em] uppercase text-white/90 transition-colors hover:text-[#F8B2CC]"
                          onClick={() => setMobileOpen(false)}
                          variants={{
                            hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(2px)" },
                            show: prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                            exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(2px)", transition: { duration: 0.12 } },
                          }}
                        >
                          {link.label}
                        </motion.a>
                      ))}

                      <motion.a
                        href="https://wa.me/5491125419191"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-12 inline-flex items-center justify-center rounded-full bg-rose px-7 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-colors hover:bg-chocolate"
                        onClick={() => setMobileOpen(false)}
                        variants={{
                          hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(2px)" },
                          show: prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                          exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(2px)", transition: { duration: 0.12 } },
                        }}
                      >
                        Tomar Pedido
                      </motion.a>

                      <motion.div
                        className="pt-4 flex items-center justify-center gap-4"
                        variants={{
                          hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
                          show: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.2 } },
                          exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, transition: { duration: 0.12 } },
                        }}
                      >
                        <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Instagram"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-sm ring-1 ring-white/15 transition-colors hover:bg-white/15"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Instagram className="h-5 w-5" strokeWidth={1.75} />
                        </a>
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Facebook"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-sm ring-1 ring-white/15 transition-colors hover:bg-white/15"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Facebook className="h-5 w-5" strokeWidth={1.75} />
                        </a>
                      </motion.div>
                    </motion.nav>
                  </div>

                {/* Bottom section */}
                <div className="bg-white px-8 py-8 text-chocolate flex flex-col items-center justify-center gap-4">
                    <img
                      src={logo}
                      alt="Luz de Rosa"
                      className="h-16 w-auto object-contain"
                      loading="lazy"
                    />
                    <a
                      href="https://wa.me/5491125419191"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-3 font-sans text-sm font-semibold normal-case text-white shadow-lg shadow-[#25D366]/20 transition-colors hover:bg-[#1ebe5a]"
                      onClick={() => setMobileOpen(false)}
                    >
                      WhatsApp
                    </a>

                    <p className="text-[11px] font-sans text-chocolate/70 tracking-wide">
                      Romina Brito | Luz de Rosa
                    </p>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
