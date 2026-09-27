import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Lock, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useAuthStore } from '../../stores/useAuthStore';
import { SEED_USERS } from '../../db/seed-data';
import { BrandLogo } from '../../components/common/BrandLogo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/account');
    }
  };

  const handleQuickLogin = (userId: string, redirectPath: string) => {
    switchUser(userId);
    navigate(redirectPath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white border-4 border-[#171717] p-8 shadow-[10px_10px_0px_0px_#171717] space-y-6">
          <div className="text-center space-y-2 flex flex-col items-center">
            <BrandLogo variant="navbar" className="justify-center mb-1" />
            <h1 className="font-display font-black text-3xl uppercase text-[#171717]">
              Welcome Back
            </h1>
            <p className="text-xs text-[#77736E] font-body">
              Log in to access your orders, saved addresses, or the staff CMS dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@burgercraft.com"
                className="w-full px-3 py-2.5 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-base tracking-wider transition-colors border border-[#A82D24] cursor-pointer"
            >
              Sign In to Account
            </button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="pt-4 border-t border-[#E5DFD3] space-y-2">
            <span className="block text-[11px] font-bold uppercase font-display text-[#77736E] text-center mb-2">
              Instant One-Click Demo Access
            </span>

            <button
              type="button"
              onClick={() => handleQuickLogin(SEED_USERS[0].id, '/admin')}
              className="w-full py-2 bg-[#171717] hover:bg-[#2A2A2A] text-[#E9B949] font-display font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 border border-[#171717] cursor-pointer transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#A82D24]" />
              <span>Log in as Super Admin (Marcus) → Admin Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin(SEED_USERS[2].id, '/account')}
              className="w-full py-2 bg-[#F5F0E6] hover:bg-[#E5DFD3] text-[#171717] font-display font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 border border-[#171717] cursor-pointer transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Log in as Customer (Jordan) → Account</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
