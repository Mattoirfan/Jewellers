import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface JewelleryCarePageProps {
  navigate: (route: string) => void;
}

export const JewelleryCarePage: React.FC<JewelleryCarePageProps> = ({ navigate }) => {
  const { repairRequests, submitRepairRequest, currentUser } = useApp();

  const [formData, setFormData] = useState({
    customerName: currentUser?.name || 'Aanya Sharma',
    customerEmail: currentUser?.email || 'aanya.sharma@example.com',
    customerPhone: '+91 98200 11223',
    itemType: 'Gold Heritage Ring',
    serviceType: 'Prong & Stone Tightening' as const,
    issueDescription: 'Center gemstone feels slightly loose; would like inspection and re-tipping.',
    preferredStore: 'Aurelia Flagship Colaba Maison, Mumbai',
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = submitRepairRequest(formData);
    setSubmittedTicket(created.ticketNumber);
  };

  const services = [
    {
      title: 'Ultrasonic Bath & Steam Polishing',
      desc: 'Removes micro-oils and restores mirror-finish metallic brilliance. Complimentary for all Aurelia creations.',
      turnaround: 'Same-day (45 mins in salon)',
    },
    {
      title: 'Ring Resizing & Sizing Beads',
      desc: 'Up to 2 sizes up or down using laser micro-welding with matching gold purity and intact hallmarking.',
      turnaround: '2–3 business days',
    },
    {
      title: 'Prong Tightening & Stone Replacement',
      desc: 'Inspection under 40x gemological microscopes to retip worn gold claws and secure diamonds.',
      turnaround: '3–5 business days',
    },
    {
      title: 'Clasp, Lock & Chain Hinge Repair',
      desc: 'Reinforcement of figure-8 safety clasps, Bombay screw locks, and Cuban link hinges.',
      turnaround: '1–2 business days',
    },
    {
      title: 'Basra & Akoya Pearl Restringing',
      desc: 'Individual hand-knotting on Japanese pure silk thread with reinforced french wire terminals.',
      turnaround: '3 business days',
    },
    {
      title: 'Heritage Heirloom Restoration',
      desc: 'Careful preservation of ancestral Jadau Kundan and antique gold filigree requiring delicate restorative chasing.',
      turnaround: '7–14 business days',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <Wrench className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>The Aurelia Care & Restoration Atelier</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#283447]">
            Jewellery Care, Servicing & Restoration
          </h1>
          <p className="text-sm md:text-base text-[#82796E] font-light mt-3 leading-relaxed">
            Ensure your heirloom jewellery endures for generations. Our master goldsmiths perform specialized cleaning, prong inspections, sizing, and restorative conservation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-[#C5A46D] font-bold block mb-1">
                  SERVICE 0{idx + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#283447] mb-2">{srv.title}</h3>
                <p className="text-xs text-[#82796E] font-light leading-relaxed mb-4">{srv.desc}</p>
              </div>
              <div className="pt-3 border-t border-[#E7E2D9] flex items-center justify-between text-[11px] text-[#245B4A] font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Est. Time:</span>
                </span>
                <span className="font-mono">{srv.turnaround}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column: Form & Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Repair Request Form */}
          <div className="lg:col-span-7 bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#283447] mb-2">
              Book a Service or Inspection
            </h3>
            <p className="text-xs text-[#82796E] mb-6">
              Drop off your jewel at any Aurelia boutique or request an insured collection kit.
            </p>

            {submittedTicket ? (
              <div className="p-8 bg-[#FAF7F0] border border-[#245B4A] rounded text-center space-y-4 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-[#245B4A] mx-auto" />
                <h4 className="font-serif text-2xl font-bold text-[#245B4A]">
                  Service Ticket #{submittedTicket} Created
                </h4>
                <p className="text-xs text-[#82796E] max-w-sm mx-auto leading-relaxed">
                  Your request is logged. Please bring this ticket number to your selected boutique or hand it to our authorized armoured courier.
                </p>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="px-6 py-2.5 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded font-medium"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Customer Name</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Jewellery Article Type</label>
                    <input
                      type="text"
                      required
                      value={formData.itemType}
                      onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                      placeholder="e.g. 22K Gold Bangles, Solitaire Ring"
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Requested Service</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                    >
                      <option>Ultrasonic Cleaning & Polishing</option>
                      <option>Ring Resizing</option>
                      <option>Clasp / Lock Repair</option>
                      <option>Prong & Stone Tightening</option>
                      <option>Pearl Restringing</option>
                      <option>Full Heritage Restoration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Preferred Boutique for Drop-off</label>
                  <select
                    value={formData.preferredStore}
                    onChange={(e) => setFormData({ ...formData, preferredStore: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  >
                    <option>Aurelia Flagship Colaba Maison, Mumbai</option>
                    <option>Aurelia Emporio Atelier, DLF Emporio, New Delhi</option>
                    <option>Aurelia Indiranagar Boutique, Bengaluru</option>
                    <option>Aurelia Dubai Mall Fashion Avenue, Dubai</option>
                    <option>Aurelia Mayfair Salon, London</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Description of Issue</label>
                  <textarea
                    rows={3}
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  />
                </div>

                <div className="p-3 bg-[#FAF7F0] rounded border border-[#E7E2D9] text-[11px] text-[#82796E]">
                  <strong>Notice:</strong> Services, exact turnaround times, and estimated metal restoration fees depend on our physical metallurgical inspection. We never promise that severely degraded antique metals can be repaired without prior testing.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors"
                >
                  Generate Service Request Ticket →
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Active Tickets & Preservation Guide */}
          <div className="lg:col-span-5 space-y-6">
            {repairRequests.length > 0 && (
              <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs">
                <h4 className="font-serif text-lg font-bold text-[#283447] mb-3">
                  Your Open Care Tickets
                </h4>
                <div className="space-y-3">
                  {repairRequests.map((r) => (
                    <div key={r.id} className="p-3 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-xs space-y-1">
                      <div className="flex justify-between font-mono">
                        <strong className="text-[#245B4A]">{r.ticketNumber}</strong>
                        <span className="text-[#82796E]">{r.createdAt}</span>
                      </div>
                      <p className="font-medium text-[#283447]">{r.serviceType} — {r.itemType}</p>
                      <span className="inline-block bg-[#245B4A] text-white text-[10px] px-2 py-0.5 rounded font-mono">
                        Status: {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-4 text-xs">
              <h4 className="font-serif text-lg font-bold text-[#283447]">
                Daily Preservation Rules
              </h4>
              <ul className="space-y-2 text-[#82796E] list-disc pl-4 leading-relaxed">
                <li>
                  <strong>Perfumes & Cosmetics:</strong> Always put fine jewellery on <em>after</em> hairspray, lotion, and perfume have settled.
                </li>
                <li>
                  <strong>Chlorine Warning:</strong> Never wear gold in swimming pools or hot tubs; chlorine erodes gold alloy grain boundaries.
                </li>
                <li>
                  <strong>Storage:</strong> Store each piece in its dedicated velvet-lined pouch to avoid diamond edges scratching gold surfaces.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
