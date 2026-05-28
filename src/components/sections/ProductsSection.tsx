import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProductCard from "@/components/sections/ProductCard";
import { useProducts } from "@/hooks/useProducts";

/* ── Register GSAP plugins ── */
gsap.registerPlugin(ScrollTrigger);

const ALL_LABEL = "Todos";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const { products: allProducts } = useProducts();
  const didAutoSelectRef = useRef(false);

  /* Refs for GSAP */
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

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

  /* ── GSAP Scroll Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header reveal */
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      /* Filters reveal */
      if (filtersRef.current) {
        gsap.from(filtersRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative overflow-hidden bg-cream pt-8 md:pt-12 pb-24 md:pb-32"
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
                  className={`relative rounded-full px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors md:text-xs ${
                    isActive
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
          layout
          className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

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
