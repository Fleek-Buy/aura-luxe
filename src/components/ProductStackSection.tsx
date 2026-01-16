import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

import categoryClothing from '@/assets/category-clothing.jpg';
import categoryShoes from '@/assets/category-shoes.jpg';
import categorySun from '@/assets/category-sun.jpg';

const productCategories = [
  {
    id: 1,
    title: 'Premium Clothing',
    subtitle: 'Luxury Fashion Collection',
    description: 'Discover our curated selection of premium clothing pieces that blend timeless elegance with modern design. Each piece is crafted with the finest materials.',
    image: categoryClothing,
    stats: { items: '250+', rating: '4.9', trending: 'Top Seller' },
    gradient: 'from-rose-500/20 via-pink-500/10 to-purple-500/20',
    accentColor: 'text-rose-400',
    bgColor: 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900'
  },
  {
    id: 2,
    title: 'Designer Shoes',
    subtitle: 'Step Into Style',
    description: 'From casual sneakers to elegant heels, our shoe collection offers comfort without compromising on style. Walk with confidence in every pair.',
    image: categoryShoes,
    stats: { items: '180+', rating: '4.8', trending: 'Hot Item' },
    gradient: 'from-amber-500/20 via-orange-500/10 to-red-500/20',
    accentColor: 'text-amber-400',
    bgColor: 'bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900'
  },
  {
    id: 3,
    title: 'Luxury Accessories',
    subtitle: 'Complete Your Look',
    description: 'Elevate any outfit with our stunning collection of bags, sunglasses, and accessories. The perfect finishing touch for every occasion.',
    image: categorySun,
    stats: { items: '120+', rating: '4.9', trending: 'New Arrival' },
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    accentColor: 'text-emerald-400',
    bgColor: 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900'
  }
];

const ProductStackSection: React.FC = () => {
  return (
    <section className="relative bg-slate-950">
      {/* Section Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-950 via-slate-950 to-transparent pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Featured Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our Categories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scroll through our carefully curated product collections
          </p>
        </div>
      </div>

      {/* Scroll Stack Container */}
      <ScrollStack
        className="min-h-screen"
        itemDistance={80}
        itemScale={0.04}
        itemStackDistance={25}
        stackPosition="25%"
        scaleEndPosition="15%"
        baseScale={0.88}
        blurAmount={2}
        rotationAmount={0.5}
      >
        {productCategories.map((category, index) => (
          <ScrollStackItem
            key={category.id}
            itemClassName={`${category.bgColor} border border-white/10 overflow-hidden`}
          >
            <div className="flex flex-col md:flex-row h-full gap-6 md:gap-12">
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-48 md:h-full rounded-2xl overflow-hidden group">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`} />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                  <TrendingUp className={`w-4 h-4 ${category.accentColor}`} />
                  <span className="text-white text-sm font-medium">{category.stats.trending}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-center py-2 md:py-4">
                <span className={`text-sm font-medium ${category.accentColor} mb-2`}>
                  {category.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 leading-relaxed line-clamp-3">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">{category.stats.items}</span>
                    <span className="text-muted-foreground text-sm">Products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold">{category.stats.rating}</span>
                    <span className="text-muted-foreground text-sm">Rating</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to="/products">
                  <Button 
                    className="group/btn bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    size="lg"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default ProductStackSection;
