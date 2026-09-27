import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Tag, Bike, Store, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';
import { formatMoney } from '../../lib/utils';
import { QuantitySelector } from '../ui/QuantitySelector';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    fulfillmentType,
    setFulfillmentType,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal,
    tipAmount,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) setCouponInput('');
  };

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 bg-[#171717]"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 290 }}
              className="w-screen max-w-full sm:max-w-md bg-[#FAF8F3] border-l-0 sm:border-l-4 border-[#171717] flex flex-col justify-between shadow-2xl h-[100dvh] max-h-[100dvh]"
            >
              {/* Header */}
              <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#F5F0E6] border-b-2 border-[#171717] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#A82D24]" />
              <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[#171717]">
                Your Order ({items.length})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="touch-target p-1.5 text-[#171717] hover:bg-[#A82D24] hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Fulfillment Toggle */}
          <div className="p-4 bg-[#FFFFFF] border-b border-[#E5DFD3]">
            <div className="grid grid-cols-2 gap-2 bg-[#F5F0E6] p-1 border border-[#E5DFD3]">
              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={`flex items-center justify-center gap-2 py-2 text-xs font-black font-display uppercase tracking-wider transition-colors cursor-pointer ${
                  fulfillmentType === 'delivery'
                    ? 'bg-[#171717] text-[#FAF8F3]'
                    : 'text-[#77736E] hover:text-[#171717]'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                className={`flex items-center justify-center gap-2 py-2 text-xs font-black font-display uppercase tracking-wider transition-colors cursor-pointer ${
                  fulfillmentType === 'pickup'
                    ? 'bg-[#171717] text-[#FAF8F3]'
                    : 'text-[#77736E] hover:text-[#171717]'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Curbside Pickup</span>
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#F5F0E6] border border-[#E5DFD3] flex items-center justify-center mx-auto mb-4 text-[#77736E]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#77736E] font-body mb-6">
                  Add some freshly pressed smash burgers, crispy truffle fries, or thick milkshakes!
                </p>
                <Link
                  to="/menu"
                  onClick={closeDrawer}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A82D24] text-white font-display font-extrabold uppercase text-sm tracking-wider hover:bg-[#8C231B] transition-colors"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.16 } }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#FFFFFF] border border-[#E5DFD3] p-3 flex gap-3 relative group"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover border border-[#E5DFD3] bg-[#F5F0E6] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-bold text-base uppercase text-[#171717] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#77736E] hover:text-[#A82D24] transition-colors p-1 cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Modifiers summary */}
                      {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                        <div className="text-[11px] text-[#77736E] font-body space-y-0.5 my-1">
                          {item.selectedModifiers.map((m) => (
                            <div key={m.optionId}>
                              • {m.optionName}{' '}
                              {m.price > 0 && `(+${formatMoney(m.price)})`}
                            </div>
                          ))}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <p className="text-[11px] text-[#A82D24] italic font-body">
                          Note: "{item.specialInstructions}"
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5F0E6]">
                        <QuantitySelector
                          size="sm"
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        />
                        <span className="font-display font-black text-base text-[#171717]">
                          {formatMoney(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer with Calculations and Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FFFFFF] border-t-2 border-[#171717] space-y-4 pb-safe">
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 bg-[#F5F0E6] border border-[#E9B949] text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                      <Tag className="w-3.5 h-3.5 text-[#A82D24]" />
                      <span>Coupon {appliedCoupon} applied (-{formatMoney(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#A82D24] font-bold text-xs underline cursor-pointer p-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. SMASH20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DFD3] font-display uppercase font-bold focus:outline-none focus:border-[#171717]"
                    />
                    <button
                      type="submit"
                      className="touch-target px-4 py-2 bg-[#171717] hover:bg-[#A82D24] text-white text-xs font-display font-black uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !appliedCoupon && (
                  <p className="text-[11px] text-[#A82D24] mt-1 font-body">
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-1.5 text-xs text-[#77736E] font-body border-t border-[#E5DFD3] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#171717]">{formatMoney(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A82D24]">
                    <span>Discount</span>
                    <span>-{formatMoney(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee {fulfillmentType === 'pickup' && '(Curbside)'}</span>
                  <span className="font-bold text-[#171717]">
                    {deliveryFee === 0 ? 'FREE' : formatMoney(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span>{formatMoney(tax)}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Kitchen & Driver Tip</span>
                    <span>{formatMoney(tipAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-display font-black text-[#171717] pt-2 border-t border-[#171717]">
                  <span className="uppercase">Total Due</span>
                  <span>{formatMoney(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                to="/checkout"
                onClick={closeDrawer}
                className="w-full py-3.5 sm:py-4 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-base sm:text-lg tracking-wider flex items-center justify-between px-6 border border-[#A82D24] transition-colors min-h-[48px]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
      )}
    </AnimatePresence>
  );
};
