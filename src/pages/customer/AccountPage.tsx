import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Shield, LogOut, RefreshCw, ArrowRight } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { useAuthStore } from '../../stores/useAuthStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { useCartStore } from '../../stores/useCartStore';
import { formatMoney, formatDate } from '../../lib/utils';
import { SEED_USERS } from '../../db/seed-data';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout, switchUser } = useAuthStore();
  const { getOrdersByEmail } = useOrderStore();
  const { addItem } = useCartStore();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const userOrders = getOrdersByEmail(currentUser.email);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <section className="bg-[#171717] text-white py-12 border-b-4 border-[#A82D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt=""
                className="w-16 h-16 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#A82D24] text-white flex items-center justify-center font-black text-2xl font-display border-2 border-white">
                {currentUser.name[0]}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black font-display uppercase text-white leading-none">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] bg-[#E9B949] text-[#171717] font-black uppercase font-display px-2 py-0.5">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-[#FAF8F3]/70 font-body mt-1">
                {currentUser.email} · Member since {formatDate(currentUser.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(currentUser.role === 'super_admin' || currentUser.role === 'admin') && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-extrabold uppercase text-xs tracking-wider flex items-center gap-1.5 border border-white"
              >
                <Shield className="w-4 h-4" />
                <span>Admin CMS Portal</span>
              </Link>
            )}

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-4 py-2 bg-[#2A2A2A] hover:bg-[#333333] text-white font-display font-bold uppercase text-xs tracking-wider flex items-center gap-1.5 border border-[#444444] cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Role Switcher banner for seamless developer testing */}
      <div className="bg-[#F5F0E6] border-b border-[#E5DFD3] py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-body text-[#77736E] flex-wrap gap-2">
          <span>Switch Active Test Role:</span>
          <div className="flex items-center gap-2">
            {SEED_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => switchUser(u.id)}
                className={`px-2.5 py-1 text-xs font-display font-bold uppercase border cursor-pointer ${
                  currentUser.id === u.id
                    ? 'bg-[#171717] text-white border-[#171717]'
                    : 'bg-white text-[#171717] border-[#E5DFD3] hover:border-[#171717]'
                }`}
              >
                {u.name} ({u.role.replace('_', ' ')})
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Order History (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl font-black font-display uppercase text-[#171717] border-b-2 border-[#171717] pb-3">
              Order History ({userOrders.length})
            </h2>

            {userOrders.length === 0 ? (
              <div className="p-8 bg-white border-2 border-[#171717] text-center space-y-3">
                <Package className="w-8 h-8 mx-auto text-[#77736E]" />
                <p className="text-sm font-body text-[#77736E]">
                  You have not placed any orders under this email address yet.
                </p>
                <Link
                  to="/menu"
                  className="inline-block px-5 py-2.5 bg-[#A82D24] text-white font-display font-bold uppercase text-xs tracking-wider"
                >
                  Order Food Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border-2 border-[#171717] p-5 shadow-[4px_4px_0px_0px_#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-black text-xl text-[#171717]">
                          #{ord.orderNumber}
                        </span>
                        <span className="text-[10px] bg-[#F5F0E6] text-[#A82D24] font-bold uppercase font-display px-2 py-0.5 border border-[#E5DFD3]">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#77736E] font-body">
                        {formatDate(ord.createdAt)} · {ord.items.length} Item(s) · {formatMoney(ord.total)}
                      </p>
                      <div className="text-xs font-body text-[#171717] mt-2">
                        {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/orders/${ord.id}`}
                        className="px-4 py-2 bg-[#F5F0E6] hover:bg-[#171717] hover:text-white text-[#171717] font-display font-bold text-xs uppercase tracking-wider border border-[#171717] transition-colors"
                      >
                        Track Status
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile & Saved Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717] space-y-4">
              <h3 className="font-display font-black text-xl uppercase text-[#171717] border-b border-[#E5DFD3] pb-3">
                Saved Delivery Address
              </h3>
              <div className="text-xs font-body text-[#77736E] space-y-1">
                <strong className="block text-[#171717]">Primary Residence</strong>
                <p>725 5th Ave, Apt 14A</p>
                <p>New York, NY 10022</p>
                <p>Phone: +1 (555) 890-1234</p>
              </div>
            </div>

            <div className="bg-[#171717] text-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#A82D24] space-y-3">
              <h3 className="font-display font-black text-xl uppercase text-white">
                VIP Craft Club Status
              </h3>
              <p className="text-xs font-body text-[#FAF8F3]/75 leading-relaxed">
                You receive free truffle parmesan fries upgrade on orders over $30 with code <strong>FEAST5</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
