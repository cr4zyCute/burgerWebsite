import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { SectionRenderer } from '../../components/homepage/SectionRenderer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { useCmsStore } from '../../stores/useCmsStore';

export const HomePage: React.FC = () => {
  const { publishedSections } = useCmsStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <Navbar />
      <main className="flex-1">
        {publishedSections.map((sec) => (
          <SectionRenderer key={sec.id} section={sec} />
        ))}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
