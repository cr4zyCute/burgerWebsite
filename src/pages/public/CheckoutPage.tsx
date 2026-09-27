import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Banknote, Smartphone, Check, ShieldCheck, Lock, ShoppingBag, Loader2 } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useCartStore } from '../../stores/useCartStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { formatMoney, generateOrderNumber } from '../../lib/utils';
import { PaymentMethod } from '../../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    fulfillmentType,
    setFulfillmentType,
    selectedBranch,
    setSelectedBranch,
    appliedCoupon,
    discountAmount,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal,
    tipAmount,
    setTipAmount,
    clearCart,
  } = useCartStore();

  const { createOrder } = useOrderStore();

  // Customer state
  const [name, setName] = useState('Jordan Miller');
  const [email, setEmail] = useState('jordan.miller@example.com');
  const [phone, setPhone] = useState('+1 (555) 890-1234');

  // Address
  const [street, setStreet] = useState('725 5th Ave');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [zipCode, setZipCode] = useState('10022');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
        <AnnouncementBar />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center mx-auto mb-4 text-[#A82D24]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black font-display uppercase mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-sm font-body text-[#77736E] mb-6">
            Please add items from the menu before proceeding to checkout.
          </p>
          <Link
            to="/menu"
            className="px-6 py-3 bg-[#A82D24] text-white font-display font-black uppercase text-sm tracking-wider"
          >
            Explore Menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;

    setIsProcessing(true);

    // Simulate authentic server verification
    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      const newOrder = createOrder({
        orderNumber,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        fulfillmentType,
        pickupBranch: fulfillmentType === 'pickup' ? selectedBranch : undefined,
        deliveryAddress:
          fulfillmentType === 'delivery'
            ? { street, city, state, zipCode, instructions: orderNotes }
            : undefined,
        items: items.map((i) => ({
          id: i.id,
          productId: i.productId,
          name: i.product.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.totalPrice,
          modifiers: i.selectedModifiers,
          specialInstructions: i.specialInstructions,
        })),
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon || undefined,
        deliveryFee,
        tax,
        tip: tipAmount,
        total,
        status: 'confirmed',
        paymentMethod,
        paymentStatus: 'paid',
      });

      clearCart();
      setIsProcessing(false);
      navigate(`/orders/${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-[#F5F0E6] border-b border-[#E5DFD3] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase font-display text-[#77736E] hover:text-[#171717]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Ordering</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase font-display text-[#77736E]">
            <Lock className="w-3.5 h-3.5 text-[#A82D24]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Fulfillment Selection */}
            <div className="bg-white border-2 border-[#171717] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#171717]">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-4">
                1. Order Fulfillment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-black font-display uppercase tracking-wider border-2 cursor-pointer transition-colors min-h-[44px] flex items-center justify-center ${
                    fulfillmentType === 'delivery'
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-white text-[#171717] border-[#E5DFD3] hover:border-[#171717]'
                  }`}
                >
                  Delivery to Door
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-black font-display uppercase tracking-wider border-2 cursor-pointer transition-colors min-h-[44px] flex items-center justify-center ${
                    fulfillmentType === 'pickup'
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-white text-[#171717] border-[#E5DFD3] hover:border-[#171717]'
                  }`}
                >
                  Curbside Pickup
                </button>
              </div>

              {fulfillmentType === 'pickup' ? (
                <div>
                  <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                    Select Pickup Branch
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-3 bg-[#FAF8F3] border border-[#171717] text-xs font-body font-bold focus:outline-none min-h-[44px]"
                  >
                    <option value="Downtown Flagship & Grill">
                      Downtown Flagship & Grill — 428 Lexington Ave, New York
                    </option>
                    <option value="Brooklyn Waterfront Kitchen">
                      Brooklyn Waterfront Kitchen — 88 Water St, DUMBO
                    </option>
                    <option value="SoHo Craft Tavern">
                      SoHo Craft Tavern — 154 Spring St, New York
                    </option>
                  </select>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full p-3 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none min-h-[44px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-3 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full p-3 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Customer Contact */}
            <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-4">
                2. Guest Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                    Phone Number (For Courier / Pickup SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                    Email Address (For Receipt & Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-4">
                3. Secure Payment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'apple_pay', label: 'Apple Pay / Digital', icon: Smartphone },
                  { id: 'gcash', label: 'GCash / Maya (PH Gateway)', icon: Smartphone },
                  { id: 'cod', label: 'Cash on Arrival', icon: Banknote },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <motion.div
                      key={pm.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3.5 border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F5F0E6] border-[#A82D24] shadow-[2px_2px_0px_0px_#171717]'
                          : 'border-[#E5DFD3] hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-5 h-5 text-[#A82D24]" />
                        <span className="text-xs font-bold font-display uppercase text-[#171717]">
                          {pm.label}
                        </span>
                      </div>
                      <div
                        className={`w-4 h-4 border border-[#171717] rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-[#A82D24] text-white' : 'bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-3 border-t border-[#E5DFD3]">
                  <input
                    type="text"
                    placeholder="Card Number (•••• •••• •••• ••••)"
                    defaultValue="4242 •••• •••• 4242"
                    className="w-full p-2.5 bg-[#FAF8F3] border border-[#171717] text-xs font-mono"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="08/28"
                      className="w-full p-2 bg-[#FAF8F3] border border-[#171717] text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      defaultValue="888"
                      className="w-full p-2 bg-[#FAF8F3] border border-[#171717] text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 4. Kitchen / Courier Notes */}
            <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Kitchen or Delivery Notes
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Gate code, ring doorbell, contactless placement..."
                className="w-full p-2.5 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
              />
            </div>
          </div>

          {/* Order Summary & Pay Button (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-4 border-[#171717] p-6 shadow-[8px_8px_0px_0px_#171717] space-y-4">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] border-b border-[#E5DFD3] pb-3">
                Order Summary ({items.length})
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-xs border-b border-[#F5F0E6] pb-2">
                    <div>
                      <div className="font-bold text-[#171717] font-display text-sm uppercase">
                        {item.quantity}x {item.product.name}
                      </div>
                      {item.selectedModifiers.length > 0 && (
                        <div className="text-[11px] text-[#77736E] font-body">
                          {item.selectedModifiers.map((m) => m.optionName).join(', ')}
                        </div>
                      )}
                    </div>
                    <span className="font-bold font-display text-sm text-[#171717]">
                      {formatMoney(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tip Selection */}
              <div className="pt-2 border-t border-[#E5DFD3]">
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-2">
                  Kitchen & Driver Tip
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[200, 300, 500, 0].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTipAmount(t)}
                      className={`py-1.5 text-xs font-bold font-display uppercase border cursor-pointer ${
                        tipAmount === t
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'bg-[#F5F0E6] text-[#171717] border-[#E5DFD3]'
                      }`}
                    >
                      {t === 0 ? 'None' : formatMoney(t)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 text-xs font-body text-[#77736E] border-t border-[#E5DFD3] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#171717]">{formatMoney(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A82D24] font-bold">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-{formatMoney(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({fulfillmentType === 'pickup' ? 'Curbside' : 'Courier'})</span>
                  <span className="font-bold text-[#171717]">
                    {deliveryFee === 0 ? 'FREE' : formatMoney(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (8.25%)</span>
                  <span>{formatMoney(tax)}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Staff Tip</span>
                    <span>{formatMoney(tipAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-display font-black text-[#171717] pt-2 border-t-2 border-[#171717]">
                  <span className="uppercase">Total Amount</span>
                  <span>{formatMoney(total)}</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 pt-2 text-xs text-[#77736E] font-body cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 accent-[#A82D24]"
                />
                <span>
                  I agree to the restaurant terms of service and allergen disclosures.
                </span>
              </label>

              {/* Place Order CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-xl tracking-wider border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  `Place Order · ${formatMoney(total)}`
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};
