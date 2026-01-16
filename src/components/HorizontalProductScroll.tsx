import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { Button } from './ui/button';

import categoryClothing from '@/assets/category-clothing.jpg';
import categoryShoes from '@/assets/category-shoes.jpg';
import categorySun from '@/assets/category-sun.jpg';
import categoryBody from '@/assets/category-body.jpg';
import categoryFace from '@/assets/category-face.jpg';
import categoryWellness from '@/assets/category-wellness.jpg';

const products = [
  {
    id: 1,
    name: 'Silk Evening Dress',
    category: 'Clothing',
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviews: 128,
    image: categoryClothing,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Leather Loafers',
    category: 'Shoes',
    price: 159,
    originalPrice: null,
    rating: 4.8,
    reviews: 96,
    image: categoryShoes,
    badge: 'New',
  },
  {
    id: 3,
    name: 'Designer Sunglasses',
    category: 'Accessories',
    price: 129,
    originalPrice: 169,
    rating: 4.7,
    reviews: 84,
    image: categorySun,
    badge: null,
  },
  {
    id: 4,
    name: 'Cashmere Sweater',
    category: 'Clothing',
    price: 219,
    originalPrice: null,
    rating: 4.9,
    reviews: 156,
    image: categoryBody,
    badge: 'Premium',
  },
  {
    id: 5,
    name: 'Canvas Sneakers',
    category: 'Shoes',
    price: 89,
    originalPrice: 119,
    rating: 4.6,
    reviews: 203,
    image: categoryFace,
    badge: null,
  },
  {
    id: 6,
    name: 'Leather Handbag',
    category: 'Bags',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 167,
    image: categoryWellness,
    badge: 'Limited',
  },
];

const HorizontalProductScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
              Shop Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Trending Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover our handpicked selection of premium items
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to="/products"
              className="flex-shrink-0 w-72 group snap-start"
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                      {product.badge}
                    </span>
                  )}
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                    <Heart className="w-4 h-4 text-foreground" />
                  </button>
                  
                  {/* Quick Add Button */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button className="w-full bg-white/95 backdrop-blur-sm text-foreground hover:bg-white gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Quick Add
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-8">
          <Link to="/products">
            <Button variant="outline" size="lg" className="group">
              View All Products
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductScroll;
