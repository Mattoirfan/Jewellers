import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#245B4A] text-[#FAF7F0] border-t-2 border-[#C5A46D]/40">
      {/* 1. BRAND TRUST & EXCELLENCE PILLARS */}
      <div className="border-b border-[#C5A46D]/20 py-10 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#1C4537] border border-[#C5A46D]/30 text-[#C5A46D] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold tracking-wide text-[#E9D9B8]">
                100% BIS Hallmarked with HUID
              </h4>
              <p className="text-xs text-[#FAF7F0]/80 mt-1 leading-relaxed">
                Every gold jewel is legally verified by the Bureau of Indian Standards with a laser-inscribed 6-digit alphanumeric HUID.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#1C4537] border border-[#C5A46D]/30 text-[#C5A46D] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold tracking-wide text-[#E9D9B8]">
                GIA & IGI Certified Diamonds
              </h4>
              <p className="text-xs text-[#FAF7F0]/80 mt-1 leading-relaxed">
                All solitaires are graded for 4Cs with matching microscopic girdle inscriptions verified against international dossiers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#1C4537] border border-[#C5A46D]/30 text-[#C5A46D] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold tracking-wide text-[#E9D9B8]">
                Insured Armoured Transit
              </h4>
              <p className="text-xs text-[#FAF7F0]/80 mt-1 leading-relaxed">
                Discreet, tamper-evident security packaging delivered via specialized armored logistics with 100% in-transit insurance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#1C4537] border border-[#C5A46D]/30 text-[#C5A46D] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold tracking-wide text-[#E9D9B8]">
                Lifetime Exchange & Buyback
              </h4>
              <p className="text-xs text-[#FAF7F0]/80 mt-1 leading-relaxed">
                100% prevailing metal value on exchange and 90% benchmark diamond market value backed by transparent appraisal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NEWSLETTER & VIP SALON INVITATION */}
      <div className="py-12 px-4 md:px-8 border-b border-[#C5A46D]/20 bg-[#1E4D3E]">
        <div className="max-w-[960px] mx-auto text-center">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#C5A46D] block mb-2 font-medium">
            The Aurelia Private Circle
          </span>
          <h3 className="font-serif text-2xl md:text-4xl text-white font-normal mb-3">
            Receive Invitations to High Jewellery Previews
          </h3>
          <p className="text-sm text-[#FAF7F0]/80 max-w-xl mx-auto mb-6 font-light">
            Be the first to view limited edition heritage sets, private bridal trunk shows, and quarterly bullion market insights.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-[#245B4A] border border-[#C5A46D]/60 p-4 rounded-md max-w-md mx-auto text-sm text-[#E9D9B8]">
              Thank you for subscribing to the Aurelia Private Circle. Your welcome gift and invitation will arrive in your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full sm:w-80 px-4 py-3 bg-[#FAF7F0] text-[#283447] text-sm rounded focus:outline-none placeholder:text-[#82796E]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#C5A46D] text-[#283447] text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#E9D9B8] transition-colors whitespace-nowrap"
              >
                Join Circle
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. SITE DIRECTORY & SERVICES */}
      <div className="py-16 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" showTagline />
            <p className="text-xs text-[#FAF7F0]/80 leading-relaxed max-w-sm mt-3 font-light">
              Crafted in Mumbai, celebrated worldwide. Aurelia Fine Jewels creates timeless heirloom creations where generational gold-chasing meets contemporary architectural elegance.
            </p>
            <div className="pt-2 text-xs space-y-2 text-[#E9D9B8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Flagship Maison: 42 B.K. Boman Behram Marg, Colaba, Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>VIP Concierge: +91 (022) 2284 9100 / +91 98200 11223</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>concierge@aureliafinejewels.com</span>
              </div>
            </div>
          </div>

          {/* Col 1: Collections */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-[#E9D9B8] mb-4 uppercase">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/80 font-light">
              <li>
                <button onClick={() => navigate('/collections/gold')} className="hover:text-[#E9D9B8] transition-colors">
                  22K & 18K Gold Jewellery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/collections/diamond')} className="hover:text-[#E9D9B8] transition-colors">
                  GIA Solitaires & Diamonds
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/collections/bridal')} className="hover:text-[#E9D9B8] transition-colors">
                  Royal Bridal Trousseau
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/collections')} className="hover:text-[#E9D9B8] transition-colors">
                  Heritage Polki & Kundan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/collections')} className="hover:text-[#E9D9B8] transition-colors">
                  Untreated Precious Gemstones
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/collections')} className="hover:text-[#E9D9B8] transition-colors">
                  Everyday Luxe & Tennis Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/collections')} className="hover:text-[#E9D9B8] transition-colors">
                  Men’s Fine Chains & Rings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Atelier & Services */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-[#E9D9B8] mb-4 uppercase">
              Atelier & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/80 font-light">
              <li>
                <button onClick={() => navigate('/custom-jewellery')} className="hover:text-[#E9D9B8] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C5A46D]" />
                  <span>Bespoke Commission Studio</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/jewellery-care')} className="hover:text-[#E9D9B8] transition-colors">
                  Cleaning, Resizing & Repair
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/price-guide')} className="hover:text-[#E9D9B8] transition-colors">
                  Live Gold Rate Transparency Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/book-appointment')} className="hover:text-[#E9D9B8] transition-colors">
                  Book Boutique Consultation
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/stores')} className="hover:text-[#E9D9B8] transition-colors">
                  Find Boutiques (Mumbai, Delhi, Dubai)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/journal')} className="hover:text-[#E9D9B8] transition-colors">
                  The Aurelia Gazette (Journal)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care & Policies */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-[#E9D9B8] mb-4 uppercase">
              Client Care & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/80 font-light">
              <li>
                <button onClick={() => navigate('/track-order')} className="hover:text-[#E9D9B8] transition-colors">
                  Track Insured Order
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-[#E9D9B8] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/reviews')} className="hover:text-[#E9D9B8] transition-colors">
                  Verified Client Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#E9D9B8] transition-colors">
                  About Aurelia Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#E9D9B8] transition-colors">
                  Contact Customer Concierge
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="text-[#C5A46D] hover:underline transition-colors">
                  Staff Admin Portal
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. LEGAL COMPLIANCE & BIS HALLMARKING DISCLOSURE */}
      <div className="border-t border-[#C5A46D]/20 py-8 px-4 md:px-8 bg-[#1B3E32] text-[11px] text-[#FAF7F0]/70 font-light leading-relaxed">
        <div className="max-w-[1440px] mx-auto space-y-3">
          <p>
            <strong>Statutory Compliance & Hallmarking Disclosure:</strong> Aurelia Fine Jewels operates in strict compliance with the Bureau of Indian Standards (Hallmarking) Regulations, 2018, and Consumer Protection (E-Commerce) Rules, 2020. All gold articles sold are 100% hallmarked with the BIS triangular logo, certified karat purity/fineness mark (22K916 / 18K750), and unique laser-inscribed 6-digit Hallmark Unique Identification (HUID). Customers may independently verify authenticity via the official BIS CARE mobile application.
          </p>
          <p>
            Natural solitaire diamonds above 0.30 carats include original physical grading reports issued by GIA (Gemological Institute of America) or IGI (International Gemological Institute) with microscopic girdle laser inscriptions. Gold bullion rates displayed are benchmarked against the daily reference rates published by the India Bullion and Jewellers Association (IBJA).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#C5A46D]/15 text-[#E9D9B8]/80 text-xs">
            <p>© {new Date().getFullYear()} Aurelia Fine Jewels Private Limited. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span className="hover:text-white cursor-pointer" onClick={() => navigate('/faq')}>Privacy Policy</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer" onClick={() => navigate('/faq')}>Terms of Purchase</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer" onClick={() => navigate('/faq')}>Hallmarking Assurance</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer" onClick={() => navigate('/price-guide')}>IBJA Rate Disclosure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
