import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, AlertCircle, Check, ShieldCheck, Flame } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { Badge } from '../../components/ui/Badge';
import { ProductCard } from '../../components/products/ProductCard';
import { useProductStore } from '../../stores/useProductStore';
import { useCartStore } from '../../stores/useCartStore';
import { formatMoney } from '../../lib/utils';
import { SelectedModifier } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, getProductBySlug } = useProductStore();
  const { addItem } = useCartStore();

  const product = getProductBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState<string>(product?.imageUrl || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [added, setAdded] = useState(false);

  // Scroll to top and reset product options whenever route slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (product) {
      setSelectedImage(product.imageUrl);
      setQuantity(1);
      setSelectedModifiers([]);
      setSpecialInstructions('');
    }
  }, [slug, product?.id]);

  // If not found, show 404 block
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
        <AnnouncementBar />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-4xl font-black font-display uppercase mb-4">
            Product Not Found
          </h2>
          <p className="text-sm font-body text-[#77736E] mb-6">
            The burger or side you are looking for is no longer available.
          </p>
          <Link
            to="/menu"
            className="px-6 py-3 bg-[#A82D24] text-white font-display font-extrabold uppercase text-sm tracking-wider"
          >
            Back to Menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Modifier toggle
  const handleModifierToggle = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    price: number,
    maxSelect: number
  ) => {
    setSelectedModifiers((prev) => {
      const isSelected = prev.some((m) => m.optionId === optionId);
      if (maxSelect === 1) {
        const withoutGroup = prev.filter((m) => m.groupId !== groupId);
        return [...withoutGroup, { groupId, groupName, optionId, optionName, price }];
      }
      if (isSelected) {
        return prev.filter((m) => m.optionId !== optionId);
      } else {
        return [...prev, { groupId, groupName, optionId, optionName, price }];
      }
    });
  };

  const modifiersTotal = selectedModifiers.reduce((acc, m) => acc + m.price, 0);
  const unitPrice = product.price + modifiersTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedModifiers, specialInstructions);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb row */}
      <div className="bg-[#F5F0E6] border-b border-[#E5DFD3] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#77736E]">
          <div className="flex items-center gap-2">
            <Link to="/menu" className="hover:text-[#A82D24] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Menu</span>
            </Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-[#171717]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Media Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#F5F0E6] border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] overflow-hidden aspect-[4/3]">
              <img
                src={selectedImage || product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 border-2 overflow-hidden bg-[#F5F0E6] cursor-pointer flex-shrink-0 ${
                      (selectedImage || product.imageUrl) === img
                        ? 'border-[#A82D24] ring-2 ring-[#A82D24]'
                        : 'border-[#171717]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Preparation & Sourcing Guarantee */}
            <div className="bg-white border-2 border-[#171717] p-6 space-y-3 mt-8">
              <h4 className="font-display font-black text-lg uppercase text-[#171717] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#A82D24]" />
                <span>The Burger Craft Kitchen Guarantee</span>
              </h4>
              <p className="text-xs text-[#77736E] font-body leading-relaxed">
                Every burger is ground fresh every morning using our custom triple blend of 28-day dry-aged beef. Smashed crispy onto seasoned 450° cast-iron griddles and delivered hot in insulated craft packaging.
              </p>
            </div>
          </div>

          {/* Right Product Details & Customizer Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isBestSeller && <Badge variant="mustard">Best Seller</Badge>}
                {product.dietary?.map((d) => (
                  <Badge key={d} variant="cream">
                    {d}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#171717] leading-none mb-3">
                {product.name}
              </h1>

              {/* Reviews & Star Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#E9B949]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold font-display text-[#171717]">
                  {product.rating} ({product.reviewCount} customer reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display font-black text-4xl text-[#171717]">
                  {formatMoney(unitPrice)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#77736E] line-through font-bold">
                    {formatMoney(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm font-body text-[#77736E] leading-relaxed">
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Ingredients & Allergens Box */}
            <div className="p-4 bg-[#F5F0E6] border border-[#E5DFD3] space-y-2">
              <div className="text-xs font-body text-[#171717]">
                <strong className="uppercase font-display text-sm block mb-1">
                  Ingredients
                </strong>
                {product.ingredients.join(', ')}
              </div>
              {product.allergens && product.allergens.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#A82D24] font-bold font-body pt-2 border-t border-[#E5DFD3]">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Allergens: {product.allergens.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Modifier Groups Customization */}
            {product.modifierGroups && product.modifierGroups.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E5DFD3]">
                {product.modifierGroups.map((group) => (
                  <div key={group.id} className="border border-[#171717] bg-white p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display font-extrabold uppercase text-base text-[#171717]">
                        {group.name}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#A82D24]">
                        {group.required ? 'Required' : 'Optional'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {group.options.map((opt) => {
                        const isSelected = selectedModifiers.some((m) => m.optionId === opt.id);
                        return (
                          <div
                            key={opt.id}
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
                            className={`flex items-center justify-between p-2.5 border transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#F5F0E6] border-[#171717]'
                                : 'bg-white border-[#E5DFD3] hover:border-[#171717]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 border border-[#171717] flex items-center justify-center ${
                                  isSelected ? 'bg-[#A82D24] text-white' : 'bg-white'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="text-xs font-medium font-body text-[#171717]">
                                {opt.name}
                              </span>
                            </div>
                            <span className="text-xs font-bold font-display text-[#171717]">
                              {opt.price > 0 ? `+${formatMoney(opt.price)}` : 'Free'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-extrabold uppercase font-display text-[#171717] mb-1">
                Special Kitchen Notes
              </label>
              <input
                type="text"
                placeholder="e.g. sauce on the side, extra crispy fries..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#171717] font-body focus:outline-none"
              />
            </div>

            {/* Quantity and Add to Cart Button */}
            <div className="pt-4 border-t-2 border-[#171717] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex justify-center sm:justify-start">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 sm:py-4 px-5 sm:px-6 font-display font-black uppercase text-lg sm:text-xl tracking-wider flex items-center justify-between border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] transition-all cursor-pointer min-h-[48px] touch-target ${
                  added
                    ? 'bg-[#171717] text-[#E9B949]'
                    : 'bg-[#A82D24] hover:bg-[#8C231B] text-white'
                }`}
              >
                <span>{added ? 'Added to Cart!' : 'Add to Order'}</span>
                <span>{formatMoney(totalPrice)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t-2 border-[#171717]">
            <h3 className="text-3xl font-black font-display uppercase tracking-tight text-[#171717] mb-6">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
