import React, { useState } from 'react';
import { BOUTIQUE_LOCATIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface StoresPageProps {
  navigate: (route: string) => void;
}

export const StoresPage: React.FC<StoresPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>The Aurelia Salons</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#283447]">
            Our Boutiques & Private Lounges
          </h1>
          <p className="text-sm md:text-base text-[#82796E] font-light mt-3 leading-relaxed">
            Experience our high jewellery collections in person. Each maison features dedicated private VIP bridal salons and resident Senior Gemologists.
          </p>
        </div>

        {/* Boutiques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BOUTIQUE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-[#E7E2D9] rounded-sm p-6 md:p-8 shadow-xs flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[#C5A46D] font-bold uppercase tracking-widest block">
                  {store.city} Maison
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#283447] leading-tight">
                  {store.name}
                </h3>
                <p className="text-xs text-[#82796E] leading-relaxed font-light">
                  {store.address}
                </p>

                <div className="space-y-2 text-xs text-[#283447] pt-2 border-t border-[#E7E2D9]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                    <span className="truncate">{store.email}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#82796E] block mb-1.5">
                    Available Salon Services:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {store.services.map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] bg-[#FAF7F0] border border-[#E7E2D9] px-2 py-0.5 rounded text-[#283447]"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E2D9]">
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="w-full py-2.5 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#1C4537] transition-colors"
                >
                  Book Private Salon Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BookAppointmentPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { bookAppointment, appointments, currentUser } = useApp();

  const [formData, setFormData] = useState({
    customerName: currentUser?.name || 'Aanya Sharma',
    customerEmail: currentUser?.email || 'aanya.sharma@example.com',
    customerPhone: '+91 98200 11223',
    storeLocation: 'Aurelia Flagship Colaba Maison, Mumbai',
    serviceType: 'Bridal Trousseau Consultation' as const,
    date: '2026-11-15',
    timeSlot: '03:00 PM – 04:30 PM',
    notes: 'Looking for a matching uncut polki choker and bridal matha patti.',
  });

  const [confirmedAppt, setConfirmedAppt] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appt = bookAppointment(formData);
    setConfirmedAppt(appt.appointmentNumber);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>VIP Salon Concierge</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-[#283447]">
            Schedule Your Private Consultation
          </h1>
          <p className="text-xs md:text-sm text-[#82796E] font-light mt-2 leading-relaxed">
            Reserve dedicated time with our Senior Master Gemologists in our private salon suites with champagne service.
          </p>
        </div>

        <div className="bg-white border border-[#E7E2D9] p-6 md:p-10 rounded-sm shadow-md">
          {confirmedAppt ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
              <CheckCircle2 className="w-14 h-14 text-[#245B4A] mx-auto" />
              <h2 className="font-serif text-3xl font-bold text-[#245B4A]">
                Appointment Confirmed: #{confirmedAppt}
              </h2>
              <p className="text-xs text-[#82796E] max-w-md mx-auto leading-relaxed">
                Thank you, {formData.customerName}. Your appointment at <strong>{formData.storeLocation}</strong> on <strong>{formData.date} at {formData.timeSlot}</strong> is locked in our master salon calendar.
              </p>
              <div className="flex gap-3 justify-center pt-4">
                <button
                  onClick={() => navigate('/account')}
                  className="px-6 py-2.5 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded"
                >
                  View in Client Dashboard
                </button>
                <button
                  onClick={() => setConfirmedAppt(null)}
                  className="px-6 py-2.5 border border-[#E7E2D9] text-xs uppercase tracking-wider rounded"
                >
                  Schedule Another Visit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Your Name</label>
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
                  <label className="font-semibold text-[#283447] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Boutique Location</label>
                  <select
                    value={formData.storeLocation}
                    onChange={(e) => setFormData({ ...formData, storeLocation: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  >
                    <option>Aurelia Flagship Colaba Maison, Mumbai</option>
                    <option>Aurelia Emporio Atelier, DLF Emporio, New Delhi</option>
                    <option>Aurelia Indiranagar Boutique, Bengaluru</option>
                    <option>Aurelia Dubai Mall Fashion Avenue, Dubai</option>
                    <option>Aurelia Mayfair Salon, London</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Service Required</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  >
                    <option>Bridal Trousseau Consultation</option>
                    <option>Solitaire Diamond Viewing</option>
                    <option>Bespoke Custom Design</option>
                    <option>Jewellery Appraisal & Care</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Time Slot</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                  >
                    <option>11:30 AM – 01:00 PM</option>
                    <option>01:30 PM – 03:00 PM</option>
                    <option>03:00 PM – 04:30 PM</option>
                    <option>05:00 PM – 06:30 PM</option>
                    <option>07:00 PM – 08:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#283447] block mb-1">Special Preferences / Family Guests</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share any specific collection pieces you wish to preview, or if family members are joining..."
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors shadow-md"
              >
                Confirm Salon Reservation →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
