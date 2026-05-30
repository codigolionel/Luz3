import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ProductCard from "@/components/sections/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Product } from "@/data/types";

const ALL_LABEL = "Todos";
const HIDDEN_CATEGORIES = new Set(["Oreos Bañadas"]);

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const { products: allProducts } = useProducts();
  const didAutoSelectRef = useRef(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const didPushModalStateRef = useRef(false);
  const isModalOpenRef = useRef(false);

  const headerRef = useScrollReveal<HTMLDivElement>();
  const filtersRef = useScrollReveal<HTMLDivElement>({ delay: 120 });

  /* ── Filtered products (memoized) ── */
  const filteredProducts = useMemo(() => {
    const visibleProducts = allProducts.filter(
      (p) => !HIDDEN_CATEGORIES.has(p.category)
    );

    return activeCategory === ALL_LABEL
      ? visibleProducts
      : visibleProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, allProducts]);

  /* ── Derive unique categories from data ── */
  const categories = useMemo(
    () => [
      ...Array.from(
        new Set(allProducts.map((p) => p.category).filter((c) => !HIDDEN_CATEGORIES.has(c)))
      ),
      ALL_LABEL,
    ],
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

    // Let the browser back button close the modal (mobile expected behavior).
    // We don't change the URL, we only push a new history entry.
    if (!didPushModalStateRef.current) {
      history.pushState({ __productsModal: true }, "");
      didPushModalStateRef.current = true;
    }

    isModalOpenRef.current = true;

    const onPopState = () => {
      if (!isModalOpenRef.current) return;
      didPushModalStateRef.current = false;
      isModalOpenRef.current = false;
      setActiveProduct(null);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProduct(null);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
      document.body.style.overflow = "";
      isModalOpenRef.current = false;
    };
  }, [activeProduct]);

  const closeActiveProduct = () => {
    // If we pushed a history entry for the modal, go back so the browser history
    // stays consistent and the user can keep navigating normally.
    if (didPushModalStateRef.current) {
      didPushModalStateRef.current = false;
      isModalOpenRef.current = false;
      setActiveProduct(null);
      history.back();
      return;
    }

    isModalOpenRef.current = false;
    setActiveProduct(null);
  };

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
          <span className="font-sans text-base font-semibold uppercase tracking-[0.3em] text-gold">
            Catálogo
          </span>
          <h2 className="mt-4 font-serif text-4xl text-chocolate md:text-5xl lg:text-6xl">
            Nuestros Productos
          </h2>

          <div className="my-6" />

          <p className="mx-auto max-w-xl font-sans text-lg font-light leading-relaxed text-foreground/60 md:text-base lg:text-lg">
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
                onClick={closeActiveProduct}
              />

              <motion.div
                className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
                initial={{ y: 12, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 10, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 44 }}
              >
                <div className="relative flex w-full max-w-lg md:max-w-3xl max-h-[90vh] min-h-0 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 md:max-h-[85vh] md:flex-row">
                  <button
                    type="button"
                    onClick={closeActiveProduct}
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-chocolate shadow-sm ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-white"
                  >
                    <X className="h-5 w-5" strokeWidth={1.75} />
                  </button>

                  <div className="relative h-[38vh] w-full bg-cream sm:h-[45vh] md:h-[85vh] md:w-1/2">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-7 md:w-1/2">
                    <p className="inline-flex w-fit rounded-full bg-rose/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-rose ring-1 ring-rose/15">
                      {activeProduct.category}
                    </p>

                    <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-chocolate sm:text-3xl">
                      {activeProduct.title}
                    </h3>

                    <p className="mt-4 font-sans text-sm font-light leading-relaxed text-foreground/70 sm:text-base">
                      {activeProduct.description}
                    </p>

                    <div className="mt-8">
                      <a
                        href={`https://wa.me/5491125419191?text=${encodeURIComponent(
                          `Hola, quiero hacer una reserva.\n\nProducto: ${activeProduct.title}\n\nQuisiera consultar disponibilidad y coordinar el pedido.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-full bg-rose px-7 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-md transition-colors hover:bg-chocolate"
                        onClick={closeActiveProduct}
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
            Contame tu idea y lo armamos.
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
