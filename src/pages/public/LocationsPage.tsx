import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { SEED_LOCATIONS } from '../../db/seed-data';

export const LocationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = SEED_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.zipCode.includes(searchTerm)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <section className="bg-[#171717] text-white py-14 border-b-4 border-[#A82D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Store Locator
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display uppercase text-white leading-none">
            Find Your Neighborhood Kitchen
          </h1>
          <p className="text-sm sm:text-base font-body text-[#FAF8F3]/75 max-w-xl mx-auto">
            Three flagships across New York City serving dry-aged smash burgers 7 days a week.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Search */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="w-4 h-4 text-[#77736E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by neighborhood, city, or zip code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-[#171717] text-xs font-body focus:outline-none focus:border-[#A82D24]"
          />
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((loc) => (
            <div
              key={loc.id}
              className="bg-white border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-[#171717] relative border-b-2 border-[#171717]">
                  <img
                    src={loc.imageUrl}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#A82D24] text-white px-2.5 py-1 text-xs font-bold uppercase font-display">
                    Open Daily
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-display font-black text-2xl uppercase text-[#171717]">
                    {loc.name}
                  </h3>

                  <div className="space-y-2.5 text-xs font-body text-[#77736E]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#A82D24] flex-shrink-0 mt-0.5" />
                      <span>{loc.address}, {loc.city}, {loc.state} {loc.zipCode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#A82D24] flex-shrink-0" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#A82D24] flex-shrink-0" />
                      <span>{loc.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.address + ' ' + loc.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-[#171717] hover:bg-[#A82D24] text-white font-display font-extrabold uppercase text-sm tracking-wider text-center border border-[#171717] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
