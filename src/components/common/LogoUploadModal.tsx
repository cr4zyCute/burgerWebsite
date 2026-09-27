import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Trash2, Check, Sparkles, RefreshCw, X, Sliders } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useSettingsStore, RestaurantSettings } from '../../stores/useSettingsStore';
import { useMediaStore } from '../../stores/useMediaStore';
import { LOGO_PRESETS } from '../../lib/logoPresets';
import { BrandLogo } from './BrandLogo';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { addAsset } = useMediaStore();

  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || '');
  const [logoDisplayMode, setLogoDisplayMode] = useState<RestaurantSettings['logoDisplayMode']>(
    settings.logoDisplayMode || 'mark_and_text'
  );
  const [logoHeight, setLogoHeight] = useState<number>(settings.logoHeight || 40);
  const [restaurantName, setRestaurantName] = useState(settings.restaurantName || 'Burger Craft');
  const [logoSubtext, setLogoSubtext] = useState(settings.logoSubtext ?? 'Est. 2018 · NYC');

  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and compress image using HTML5 Canvas to keep base64 fast and lightweight
  const processImageFile = (file: File) => {
    setUploadError(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, SVG, WebP, GIF).');
      return;
    }

    setFileName(file.name);

    // If SVG, read as text/data url directly to preserve crisp vectors
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoUrl(result);
      };
      reader.onerror = () => setUploadError('Failed to read SVG file.');
      reader.readAsDataURL(file);
      return;
    }

    // For raster images (PNG, JPG, WebP), read and compress if needed
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
          setLogoUrl(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use PNG to preserve transparency
        const compressedDataUrl = canvas.toDataURL('image/png', 0.92);
        setLogoUrl(compressedDataUrl);
      };
      img.onerror = () => setUploadError('Could not process this image format.');
      img.src = e.target?.result as string;
    };
    reader.onerror = () => setUploadError('Error reading uploaded file.');
    reader.readAsDataURL(file);
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings({
      logoUrl,
      logoDisplayMode,
      logoHeight,
      restaurantName,
      logoSubtext,
    });

    // If new custom logo uploaded, also register in Media Library
    if (logoUrl && logoUrl !== settings.logoUrl) {
      addAsset({
        fileName: fileName || `${restaurantName.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
        url: logoUrl,
        fileSize: Math.round(logoUrl.length * 0.75),
        mimeType: logoUrl.startsWith('data:image/svg') ? 'image/svg+xml' : 'image/png',
        altText: `${restaurantName} Official Restaurant Logo`,
        category: 'branding',
      });
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleResetToDefault = () => {
    setLogoUrl('');
    setLogoDisplayMode('mark_and_text');
    setLogoHeight(40);
    setFileName('');
  };

  // Live preview state object
  const previewData: Partial<RestaurantSettings> = {
    logoUrl,
    logoDisplayMode,
    logoHeight,
    restaurantName,
    logoSubtext,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload & Customize Website Logo"
      maxWidth="2xl"
    >
      <form onSubmit={handleSave} className="space-y-6">
        {/* Success message */}
        {saveSuccess && (
          <div className="p-3 bg-green-100 border-2 border-green-600 text-green-900 text-xs font-bold font-display uppercase flex items-center gap-2">
            <Check className="w-4 h-4 text-green-700" />
            <span>Logo successfully updated and saved across the website!</span>
          </div>
        )}

        {/* Error message */}
        {uploadError && (
          <div className="p-3 bg-red-100 border-2 border-[#A82D24] text-[#A82D24] text-xs font-bold font-display uppercase flex items-center justify-between">
            <span>{uploadError}</span>
            <button
              type="button"
              onClick={() => setUploadError(null)}
              className="text-xs font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Live Interactive Previews (Light Navbar & Dark Footer) */}
        <div className="border-2 border-[#171717] bg-[#FAF8F3] p-4 shadow-[3px_3px_0px_0px_#171717]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase font-display tracking-wider text-[#171717] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A82D24]" />
              Live Real-Time Logo Preview
            </span>
            <span className="text-[10px] font-mono text-[#77736E] uppercase">
              Updates in real-time
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Light Navbar Preview */}
            <div className="border border-[#E5DFD3] bg-[#FAF8F3] p-4 rounded-[2px]">
              <span className="block text-[10px] font-bold uppercase font-display text-[#77736E] mb-2">
                Header / Navbar View (Light)
              </span>
              <div className="h-16 flex items-center px-2 bg-[#FAF8F3] border-b border-[#171717]/10 overflow-hidden">
                <BrandLogo variant="navbar" previewSettings={previewData} />
              </div>
            </div>

            {/* Dark Footer Preview */}
            <div className="border border-[#333333] bg-[#171717] p-4 rounded-[2px]">
              <span className="block text-[10px] font-bold uppercase font-display text-[#FAF8F3]/60 mb-2">
                Footer & Admin View (Dark)
              </span>
              <div className="h-16 flex items-center px-2 bg-[#171717] border-b border-[#333333] overflow-hidden">
                <BrandLogo variant="footer" previewSettings={previewData} theme="dark" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector: Upload File vs Image URL vs Presets */}
        <div>
          <div className="flex border-b-2 border-[#171717]">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2.5 px-3 text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image File</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2.5 px-3 text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-l-2 border-[#171717] ${
                activeTab === 'url'
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image URL</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-2.5 px-3 text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-l-2 border-[#171717] ${
                activeTab === 'presets'
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Presets</span>
            </button>
          </div>

          <div className="p-4 bg-white border-2 border-t-0 border-[#171717]">
            {/* Tab 1: File Upload */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
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
                  className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors rounded-[2px] ${
                    isDragging
                      ? 'border-[#A82D24] bg-[#FAF8F3]'
                      : 'border-[#CCCCCC] hover:border-[#171717] bg-[#FAF8F3]/50'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-[#171717] text-[#E9B949] flex items-center justify-center rounded-[2px]">
                    <Upload className="w-6 h-6 stroke-[2]" />
                  </div>
                  <p className="font-display font-bold text-sm uppercase text-[#171717]">
                    Click to browse or drag and drop your logo file
                  </p>
                  <p className="text-xs text-[#77736E] font-body mt-1">
                    Supports high-resolution PNG (transparent recommended), SVG vector, JPG, or WebP
                  </p>
                  {fileName && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 border border-green-300 text-green-800 text-xs font-mono font-bold">
                      <Check className="w-3 h-3" />
                      <span>Loaded: {fileName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Remote URL */}
            {activeTab === 'url' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase font-display text-[#171717]">
                  Logo Image Web URL (CDN / Cloudinary / S3 / Direct Image Link)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/assets/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#A82D24]"
                  />
                  {logoUrl && (
                    <button
                      type="button"
                      onClick={() => setLogoUrl('')}
                      className="px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-bold uppercase hover:bg-[#A82D24] hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-[#77736E] font-body">
                  Paste any public HTTPS image link. Transparent PNG or SVG formats look best!
                </p>
              </div>
            )}

            {/* Tab 3: Curated Presets */}
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <p className="text-xs font-body text-[#77736E]">
                  Choose from any of our designer crafted artisan restaurant badges for 1-click preview:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {LOGO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setLogoUrl(preset.dataUrl);
                        setFileName(`${preset.id}.svg`);
                      }}
                      className={`p-2.5 border-2 text-left flex flex-col items-center gap-2 transition-all cursor-pointer rounded-[2px] ${
                        logoUrl === preset.dataUrl
                          ? 'border-[#A82D24] bg-[#FAF8F3] shadow-[2px_2px_0px_0px_#A82D24]'
                          : 'border-[#CCCCCC] hover:border-[#171717] bg-white'
                      }`}
                    >
                      <img
                        src={preset.dataUrl}
                        alt={preset.name}
                        className="w-12 h-12 object-contain"
                      />
                      <span className="font-display font-black text-[11px] uppercase text-center text-[#171717] line-clamp-1">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Display Settings & Controls */}
        <div className="bg-[#FAF8F3] border-2 border-[#171717] p-4 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E5DFD3] pb-2">
            <Sliders className="w-4 h-4 text-[#A82D24]" />
            <h4 className="font-display font-black text-sm uppercase text-[#171717]">
              Logo Appearance & Brand Styling
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Display Mode */}
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1.5">
                Display Layout Mode
              </label>
              <select
                value={logoDisplayMode}
                onChange={(e) => setLogoDisplayMode(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase cursor-pointer"
              >
                <option value="mark_and_text">Logo Mark + Restaurant Name (Standard)</option>
                <option value="badge_icon">Framed Dark Badge + Text</option>
                <option value="logo_only">Full Standalone Logo Image Only</option>
              </select>
            </div>

            {/* Height Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase font-display text-[#171717]">
                  Logo Size / Height
                </label>
                <span className="text-xs font-mono font-bold text-[#A82D24]">
                  {logoHeight}px
                </span>
              </div>
              <input
                type="range"
                min="28"
                max="72"
                step="2"
                value={logoHeight}
                onChange={(e) => setLogoHeight(Number(e.target.value))}
                className="w-full accent-[#A82D24] cursor-pointer"
              />
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Restaurant Title
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase focus:outline-none"
              />
            </div>

            {/* Subtext */}
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Subtext / Established Year
              </label>
              <input
                type="text"
                value={logoSubtext}
                onChange={(e) => setLogoSubtext(e.target.value)}
                placeholder="e.g. Est. 2018 · NYC"
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t-2 border-[#171717] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3 py-2 border border-[#171717] hover:bg-[#F5F0E6] text-xs font-display font-bold uppercase flex items-center gap-1.5 text-[#77736E] hover:text-[#171717] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restore Default Icon Logo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#171717] text-xs font-display font-bold uppercase hover:bg-[#F5F0E6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#A82D24] hover:bg-[#8C231B] text-white text-xs font-display font-black uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_#171717] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply &amp; Save Logo</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
