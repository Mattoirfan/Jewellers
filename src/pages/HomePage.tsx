import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import { QuickViewModal } from '../components/products/QuickViewModal';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { Product } from '../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  ChevronRight,
  Clock,
  Compass,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { DEMO_REVIEWS, FAQS_LIST } from '../data/mockData';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { products, metalRates, formatPrice } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter featured products
  const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* 1. HERO CAMPAIGN BANNER */}
      <section className="relative overflow-hidden bg-[#245B4A] text-[#FAF7F0] border-b border-[#C5A46D]/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text / Editorial Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C4537] border border-[#C5A46D]/40 rounded-xs text-[#E9D9B8] text-xs uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Royal Heritage & Contemporary Fine Jewels</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-balance text-white">
              Jewellery That Becomes Part of Your Story.
            </h1>

            <p className="text-base sm:text-lg text-[#FAF7F0]/85 font-light leading-relaxed max-w-xl text-balance">
              Discover timeless heirloom designs, generational Indian goldsmithing, and certified solitaire diamonds crafted for life's most meaningful moments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigate('/collections')}
                className="px-8 py-3.5 bg-[#C5A46D] text-[#283447] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#E9D9B8] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Explore Collections
              </button>
              <button
                onClick={() => navigate('/collections/bridal')}
                className="px-8 py-3.5 bg-transparent border border-[#FAF7F0]/80 text-[#FAF7F0] text-xs font-medium uppercase tracking-widest rounded-xs hover:bg-white/10 hover:border-white transition-all whitespace-nowrap"
              >
                Discover Bridal Jewellery
              </button>
            </div>

            {/* Trust Indicators Bar */}
            <div className="pt-8 border-t border-[#C5A46D]/20 grid grid-cols-3 gap-4 text-xs font-light text-[#E9D9B8]">
              <div>
                <span className="font-serif text-xl sm:text-2xl text-white font-semibold block">100%</span>
                <span className="text-[11px] text-[#FAF7F0]/70">BIS Hallmarked & HUID</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl text-white font-semibold block">GIA / IGI</span>
                <span className="text-[11px] text-[#FAF7F0]/70">Certified Solitaires</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl text-white font-semibold block">Insured</span>
                <span className="text-[11px] text-[#FAF7F0]/70">Armoured Transit</span>
              </div>
            </div>
          </div>

          {/* Right Visual / High Jewellery Art (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md p-3 bg-white/5 border border-[#C5A46D]/30 rounded-sm shadow-2xl backdrop-blur-xs">
              <JewelleryVisual
                type="necklace-gold"
                aspectRatio="1:1"
                alt="Aurelia Royal Heritage Haar Masterpiece"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#FAF7F0] text-[#283447] p-4 rounded-sm border border-[#C5A46D]/50 shadow-xl hidden sm:block">
                <span className="text-[10px] uppercase tracking-widest text-[#82796E] block font-mono">
                  Masterpiece of the Month
                </span>
                <h4 className="font-serif text-sm font-semibold text-[#245B4A]">
                  Royal Heritage Filigree Haar
                </h4>
                <span className="font-mono text-xs font-bold text-[#283447]">
                  22K (916) Gold · 46.2g
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE BULLION RATES STRIP */}
      <section className="bg-white border-b border-[#E7E2D9] py-4 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#245B4A]" />
            <span className="font-serif text-base font-semibold text-[#283447]">
              Today's Transparent Bullion Reference Rates
            </span>
            <span className="text-[11px] text-[#82796E] font-light">
              (Updated {metalRates.lastUpdated})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 rounded border border-[#E7E2D9]">
              <span className="text-[#82796E]">Gold 24K:</span>
              <strong className="text-[#245B4A] font-bold">{formatPrice(metalRates.gold24kPerGram)}/g</strong>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 rounded border border-[#E7E2D9]">
              <span className="text-[#82796E]">Gold 22K (916):</span>
              <strong className="text-[#245B4A] font-bold">{formatPrice(metalRates.gold22kPerGram)}/g</strong>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 rounded border border-[#E7E2D9]">
              <span className="text-[#82796E]">Gold 18K (750):</span>
              <strong className="text-[#245B4A] font-bold">{formatPrice(metalRates.gold18kPerGram)}/g</strong>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 rounded border border-[#E7E2D9]">
              <span className="text-[#82796E]">Silver 999:</span>
              <strong className="text-[#245B4A] font-bold">{formatPrice(metalRates.silverPerGram)}/g</strong>
            </div>
            <button
              onClick={() => navigate('/price-guide')}
              className="font-sans text-xs font-semibold text-[#C5A46D] hover:underline flex items-center gap-1 whitespace-nowrap"
            >
              <span>Learn Pricing Formula</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. CURATED VAULTS / COLLECTION PATHWAYS */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D] block mb-2">
            The Aurelia Portfolios
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#283447] text-balance">
            Curated Collections of Rare Distinction
          </h2>
          <p className="text-sm text-[#82796E] mt-3 font-light leading-relaxed">
            From imperial Rajasthani Jadau Kundan to pristine certified GIA solitaires, explore jewellery engineered to transcend generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 22K Gold */}
          <div
            onClick={() => navigate('/collections/gold')}
            className="group relative bg-white border border-[#E7E2D9] rounded-sm overflow-hidden p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <JewelleryVisual type="necklace-gold" aspectRatio="1:1" className="mb-4" />
              <span className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-semibold block">
                Heritage Bullion
              </span>
              <h3 className="font-serif text-xl font-bold text-[#283447] group-hover:text-[#245B4A] transition-colors mt-1">
                22K Heritage Gold
              </h3>
              <p className="text-xs text-[#82796E] mt-2 font-light line-clamp-2">
                Hand-chased floral filigree, solid antique kadas, and temple jewellery hallmarked with BIS 916.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E7E2D9] flex items-center justify-between text-xs font-semibold text-[#245B4A]">
              <span>Explore Gold</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Diamonds */}
          <div
            onClick={() => navigate('/collections/diamond')}
            className="group relative bg-white border border-[#E7E2D9] rounded-sm overflow-hidden p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <JewelleryVisual type="ring-diamond" aspectRatio="1:1" className="mb-4" />
              <span className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-semibold block">
                GIA & IGI Solitaires
              </span>
              <h3 className="font-serif text-xl font-bold text-[#283447] group-hover:text-[#245B4A] transition-colors mt-1">
                Diamond Haute Joaillerie
              </h3>
              <p className="text-xs text-[#82796E] mt-2 font-light line-clamp-2">
                Triple Excellent cut solitaires, tennis bracelets, and diamond cluster earrings with laser-inscribed girdles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E7E2D9] flex items-center justify-between text-xs font-semibold text-[#245B4A]">
              <span>Explore Diamonds</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Royal Bridal */}
          <div
            onClick={() => navigate('/collections/bridal')}
            className="group relative bg-white border border-[#E7E2D9] rounded-sm overflow-hidden p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <JewelleryVisual type="bridal-polki" aspectRatio="1:1" className="mb-4" />
              <span className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-semibold block">
                Grand Trousseau
              </span>
              <h3 className="font-serif text-xl font-bold text-[#283447] group-hover:text-[#245B4A] transition-colors mt-1">
                Royal Bridal Trousseau
              </h3>
              <p className="text-xs text-[#82796E] mt-2 font-light line-clamp-2">
                Uncut syndicate Polki chokers, Colombian emerald droplets, and bridal suites designed for royal weddings.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E7E2D9] flex items-center justify-between text-xs font-semibold text-[#245B4A]">
              <span>Explore Bridal</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Bespoke Studio */}
          <div
            onClick={() => navigate('/custom-jewellery')}
            className="group relative bg-[#245B4A] text-[#FAF7F0] border border-[#C5A46D]/40 rounded-sm overflow-hidden p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#1C4537] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#E9D9B8] font-semibold block">
                One-of-a-Kind
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                Bespoke Atelier Commission
              </h3>
              <p className="text-xs text-[#FAF7F0]/80 mt-2 font-light leading-relaxed">
                Co-create your signature engagement ring or transform heirloom gold with our Senior Master Gemologist.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#C5A46D]/30 flex items-center justify-between text-xs font-semibold text-[#E9D9B8]">
              <span>Begin Bespoke Brief</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED BESTSELLERS */}
      <section className="bg-white border-y border-[#E7E2D9] py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D] block mb-2">
                Curator’s Choice
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#283447]">
                Iconic Creations of the Maison
              </h2>
            </div>
            <button
              onClick={() => navigate('/collections')}
              className="text-xs font-semibold uppercase tracking-wider text-[#245B4A] hover:text-[#C5A46D] flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <span>View Full Vault (10+ Items)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP & ATELIER STORY */}
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative p-4 bg-white border border-[#E7E2D9] rounded-sm shadow-xl">
              <JewelleryVisual
                type="bangle-emerald"
                aspectRatio="4:3"
                alt="Aurelia Master Goldsmith Craftsmanship"
              />
              <div className="mt-4 p-4 bg-[#FAF7F0] border-t border-[#E7E2D9] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#245B4A] block">Generational Craft</span>
                  <span className="text-[#82796E]">Over 180 hours of hand repoussé chasing</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-[#283447] block">BIS 916 Hallmarked</span>
                  <span className="text-[#82796E]">Mumbai Assaying Bureau</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D] block">
              The Aurelia Standard
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#283447] leading-tight text-balance">
              Where Generational Heritage Meets Rigorous Verification
            </h2>
            <p className="text-sm text-[#82796E] leading-relaxed font-light">
              Fine jewellery is both an intimate emotional expression and an enduring store of wealth. At Aurelia, we reject the opaque pricing and speculative markups that plague the traditional marketplace.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#245B4A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#283447]">
                    100% BIS Hallmarked with Traceable HUID
                  </h4>
                  <p className="text-xs text-[#82796E] leading-relaxed mt-0.5">
                    Every piece carries an indelible 6-digit laser ID registered with the Bureau of Indian Standards, instantly verifiable via the BIS CARE app.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#245B4A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#283447]">
                    Itemized Pricing Transparency
                  </h4>
                  <p className="text-xs text-[#82796E] leading-relaxed mt-0.5">
                    We clearly break down every single gram: Gold Weight × Live Bullion Rate + Making Charges + Certified Gemstone Value + 3% GST.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#245B4A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#283447]">
                    Ethical Sourcing & Non-Conflict Minerals
                  </h4>
                  <p className="text-xs text-[#82796E] leading-relaxed mt-0.5">
                    Strict adherence to the Kimberley Process for all natural diamonds and certified conflict-free bullion refiners.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigate('/about')}
                className="px-6 py-3 bg-[#245B4A] text-white text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#1C4537] transition-colors"
              >
                Read Our Heritage Story
              </button>
              <button
                onClick={() => navigate('/price-guide')}
                className="text-xs font-semibold text-[#C5A46D] hover:underline flex items-center gap-1"
              >
                <span>Understand Gold Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW ARRIVALS CAROUSEL/GRID */}
      <section className="bg-white border-t border-[#E7E2D9] py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D] block mb-2">
                Fresh from the Atelier
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#283447]">
                New Season Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigate('/collections')}
              className="text-xs font-semibold uppercase tracking-wider text-[#245B4A] hover:text-[#C5A46D] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED REVIEWS & SOCIAL PROOF */}
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto border-t border-[#E7E2D9]">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D] block mb-2">
            Client Words
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#283447]">
            Stories of Devotion & Celebration
          </h2>
          <p className="text-xs text-[#82796E] mt-2 italic font-serif">
            (Demo testimonials from verified bespoke consultations and salon patrons)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white border border-[#E7E2D9] rounded-sm shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C5A46D] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A46D]" />
                  ))}
                </div>
                <h4 className="font-serif text-base font-semibold text-[#283447] mb-2">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#82796E] leading-relaxed font-light mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E2D9]/60 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#283447] font-medium block">{rev.authorName}</strong>
                  <span className="text-[11px] text-[#82796E]">{rev.city}</span>
                </div>
                <span className="text-[10px] font-mono text-[#245B4A] bg-[#FAF7F0] px-2 py-0.5 border border-[#E7E2D9]">
                  Verified Patron
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. APPOINTMENT BOOKING CTA STRIP */}
      <section className="bg-[#245B4A] text-[#FAF7F0] py-16 px-4 md:px-8 border-y-2 border-[#C5A46D]/40">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D] block">
              Private Salon Concierge
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-normal text-white">
              Experience the Collections in Private Serenity
            </h3>
            <p className="text-sm text-[#FAF7F0]/80 font-light leading-relaxed">
              Book a dedicated one-on-one session with our Senior Gemologists at our Colaba Maison, DLF Emporio Atelier, or Indiranagar Boutique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => navigate('/book-appointment')}
              className="px-8 py-3.5 bg-[#C5A46D] text-[#283447] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#E9D9B8] transition-colors whitespace-nowrap shadow-md"
            >
              Book Boutique Appointment
            </button>
            <button
              onClick={() => navigate('/stores')}
              className="px-8 py-3.5 bg-transparent border border-[#FAF7F0]/70 text-[#FAF7F0] text-xs font-medium uppercase tracking-widest rounded-xs hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              View Boutique Locations
            </button>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        navigate={navigate}
      />
    </div>
  );
};
