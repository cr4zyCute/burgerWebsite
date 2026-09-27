import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Layers,
  Image,
  Tag,
  Users,
  MessageSquare,
  Settings,
  ClipboardList,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { useAdminNav } from './AdminLayout';

import { BrandLogo } from '../common/BrandLogo';

export const AdminSidebar: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { orders } = useOrderStore();
  const { sidebarOpen, setSidebarOpen } = useAdminNav();
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, setSidebarOpen]);

  const pendingCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'confirmed' || o.status === 'preparing'
  ).length;

  const links = [
    { label: 'Overview & Analytics', href: '/admin', icon: LayoutDashboard },
    {
      label: 'Orders Management',
      href: '/admin/orders',
      icon: ShoppingBag,
      badge: pendingCount > 0 ? pendingCount : undefined,
    },
    { label: 'Product Catalog', href: '/admin/products', icon: UtensilsCrossed },
    {
      label: 'Visual Homepage CMS',
      href: '/admin/homepage-editor',
      icon: Layers,
      highlight: true,
    },
    { label: 'Media Library', href: '/admin/media', icon: Image },
    { label: 'Promotions & Coupons', href: '/admin/promotions', icon: Tag },
    { label: 'Customer Reviews', href: '/admin/reviews', icon: MessageSquare },
    { label: 'Customer Accounts', href: '/admin/customers', icon: Users },
    { label: 'Restaurant Settings', href: '/admin/settings', icon: Settings },
    { label: 'Staff Audit Logs', href: '/admin/audit-logs', icon: ClipboardList },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#171717] opacity-60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:static w-64 bg-[#171717] text-white flex flex-col justify-between border-r-2 border-[#2A2A2A] flex-shrink-0 select-none transform transition-transform duration-200 h-[100dvh] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-4 sm:p-5 border-b border-[#2A2A2A] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group min-w-0 flex-1">
              <BrandLogo variant="admin-sidebar" />
            </Link>
            
            <div className="flex items-center gap-2">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                title="Open Live Public Site"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden touch-target text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation list */}
          <nav className="p-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/admin'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-colors rounded-[2px] ${
                    isActive
                      ? 'bg-[#A82D24] text-white'
                      : link.highlight
                      ? 'bg-[#222222] text-[#E9B949] hover:bg-[#2A2A2A]'
                      : 'text-white/75 hover:bg-[#222222] hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="bg-[#E9B949] text-[#171717] px-1.5 py-0.2 rounded-full font-black text-[10px]">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Staff profile footer */}
      <div className="p-4 border-t border-[#2A2A2A] bg-[#141414]">
        <div className="flex items-center gap-3">
          {currentUser?.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt=""
              className="w-9 h-9 rounded-full object-cover border border-[#444444]"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#A82D24] text-white flex items-center justify-center font-bold text-xs">
              {currentUser?.name ? currentUser.name[0] : 'A'}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <span className="block font-display font-bold text-xs uppercase text-white truncate">
              {currentUser?.name || 'Administrator'}
            </span>
            <span className="block text-[10px] text-[#E9B949] font-mono capitalize">
              {currentUser?.role ? currentUser.role.replace('_', ' ') : 'Super Admin'}
            </span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};
