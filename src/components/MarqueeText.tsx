import { useRef, useEffect } from "react";

const WORD = "Luz de Rosa";
const SEPARATOR = "   ";
// Repeat enough times to create seamless loop
const ITEMS = Array(12).fill(`${WORD} ${SEPARATOR} `).join("");

const MarqueeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const offset = useRef(0);
  const isVisible = useRef(true);

  useEffect(() => {
    const speed = 0.8; // px per frame

    const animate = () => {
      if (!isVisible.current) {
        raf.current = 0;
        return;
      }

      offset.current -= speed;

      const w = track1.current?.offsetWidth ?? 0;
      // Reset when first track has fully scrolled left
      if (Math.abs(offset.current) >= w) {
        offset.current = 0;
      }

      if (track1.current) track1.current.style.transform = `translateX(${offset.current}px)`;
      if (track2.current) track2.current.style.transform = `translateX(${offset.current}px)`;

      raf.current = requestAnimationFrame(animate);
    };

    // Only animate when visible on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !raf.current) {
          raf.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    raf.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-10 md:py-0 md:pt-10 my-0 select-none"
      aria-hidden="true"
    >
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

      {/* Scrolling track — two copies side by side for seamless loop */}
      <div className="flex whitespace-nowrap">
        <div
          ref={track1}
          className="flex shrink-0 whitespace-nowrap"
        >
          <span
            className="text-6xl md:text-[80px] font-serif tracking-[0.08em]"
            style={{
              color: "#F8B2CC", // Brand pink
              whiteSpace: "pre"
            }}
          >
            {ITEMS}
          </span>
        </div>
        <div
          ref={track2}
          className="flex shrink-0 whitespace-nowrap"
        >
          <span
            className="text-6xl md:text-[80px] font-serif tracking-[0.08em]"
            style={{
              color: "#F8B2CC",
              whiteSpace: "pre"
            }}
          >
            {ITEMS}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;
