import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, Check, ArrowRight } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { usePromotionsStore } from '../../stores/usePromotionsStore';
import { useCartStore } from '../../stores/useCartStore';
import { formatMoney } from '../../lib/utils';

export const DealsPage: React.FC = () => {
  const { promotions } = usePromotionsStore();
  const { applyCoupon, openDrawer } = useCartStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleApplyCoupon = (code: string) => {
    applyCoupon(code);
    setCopiedCode(code);
    openDrawer();
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      {/* Header */}
      <section className="bg-[#171717] text-white py-14 border-b-4 border-[#A82D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Exclusive Offers
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display uppercase text-white leading-none">
            Deals & Combo Specials
          </h1>
          <p className="text-sm sm:text-base font-body text-[#FAF8F3]/75 max-w-xl mx-auto">
            Stack your feast and save. Apply active coupon codes directly to your online order.
          </p>
        </div>
      </section>

      {/* Deals Cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white border-4 border-[#171717] p-8 shadow-[8px_8px_0px_0px_#171717] flex flex-col justify-between relative overflow-hidden"
            >
              {/* Corner Ribbon */}
              <div className="absolute top-0 right-0 bg-[#A82D24] text-white px-4 py-1 font-display font-bold text-xs uppercase tracking-wider">
                {promo.discountType === 'percentage'
                  ? `${promo.discountValue}% OFF`
                  : `$${(promo.discountValue / 100).toFixed(2)} OFF`}
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#A82D24] mb-3">
                  <Tag className="w-5 h-5" />
                  <span className="font-display font-black text-sm uppercase tracking-wider">
                    Official Promo Code
                  </span>
                </div>

                <h3 className="font-display font-black text-3xl uppercase text-[#171717] mb-2 leading-tight">
                  {promo.title}
                </h3>

                <p className="text-sm font-body text-[#77736E] leading-relaxed mb-6">
                  {promo.description}
                </p>
              </div>

              <div className="pt-6 border-t-2 border-[#171717] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="bg-[#F5F0E6] border border-[#171717] px-4 py-2 flex items-center justify-between gap-3">
                  <span className="font-mono font-bold text-base text-[#171717]">
                    {promo.code}
                  </span>
                  <span className="text-[11px] text-[#77736E] font-body">
                    Min: {formatMoney(promo.minOrderAmount)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyCoupon(promo.code)}
                  className="px-5 py-2.5 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-sm tracking-wider flex items-center justify-center gap-1.5 border border-[#A82D24] transition-colors cursor-pointer"
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="w-4 h-4 text-[#E9B949]" />
                      <span>Code Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Apply to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Combo Spotlight */}
        <div className="bg-[#171717] text-white border-4 border-[#171717] p-8 md:p-12 shadow-[8px_8px_0px_0px_#A82D24] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
              Top Meal Bundle
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase text-white leading-none">
              The Double Smash Feast Combo
            </h2>
            <p className="text-sm font-body text-[#FAF8F3]/80 leading-relaxed">
              Double Smash King + Large Parmesan Truffle Fries + Vanilla Bean Shake. All bundled together with an automatic $3.55 savings.
            </p>
            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-lg px-7 py-3 border border-white"
              >
                <span>Order Feast Combo ($20.95)</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80"
              alt="Feast combo burger and fries"
              className="w-full h-auto aspect-[4/3] object-cover border-2 border-white"
            />
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
