import React, { useState } from 'react';
import { DEMO_REVIEWS } from '../data/mockData';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { Review } from '../types';

interface ReviewsPageProps {
  navigate: (route: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ navigate }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(DEMO_REVIEWS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newReview, setNewReview] = useState({
    authorName: '',
    city: '',
    rating: 5,
    title: '',
    comment: '',
    productName: 'Aurelia Royal Heritage Filigree Haar',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Review = {
      id: `rev-${Date.now()}`,
      authorName: newReview.authorName,
      city: newReview.city,
      rating: newReview.rating,
      date: 'Today',
      title: newReview.title,
      comment: newReview.comment,
      isVerifiedPurchase: true,
      productName: newReview.productName,
    };
    setReviewsList([created, ...reviewsList]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setNewReview({ authorName: '', city: '', rating: 5, title: '', comment: '', productName: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-2">
            Patron Reflections
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#283447]">
            Verified Customer Reviews
          </h1>
          <p className="text-xs md:text-sm text-[#82796E] mt-2 italic font-serif">
            (Demo customer feedback reflecting real salon consultations, BIS HUID verifications, and custom commissions)
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="font-serif text-5xl font-bold text-[#245B4A]">4.95</span>
              <div className="flex items-center justify-center gap-1 text-[#C5A46D] my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A46D]" />
                ))}
              </div>
              <span className="text-[11px] text-[#82796E]">Based on 342 verified reviews</span>
            </div>
            <div className="h-16 w-px bg-[#E7E2D9] hidden sm:block" />
            <div className="text-xs text-[#82796E] space-y-1 hidden sm:block">
              <div className="flex items-center gap-2">
                <span>5 Stars</span>
                <div className="w-32 bg-[#FAF7F0] h-2 rounded overflow-hidden border">
                  <div className="bg-[#245B4A] h-full w-[94%]" />
                </div>
                <span>94%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4 Stars</span>
                <div className="w-32 bg-[#FAF7F0] h-2 rounded overflow-hidden border">
                  <div className="bg-[#245B4A] h-full w-[6%]" />
                </div>
                <span>6%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-6 py-3 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#1C4537] transition-colors flex items-center gap-2 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Client Review</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E2D9]/60 pb-3">
                <div>
                  <div className="flex items-center gap-1 text-[#C5A46D] mb-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A46D]" />
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#283447]">
                    "{rev.title}"
                  </h3>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <strong className="text-[#283447] font-medium block">{rev.authorName}</strong>
                  <span className="text-[#82796E] text-[11px]">{rev.city} · {rev.date}</span>
                </div>
              </div>

              <p className="text-xs text-[#82796E] leading-relaxed font-light">
                {rev.comment}
              </p>

              {rev.productName && (
                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-[#C5A46D] font-medium">Purchased: {rev.productName}</span>
                  {rev.isVerifiedPurchase && (
                    <span className="font-mono text-[#245B4A] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Patron</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Review Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-[#E7E2D9] max-w-md w-full p-6 rounded-sm shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-serif text-xl font-bold text-[#283447]">Share Your Experience</h3>
                <button onClick={() => setShowSubmitModal(false)} className="text-sm font-bold">✕</button>
              </div>

              {submitSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#245B4A] mx-auto" />
                  <p className="font-serif text-lg font-bold text-[#245B4A]">Review Published!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReview.authorName}
                      onChange={(e) => setNewReview({ ...newReview, authorName: e.target.value })}
                      placeholder="e.g. Radhika M."
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newReview.city}
                      onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                      placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Review Headline</label>
                    <input
                      type="text"
                      required
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      placeholder="Summary of your experience..."
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Your Detailed Feedback</label>
                    <textarea
                      rows={3}
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Tell us about the craftsmanship, hallmarking, or consultation..."
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#1C4537]"
                  >
                    Post Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
