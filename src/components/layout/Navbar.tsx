import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Menu as MenuIcon, X } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { cn } from '../../lib/utils';
import { BrandLogo } from '../common/BrandLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { getItemCount, openDrawer } = useCartStore();
  const { currentUser, isAuthenticated } = useAuthStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Deals', href: '/deals' },
    { label: 'Build Burger', href: '/build-your-burger' },
    { label: 'About', href: '/about' },
    { label: 'Locations', href: '/locations' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-200 border-b',
          isScrolled
            ? 'bg-[#FAF8F3] border-[#171717] shadow-[0_2px_0_0_#171717]'
            : 'bg-[#FAF8F3]/95 backdrop-blur-none border-[#E5DFD3]'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center group">
            <BrandLogo variant="navbar" />
          </Link>

        {/* Center: Desktop Navigation with hover transitions */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'font-display font-extrabold text-lg uppercase tracking-wider transition-colors relative py-1 group',
                  isActive
                    ? 'text-[#A82D24]'
                    : 'text-[#171717] hover:text-[#A82D24]'
                )}
              >
                <span>{link.label}</span>
                {/* Active & hover underline transition */}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-0.5 bg-[#A82D24] transition-all duration-200',
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search link */}
          <Link
            to="/menu"
            className="touch-target p-2 text-[#171717] hover:bg-[#F5F0E6] rounded-[2px] transition-colors"
            aria-label="Search Menu"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Account */}
          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="touch-target p-2 text-[#171717] hover:bg-[#F5F0E6] rounded-[2px] transition-colors relative"
            aria-label="User Account"
          >
            <User className="w-5 h-5" />
            {isAuthenticated && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#A82D24] rounded-full border border-white" />
            )}
          </Link>

          {/* Cart Drawer Trigger with animated badge */}
          <button
            onClick={openDrawer}
            className="touch-target relative p-2 text-[#171717] hover:bg-[#F5F0E6] rounded-[2px] transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 450 }}
                className="absolute top-1 right-1 bg-[#E9B949] text-[#171717] font-display font-black text-xs min-w-[20px] h-5 px-1 flex items-center justify-center border border-[#171717] rounded-full"
              >
                {itemCount}
              </motion.span>
            )}
          </button>

          {/* Order Now CTA */}
          <Link
            to="/menu"
            className="hidden md:inline-flex items-center justify-center bg-[#A82D24] text-white hover:bg-[#8C231B] font-display font-extrabold uppercase text-sm tracking-wider px-4 py-2.5 border border-[#A82D24] transition-colors min-h-[44px]"
          >
            Order Now
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden touch-target p-2 text-[#171717] hover:bg-[#F5F0E6] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with smooth height/opacity animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden bg-[#FAF8F3] border-b-4 border-[#171717] px-4 pt-3 pb-6 max-h-[calc(100dvh-5rem)] overflow-y-auto pb-safe space-y-4 shadow-xl"
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-display font-extrabold text-xl uppercase tracking-wider text-[#171717] hover:text-[#A82D24] py-3 border-b border-[#E5DFD3] min-h-[44px] flex items-center transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2">
              <Link
                to="/menu"
                className="w-full flex items-center justify-center bg-[#A82D24] hover:bg-[#8C231B] text-white py-3.5 font-display font-black text-lg uppercase tracking-wider border border-[#A82D24] min-h-[44px] transition-colors"
              >
                Order Online Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
