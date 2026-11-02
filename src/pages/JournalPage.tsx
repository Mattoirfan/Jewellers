import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { Article } from '../types';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Sparkles, X } from 'lucide-react';

interface JournalPageProps {
  navigate: (route: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ navigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>The Aurelia Gazette</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#283447]">
            Editorial, Gemology & Style Guides
          </h1>
          <p className="text-sm md:text-base text-[#82796E] font-light mt-3 leading-relaxed">
            Essential education on BIS hallmarking regulations, GIA diamond 4Cs, bridal trousseau curation, and precious stone preservation.
          </p>
        </div>

        {/* Featured Journal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {JOURNAL_ARTICLES.map((art) => (
            <div
              key={art.slug}
              className="bg-white border border-[#E7E2D9] rounded-sm p-6 md:p-8 shadow-xs flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] text-[#C5A46D] font-semibold uppercase tracking-wider">
                  <span>{art.category}</span>
                  <span className="text-[#82796E] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readingTime}</span>
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#283447] leading-tight">
                  {art.title}
                </h2>

                <p className="text-xs text-[#82796E] leading-relaxed font-light">
                  {art.summary}
                </p>

                <div className="pt-2 text-[11px] text-[#245B4A] font-medium">
                  By {art.author} · {art.publishedAt}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E2D9]">
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="w-full py-2.5 bg-[#FAF7F0] border border-[#245B4A] text-[#245B4A] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#245B4A] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-[#E7E2D9] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 rounded-sm shadow-2xl space-y-6">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block">
                    {selectedArticle.category} · {selectedArticle.readingTime}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#283447] mt-1">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-xs text-[#82796E] mt-1">
                    By {selectedArticle.author} · Published {selectedArticle.publishedAt}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1 hover:text-[#B87878] text-[#82796E]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-[#283447] leading-relaxed font-light">
                {selectedArticle.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {selectedArticle.keyTakeaways && (
                <div className="p-5 bg-[#FAF7F0] border border-[#C5A46D]/40 rounded-sm space-y-2">
                  <h4 className="font-serif text-base font-bold text-[#245B4A]">
                    Key Takeaways & Collector Tips:
                  </h4>
                  <ul className="text-xs text-[#82796E] space-y-1.5 list-disc pl-4">
                    {selectedArticle.keyTakeaways.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-[#E7E2D9] flex justify-between items-center">
                <span className="text-xs text-[#82796E]">Published by Aurelia Editorial Bureau</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded font-medium"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
