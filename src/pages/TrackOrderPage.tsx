import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Package,
  FileText,
  MapPin,
  Calendar,
} from 'lucide-react';

interface TrackOrderPageProps {
  navigate: (route: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ navigate }) => {
  const { orders, formatPrice } = useApp();

  const [searchOrderNumber, setSearchOrderNumber] = useState('AUR-2026-1042');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === searchOrderNumber.trim().toLowerCase() ||
        o.trackingNumber?.toLowerCase() === searchOrderNumber.trim().toLowerCase()
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setErrorMessage(`No order found matching "${searchOrderNumber}". Please verify your order number from your receipt email.`);
    }
  };

  const stepsList = [
    'Order Placed',
    'Payment Confirmed',
    'Quality & Hallmark Check',
    'Ready for Dispatch',
    'In Transit (Insured)',
    'Delivered',
  ];

  const currentStepIndex = searchedOrder
    ? stepsList.indexOf(searchedOrder.status)
    : -1;

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 md:py-16">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium mb-3">
            <Truck className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Armoured Logistics Tracker</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-[#283447]">
            Track Your Insured Shipment
          </h1>
          <p className="text-xs md:text-sm text-[#82796E] font-light mt-2 leading-relaxed">
            Real-time tracking of vault dispatch, BIS hallmarking audits, and armoured tamper-evident courier transit.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#82796E] absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Enter Order Number (e.g. AUR-2026-1042) or Sequel Tracking ID..."
                value={searchOrderNumber}
                onChange={(e) => setSearchOrderNumber(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F0] border border-[#E7E2D9] text-xs rounded text-[#283447] font-mono focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#1C4537] transition-colors"
            >
              Track Order
            </button>
          </form>

          {errorMessage && (
            <p className="text-xs text-[#B87878] mt-3 font-medium">{errorMessage}</p>
          )}
        </div>

        {/* Order Dossier */}
        {searchedOrder && (
          <div className="bg-white border border-[#E7E2D9] rounded-sm p-6 md:p-8 shadow-xs space-y-8 animate-in fade-in">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E2D9] gap-4">
              <div>
                <span className="text-xs text-[#82796E] block font-mono">
                  Order ID: <strong className="text-[#245B4A]">{searchedOrder.orderNumber}</strong>
                </span>
                <span className="text-[11px] text-[#82796E]">Placed on {searchedOrder.createdAt}</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="inline-block bg-[#FAF7F0] border border-[#245B4A] text-[#245B4A] text-xs font-semibold px-3 py-1 rounded">
                  Status: {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#283447] mb-6">
                Vault Fulfilment Progress
              </h3>

              <div className="relative flex flex-col md:flex-row justify-between gap-4">
                {stepsList.map((st, i) => {
                  const isDone = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;

                  return (
                    <div key={st} className="flex-1 flex md:flex-col items-center gap-3 md:text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isDone
                            ? 'bg-[#245B4A] text-white'
                            : 'bg-[#FAF7F0] text-[#82796E] border border-[#E7E2D9]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                      </div>
                      <div>
                        <span
                          className={`text-xs block font-medium ${
                            isCurrent
                              ? 'text-[#245B4A] font-bold'
                              : isDone
                              ? 'text-[#283447]'
                              : 'text-[#82796E]'
                          }`}
                        >
                          {st}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-[#C5A46D] font-mono block">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Logistics & Armoured Carrier Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#82796E] block font-semibold">
                  Armoured Courier Carrier
                </span>
                <strong className="text-sm font-serif text-[#245B4A] block mt-0.5">
                  {searchedOrder.courierPartner || 'Sequel Armoured Express'}
                </strong>
                <span className="font-mono text-[#82796E] block mt-1">
                  Airway Bill (AWB): {searchedOrder.trackingNumber || 'SQL-BVC-98210344'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#82796E] block font-semibold">
                  Estimated Delivery Date
                </span>
                <strong className="text-sm font-mono text-[#245B4A] block mt-0.5">
                  {searchedOrder.estimatedDeliveryDate}
                </strong>
                <span className="text-[11px] text-[#82796E] block mt-1">
                  Delivery to: {searchedOrder.shippingAddress.name}, {searchedOrder.shippingAddress.city} ({searchedOrder.shippingAddress.pincode})
                </span>
              </div>
            </div>

            {/* Itemized Contents */}
            <div>
              <h4 className="font-serif text-base font-bold text-[#283447] mb-3">
                Items in This Vault Consignment
              </h4>
              <div className="space-y-3">
                {searchedOrder.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-[#E7E2D9] rounded flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="text-sm font-serif text-[#283447] block">{it.product.name}</strong>
                      <span className="text-[#82796E]">
                        Purity: {it.product.purity} · Net Weight: {it.product.netMetalWeightGrams}g · Qty: {it.quantity}
                      </span>
                      <span className="font-mono text-[10px] text-[#245B4A] block mt-0.5">
                        BIS HUID: {it.product.certification.huid || 'AU89F2'}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#245B4A]">
                      {formatPrice(it.unitPrice * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Assistance */}
            <div className="pt-4 border-t border-[#E7E2D9] flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
              <span className="text-[#82796E]">
                Need immediate update on your shipment?
              </span>
              <button
                onClick={() => navigate('/contact')}
                className="text-[#245B4A] font-semibold hover:underline"
              >
                Contact Dedicated Armoured Logistics Desk →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
