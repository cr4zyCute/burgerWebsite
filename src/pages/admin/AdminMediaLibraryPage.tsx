import React, { useState } from 'react';
import { Upload, Search, Trash2, Copy, Check, Image as ImageIcon } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useMediaStore } from '../../stores/useMediaStore';
import { Modal } from '../../components/ui/Modal';

export const AdminMediaLibraryPage: React.FC = () => {
  const { assets, addAsset, deleteAsset, searchAssets } = useMediaStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Upload form
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [mediaCat, setMediaCat] = useState<'products' | 'restaurant' | 'hero' | 'ingredients'>('products');

  const filteredAssets = searchAssets(search, category);

  const handleCopy = (id: string, assetUrl: string) => {
    navigator.clipboard.writeText(assetUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDelete = (id: string) => {
    const res = deleteAsset(id);
    if (!res.success) {
      setErrorMsg(res.message);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileName && url) {
      addAsset({
        fileName,
        url,
        fileSize: 1024 * 800,
        mimeType: 'image/jpeg',
        altText: altText || fileName,
        category: mediaCat,
      });
      setIsUploadOpen(false);
      setFileName('');
      setUrl('');
      setAltText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Restaurant Media & Photography Library"
        subtitle="Manage authentic food photographs, hero assets, and restaurant photography with usage safeguards."
        actionButton={
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2 bg-[#A82D24] hover:bg-[#8C231B] text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#A82D24] transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Media</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        {errorMsg && (
          <div className="p-3 bg-[#A82D24] text-white text-xs font-bold font-display uppercase flex items-center justify-between">
            <span>{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white border-2 border-[#171717] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#77736E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets by file name or alt text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase cursor-pointer"
            >
              <option value="all">All Categories ({assets.length})</option>
              <option value="hero">Hero Media</option>
              <option value="products">Product Food Photos</option>
              <option value="restaurant">Restaurant Atmosphere</option>
              <option value="ingredients">Ingredients</option>
            </select>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[4/3] bg-[#F5F0E6] relative border-b-2 border-[#171717] overflow-hidden">
                <img
                  src={asset.url}
                  alt={asset.altText}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#171717] text-white text-[10px] font-bold uppercase font-display px-2 py-0.5">
                  {asset.category}
                </span>
                {asset.usageCount > 0 && (
                  <span className="absolute bottom-2 right-2 bg-[#E9B949] text-[#171717] text-[10px] font-bold uppercase font-display px-1.5 py-0.5 border border-[#171717]">
                    Used in {asset.usageCount} place(s)
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="font-bold text-xs text-[#171717] truncate font-mono">
                  {asset.fileName}
                </div>
                <div className="text-[11px] text-[#77736E] line-clamp-1">
                  Alt: "{asset.altText}"
                </div>

                <div className="pt-2 border-t border-[#E5DFD3] flex items-center justify-between">
                  <button
                    onClick={() => handleCopy(asset.id, asset.url)}
                    className="flex items-center gap-1 text-[11px] font-bold uppercase font-display text-[#171717] hover:text-[#A82D24] cursor-pointer"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-1 text-[#77736E] hover:text-[#A82D24] cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <Modal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          title="Add Asset to Media Library"
          maxWidth="md"
        >
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                File / Asset Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. bourbon-bacon-burger.jpg"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-body focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Image Source URL (Object Storage / CDN) *
              </label>
              <input
                type="text"
                required
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Descriptive Alt Text (For Accessibility & SEO) *
              </label>
              <input
                type="text"
                required
                placeholder="Describe food contents, sauce, and background..."
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-body focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Category
              </label>
              <select
                value={mediaCat}
                onChange={(e) => setMediaCat(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase cursor-pointer"
              >
                <option value="products">Product Food Photo</option>
                <option value="hero">Hero Media</option>
                <option value="restaurant">Restaurant Atmosphere</option>
                <option value="ingredients">Raw Ingredients</option>
              </select>
            </div>

            <div className="pt-4 border-t border-[#171717] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 border border-[#171717] text-xs font-display font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#A82D24] text-white text-xs font-display font-black uppercase tracking-wider"
              >
                Add Asset
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
