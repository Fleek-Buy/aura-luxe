import { ShoppingCart, Search, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/FullLogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Fleek Buy" className="h-12 w-28" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/new-arrivals" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              New Arrivals
            </Link>
            <Link to="/sale" className="flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-secondary/80">
              <span className="relative">
                Sale
                <span className="absolute -right-3 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  %
                </span>
              </span>
            </Link>
            <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-secondary/80">
              All Products
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="h-9 w-64 rounded-full border border-border bg-muted/50 pl-10 pr-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                2
              </span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border animate-fade-in">
          <nav className="container flex flex-col gap-2 px-4 py-4">
            <Link to="/new-arrivals" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
              New Arrivals
            </Link>
            <Link to="/sale" className="rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary-light" onClick={() => setIsMenuOpen(false)}>
              Sale
            </Link>
             <Link to="/products" className="rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary-light" onClick={() => setIsMenuOpen(false)}>
              All Products
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
