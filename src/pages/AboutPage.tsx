import React from 'react';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  Users,
  Compass,
  ArrowRight,
  Gem,
} from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Hero Narrative */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-2">
            The Aurelia Heritage
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#283447] text-balance">
            Timeless Elegance. Crafted for Your Story.
          </h1>
          <p className="text-sm md:text-base text-[#82796E] font-light mt-4 leading-relaxed">
            Founded with an uncompromising devotion to honesty, metallurgical purity, and generative Indian craftsmanship, Aurelia Fine Jewels creates modern heirlooms that transcend transient fashions.
          </p>
        </div>

        {/* 2-Column: Atelier Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D]">
              Our Foundation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#283447]">
              The Renaissance of Transparent Indian Luxury
            </h2>
            <p className="text-xs md:text-sm text-[#82796E] leading-relaxed font-light">
              For generations, jewellery retail in India operated behind closed curtains—speculative making charges, bundled gross weights, and vague purity claims.
            </p>
            <p className="text-xs md:text-sm text-[#82796E] leading-relaxed font-light">
              Aurelia was born to establish a new gold standard: one where 100% of creations carry official Bureau of Indian Standards (BIS) Hallmarks with laser-inscribed 6-digit HUIDs, every solitaire comes accompanied by international GIA or IGI certificates, and every invoice transparently breaks down net metal weight, daily bullion rate, making cost, and taxes.
            </p>

            <div className="pt-2 flex gap-4">
              <button
                onClick={() => navigate('/collections')}
                className="px-6 py-3 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors"
              >
                Explore The Collections
              </button>
              <button
                onClick={() => navigate('/price-guide')}
                className="px-6 py-3 border border-[#E7E2D9] text-[#283447] text-xs uppercase tracking-widest font-semibold rounded hover:bg-white"
              >
                Our Pricing Formula
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <JewelleryVisual type="atelier-craft" aspectRatio="4:3" className="rounded-sm shadow-xl" />
          </div>
        </div>

        {/* 4 Core Pillars of Brand Excellence */}
        <div className="bg-white border border-[#E7E2D9] p-8 md:p-12 rounded-sm shadow-xs mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block mb-1">
              Guiding Ethos
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#283447]">
              The Four Aurelia Tenets
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <span className="font-mono text-xl font-bold text-[#245B4A]">01. Purity</span>
              <h4 className="font-serif text-lg font-semibold text-[#283447]">Verifiable Metallurgical Integrity</h4>
              <p className="text-xs text-[#82796E] font-light leading-relaxed">
                We only craft in 22K (916), 18K (750), 925 Sterling Silver, and Platinum 950. Every alloy is assayed by authorized BIS laboratories.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xl font-bold text-[#245B4A]">02. Transparency</span>
              <h4 className="font-serif text-lg font-semibold text-[#283447]">Honest Itemized Breakdown</h4>
              <p className="text-xs text-[#82796E] font-light leading-relaxed">
                Zero hidden markups. We weigh precious metals and gemstones separately so you know the exact value of every gram and carat.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xl font-bold text-[#245B4A]">03. Craftsmanship</span>
              <h4 className="font-serif text-lg font-semibold text-[#283447]">Heirloom Durability</h4>
              <p className="text-xs text-[#82796E] font-light leading-relaxed">
                Bridging century-old Rajasthani Jadau Kundan and European micro-pavé setting for comfortable, snag-free everyday and bridal wear.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xl font-bold text-[#245B4A]">04. Responsibility</span>
              <h4 className="font-serif text-lg font-semibold text-[#283447]">Ethical Sourcing</h4>
              <p className="text-xs text-[#82796E] font-light leading-relaxed">
                Kimberley Process compliant natural diamonds, conflict-free bullion refiners, and sustainable workshop waste recovery.
              </p>
            </div>
          </div>
        </div>

        {/* Master Craftsmen & Team Profiles */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block mb-1">
              Atelier Artisans
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#283447]">
              The Custodians of Craft
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E7E2D9] p-6 rounded text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-[#FAF7F0] border border-[#C5A46D] flex items-center justify-center mx-auto text-[#245B4A] font-serif text-2xl font-bold">
                VS
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#283447]">Vikram Singhania</h4>
                <span className="text-xs text-[#C5A46D] font-medium block">Head of Atelier & Master Jeweller</span>
              </div>
              <p className="text-xs text-[#82796E] font-light leading-relaxed">
                Fourth-generation goldsmith trained in Jaipur and Milan, overseeing precision CAD modeling and traditional repoussé chasing.
              </p>
            </div>

            <div className="bg-white border border-[#E7E2D9] p-6 rounded text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-[#FAF7F0] border border-[#C5A46D] flex items-center justify-center mx-auto text-[#245B4A] font-serif text-2xl font-bold">
                DS
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#283447]">Devika Singhania, FGA</h4>
                <span className="text-xs text-[#C5A46D] font-medium block">Senior Gemologist & Solitaire Vault Director</span>
              </div>
              <p className="text-xs text-[#82796E] font-light leading-relaxed">
                Fellow of the Gemmological Association of Great Britain, hand-selecting triple excellent cut natural solitaires and rare unheated emeralds.
              </p>
            </div>

            <div className="bg-white border border-[#E7E2D9] p-6 rounded text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-[#FAF7F0] border border-[#C5A46D] flex items-center justify-center mx-auto text-[#245B4A] font-serif text-2xl font-bold">
                RS
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#283447]">Radhe Shyam Soni</h4>
                <span className="text-xs text-[#C5A46D] font-medium block">Chief Jadau & Kundan Artisan</span>
              </div>
              <p className="text-xs text-[#82796E] font-light leading-relaxed">
                Over 35 years master experience hand-setting syndicate Polki diamonds into pure 24K gold foil bezels for royal bridal trousseaus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
