export type Currency = 'INR' | 'USD' | 'AED' | 'GBP';

export type MetalType = 'Gold' | 'White Gold' | 'Rose Gold' | 'Platinum' | 'Silver';
export type MetalPurity = '24K (999)' | '22K (916)' | '18K (750)' | '14K (585)' | '925 Sterling' | 'Pt 950';

export type JewelleryCategory = 
  | 'Necklaces' 
  | 'Rings' 
  | 'Earrings' 
  | 'Bangles & Bracelets' 
  | 'Pendants' 
  | 'Bridal Sets' 
  | 'Mangalsutra' 
  | 'Chains' 
  | "Men's Jewellery";

export type CollectionSlug = 
  | 'gold' 
  | 'diamond' 
  | 'bridal' 
  | 'everyday' 
  | 'heritage-polki' 
  | 'solitaire' 
  | 'gemstones' 
  | 'mens-luxe';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Size 14 / Yellow Gold"
  size?: string;
  metalColor?: 'Yellow' | 'Rose' | 'White';
  priceAdjustment: number;
  stock: number;
}

export interface GemstoneDetail {
  type: string; // e.g. "Natural Diamond", "Colombian Emerald", "Basra Pearl", "Burmese Ruby"
  caratWeight: number;
  shape: string; // "Round Brilliant", "Emerald Cut", "Pear", "Cushion", "Oval"
  clarity?: string; // "VVS1", "VS1", "Flawless"
  color?: string; // "D-E-F (Colorless)", "G-H", "Vivid Green"
  cut?: string; // "Excellent", "Ideal"
  totalStones?: number;
}

export interface CertificationInfo {
  isCertified: boolean;
  certifyingBody?: 'GIA' | 'IGI' | 'BIS Hallmark' | 'SGL';
  certificateNumber?: string;
  huid?: string; // BIS 6-digit alphanumeric Hallmark Unique Identification
  hallmarkCenter?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  collection: CollectionSlug;
  category: JewelleryCategory;
  metalType: MetalType;
  purity: MetalPurity;
  grossWeightGrams: number;
  netMetalWeightGrams: number;
  makingChargesPerGram?: number;
  fixedMakingCharge?: number;
  gemstones?: GemstoneDetail[];
  dimensions?: string;
  variants: ProductVariant[];
  featuredImageVisualType: 'necklace-gold' | 'ring-diamond' | 'earrings-gold' | 'bangle-emerald' | 'bridal-polki' | 'pendant-ruby' | 'ring-gemstone' | 'silver-bracelet' | 'mens-chain' | 'pearl-necklace';
  accentColor?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isCustomizable?: boolean;
  isMarketLinkedPrice?: boolean; // Price computed dynamically based on current gold rate
  fixedPrice?: number; // Base price if fixed
  discountPercent?: number;
  stock: number;
  certification: CertificationInfo;
  careInstructions: string[];
  warrantyYears: number;
  estimatedDeliveryDays: number;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  selectedSize?: string;
  quantity: number;
  engravingText?: string;
}

export interface UserAddress {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: {
    product: Product;
    variantName?: string;
    quantity: number;
    unitPrice: number;
    engravingText?: string;
  }[];
  shippingAddress: UserAddress;
  subtotal: number;
  makingCharges: number;
  taxGst: number;
  shippingFee: number;
  discount: number;
  total: number;
  currency: Currency;
  status: 'Order Placed' | 'Payment Confirmed' | 'Quality & Hallmark Check' | 'Ready for Dispatch' | 'In Transit (Insured)' | 'Delivered' | 'Cancelled';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery (Verified)' | 'Wire Transfer';
  paymentStatus: 'Paid' | 'Pending Verification' | 'Failed';
  trackingNumber?: string;
  courierPartner?: string;
  estimatedDeliveryDate: string;
  isGiftBox: boolean;
  giftMessage?: string;
}

export interface CustomJewelleryRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  jewelleryType: string;
  preferredMetal: string;
  preferredGemstones: string;
  budgetRange: string;
  occasion: string;
  targetDate: string;
  sizeSpecification?: string;
  notes: string;
  consultationMode: 'In-Store VIP Lounge' | 'Virtual Video Consultation' | 'WhatsApp Direct Concierge';
  status: 'Enquiry Received' | 'Designer Consultation' | 'CAD Design & Quote' | 'Design Approved' | 'In Production' | 'Quality Inspection' | 'Ready for Delivery';
  createdAt: string;
  assignedDesigner?: string;
  estimatedQuote?: number;
}

export interface RepairRequest {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemType: string;
  serviceType: 'Ultrasonic Cleaning & Polishing' | 'Ring Resizing' | 'Clasp / Lock Repair' | 'Prong & Stone Tightening' | 'Pearl Restringing' | 'Full Heritage Restoration';
  issueDescription: string;
  preferredStore: string;
  status: 'Inspection Scheduled' | 'Item Received at Atelier' | 'Under Master Craftsman Repair' | 'Quality Audit Passed' | 'Ready for Collection';
  createdAt: string;
}

export interface Appointment {
  id: string;
  appointmentNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  storeLocation: string;
  serviceType: 'Bridal Trousseau Consultation' | 'Solitaire Diamond Viewing' | 'Bespoke Custom Design' | 'Jewellery Appraisal & Care';
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  notes?: string;
}

export interface MetalRateRecord {
  lastUpdated: string;
  gold24kPerGram: number; // in INR
  gold22kPerGram: number;
  gold18kPerGram: number;
  silverPerGram: number;
  platinumPerGram: number;
  source: string;
  isLiveFeed: boolean;
}

export interface Review {
  id: string;
  productId?: string;
  authorName: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  productName?: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  author: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}
