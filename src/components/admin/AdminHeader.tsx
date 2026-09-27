import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Shield, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useAdminNav } from './AdminLayout';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  actionButton,
}) => {
  const { currentUser, logout } = useAuthStore();
  const { toggleSidebar } = useAdminNav();

  return (
    <header className="h-16 bg-white border-b-2 border-[#171717] px-4 sm:px-6 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden touch-target p-1.5 text-[#171717] hover:bg-[#F5F0E6] transition-colors cursor-pointer"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[#171717] leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-[#77736E] font-body mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {actionButton}

        <div className="hidden sm:block h-5 w-[1px] bg-[#E5DFD3]" />

        <Link
          to="/"
          className="text-xs font-display font-bold uppercase text-[#171717] hover:text-[#A82D24] transition-colors whitespace-nowrap"
        >
          Customer Site →
        </Link>
      </div>
    </header>
  );
};
