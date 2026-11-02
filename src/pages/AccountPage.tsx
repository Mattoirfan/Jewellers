import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import {
  Package,
  Sparkles,
  Wrench,
  Calendar,
  Heart,
  User,
  MapPin,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface AccountPageProps {
  navigate: (route: string) => void;
  defaultTab?: string;
}

export const AccountPage: React.FC<AccountPageProps> = ({ navigate, defaultTab = 'orders' }) => {
  const {
    currentUser,
    logout,
    orders,
    customRequests,
    repairRequests,
    appointments,
    wishlist,
    products,
    formatPrice,
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F0] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm text-center max-w-md w-full space-y-4">
          <User className="w-12 h-12 text-[#245B4A] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#283447]">Patron Authentication Required</h2>
          <p className="text-xs text-[#82796E]">
            Please sign in to view your orders, insured tracking, and bespoke custom commissions.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded"
          >
            Sign In to Aurelia Circle
          </button>
        </div>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Profile Welcome Banner */}
        <div className="bg-white border border-[#E7E2D9] rounded-sm p-6 md:p-8 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F0] border border-[#C5A46D] flex items-center justify-center text-[#245B4A] font-serif text-2xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#283447]">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-mono bg-[#FAF7F0] text-[#245B4A] px-2 py-0.5 border border-[#E7E2D9] rounded font-semibold uppercase">
                  {currentUser.role === 'admin' ? 'Atelier Director' : 'Privilege Patron'}
                </span>
              </div>
              <p className="text-xs text-[#82796E]">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-[#245B4A] text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                Atelier Console
              </button>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 border border-[#E7E2D9] text-[#B87878] hover:bg-[#FAF7F0] text-xs font-medium rounded flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[#E7E2D9] mb-8 overflow-x-auto gap-2">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'custom', label: `Custom Jewellery (${customRequests.length})`, icon: Sparkles },
            { id: 'repairs', label: `Care & Repair (${repairRequests.length})`, icon: Wrench },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#245B4A] text-[#245B4A]'
                    : 'border-transparent text-[#82796E] hover:text-[#283447]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#C5A46D]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white border border-[#E7E2D9] p-8 text-center rounded text-xs text-[#82796E]">
                No orders registered yet. Explore our vaults to place your first order.
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white border border-[#E7E2D9] rounded-sm p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E2D9] gap-2 text-xs">
                    <div>
                      <span className="font-mono text-[#82796E] block">
                        Order #{ord.orderNumber} · Placed {ord.createdAt}
                      </span>
                      <span className="font-mono text-[11px] text-[#245B4A]">
                        Carrier: {ord.courierPartner} (AWB: {ord.trackingNumber})
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="inline-block bg-[#FAF7F0] border border-[#245B4A] text-[#245B4A] text-xs font-semibold px-2.5 py-1 rounded">
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div>
                          <strong className="font-serif text-sm text-[#283447]">{it.product.name}</strong>
                          <span className="text-[#82796E] block text-[11px]">
                            Qty: {it.quantity} · Purity: {it.product.purity} · Net Gold: {it.product.netMetalWeightGrams}g
                          </span>
                        </div>
                        <span className="font-mono font-bold text-[#245B4A]">
                          {formatPrice(it.unitPrice * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#E7E2D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-[#82796E]">
                      Delivery Address: {ord.shippingAddress.street}, {ord.shippingAddress.city}
                    </span>
                    <button
                      onClick={() => navigate('/track-order')}
                      className="px-4 py-2 bg-[#245B4A] text-white text-xs font-medium rounded uppercase tracking-wider hover:bg-[#1C4537]"
                    >
                      Track Consignment →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Custom Jewellery Enquiries */}
        {activeTab === 'custom' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif text-xl font-bold text-[#283447]">Bespoke Commissions</h3>
              <button
                onClick={() => navigate('/custom-jewellery')}
                className="px-4 py-2 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded"
              >
                + New Bespoke Brief
              </button>
            </div>

            {customRequests.map((req) => (
              <div key={req.id} className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#283447]">{req.jewelleryType}</h4>
                    <span className="text-[#82796E]">Target Date: {req.targetDate} · Occasion: {req.occasion}</span>
                  </div>
                  <span className="bg-[#245B4A] text-white px-2.5 py-1 rounded font-semibold text-[10px] uppercase">
                    Stage: {req.status}
                  </span>
                </div>
                <p className="text-[#82796E] leading-relaxed">
                  <strong>Specifications:</strong> {req.preferredMetal} · {req.preferredGemstones} · Budget: {req.budgetRange}
                </p>
                <p className="text-[#82796E] italic">"{req.notes}"</p>
                {req.estimatedQuote && (
                  <div className="pt-2 text-sm font-mono text-[#245B4A] font-bold">
                    Official Quotation: {formatPrice(req.estimatedQuote)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Care & Repair */}
        {activeTab === 'repairs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif text-xl font-bold text-[#283447]">Care & Restoration Tickets</h3>
              <button
                onClick={() => navigate('/jewellery-care')}
                className="px-4 py-2 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded"
              >
                + Book Care Service
              </button>
            </div>

            {repairRequests.map((rep) => (
              <div key={rep.id} className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-2 text-xs">
                <div className="flex justify-between">
                  <strong className="font-mono text-sm text-[#245B4A]">Ticket #{rep.ticketNumber}</strong>
                  <span className="text-[10px] font-mono text-[#82796E]">{rep.createdAt}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#283447]">{rep.serviceType}</h4>
                <p className="text-[#82796E]">Article: {rep.itemType} · Salon: {rep.preferredStore}</p>
                <p className="text-[#82796E] italic">"{rep.issueDescription}"</p>
                <div className="pt-2">
                  <span className="bg-[#FAF7F0] border border-[#245B4A] text-[#245B4A] px-2.5 py-1 rounded text-[10px] font-semibold">
                    Current Status: {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif text-xl font-bold text-[#283447]">Salon Appointments</h3>
              <button
                onClick={() => navigate('/book-appointment')}
                className="px-4 py-2 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded"
              >
                + Book New Salon Visit
              </button>
            </div>

            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-2 text-xs">
                <div className="flex justify-between">
                  <strong className="font-serif text-base font-bold text-[#245B4A]">{apt.serviceType}</strong>
                  <span className="font-mono text-xs font-semibold text-[#283447]">{apt.status}</span>
                </div>
                <p className="text-[#82796E]">Location: {apt.storeLocation}</p>
                <p className="font-mono text-xs text-[#283447]">
                  Date: {apt.date} · Time Slot: {apt.timeSlot}
                </p>
                {apt.notes && <p className="text-[#82796E] italic">"{apt.notes}"</p>}
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            <h3 className="font-serif text-xl font-bold text-[#283447] mb-6">
              Saved Pieces ({wishlistedProducts.length})
            </h3>
            {wishlistedProducts.length === 0 ? (
              <div className="bg-white border border-[#E7E2D9] p-8 text-center text-xs text-[#82796E] rounded">
                Your wishlist is empty. Browse collections to save your favorite pieces.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} navigate={navigate} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
