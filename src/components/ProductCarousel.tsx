import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Leaf, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import productShirt from "@/assets/product-shirt.jpg";
import productDress from "@/assets/product-dress.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productLoafers from "@/assets/product-loafers.jpg";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  badgeColor: string;
  isOrganic: boolean;
}

const defaultProducts: Product[] = [
  { id: 1, name: "Vitamin C Glow Serum", description: "Brightening face serum with 15% Vitamin C", price: 68, originalPrice: 85, rating: 4.9, reviews: 234, image: product1, badge: "Best Seller", badgeColor: "bg-accent text-accent-foreground", isOrganic: true },
  { id: 2, name: "Nourishing Body Lotion", description: "Deep hydration with shea butter & aloe", price: 42, originalPrice: null, rating: 4.8, reviews: 189, image: product2, badge: null, badgeColor: "", isOrganic: true },
  { id: 3, name: "Hydra-Glow Face Cream", description: "24-hour moisture with hyaluronic acid", price: 78, originalPrice: null, rating: 4.9, reviews: 312, image: product3, badge: "New", badgeColor: "bg-secondary text-secondary-foreground", isOrganic: true },
  { id: 4, name: "Calm & Balance Oil", description: "Aromatherapy blend for relaxation", price: 54, originalPrice: 72, rating: 4.7, reviews: 156, image: product4, badge: "20% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: true },
  { id: 6, name: "Premium Cotton T-Shirt", description: "Soft organic cotton, minimalist design", price: 45, originalPrice: null, rating: 4.8, reviews: 156, image: productShirt, badge: "Best Seller", badgeColor: "bg-accent text-accent-foreground", isOrganic: true },
  { id: 7, name: "Linen Summer Dress", description: "Elegant sage green midi dress", price: 128, originalPrice: 160, rating: 4.9, reviews: 89, image: productDress, badge: "20% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: true },
  { id: 10, name: "White Leather Sneakers", description: "Minimalist design, premium comfort", price: 145, originalPrice: null, rating: 4.9, reviews: 312, image: productSneakers, badge: "Best Seller", badgeColor: "bg-accent text-accent-foreground", isOrganic: false },
  { id: 11, name: "Brown Leather Loafers", description: "Handcrafted Italian leather", price: 225, originalPrice: 275, rating: 4.8, reviews: 78, image: productLoafers, badge: "18% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: false },
];

interface ProductCarouselProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  products?: Product[];
  showViewAll?: boolean;
  viewAllLink?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 block h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-md ${product.badgeColor}`}>
            {product.badge}
          </span>
        )}

        <button 
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 hover:bg-background hover:scale-110"
        >
          <Heart className="h-4 w-4 text-foreground" />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-background/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button variant="premium" className="w-full gap-2" onClick={(e) => e.preventDefault()}>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
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

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <span className="rounded bg-accent-light px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
                Save ${product.originalPrice - product.price}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const ProductCarousel = ({ 
  title = "Featured Products", 
  subtitle, 
  badge = "Shop Now",
  products = defaultProducts,
  showViewAll = true,
  viewAllLink = "/products"
}: ProductCarouselProps) => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <span className="mb-3 inline-block rounded-full bg-accent-light px-4 py-1.5 text-sm font-medium text-accent-foreground animate-fade-in">
              {badge}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {subtitle}
              </p>
            )}
          </div>
          {showViewAll && (
            <Link to={viewAllLink}>
              <Button variant="outline" className="gap-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                View All Products
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product, index) => (
              <CarouselItem 
                key={product.id} 
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div 
                  className="animate-fade-in h-full" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
