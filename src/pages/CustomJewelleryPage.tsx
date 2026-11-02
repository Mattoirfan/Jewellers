import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Gem,
  PenTool,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface CustomJewelleryPageProps {
  navigate: (route: string) => void;
}

export const CustomJewelleryPage: React.FC<CustomJewelleryPageProps> = ({ navigate }) => {
  const { customRequests, submitCustomRequest, currentUser, formatPrice } = useApp();

  const [formData, setFormData] = useState<{
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    jewelleryType: string;
    preferredMetal: string;
    preferredGemstones: string;
    budgetRange: string;
    occasion: string;
    targetDate: string;
    sizeSpecification: string;
    notes: string;
    consultationMode: 'In-Store VIP Lounge' | 'Virtual Video Consultation' | 'WhatsApp Direct Concierge';
  }>({
    clientName: currentUser?.name || 'Aanya Sharma',
    clientEmail: currentUser?.email || 'aanya.sharma@example.com',
    clientPhone: '+91 98200 11223',
    jewelleryType: 'Custom Solitaire Engagement Ring',
    preferredMetal: '18K Yellow Gold with Platinum Basket',
    preferredGemstones: '1.5ct Cushion Cut D/VVS1 Diamond',
    budgetRange: '₹3,00,000 – ₹5,00,000',
    occasion: 'Engagement Proposal',
    targetDate: '2026-12-20',
    sizeSpecification: 'Indian Ring Size 14',
    notes: 'Looking for a hidden halo with delicate pavé petals under the centerpiece.',
    consultationMode: 'In-Store VIP Lounge',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCustomRequest(formData);
    setSubmitted(true);
  };

  const workflowStages = [
    { step: '01', title: 'Enquiry & Vision Brief', desc: 'Share your aesthetic preferences, metal, gemstones, and occasion.' },
    { step: '02', title: 'Consultation with Master Gemologist', desc: 'Meet in our private VIP salon or over high-definition video call.' },
    { step: '03', title: 'Photorealistic 3D CAD Render', desc: 'Inspect every millimeter from 360-degree angles before metal casting.' },
    { step: '04', title: 'Wax Prototype Trial', desc: 'Try a real resin mock-up in boutique to confirm proportions and finger fit.' },
    { step: '05', title: 'Quotation & Client Approval', desc: 'Itemized transparent breakdown based on exact metal weight and GIA dossier.' },
    { step: '06', title: 'Hand-Forging in Atelier', desc: 'Crafted over 80–140 hours by our master goldsmiths in Mumbai.' },
    { step: '07', title: 'BIS Hallmarking & Laser HUID', desc: 'Officially assayed and inscribed with a government-verified HUID.' },
    { step: '08', title: 'Armoured Delivery or Salon Unveiling', desc: 'Presented in our signature velvet box with physical certificates.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>The Aurelia Bespoke Atelier</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#283447] text-balance">
            Bespoke Creations Crafted for Your Story
          </h1>
          <p className="text-sm md:text-base text-[#82796E] font-light mt-3 leading-relaxed">
            From one-of-a-kind engagement rings to royal heirloom remodeling, our Senior Designers and Goldsmiths bring your dreams to immortal fruition.
          </p>
        </div>

        {/* 2-Column: Workflow Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: 8-Stage Process */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-2">
                Ethical & Transparent
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#283447] mb-6">
                The 8-Stage Bespoke Journey
              </h2>

              <div className="space-y-4">
                {workflowStages.map((st) => (
                  <div key={st.step} className="flex items-start gap-4 pb-4 border-b border-[#E7E2D9]/60 last:border-0 last:pb-0">
                    <span className="font-mono text-xs font-bold text-[#245B4A] bg-[#FAF7F0] px-2 py-1 rounded border border-[#E7E2D9]">
                      {st.step}
                    </span>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#283447]">{st.title}</h4>
                      <p className="text-xs text-[#82796E] font-light mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#245B4A] text-[#FAF7F0] rounded-sm border border-[#C5A46D]/40 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#E9D9B8] font-serif text-base font-semibold">
                <ShieldCheck className="w-5 h-5 text-[#C5A46D]" />
                <span>Our Bespoke Guarantee</span>
              </div>
              <p className="text-[#FAF7F0]/80 leading-relaxed font-light">
                No instant fabricated quotes. Final prices are calculated solely upon approved CAD specifications, verified metal weights, and certified loose stone selections.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Bespoke Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-md">
              <h3 className="font-serif text-2xl font-bold text-[#283447] mb-2">
                Initiate Your Bespoke Commission
              </h3>
              <p className="text-xs text-[#82796E] mb-6">
                Tell us about your desired jewellery piece. Our Senior Design Director will prepare preliminary sketches and schedule your consultation.
              </p>

              {submitted ? (
                <div className="p-8 bg-[#FAF7F0] border border-[#245B4A] rounded text-center space-y-4 animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-[#245B4A] mx-auto" />
                  <h4 className="font-serif text-2xl font-bold text-[#245B4A]">
                    Enquiry Registered Successfully
                  </h4>
                  <p className="text-xs text-[#82796E] max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.clientName}. A Senior Gemologist will review your brief and contact you within 24 hours to confirm your consultation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded font-medium"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Jewellery Category</label>
                      <select
                        value={formData.jewelleryType}
                        onChange={(e) => setFormData({ ...formData, jewelleryType: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-xs"
                      >
                        <option>Custom Solitaire Engagement Ring</option>
                        <option>Royal Polki & Emerald Bridal Choker</option>
                        <option>Heirloom Diamond Tennis Bracelet</option>
                        <option>Personalized Initial / Name Pendant</option>
                        <option>Antique Heritage Remodeling</option>
                        <option>Men’s Signet Ring or Chain</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Metal Preference</label>
                      <select
                        value={formData.preferredMetal}
                        onChange={(e) => setFormData({ ...formData, preferredMetal: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-xs"
                      >
                        <option>22K (916) Yellow Gold</option>
                        <option>18K (750) Yellow Gold</option>
                        <option>18K Rose Gold</option>
                        <option>18K White Gold</option>
                        <option>Solid Platinum 950</option>
                        <option>Mixed Metal (Platinum + Gold)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Estimated Budget Range</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-xs"
                      >
                        <option>₹1,50,000 – ₹3,00,000</option>
                        <option>₹3,00,000 – ₹5,00,000</option>
                        <option>₹5,00,000 – ₹10,00,000</option>
                        <option>₹10,00,000 – ₹25,00,000</option>
                        <option>₹25,00,000+ (High Joaillerie Suite)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Target Delivery Date</label>
                      <input
                        type="date"
                        required
                        value={formData.targetDate}
                        onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Preferred Consultation Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['In-Store VIP Lounge', 'Virtual Video Consultation', 'WhatsApp Direct Concierge'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFormData({ ...formData, consultationMode: mode })}
                          className={`p-2 rounded text-center border transition-colors ${
                            formData.consultationMode === mode
                              ? 'border-[#245B4A] bg-[#245B4A] text-white font-medium'
                              : 'border-[#E7E2D9] text-[#283447] hover:bg-[#FAF7F0]'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Design Notes & Inscription Wishes</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Describe preferred shapes, sentimental inspirations, or specific heirloom stones to incorporate..."
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors shadow-md"
                  >
                    Submit Bespoke Commission Brief →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Existing Active Requests for Authenticated Patron */}
        {customRequests.length > 0 && (
          <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#283447] mb-4">
              Your Active Bespoke Inquiries
            </h3>
            <div className="space-y-4">
              {customRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <strong className="text-sm font-serif text-[#245B4A]">{req.jewelleryType}</strong>
                      <span className="font-mono text-[10px] text-[#82796E]">({req.createdAt})</span>
                    </div>
                    <p className="text-[#82796E]">{req.preferredMetal} · Budget: {req.budgetRange}</p>
                    <p className="text-[#82796E] italic mt-0.5">"{req.notes}"</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block bg-[#245B4A] text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                      Status: {req.status}
                    </span>
                    {req.estimatedQuote && (
                      <span className="block font-mono text-xs font-bold text-[#283447] mt-1">
                        Est: {formatPrice(req.estimatedQuote)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
