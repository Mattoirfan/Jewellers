import React, { useState, useMemo } from 'react';
import { FAQS_LIST } from '../data/mockData';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQPageProps {
  navigate: (route: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const categories = ['All', 'Purity & Hallmarking', 'Pricing & Making Charges', 'Shipping & Insurance', 'Custom & Bespoke', 'Returns, Exchanges & Buyback', 'Care & Maintenance'];

  const filteredFaqs = useMemo(() => {
    return FAQS_LIST.filter((faq) => {
      if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Client Knowledge Base</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#283447]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs md:text-sm text-[#82796E] font-light mt-2 leading-relaxed">
            Everything you need to know about BIS hallmarking, GIA diamond reports, insured armoured transit, and bespoke commissions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-[#E7E2D9] p-3 rounded-sm mb-8 shadow-xs flex items-center gap-3">
          <Search className="w-5 h-5 text-[#82796E]" />
          <input
            type="text"
            placeholder="Search FAQs by keywords (e.g. HUID, GST, buyback, sizing, insured shipping)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs focus:outline-none text-[#283447]"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#245B4A] text-white font-medium'
                  : 'bg-white border border-[#E7E2D9] text-[#283447] hover:bg-[#FAF7F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 text-center text-xs text-[#82796E] rounded border border-[#E7E2D9]">
              No matching answers found for "{searchQuery}". Contact our VIP Concierge directly.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E7E2D9] rounded-sm overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-[#FAF7F0] transition-colors"
                  >
                    <span className="font-serif text-base font-semibold text-[#283447]">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C5A46D] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#82796E] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#82796E] leading-relaxed border-t border-[#E7E2D9]/60 font-light">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
