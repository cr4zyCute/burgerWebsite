import React, { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

interface AdminNavContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const AdminNavContext = createContext<AdminNavContextType>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  toggleSidebar: () => {},
});

export const useAdminNav = () => useContext(AdminNavContext);

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AdminNavContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}>
      <div className="flex h-screen bg-[#FAF8F3] text-[#171717] overflow-hidden font-body relative">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </AdminNavContext.Provider>
  );
};
