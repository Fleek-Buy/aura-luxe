import { Shield, Truck, RefreshCw, Headphones, Award, Leaf } from "lucide-react";

const trustFeatures = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated help center",
  },
];

const certifications = [
  { icon: "🌿", label: "USDA Organic" },
  { icon: "🐰", label: "Cruelty Free" },
  { icon: "♻️", label: "Eco Packaging" },
  { icon: "✨", label: "Dermatologist Tested" },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background border-y border-border">
      <div className="container px-4 md:px-6">
        {/* Trust Features */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {trustFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">Certified Quality</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              Our Commitment to Excellence
            </h3>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Every product meets the highest standards of purity, sustainability, and ethical sourcing.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.label}
                className="flex items-center gap-3 rounded-full bg-background px-5 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="text-xl">{cert.icon}</span>
                <span className="text-sm font-medium text-foreground">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
