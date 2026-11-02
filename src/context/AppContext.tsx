import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  CustomJewelleryRequest,
  RepairRequest,
  Appointment,
  MetalRateRecord,
  Currency,
  ProductVariant,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_METAL_RATES,
  CURRENCY_RATES,
} from '../data/mockData';

interface AppContextType {
  products: Product[];
  metalRates: MetalRateRecord;
  updateMetalRates: (newRates: Partial<MetalRateRecord>) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  calculateProductPrice: (product: Product, variant?: ProductVariant) => number;
  formatPrice: (amountInInr: number) => string;
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, size?: string, quantity?: number, engravingText?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartDiscount: number;
  cartTotal: number;
  promoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  customRequests: CustomJewelleryRequest[];
  submitCustomRequest: (data: Omit<CustomJewelleryRequest, 'id' | 'createdAt' | 'status'>) => CustomJewelleryRequest;
  updateCustomRequest: (id: string, updates: Partial<CustomJewelleryRequest>) => void;
  repairRequests: RepairRequest[];
  submitRepairRequest: (data: Omit<RepairRequest, 'id' | 'createdAt' | 'status' | 'ticketNumber'>) => RepairRequest;
  updateRepairRequest: (id: string, updates: Partial<RepairRequest>) => void;
  appointments: Appointment[];
  bookAppointment: (data: Omit<Appointment, 'id' | 'appointmentNumber' | 'status'>) => Appointment;
  cancelAppointment: (id: string) => void;
  currentUser: { name: string; email: string; role: 'customer' | 'admin' } | null;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  register: (name: string, email: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aurelia_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [metalRates, setMetalRates] = useState<MetalRateRecord>(() => {
    const saved = localStorage.getItem('aurelia_metal_rates');
    return saved ? JSON.parse(saved) : INITIAL_METAL_RATES;
  });

  const [currency, setCurrency] = useState<Currency>('INR');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aurelia_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aurelia_wishlist');
    return saved ? JSON.parse(saved) : ['aur-001', 'aur-003'];
  });

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'customer' | 'admin' } | null>(() => {
    const saved = localStorage.getItem('aurelia_user');
    return saved ? JSON.parse(saved) : { name: 'Aanya Sharma', email: 'aanya.sharma@example.com', role: 'customer' };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aurelia_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ord-1042',
        orderNumber: 'AUR-2026-1042',
        createdAt: '28 Oct 2026, 14:30 IST',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
            unitPrice: 356400,
          },
        ],
        shippingAddress: {
          id: 'addr-1',
          name: 'Aanya Sharma',
          phone: '+91 98200 11223',
          street: 'Apartment 14B, Imperial Towers, Tardeo',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400034',
          country: 'India',
        },
        subtotal: 356400,
        makingCharges: 31416,
        taxGst: 11634,
        shippingFee: 0,
        discount: 0,
        total: 399450,
        currency: 'INR',
        status: 'In Transit (Insured)',
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        trackingNumber: 'SQL-BVC-98210344',
        courierPartner: 'Sequel Armoured Express Logistics',
        estimatedDeliveryDate: '04 Nov 2026',
        isGiftBox: true,
        giftMessage: 'With eternal grace and cherished memories.',
      },
    ];
  });

  const [customRequests, setCustomRequests] = useState<CustomJewelleryRequest[]>(() => {
    const saved = localStorage.getItem('aurelia_custom');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'cst-001',
        clientName: 'Aanya Sharma',
        clientEmail: 'aanya.sharma@example.com',
        clientPhone: '+91 98200 11223',
        jewelleryType: 'Bespoke Cushion Solitaire Ring',
        preferredMetal: 'Platinum 950 with Rose Gold Inlay',
        preferredGemstones: '2.0ct E Color VS1 Cushion Diamond',
        budgetRange: '₹5,00,000 – ₹7,50,000',
        occasion: '10th Wedding Anniversary',
        targetDate: '2026-12-15',
        notes: 'Would like delicate secret floral filigree visible under the central basket prongs.',
        consultationMode: 'In-Store VIP Lounge',
        status: 'CAD Design & Quote',
        createdAt: '24 Oct 2026',
        assignedDesigner: 'Devika Singhania',
        estimatedQuote: 625000,
      },
    ];
  });

  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>(() => {
    const saved = localStorage.getItem('aurelia_repairs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'rep-001',
        ticketNumber: 'CARE-7712',
        customerName: 'Aanya Sharma',
        customerEmail: 'aanya.sharma@example.com',
        customerPhone: '+91 98200 11223',
        itemType: 'Heritage Emerald Ring',
        serviceType: 'Prong & Stone Tightening',
        issueDescription: 'Center emerald feels slightly loose when touched; needs master claw re-tipping.',
        preferredStore: 'Aurelia Flagship Colaba Maison',
        status: 'Under Master Craftsman Repair',
        createdAt: '26 Oct 2026',
      },
    ];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('aurelia_appts');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'apt-001',
        appointmentNumber: 'APT-9921',
        customerName: 'Aanya Sharma',
        customerEmail: 'aanya.sharma@example.com',
        customerPhone: '+91 98200 11223',
        storeLocation: 'Aurelia Flagship Colaba Maison, Mumbai',
        serviceType: 'Bridal Trousseau Consultation',
        date: '2026-11-10',
        timeSlot: '03:00 PM – 04:30 PM',
        status: 'Confirmed',
        notes: 'Seeking guidance on matching haathphool and maang tikka with ancestral emerald choker.',
      },
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('aurelia_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aurelia_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aurelia_custom', JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem('aurelia_repairs', JSON.stringify(repairRequests));
  }, [repairRequests]);

  useEffect(() => {
    localStorage.setItem('aurelia_appts', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('aurelia_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aurelia_metal_rates', JSON.stringify(metalRates));
  }, [metalRates]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aurelia_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aurelia_user');
    }
  }, [currentUser]);

  // Rate calculator: computes dynamic price for market-linked items based on verified bullion rate
  const calculateProductPrice = (product: Product, variant?: ProductVariant): number => {
    let basePrice = 0;
    if (product.isMarketLinkedPrice) {
      let applicableRate = metalRates.gold22kPerGram;
      if (product.purity.includes('24K')) applicableRate = metalRates.gold24kPerGram;
      else if (product.purity.includes('18K')) applicableRate = metalRates.gold18kPerGram;
      else if (product.purity.includes('925')) applicableRate = metalRates.silverPerGram;
      else if (product.purity.includes('Pt')) applicableRate = metalRates.platinumPerGram;

      const metalCost = product.netMetalWeightGrams * applicableRate;
      const makingCost = (product.makingChargesPerGram || 600) * product.grossWeightGrams;
      
      // Calculate gemstone value
      let stonesCost = 0;
      if (product.gemstones && product.gemstones.length > 0) {
        product.gemstones.forEach((g) => {
          if (g.type.includes('Polki')) stonesCost += g.caratWeight * 14000;
          else if (g.type.includes('Emerald')) stonesCost += g.caratWeight * 8500;
          else if (g.type.includes('Ruby')) stonesCost += g.caratWeight * 12000;
          else if (g.type.includes('Diamond')) stonesCost += g.caratWeight * 75000;
          else if (g.type.includes('Pearl')) stonesCost += g.caratWeight * 1200;
        });
      }

      basePrice = metalCost + makingCost + stonesCost;
    } else {
      basePrice = product.fixedPrice || 100000;
    }

    if (variant && variant.priceAdjustment) {
      basePrice += variant.priceAdjustment;
    }

    if (product.discountPercent) {
      basePrice = basePrice * (1 - product.discountPercent / 100);
    }

    return Math.round(basePrice);
  };

  const formatPrice = (amountInInr: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = amountInInr * config.rate;

    if (currency === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${config.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  // Cart operations
  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    size?: string,
    quantity = 1,
    engravingText?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === variant?.id &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          selectedVariant: variant,
          selectedSize: size || variant?.size,
          quantity,
          engravingText,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId))
      )
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setPromoDiscountPercent(0);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AURELIA10') {
      setPromoCode('AURELIA10');
      setPromoDiscountPercent(10);
      return { success: true, message: '10% privilege discount applied to your order!' };
    }
    if (cleanCode === 'BRIDAL2026') {
      setPromoCode('BRIDAL2026');
      setPromoDiscountPercent(15);
      return { success: true, message: '15% Royal Bridal Suite privilege courtesy applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try AURELIA10 or BRIDAL2026.' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscountPercent(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart financial totals
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + calculateProductPrice(item.product, item.selectedVariant) * item.quantity,
    0
  );
  const cartDiscount = Math.round(cartSubtotal * (promoDiscountPercent / 100));
  // 3% standard Indian GST on fine jewellery
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.03);
  // Free insured armored courier delivery for all fine jewellery above ₹10,000
  const cartShipping = cartSubtotal > 10000 ? 0 : 500;
  const cartTotal = cartSubtotal - cartDiscount + cartTax + cartShipping;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Metal Rates updater
  const updateMetalRates = (newRates: Partial<MetalRateRecord>) => {
    setMetalRates((prev) => ({
      ...prev,
      ...newRates,
      lastUpdated: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isLiveFeed: false, // marked as manual override
    }));
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' IST',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Custom requests
  const submitCustomRequest = (data: Omit<CustomJewelleryRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: CustomJewelleryRequest = {
      ...data,
      id: `cst-${Date.now()}`,
      status: 'Enquiry Received',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateCustomRequest = (id: string, updates: Partial<CustomJewelleryRequest>) => {
    setCustomRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  // Repair requests
  const submitRepairRequest = (data: Omit<RepairRequest, 'id' | 'createdAt' | 'status' | 'ticketNumber'>) => {
    const newRepair: RepairRequest = {
      ...data,
      id: `rep-${Date.now()}`,
      ticketNumber: `CARE-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Inspection Scheduled',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setRepairRequests((prev) => [newRepair, ...prev]);
    return newRepair;
  };

  const updateRepairRequest = (id: string, updates: Partial<RepairRequest>) => {
    setRepairRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  // Appointments
  const bookAppointment = (data: Omit<Appointment, 'id' | 'appointmentNumber' | 'status'>) => {
    const newAppt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      appointmentNumber: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
    };
    setAppointments((prev) => [newAppt, ...prev]);
    return newAppt;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
  };

  // Authentication
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const name = role === 'admin' ? 'Vikram Singhania (Head of Atelier)' : 'Aanya Sharma';
    const user = { name, email, role };
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (name: string, email: string) => {
    const user = { name, email, role: 'customer' as const };
    setCurrentUser(user);
  };

  // Product management
  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        metalRates,
        updateMetalRates,
        currency,
        setCurrency,
        calculateProductPrice,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartDiscount,
        cartTotal,
        promoCode,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        customRequests,
        submitCustomRequest,
        updateCustomRequest,
        repairRequests,
        submitRepairRequest,
        updateRepairRequest,
        appointments,
        bookAppointment,
        cancelAppointment,
        currentUser,
        login,
        logout,
        register,
        addProduct,
        updateProduct,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
