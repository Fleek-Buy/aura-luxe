import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Verified Customer",
    rating: 5,
    quote: "I've been using these products for 3 months and my skin has never looked better. The vitamin C serum is absolutely magical!",
    avatar: "SM",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    role: "Beauty Enthusiast",
    rating: 5,
    quote: "Finally found a skincare brand that actually delivers on its promises. The organic ingredients make all the difference.",
    avatar: "ER",
  },
  {
    id: 3,
    name: "Jessica Thompson",
    role: "Verified Customer",
    rating: 5,
    quote: "The quality of these products is unmatched. My sensitive skin loves the gentle formulas and I've seen visible improvements.",
    avatar: "JT",
  },
  {
    id: 4,
    name: "Amanda Chen",
    role: "Skincare Lover",
    rating: 5,
    quote: "Best investment I've made for my skincare routine. The packaging is beautiful and the products are even better!",
    avatar: "AC",
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
            Customer Love
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            What Our Customers Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 h-10 w-10 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 h-10 w-10 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonial Card */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="rounded-3xl bg-card border border-border p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Decorative Quote */}
                    <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/10" />
                    <Quote className="absolute bottom-6 right-6 h-12 w-12 text-primary/10 rotate-180" />

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8 relative z-10">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? "w-8 bg-primary" 
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
