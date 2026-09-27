import React, { useState, useRef } from 'react';
import {
  Save,
  Check,
  RefreshCw,
  Upload,
  Sparkles,
  Link as LinkIcon,
  Sliders,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useSettingsStore, RestaurantSettings } from '../../stores/useSettingsStore';
import { useMediaStore } from '../../stores/useMediaStore';
import { LOGO_PRESETS } from '../../lib/logoPresets';
import { BrandLogo } from '../../components/common/BrandLogo';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { addAsset } = useMediaStore();

  const [form, setForm] = useState<RestaurantSettings>({ ...settings });
  const [saved, setSaved] = useState(false);
  const [logoTab, setLogoTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
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
        setForm((prev) => ({ ...prev, logoUrl: result }));
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
          setForm((prev) => ({ ...prev, logoUrl: e.target?.result as string }));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/png', 0.92);
        setForm((prev) => ({ ...prev, logoUrl: compressedDataUrl }));
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
    updateSettings(form);

    // Register in Media Library if new logo
    if (form.logoUrl && form.logoUrl !== settings.logoUrl) {
      addAsset({
        fileName: uploadedFileName || `${form.restaurantName.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
        url: form.logoUrl,
        fileSize: Math.round(form.logoUrl.length * 0.75),
        mimeType: form.logoUrl.startsWith('data:image/svg') ? 'image/svg+xml' : 'image/png',
        altText: `${form.restaurantName} Official Brand Logo`,
        category: 'branding',
      });
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetToDefaults = () => {
    resetSettings();
    setTimeout(() => {
      const refreshed = useSettingsStore.getState().settings;
      setForm({ ...refreshed });
    }, 50);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Restaurant Brand & Store Configuration"
        subtitle="Manage restaurant identity, official logo upload, operating hours, delivery fees, and live announcement banner."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-4xl mx-auto w-full">
        {saved && (
          <div className="p-3 bg-green-100 border-2 border-green-600 text-green-900 text-xs font-bold font-display uppercase flex items-center gap-2">
            <Check className="w-4 h-4 text-green-700" />
            <span>Restaurant branding and logo settings successfully saved!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border-4 border-[#171717] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717] space-y-8">
          {/* SECTION 1: Brand Identity & Logo Configuration */}
          <div className="space-y-5">
            <div className="border-b-2 border-[#171717] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#A82D24]" />
                  <span>Brand Logo &amp; Visual Identity</span>
                </h3>
                <p className="text-xs text-[#77736E] font-body">
                  Upload your custom restaurant logo, adjust sizing, or select from curated designer marks. Changes reflect everywhere across the website.
                </p>
              </div>
            </div>

            {uploadError && (
              <div className="p-3 bg-red-100 border border-[#A82D24] text-[#A82D24] text-xs font-bold font-display uppercase flex items-center justify-between">
                <span>{uploadError}</span>
                <button type="button" onClick={() => setUploadError(null)} className="underline">
                  Dismiss
                </button>
              </div>
            )}

            {/* Live Interactive Previews (Light Navbar & Dark Footer/Admin) */}
            <div className="border-2 border-[#171717] bg-[#FAF8F3] p-4 shadow-[3px_3px_0px_0px_#171717]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase font-display tracking-wider text-[#171717]">
                  Real-Time Live Logo Preview
                </span>
                <span className="text-[10px] font-mono text-[#77736E] uppercase">
                  Light Header &amp; Dark Footer views
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Light Navbar View */}
                <div className="border border-[#E5DFD3] bg-[#FAF8F3] p-3 rounded-[2px]">
                  <span className="block text-[10px] font-bold uppercase font-display text-[#77736E] mb-1.5">
                    Customer Navbar (Light)
                  </span>
                  <div className="h-16 flex items-center px-3 bg-[#FAF8F3] border-b border-[#171717]/10 overflow-hidden">
                    <BrandLogo variant="navbar" previewSettings={form} />
                  </div>
                </div>

                {/* Dark Footer View */}
                <div className="border border-[#333333] bg-[#171717] p-3 rounded-[2px]">
                  <span className="block text-[10px] font-bold uppercase font-display text-[#FAF8F3]/60 mb-1.5">
                    Footer &amp; Admin Console (Dark)
                  </span>
                  <div className="h-16 flex items-center px-3 bg-[#171717] border-b border-[#333333] overflow-hidden">
                    <BrandLogo variant="footer" previewSettings={form} theme="dark" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs for Upload Method */}
            <div>
              <div className="flex border-b-2 border-[#171717]">
                <button
                  type="button"
                  onClick={() => setLogoTab('upload')}
                  className={`flex-1 py-2.5 px-3 text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    logoTab === 'upload'
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLogoTab('url')}
                  className={`flex-1 py-2.5 px-3 text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-l-2 border-[#171717] ${
                    logoTab === 'url'
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Image URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLogoTab('presets')}
                  className={`flex-1 py-2.5 px-3 text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-l-2 border-[#171717] ${
                    logoTab === 'presets'
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#F5F0E6] text-[#171717] hover:bg-[#EAE4D7]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sample Presets</span>
                </button>
              </div>

              <div className="p-4 bg-white border-2 border-t-0 border-[#171717]">
                {/* 1. File Upload */}
                {logoTab === 'upload' && (
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
                      <div className="w-12 h-12 mx-auto mb-2 bg-[#171717] text-[#E9B949] flex items-center justify-center rounded-[2px]">
                        <Upload className="w-6 h-6 stroke-[2]" />
                      </div>
                      <p className="font-display font-bold text-sm uppercase text-[#171717]">
                        Click to browse or drag and drop your logo file
                      </p>
                      <p className="text-xs text-[#77736E] font-body mt-1">
                        PNG (with transparent background recommended), SVG vector, JPG, or WebP
                      </p>
                      {uploadedFileName && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 border border-green-300 text-green-800 text-xs font-mono font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Uploaded: {uploadedFileName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Remote URL */}
                {logoTab === 'url' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase font-display text-[#171717]">
                      Logo Image Web URL (CDN / Cloudinary / S3 / Direct Image Link)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/assets/logo.png"
                        value={form.logoUrl || ''}
                        onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                        className="flex-1 px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-mono focus:outline-none"
                      />
                      {form.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, logoUrl: '' })}
                          className="px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-bold uppercase hover:bg-[#A82D24] hover:text-white transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Sample Presets */}
                {logoTab === 'presets' && (
                  <div className="space-y-3">
                    <p className="text-xs font-body text-[#77736E]">
                      Select any of our pre-designed artisanal burger badges for 1-click test:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {LOGO_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            setForm({ ...form, logoUrl: preset.dataUrl });
                            setUploadedFileName(`${preset.id}.svg`);
                          }}
                          className={`p-2.5 border-2 text-left flex flex-col items-center gap-2 transition-all cursor-pointer rounded-[2px] ${
                            form.logoUrl === preset.dataUrl
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

            {/* Logo Appearance Options */}
            <div className="bg-[#FAF8F3] border-2 border-[#171717] p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#A82D24]" />
                  <h4 className="font-display font-black text-sm uppercase text-[#171717]">
                    Layout &amp; Size Controls
                  </h4>
                </div>
                {form.logoUrl && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, logoUrl: '', logoHeight: 40, logoDisplayMode: 'mark_and_text' })}
                    className="text-[11px] font-bold uppercase font-display text-[#A82D24] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Restore Default Icon Logo</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                    Display Layout Style
                  </label>
                  <select
                    value={form.logoDisplayMode || 'mark_and_text'}
                    onChange={(e) => setForm({ ...form, logoDisplayMode: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase cursor-pointer"
                  >
                    <option value="mark_and_text">Logo Mark + Restaurant Name (Standard)</option>
                    <option value="badge_icon">Framed Dark Badge + Text</option>
                    <option value="logo_only">Full Standalone Logo Image Only</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase font-display text-[#171717]">
                      Logo Height in Navbar
                    </label>
                    <span className="text-xs font-mono font-bold text-[#A82D24]">
                      {form.logoHeight || 40}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="28"
                    max="72"
                    step="2"
                    value={form.logoHeight || 40}
                    onChange={(e) => setForm({ ...form, logoHeight: Number(e.target.value) })}
                    className="w-full accent-[#A82D24] cursor-pointer mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: General Information */}
          <div className="space-y-4">
            <div className="border-b border-[#E5DFD3] pb-3">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-1">
                General Store Information
              </h3>
              <p className="text-xs text-[#77736E] font-body">
                These details appear across the website navbar, footer, contact pages, and customer receipts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Restaurant Brand Name
                </label>
                <input
                  type="text"
                  value={form.restaurantName}
                  onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Logo Subtext / Established Line
                </label>
                <input
                  type="text"
                  value={form.logoSubtext ?? 'Est. 2018 · NYC'}
                  onChange={(e) => setForm({ ...form, logoSubtext: e.target.value })}
                  placeholder="e.g. Est. 2018 · NYC"
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Store Phone
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Flagship Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Store Business Hours
                </label>
                <input
                  type="text"
                  value={form.businessHours}
                  onChange={(e) => setForm({ ...form, businessHours: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Fulfillment & Tax Economics */}
          <div className="space-y-4">
            <div className="border-b border-[#E5DFD3] pb-3">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-1">
                Fulfillment &amp; Tax Economics
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.taxRate}
                  onChange={(e) => setForm({ ...form, taxRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Standard Delivery Fee ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(form.deliveryFee / 100).toFixed(2)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deliveryFee: Math.round(parseFloat(e.target.value || '0') * 100),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Free Delivery Above ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(form.freeDeliveryThreshold / 100).toFixed(2)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      freeDeliveryThreshold: Math.round(parseFloat(e.target.value || '0') * 100),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Top Announcement Banner */}
          <div className="space-y-4">
            <div className="border-b border-[#E5DFD3] pb-3">
              <h3 className="font-display font-black text-2xl uppercase text-[#171717] mb-1">
                Top Announcement Banner
              </h3>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.announcementActive}
                  onChange={(e) => setForm({ ...form, announcementActive: e.target.checked })}
                  className="accent-[#A82D24]"
                />
                <span className="font-bold text-[#171717]">Show Announcement Bar across website</span>
              </label>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Announcement Text
                </label>
                <input
                  type="text"
                  value={form.announcementText}
                  onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-display uppercase font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t-2 border-[#171717] flex justify-end gap-3">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="px-4 py-2 bg-transparent border border-[#171717] text-xs font-display font-bold uppercase hover:bg-[#F5F0E6] transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#A82D24] hover:bg-[#8C231B] text-white text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#171717] transition-transform active:translate-y-0.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Restaurant Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
