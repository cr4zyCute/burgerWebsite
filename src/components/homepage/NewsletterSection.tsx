import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { CmsSection } from '../../types';

interface NewsletterSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heading = section.content?.heading || 'JOIN THE CRAFT BURGER CLUB';
  const description =
    section.content?.description ||
    'Receive secret off-menu specials, exclusive launch invites, and $5 off your next order.';
  const buttonText = section.content?.buttonText || 'Subscribe Now';
  const disclaimer =
    section.content?.disclaimer ||
    'We respect your inbox. Unsubscribe anytime with 1 click.';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#171717] text-white border-b-2 border-[#171717]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#A82D24] text-white border border-white mx-auto">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight leading-none text-white">
          {heading}
        </h2>

        <p className="text-base font-body text-[#FAF8F3]/80 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        {isSubmitted ? (
          <div className="max-w-md mx-auto p-4 bg-[#A82D24] border-2 border-white flex items-center justify-center gap-3">
            <Check className="w-5 h-5 text-[#E9B949]" />
            <span className="font-display font-bold text-lg uppercase">
              Welcome to the club! Check your email for your $5 coupon.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#262626] border-2 border-[#444444] text-white text-sm focus:outline-none focus:border-[#E9B949] font-body"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#E9B949] hover:bg-[#D3A43B] text-[#171717] font-display font-black uppercase text-base tracking-wider transition-colors border-2 border-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-xs text-[#FAF8F3]/50 font-body pt-2">{disclaimer}</p>
      </div>
    </section>
  );
};
