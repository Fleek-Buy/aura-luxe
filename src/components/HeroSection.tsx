import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
import GridLightAnimation from "./GridLightAnimation";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Grid with Light Beams */}
      <GridLightAnimation />

      {/* Floating Geometric Shapes */}
      <motion.div 
        className="absolute top-20 left-[10%] w-32 h-32 border border-accent/20 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-[15%] w-24 h-24 bg-accent/5 rounded-2xl"
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -90, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-[8%] w-2 h-2 bg-accent rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container relative px-4 md:px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[70vh]">
          
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-8">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2"
            >
              <span className="h-px w-12 bg-accent" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-accent">
                Spring 2025
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-foreground leading-[0.95]">
                <span className="block">Elevate</span>
                <span className="block mt-2 font-semibold">Your Style</span>
                <span className="block mt-2 text-muted-foreground/60 italic font-light text-3xl md:text-4xl lg:text-5xl">
                  naturally.
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-md text-muted-foreground text-lg leading-relaxed"
            >
              Curated collections that blend timeless elegance with contemporary design. 
              Discover pieces that speak to your individuality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-4"
            >
              <Button 
                size="lg" 
                className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <button className="flex items-center gap-3 text-foreground hover:text-accent transition-colors group">
                <span className="flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-accent transition-colors">
                  <Play className="h-4 w-4 ml-0.5" />
                </span>
                <span className="text-sm font-medium">Watch Story</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-12 pt-8 border-t border-border/50"
            >
              <div>
                <p className="text-3xl font-semibold text-foreground">50k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-semibold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-3xl font-semibold text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">New Arrivals</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10"
              >
                <div className="relative aspect-[3/4] max-w-lg mx-auto lg:ml-auto overflow-hidden rounded-[2rem]">
                  <img
                    src={heroBanner}
                    alt="Premium fashion collection"
                    className="h-full w-full object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Decorative Frame */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -top-4 -right-4 lg:-right-8 w-full h-full max-w-lg mx-auto lg:ml-auto aspect-[3/4] border-2 border-accent/20 rounded-[2rem] -z-10"
              />

              {/* Floating Card - Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute left-0 lg:-left-12 top-1/4 bg-card shadow-xl rounded-2xl p-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Premium Quality</p>
                    <p className="text-xs text-muted-foreground">Handcrafted Items</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute right-4 lg:right-0 -bottom-6 bg-card shadow-xl rounded-2xl p-4 z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Join 50k+</p>
                    <p className="text-xs text-muted-foreground">Style enthusiasts</p>
                  </div>
                </div>
              </motion.div>

              {/* Vertical Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 hidden xl:block"
              >
                <p className="text-sm text-muted-foreground/50 tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180">
                  Scroll to explore
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/80 backdrop-blur-sm"
      >
        <div className="overflow-hidden py-4">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="text-sm font-medium text-muted-foreground">Free Shipping Worldwide</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm font-medium text-muted-foreground">30-Day Returns</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm font-medium text-muted-foreground">Sustainable Fashion</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm font-medium text-muted-foreground">Premium Quality</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
