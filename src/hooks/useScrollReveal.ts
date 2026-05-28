import { useEffect, useRef } from "react";

/**
 * Hook that applies a scroll-triggered reveal animation to an element.
 * Uses IntersectionObserver for performance.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: {
    threshold?: number;
    rootMargin?: string;
    delay?: number;
  }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${options?.delay ?? 0}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${options?.delay ?? 0}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.delay]);

  return ref;
}

/**
 * Hook for staggered children reveal animations.
 * Returns a ref to attach to the parent container.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  childSelector: string = ":scope > *",
  options?: {
    threshold?: number;
    staggerMs?: number;
  }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll<HTMLElement>(childSelector);
    const stagger = options?.staggerMs ?? 100;

    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(30px)";
      child.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          });
          observer.unobserve(container);
        }
      },
      { threshold: options?.threshold ?? 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [childSelector, options?.threshold, options?.staggerMs]);

  return ref;
}
