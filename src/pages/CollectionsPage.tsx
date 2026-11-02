import React from 'react';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

interface CollectionsPageProps {
  navigate: (route: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ navigate }) => {
  const collectionCards = [
    {
      slug: 'gold',
      title: '22K & 18K Heritage Gold',
      subtitle: 'Imperial Chokers, Filigree Haars & Antique Kadas',
      description: 'Masterpieces forged from certified 916 gold. Hand-chased floral repoussé and temple artwork carrying authentic BIS Hallmarks with laser HUID.',
      visualType: 'necklace-gold' as const,
      piecesCount: '24 Creations',
    },
    {
      slug: 'diamond',
      title: 'GIA & IGI Diamond Solitaires',
      subtitle: 'Triple Excellent Cuts, Pavé Bands & High Jewellery',
      description: 'Rare natural diamonds cradled in platinum and 18K gold baskets. Flawless optical clarity, color integrity, and verifiable girdle inscriptions.',
      visualType: 'ring-diamond' as const,
      piecesCount: '18 Creations',
    },
    {
      slug: 'bridal',
      title: 'Royal Bridal Trousseau',
      subtitle: 'Uncut Syndicate Polki & Colombian Emeralds',
      description: 'Regal wedding suites inspired by Rajput and Mughal courts. Grand chokers, matching chandelier jhumkis, matha pattis, and haathphools.',
      visualType: 'bridal-polki' as const,
      piecesCount: '12 Curated Suites',
    },
    {
      slug: 'solitaire',
      title: 'Engagement & Solitaires',
      subtitle: 'Cathedral Mounts, Halo Settings & Master Cuts',
      description: 'Celebrate lifetime vows with timeless 1.0ct to 5.0ct certified round, oval, and cushion solitaire diamond rings with complimentary resizing.',
      visualType: 'ring-diamond' as const,
      piecesCount: '14 Designs',
    },
    {
      slug: 'gemstones',
      title: 'Untreated Precious Gemstones',
      subtitle: 'Burmese Rubies, Ceylon Sapphires & Emeralds',
      description: 'Unheated, certified color gemstones set in sculptural platinum and gold settings designed to showcase natural crystal saturation.',
      visualType: 'ring-gemstone' as const,
      piecesCount: '16 Statement Pieces',
    },
    {
      slug: 'everyday',
      title: 'Everyday Luxe & Akoya Pearls',
      subtitle: '925 Sterling Silver, Tennis Bracelets & Pearl Strands',
      description: 'Refined minimalism for daily grace. Rhodium-protected silver tennis bracelets, layering chains, and hand-knotted Japanese pearl strands.',
      visualType: 'silver-bracelet' as const,
      piecesCount: '22 Daily Essentials',
    },
    {
      slug: 'mens-luxe',
      title: "Men's Fine Jewellery",
      subtitle: '18K Gold Cuban Links, Signet Rings & Cufflinks',
      description: 'Substantial solid 18K gold chains, beveled curb links, and diamond signet rings crafted with masculine architectural proportions.',
      visualType: 'mens-chain' as const,
      piecesCount: '9 Masterworks',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>The Aurelia Vaults</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#283447] text-balance">
            All Fine Jewellery Collections
          </h1>
          <p className="text-sm md:text-base text-[#82796E] font-light mt-3 leading-relaxed">
            Every creation is individually designed, weight-verified, and hallmarked. Discover our signature vaults below or filter across our complete inventory.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionCards.map((col) => (
            <div
              key={col.slug}
              onClick={() => navigate(`/collections/${col.slug}`)}
              className="group bg-white border border-[#E7E2D9] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="p-6">
                <JewelleryVisual type={col.visualType} aspectRatio="4:3" className="mb-6 rounded-xs" />
                <div className="flex items-center justify-between text-[11px] text-[#C5A46D] font-semibold uppercase tracking-wider mb-1">
                  <span>{col.subtitle}</span>
                  <span className="font-mono text-[#82796E]">{col.piecesCount}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#283447] group-hover:text-[#245B4A] transition-colors">
                  {col.title}
                </h2>
                <p className="text-xs text-[#82796E] mt-2.5 font-light leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="px-6 py-4 bg-[#FAF7F0] border-t border-[#E7E2D9] flex items-center justify-between text-xs font-semibold text-[#245B4A]">
                <span>Browse {col.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#C5A46D]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke Banner */}
        <div className="mt-16 bg-[#245B4A] text-[#FAF7F0] p-8 md:p-12 rounded-sm border border-[#C5A46D]/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D]">
              Bespoke Commission
            </span>
            <h3 className="font-serif text-3xl font-normal text-white">
              Seeking a Specific Design or Heirloom Remodeling?
            </h3>
            <p className="text-xs text-[#FAF7F0]/80 font-light leading-relaxed">
              Our master goldsmiths can transform your vision or family gemstones into a modern heirloom with 3D CAD renders and bespoke quotations.
            </p>
          </div>
          <button
            onClick={() => navigate('/custom-jewellery')}
            className="px-8 py-3.5 bg-[#C5A46D] text-[#283447] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#E9D9B8] transition-colors whitespace-nowrap shadow-md"
          >
            Start Custom Request
          </button>
        </div>
      </div>
    </div>
  );
};
