import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Utensils, X } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { ProductCard } from '../../components/products/ProductCard';
import { useProductStore } from '../../stores/useProductStore';
import { ProductCategory } from '../../types';

export const MenuPage: React.FC = () => {
  const { products } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');

  const categories: { id: string; name: string }[] = [
    { id: 'all', name: 'All Items' },
    { id: 'burgers', name: 'Smash Burgers' },
    { id: 'chicken', name: 'Crispy Chicken' },
    { id: 'sides', name: 'Hand-Cut Sides' },
    { id: 'combos', name: 'Feast Combos' },
    { id: 'drinks', name: 'Custard Shakes' },
    { id: 'desserts', name: 'Bakery Sweets' },
  ];

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (categoryParam !== 'all' && p.category !== categoryParam) {
          return false;
        }
        // Search filter
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesIngr = p.ingredients.some((ing) => ing.toLowerCase().includes(q));
          if (!matchesName && !matchesDesc && !matchesIngr) return false;
        }
        // Dietary filter
        if (dietaryFilter !== 'all') {
          if (!p.dietary?.includes(dietaryFilter as any)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.salesCount - a.salesCount; // popularity default
      });
  }, [products, categoryParam, searchQuery, dietaryFilter, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      {/* Menu Header Banner */}
      <section className="bg-[#171717] text-white py-10 sm:py-14 border-b-4 border-[#A82D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Hand-Crafted Daily
          </span>
          <h1 className="text-fluid-section font-black font-display uppercase tracking-tight text-white">
            The Craft Menu
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-body text-[#FAF8F3]/75 max-w-xl mx-auto px-2">
            Dry-aged beef, European butter brioche, and hand-cut potatoes prepared to order on our seasoned flat-tops.
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 bg-[#FAF8F3] border-b-2 border-[#171717] py-3 sm:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = categoryParam === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-display font-black uppercase tracking-wider whitespace-nowrap transition-colors border cursor-pointer min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? 'bg-[#A82D24] text-white border-[#A82D24]'
                      : 'bg-white text-[#171717] border-[#171717] hover:bg-[#F5F0E6]'
                  }`}
                >
                  {cat.name}
                </motion.button>
              );
            })}
          </div>

          {/* Search, Dietary, and Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#E5DFD3]">
            {/* Search Box */}
            <div className="relative flex-1 w-full max-w-none sm:max-w-md">
              <Search className="w-4 h-4 text-[#77736E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search burgers, toppings, sides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#171717] text-xs font-body focus:outline-none focus:border-[#A82D24] min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="touch-target absolute right-1 top-1/2 -translate-y-1/2 text-[#77736E] hover:text-[#171717]"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Dietary Filter */}
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2.5 bg-white border border-[#171717] text-xs font-display font-bold uppercase tracking-wider text-[#171717] focus:outline-none cursor-pointer min-h-[44px]"
              >
                <option value="all">All Dietary</option>
                <option value="chef-choice">Chef’s Choice</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="spicy">Spicy</option>
                <option value="gluten-free">Gluten-Conscious</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 sm:flex-none px-3 py-2.5 bg-white border border-[#171717] text-xs font-display font-bold uppercase tracking-wider text-[#171717] focus:outline-none cursor-pointer min-h-[44px]"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="relative z-0 flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border-2 border-[#171717] p-8 max-w-lg mx-auto">
              <div className="w-14 h-14 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center mx-auto mb-4 text-[#A82D24]">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-2">
                No menu items match your filter
              </h3>
              <p className="text-xs text-[#77736E] font-body mb-6">
                Try clearing your search query or switching dietary preferences.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('all');
                  handleCategoryChange('all');
                }}
                className="px-6 py-2.5 bg-[#171717] text-white font-display font-extrabold uppercase text-sm tracking-wider hover:bg-[#A82D24] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase font-display tracking-wider text-[#77736E]">
                  Showing {filteredProducts.length} Craft Items
                </span>
              </div>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
