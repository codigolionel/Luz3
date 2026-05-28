import { useState, useEffect } from "react";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Quiénes Somos", href: "#about" },
  { label: "Tortas", href: "#products" },
  { label: "Galería", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${scrolled ? 'shadow-md border-b border-border/40' : 'border-b border-black/5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between h-14 md:h-16">
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
              className="relative text-xs font-bold tracking-[0.2em] uppercase text-chocolate/80 transition-colors hover:text-[#F8B2CC] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#F8B2CC] after:transition-[width] after:duration-300 hover:after:w-full"
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
            {mobileOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
          />

          {/* Floating panel (below header) */}
          <div className="absolute left-0 right-0 top-14 flex justify-center px-6 py-6">
            <div className="w-full max-w-md h-[70vh] rounded-3xl bg-background/70 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 overflow-hidden">
              <div className="flex h-full flex-col">
                {/* Top 75%: black */}
                <div className="relative h-3/4 bg-black/90 text-white px-8 py-8">
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Cerrar menú"
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                  >
                    <X className="h-5 w-5" strokeWidth={1.75} />
                  </button>

                  <nav className="space-y-6 text-center">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="block text-base font-bold tracking-[0.22em] uppercase text-white/90 transition-colors hover:text-[#F8B2CC]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}

                    <a
                      href="https://wa.me/5491125419191"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center justify-center rounded-full bg-rose px-7 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-colors hover:bg-chocolate"
                      onClick={() => setMobileOpen(false)}
                    >
                      Tomar Pedido
                    </a>

                    <div className="pt-4 flex items-center justify-center gap-4">
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
                    </div>
                  </nav>
                </div>

                {/* Bottom 25%: white */}
                <div className="h-1/4 bg-white px-8 py-6 text-chocolate flex flex-col items-center justify-center gap-4">
                  <img
                    src={logo}
                    alt="Luz de Rosa"
                    className="h-14 w-auto object-contain"
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
