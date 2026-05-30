import { useState, useEffect, useRef } from "react";
import type React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.webp";

type NavLink = {
  label: string;
  href: string;
  subLinks?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Inicio", href: "#" },
  { label: "Quién Soy", href: "#about" },
  {
    label: "Productos",
    href: "#catalogo",
    subLinks: [
      { label: "Tortas", href: "#catalogo?category=Tortas" },
      { label: "Cupcakes", href: "#catalogo?category=Cupcakes" },
      { label: "Popcakes", href: "#catalogo?category=Popcakes" },
      { label: "Ice Pop", href: "#catalogo?category=Ice Pop" },
    ],
  },
  { label: "Mi trabajo", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAnchorClick = (href: string, afterClose?: () => void) =>
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();

      const doScroll = () => {
        if (href.includes("?category=")) {
          const [id, query] = href.slice(1).split("?");
          scrollToId(id);
          const cat = query.split("=")[1];
          window.dispatchEvent(new CustomEvent('setCategory', { detail: decodeURIComponent(cat) }));
          window.history.pushState(null, "", href);
        } else {
          if (href === "#") scrollToTop();
          else scrollToId(href.slice(1));
          window.history.pushState(null, "", href);
        }
      };

      if (afterClose) {
        afterClose();
        // Let the UI close before scrolling.
        requestAnimationFrame(doScroll);
      } else {
        doScroll();
      }
    };

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
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMobileDropdownOpen(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-[transform,box-shadow,border-color] duration-300 ${!isMobile && hidden ? "-translate-y-full" : "translate-y-0"
          } ${scrolled ? "shadow-md border-b border-border/40" : "border-b border-black/5"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-20 md:h-16">
          <a
            href="#"
            className="flex items-center h-full py-0 my-0"
            aria-label="Ir al inicio"
            onClick={handleAnchorClick("#")}
          >
            <img
              src={logo}
              alt="Luz de Rosa"
              className="h-full max-h-full object-contain block py-0 my-0"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.subLinks ? (
                <div key={link.label} className="relative group">
                  <button 
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-chocolate/80 transition-colors group-hover:bg-rose group-hover:text-white"
                    onClick={handleAnchorClick(link.href)}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" strokeWidth={2.5} />
                  </button>
                  {/* Dropdown Container */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-rose/15 py-2 w-48 overflow-hidden relative">
                      {link.subLinks.map((subLink) => (
                        <a
                          key={subLink.label}
                          href={subLink.href}
                          className="block px-6 py-3 text-xs font-bold tracking-[0.1em] uppercase text-chocolate/80 hover:bg-rose/5 hover:text-rose transition-colors relative z-10"
                          onClick={handleAnchorClick(subLink.href)}
                        >
                          {subLink.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-chocolate/80 transition-colors hover:bg-rose hover:text-white"
                  onClick={handleAnchorClick(link.href)}
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/5491125419191"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex px-5 py-2.5 bg-rose text-white font-sans text-xs font-bold tracking-[0.2em] rounded hover:bg-chocolate hover:text-white transition-colors duration-300"
            >
              Quiero mi torta
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
              onClick={handleMobileMenuClose}
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
                <div className="relative flex-1 bg-black/90 text-white px-8 py-10 overflow-y-auto">
                  <button
                    type="button"
                    onClick={handleMobileMenuClose}
                    aria-label="Cerrar menú"
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/15 z-50"
                  >
                    <X className="h-5 w-5" strokeWidth={1.75} />
                  </button>

                  <motion.nav
                    className="mt-16 flex flex-col space-y-6 text-center"
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
                      <motion.div
                        key={link.label}
                        variants={{
                          hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(2px)" },
                          show: prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                          exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(2px)", transition: { duration: 0.12 } },
                        }}
                      >
                        {link.subLinks ? (
                          <div className="w-full flex flex-col items-center">
                            <button
                              onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                              className="flex items-center justify-center gap-2 text-base font-bold tracking-[0.22em] uppercase text-white/90 transition-colors hover:text-[#F8B2CC]"
                              aria-expanded={mobileDropdownOpen === link.label}
                            >
                              {link.label}
                              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdownOpen === link.label ? "rotate-180 text-[#F8B2CC]" : ""}`} strokeWidth={2} />
                            </button>
                            
                            <AnimatePresence>
                              {mobileDropdownOpen === link.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden w-full"
                                >
                                  <div className="flex flex-col items-center gap-5 pt-6 pb-2">
                                    {link.subLinks.map((subLink) => (
                                      <a
                                        key={subLink.label}
                                        href={subLink.href}
                                        className="block text-sm font-bold tracking-[0.15em] uppercase text-white/60 transition-colors hover:text-white"
                                        onClick={handleAnchorClick(subLink.href, handleMobileMenuClose)}
                                      >
                                        {subLink.label}
                                      </a>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <a
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                            className="block text-base font-bold tracking-[0.22em] uppercase text-white/90 transition-colors hover:text-[#F8B2CC]"
                            onClick={handleAnchorClick(link.href, handleMobileMenuClose)}
                          >
                            {link.label}
                          </a>
                        )}
                      </motion.div>
                    ))}

                    <motion.div
                      variants={{
                        hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(2px)" },
                        show: prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                        exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(2px)", transition: { duration: 0.12 } },
                      }}
                      className="pt-4"
                    >
                      <a
                        href="https://wa.me/5491125419191"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-rose px-7 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-colors hover:bg-chocolate"
                        onClick={handleMobileMenuClose}
                      >
                        Quiero mi torta
                      </a>
                    </motion.div>

                    <motion.div
                      className="pt-4 flex items-center justify-center gap-4"
                      variants={{
                        hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
                        show: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.2 } },
                        exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, transition: { duration: 0.12 } },
                      }}
                    >
                      <a
                        href="https://www.instagram.com/luz_de_rosa_pasteleria?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-sm ring-1 ring-white/15 transition-colors hover:bg-white/15"
                        onClick={handleMobileMenuClose}
                      >
                        <Instagram className="h-5 w-5" strokeWidth={1.75} />
                      </a>
                      <a
                        href="https://www.facebook.com/luz.de.rosa.2025"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-sm ring-1 ring-white/15 transition-colors hover:bg-white/15"
                        onClick={handleMobileMenuClose}
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
                    onClick={handleMobileMenuClose}
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
