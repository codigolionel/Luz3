import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import ProductCard from "@/components/sections/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Product } from "@/data/types";

const ALL_LABEL = "Todos";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const { products: allProducts } = useProducts();
  const didAutoSelectRef = useRef(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const headerRef = useScrollReveal<HTMLDivElement>();
  const filtersRef = useScrollReveal<HTMLDivElement>({ delay: 120 });

  /* ── Filtered products (memoized) ── */
  const filteredProducts = useMemo(
    () =>
      activeCategory === ALL_LABEL
        ? allProducts
        : allProducts.filter((p) => p.category === activeCategory),
    [activeCategory, allProducts]
  );

  /* ── Derive unique categories from data ── */
  const categories = useMemo(
    () => [...Array.from(new Set(allProducts.map((p) => p.category))), ALL_LABEL],
    [allProducts]
  );

  // Default to the first real category (eg: "Tortas") once products load.
  useEffect(() => {
    if (didAutoSelectRef.current) return;
    const firstCategory = categories.find((c) => c !== ALL_LABEL);
    if (firstCategory) {
      didAutoSelectRef.current = true;
      setActiveCategory(firstCategory);
    }
  }, [categories]);

  useEffect(() => {
    if (!activeProduct) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProduct(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  return (
    <section
      id="catalogo"
      className="relative overflow-hidden bg-cream pt-20 md:pt-48 pb-24 md:pb-32"
    >
      {/* ── Decorative background elements ── */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-rose/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-[400px] w-[400px] rounded-full bg-gold/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        {/* ── Section Header ── */}
        <div ref={headerRef} className="mb-16 md:mb-20 text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Catálogo
          </span>
          <h2 className="mt-4 font-serif text-4xl text-chocolate md:text-5xl lg:text-6xl">
            Nuestros Productos
          </h2>

          {/* Elegant divider */}
          <div className="my-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold/50 to-gold/50" />
            <div className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-gold/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-gold/50 to-gold/50" />
          </div>

          <p className="mx-auto max-w-xl font-sans text-sm font-light leading-relaxed text-foreground/60 md:text-base">
            Cada creación es elaborada artesanalmente con ingredientes premium.
            Descubrí nuestra selección y encontrá la pieza perfecta para tu
            momento especial.
          </p>
        </div>

        {/* ── Category Filters ── */}
        <div ref={filtersRef} className="mb-14 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/70 px-2 py-2 shadow-sm ring-1 ring-black/[0.06] backdrop-blur-sm">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-full px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors md:text-xs ${isActive
                    ? "bg-chocolate text-white shadow-md shadow-chocolate/20"
                    : "text-chocolate/70 hover:text-chocolate"
                    }`}
                >
                  {cat}

                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full"
                      transition={{ type: "spring", stiffness: 520, damping: 42 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Product count ── */}
        <div className="mb-8 text-center">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs font-light tracking-wider text-foreground/40"
          >
            Mostrando{" "}
            <span className="font-medium text-chocolate">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
            {activeCategory !== ALL_LABEL && (
              <>
                {" "}
                en{" "}
                <span className="font-medium text-rose">
                  {activeCategory}
                </span>
              </>
            )}
          </motion.p>
        </div>

        {/* ── Product Grid ── */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onOpen={setActiveProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Product Modal ── */}
        <AnimatePresence>
          {activeProduct ? (
            <motion.div
              className="fixed inset-0 z-[120]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/65 backdrop-blur-sm"
                aria-label="Cerrar"
                onClick={() => setActiveProduct(null)}
              />

              <motion.div
                className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
                initial={{ y: 12, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 10, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 44 }}
              >
                <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
                  <button
                    type="button"
                    onClick={() => setActiveProduct(null)}
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-chocolate shadow-sm ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-white"
                  >
                    <X className="h-5 w-5" strokeWidth={1.75} />
                  </button>

                  <div className="relative aspect-[3/4] bg-cream">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-16">
                      <p className="inline-flex rounded-full bg-white/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 ring-1 ring-white/15 backdrop-blur">
                        {activeProduct.category}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white">
                        {activeProduct.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="font-sans text-sm font-light leading-relaxed text-foreground/70">
                      {activeProduct.description}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href={`https://wa.me/5491125419191?text=${encodeURIComponent(
                          `Hola, quiero hacer una reserva.\n\nProducto: ${activeProduct.title}\n\nQuisiera consultar disponibilidad y coordinar el pedido.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-full bg-rose px-7 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-md transition-colors hover:bg-chocolate"
                        onClick={() => setActiveProduct(null)}
                      >
                        Reserva ya
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="font-serif text-lg italic text-chocolate/60 md:text-xl">
            ¿No encontrás lo que buscás?
          </p>
          <a
            href="https://wa.me/5491125419191"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full bg-chocolate px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-chocolate/20 transition-all duration-300 hover:bg-rose hover:shadow-rose/20"
          >
            Hacé tu pedido personalizado
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
