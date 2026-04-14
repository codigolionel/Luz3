import videoBg from "@/assets/video-bg.jpg";
import { Play } from "lucide-react";

const VideoSection = () => (
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
      <button className="w-20 h-20 rounded-full border-2 border-primary-foreground/60 flex items-center justify-center mx-auto mb-6 hover:bg-primary-foreground/10 transition-colors group">
        <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform" />
      </button>
      <h2 className="font-serif text-3xl md:text-5xl text-cream">Nuestro Proceso</h2>
      <p className="text-primary-foreground/60 font-sans mt-3 text-sm tracking-widest uppercase">Descubre cómo creamos cada torta</p>
    </div>
  </section>
);

export default VideoSection;
