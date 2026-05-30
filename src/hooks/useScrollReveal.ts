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

    // Scroll reveal animations disabled: ensure content is visible
    // and avoid IntersectionObserver / transitions.
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.transition = "";
    el.style.willChange = "";
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

    // Stagger reveal animations disabled: ensure children are visible.
    const children = container.querySelectorAll<HTMLElement>(childSelector);
    children.forEach((child) => {
      child.style.opacity = "1";
      child.style.transform = "none";
      child.style.transition = "";
      child.style.willChange = "";
    });
  }, [childSelector, options?.threshold, options?.staggerMs]);

  return ref;
}
