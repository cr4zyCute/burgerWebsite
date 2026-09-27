import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { useSettingsStore, RestaurantSettings } from '../../stores/useSettingsStore';
import { cn } from '../../lib/utils';

export interface BrandLogoProps {
  variant?: 'navbar' | 'footer' | 'admin-sidebar' | 'receipt' | 'preview';
  previewSettings?: Partial<RestaurantSettings>;
  className?: string;
  theme?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  previewSettings,
  className,
  theme,
}) => {
  const storeSettings = useSettingsStore((state) => state.settings);
  const settings = previewSettings ? { ...storeSettings, ...previewSettings } : storeSettings;

  const [imageError, setImageError] = useState(false);

  // Reset error when logoUrl changes
  React.useEffect(() => {
    setImageError(false);
  }, [settings.logoUrl]);

  const hasCustomLogo = Boolean(settings.logoUrl && !imageError);
  const displayMode = settings.logoDisplayMode || 'mark_and_text';
  const logoHeight = settings.logoHeight || 40;
  const restaurantName = settings.restaurantName || 'Burger Craft';
  const logoSubtext = settings.logoSubtext ?? 'Est. 2018 · NYC';

  // Effective theme based on variant or explicit prop
  const isDark = theme === 'dark' || variant === 'footer' || variant === 'admin-sidebar';

  // 1. Receipt variant
  if (variant === 'receipt') {
    return (
      <div className={cn('flex flex-col items-center gap-1.5 text-center', className)}>
        {hasCustomLogo && (
          <img
            src={settings.logoUrl}
            alt={restaurantName}
            onError={() => setImageError(true)}
            className="h-10 w-auto object-contain max-w-[140px] mb-1"
          />
        )}
        <span className="font-display font-black text-xl tracking-tight uppercase leading-none">
          {restaurantName}
        </span>
        {logoSubtext && (
          <span className="font-mono text-[10px] tracking-wider text-black/70 uppercase">
            {logoSubtext}
          </span>
        )}
      </div>
    );
  }

  // 2. Admin Sidebar variant
  if (variant === 'admin-sidebar') {
    return (
      <div className={cn('flex items-center gap-2.5', className)}>
        {hasCustomLogo ? (
          <div className="w-8 h-8 rounded-[2px] overflow-hidden bg-white/10 flex items-center justify-center border border-[#333333] flex-shrink-0">
            <img
              src={settings.logoUrl}
              alt={restaurantName}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-[#A82D24] text-white flex items-center justify-center font-bold flex-shrink-0">
            <UtensilsCrossed className="w-4 h-4 stroke-[2.5]" />
          </div>
        )}
        <div className="min-w-0">
          <span className="font-display font-black text-base tracking-tight uppercase text-white block leading-none truncate">
            {restaurantName}
          </span>
          <span className="font-display text-[9px] font-bold text-[#E9B949] uppercase tracking-widest block leading-none mt-1">
            Admin Console
          </span>
        </div>
      </div>
    );
  }

  // 3. Footer variant
  if (variant === 'footer') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        {displayMode === 'logo_only' && hasCustomLogo ? (
          <img
            src={settings.logoUrl}
            alt={restaurantName}
            onError={() => setImageError(true)}
            style={{ maxHeight: Math.min(logoHeight + 8, 56) }}
            className="w-auto object-contain max-w-[200px]"
          />
        ) : (
          <>
            {hasCustomLogo ? (
              <div className="w-10 h-10 bg-white/10 text-white flex items-center justify-center border border-white/20 flex-shrink-0 overflow-hidden rounded-[2px]">
                <img
                  src={settings.logoUrl}
                  alt={restaurantName}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-[#A82D24] text-white flex items-center justify-center border border-[#A82D24] flex-shrink-0">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tight uppercase text-white leading-none">
                {restaurantName}
              </span>
              {logoSubtext && (
                <span className="font-display text-[10px] font-bold tracking-[0.2em] text-[#E9B949] uppercase leading-none mt-1">
                  {logoSubtext}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  // 4. Logo Only display mode (for Navbar or Preview)
  if (displayMode === 'logo_only' && hasCustomLogo) {
    return (
      <div className={cn('flex items-center', className)}>
        <img
          src={settings.logoUrl}
          alt={restaurantName}
          onError={() => setImageError(true)}
          style={{ height: `${logoHeight}px` }}
          className="w-auto object-contain max-w-[240px] transition-transform duration-200 group-hover:scale-105"
        />
      </div>
    );
  }

  // 5. Default Navbar & Preview (Mark + Text or Badge + Text)
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {hasCustomLogo ? (
        displayMode === 'badge_icon' ? (
          <div
            style={{ width: `${logoHeight}px`, height: `${logoHeight}px` }}
            className={cn(
              'flex items-center justify-center border-2 overflow-hidden flex-shrink-0 transition-colors duration-200 rounded-[2px]',
              isDark
                ? 'bg-[#222222] border-[#333333]'
                : 'bg-[#171717] border-[#171717] group-hover:border-[#A82D24]'
            )}
          >
            <img
              src={settings.logoUrl}
              alt={restaurantName}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain p-1"
            />
          </div>
        ) : (
          <img
            src={settings.logoUrl}
            alt={restaurantName}
            onError={() => setImageError(true)}
            style={{ height: `${logoHeight}px`, maxWidth: `${logoHeight * 2}px` }}
            className="w-auto object-contain flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
          />
        )
      ) : (
        <div
          style={{ width: `${Math.max(36, logoHeight)}px`, height: `${Math.max(36, logoHeight)}px` }}
          className={cn(
            'flex items-center justify-center border-2 transition-colors duration-200 flex-shrink-0',
            isDark
              ? 'bg-[#A82D24] text-white border-[#A82D24]'
              : 'bg-[#171717] text-[#E9B949] border-[#171717] group-hover:bg-[#A82D24] group-hover:text-white group-hover:border-[#A82D24]'
          )}
        >
          <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
        </div>
      )}

      <div className="flex flex-col">
        <span
          className={cn(
            'font-display font-black text-2xl tracking-tighter uppercase leading-none transition-colors',
            isDark ? 'text-white' : 'text-[#171717] group-hover:text-[#A82D24]'
          )}
        >
          {restaurantName}
        </span>
        {logoSubtext && (
          <span
            className={cn(
              'font-display text-[10px] font-bold tracking-[0.25em] uppercase leading-none mt-1',
              isDark ? 'text-[#E9B949]' : 'text-[#A82D24]'
            )}
          >
            {logoSubtext}
          </span>
        )}
      </div>
    </div>
  );
};
