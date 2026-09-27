import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatMoney } from '../../lib/utils';
import { useCartStore } from '../../stores/useCartStore';
import { Badge } from '../ui/Badge';
import { ProductQuickView } from './ProductQuickView';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCartStore();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If product has required modifier groups, open quick view
    const hasRequiredModifiers = product.modifierGroups?.some((g) => g.required);
    if (hasRequiredModifiers) {
      setIsQuickViewOpen(true);
      return;
    }

    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <>
      <motion.div
        layout
        whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px #171717' }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`group bg-[#FFFFFF] border-2 border-[#171717] flex flex-col justify-between container-inline ${className || ''}`}
      >
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0E6] border-b-2 border-[#171717]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges on top left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
            {product.isBestSeller && (
              <Badge variant="mustard" size="sm">
                Best Seller
              </Badge>
            )}
            {product.dietary?.includes('chef-choice') && (
              <Badge variant="red" size="sm">
                Chef Choice
              </Badge>
            )}
            {product.dietary?.includes('spicy') && (
              <Badge variant="charcoal" size="sm">
                Spicy
              </Badge>
            )}
            {product.dietary?.includes('vegetarian') && (
              <Badge variant="cream" size="sm">
                Vegetarian
              </Badge>
            )}
          </div>

          {/* Quick View Button on top right with 44x44px touch target */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="touch-target absolute top-2 right-2 w-11 h-11 bg-[#FAF8F3] hover:bg-[#171717] hover:text-white border border-[#171717] flex items-center justify-center text-[#171717] transition-colors opacity-95 hover:opacity-100 cursor-pointer shadow-sm"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <Link
                to={`/menu/${product.slug}`}
                className="font-display font-black text-xl md:text-2xl uppercase tracking-tight text-[#171717] hover:text-[#A82D24] transition-colors leading-tight"
              >
                {product.name}
              </Link>
            </div>

            <p className="text-xs md:text-sm text-[#77736E] font-body line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
          </div>

          {/* Pricing and Action Row */}
          <div className="pt-3 border-t border-[#E5DFD3] flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-display font-black text-xl sm:text-2xl text-[#171717]">
                {formatMoney(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-[11px] sm:text-xs text-[#77736E] line-through font-bold truncate">
                  {formatMoney(product.compareAtPrice)}
                </span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleQuickAdd}
              disabled={!product.isAvailable}
              className={`min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs md:text-sm font-display font-extrabold uppercase tracking-wider transition-colors border cursor-pointer ${
                !product.isAvailable
                  ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                  : justAdded
                  ? 'bg-[#171717] text-[#E9B949] border-[#171717]'
                  : 'bg-[#A82D24] text-white hover:bg-[#8C231B] border-[#A82D24]'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Added</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{product.isAvailable ? 'Add' : 'Sold Out'}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <ProductQuickView
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};
