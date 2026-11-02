import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import { QuickViewModal } from '../components/products/QuickViewModal';
import { Product, JewelleryCategory, MetalPurity, CollectionSlug } from '../types';
import {
  SlidersHorizontal,
  X,
  Search,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface ProductListingPageProps {
  collectionSlug?: string;
  navigate: (route: string) => void;
  searchParam?: string;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  collectionSlug,
  navigate,
  searchParam,
}) => {
  const { products, calculateProductPrice, formatPrice } = useApp();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPurity, setSelectedPurity] = useState<string>('All');
  const [selectedMetal, setSelectedMetal] = useState<string>('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(500000);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Collections mapping
  const collectionTitles: Record<string, { title: string; subtitle: string; desc: string }> = {
    gold: {
      title: '22K & 18K Gold Jewellery',
      subtitle: 'Imperial Chokers, Filigree Haars & Antique Kadas',
      desc: 'Forged from certified 22K (916) and 18K (750) yellow, rose, and white gold. 100% BIS Hallmarked with unique laser HUID and transparent itemized making charges.',
    },
    diamond: {
      title: 'GIA & IGI Diamond Jewellery',
      subtitle: 'Solitaire Rings, Tennis Bracelets & Haute Pavé',
      desc: 'Rare natural diamonds verified for the 4Cs. Triple Excellent cuts set into platinum and gold mounts with matching microscopic girdle laser inscriptions.',
    },
    bridal: {
      title: 'Royal Bridal Trousseau',
      subtitle: 'Uncut Syndicate Polki & Colombian Emeralds',
      desc: 'Heirloom bridal jewellery suites celebrating royal Indian weddings. Grand chokers, matching jhumkis, matha pattis, and bridal accessories.',
    },
    solitaire: {
      title: 'Engagement & Solitaires',
      subtitle: 'Flawless Solitaire Rings & Bespoke Settings',
      desc: 'Certified solitaires from 1.0ct to 5.0ct. Cathedral mounts, halo bezels, and timeless six-prong baskets.',
    },
    gemstones: {
      title: 'Untreated Precious Gemstones',
      subtitle: 'Burmese Rubies, Ceylon Sapphires & Emeralds',
      desc: 'Vivid unheated gemstones showcasing natural crystal color saturation in solid platinum and gold.',
    },
    everyday: {
      title: 'Everyday Luxe & Akoya Pearls',
      subtitle: 'Rhodium Plated 925 Silver & Layering Jewels',
      desc: 'Effortless daily elegance. Hypoallergenic tennis bracelets, pearl strands, and minimalist pendants.',
    },
    'mens-luxe': {
      title: "Men's Fine Jewellery",
      subtitle: 'Solid 18K Gold Cuban Chains & Signet Rings',
      desc: 'Substantial, hand-beveled gold chains and architecturally structured rings for modern gentlemen.',
    },
  };

  const currentMeta = collectionSlug
    ? collectionTitles[collectionSlug] || {
        title: `${collectionSlug.toUpperCase()} Collection`,
        subtitle: 'Curated Fine Jewellery',
        desc: 'Explore certified fine jewellery creations hallmarked with BIS 916 and GIA certifications.',
      }
    : searchParam
    ? {
        title: `Search: "${searchParam}"`,
        subtitle: 'Results from the Aurelia Vaults',
        desc: `Showing matched fine jewellery creations for "${searchParam}".`,
      }
    : {
        title: 'Complete Fine Jewellery Vault',
        subtitle: 'All Certified Creations',
        desc: 'Explore our complete catalogue of 22K gold, solitaire diamonds, and bridal jewellery.',
      };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Collection filter
        if (collectionSlug) {
          if (collectionSlug === 'gold' && p.collection !== 'gold') return false;
          if (collectionSlug === 'diamond' && p.collection !== 'diamond' && p.collection !== 'solitaire') return false;
          if (collectionSlug === 'bridal' && p.collection !== 'bridal') return false;
          if (collectionSlug !== 'gold' && collectionSlug !== 'diamond' && collectionSlug !== 'bridal') {
            if (p.collection !== collectionSlug) return false;
          }
        }

        // Search Param filter
        if (searchParam) {
          const q = searchParam.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchMetal = p.metalType.toLowerCase().includes(q);
          const matchPurity = p.purity.toLowerCase().includes(q);
          const matchHuid = p.certification.huid?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchMetal && !matchPurity && !matchHuid) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Purity filter
        if (selectedPurity !== 'All' && p.purity !== selectedPurity) {
          return false;
        }

        // Metal filter
        if (selectedMetal !== 'All' && p.metalType !== selectedMetal) {
          return false;
        }

        // Price filter
        const price = calculateProductPrice(p);
        if (price > maxPriceFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = calculateProductPrice(a);
        const priceB = calculateProductPrice(b);

        if (sortOption === 'price-asc') return priceA - priceB;
        if (sortOption === 'price-desc') return priceB - priceA;
        if (sortOption === 'weight-desc') return b.grossWeightGrams - a.grossWeightGrams;
        if (sortOption === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [
    products,
    collectionSlug,
    searchParam,
    selectedCategory,
    selectedPurity,
    selectedMetal,
    maxPriceFilter,
    sortOption,
    calculateProductPrice,
  ]);

  const categoriesList: (JewelleryCategory | 'All')[] = [
    'All',
    'Necklaces',
    'Rings',
    'Earrings',
    'Bangles & Bracelets',
    'Pendants',
    'Bridal Sets',
    'Chains',
  ];

  const purityList: (MetalPurity | 'All')[] = [
    'All',
    '22K (916)',
    '18K (750)',
    'Pt 950',
    '925 Sterling',
  ];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPurity('All');
    setSelectedMetal('All');
    setMaxPriceFilter(500000);
    setSortOption('featured');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Collection Hero Header */}
        <div className="border-b border-[#E7E2D9] pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-2">
                {currentMeta.subtitle}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-normal text-[#283447]">
                {currentMeta.title}
              </h1>
              <p className="text-xs md:text-sm text-[#82796E] mt-2 font-light leading-relaxed">
                {currentMeta.desc}
              </p>
            </div>

            {/* Total Count */}
            <div className="text-left md:text-right shrink-0">
              <span className="text-xs font-mono text-[#82796E] block">
                Showing {filteredProducts.length} of {products.length} Masterpieces
              </span>
              <span className="text-[11px] text-[#245B4A] font-medium flex items-center gap-1 md:justify-end mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>100% BIS Hallmarked</span>
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Controls Toolbar */}
        <div className="bg-white border border-[#E7E2D9] p-4 rounded-sm mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          
          {/* Quick Filter Buttons (Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-xs font-semibold text-[#82796E] uppercase tracking-wider mr-2 hidden sm:inline">
              Category:
            </span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#245B4A] text-white'
                    : 'bg-[#FAF7F0] text-[#283447] hover:bg-[#E7E2D9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Tools: Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#82796E]" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[#FAF7F0] border border-[#E7E2D9] text-xs py-1.5 px-3 rounded-xs text-[#283447] focus:outline-none"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="weight-desc">Gross Weight: Heavy to Light</option>
                <option value="newest">Newest Additions</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F0] border border-[#E7E2D9] text-xs font-medium text-[#283447] rounded-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D9]">
                <h3 className="font-serif text-lg font-bold text-[#283447]">Refine Vault</h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#C5A46D] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Metal Purity */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#283447] block mb-2.5">
                  Metal Purity / Karat
                </label>
                <div className="space-y-1.5">
                  {purityList.map((purity) => (
                    <label
                      key={purity}
                      className="flex items-center gap-2 text-xs text-[#283447] hover:text-[#245B4A] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="purity"
                        checked={selectedPurity === purity}
                        onChange={() => setSelectedPurity(purity)}
                        className="text-[#245B4A] focus:ring-[#245B4A]"
                      />
                      <span>{purity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-[#E7E2D9]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#283447]">Max Price</span>
                  <span className="font-mono font-bold text-[#245B4A]">
                    {formatPrice(maxPriceFilter)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-full accent-[#245B4A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#82796E] font-mono mt-1">
                  <span>{formatPrice(20000)}</span>
                  <span>{formatPrice(500000)}+</span>
                </div>
              </div>

              {/* Gold Bullion Transparency Note */}
              <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded-xs text-[11px] text-[#82796E] leading-relaxed">
                <span className="font-semibold text-[#245B4A] block mb-1">
                  Fair Value Assurance
                </span>
                Prices recalculate continuously based on official IBJA bullion daily benchmark rates. Every order includes an itemized invoice.
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E7E2D9] p-12 text-center rounded-sm space-y-4">
                <Search className="w-10 h-10 text-[#82796E] mx-auto opacity-50" />
                <h3 className="font-serif text-2xl text-[#283447]">
                  No matching fine jewellery found
                </h3>
                <p className="text-xs text-[#82796E] max-w-md mx-auto">
                  Try broadening your price limit, selecting a different purity, or exploring our custom jewellery bespoke service.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded font-medium hover:bg-[#1C4537]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    navigate={navigate}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Drawer Modal */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D9]">
                <h3 className="font-serif text-xl font-bold text-[#283447]">Filter Jewellery</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6 text-[#283447]" />
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#283447] block mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] text-xs p-2 rounded"
                >
                  {categoriesList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#283447] block mb-2">
                  Purity
                </label>
                <select
                  value={selectedPurity}
                  onChange={(e) => setSelectedPurity(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] text-xs p-2 rounded"
                >
                  {purityList.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#283447] block mb-2">
                  Max Price: {formatPrice(maxPriceFilter)}
                </label>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-full accent-[#245B4A]"
                />
              </div>

              <div className="pt-6 border-t border-[#E7E2D9] flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 border border-[#E7E2D9] text-xs font-medium rounded"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-2.5 bg-[#245B4A] text-white text-xs font-medium uppercase tracking-wider rounded"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          navigate={navigate}
        />
      </div>
    </div>
  );
};
