import React, { useState } from 'react';
import { Plus, Tag, Trash2, Check, X, Calendar } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { usePromotionsStore } from '../../stores/usePromotionsStore';
import { formatMoney } from '../../lib/utils';
import { Modal } from '../../components/ui/Modal';

export const AdminPromotionsPage: React.FC = () => {
  const { promotions, addPromotion, toggleActive, deletePromotion } = usePromotionsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New promo form state
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [minOrder, setMinOrder] = useState('25.00');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (code && title) {
      addPromotion({
        code: code.trim().toUpperCase(),
        title,
        description,
        discountType,
        discountValue:
          discountType === 'percentage'
            ? parseInt(discountValue)
            : Math.round(parseFloat(discountValue) * 100),
        minOrderAmount: Math.round(parseFloat(minOrder) * 100),
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2026-12-31',
        usageLimit: 1000,
        isActive: true,
      });
      setIsModalOpen(false);
      setCode('');
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Promotions & Coupon Codes"
        subtitle="Configure discount percentages, minimum cart thresholds, and homepage promotional campaigns."
        actionButton={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#A82D24] hover:bg-[#8C231B] text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#A82D24] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promo Code</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        <div className="bg-white border-4 border-[#171717] shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="bg-[#171717] text-white uppercase font-display font-bold text-sm tracking-wider">
                  <th className="py-3 px-4">Coupon Code</th>
                  <th className="py-3 px-4">Campaign Title</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Min Order</th>
                  <th className="py-3 px-4">Times Redeemed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {promotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-[#FAF8F3]">
                    <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#A82D24]">
                      {promo.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#171717]">{promo.title}</div>
                      <div className="text-[11px] text-[#77736E] max-w-xs truncate">
                        {promo.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold font-display text-sm">
                      {promo.discountType === 'percentage'
                        ? `${promo.discountValue}% OFF`
                        : `${formatMoney(promo.discountValue)} OFF`}
                    </td>
                    <td className="py-3.5 px-4">{formatMoney(promo.minOrderAmount)}</td>
                    <td className="py-3.5 px-4 font-mono">{promo.timesUsed} uses</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleActive(promo.id)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase font-display border cursor-pointer ${
                          promo.isActive
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-gray-100 text-gray-500 border-gray-300'
                        }`}
                      >
                        {promo.isActive ? 'Active' : 'Paused'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => deletePromotion(promo.id)}
                        className="p-1.5 hover:bg-[#A82D24] hover:text-white text-[#77736E] transition-colors cursor-pointer"
                        title="Delete Promotion"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Promo Code"
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Coupon Code * (e.g. SUMMER15)
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-mono uppercase font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Campaign Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-body focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Discount Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Discount Value *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Minimum Order Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#171717] text-xs font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-white border border-[#171717] text-xs font-body focus:outline-none"
              />
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
                Create Promo
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
