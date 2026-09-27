import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { CmsSection } from '../../types';
import { SEED_LOCATIONS } from '../../db/seed-data';
import { SectionHeading } from '../ui/SectionHeading';

interface LocationsSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const tagline = section.content?.tagline || 'VISIT US';
  const heading = section.content?.heading || 'THREE CONVENIENT LOCATIONS';
  const description =
    section.content?.description ||
    'Dine-in with retro vinyl hospitality, or order ahead for rapid curbside pickup.';

  return (
    <section className="py-20 bg-[#F5F0E6] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => isEditable && onSelectElement?.('heading')}
          className={
            isEditable && selectedField === 'heading'
              ? 'outline-2 outline-dashed outline-[#A82D24] p-2'
              : ''
          }
        >
          <SectionHeading tagline={tagline} heading={heading} description={description} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEED_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="bg-[#FFFFFF] border-2 border-[#171717] overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_0px_#171717]"
            >
              <div>
                <div className="aspect-[16/10] bg-[#171717] relative border-b-2 border-[#171717]">
                  <img
                    src={loc.imageUrl}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#A82D24] text-white px-2.5 py-1 text-xs font-bold uppercase font-display">
                    Curbside Pickup
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#171717]">
                    {loc.name}
                  </h3>

                  <div className="space-y-2 text-xs font-body text-[#77736E]">
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
                <Link
                  to={`/menu?branch=${encodeURIComponent(loc.name)}`}
                  className="flex-1 py-2.5 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-extrabold uppercase text-sm tracking-wider text-center border border-[#A82D24] transition-colors"
                >
                  Order Here
                </Link>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.address + ' ' + loc.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-[#F5F0E6] hover:bg-[#171717] hover:text-white text-[#171717] border border-[#171717] transition-colors"
                  aria-label="Get Directions"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
