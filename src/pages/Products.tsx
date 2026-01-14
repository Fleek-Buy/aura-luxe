import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star, Leaf, Grid3X3, LayoutList, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import productShirt from "@/assets/product-shirt.jpg";
import productDress from "@/assets/product-dress.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productLoafers from "@/assets/product-loafers.jpg";
import productSweater from "@/assets/product-sweater.jpg";
import productJeans from "@/assets/product-jeans.jpg";

const allProducts = [
  // Skincare
  { id: 1, name: "Vitamin C Glow Serum", description: "Brightening face serum with 15% Vitamin C", price: 68, originalPrice: 85, rating: 4.9, reviews: 234, image: product1, badge: "Best Seller", badgeColor: "bg-accent text-accent-foreground", isOrganic: true, category: "Face Care" },
  { id: 2, name: "Nourishing Body Lotion", description: "Deep hydration with shea butter & aloe", price: 42, originalPrice: null, rating: 4.8, reviews: 189, image: product2, badge: null, badgeColor: "", isOrganic: true, category: "Body Care" },
  { id: 3, name: "Hydra-Glow Face Cream", description: "24-hour moisture with hyaluronic acid", price: 78, originalPrice: null, rating: 4.9, reviews: 312, image: product3, badge: "New", badgeColor: "bg-secondary text-secondary-foreground", isOrganic: true, category: "Face Care" },
  { id: 4, name: "Calm & Balance Oil", description: "Aromatherapy blend for relaxation", price: 54, originalPrice: 72, rating: 4.7, reviews: 156, image: product4, badge: "20% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: true, category: "Wellness" },
  { id: 5, name: "SPF 50 Sunscreen", description: "Lightweight mineral sun protection", price: 35, originalPrice: null, rating: 4.6, reviews: 278, image: product3, badge: null, badgeColor: "", isOrganic: false, category: "Sun Protection" },
  
  // Clothing
  { id: 6, name: "Premium Cotton T-Shirt", description: "Soft organic cotton, minimalist design", price: 45, originalPrice: null, rating: 4.8, reviews: 156, image: productShirt, badge: "Best Seller", badgeColor: "bg-accent text-accent-foreground", isOrganic: true, category: "Clothing" },
  { id: 7, name: "Linen Summer Dress", description: "Elegant sage green midi dress", price: 128, originalPrice: 160, rating: 4.9, reviews: 89, image: productDress, badge: "20% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: true, category: "Clothing" },
  { id: 8, name: "Cashmere Knit Sweater", description: "Cozy premium cashmere in cream", price: 195, originalPrice: null, rating: 5.0, reviews: 67, image: productSweater, badge: "Premium", badgeColor: "bg-primary text-primary-foreground", isOrganic: false, category: "Clothing" },
  { id: 9, name: "Classic Denim Jeans", description: "Premium dark wash, perfect fit", price: 89, originalPrice: null, rating: 4.7, reviews: 234, image: productJeans, badge: null, badgeColor: "", isOrganic: true, category: "Clothing" },
  
  // Footwear
  { id: 10, name: "White Leather Sneakers", description: "Minimalist design, premium comfort", price: 145, originalPrice: null, rating: 4.9, reviews: 312, image: productSneakers, badge: "Best Seller", badgeColor: "bg-accent text-accent-foreground", isOrganic: false, category: "Footwear" },
  { id: 11, name: "Brown Leather Loafers", description: "Handcrafted Italian leather", price: 225, originalPrice: 275, rating: 4.8, reviews: 78, image: productLoafers, badge: "18% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: false, category: "Footwear" },
  { id: 12, name: "Running Sneakers", description: "Lightweight performance shoes", price: 135, originalPrice: null, rating: 4.7, reviews: 189, image: productSneakers, badge: "New", badgeColor: "bg-secondary text-secondary-foreground", isOrganic: false, category: "Footwear" },
  
  // More skincare
  { id: 13, name: "Rose Petal Face Mist", description: "Hydrating mist with pure rose water", price: 38, originalPrice: null, rating: 4.9, reviews: 45, image: product1, badge: "Just In", badgeColor: "bg-secondary text-secondary-foreground", isOrganic: true, category: "Face Care" },
  { id: 14, name: "Retinol Night Cream", description: "Anti-aging formula with 0.5% retinol", price: 89, originalPrice: null, rating: 4.8, reviews: 23, image: product2, badge: "New", badgeColor: "bg-secondary text-secondary-foreground", isOrganic: true, category: "Face Care" },
  { id: 15, name: "Essential Oil Set", description: "5 premium aromatherapy oils collection", price: 85, originalPrice: 110, rating: 4.9, reviews: 89, image: product4, badge: "23% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: true, category: "Wellness" },
  { id: 16, name: "Lavender Body Butter", description: "Rich moisturizing with calming scent", price: 48, originalPrice: 58, rating: 4.8, reviews: 167, image: product2, badge: "17% Off", badgeColor: "bg-accent text-accent-foreground", isOrganic: true, category: "Body Care" },
];

const categories = ["All", "Face Care", "Body Care", "Sun Protection", "Wellness", "Clothing", "Footwear"];
const priceRanges = ["All Prices", "Under $50", "$50-$100", "$100-$200", "Over $200"];

const ProductCard = ({ product }: { product: typeof allProducts[0] }) => {
  return (
    <Link to={`/product/${product.id}`} className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 block">
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

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
    
    if (selectedPrice !== "All Prices") {
      if (selectedPrice === "Under $50" && product.price >= 50) return false;
      if (selectedPrice === "$50-$100" && (product.price < 50 || product.price > 100)) return false;
      if (selectedPrice === "$100-$200" && (product.price < 100 || product.price > 200)) return false;
      if (selectedPrice === "Over $200" && product.price <= 200) return false;
    }
    
    return true;
  });

  const activeFilters = [
    selectedCategory !== "All" && selectedCategory,
    selectedPrice !== "All Prices" && selectedPrice,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
        </div>
        
        <div className="container relative px-4 md:px-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
              Premium Collection
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              All Products
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore our complete collection of premium skincare, fashion, and lifestyle products.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          {/* Filters Bar */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters.length > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {activeFilters.length}
                  </span>
                )}
              </Button>

              {/* Category Pills */}
              <div className="hidden lg:flex items-center gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                Sort: Featured
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1 border-l border-border pl-3">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {filter}
                  <button 
                    onClick={() => {
                      if (categories.includes(filter as string)) setSelectedCategory("All");
                      if (priceRanges.includes(filter as string)) setSelectedPrice("All Prices");
                    }}
                    className="ml-1 rounded-full hover:bg-primary/20"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedPrice("All Prices");
                }}
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mb-8 rounded-2xl border border-border bg-muted/30 p-6 animate-fade-in">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="text-sm text-muted-foreground">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPrice === range}
                          onChange={() => setSelectedPrice(range)}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="text-sm text-muted-foreground">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria.</p>
              <Button onClick={() => { setSelectedCategory("All"); setSelectedPrice("All Prices"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
