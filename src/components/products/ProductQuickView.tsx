import React, { useState } from 'react';
import { Product, SelectedModifier } from '../../types';
import { formatMoney } from '../../lib/utils';
import { useCartStore } from '../../stores/useCartStore';
import { Modal } from '../ui/Modal';
import { QuantitySelector } from '../ui/QuantitySelector';
import { Badge } from '../ui/Badge';
import { Check, AlertCircle } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>(() => {
    const defaults: SelectedModifier[] = [];
    product.modifierGroups?.forEach((group) => {
      const def = group.options.find((opt) => opt.isDefault);
      if (def) {
        defaults.push({
          groupId: group.id,
          groupName: group.name,
          optionId: def.id,
          optionName: def.name,
          price: def.price,
        });
      }
    });
    return defaults;
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [added, setAdded] = useState(false);

  // Toggle modifier option
  const handleModifierToggle = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    price: number,
    maxSelect: number
  ) => {
    setSelectedModifiers((prev) => {
      const existingInGroup = prev.filter((m) => m.groupId === groupId);
      const isSelected = prev.some((m) => m.optionId === optionId);

      if (maxSelect === 1) {
        // Single select replacement
        const withoutGroup = prev.filter((m) => m.groupId !== groupId);
        return [
          ...withoutGroup,
          { groupId, groupName, optionId, optionName, price },
        ];
      }

      // Multi select
      if (isSelected) {
        return prev.filter((m) => m.optionId !== optionId);
      } else {
        if (existingInGroup.length >= maxSelect) {
          return prev;
        }
        return [...prev, { groupId, groupName, optionId, optionName, price }];
      }
    });
  };

  // Calculate dynamic unit price
  const modifiersPrice = selectedModifiers.reduce((acc, m) => acc + m.price, 0);
  const unitPrice = product.price + modifiersPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedModifiers, specialInstructions);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} maxWidth="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Product Media & Details */}
        <div>
          <div className="aspect-[4/3] bg-[#F5F0E6] border-2 border-[#171717] overflow-hidden mb-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm text-[#77736E] font-body leading-relaxed mb-4">
            {product.fullDescription || product.description}
          </p>

          {/* Allergens & Dietary */}
          <div className="space-y-2 pt-3 border-t border-[#E5DFD3]">
            {product.dietary && product.dietary.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-bold text-[#171717] uppercase font-display mr-1">
                  Dietary:
                </span>
                {product.dietary.map((d) => (
                  <Badge key={d} variant="cream" size="sm">
                    {d.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            )}

            {product.allergens && product.allergens.length > 0 && (
              <div className="flex items-start gap-1.5 text-xs text-[#77736E] font-body">
                <AlertCircle className="w-3.5 h-3.5 text-[#A82D24] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Contains:</strong> {product.allergens.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Customization Options & Add to Cart */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6 max-h-[42dvh] sm:max-h-[50vh] overflow-y-auto pr-1">
            {product.modifierGroups && product.modifierGroups.length > 0 ? (
              product.modifierGroups.map((group) => {
                const isSingleSelect = group.maxSelect === 1;
                return (
                  <div key={group.id} className="border-b border-[#E5DFD3] pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display font-extrabold text-lg text-[#171717] uppercase">
                        {group.name}
                      </h4>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#A82D24]">
                        {group.required ? 'Required (Pick 1)' : 'Optional'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {group.options.map((opt) => {
                        const isChecked = selectedModifiers.some((m) => m.optionId === opt.id);
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-center justify-between p-2.5 border transition-colors cursor-pointer min-h-[44px] ${
                              isChecked
                                ? 'bg-[#F5F0E6] border-[#171717]'
                                : 'bg-[#FAF8F3] border-[#E5DFD3] hover:border-[#171717]'
                            }`}
                            onClick={() =>
                              handleModifierToggle(
                                group.id,
                                group.name,
                                opt.id,
                                opt.name,
                                opt.price,
                                group.maxSelect
                              )
                            }
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 border border-[#171717] flex items-center justify-center ${
                                  isChecked ? 'bg-[#A82D24] text-white' : 'bg-white'
                                } ${isSingleSelect ? 'rounded-full' : 'rounded-none'}`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="text-sm font-medium text-[#171717] font-body">
                                {opt.name}
                              </span>
                            </div>
                            <span className="text-xs font-bold font-display text-[#171717]">
                              {opt.price > 0 ? `+${formatMoney(opt.price)}` : 'Free'}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-3 bg-[#F5F0E6] border border-[#E5DFD3] text-xs font-body text-[#77736E]">
                Crafted standard according to chef specification. You may add special requests below.
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-extrabold uppercase font-display text-[#171717] mb-1.5">
                Special Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. sauce on the side, extra crispy edges..."
                rows={2}
                className="w-full p-2.5 bg-white border border-[#E5DFD3] text-xs font-body focus:outline-none focus:border-[#171717]"
              />
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 sm:pt-6 border-t-2 border-[#171717] mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex justify-center sm:justify-start">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-5 sm:px-6 font-display font-black uppercase text-base sm:text-lg tracking-wider flex items-center justify-between border cursor-pointer transition-colors min-h-[44px] ${
                added
                  ? 'bg-[#171717] text-[#E9B949] border-[#171717]'
                  : 'bg-[#A82D24] text-white hover:bg-[#8C231B] border-[#A82D24]'
              }`}
            >
              <span>{added ? 'Added to Order!' : 'Add to Order'}</span>
              <span>{formatMoney(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
