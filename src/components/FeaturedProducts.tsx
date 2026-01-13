import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star, Leaf } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    name: "Vitamin C Glow Serum",
    description: "Brightening face serum with 15% Vitamin C",
    price: 68,
    originalPrice: 85,
    rating: 4.9,
    reviews: 234,
    image: product1,
    badge: "Best Seller",
    badgeColor: "bg-accent text-accent-foreground",
    isOrganic: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Nourishing Body Lotion",
    description: "Deep hydration with shea butter & aloe",
    price: 42,
    originalPrice: null,
    rating: 4.8,
    reviews: 189,
    image: product2,
    badge: null,
    badgeColor: "",
    isOrganic: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Hydra-Glow Face Cream",
    description: "24-hour moisture with hyaluronic acid",
    price: 78,
    originalPrice: null,
    rating: 4.9,
    reviews: 312,
    image: product3,
    badge: "New",
    badgeColor: "bg-secondary text-secondary-foreground",
    isOrganic: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Calm & Balance Oil",
    description: "Aromatherapy blend for relaxation",
    price: 54,
    originalPrice: 72,
    rating: 4.7,
    reviews: 156,
    image: product4,
    badge: "20% Off",
    badgeColor: "bg-accent text-accent-foreground",
    isOrganic: true,
    inStock: true,
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-md ${product.badgeColor}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 hover:bg-background hover:scale-110">
          <Heart className="h-4 w-4 text-foreground" />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-background/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button variant="premium" className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Organic Badge */}
        {product.isOrganic && (
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-secondary-light px-2 py-0.5 text-xs font-medium text-secondary">
            <Leaf className="h-3 w-3" />
            Organic
          </div>
        )}

        <h3 className="mb-1 font-semibold text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
          {product.originalPrice && (
            <span className="rounded bg-accent-light px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
              Save ${product.originalPrice - product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <span className="mb-3 inline-block rounded-full bg-accent-light px-4 py-1.5 text-sm font-medium text-accent-foreground">
              Featured Products
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Customer Favorites
            </h2>
          </div>
          <Button variant="outline" className="gap-2">
            View All Products
            <span>→</span>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
