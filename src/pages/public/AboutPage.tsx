import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Heart, Award, Utensils } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#171717] text-white py-16 border-b-4 border-[#A82D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Our Heritage & Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display uppercase text-white leading-none">
            Honest Craftsmanship. Smashed Hot.
          </h1>
          <p className="text-sm sm:text-base font-body text-[#FAF8F3]/75 max-w-2xl mx-auto leading-relaxed">
            Founded in 2018 in New York City with a mission to revive authentic mid-century diner techniques with premier dry-aged American beef.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A82D24] font-display">
              The Origin Story
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase text-[#171717] leading-none">
              Born from a Cast Iron Obsession
            </h2>
            <p className="text-sm sm:text-base font-body text-[#77736E] leading-relaxed">
              We spent over 18 months obsessing over a singular question: what makes the ultimate smash burger? We discovered it wasn’t sauces or heavy toppings — it was heat, fat distribution, and contact time.
            </p>
            <p className="text-sm sm:text-base font-body text-[#77736E] leading-relaxed">
              When a fresh sphere of 28-day dry-aged beef is pressed hard onto seasoned 450° cast iron, the Maillard reaction creates an intensely savory caramelized lace rim that no standard flat top can duplicate.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="border-4 border-[#171717] shadow-[10px_10px_0px_0px_#171717] overflow-hidden bg-[#F5F0E6]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85"
                alt="Grillmaster searing smash burgers"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-[#171717] p-8 shadow-[6px_6px_0px_0px_#171717] space-y-4">
            <div className="w-12 h-12 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24]">
              <Flame className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
              Proprietary Beef Blend
            </h3>
            <p className="text-xs sm:text-sm font-body text-[#77736E] leading-relaxed">
              80/20 ratio of dry-aged brisket, chuck, and short rib sourced from non-GMO, pasture-raised cattle in upstate New York.
            </p>
          </div>

          <div className="bg-white border-2 border-[#171717] p-8 shadow-[6px_6px_0px_0px_#171717] space-y-4">
            <div className="w-12 h-12 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24]">
              <Utensils className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
              European Butter Brioche
            </h3>
            <p className="text-xs sm:text-sm font-body text-[#77736E] leading-relaxed">
              Custom baked fresh every single morning by our neighborhood partner bakery. Light, rich, and butter-toasted to order.
            </p>
          </div>

          <div className="bg-white border-2 border-[#171717] p-8 shadow-[6px_6px_0px_0px_#171717] space-y-4">
            <div className="w-12 h-12 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24]">
              <Heart className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
              Zero Shortcuts
            </h3>
            <p className="text-xs sm:text-sm font-body text-[#77736E] leading-relaxed">
              We hand-cut our fries from fresh Idaho russets, ferment our pickle chips in-house, and churn real custard milkshakes.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#A82D24] text-white p-10 md:p-14 border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase text-white leading-none">
            Ready to Taste the Difference?
          </h2>
          <p className="text-sm font-body text-white/80 max-w-xl mx-auto">
            Order online now for lightning curbside pickup or fast local delivery.
          </p>
          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-[#E9B949] hover:bg-[#D3A43B] text-[#171717] font-display font-black uppercase text-lg px-8 py-3.5 border-2 border-white transition-colors"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
