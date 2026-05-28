import { Sparkles } from "lucide-react";

export const ElegantDivider = () => (
  <div className="flex items-center justify-center gap-4 my-6">
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gold/50 to-gold/50"></div>
    <Sparkles className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-gold/50 to-gold/50"></div>
  </div>
);
