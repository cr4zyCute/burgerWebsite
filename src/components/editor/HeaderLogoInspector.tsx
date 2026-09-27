import React, { useState, useRef } from 'react';
import {
  Upload,
  Link as LinkIcon,
  Sparkles,
  Sliders,
  Check,
  RefreshCw,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';
import { useSettingsStore, RestaurantSettings } from '../../stores/useSettingsStore';
import { useMediaStore } from '../../stores/useMediaStore';
import { LOGO_PRESETS } from '../../lib/logoPresets';
import { BrandLogo } from '../common/BrandLogo';

export const HeaderLogoInspector: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { addAsset } = useMediaStore();

  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [savedBadge, setSavedBadge] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and compress image file via HTML5 Canvas
  const processImageFile = (file: File) => {
    setUploadError(null);

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, SVG, WebP, GIF).');
      return;
    }

    setUploadedFileName(file.name);

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateSettings({ logoUrl: result });
        notifySaved();
      };
      reader.onerror = () => setUploadError('Failed to read SVG file.');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 512;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          updateSettings({ logoUrl: e.target?.result as string });
          notifySaved();
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/png', 0.92);
        updateSettings({ logoUrl: compressedDataUrl });

        // Add to media library
        addAsset({
          fileName: file.name,
          url: compressedDataUrl,
          fileSize: Math.round(compressedDataUrl.length * 0.75),
          mimeType: 'image/png',
          altText: `${settings.restaurantName} Brand Logo`,
          category: 'branding',
        });

        notifySaved();
      };
      img.onerror = () => setUploadError('Could not process this image format.');
      img.src = e.target?.result as string;
    };
    reader.onerror = () => setUploadError('Error reading uploaded file.');
    reader.readAsDataURL(file);
  };

  const notifySaved = () => {
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handlePresetSelect = (preset: typeof LOGO_PRESETS[0]) => {
    updateSettings({ logoUrl: preset.dataUrl });
    setUploadedFileName(`${preset.id}.svg`);
    notifySaved();
  };

  const handleRestoreDefault = () => {
    updateSettings({
      logoUrl: '',
      logoDisplayMode: 'mark_and_text',
      logoHeight: 40,
    });
    setUploadedFileName('');
    notifySaved();
  };

  return (
    <div className="p-4 sm:p-5 space-y-5">
      {/* Header */}
      <div className="pb-3 border-b border-[#E5DFD3]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase font-display text-[#A82D24] tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Global Site Header
          </span>
          {savedBadge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-display font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded uppercase">
              <Check className="w-3 h-3" />
              Saved Live
            </span>
          )}
        </div>
        <h3 className="font-display font-black text-xl uppercase text-[#171717] mt-0.5">
          Header &amp; Brand Logo
        </h3>
        <p className="text-xs text-[#77736E] font-body mt-1">
          Upload and configure your brand logo. Updates show immediately in the center canvas and across all customer pages.
        </p>
      </div>

      {uploadError && (
        <div className="p-2.5 bg-red-100 border border-[#A82D24] text-[#A82D24] text-xs font-bold font-display uppercase flex items-center justify-between">
          <span>{uploadError}</span>
          <button type="button" onClick={() => setUploadError(null)} className="underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Live Preview Box */}
      <div className="bg-white border-2 border-[#171717] p-3 shadow-[3px_3px_0px_0px_#171717]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase font-display text-[#77736E]">
            Current Live Logo
          </span>
          {settings.logoUrl && (
            <button
              type="button"
              onClick={handleRestoreDefault}
              className="text-[10px] font-bold uppercase font-display text-[#A82D24] hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
        <div className="h-14 flex items-center px-2 bg-[#FAF8F3] border border-[#E5DFD3] overflow-hidden">
          <BrandLogo variant="navbar" />
        </div>
      </div>

      {/* Upload Methods Tab Bar */}
      <div>
        <div className="flex border-b-2 border-[#171717]">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-2 text-[11px] font-display font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#171717] text-white'
                : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-2 px-2 text-[11px] font-display font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer border-l-2 border-[#171717] ${
              activeTab === 'url'
                ? 'bg-[#171717] text-white'
                : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Image URL</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 px-2 text-[11px] font-display font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer border-l-2 border-[#171717] ${
              activeTab === 'presets'
                ? 'bg-[#171717] text-white'
                : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Presets</span>
          </button>
        </div>

        <div className="p-3.5 bg-white border-2 border-t-0 border-[#171717]">
          {/* Tab 1: Upload File */}
          {activeTab === 'upload' && (
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed p-4 text-center cursor-pointer transition-colors rounded-[2px] ${
                  isDragging
                    ? 'border-[#A82D24] bg-[#FAF8F3]'
                    : 'border-[#CCCCCC] hover:border-[#171717] bg-[#FAF8F3]/50'
                }`}
              >
                <div className="w-9 h-9 mx-auto mb-2 bg-[#171717] text-[#E9B949] flex items-center justify-center rounded-[2px]">
                  <Upload className="w-5 h-5 stroke-[2]" />
                </div>
                <p className="font-display font-bold text-xs uppercase text-[#171717]">
                  Click or drag image file here
                </p>
                <p className="text-[10px] text-[#77736E] font-body mt-0.5">
                  PNG with transparency, SVG, JPG, or WebP
                </p>
                {uploadedFileName && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-mono font-bold">
                    <Check className="w-3 h-3" />
                    <span className="truncate max-w-[180px]">{uploadedFileName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Remote URL */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase font-display text-[#171717]">
                Paste Image Web URL
              </label>
              <div className="flex gap-1.5">
                <input
                  type="url"
                  placeholder="https://..."
                  value={settings.logoUrl || ''}
                  onChange={(e) => {
                    updateSettings({ logoUrl: e.target.value });
                    notifySaved();
                  }}
                  className="flex-1 px-2.5 py-1.5 bg-[#FAF8F3] border border-[#171717] text-xs font-mono focus:outline-none"
                />
                {settings.logoUrl && (
                  <button
                    type="button"
                    onClick={() => updateSettings({ logoUrl: '' })}
                    className="px-2 py-1 bg-[#FAF8F3] border border-[#171717] text-[10px] font-bold uppercase hover:bg-[#A82D24] hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-2">
              <p className="text-[11px] text-[#77736E] font-body">
                Select any artisan restaurant badge to preview instantly:
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {LOGO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-1 border text-center flex flex-col items-center gap-1 transition-all cursor-pointer rounded-[2px] ${
                      settings.logoUrl === preset.dataUrl
                        ? 'border-[#A82D24] bg-[#FAF8F3] ring-2 ring-[#A82D24]'
                        : 'border-[#CCCCCC] hover:border-[#171717] bg-white'
                    }`}
                    title={preset.name}
                  >
                    <img
                      src={preset.dataUrl}
                      alt={preset.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-display font-black text-[9px] uppercase text-[#171717] truncate w-full">
                      {preset.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sizing & Appearance Controls */}
      <div className="bg-[#FAF8F3] border-2 border-[#171717] p-3.5 space-y-3.5">
        <div className="flex items-center gap-1.5 border-b border-[#E5DFD3] pb-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#A82D24]" />
          <h4 className="font-display font-black text-xs uppercase text-[#171717]">
            Layout &amp; Size Controls
          </h4>
        </div>

        {/* Display Mode */}
        <div>
          <label className="block text-[11px] font-bold uppercase font-display text-[#171717] mb-1">
            Display Mode
          </label>
          <select
            value={settings.logoDisplayMode || 'mark_and_text'}
            onChange={(e) => {
              updateSettings({ logoDisplayMode: e.target.value as any });
              notifySaved();
            }}
            className="w-full px-2.5 py-1.5 bg-white border border-[#171717] text-xs font-display font-bold uppercase cursor-pointer"
          >
            <option value="mark_and_text">Logo Mark + Restaurant Name (Standard)</option>
            <option value="badge_icon">Framed Dark Badge + Text</option>
            <option value="logo_only">Full Standalone Logo Image Only</option>
          </select>
        </div>

        {/* Height Slider */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-bold uppercase font-display text-[#171717]">
              Logo Size / Height
            </label>
            <span className="text-[11px] font-mono font-bold text-[#A82D24]">
              {settings.logoHeight || 40}px
            </span>
          </div>
          <input
            type="range"
            min="28"
            max="72"
            step="2"
            value={settings.logoHeight || 40}
            onChange={(e) => {
              updateSettings({ logoHeight: Number(e.target.value) });
              notifySaved();
            }}
            className="w-full accent-[#A82D24] cursor-pointer"
          />
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="block text-[11px] font-bold uppercase font-display text-[#171717] mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            value={settings.restaurantName || ''}
            onChange={(e) => {
              updateSettings({ restaurantName: e.target.value });
              notifySaved();
            }}
            className="w-full px-2.5 py-1.5 bg-white border border-[#171717] text-xs font-display font-bold uppercase focus:outline-none"
          />
        </div>

        {/* Subtext */}
        <div>
          <label className="block text-[11px] font-bold uppercase font-display text-[#171717] mb-1">
            Subtext / Established Year
          </label>
          <input
            type="text"
            value={settings.logoSubtext ?? 'Est. 2018 · NYC'}
            onChange={(e) => {
              updateSettings({ logoSubtext: e.target.value });
              notifySaved();
            }}
            placeholder="e.g. Est. 2018 · NYC"
            className="w-full px-2.5 py-1.5 bg-white border border-[#171717] text-xs font-display font-bold uppercase focus:outline-none"
          />
        </div>
      </div>

      <div className="p-2.5 bg-green-50 border border-green-200 text-green-800 text-[11px] font-body flex items-center gap-1.5">
        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
        <span>Changes save live automatically to your store and customer navigation.</span>
      </div>
    </div>
  );
};
