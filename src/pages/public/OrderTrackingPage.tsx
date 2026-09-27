import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Clock, Bike, Store, Printer, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useOrderStore } from '../../stores/useOrderStore';
import { formatMoney, formatDateTime } from '../../lib/utils';
import { OrderStatus } from '../../types';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useSettingsStore } from '../../stores/useSettingsStore';

export const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, getOrderByNumber } = useOrderStore();
  const { settings } = useSettingsStore();

  const order = getOrderById(id || '') || getOrderByNumber(id || '');
  const [showReceipt, setShowReceipt] = useState(false);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
        <AnnouncementBar />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-4xl font-black font-display uppercase mb-3">
            Order Not Found
          </h2>
          <p className="text-sm font-body text-[#77736E] mb-6">
            We could not find an order matching that identifier.
          </p>
          <Link
            to="/menu"
            className="px-6 py-3 bg-[#A82D24] text-white font-display font-extrabold uppercase text-sm tracking-wider"
          >
            Back to Menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Status Stepper steps
  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'confirmed', label: 'Order Confirmed', desc: 'Received & sent to kitchen' },
    { status: 'preparing', label: 'On The Cast Iron', desc: 'Patties searing to perfection' },
    { status: 'ready', label: order.fulfillmentType === 'pickup' ? 'Ready for Pickup' : 'Ready for Courier', desc: 'Packed fresh and hot' },
    { status: 'completed', label: 'Completed', desc: 'Enjoy your meal!' },
  ];

  const getStatusIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 0;
      case 'preparing':
        return 1;
      case 'ready':
      case 'out_for_delivery':
        return 2;
      case 'completed':
        return 3;
      default:
        return 1;
    }
  };

  const currentStepIndex = getStatusIndex(order.status);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      {/* Confirmation Header */}
      <section className="bg-[#171717] text-white py-12 border-b-4 border-[#A82D24]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <div className="w-14 h-14 bg-[#A82D24] text-white border-2 border-white flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Order Dispatched to Kitchen
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display uppercase text-white leading-none">
            Order #{order.orderNumber}
          </h1>
          <p className="text-sm font-body text-[#FAF8F3]/75">
            Placed on {formatDateTime(order.createdAt)} · Estimated Time: 15-25 Mins
          </p>
        </div>
      </section>

      {/* Stepper Status Bar */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 space-y-10 w-full">
        <div className="bg-white border-4 border-[#171717] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5DFD3]">
            <div>
              <span className="text-xs font-bold uppercase font-display text-[#77736E]">
                Current Live Status
              </span>
              <h2 className="font-display font-black text-2xl uppercase text-[#A82D24]">
                {order.status.replace('_', ' ')}
              </h2>
            </div>
            <button
              onClick={() => setShowReceipt(true)}
              className="px-4 py-2 bg-[#F5F0E6] hover:bg-[#171717] hover:text-white text-[#171717] font-display font-bold text-xs uppercase tracking-wider border border-[#171717] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
          </div>

          {/* Steps Track */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const isPast = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={step.status}
                  className={`p-4 border-2 transition-all ${
                    isCurrent
                      ? 'bg-[#F5F0E6] border-[#A82D24] shadow-[3px_3px_0px_0px_#A82D24]'
                      : isPast
                      ? 'bg-white border-[#171717]'
                      : 'bg-white border-[#E5DFD3] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                    {isPast && <Check className="w-4 h-4 text-[#A82D24]" />}
                  </div>
                  <h4 className="font-display font-black text-lg uppercase text-[#171717] leading-tight">
                    {step.label}
                  </h4>
                  <p className="text-[11px] font-body text-[#77736E] mt-1">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Items breakdown (7 cols) */}
          <div className="md:col-span-7 bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717] space-y-4">
            <h3 className="font-display font-black text-xl uppercase text-[#171717] border-b border-[#E5DFD3] pb-3">
              Items Ordered
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs border-b border-[#F5F0E6] pb-3">
                  <div>
                    <span className="font-bold text-[#171717] font-display text-base uppercase">
                      {item.quantity}x {item.name}
                    </span>
                    {item.modifiers && item.modifiers.length > 0 && (
                      <div className="text-[11px] text-[#77736E] font-body mt-0.5">
                        {item.modifiers.map((m) => m.optionName).join(', ')}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <div className="text-[11px] text-[#A82D24] italic font-body">
                        Note: {item.specialInstructions}
                      </div>
                    )}
                  </div>
                  <span className="font-bold font-display text-base text-[#171717]">
                    {formatMoney(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div className="pt-2 space-y-1.5 text-xs text-[#77736E] font-body">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatMoney(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#A82D24]">
                  <span>Discount ({order.couponCode})</span>
                  <span>-{formatMoney(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Fulfillment Fee</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : formatMoney(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatMoney(order.tax)}</span>
              </div>
              {order.tip > 0 && (
                <div className="flex justify-between">
                  <span>Staff Tip</span>
                  <span>{formatMoney(order.tip)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-display font-black text-[#171717] pt-2 border-t border-[#171717]">
                <span>Total Paid</span>
                <span>{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Fulfillment details (5 cols) */}
          <div className="md:col-span-5 bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717] space-y-6">
            <div>
              <h3 className="font-display font-black text-xl uppercase text-[#171717] border-b border-[#E5DFD3] pb-3 mb-3">
                Fulfillment Details
              </h3>
              <div className="flex items-center gap-2 mb-2 text-[#A82D24]">
                {order.fulfillmentType === 'pickup' ? (
                  <Store className="w-5 h-5" />
                ) : (
                  <Bike className="w-5 h-5" />
                )}
                <span className="font-display font-bold text-sm uppercase">
                  {order.fulfillmentType === 'pickup' ? 'Curbside Pickup' : 'Courier Delivery'}
                </span>
              </div>

              {order.fulfillmentType === 'pickup' ? (
                <p className="text-xs font-body text-[#77736E]">
                  <strong>Branch:</strong> {order.pickupBranch || 'Downtown Flagship'}
                  <br />
                  Please present Order #{order.orderNumber} to our pickup station counter upon arrival.
                </p>
              ) : (
                <p className="text-xs font-body text-[#77736E]">
                  <strong>Address:</strong> {order.deliveryAddress?.street},{' '}
                  {order.deliveryAddress?.city}, {order.deliveryAddress?.state}{' '}
                  {order.deliveryAddress?.zipCode}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#E5DFD3]">
              <span className="font-display font-bold text-xs uppercase text-[#77736E] block mb-1">
                Customer Contact
              </span>
              <p className="text-xs font-body text-[#171717]">
                {order.customerName}
                <br />
                {order.customerPhone}
                <br />
                {order.customerEmail}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DFD3]">
              <Link
                to="/contact"
                className="w-full py-2.5 bg-[#F5F0E6] hover:bg-[#171717] hover:text-white text-[#171717] font-display font-extrabold uppercase text-xs tracking-wider flex items-center justify-center gap-1.5 border border-[#171717] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Need Help with this Order?</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Printable Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/80">
          <div className="bg-white border-4 border-[#171717] max-w-md w-full p-8 font-mono text-xs space-y-4">
            <div className="text-center border-b-2 border-dashed border-black pb-4 space-y-1">
              <BrandLogo variant="receipt" />
              <p>{settings.address || '428 Lexington Ave, New York, NY'}</p>
              <p>ORDER #{order.orderNumber}</p>
              <p>{formatDateTime(order.createdAt)}</p>
            </div>

            <div className="space-y-2 border-b-2 border-dashed border-black pb-4">
              {order.items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>
                    {i.quantity}x {i.name}
                  </span>
                  <span>{formatMoney(i.totalPrice)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 border-b-2 border-dashed border-black pb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatMoney(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{formatMoney(order.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1">
                <span>TOTAL:</span>
                <span>{formatMoney(order.total)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-[#171717] text-white font-display uppercase font-bold"
              >
                Print
              </button>
              <button
                onClick={() => setShowReceipt(false)}
                className="px-4 py-2 border border-[#171717] font-display uppercase font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
