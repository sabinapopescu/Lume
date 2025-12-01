import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              Beauty Book
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/salons" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/salons') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Browse Salons
            </Link>
            <Link 
              to="/register" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/register') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Register Salon
            </Link>
            <Link 
              to="/salon-dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/salon-dashboard') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search salons..." 
                className="w-64 pl-10 pr-4 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button 
              size="sm"
              className="bg-gradient-primary hover:opacity-90"
              asChild
            >
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/salons" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/salons') ? 'text-primary' : 'text-foreground/80'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Salons
              </Link>
              <Link 
                to="/register" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/register') ? 'text-primary' : 'text-foreground/80'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register Salon
              </Link>
              <Link 
                to="/salon-dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/salon-dashboard') ? 'text-primary' : 'text-foreground/80'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-2 border-t">
                <Button 
                  size="sm"
                  className="w-full bg-gradient-primary hover:opacity-90"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;