import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center my-12">
        <div className="w-20 h-20 bg-[#171717] text-[#E9B949] flex items-center justify-center mb-6 border-4 border-[#171717]">
          <UtensilsCrossed className="w-10 h-10 stroke-[2.5]" />
        </div>
        <span className="text-xs font-bold font-display uppercase text-[#A82D24] tracking-[0.2em] mb-2">
          Error 404
        </span>
        <h1 className="text-5xl sm:text-7xl font-black font-display uppercase tracking-tight text-[#171717] mb-4">
          This Page Has Been 86'd
        </h1>
        <p className="text-sm font-body text-[#77736E] max-w-md mx-auto mb-8 leading-relaxed">
          The link you followed seems to have burned off the grill. Let's get you back to the fresh menu.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-base tracking-wider border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Craft Menu</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
};
