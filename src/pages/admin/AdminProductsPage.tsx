import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Star, Utensils } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useProductStore } from '../../stores/useProductStore';
import { formatMoney } from '../../lib/utils';
import { Product, ProductCategory } from '../../types';
import { Modal } from '../../components/ui/Modal';

export const AdminProductsPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    toggleFeatured,
  } = useProductStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('burgers');
  const [priceInDollars, setPriceInDollars] = useState('14.50');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('burgers');
    setPriceInDollars('14.50');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85');
    setIsAvailable(true);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPriceInDollars((p.price / 100).toFixed(2));
    setDescription(p.description);
    setImageUrl(p.imageUrl);
    setIsAvailable(p.isAvailable);
    setIsFeatured(p.isFeatured);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceCents = Math.round(parseFloat(priceInDollars) * 100);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        category,
        price: priceCents,
        description,
        imageUrl,
        isAvailable,
        isFeatured,
      });
    } else {
      addProduct({
        name,
        slug,
        category,
        price: priceCents,
        description,
        fullDescription: description,
        imageUrl,
        galleryImages: [imageUrl],
        ingredients: ['Fresh Ingredients'],
        allergens: [],
        dietary: ['chef-choice'],
        isAvailable,
        isFeatured,
        isBestSeller: false,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Product Catalog & Menu Items"
        subtitle="Manage smash burgers, chicken sandwiches, sides, pricing, and live 86'd status."
        actionButton={
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#A82D24] hover:bg-[#8C231B] text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#A82D24] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        <div className="bg-white border-4 border-[#171717] shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="bg-[#171717] text-white uppercase font-display font-bold text-sm tracking-wider">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Sales</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Available</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F3]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt=""
                          className="w-12 h-12 object-cover border border-[#171717] bg-[#F5F0E6] flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-sm text-[#171717] font-display uppercase">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[#77736E] max-w-xs truncate">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 uppercase font-display font-bold text-xs">
                      {p.category}
                    </td>
                    <td className="py-3 px-4 font-bold font-display text-base text-[#171717]">
                      {formatMoney(p.price)}
                    </td>
                    <td className="py-3 px-4 text-[#77736E] font-mono">{p.salesCount}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleFeatured(p.id)}
                        className={`p-1.5 border transition-colors cursor-pointer ${
                          p.isFeatured
                            ? 'bg-[#E9B949] text-[#171717] border-[#171717]'
                            : 'bg-white text-gray-400 border-gray-300'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleAvailability(p.id)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase font-display border cursor-pointer ${
                          p.isAvailable
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-red-100 text-red-800 border-red-300'
                        }`}
                      >
                        {p.isAvailable ? 'In Stock' : '86’d / Sold Out'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 hover:bg-[#F5F0E6] text-[#171717] transition-colors cursor-pointer"
                          title="Edit Item"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 hover:bg-[#A82D24] hover:text-white text-[#171717] transition-colors cursor-pointer"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct ? `Edit ${editingProduct.name}` : 'Add New Menu Item'}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-body focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase cursor-pointer"
                >
                  <option value="burgers">Smash Burgers</option>
                  <option value="chicken">Crispy Chicken</option>
                  <option value="sides">Hand-Cut Sides</option>
                  <option value="combos">Feast Combos</option>
                  <option value="drinks">Custard Shakes</option>
                  <option value="desserts">Bakery Sweets</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Price ($ USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={priceInDollars}
                  onChange={(e) => setPriceInDollars(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Description *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#171717] text-xs font-body focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-[#E5DFD3]">
              <label className="flex items-center gap-2 text-xs font-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="accent-[#A82D24]"
                />
                <span>Available (In Stock)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-[#A82D24]"
                />
                <span>Featured on Homepage</span>
              </label>
            </div>

            <div className="pt-4 border-t border-[#171717] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-[#171717] text-xs font-display font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#A82D24] text-white text-xs font-display font-black uppercase tracking-wider"
              >
                Save Product
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
