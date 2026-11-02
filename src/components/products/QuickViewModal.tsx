import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types';
import { JewelleryVisual } from '../common/JewelleryVisual';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, ShoppingBag, Heart, ArrowRight, Check } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  navigate: (route: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  navigate,
}) => {
  const { calculateProductPrice, formatPrice, addToCart, isInWishlist, toggleWishlist } = useApp();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const currentPrice = calculateProductPrice(product, selectedVariant);
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedVariant, selectedVariant?.size, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  const handleFullDetails = () => {
    onClose();
    navigate(`/products/${product.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-md shadow-2xl overflow-hidden border border-[#E7E2D9] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-[#FAF7F0] text-[#283447] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Left Column */}
          <div className="bg-[#FAF7F0] p-6 flex flex-col items-center justify-center border-r border-[#E7E2D9]">
            <JewelleryVisual
              type={product.featuredImageVisualType}
              aspectRatio="1:1"
              alt={product.name}
              className="max-w-[280px]"
            />
            <div className="mt-4 flex items-center gap-2 text-xs text-[#245B4A]">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span className="font-mono text-[11px] font-semibold">
                BIS Hallmarked: {product.certification.huid || 'AU89F2'}
              </span>
            </div>
          </div>

          {/* Details Right Column */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#82796E] uppercase tracking-wider mb-2">
                <span>{product.purity}</span>
                <span>·</span>
                <span>{product.metalType}</span>
                <span>·</span>
                <span>{product.category}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#283447] leading-tight mb-2">
                {product.name}
              </h2>

              <p className="text-xs text-[#82796E] leading-relaxed mb-4">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="mb-4 p-3 bg-[#FAF7F0] rounded border border-[#E7E2D9]">
                <div className="font-mono text-2xl font-bold text-[#245B4A] tabular-nums">
                  {formatPrice(currentPrice)}
                </div>
                <div className="text-[11px] text-[#82796E] mt-0.5">
                  Includes 3% Indian GST & Insured Armoured Transit
                </div>
              </div>

              {/* Variants / Sizes */}
              {product.variants.length > 0 && (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-[#283447] block mb-1.5 uppercase tracking-wider">
                    Select Specification / Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                          selectedVariant?.id === v.id
                            ? 'border-[#245B4A] bg-[#245B4A] text-white font-medium'
                            : 'border-[#E7E2D9] text-[#283447] hover:border-[#C5A46D]'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-3 mb-6">
                <label className="text-xs font-semibold text-[#283447] uppercase tracking-wider">
                  Quantity
                </label>
                <div className="flex items-center border border-[#E7E2D9] rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-sm hover:bg-[#FAF7F0]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-mono text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-sm hover:bg-[#FAF7F0]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#E7E2D9]">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={addedNotice}
                  className="flex-1 bg-[#245B4A] text-white py-2.5 px-4 rounded text-xs uppercase tracking-widest font-semibold hover:bg-[#1C4537] transition-colors flex items-center justify-center gap-2"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 border border-[#E7E2D9] rounded hover:bg-[#FAF7F0] transition-colors ${
                    isWishlisted ? 'text-[#B87878] border-[#B87878]' : 'text-[#283447]'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#B87878]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleFullDetails}
                className="w-full text-center text-xs font-semibold text-[#C5A46D] hover:text-[#245B4A] py-1 flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Full Specifications & Hallmark Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
