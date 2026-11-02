import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Gift,
  Tag,
  ShoppingBag,
  Check,
} from 'lucide-react';

interface CartPageProps {
  navigate: (route: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    calculateProductPrice,
    formatPrice,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useApp();

  const [inputPromo, setInputPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);
  const [isGiftBox, setIsGiftBox] = useState(true);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = applyPromoCode(inputPromo);
    setPromoMessage({ success: res.success, text: res.message });
    if (res.success) setInputPromo('');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F0] py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F0] border border-[#E7E2D9] flex items-center justify-center mx-auto text-[#82796E]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#283447]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-[#82796E] leading-relaxed">
            Discover timeless 22K gold heirlooms, certified diamond solitaires, and bridal jewellery crafted for your story.
          </p>
          <button
            onClick={() => navigate('/collections')}
            className="px-8 py-3 bg-[#245B4A] text-white text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#1C4537] transition-colors shadow-sm"
          >
            Explore Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <h1 className="font-serif text-3xl md:text-5xl font-normal text-[#283447] mb-8">
          Shopping Bag ({cart.length} {cart.length === 1 ? 'Creation' : 'Creations'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Cart Items (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item, idx) => {
              const itemUnitPrice = calculateProductPrice(item.product, item.selectedVariant);
              const lineTotal = itemUnitPrice * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedVariant?.id || 'std'}-${idx}`}
                  className="bg-white border border-[#E7E2D9] rounded-sm p-4 md:p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF7F0] rounded border border-[#E7E2D9] shrink-0 p-1">
                      <JewelleryVisual
                        type={item.product.featuredImageVisualType}
                        aspectRatio="1:1"
                        alt={item.product.name}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-[#82796E] uppercase tracking-wider">
                        <span>{item.product.purity}</span>
                        <span>·</span>
                        <span>{item.product.metalType}</span>
                        <span>·</span>
                        <span className="font-mono">{item.product.netMetalWeightGrams}g</span>
                      </div>

                      <h3
                        onClick={() => navigate(`/products/${item.product.slug}`)}
                        className="font-serif text-lg font-semibold text-[#283447] hover:text-[#245B4A] cursor-pointer mt-0.5"
                      >
                        {item.product.name}
                      </h3>

                      {item.selectedSize && (
                        <p className="text-xs text-[#82796E] mt-0.5">
                          Size / Variant: <span className="font-medium text-[#283447]">{item.selectedSize}</span>
                        </p>
                      )}

                      {item.engravingText && (
                        <p className="text-[11px] text-[#C5A46D] italic mt-0.5">
                          Engraved: "{item.engravingText}"
                        </p>
                      )}

                      <span className="text-[10px] text-[#245B4A] font-mono font-medium block mt-1">
                        BIS HUID: {item.product.certification.huid || 'AU89F2'}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-[#E7E2D9]">
                    <div className="font-mono text-base font-bold text-[#245B4A] tabular-nums">
                      {formatPrice(lineTotal)}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-[#E7E2D9] rounded bg-[#FAF7F0]">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="px-2 py-0.5 text-xs text-[#283447] hover:bg-[#E7E2D9]"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="px-2 py-0.5 text-xs text-[#283447] hover:bg-[#E7E2D9]"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                        className="p-1.5 text-[#82796E] hover:text-[#B87878] transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Luxury Gift Packaging Box Option */}
            <div className="bg-white border border-[#E7E2D9] p-4 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#C5A46D] shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#283447]">
                    Aurelia Signature Emerald Velvet Box & Wax Seal
                  </h4>
                  <p className="text-[11px] text-[#82796E]">
                    Complimentary embossed presentation box with silk ribbon and personalized calligraphy card.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isGiftBox}
                onChange={(e) => setIsGiftBox(e.target.checked)}
                className="w-4 h-4 accent-[#245B4A]"
              />
            </div>
          </div>

          {/* Right Column: Order Summary (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-[#283447] pb-3 border-b border-[#E7E2D9]">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#283447] block mb-1.5">
                  Privilege Promo Code
                </label>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#FAF7F0] border border-[#245B4A] rounded text-xs">
                    <span className="font-mono font-bold text-[#245B4A]">{promoCode} Applied</span>
                    <button
                      onClick={removePromoCode}
                      className="text-[#B87878] text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try: AURELIA10 or BRIDAL2026"
                      value={inputPromo}
                      onChange={(e) => setInputPromo(e.target.value)}
                      className="flex-1 bg-[#FAF7F0] border border-[#E7E2D9] text-xs p-2 rounded focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#1C4537]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[11px] mt-1.5 ${promoMessage.success ? 'text-[#245B4A]' : 'text-[#B87878]'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2.5 text-xs text-[#82796E] font-mono pt-3 border-t border-[#E7E2D9]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-[#283447]">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#245B4A]">
                    <span>Privilege Courtesy:</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Indian GST (3%):</span>
                  <span className="text-[#283447]">{formatPrice(cartTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Armoured Transit:</span>
                  <span className="text-[#245B4A]">
                    {cartShipping === 0 ? 'COMPLIMENTARY' : formatPrice(cartShipping)}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-[#E7E2D9] text-base font-bold text-[#283447]">
                  <span className="font-serif">Grand Total:</span>
                  <span className="text-[#245B4A]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#245B4A] text-white py-3.5 px-4 rounded text-xs uppercase tracking-widest font-semibold hover:bg-[#1C4537] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-[#82796E] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>256-Bit Encrypted · Tamper-Evident Packaging</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
