import { motion } from "framer-motion";
import type { Product } from "@/data/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

/**
 * Mapping of category names to their badge color classes.
 * Makes each category visually distinct while staying on-brand.
 */
const categoryColors: Record<string, string> = {
  Tortas: "bg-rose/90 text-white",
  Cupcakes: "bg-gold/90 text-chocolate",
  Popcakes: "bg-chocolate/90 text-white",
  "Oreos Bañadas": "bg-rose-light text-chocolate",
  "Ice Pop": "bg-[hsl(195_50%_75%)] text-chocolate",
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const ProductCard = ({ product, index }: ProductCardProps) => {
  const badgeClass =
    categoryColors[product.category] ?? "bg-muted text-foreground";

  const handleReserve = () => {
    const messageText =
      `Hola, quiero hacer una reserva.\n\n` +
      `Producto: ${product.title}\n\n` +
      `Quisiera consultar disponibilidad y coordinar el pedido.`;
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/5491125419191?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-black/[0.04] ring-1 ring-black/[0.04] transition-shadow duration-500 hover:shadow-xl hover:shadow-rose/10 hover:ring-rose/20"
    >
      {/* ── Image Container ── */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        />

        {/* Hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm ${badgeClass}`}
        >
          {product.category}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-5 pt-4">
        <h3 className="font-serif text-lg font-medium leading-snug text-chocolate transition-colors duration-300 group-hover:text-rose md:text-xl">
          {product.title}
        </h3>

        {/* Mini decorative line */}
        <div className="my-2.5 flex items-center gap-2">
          <div className="h-px w-8 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <p className="flex-1 font-sans text-xs font-light leading-relaxed text-foreground/60 md:text-sm">
          {product.description}
        </p>

        <div className="mt-4 border-t border-border/50 pt-4">
          <button
            type="button"
            onClick={handleReserve}
            className="inline-flex items-center justify-center rounded-full bg-rose px-6 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md transition-colors hover:bg-chocolate"
          >
            RESERVA YA
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
