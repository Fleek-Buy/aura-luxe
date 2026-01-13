import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary/80">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container relative px-4 py-16 md:px-6 md:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              New Spring Collection
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl xl:text-7xl">
              Pure Beauty,{" "}
              <span className="relative">
                Naturally
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="max-w-xl text-lg text-primary-foreground/80 md:text-xl lg:mx-0 mx-auto">
              Discover our curated collection of organic, eco-conscious skincare crafted for those who believe in the power of nature.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Shop Collection
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                Our Story
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/30">
                  <span className="text-xs">🌿</span>
                </div>
                100% Organic
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/30">
                  <span className="text-xs">🐰</span>
                </div>
                Cruelty Free
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/30">
                  <span className="text-xs">♻️</span>
                </div>
                Sustainable
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Floating Elements */}
              <div className="absolute -left-4 top-1/4 h-20 w-20 rounded-2xl bg-accent/20 backdrop-blur-sm animate-float" />
              <div className="absolute -right-4 bottom-1/4 h-16 w-16 rounded-full bg-secondary/30 backdrop-blur-sm animate-float" style={{ animationDelay: "1s" }} />
              
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={heroBanner}
                  alt="Premium organic skincare products"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card p-4 shadow-xl md:-bottom-6 md:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">4.9 Rating</p>
                    <p className="text-xs text-muted-foreground">50k+ Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
