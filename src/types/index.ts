export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: 'smartphones' | 'earbuds' | 'smartwatches' | 'accessories' | 'tablets' | 'mobile-covers';
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  storageOptions?: string[];
  description: string;
  specifications: Record<string, string>;
  features: string[];
  whatsInTheBox: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  inStock: boolean;
  tag?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  origin: string;
  popularModels: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location?: string;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  inStockOnly: boolean;
  searchQuery: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

export type DeviceType = 'phone' | 'laptop' | 'tablet' | 'smartwatch';

export type DeviceCondition = 'like-new' | 'good' | 'fair' | 'damaged';

export interface DeviceModel {
  id: string;
  brand: string;
  model: string;
  basePrice: number;
  storages: { storage: string; multiplier: number }[];
}

export interface DeviceValuation {
  deviceType: DeviceType;
  brand: string;
  model: string;
  storage: string;
  condition: DeviceCondition;
  estimatedPrice: number;
}

export interface SellPickupBooking {
  valuation: DeviceValuation;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  pickupDate: string;
  pickupTimeSlot: string;
  paymentMethod: 'upi' | 'bank';
  upiId?: string;
  accountNumber?: string;
  ifsc?: string;
  bookingId: string;
}
