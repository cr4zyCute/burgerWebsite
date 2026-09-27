import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AlertCircle, Shield, FileText, ArrowLeft } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const PolicyPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const isAllergens = path.includes('allergen');
  const isPrivacy = path.includes('privacy');
  const isTerms = path.includes('terms');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <section className="bg-[#171717] text-white py-12 border-b-4 border-[#A82D24]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Official Disclosures
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-display uppercase text-white leading-none">
            {isAllergens
              ? 'Allergen & Nutritional Disclosure'
              : isPrivacy
              ? 'Privacy & Data Protection Policy'
              : isTerms
              ? 'Terms & Conditions of Service'
              : 'Refund & Cancellation Policy'}
          </h1>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 space-y-8 font-body text-sm leading-relaxed text-[#77736E]">
        <div className="bg-white border-4 border-[#171717] p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6">
          {isAllergens ? (
            <>
              <div className="p-4 bg-[#F5F0E6] border-2 border-[#171717] flex items-start gap-3 text-xs text-[#171717]">
                <AlertCircle className="w-5 h-5 text-[#A82D24] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Kitchen Notice:</strong> While we maintain strict sanitation protocols and dedicated allergen fryers for potatoes, our kitchen handles wheat, dairy, eggs, and tree nuts. Cross-contact is possible.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                  Major Allergens Handled
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Gluten / Wheat:</strong> Present in all artisan brioche buns, beer batter on onion rings, and Nashville flour dredging. Gluten-conscious guests should order the Crisp Lettuce Wrap.</li>
                  <li><strong>Dairy:</strong> Present in Wisconsin Cheddar, Dutch Gouda, Swiss Emmental, brioche butter glaze, and frozen custard shakes.</li>
                  <li><strong>Eggs:</strong> Present in craft smash sauce, comeback sauce, black truffle aioli, and sunny-side eggs.</li>
                  <li><strong>Peanut Oil:</strong> All fries and fried chicken are cooked in 100% refined peanut oil or non-GMO high oleic canola.</li>
                </ul>
              </div>
            </>
          ) : isPrivacy ? (
            <div className="space-y-4 text-xs">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                Your Privacy Matters
              </h3>
              <p>
                Burger Craft respects the privacy of every guest who visits our website or places an online order. We collect order information strictly for order fulfillment, courier delivery routing, and voluntary newsletter communications.
              </p>
              <p>
                We never sell, rent, or trade your personal information. Payment transactions are processed directly by authorized payment gateways using PCI-DSS compliant tokenization.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                Order Terms & Fulfillment Guarantee
              </h3>
              <p>
                All orders are prepared strictly fresh to order. If your food arrives unsatisfactory or temperature compromised, contact our store management within 60 minutes for a prompt replacement or refund.
              </p>
              <p>
                Orders may be cancelled free of charge prior to the kitchen accepting the order ticket into the active searing queue.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-[#E5DFD3]">
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 font-display font-extrabold uppercase text-sm text-[#A82D24] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Menu</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
