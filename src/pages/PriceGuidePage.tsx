import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  ShieldCheck,
  Calculator,
  HelpCircle,
  FileText,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface PriceGuidePageProps {
  navigate: (route: string) => void;
}

export const PriceGuidePage: React.FC<PriceGuidePageProps> = ({ navigate }) => {
  const { metalRates, formatPrice, currency } = useApp();

  // Calculator State
  const [calcWeight, setCalcWeight] = useState<number>(25);
  const [calcKarat, setCalcKarat] = useState<'24K' | '22K' | '18K'>('22K');
  const [calcCraftComplexity, setCalcCraftComplexity] = useState<number>(650);

  const selectedRatePerGram =
    calcKarat === '24K'
      ? metalRates.gold24kPerGram
      : calcKarat === '22K'
      ? metalRates.gold22kPerGram
      : metalRates.gold18kPerGram;

  const metalCost = calcWeight * selectedRatePerGram;
  const makingCost = calcWeight * calcCraftComplexity;
  const subtotal = metalCost + makingCost;
  const gstTax = Math.round(subtotal * 0.03);
  const estimatedTotal = subtotal + gstTax;

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Ethical Pricing Transparency</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#283447]">
            How Fine Jewellery is Priced
          </h1>
          <p className="text-sm md:text-base text-[#82796E] font-light mt-3 leading-relaxed">
            We believe you deserve complete clarity. Understand the 4 components of precious jewellery valuation and calculate exact estimates with our live bullion board.
          </p>
        </div>

        {/* Live Bullion Rates Board */}
        <div className="bg-white border border-[#E7E2D9] rounded-sm p-6 md:p-8 shadow-xs mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E7E2D9] gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block">
                Official Reference Feed
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#283447]">
                Live Daily Bullion Rates in India
              </h2>
              <p className="text-xs text-[#82796E] mt-1">
                Source: <strong>{metalRates.source}</strong> · Verified: {metalRates.lastUpdated}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-[#245B4A] bg-[#FAF7F0] px-3 py-1 rounded border border-[#E7E2D9] font-medium">
                Currency: INR (₹) per 1.000 gram
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
            <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#82796E] block mb-1">
                24K Pure Gold (999)
              </span>
              <strong className="font-mono text-xl text-[#245B4A]">
                {formatPrice(metalRates.gold24kPerGram)}
              </strong>
              <span className="text-[10px] text-[#82796E] block mt-1">Investment Bullion</span>
            </div>

            <div className="p-4 bg-[#FAF7F0] border-2 border-[#C5A46D] rounded text-center relative shadow-sm">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#C5A46D] text-[#283447] text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                Most Popular
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#82796E] block mb-1">
                22K Gold (916)
              </span>
              <strong className="font-mono text-xl text-[#245B4A]">
                {formatPrice(metalRates.gold22kPerGram)}
              </strong>
              <span className="text-[10px] text-[#245B4A] block mt-1 font-medium">BIS Hallmarked Fine Jewels</span>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#82796E] block mb-1">
                18K Gold (750)
              </span>
              <strong className="font-mono text-xl text-[#245B4A]">
                {formatPrice(metalRates.gold18kPerGram)}
              </strong>
              <span className="text-[10px] text-[#82796E] block mt-1">Diamond Solitaires & Rings</span>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#82796E] block mb-1">
                Silver 999 Fineness
              </span>
              <strong className="font-mono text-xl text-[#245B4A]">
                {formatPrice(metalRates.silverPerGram)}
              </strong>
              <span className="text-[10px] text-[#82796E] block mt-1">925 Sterling Silver</span>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#82796E] block mb-1">
                Platinum 950
              </span>
              <strong className="font-mono text-xl text-[#245B4A]">
                {formatPrice(metalRates.platinumPerGram)}
              </strong>
              <span className="text-[10px] text-[#82796E] block mt-1">Solitaire Cathedral Mounts</span>
            </div>
          </div>

          <p className="text-[11px] text-[#82796E] mt-4 leading-relaxed italic">
            *Indicative market rate basis. In accordance with legal regulations, bullion market rates fluctuate daily. The rate locked on your order at checkout is binding.
          </p>
        </div>

        {/* 2-Column: 4 Pillars of Valuation Left + Interactive Calculator Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Educational Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-xs space-y-5">
              <h3 className="font-serif text-2xl font-bold text-[#283447]">
                The 4 Core Components of Every Aurelia Price
              </h3>

              <div className="space-y-4 text-xs leading-relaxed">
                <div className="p-4 bg-[#FAF7F0] rounded border border-[#E7E2D9]">
                  <h4 className="font-serif text-base font-bold text-[#245B4A] mb-1">
                    1. Net Precious Metal Weight × Applicable Bullion Rate
                  </h4>
                  <p className="text-[#82796E]">
                    We always weigh gemstones separately. You pay for pure precious metal only on the exact net gold weight, not on the total gross weight.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F0] rounded border border-[#E7E2D9]">
                  <h4 className="font-serif text-base font-bold text-[#245B4A] mb-1">
                    2. Transparent Making Charges (Wastage / Craftsmanship)
                  </h4>
                  <p className="text-[#82796E]">
                    Covers the generational artisan hours, die casting, hand-filigree annealing, and mirror polishing. We charge an explicit rate per gram rather than hidden markups.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F0] rounded border border-[#E7E2D9]">
                  <h4 className="font-serif text-base font-bold text-[#245B4A] mb-1">
                    3. Certified Gemstones & Solitaires
                  </h4>
                  <p className="text-[#82796E]">
                    Valued precisely on international Rapaport / GIA diamond benchmark sheets for 4Cs (Cut, Color, Clarity, Carat weight).
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F0] rounded border border-[#E7E2D9]">
                  <h4 className="font-serif text-base font-bold text-[#245B4A] mb-1">
                    4. Statutory Indian GST (3%)
                  </h4>
                  <p className="text-[#82796E]">
                    Legally mandated by the Government of India on all fine jewellery sales. An official tax invoice with BIS HUID number is provided.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Transparent Price Calculator */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#C5A46D] p-6 md:p-8 rounded-sm shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-[#245B4A]" />
                <h3 className="font-serif text-2xl font-bold text-[#283447]">
                  Gold Price Calculator
                </h3>
              </div>
              <p className="text-xs text-[#82796E] mb-6">
                Calculate an immediate, transparent estimate based on weight, karat purity, and craftsmanship complexity.
              </p>

              <div className="space-y-4 text-xs">
                {/* Weight slider & input */}
                <div>
                  <div className="flex justify-between items-center mb-1 font-semibold text-[#283447]">
                    <span>Net Gold Weight:</span>
                    <span className="font-mono text-sm text-[#245B4A]">{calcWeight} grams</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="1"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full accent-[#245B4A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#82796E] font-mono">
                    <span>2g (Delicate Ring)</span>
                    <span>50g (Necklace)</span>
                    <span>100g (Grand Haar)</span>
                  </div>
                </div>

                {/* Karat selection */}
                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Select Karat Purity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['24K', '22K', '18K'] as const).map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setCalcKarat(k)}
                        className={`p-2 rounded text-center border font-mono transition-colors ${
                          calcKarat === k
                            ? 'border-[#245B4A] bg-[#245B4A] text-white font-bold'
                            : 'border-[#E7E2D9] text-[#283447] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        {k} ({k === '24K' ? '999' : k === '22K' ? '916' : '750'})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Craftsmanship Type */}
                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Craftsmanship Complexity</label>
                  <select
                    value={calcCraftComplexity}
                    onChange={(e) => setCalcCraftComplexity(Number(e.target.value))}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-xs"
                  >
                    <option value={480}>Simple Daily / Machine Finish (₹480/g)</option>
                    <option value={650}>Handcrafted Filigree & Floral Chasing (₹650/g)</option>
                    <option value={890}>Imperial Royal Polki Jadau / Antique Temple (₹890/g)</option>
                  </select>
                </div>

                {/* Result Itemized Box */}
                <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded font-mono text-xs space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-[#82796E]">Pure Metal Cost ({calcWeight}g × ₹{selectedRatePerGram}):</span>
                    <strong className="text-[#283447]">{formatPrice(metalCost)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#82796E]">Making Charges ({calcWeight}g × ₹{calcCraftComplexity}):</span>
                    <strong className="text-[#283447]">{formatPrice(makingCost)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#82796E]">GST (3%):</span>
                    <strong className="text-[#283447]">{formatPrice(gstTax)}</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E7E2D9] text-sm font-bold text-[#245B4A]">
                    <span>Estimated Valuation:</span>
                    <span>{formatPrice(estimatedTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/collections/gold')}
                  className="w-full py-3 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors"
                >
                  Explore 22K Gold Creations →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
