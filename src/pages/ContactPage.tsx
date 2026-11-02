import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { BOUTIQUE_LOCATIONS } from '../data/mockData';

interface ContactPageProps {
  navigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Fine Jewellery Inquiry',
    message: '',
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Fine Jewellery Inquiry', message: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-2">
            VIP Salon Concierge
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#283447]">
            Connect with Our Jewellery Advisors
          </h1>
          <p className="text-xs md:text-sm text-[#82796E] font-light mt-2 leading-relaxed">
            Whether inquiring about a specific GIA solitaire, seeking customized wedding styling, or scheduling an in-salon viewing, our concierge is at your service.
          </p>
        </div>

        {/* 2-Column: Form Left, Boutique Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E7E2D9] p-6 md:p-10 rounded-sm shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-[#283447] mb-2">
              Send a Concierge Message
            </h2>
            <p className="text-xs text-[#82796E] mb-6">
              Inquiries are acknowledged within 2 business hours by our senior staff.
            </p>

            {sentSuccess ? (
              <div className="p-8 bg-[#FAF7F0] border border-[#245B4A] rounded text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-[#245B4A] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#245B4A]">Message Received</h3>
                <p className="text-xs text-[#82796E]">
                  A dedicated Aurelia client advisor will reach out to you directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kabir Kapoor"
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Nature of Inquiry</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  >
                    <option>General Fine Jewellery Inquiry</option>
                    <option>Bridal Trousseau Styling Consultation</option>
                    <option>Solitaire Diamond Inspection & GIA Verification</option>
                    <option>Bespoke Custom Commission Inquiry</option>
                    <option>Jewellery Care, Cleaning & Restoration</option>
                    <option>Corporate Gifting & High Bullion Orders</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any questions about designs, bullion pricing, or appointments..."
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Contacts (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#283447] border-b pb-3">
                Flagship Maison & VIP Lines
              </h3>

              <div className="space-y-3 text-xs text-[#283447]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">Mumbai Flagship Maison</strong>
                    <span className="text-[#82796E]">42, B.K. Boman Behram Marg, Colaba, Mumbai 400001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">Telephone Direct</strong>
                    <span className="text-[#82796E]">+91 (022) 2284 9100 / +91 98200 11223</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-[#245B4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">WhatsApp VIP Concierge</strong>
                    <span className="text-[#245B4A]">+91 98200 11223 (Instant Assistance)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">Email Dispatch</strong>
                    <span className="text-[#82796E]">concierge@aureliafinejewels.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">Atelier Hours</strong>
                    <span className="text-[#82796E]">Monday – Sunday: 11:00 AM – 8:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-xs space-y-2">
              <span className="font-serif text-sm font-bold text-[#245B4A] block">
                Boutique Showroom Network
              </span>
              <p className="text-[#82796E] leading-relaxed">
                Salons also operating in <strong>DLF Emporio (New Delhi)</strong>, <strong>Indiranagar (Bengaluru)</strong>, <strong>Dubai Mall (Fashion Avenue)</strong>, and <strong>Mayfair (London)</strong>.
              </p>
              <button
                onClick={() => navigate('/stores')}
                className="text-xs font-semibold text-[#C5A46D] hover:underline block pt-1"
              >
                View Full Boutique Directory →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
