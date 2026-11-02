import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Order, CustomJewelleryRequest, RepairRequest } from '../types';
import {
  Package,
  Sparkles,
  Wrench,
  TrendingUp,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit,
  DollarSign,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AdminDashboardPageProps {
  navigate: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const {
    products,
    addProduct,
    updateProduct,
    orders,
    updateOrderStatus,
    customRequests,
    updateCustomRequest,
    repairRequests,
    updateRepairRequest,
    metalRates,
    updateMetalRates,
    formatPrice,
    currentUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'products' | 'custom' | 'repairs' | 'rates'>('analytics');

  // Rate Editing State
  const [ratesForm, setRatesForm] = useState({
    gold24kPerGram: metalRates.gold24kPerGram,
    gold22kPerGram: metalRates.gold22kPerGram,
    gold18kPerGram: metalRates.gold18kPerGram,
    silverPerGram: metalRates.silverPerGram,
    platinumPerGram: metalRates.platinumPerGram,
  });
  const [ratesSaved, setRatesSaved] = useState(false);

  // New Product Modal State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductForm, setNewProductForm] = useState<Partial<Product>>({
    name: '',
    sku: `AUR-${Date.now().toString().slice(-4)}`,
    slug: '',
    tagline: '',
    description: '',
    collection: 'gold',
    category: 'Necklaces',
    metalType: 'Gold',
    purity: '22K (916)',
    grossWeightGrams: 28.5,
    netMetalWeightGrams: 28.5,
    makingChargesPerGram: 650,
    isMarketLinkedPrice: true,
    featuredImageVisualType: 'necklace-gold',
    stock: 5,
    warrantyYears: 2,
    estimatedDeliveryDays: 4,
    certification: {
      isCertified: true,
      certifyingBody: 'BIS Hallmark',
      huid: `AU${Math.floor(1000 + Math.random() * 9000)}`,
      hallmarkCenter: 'BIS Fort Mumbai Bureau',
    },
    careInstructions: ['Store in original velvet pouch.', 'Avoid chemical dips.'],
    variants: [{ id: 'v1', name: 'Standard Size', priceAdjustment: 0, stock: 5 }],
  });

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetalRates({
      gold24kPerGram: Number(ratesForm.gold24kPerGram),
      gold22kPerGram: Number(ratesForm.gold22kPerGram),
      gold18kPerGram: Number(ratesForm.gold18kPerGram),
      silverPerGram: Number(ratesForm.silverPerGram),
      platinumPerGram: Number(ratesForm.platinumPerGram),
    });
    setRatesSaved(true);
    setTimeout(() => setRatesSaved(false), 2000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (newProductForm.name || 'new-jewel')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const product: Product = {
      ...(newProductForm as Product),
      id: `aur-${Date.now()}`,
      slug,
      variants: newProductForm.variants || [{ id: 'v1', name: 'Standard', priceAdjustment: 0, stock: 5 }],
    };

    addProduct(product);
    setShowAddProduct(false);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Top Header */}
        <div className="bg-[#245B4A] text-[#FAF7F0] rounded-sm p-6 md:p-8 mb-8 border border-[#C5A46D]/40 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A46D] font-bold block mb-1">
              Atelier Management Console · Staff Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-white">
              Aurelia High Jewellery Administration
            </h1>
            <p className="text-xs text-[#FAF7F0]/80 mt-1 font-light">
              Logged in as <strong>{currentUser?.name || 'Vikram Singhania (Master Jeweller)'}</strong> · Role: Atelier Director
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded"
            >
              Public Storefront →
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#E7E2D9] mb-8 overflow-x-auto gap-2">
          {[
            { id: 'analytics', label: 'Analytics & KPIs' },
            { id: 'orders', label: `Orders (${orders.length})` },
            { id: 'products', label: `Catalogue (${products.length})` },
            { id: 'custom', label: `Custom Commissions (${customRequests.length})` },
            { id: 'repairs', label: `Care & Repair (${repairRequests.length})` },
            { id: 'rates', label: 'Live Metal Rates Manager' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-[#245B4A] text-[#245B4A]'
                  : 'border-transparent text-[#82796E] hover:text-[#283447]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-[#E7E2D9] p-6 rounded shadow-xs">
                <span className="text-[11px] text-[#82796E] uppercase font-semibold block">Total Sales</span>
                <strong className="font-mono text-2xl text-[#245B4A] block mt-1">
                  {formatPrice(totalRevenue)}
                </strong>
                <span className="text-[10px] text-[#245B4A] font-medium block mt-1">+18.4% this quarter</span>
              </div>

              <div className="bg-white border border-[#E7E2D9] p-6 rounded shadow-xs">
                <span className="text-[11px] text-[#82796E] uppercase font-semibold block">Active Orders</span>
                <strong className="font-mono text-2xl text-[#283447] block mt-1">
                  {orders.length}
                </strong>
                <span className="text-[10px] text-[#82796E] block mt-1">100% Insured Transit</span>
              </div>

              <div className="bg-white border border-[#E7E2D9] p-6 rounded shadow-xs">
                <span className="text-[11px] text-[#82796E] uppercase font-semibold block">Custom Briefs</span>
                <strong className="font-mono text-2xl text-[#245B4A] block mt-1">
                  {customRequests.length} Active
                </strong>
                <span className="text-[10px] text-[#C5A46D] font-medium block mt-1">Average Brief: ₹5.2 Lakhs</span>
              </div>

              <div className="bg-white border border-[#E7E2D9] p-6 rounded shadow-xs">
                <span className="text-[11px] text-[#82796E] uppercase font-semibold block">Current 22K Rate</span>
                <strong className="font-mono text-2xl text-[#283447] block mt-1">
                  {formatPrice(metalRates.gold22kPerGram)}/g
                </strong>
                <span className="text-[10px] text-[#82796E] block mt-1">IBJA Reference Feed</span>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E7E2D9] rounded text-xs space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#283447]">Statutory Compliance Audit</h3>
              <p className="text-[#82796E]">
                All {products.length} cataloged products possess active 6-digit HUID registration under the Bureau of Indian Standards (Hallmarking) Regulations. Invoices calculate 3% GST on fine jewellery automatically.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Fulfilment */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#E7E2D9] rounded p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#283447] mb-2">Order Fulfilment Desk</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F0] border-b border-[#E7E2D9] text-[#82796E] uppercase font-mono">
                  <tr>
                    <th className="p-3">Order #</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Carrier / AWB</th>
                    <th className="p-3">Update Fulfilment State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2D9]">
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="p-3 font-mono font-bold text-[#245B4A]">{ord.orderNumber}</td>
                      <td className="p-3 font-medium">{ord.shippingAddress.name} ({ord.shippingAddress.city})</td>
                      <td className="p-3">{ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}</td>
                      <td className="p-3 font-mono font-bold">{formatPrice(ord.total)}</td>
                      <td className="p-3 font-mono text-[11px] text-[#82796E]">{ord.courierPartner} · {ord.trackingNumber}</td>
                      <td className="p-3">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-[#FAF7F0] border border-[#E7E2D9] text-xs p-1.5 rounded font-medium"
                        >
                          <option>Order Placed</option>
                          <option>Payment Confirmed</option>
                          <option>Quality & Hallmark Check</option>
                          <option>Ready for Dispatch</option>
                          <option>In Transit (Insured)</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Products Catalog Manager */}
        {activeTab === 'products' && (
          <div className="bg-white border border-[#E7E2D9] rounded p-6 shadow-xs space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#E7E2D9]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#283447]">Vault Inventory ({products.length} Pieces)</h3>
                <p className="text-xs text-[#82796E]">Manage metal purity, gross & net weights, making charges, and stock levels.</p>
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="px-4 py-2 bg-[#245B4A] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#1C4537] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F0] border-b border-[#E7E2D9] text-[#82796E] uppercase font-mono">
                  <tr>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Collection</th>
                    <th className="p-3">Purity</th>
                    <th className="p-3">Net Weight</th>
                    <th className="p-3">BIS HUID</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2D9]">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="p-3 font-mono text-[#82796E]">{p.sku}</td>
                      <td className="p-3 font-serif font-bold text-[#283447]">{p.name}</td>
                      <td className="p-3 uppercase text-[10px] text-[#C5A46D]">{p.collection}</td>
                      <td className="p-3 font-medium">{p.purity}</td>
                      <td className="p-3 font-mono">{p.netMetalWeightGrams}g</td>
                      <td className="p-3 font-mono text-[#245B4A] font-bold">{p.certification.huid || 'AU89F2'}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                          className="w-16 bg-[#FAF7F0] border border-[#E7E2D9] p-1 rounded font-mono text-center"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => navigate(`/products/${p.slug}`)}
                          className="text-[#245B4A] hover:underline"
                        >
                          View PDP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Custom Jewellery Inquiries */}
        {activeTab === 'custom' && (
          <div className="bg-white border border-[#E7E2D9] rounded p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#283447] mb-2">Bespoke Commissions Pipeline</h3>
            <div className="space-y-4">
              {customRequests.map((req) => (
                <div key={req.id} className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="font-serif text-base text-[#245B4A]">{req.jewelleryType}</strong>
                      <span className="text-[#82796E] block">
                        Patron: {req.clientName} ({req.clientPhone}) · Mode: {req.consultationMode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-[#82796E]">Stage:</span>
                      <select
                        value={req.status}
                        onChange={(e) => updateCustomRequest(req.id, { status: e.target.value as any })}
                        className="bg-white border border-[#E7E2D9] text-xs p-1.5 rounded font-medium"
                      >
                        <option>Enquiry Received</option>
                        <option>Designer Consultation</option>
                        <option>CAD Design & Quote</option>
                        <option>Design Approved</option>
                        <option>In Production</option>
                        <option>Quality Inspection</option>
                        <option>Ready for Delivery</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[#82796E]">
                    {req.preferredMetal} · {req.preferredGemstones} · Budget: {req.budgetRange} · Target: {req.targetDate}
                  </p>
                  <p className="text-[#82796E] italic">"{req.notes}"</p>

                  <div className="flex items-center gap-3 pt-2 border-t border-[#E7E2D9]">
                    <span className="font-semibold text-[#283447]">Official Atelier Quotation (₹):</span>
                    <input
                      type="number"
                      placeholder="e.g. 520000"
                      value={req.estimatedQuote || ''}
                      onChange={(e) => updateCustomRequest(req.id, { estimatedQuote: Number(e.target.value) })}
                      className="bg-white border border-[#E7E2D9] p-1.5 rounded text-xs font-mono w-36"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Care & Repair Queue */}
        {activeTab === 'repairs' && (
          <div className="bg-white border border-[#E7E2D9] rounded p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#283447] mb-2">Jewellery Care & Restoration Queue</h3>
            <div className="space-y-4">
              {repairRequests.map((rep) => (
                <div key={rep.id} className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="font-mono text-[#245B4A]">Ticket #{rep.ticketNumber}</strong>
                      <span className="text-[#82796E] ml-2">Customer: {rep.customerName} ({rep.customerPhone})</span>
                    </div>

                    <select
                      value={rep.status}
                      onChange={(e) => updateRepairRequest(rep.id, { status: e.target.value as any })}
                      className="bg-white border border-[#E7E2D9] text-xs p-1.5 rounded font-medium"
                    >
                      <option>Inspection Scheduled</option>
                      <option>Item Received at Atelier</option>
                      <option>Under Master Craftsman Repair</option>
                      <option>Quality Audit Passed</option>
                      <option>Ready for Collection</option>
                    </select>
                  </div>
                  <p className="font-medium text-[#283447]">{rep.serviceType} — {rep.itemType}</p>
                  <p className="text-[#82796E] italic">"{rep.issueDescription}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Live Metal Rates Controller */}
        {activeTab === 'rates' && (
          <div className="bg-white border border-[#E7E2D9] rounded p-6 md:p-8 shadow-xs max-w-2xl space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block">
                Bullion Treasury Engine
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#283447]">
                Live Precious Metal Benchmark Rates
              </h3>
              <p className="text-xs text-[#82796E] mt-1">
                Updating these rates recalculates all market-linked 22K gold, 18K gold, and silver prices across the entire catalogue in real-time.
              </p>
            </div>

            {ratesSaved && (
              <div className="p-3 bg-[#FAF7F0] border border-[#245B4A] rounded text-xs text-[#245B4A] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bullion rates updated across the entire catalogue!</span>
              </div>
            )}

            <form onSubmit={handleSaveRates} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#283447] block mb-1">
                  24K Pure Gold Rate (₹ / Gram)
                </label>
                <input
                  type="number"
                  value={ratesForm.gold24kPerGram}
                  onChange={(e) => setRatesForm({ ...ratesForm, gold24kPerGram: Number(e.target.value) })}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#283447] block mb-1">
                  22K Standard Gold Rate (916) (₹ / Gram)
                </label>
                <input
                  type="number"
                  value={ratesForm.gold22kPerGram}
                  onChange={(e) => setRatesForm({ ...ratesForm, gold22kPerGram: Number(e.target.value) })}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#283447] block mb-1">
                  18K Gold Rate (750) (₹ / Gram)
                </label>
                <input
                  type="number"
                  value={ratesForm.gold18kPerGram}
                  onChange={(e) => setRatesForm({ ...ratesForm, gold18kPerGram: Number(e.target.value) })}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#283447] block mb-1">
                  Silver Rate (₹ / Gram)
                </label>
                <input
                  type="number"
                  value={ratesForm.silverPerGram}
                  onChange={(e) => setRatesForm({ ...ratesForm, silverPerGram: Number(e.target.value) })}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#283447] block mb-1">
                  Platinum 950 Rate (₹ / Gram)
                </label>
                <input
                  type="number"
                  value={ratesForm.platinumPerGram}
                  onChange={(e) => setRatesForm({ ...ratesForm, platinumPerGram: Number(e.target.value) })}
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors"
              >
                Save & Broadcast Rates Across Catalogue
              </button>
            </form>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-[#E7E2D9] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 rounded shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-serif text-xl font-bold text-[#283447]">Catalog New Fine Jewel</h3>
                <button onClick={() => setShowAddProduct(false)} className="text-sm font-bold">✕</button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Jewel Name</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="e.g. Royal Chandbali Earrings in 22K Gold"
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Category</label>
                    <select
                      value={newProductForm.category}
                      onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value as any })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                    >
                      <option>Necklaces</option>
                      <option>Rings</option>
                      <option>Earrings</option>
                      <option>Bangles & Bracelets</option>
                      <option>Pendants</option>
                      <option>Bridal Sets</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Purity</label>
                    <select
                      value={newProductForm.purity}
                      onChange={(e) => setNewProductForm({ ...newProductForm, purity: e.target.value as any })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                    >
                      <option>22K (916)</option>
                      <option>18K (750)</option>
                      <option>Pt 950</option>
                      <option>925 Sterling</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Gross Weight (grams)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={newProductForm.grossWeightGrams}
                      onChange={(e) => setNewProductForm({ ...newProductForm, grossWeightGrams: Number(e.target.value) })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Net Gold Weight (grams)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={newProductForm.netMetalWeightGrams}
                      onChange={(e) => setNewProductForm({ ...newProductForm, netMetalWeightGrams: Number(e.target.value) })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Visual Artwork Model</label>
                    <select
                      value={newProductForm.featuredImageVisualType}
                      onChange={(e) => setNewProductForm({ ...newProductForm, featuredImageVisualType: e.target.value as any })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                    >
                      <option value="necklace-gold">Gold Haar / Necklace</option>
                      <option value="ring-diamond">Diamond Solitaire Ring</option>
                      <option value="earrings-gold">Gold Jhumkas / Earrings</option>
                      <option value="bangle-emerald">Emerald Kada Bangle</option>
                      <option value="bridal-polki">Bridal Polki Suite</option>
                      <option value="pendant-ruby">Ruby Halo Pendant</option>
                      <option value="ring-gemstone">Ceylon Sapphire Ring</option>
                      <option value="silver-bracelet">Silver Tennis Bracelet</option>
                      <option value="mens-chain">Men's Cuban Chain</option>
                      <option value="pearl-necklace">Akoya Pearl Necklace</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#283447] block mb-1">Vault Stock Qty</label>
                    <input
                      type="number"
                      required
                      value={newProductForm.stock}
                      onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Tagline</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.tagline}
                    onChange={(e) => setNewProductForm({ ...newProductForm, tagline: e.target.value })}
                    placeholder="Brief description of motifs or gems..."
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Full Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537]"
                >
                  Publish to Storefront Vault
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
