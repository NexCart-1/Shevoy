import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import type { CartItem } from '../types';
import { categories } from '../data/products';

interface HeaderProps {
  cart: CartItem[];
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Header({
  cart,
  onCartClick,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange
}: HeaderProps) {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md shadow-sm border-b border-gold/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src="/logo-icon.png"
              alt="Shevoy Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-gold-dark via-gold to-silver bg-clip-text text-transparent">
                Shevoy
              </h1>
              <p className="text-[10px] sm:text-xs text-silver-dark -mt-1 tracking-wide">STYLE. QUALITY. YOU.</p>
            </div>
          </a>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gold/20 bg-ink-2 focus:bg-ink-2 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm text-silver-light placeholder-silver-dark transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dark" size={18} />
          </div>

          <div className="flex items-center gap-2 sm:gap-5 shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-ink-2 text-silver-light"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 sm:p-3 rounded-full bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 h-5 sm:h-6 w-5 sm:w-6 flex items-center justify-center bg-rose-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gold/20 bg-ink-2 focus:bg-ink-2 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm text-silver-light placeholder-silver-dark"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver-dark" size={16} />
          </div>
        </div>

        {/* Category pills */}
        <div className="pb-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'All'
                  ? 'bg-gold-dark text-ink'
                  : 'bg-ink-2 text-silver hover:bg-ink-2/70 hover:text-gold-light'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-gold-dark text-ink'
                    : 'bg-ink-2 text-silver hover:bg-ink-2/70 hover:text-gold-light'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
