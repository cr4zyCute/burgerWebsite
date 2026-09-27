import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Sliders, Sparkles, ShoppingBag } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { useCartStore } from '../../stores/useCartStore';
import { formatMoney } from '../../lib/utils';
import { Product } from '../../types';

interface BurgerOption {
  id: string;
  name: string;
  price: number; // in cents
  calories?: number;
  description?: string;
  image?: string;
}

export const BuildYourBurgerPage: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  // Customizer selections
  const [selectedBase, setSelectedBase] = useState<BurgerOption>({
    id: 'base-double',
    name: 'Double Smash Patty (Classic)',
    price: 1350,
    calories: 620,
    description: 'Two 100% Angus patties pressed hard on 450° cast iron for crispy lace edges.',
  });

  const [selectedPattyStyle, setSelectedPattyStyle] = useState<BurgerOption>({
    id: 'patty-lace',
    name: 'Cast-Iron Crisp Lace Sear',
    price: 0,
    description: 'Smashed ultra-thin with crispy caramelized edges.',
  });

  const [selectedBun, setSelectedBun] = useState<BurgerOption>({
    id: 'bun-brioche',
    name: 'Butter Toasted Artisan Brioche',
    price: 0,
    calories: 180,
    description: 'Sweet European butter dough, golden toasted.',
  });

  const [selectedCheese, setSelectedCheese] = useState<BurgerOption>({
    id: 'cheese-cheddar',
    name: 'Aged Wisconsin Sharp Cheddar',
    price: 0,
    calories: 110,
  });

  const [selectedVeggies, setSelectedVeggies] = useState<BurgerOption[]>([
    { id: 'veg-onions', name: 'Caramelized Onion Jam', price: 0 },
    { id: 'veg-pickles', name: 'House Dill Pickle Chips', price: 0 },
  ]);

  const [selectedSauces, setSelectedSauces] = useState<BurgerOption[]>([
    { id: 'sauce-smash', name: 'Signature Craft Smash Sauce', price: 0 },
  ]);

  const [selectedExtras, setSelectedExtras] = useState<BurgerOption[]>([]);
  const [burgerName, setBurgerName] = useState('My Custom Masterpiece');

  // Option lists
  const bases: BurgerOption[] = [
    {
      id: 'base-single',
      name: 'Single Smash Patty',
      price: 1050,
      calories: 380,
      description: 'One 4oz 28-day dry-aged Angus patty.',
    },
    {
      id: 'base-double',
      name: 'Double Smash Patty',
      price: 1350,
      calories: 620,
      description: 'Two 4oz Angus patties. Chef recommended.',
    },
    {
      id: 'base-triple',
      name: 'Triple Smash Patty',
      price: 1650,
      calories: 890,
      description: 'Three 4oz patties for serious burger cravings.',
    },
    {
      id: 'base-veggie',
      name: 'Beyond Plant-Based Patty',
      price: 1350,
      calories: 450,
      description: '100% plant-based protein grilled separately.',
    },
  ];

  const pattyStyles: BurgerOption[] = [
    { id: 'patty-lace', name: 'Cast-Iron Crisp Lace Sear', price: 0, description: 'Classic smash technique with crunchy caramelized perimeter.' },
    { id: 'patty-thick', name: 'Thick Seared Medium Juicy', price: 0, description: 'Gently pressed to keep rich juices locked inside.' },
    { id: 'patty-peppercorn', name: 'Cracked Black Peppercorn Crust', price: 75, description: 'Coated in toasted Madagascar peppercorns.' },
  ];

  const buns: BurgerOption[] = [
    { id: 'bun-brioche', name: 'Butter Toasted Artisan Brioche', price: 0, description: 'Rich, pillowy, baked daily with sweet butter.' },
    { id: 'bun-potato', name: 'Martin’s Famous Potato Bun', price: 0, description: 'Soft, classic East Coast diner favorite.' },
    { id: 'bun-pretzel', name: 'Warm Bavarian Pretzel Bun', price: 125, description: 'Dense, chewy, salted Bavarian style bun.' },
    { id: 'bun-lettuce', name: 'Gluten-Conscious Crisp Lettuce Wrap', price: 0, description: 'Fresh green leaf lettuce wrapping.' },
  ];

  const cheeses: BurgerOption[] = [
    { id: 'cheese-cheddar', name: 'Aged Wisconsin Sharp Cheddar', price: 0 },
    { id: 'cheese-american', name: 'Classic Melting American Cheddar', price: 0 },
    { id: 'cheese-swiss', name: 'Cave-Aged Swiss Emmental', price: 100 },
    { id: 'cheese-gouda', name: 'Smoked Dutch Gouda', price: 100 },
    { id: 'cheese-none', name: 'No Cheese', price: 0 },
  ];

  const veggies: BurgerOption[] = [
    { id: 'veg-lettuce', name: 'Crisp Iceberg Lettuce', price: 0 },
    { id: 'veg-tomato', name: 'Vine-Ripened Tomato Slices', price: 0 },
    { id: 'veg-onions', name: 'Slow Caramelized Onions', price: 0 },
    { id: 'veg-raw-onions', name: 'Shaved Red Onions', price: 0 },
    { id: 'veg-pickles', name: 'Garlic Dill Pickle Chips', price: 0 },
    { id: 'veg-jalapenos', name: 'Fire-Roasted Jalapeños', price: 50 },
    { id: 'veg-arugula', name: 'Wild Baby Arugula', price: 75 },
  ];

  const sauces: BurgerOption[] = [
    { id: 'sauce-smash', name: 'Signature Craft Smash Sauce', price: 0 },
    { id: 'sauce-bbq', name: 'Bourbon Blackstrap BBQ Glaze', price: 0 },
    { id: 'sauce-comeback', name: 'Nashville Spicy Comeback Sauce', price: 0 },
    { id: 'sauce-truffle', name: 'Black Truffle Garlic Aioli', price: 125 },
    { id: 'sauce-chipotle', name: 'Smoky Chipotle Crema', price: 0 },
  ];

  const extras: BurgerOption[] = [
    { id: 'extra-bacon', name: 'Thick Cut Applewood Smoked Bacon', price: 250 },
    { id: 'extra-egg', name: 'Crispy Sunny-Side Farm Egg', price: 175 },
    { id: 'extra-mushrooms', name: 'Sautéed Thyme Wild Mushrooms', price: 195 },
    { id: 'extra-frizzled', name: 'Beer-Battered Frizzled Shallots', price: 125 },
  ];

  const toggleMultiSelect = (
    list: BurgerOption[],
    setList: React.Dispatch<React.SetStateAction<BurgerOption[]>>,
    option: BurgerOption
  ) => {
    setList((prev) => {
      const exists = prev.some((o) => o.id === option.id);
      if (exists) {
        return prev.filter((o) => o.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  // Running price calculation
  const runningPrice =
    selectedBase.price +
    selectedPattyStyle.price +
    selectedBun.price +
    selectedCheese.price +
    selectedVeggies.reduce((a, b) => a + b.price, 0) +
    selectedSauces.reduce((a, b) => a + b.price, 0) +
    selectedExtras.reduce((a, b) => a + b.price, 0);

  const handleFinishAndAddToCart = () => {
    // Construct custom product object
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: burgerName || 'Custom Craft Burger',
      slug: `custom-${Date.now()}`,
      category: 'burgers',
      price: runningPrice,
      description: `${selectedBase.name} on ${selectedBun.name} with ${selectedCheese.name}, ${selectedVeggies.map((v) => v.name).join(', ')}, and ${selectedSauces.map((s) => s.name).join(', ')}.`,
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85',
      galleryImages: [],
      ingredients: [selectedBase.name, selectedBun.name, selectedCheese.name],
      allergens: ['Dairy', 'Gluten'],
      dietary: ['chef-choice'],
      isAvailable: true,
      isFeatured: false,
      isBestSeller: false,
      salesCount: 1,
      rating: 5.0,
      reviewCount: 1,
    };

    addItem(customProduct, 1);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      {/* Header */}
      <section className="bg-[#171717] text-white py-10 border-b-4 border-[#A82D24]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Interactive Customizer
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-display uppercase text-white leading-none">
            Build Your Own Smash Burger
          </h1>
          <p className="text-xs sm:text-sm font-body text-[#FAF8F3]/75">
            Step-by-step custom grill crafting with live price calculation.
          </p>
        </div>
      </section>

      {/* Step Tracker */}
      <div className="bg-[#F5F0E6] border-b-2 border-[#171717] py-2 sm:py-3 sticky top-20 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between overflow-x-auto gap-2 -mx-4 sm:mx-auto scrollbar-none">
          {[
            '1. Base',
            '2. Sear',
            '3. Bun',
            '4. Cheese',
            '5. Veggies',
            '6. Sauces',
            '7. Extras',
            '8. Review',
          ].map((label, idx) => {
            const stepNum = idx + 1;
            const isCurrent = currentStep === stepNum;
            const isDone = currentStep > stepNum;
            return (
              <button
                key={label}
                onClick={() => setCurrentStep(stepNum)}
                className={`flex items-center gap-1 text-xs font-bold uppercase font-display px-3 py-2 whitespace-nowrap cursor-pointer transition-colors min-h-[44px] touch-target ${
                  isCurrent
                    ? 'bg-[#A82D24] text-white'
                    : isDone
                    ? 'text-[#171717] hover:bg-[#E5DFD3]'
                    : 'text-[#77736E]'
                }`}
              >
                {isDone && <Check className="w-3.5 h-3.5 text-[#E9B949]" />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace */}
      <main className="max-w-5xl mx-auto px-4 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Area (8 cols) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#171717] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* STEP 1: BASE */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                  Step 1: Choose Your Burger Base & Patty Count
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {bases.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBase(b)}
                      className={`p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedBase.id === b.id
                          ? 'bg-[#F5F0E6] border-[#A82D24] shadow-[2px_2px_0px_0px_#171717]'
                          : 'border-[#E5DFD3] hover:border-[#171717]'
                      }`}
                    >
                      <div>
                        <h4 className="font-display font-black text-lg uppercase text-[#171717]">
                          {b.name}
                        </h4>
                        <p className="text-xs text-[#77736E] font-body mt-0.5">
                          {b.description}
                        </p>
                      </div>
                      <span className="font-display font-black text-xl text-[#171717]">
                        {formatMoney(b.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SEAR STYLE */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                  Step 2: Choose Patty Sear Style
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {pattyStyles.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedPattyStyle(s)}
                      className={`p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedPattyStyle.id === s.id
                          ? 'bg-[#F5F0E6] border-[#A82D24] shadow-[2px_2px_0px_0px_#171717]'
                          : 'border-[#E5DFD3] hover:border-[#171717]'
                      }`}
                    >
                      <div>
                        <h4 className="font-display font-black text-lg uppercase text-[#171717]">
                          {s.name}
                        </h4>
                        <p className="text-xs text-[#77736E] font-body mt-0.5">
                          {s.description}
                        </p>
                      </div>
                      <span className="font-display font-black text-base text-[#171717]">
                        {s.price > 0 ? `+${formatMoney(s.price)}` : 'Included'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: BUN */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                  Step 3: Choose Artisan Bun
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {buns.map((bun) => (
                    <div
                      key={bun.id}
                      onClick={() => setSelectedBun(bun)}
                      className={`p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedBun.id === bun.id
                          ? 'bg-[#F5F0E6] border-[#A82D24] shadow-[2px_2px_0px_0px_#171717]'
                          : 'border-[#E5DFD3] hover:border-[#171717]'
                      }`}
                    >
                      <div>
                        <h4 className="font-display font-black text-lg uppercase text-[#171717]">
                          {bun.name}
                        </h4>
                        <p className="text-xs text-[#77736E] font-body mt-0.5">
                          {bun.description}
                        </p>
                      </div>
                      <span className="font-display font-black text-base text-[#171717]">
                        {bun.price > 0 ? `+${formatMoney(bun.price)}` : 'Included'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: CHEESE */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                  Step 4: Choose Aged Cheese Melt
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {cheeses.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCheese(c)}
                      className={`p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedCheese.id === c.id
                          ? 'bg-[#F5F0E6] border-[#A82D24] shadow-[2px_2px_0px_0px_#171717]'
                          : 'border-[#E5DFD3] hover:border-[#171717]'
                      }`}
                    >
                      <h4 className="font-display font-black text-lg uppercase text-[#171717]">
                        {c.name}
                      </h4>
                      <span className="font-display font-black text-base text-[#171717]">
                        {c.price > 0 ? `+${formatMoney(c.price)}` : 'Included'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: VEGETABLES */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                    Step 5: Pick Crisp Vegetables & Toppings
                  </h3>
                  <span className="text-xs font-bold text-[#77736E] uppercase font-display">
                    Multi-Select
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {veggies.map((v) => {
                    const isSelected = selectedVeggies.some((item) => item.id === v.id);
                    return (
                      <div
                        key={v.id}
                        onClick={() => toggleMultiSelect(veggies, setSelectedVeggies, v)}
                        className={`p-3 border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#F5F0E6] border-[#A82D24]'
                            : 'border-[#E5DFD3] hover:border-[#171717]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 border border-[#171717] flex items-center justify-center ${
                              isSelected ? 'bg-[#A82D24] text-white' : 'bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold font-body text-[#171717]">
                            {v.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold font-display">
                          {v.price > 0 ? `+${formatMoney(v.price)}` : 'Free'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: SAUCES */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                    Step 6: Choose Chef Sauces
                  </h3>
                  <span className="text-xs font-bold text-[#77736E] uppercase font-display">
                    Multi-Select
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sauces.map((s) => {
                    const isSelected = selectedSauces.some((item) => item.id === s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleMultiSelect(sauces, setSelectedSauces, s)}
                        className={`p-3 border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#F5F0E6] border-[#A82D24]'
                            : 'border-[#E5DFD3] hover:border-[#171717]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 border border-[#171717] flex items-center justify-center ${
                              isSelected ? 'bg-[#A82D24] text-white' : 'bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold font-body text-[#171717]">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold font-display">
                          {s.price > 0 ? `+${formatMoney(s.price)}` : 'Free'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 7: EXTRAS */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                    Step 7: Add Optional Gourmet Extras
                  </h3>
                  <span className="text-xs font-bold text-[#77736E] uppercase font-display">
                    Optional
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {extras.map((ex) => {
                    const isSelected = selectedExtras.some((item) => item.id === ex.id);
                    return (
                      <div
                        key={ex.id}
                        onClick={() => toggleMultiSelect(extras, setSelectedExtras, ex)}
                        className={`p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#F5F0E6] border-[#A82D24]'
                            : 'border-[#E5DFD3] hover:border-[#171717]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 border border-[#171717] flex items-center justify-center ${
                              isSelected ? 'bg-[#A82D24] text-white' : 'bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <span className="font-display font-bold text-base uppercase text-[#171717]">
                            {ex.name}
                          </span>
                        </div>
                        <span className="font-display font-black text-lg text-[#171717]">
                          +{formatMoney(ex.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 8: REVIEW */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-black text-3xl uppercase text-[#171717] mb-2">
                    Review Your Custom Creation
                  </h3>
                  <p className="text-xs text-[#77736E] font-body">
                    Review all selected layers before sending ticket to our flat-top grill.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                    Name Your Burger
                  </label>
                  <input
                    type="text"
                    value={burgerName}
                    onChange={(e) => setBurgerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F3] border-2 border-[#171717] font-display font-black text-xl uppercase focus:outline-none focus:border-[#A82D24]"
                  />
                </div>

                <div className="space-y-2 text-sm font-body border-t border-b border-[#E5DFD3] py-4">
                  <div className="flex justify-between">
                    <span>Base:</span>
                    <strong>{selectedBase.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sear Style:</span>
                    <strong>{selectedPattyStyle.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Bun:</span>
                    <strong>{selectedBun.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cheese:</span>
                    <strong>{selectedCheese.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Veggies:</span>
                    <strong>
                      {selectedVeggies.length > 0
                        ? selectedVeggies.map((v) => v.name).join(', ')
                        : 'None'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sauces:</span>
                    <strong>
                      {selectedSauces.length > 0
                        ? selectedSauces.map((s) => s.name).join(', ')
                        : 'None'}
                    </strong>
                  </div>
                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between text-[#A82D24]">
                      <span>Extras:</span>
                      <strong>{selectedExtras.map((e) => e.name).join(', ')}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-6 border-t-2 border-[#171717] flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              {currentStep > 1 ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="px-5 py-2.5 bg-transparent border border-[#171717] hover:bg-[#F5F0E6] text-[#171717] font-display font-extrabold uppercase text-sm tracking-wider flex items-center gap-1.5 cursor-pointer min-h-[44px] touch-target"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </motion.button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="px-6 py-2.5 bg-[#171717] hover:bg-[#A82D24] text-white font-display font-extrabold uppercase text-sm tracking-wider flex items-center gap-1.5 border border-[#171717] cursor-pointer transition-colors min-h-[44px] touch-target"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleFinishAndAddToCart}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-base sm:text-lg tracking-wider flex items-center justify-center gap-2 border border-[#A82D24] shadow-[4px_4px_0px_0px_#171717] cursor-pointer min-h-[48px] touch-target"
                >
                  <ShoppingBag className="w-5 h-5 text-[#E9B949]" />
                  <span>Add to Order ({formatMoney(runningPrice)})</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Running Summary Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#F5F0E6] border-2 border-[#171717] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#171717] sm:shadow-[6px_6px_0px_0px_#171717] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
              <span className="font-display font-black text-xl uppercase text-[#171717]">
                Live Grill Running Total
              </span>
              <Sparkles className="w-4 h-4 text-[#A82D24]" />
            </div>

            <motion.div
              key={runningPrice}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-black font-display text-[#171717]"
            >
              {formatMoney(runningPrice)}
            </motion.div>

            <div className="space-y-2 text-xs font-body text-[#77736E] pt-2">
              <div className="flex justify-between">
                <span>{selectedBase.name}</span>
                <span>{formatMoney(selectedBase.price)}</span>
              </div>
              {selectedBun.price > 0 && (
                <div className="flex justify-between">
                  <span>{selectedBun.name}</span>
                  <span>+{formatMoney(selectedBun.price)}</span>
                </div>
              )}
              {selectedCheese.price > 0 && (
                <div className="flex justify-between">
                  <span>{selectedCheese.name}</span>
                  <span>+{formatMoney(selectedCheese.price)}</span>
                </div>
              )}
              {selectedExtras.map((e) => (
                <div key={e.id} className="flex justify-between text-[#A82D24]">
                  <span>{e.name}</span>
                  <span>+{formatMoney(e.price)}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white border border-[#E5DFD3] text-[11px] text-[#77736E] leading-relaxed">
              Every custom burger includes our signature grill seasoning and high-heat cast iron sear.
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Phone Quick Bar (Thumb-reachable total & Next button) */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-[#171717] text-white p-3 border-t-2 border-[#A82D24] shadow-2xl flex items-center justify-between gap-3 pb-safe">
        <div>
          <span className="text-[10px] uppercase font-display text-[#E9B949] block">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="font-display font-black text-xl text-white">
            {formatMoney(runningPrice)}
          </span>
        </div>
        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s + 1)}
            className="px-5 py-2.5 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-xs tracking-wider flex items-center gap-1.5 border border-[#A82D24] min-h-[44px]"
          >
            <span>Next ({currentStep + 1}/8)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinishAndAddToCart}
            className="px-5 py-2.5 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-xs tracking-wider flex items-center gap-1.5 border border-[#A82D24] min-h-[44px]"
          >
            <ShoppingBag className="w-4 h-4 text-[#E9B949]" />
            <span>Add to Order</span>
          </button>
        )}
      </div>

      <Footer />
      <CartDrawer />
    </div>
  );
};
