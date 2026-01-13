import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-secondary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 40%),
                           radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }} />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
            <Mail className="h-4 w-4" />
            Join Our Community
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Get 15% Off Your First Order
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Subscribe to our newsletter for exclusive offers, skincare tips, and early access to new products.
          </p>

          <form className="flex flex-col gap-4 sm:flex-row sm:gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-xl border-0 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <Button variant="gold" size="lg" className="h-12 px-6">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-xs text-primary-foreground/60">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
