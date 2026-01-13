import { Leaf, Droplets, Sun, Heart } from "lucide-react";

const categories = [
  {
    title: "Face Care",
    description: "Serums, moisturizers & treatments",
    icon: Droplets,
    count: "45 Products",
    gradient: "from-secondary/10 to-secondary/5",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
  {
    title: "Body Care",
    description: "Lotions, oils & body treatments",
    icon: Leaf,
    count: "32 Products",
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Sun Protection",
    description: "SPF, after-sun & mineral sunscreens",
    icon: Sun,
    count: "18 Products",
    gradient: "from-accent/10 to-accent/5",
    iconBg: "bg-accent/20",
    iconColor: "text-accent-foreground",
  },
  {
    title: "Wellness",
    description: "Aromatherapy & self-care essentials",
    icon: Heart,
    count: "24 Products",
    gradient: "from-secondary/10 to-primary/5",
    iconBg: "bg-secondary/15",
    iconColor: "text-secondary",
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-secondary-light px-4 py-1.5 text-sm font-medium text-secondary">
            Shop by Category
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Explore Our Collections
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover products crafted with nature's finest ingredients, designed for conscious beauty lovers.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`} />
              
              <div className="relative z-10">
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${category.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <category.icon className={`h-7 w-7 ${category.iconColor}`} />
                </div>
                
                <h3 className="mb-2 text-lg font-semibold text-foreground">{category.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{category.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-secondary">{category.count}</span>
                  <span className="text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                    Browse →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
