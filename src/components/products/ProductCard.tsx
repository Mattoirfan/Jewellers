import React, { useState } from 'react';
import { Product } from '../../types';
import { JewelleryVisual } from '../common/JewelleryVisual';
import { useApp } from '../../context/AppContext';
import { Heart, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  navigate: (route: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  navigate,
  onQuickView,
}) => {
  const { calculateProductPrice, formatPrice, isInWishlist, toggleWishlist, addToCart } = useApp();
  const [addedNotice, setAddedNotice] = useState(false);

  const price = calculateProductPrice(product);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants[0], undefined, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/products/${product.slug}`);
    }
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.slug}`)}
      className="group relative flex flex-col bg-white border border-[#E7E2D9] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Visual Image Container with Zero-Broken-Image guarantee */}
      <div className="relative w-full overflow-hidden bg-[#FAF7F0]">
        <JewelleryVisual
          type={product.featuredImageVisualType}
          aspectRatio="4:3"
          alt={product.name}
        />

        {/* Top Badges (Restrained text tags, no garish candy pills) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.isNewArrival && (
            <span className="text-[10px] font-medium tracking-widest uppercase bg-[#245B4A] text-white px-2 py-0.5 rounded-xs shadow-sm">
              New Arrival
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="text-[10px] font-medium tracking-widest uppercase bg-[#C5A46D] text-[#283447] px-2 py-0.5 rounded-xs shadow-sm font-semibold">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-[#E7E2D9] flex items-center justify-center text-[#283447] hover:text-[#B87878] transition-colors shadow-sm"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-[#B87878] text-[#B87878]' : 'stroke-[1.75]'}`}
          />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 bg-white/95 text-[#283447] text-xs font-medium py-1.5 px-3 rounded-xs hover:bg-[#FAF7F0] transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#245B4A] text-white text-xs font-medium py-1.5 px-3 rounded-xs hover:bg-[#1B4538] transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            {addedNotice ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Metadata Discipline: clean unboxed text with typographic separators */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#82796E] uppercase tracking-wider mb-1.5">
            <span>{product.purity}</span>
            <span aria-hidden="true">·</span>
            <span>{product.metalType}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[10px]">{product.netMetalWeightGrams}g</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base font-semibold text-[#283447] group-hover:text-[#245B4A] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#82796E] line-clamp-1 mt-1 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Pricing & Hallmark Assurance */}
        <div className="mt-3 pt-3 border-t border-[#E7E2D9]/60 flex items-baseline justify-between">
          <div>
            <div className="font-mono text-base font-bold text-[#283447] tracking-tight tabular-nums">
              {formatPrice(price)}
            </div>
            {product.isMarketLinkedPrice && (
              <span className="text-[10px] text-[#C5A46D] font-medium block">
                Live IBJA Rate Linked
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-[#245B4A] font-semibold bg-[#FAF7F0] px-1.5 py-0.5 border border-[#E7E2D9]">
              HUID: {product.certification.huid || 'AU89F2'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
