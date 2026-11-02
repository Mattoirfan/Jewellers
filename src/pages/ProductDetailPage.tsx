import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { ProductCard } from '../components/products/ProductCard';
import { ProductVariant } from '../types';
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Heart,
  ChevronDown,
  Info,
  CheckCircle2,
  Calendar,
  MessageCircle,
  HelpCircle,
  Calculator,
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  navigate: (route: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, navigate }) => {
  const {
    products,
    calculateProductPrice,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    metalRates,
  } = useApp();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.variants[0]?.size || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'gemstones' | 'care' | 'certification'>('details');

  const unitPrice = calculateProductPrice(product, selectedVariant);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, selectedSize, quantity, engravingText);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, selectedSize, quantity, engravingText);
    navigate('/checkout');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length >= 5) {
      setDeliveryStatus('Insured Armoured Transit Available: Estimated Delivery in 3–4 business days.');
    } else {
      setDeliveryStatus('Please enter a valid postal pincode.');
    }
  };

  // Related products
  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 md:py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-[#82796E] mb-6 flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-[#245B4A]">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/collections')} className="hover:text-[#245B4A]">Collections</button>
          <span>/</span>
          <button onClick={() => navigate(`/collections/${product.collection}`)} className="hover:text-[#245B4A] capitalize">
            {product.collection}
          </button>
          <span>/</span>
          <span className="text-[#283447] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#E7E2D9] rounded-sm p-6 md:p-10 shadow-xs mb-14">
          
          {/* Gallery Left (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-[#FAF7F0] rounded-sm border border-[#E7E2D9] p-6 flex items-center justify-center">
              <JewelleryVisual
                type={product.featuredImageVisualType}
                aspectRatio="1:1"
                alt={product.name}
                className="max-w-[420px]"
              />

              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono font-semibold bg-[#245B4A] text-white px-2.5 py-1 rounded-xs uppercase tracking-wider">
                  BIS {product.purity}
                </span>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full bg-white border border-[#E7E2D9] hover:bg-[#FAF7F0] shadow-sm transition-colors ${
                  isWishlisted ? 'text-[#B87878]' : 'text-[#283447]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#B87878]' : ''}`} />
              </button>
            </div>

            {/* Official Certification Card */}
            <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#245B4A] text-[#C5A46D] rounded-full">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#245B4A] block font-serif text-sm">
                    Verified {product.certification.certifyingBody} Certification
                  </strong>
                  <span className="text-[11px] text-[#82796E]">
                    Unique HUID: <strong className="font-mono text-[#283447]">{product.certification.huid || 'AU89F2'}</strong>
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#82796E] font-mono hidden sm:inline">
                {product.certification.hallmarkCenter}
              </span>
            </div>
          </div>

          {/* Purchasing Form Right (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#82796E] uppercase tracking-wider mb-2 font-medium">
                <span>SKU: {product.sku}</span>
                <span>·</span>
                <span>{product.purity}</span>
                <span>·</span>
                <span>{product.metalType}</span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#283447] leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs md:text-sm text-[#82796E] font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price Banner */}
              <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-3xl font-bold text-[#245B4A] tabular-nums">
                    {formatPrice(unitPrice)}
                  </div>
                  <span className="text-[11px] text-[#82796E] block mt-0.5">
                    MRP inclusive of 3% Indian GST & Free Insured Transit
                  </span>
                </div>

                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A46D] hover:underline"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>View Price Breakdown</span>
                </button>
              </div>

              {/* Expandable Transparent Price Calculation */}
              {showPriceBreakdown && (
                <div className="mb-6 p-4 bg-white border border-[#C5A46D]/40 rounded-sm text-xs space-y-2 animate-in fade-in">
                  <h4 className="font-serif font-bold text-sm text-[#283447]">Transparent Valuation Formula:</h4>
                  <div className="space-y-1 font-mono text-[11px] text-[#82796E]">
                    <div className="flex justify-between">
                      <span>Net Metal Weight ({product.netMetalWeightGrams}g @ ₹{metalRates.gold22kPerGram}/g):</span>
                      <span className="text-[#283447]">₹{(product.netMetalWeightGrams * metalRates.gold22kPerGram).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Making Charges ({product.makingChargesPerGram || 650}/g × {product.grossWeightGrams}g):</span>
                      <span className="text-[#283447]">₹{((product.makingChargesPerGram || 650) * product.grossWeightGrams).toLocaleString('en-IN')}</span>
                    </div>
                    {product.gemstones && product.gemstones.length > 0 && (
                      <div className="flex justify-between">
                        <span>Certified Gemstones Valuation:</span>
                        <span className="text-[#283447]">Included in Base</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 border-t border-[#E7E2D9]">
                      <span>Statutory GST (3%):</span>
                      <span className="text-[#245B4A]">Calculated</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-[#FAF7F0] border border-[#E7E2D9] rounded-sm text-xs mb-6">
                <div>
                  <span className="text-[10px] text-[#82796E] uppercase block font-semibold">Gross Weight</span>
                  <strong className="font-mono text-[#283447]">{product.grossWeightGrams}g</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#82796E] uppercase block font-semibold">Net Gold Weight</span>
                  <strong className="font-mono text-[#283447]">{product.netMetalWeightGrams}g</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#82796E] uppercase block font-semibold">Dimensions</span>
                  <span className="text-[#283447] text-[11px] truncate block">{product.dimensions || 'Standard'}</span>
                </div>
              </div>

              {/* Variant / Size Selection */}
              {product.variants.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#283447]">
                      Select Size / Specification
                    </label>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-[#C5A46D] hover:underline"
                    >
                      Ring / Bangle Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(v);
                          if (v.size) setSelectedSize(v.size);
                        }}
                        className={`px-3.5 py-2 text-xs rounded border transition-colors ${
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

              {/* Complimentary Engraving */}
              <div className="mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#283447] block mb-1">
                  Complimentary Inner Engraving (Optional)
                </label>
                <input
                  type="text"
                  maxLength={24}
                  placeholder="e.g. Aanya & Kabir · 14.11.26"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] text-xs p-2.5 rounded focus:outline-none placeholder:text-[#82796E]/60 text-[#283447]"
                />
              </div>

              {/* Pincode Delivery Check */}
              <div className="mb-6 p-3 bg-white border border-[#E7E2D9] rounded-sm">
                <form onSubmit={checkPincode} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter delivery pincode (e.g. 400001)"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    className="flex-1 bg-[#FAF7F0] border border-[#E7E2D9] text-xs p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FAF7F0] text-[#245B4A] border border-[#245B4A] text-xs font-semibold uppercase rounded hover:bg-[#245B4A] hover:text-white transition-colors"
                  >
                    Check
                  </button>
                </form>
                {deliveryStatus && (
                  <p className="text-xs text-[#245B4A] mt-2 font-medium">{deliveryStatus}</p>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#E7E2D9]">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#FAF7F0] border-2 border-[#245B4A] text-[#245B4A] py-3.5 px-4 rounded text-xs uppercase tracking-widest font-semibold hover:bg-[#245B4A] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#245B4A] text-white py-3.5 px-4 rounded text-xs uppercase tracking-widest font-semibold hover:bg-[#1C4537] transition-colors shadow-md"
                >
                  Buy Now with Express Transit
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#82796E] pt-2">
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="hover:text-[#245B4A] underline flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>Book Private Boutique Trial</span>
                </button>
                <button
                  onClick={() => navigate('/custom-jewellery')}
                  className="hover:text-[#245B4A] underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>Request Custom Modification</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Gemstones, Care & Certification */}
        <div className="bg-white border border-[#E7E2D9] rounded-sm p-6 md:p-8 mb-16 shadow-xs">
          <div className="flex border-b border-[#E7E2D9] mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3 px-6 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-[#245B4A] text-[#245B4A]'
                  : 'border-transparent text-[#82796E] hover:text-[#283447]'
              }`}
            >
              Craftsmanship & Specifications
            </button>
            <button
              onClick={() => setActiveTab('gemstones')}
              className={`py-3 px-6 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'gemstones'
                  ? 'border-[#245B4A] text-[#245B4A]'
                  : 'border-transparent text-[#82796E] hover:text-[#283447]'
              }`}
            >
              Gemstones & 4Cs Dossier
            </button>
            <button
              onClick={() => setActiveTab('certification')}
              className={`py-3 px-6 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'certification'
                  ? 'border-[#245B4A] text-[#245B4A]'
                  : 'border-transparent text-[#82796E] hover:text-[#283447]'
              }`}
            >
              BIS Hallmarking & HUID
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`py-3 px-6 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'care'
                  ? 'border-[#245B4A] text-[#245B4A]'
                  : 'border-transparent text-[#82796E] hover:text-[#283447]'
              }`}
            >
              Care & Lifetime Buyback
            </button>
          </div>

          <div className="text-sm text-[#283447] leading-relaxed">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#245B4A] mb-2">Artisan Heritage</h4>
                  <p className="text-xs text-[#82796E] leading-relaxed font-light mb-4">
                    Hand-cast and hand-assembled in our private atelier in Mumbai. Each individual link, claw, and relief petal is polished with natural diamond dust buffs to ensure zero snagging against delicate silk or chiffon sarees.
                  </p>
                  <ul className="text-xs text-[#82796E] space-y-1.5 list-disc pl-4">
                    <li>Gross Precious Metal Weight: {product.grossWeightGrams} grams</li>
                    <li>Net Precious Gold Weight: {product.netMetalWeightGrams} grams</li>
                    <li>Verified Purity: {product.purity}</li>
                    <li>Estimated Dispatch: In-stock items ship within 24–48 hours.</li>
                  </ul>
                </div>
                <div className="bg-[#FAF7F0] p-6 border border-[#E7E2D9] rounded">
                  <h4 className="font-serif text-base font-bold text-[#245B4A] mb-2">Warranty & Protection</h4>
                  <p className="text-xs text-[#82796E] leading-relaxed mb-3">
                    Includes {product.warrantyYears}-year comprehensive warranty covering manufacturing defects, loose claws, and complimentary ultrasonic bath spa treatments.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'gemstones' && (
              <div>
                <h4 className="font-serif text-lg font-bold text-[#245B4A] mb-3">Certified Gemological Breakdown</h4>
                {product.gemstones && product.gemstones.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.gemstones.map((gem, idx) => (
                      <div key={idx} className="p-4 border border-[#E7E2D9] rounded bg-[#FAF7F0] text-xs space-y-1">
                        <strong className="text-sm font-serif text-[#245B4A] block">{gem.type}</strong>
                        <div className="flex justify-between">
                          <span className="text-[#82796E]">Carat Weight:</span>
                          <span className="font-mono text-[#283447]">{gem.caratWeight} ct</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#82796E]">Shape & Cut:</span>
                          <span className="text-[#283447]">{gem.shape} {gem.cut ? `(${gem.cut})` : ''}</span>
                        </div>
                        {gem.clarity && (
                          <div className="flex justify-between">
                            <span className="text-[#82796E]">Clarity Grade:</span>
                            <span className="font-mono text-[#283447]">{gem.clarity}</span>
                          </div>
                        )}
                        {gem.color && (
                          <div className="flex justify-between">
                            <span className="text-[#82796E]">Color Grade:</span>
                            <span className="text-[#283447]">{gem.color}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#82796E]">This masterpiece is crafted entirely of solid hallmarked precious metal without gemstone settings.</p>
                )}
              </div>
            )}

            {activeTab === 'certification' && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="font-serif text-lg font-bold text-[#245B4A]">Statutory BIS Hallmarking Compliance</h4>
                <p className="text-xs text-[#82796E] leading-relaxed">
                  In compliance with Government of India hallmarking guidelines, this article is stamped with:
                </p>
                <div className="grid grid-cols-3 gap-4 p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-center text-xs">
                  <div>
                    <span className="font-serif text-sm font-bold text-[#245B4A] block">BIS Triangular Logo</span>
                    <span className="text-[10px] text-[#82796E]">Bureau of Indian Standards</span>
                  </div>
                  <div>
                    <span className="font-serif text-sm font-bold text-[#245B4A] block">{product.purity}</span>
                    <span className="text-[10px] text-[#82796E]">Verified Purity / Fineness</span>
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold text-[#245B4A] block">{product.certification.huid || 'AU89F2'}</span>
                    <span className="text-[10px] text-[#82796E]">6-Digit BIS HUID</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#82796E]">
                  You can enter this HUID directly into the <strong>BIS CARE</strong> mobile application to verify the hallmarking center and registered jeweler credentials.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="font-serif text-lg font-bold text-[#245B4A]">Preservation Guidelines & Lifetime Exchange</h4>
                <ul className="text-xs text-[#82796E] space-y-2 list-disc pl-4">
                  {product.careInstructions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-[#E7E2D9] text-xs text-[#82796E]">
                  <strong>Lifetime Buyback:</strong> 100% prevailing market bullion value on exchange and 90% benchmark diamond market value upon physical appraisal at our flagship salons.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Jewels */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-1">
                You May Also Admire
              </span>
              <h2 className="font-serif text-3xl font-normal text-[#283447]">
                Complementary Masterpieces
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white max-w-lg w-full p-6 rounded shadow-xl border border-[#E7E2D9] space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-serif text-xl font-bold text-[#283447]">Indian & International Ring Size Guide</h3>
                <button onClick={() => setShowSizeGuide(false)} className="text-sm font-bold">✕</button>
              </div>
              <p className="text-xs text-[#82796E]">
                Measure the inner diameter of an existing ring that fits your chosen finger, or wrap a thin strip of paper around your knuckle:
              </p>
              <div className="text-xs font-mono space-y-1 bg-[#FAF7F0] p-4 rounded border border-[#E7E2D9]">
                <div className="flex justify-between font-bold border-b pb-1 text-[#245B4A]">
                  <span>Indian Size</span>
                  <span>Inner Diameter (mm)</span>
                  <span>US Size</span>
                </div>
                <div className="flex justify-between"><span>Size 10</span><span>16.0 mm</span><span>US 5.25</span></div>
                <div className="flex justify-between"><span>Size 12</span><span>16.5 mm</span><span>US 6.0</span></div>
                <div className="flex justify-between"><span>Size 14</span><span>17.2 mm</span><span>US 7.0</span></div>
                <div className="flex justify-between"><span>Size 16</span><span>17.9 mm</span><span>US 7.75</span></div>
                <div className="flex justify-between"><span>Size 18</span><span>18.5 mm</span><span>US 8.5</span></div>
              </div>
              <p className="text-[11px] text-[#82796E]">
                *All Aurelia rings include one complimentary sizing adjustment within 60 days of purchase.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
