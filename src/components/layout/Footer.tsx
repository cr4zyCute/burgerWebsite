import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Mail, Phone, MapPin, Check } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../ui/SocialIcons';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const { settings } = useSettingsStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#171717] text-[#FAF8F3] border-t-4 border-[#A82D24] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="mb-5">
              <Link to="/" className="inline-block group">
                <BrandLogo variant="footer" />
              </Link>
            </div>
            <p className="text-sm text-[#FAF8F3]/75 font-body leading-relaxed mb-6">
              {settings.tagline}. High-temperature seared on seasoned cast iron, served on freshly baked brioche buns with authentic heritage ingredients.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={settings.instagramHandle ? `https://instagram.com/${settings.instagramHandle.replace('@', '')}` : '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#262626] hover:bg-[#A82D24] text-white flex items-center justify-center transition-colors border border-[#333333]"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#262626] hover:bg-[#A82D24] text-white flex items-center justify-center transition-colors border border-[#333333]"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.twitterUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#262626] hover:bg-[#A82D24] text-white flex items-center justify-center transition-colors border border-[#333333]"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Orders */}
          <div>
            <h4 className="font-display font-black text-lg tracking-wider uppercase text-[#E9B949] mb-5">
              Explore Menu
            </h4>
            <ul className="space-y-2.5 font-body text-sm text-[#FAF8F3]/80">
              <li>
                <Link to="/menu" className="hover:text-[#E9B949] transition-colors">
                  Signature Smash Burgers
                </Link>
              </li>
              <li>
                <Link to="/build-your-burger" className="hover:text-[#E9B949] transition-colors">
                  Custom Burger Builder
                </Link>
              </li>
              <li>
                <Link to="/menu?category=sides" className="hover:text-[#E9B949] transition-colors">
                  Hand-Cut Fries & Truffle Sides
                </Link>
              </li>
              <li>
                <Link to="/menu?category=drinks" className="hover:text-[#E9B949] transition-colors">
                  Vanilla Custard Shakes
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-[#E9B949] transition-colors">
                  Deals & Combos
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#E9B949] font-bold hover:underline">
                  Restaurant Staff & CMS Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact */}
          <div>
            <h4 className="font-display font-black text-lg tracking-wider uppercase text-[#E9B949] mb-5">
              Hours & Locations
            </h4>
            <div className="space-y-3.5 text-sm text-[#FAF8F3]/80 font-body">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A82D24] mt-0.5 flex-shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A82D24] flex-shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A82D24] flex-shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="pt-2 border-t border-[#333333]">
                <span className="block font-bold text-white font-display uppercase text-base">
                  Operating Hours
                </span>
                <span className="text-xs text-[#FAF8F3]/70">{settings.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-display font-black text-lg tracking-wider uppercase text-[#E9B949] mb-5">
              The Craft Club
            </h4>
            <p className="text-sm text-[#FAF8F3]/75 font-body mb-4 leading-relaxed">
              Subscribe for secret chef specials, VIP tasting invites, and $5 off your next order.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#A82D24] text-white text-xs font-bold font-display uppercase flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E9B949]" />
                <span>You're in! Check your inbox for $5 off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#222222] border border-[#444444] text-white text-sm focus:outline-none focus:border-[#E9B949]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-sm tracking-wider transition-colors cursor-pointer"
                >
                  Join Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Allergens */}
        <div className="pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F3]/60 font-body">
          <div>
            © {new Date().getFullYear()} {settings.restaurantName}. All rights reserved. Made fresh to order.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/allergens" className="hover:text-white transition-colors">
              Allergen Info
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refunds" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
