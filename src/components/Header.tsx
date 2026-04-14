import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Tortas", href: "#products" },
  { label: "Galería", href: "#gallery" },
  { label: "Contacto", href: "#reservation" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-serif text-2xl md:text-3xl tracking-wide text-foreground">
          Luz de Rosas
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button className="text-muted-foreground hover:text-primary transition-colors hidden md:block">
            <User className="w-4 h-4" />
          </button>
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm tracking-widest uppercase text-muted-foreground hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
