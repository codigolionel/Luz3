import videoBg from "@/assets/video-bg.jpg";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VideoSection = () => {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      <img
        src={videoBg}
        alt="Nuestra pastelería"
        loading="lazy"
        width={1920}
        height={800}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-chocolate/60" />

      <div className="relative z-10 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Reproducir video"
          className="w-20 h-20 rounded-full border-2 border-primary-foreground/60 flex items-center justify-center mx-auto mb-6 hover:bg-primary-foreground/10 transition-colors group"
        >
          <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform" />
        </button>
        <h2 className="font-serif text-3xl md:text-5xl text-cream">Nuestro Proceso</h2>
        <p className="text-primary-foreground/60 font-sans mt-3 text-sm tracking-widest uppercase">Descubre cómo creamos cada torta</p>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[92vw] max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl text-chocolate">Video proximamente</h3>
            <p className="mt-2 text-sm text-foreground/70 font-sans">
              Estamos preparando este contenido. Mientras tanto, podes escribirnos por WhatsApp para ver ejemplos.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                className="rounded-md bg-chocolate px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-black transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default VideoSection;
