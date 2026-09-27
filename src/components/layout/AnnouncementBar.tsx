import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useSettingsStore } from '../../stores/useSettingsStore';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useSettingsStore();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !settings.announcementActive || !settings.announcementText) {
    return null;
  }

  return (
    <div className="bg-[#A82D24] text-white py-2 px-4 text-center text-xs md:text-sm font-extrabold uppercase font-display tracking-wider border-b border-[#8C231B] relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap relative pr-8">
        <Sparkles className="w-3.5 h-3.5 text-[#E9B949]" />
        <span>{settings.announcementText}</span>
        {settings.announcementLink && (
          <Link
            to={settings.announcementLink}
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-[#E9B949] transition-colors ml-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
