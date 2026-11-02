import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, UserAddress } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  FileText,
  ArrowRight,
  Gift,
} from 'lucide-react';

interface CheckoutPageProps {
  navigate: (route: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigate }) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    formatPrice,
    createOrder,
    currentUser,
    currency,
  } = useApp();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState<UserAddress>({
    id: 'addr-default',
    name: currentUser?.name || 'Aanya Sharma',
    phone: '+91 98200 11223',
    street: 'Apartment 14B, Imperial Towers, Tardeo Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400034',
    country: 'India',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'armoured' | 'store'>('armoured');
  const [giftMessage, setGiftMessage] = useState('Happy Wedding Celebration! Crafted with eternal love.');
  const [isGiftBox, setIsGiftBox] = useState(true);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery (Verified)'>('UPI');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4532 •••• •••• 8812',
    nameOnCard: 'Aanya Sharma',
    expiry: '09/29',
    cvv: '•••',
  });
  const [upiId, setUpiId] = useState('aanya@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF7F0] p-4">
        <div className="text-center space-y-3">
          <h2 className="font-serif text-2xl text-[#283447]">Your shopping bag is empty</h2>
          <button
            onClick={() => navigate('/collections')}
            className="px-6 py-2.5 bg-[#245B4A] text-white text-xs uppercase tracking-wider rounded font-medium"
          >
            Explore Collections
          </button>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        items: cart.map((i) => ({
          product: i.product,
          variantName: i.selectedVariant?.name || i.selectedSize,
          quantity: i.quantity,
          unitPrice: i.product.fixedPrice || 150000,
          engravingText: i.engravingText,
        })),
        shippingAddress,
        subtotal: cartSubtotal,
        makingCharges: 32000,
        taxGst: cartTax,
        shippingFee: cartShipping,
        discount: cartDiscount,
        total: cartTotal,
        currency,
        status: 'Payment Confirmed',
        paymentMethod,
        paymentStatus: 'Paid',
        trackingNumber: `SQL-BVC-${Math.floor(10000000 + Math.random() * 90000000)}`,
        courierPartner: 'Sequel Armoured Express Logistics',
        estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        isGiftBox,
        giftMessage,
      });

      setCreatedOrder(order);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Checkout Header & Steps */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#283447]">
            {step === 'confirmation' ? 'Order Confirmed' : 'Secure Express Checkout'}
          </h1>
          <p className="text-xs text-[#82796E] mt-1 font-mono">
            {step === 'confirmation'
              ? `Official Tax Invoice & Dossier: ${createdOrder?.orderNumber}`
              : '256-Bit SSL Encrypted · Tamper-Proof Armoured Fulfilment'}
          </p>
        </div>

        {step !== 'confirmation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 Cols: Step Form */}
            <div className="lg:col-span-8 space-y-6">
              
              {step === 'shipping' && (
                <form onSubmit={handleProceedToPayment} className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-xs space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#E7E2D9]">
                    <Truck className="w-5 h-5 text-[#245B4A]" />
                    <h3 className="font-serif text-xl font-bold text-[#283447]">
                      1. Delivery Address & Client Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.name}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Contact Phone (Required for Armoured Courier OTP)</label>
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-[#283447] block mb-1">Apartment / Villa / Street Address</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">State / Province</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">PIN / Postal Code</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.pincode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#283447] block mb-1">Country</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                      />
                    </div>
                  </div>

                  {/* Delivery Mode */}
                  <div className="pt-4 border-t border-[#E7E2D9]">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#283447] block mb-2">
                      Fulfilment Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div
                        onClick={() => setDeliveryMethod('armoured')}
                        className={`p-3 rounded border cursor-pointer ${
                          deliveryMethod === 'armoured'
                            ? 'border-[#245B4A] bg-[#FAF7F0] font-medium'
                            : 'border-[#E7E2D9]'
                        }`}
                      >
                        <strong className="block text-[#245B4A]">Sequel Armoured Insured Transit</strong>
                        <span className="text-[#82796E] text-[11px]">Free delivery · Insured until signed in person</span>
                      </div>
                      <div
                        onClick={() => setDeliveryMethod('store')}
                        className={`p-3 rounded border cursor-pointer ${
                          deliveryMethod === 'store'
                            ? 'border-[#245B4A] bg-[#FAF7F0] font-medium'
                            : 'border-[#E7E2D9]'
                        }`}
                      >
                        <strong className="block text-[#245B4A]">Collect at Boutique Maison</strong>
                        <span className="text-[#82796E] text-[11px]">Colaba (Mumbai) or DLF Emporio (Delhi)</span>
                      </div>
                    </div>
                  </div>

                  {/* Gift Note */}
                  <div className="pt-4 border-t border-[#E7E2D9]">
                    <label className="text-xs font-semibold text-[#283447] block mb-1">
                      Calligraphy Gift Card Note (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#E7E2D9] text-xs p-2.5 rounded text-[#283447]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors"
                  >
                    Continue to Payment Method →
                  </button>
                </form>
              )}

              {step === 'payment' && (
                <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-xs space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D9]">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#245B4A]" />
                      <h3 className="font-serif text-xl font-bold text-[#283447]">
                        2. Select Verified Payment Gateway
                      </h3>
                    </div>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-xs text-[#C5A46D] hover:underline"
                    >
                      ← Back to Address
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded border text-center transition-colors ${
                        paymentMethod === 'UPI'
                          ? 'border-[#245B4A] bg-[#245B4A] text-white font-semibold'
                          : 'border-[#E7E2D9] text-[#283447] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <QrCode className="w-5 h-5 mx-auto mb-1" />
                      <span>Instant UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Card')}
                      className={`p-3 rounded border text-center transition-colors ${
                        paymentMethod === 'Card'
                          ? 'border-[#245B4A] bg-[#245B4A] text-white font-semibold'
                          : 'border-[#E7E2D9] text-[#283447] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1" />
                      <span>Credit / Debit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NetBanking')}
                      className={`p-3 rounded border text-center transition-colors ${
                        paymentMethod === 'NetBanking'
                          ? 'border-[#245B4A] bg-[#245B4A] text-white font-semibold'
                          : 'border-[#E7E2D9] text-[#283447] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1" />
                      <span>NetBanking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash on Delivery (Verified)')}
                      className={`p-3 rounded border text-center transition-colors ${
                        paymentMethod === 'Cash on Delivery (Verified)'
                          ? 'border-[#245B4A] bg-[#245B4A] text-white font-semibold'
                          : 'border-[#E7E2D9] text-[#283447] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5 mx-auto mb-1" />
                      <span>Verified COD</span>
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-4 bg-[#FAF7F0] border border-[#E7E2D9] rounded-sm text-xs space-y-3">
                    {paymentMethod === 'UPI' && (
                      <div className="space-y-3">
                        <span className="font-semibold text-[#283447] block">
                          Instant UPI (GPay, PhonePe, Paytm, BHIM)
                        </span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter your UPI ID (e.g. mobile@upi)"
                            className="flex-1 bg-white border border-[#E7E2D9] p-2.5 rounded text-xs"
                          />
                          <button
                            type="button"
                            className="px-4 py-2 bg-[#245B4A] text-white rounded font-medium text-xs"
                          >
                            Verify VPA
                          </button>
                        </div>
                        <p className="text-[11px] text-[#82796E]">
                          A payment request will be triggered on your UPI application with zero processing surcharge.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'Card' && (
                      <div className="space-y-3">
                        <span className="font-semibold text-[#283447] block">
                          Secure Card Details (Test Gateway Sandbox)
                        </span>
                        <input
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          className="w-full bg-white border border-[#E7E2D9] p-2.5 rounded text-xs font-mono"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="bg-white border border-[#E7E2D9] p-2.5 rounded text-xs"
                            placeholder="MM/YY"
                          />
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="bg-white border border-[#E7E2D9] p-2.5 rounded text-xs font-mono"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'NetBanking' && (
                      <div className="space-y-2">
                        <span className="font-semibold text-[#283447] block">
                          Select Banking Institution
                        </span>
                        <select className="w-full bg-white border border-[#E7E2D9] p-2.5 rounded text-xs">
                          <option>HDFC Bank Private Banking</option>
                          <option>ICICI Bank Wealth Management</option>
                          <option>State Bank of India (SBI)</option>
                          <option>Axis Bank Burgundy</option>
                          <option>Kotak Mahindra Silk</option>
                        </select>
                      </div>
                    )}

                    {paymentMethod === 'Cash on Delivery (Verified)' && (
                      <div className="space-y-2">
                        <span className="font-semibold text-[#245B4A] block">
                          Armoured Courier Hand-Delivery Verification
                        </span>
                        <p className="text-[11px] text-[#82796E] leading-relaxed">
                          For high-value jewellery safety, our concierge team will initiate an automated voice OTP confirmation to <strong>{shippingAddress.phone}</strong> prior to vault dispatch.
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleExecutePayment}
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isProcessing ? (
                      <span>Verifying with Banking Network...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#C5A46D]" />
                        <span>Authorize Payment of {formatPrice(cartTotal)}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Order Breakdown */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#283447] border-b pb-2">
                  Bag Breakdown ({cart.length})
                </h3>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs pb-2 border-b border-[#E7E2D9]/60">
                      <div>
                        <p className="font-medium text-[#283447] line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-[#82796E]">
                          Qty: {item.quantity} · {item.product.purity}
                        </p>
                      </div>
                      <span className="font-mono text-[#245B4A] font-semibold">
                        {formatPrice(item.product.fixedPrice || 150000)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 font-mono text-xs text-[#82796E] pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-[#245B4A]">
                      <span>Discount Courtesy:</span>
                      <span>-{formatPrice(cartDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Indian GST (3%):</span>
                    <span>{formatPrice(cartTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Armoured Courier:</span>
                    <span className="text-[#245B4A]">FREE</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold text-sm text-[#283447]">
                    <span>Total Due:</span>
                    <span className="text-[#245B4A]">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {step === 'confirmation' && createdOrder && (
          <div className="max-w-2xl mx-auto bg-white border border-[#E7E2D9] p-8 md:p-12 rounded-sm shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F0] border border-[#245B4A] flex items-center justify-center mx-auto text-[#245B4A]">
              <CheckCircle2 className="w-10 h-10 text-[#245B4A]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-bold">
                Payment Received & Authenticated
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#283447]">
                Thank You for Choosing Aurelia
              </h2>
              <p className="text-xs text-[#82796E] max-w-md mx-auto">
                Your order is registered with the Aurelia Master Vault and will undergo quality inspection and tamper-seal verification.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF7F0] border border-[#E7E2D9] p-6 rounded text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-[#82796E]">Order Number:</span>
                <strong className="text-[#245B4A]">{createdOrder.orderNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#82796E]">Logistics Partner:</span>
                <span className="text-[#283447]">{createdOrder.courierPartner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#82796E]">Security Tracking ID:</span>
                <strong className="text-[#283447]">{createdOrder.trackingNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#82796E]">Estimated Delivery:</span>
                <span className="text-[#245B4A] font-bold">{createdOrder.estimatedDeliveryDate}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E7E2D9]">
                <span className="text-[#82796E]">Total Amount Paid:</span>
                <strong className="text-[#245B4A] text-sm">{formatPrice(createdOrder.total)}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => navigate('/track-order')}
                className="px-6 py-3 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors"
              >
                Track Insured Shipment →
              </button>
              <button
                onClick={() => navigate('/account')}
                className="px-6 py-3 bg-white border border-[#E7E2D9] text-[#283447] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#FAF7F0]"
              >
                View Client Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
