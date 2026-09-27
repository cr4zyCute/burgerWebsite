import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { MenuPage } from './pages/public/MenuPage';
import { ProductDetailPage } from './pages/public/ProductDetailPage';
import { BuildYourBurgerPage } from './pages/public/BuildYourBurgerPage';
import { DealsPage } from './pages/public/DealsPage';
import { AboutPage } from './pages/public/AboutPage';
import { LocationsPage } from './pages/public/LocationsPage';
import { ContactPage } from './pages/public/ContactPage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import { OrderTrackingPage } from './pages/public/OrderTrackingPage';
import { PolicyPage } from './pages/public/PolicyPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Customer pages
import { AccountPage } from './pages/customer/AccountPage';
import { LoginPage } from './pages/customer/LoginPage';

// Admin pages & Visual CMS
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { VisualHomepageEditor } from './components/editor/VisualHomepageEditor';
import { AdminMediaLibraryPage } from './pages/admin/AdminMediaLibraryPage';
import { AdminPromotionsPage } from './pages/admin/AdminPromotionsPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Customer Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:slug" element={<ProductDetailPage />} />
        <Route path="/build-your-burger" element={<BuildYourBurgerPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders/:id" element={<OrderTrackingPage />} />

        {/* Policies */}
        <Route path="/allergens" element={<PolicyPage />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route path="/terms" element={<PolicyPage />} />
        <Route path="/refunds" element={<PolicyPage />} />

        {/* Customer Auth & Account */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Visual CMS Standalone Canvas */}
        <Route path="/admin/homepage-editor" element={<VisualHomepageEditor />} />

        {/* Admin Console Sub-routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="media" element={<AdminMediaLibraryPage />} />
          <Route path="promotions" element={<AdminPromotionsPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
