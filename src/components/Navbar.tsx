
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, BookOpen, BarChart2, Clock, Book, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "News", path: "/news", icon: <BookOpen size={18} /> },
    { name: "Watchlist", path: "/watchlist", icon: <BarChart2 size={18} /> },
    { name: "Habits", path: "/habits", icon: <Clock size={18} /> },
    { name: "Glossary", path: "/glossary", icon: <Book size={18} /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-finloop-navy/80 backdrop-blur-md border-b dark:border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-finloop-blue to-finloop-teal bg-clip-text text-transparent">
                  FineLoop
                </span>
              </Link>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                  location.pathname === item.path
                    ? "text-white bg-primary"
                    : "text-foreground hover:bg-muted/50"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            <Button
              className="ml-4 flex items-center gap-2"
              variant="secondary"
              size="sm"
            >
              <User size={18} />
              Profile
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 px-4 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                  location.pathname === item.path
                    ? "text-white bg-primary"
                    : "text-foreground hover:bg-muted/50"
                }`}
                onClick={toggleMenu}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button 
              className="mt-2 w-full flex items-center justify-center gap-2"
              variant="secondary"
              size="sm"
            >
              <User size={18} />
              Profile
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
