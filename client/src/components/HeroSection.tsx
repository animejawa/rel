import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/kerupuk_mentai_hero_image.png";
import logoImage from "@assets/generated_images/kerupuk_mentai_brand_logo.png";

interface HeroSectionProps {
  onOrderClick: () => void;
}

export default function HeroSection({ onOrderClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <img
          src={logoImage}
          alt="Kerupuk Atom Mentai Logo"
          className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full shadow-2xl"
          data-testid="img-logo"
        />
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Kerupuk Atom Mentai
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Sensasi renyah kerupuk atom dengan topping saus mentai yang creamy dan gurih. 
          Camilan sempurna untuk setiap momen!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={onOrderClick}
            className="text-lg px-8"
            data-testid="button-order-now"
          >
            Pesan Sekarang
          </Button>
          
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Pengiriman Hari Ini
            </span>
            <span className="mx-2">|</span>
            <span>Produk Fresh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
