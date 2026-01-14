import { Link } from "react-router-dom";
import categoryFace from "@/assets/category-face.jpg";
import categoryBody from "@/assets/category-body.jpg";
import categorySun from "@/assets/category-sun.jpg";
import categoryWellness from "@/assets/category-wellness.jpg";

const categories = [
  {
    title: "Face Care",
    description: "Serums, moisturizers & treatments",
    image: categoryFace,
    count: "45 Products",
  },
  {
    title: "Body Care",
    description: "Lotions, oils & body treatments",
    image: categoryBody,
    count: "32 Products",
  },
  {
    title: "Sun Protection",
    description: "SPF, after-sun & mineral sunscreens",
    image: categorySun,
    count: "18 Products",
  },
  {
    title: "Wellness",
    description: "Aromatherapy & self-care essentials",
    image: categoryWellness,
    count: "24 Products",
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-secondary-light px-4 py-1.5 text-sm font-medium text-secondary animate-fade-in">
            Shop by Category
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Explore Our Collections
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover products crafted with nature's finest ingredients, designed for conscious beauty lovers.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to="/products"
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="mb-1 text-xl font-bold transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {category.title}
                </h3>
                <p className="mb-3 text-sm text-white/80">{category.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/70">{category.count}</span>
                  <span className="text-sm font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px]">
                    Browse →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
