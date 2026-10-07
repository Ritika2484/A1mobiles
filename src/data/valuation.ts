import { DeviceType, DeviceCondition } from '@/types';

export interface DeviceBrandOption {
  id: string;
  name: string;
  icon?: string;
  logoText?: string;
}

export interface ValuationModel {
  id: string;
  brand: string;
  name: string;
  deviceType: DeviceType;
  basePrice: number; // For lowest storage & like-new condition
  storages: {
    storage: string;
    extraPrice: number;
  }[];
}

export const SELL_DEVICE_CATEGORIES = [
  {
    id: 'phone',
    type: 'phone' as DeviceType,
    title: 'Sell Phone',
    description: 'Instant quote for all major Android & Apple smartphones',
    image: '/images/hero-phone.jpg',
    tag: 'Highest Value',
    quoteRate: 'Up to ₹95,000'
  },
  {
    id: 'laptop',
    type: 'laptop' as DeviceType,
    title: 'Sell Laptop',
    description: 'MacBook, Dell, HP, Lenovo & Gaming laptops accepted',
    image: '/images/laptop.jpg',
    tag: 'Free Doorstep Inspection',
    quoteRate: 'Up to ₹85,000'
  },
  {
    id: 'tablet',
    type: 'tablet' as DeviceType,
    title: 'Sell Tablet',
    description: 'iPad Pro, Air, Mini, Samsung Galaxy Tab & Lenovo tabs',
    image: '/images/tablet.jpg',
    tag: 'Same Day UPI',
    quoteRate: 'Up to ₹55,000'
  },
  {
    id: 'smartwatch',
    type: 'smartwatch' as DeviceType,
    title: 'Sell Smartwatch',
    description: 'Apple Watch Series & Ultra, Galaxy Watch & Garmin',
    image: '/images/smartwatch.jpg',
    tag: 'Instant Cash',
    quoteRate: 'Up to ₹35,000'
  }
];

export const VALUATION_BRANDS: DeviceBrandOption[] = [
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'oneplus', name: 'OnePlus' },
  { id: 'google', name: 'Google' },
  { id: 'xiaomi', name: 'Xiaomi' },
  { id: 'vivo', name: 'Vivo' },
  { id: 'oppo', name: 'Oppo' },
  { id: 'realme', name: 'Realme' },
  { id: 'nothing', name: 'Nothing' }
];

export const VALUATION_MODELS: ValuationModel[] = [
  // APPLE
  {
    id: 'iphone-15-pro-max',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    deviceType: 'phone',
    basePrice: 65000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 8000 },
      { storage: '1TB', extraPrice: 15000 }
    ]
  },
  {
    id: 'iphone-15-pro',
    brand: 'Apple',
    name: 'iPhone 15 Pro',
    deviceType: 'phone',
    basePrice: 56000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 6000 },
      { storage: '512GB', extraPrice: 12000 },
      { storage: '1TB', extraPrice: 18000 }
    ]
  },
  {
    id: 'iphone-15',
    brand: 'Apple',
    name: 'iPhone 15',
    deviceType: 'phone',
    basePrice: 38000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 5000 },
      { storage: '512GB', extraPrice: 9000 }
    ]
  },
  {
    id: 'iphone-14-pro-max',
    brand: 'Apple',
    name: 'iPhone 14 Pro Max',
    deviceType: 'phone',
    basePrice: 48000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 5000 },
      { storage: '512GB', extraPrice: 10000 },
      { storage: '1TB', extraPrice: 15000 }
    ]
  },
  {
    id: 'iphone-14',
    brand: 'Apple',
    name: 'iPhone 14',
    deviceType: 'phone',
    basePrice: 31000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 4000 },
      { storage: '512GB', extraPrice: 8000 }
    ]
  },
  {
    id: 'iphone-13',
    brand: 'Apple',
    name: 'iPhone 13',
    deviceType: 'phone',
    basePrice: 24500,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 3500 },
      { storage: '512GB', extraPrice: 6500 }
    ]
  },

  // SAMSUNG
  {
    id: 'galaxy-s24-ultra',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra 5G',
    deviceType: 'phone',
    basePrice: 62000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 7000 },
      { storage: '1TB', extraPrice: 14000 }
    ]
  },
  {
    id: 'galaxy-s24-plus',
    brand: 'Samsung',
    name: 'Galaxy S24 Plus 5G',
    deviceType: 'phone',
    basePrice: 44000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 5000 }
    ]
  },
  {
    id: 'galaxy-s24',
    brand: 'Samsung',
    name: 'Galaxy S24 5G',
    deviceType: 'phone',
    basePrice: 37000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 4000 }
    ]
  },
  {
    id: 'galaxy-s23-ultra',
    brand: 'Samsung',
    name: 'Galaxy S23 Ultra',
    deviceType: 'phone',
    basePrice: 45000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 6000 },
      { storage: '1TB', extraPrice: 11000 }
    ]
  },
  {
    id: 'galaxy-z-fold-5',
    brand: 'Samsung',
    name: 'Galaxy Z Fold 5',
    deviceType: 'phone',
    basePrice: 55000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 6000 }
    ]
  },

  // ONEPLUS
  {
    id: 'oneplus-12',
    brand: 'OnePlus',
    name: 'OnePlus 12 5G',
    deviceType: 'phone',
    basePrice: 36000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 5000 }
    ]
  },
  {
    id: 'oneplus-12r',
    brand: 'OnePlus',
    name: 'OnePlus 12R 5G',
    deviceType: 'phone',
    basePrice: 23000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 3000 }
    ]
  },
  {
    id: 'oneplus-11',
    brand: 'OnePlus',
    name: 'OnePlus 11 5G',
    deviceType: 'phone',
    basePrice: 26000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 3500 }
    ]
  },
  {
    id: 'oneplus-nord-4',
    brand: 'OnePlus',
    name: 'OnePlus Nord 4 5G',
    deviceType: 'phone',
    basePrice: 17500,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 2500 }
    ]
  },

  // GOOGLE
  {
    id: 'pixel-9-pro-xl',
    brand: 'Google',
    name: 'Google Pixel 9 Pro XL',
    deviceType: 'phone',
    basePrice: 55000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 6000 },
      { storage: '512GB', extraPrice: 11000 }
    ]
  },
  {
    id: 'pixel-9-pro',
    brand: 'Google',
    name: 'Google Pixel 9 Pro',
    deviceType: 'phone',
    basePrice: 49000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 5000 },
      { storage: '512GB', extraPrice: 10000 }
    ]
  },
  {
    id: 'pixel-8-pro',
    brand: 'Google',
    name: 'Google Pixel 8 Pro',
    deviceType: 'phone',
    basePrice: 34000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 4000 }
    ]
  },

  // XIAOMI
  {
    id: 'xiaomi-14-ultra',
    brand: 'Xiaomi',
    name: 'Xiaomi 14 Ultra',
    deviceType: 'phone',
    basePrice: 46000,
    storages: [
      { storage: '512GB', extraPrice: 0 }
    ]
  },
  {
    id: 'xiaomi-14',
    brand: 'Xiaomi',
    name: 'Xiaomi 14 5G',
    deviceType: 'phone',
    basePrice: 32000,
    storages: [
      { storage: '512GB', extraPrice: 0 }
    ]
  },
  {
    id: 'redmi-note-13-pro-plus',
    brand: 'Xiaomi',
    name: 'Redmi Note 13 Pro+ 5G',
    deviceType: 'phone',
    basePrice: 16000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 2500 }
    ]
  },

  // VIVO
  {
    id: 'vivo-x100-pro',
    brand: 'Vivo',
    name: 'Vivo X100 Pro 5G',
    deviceType: 'phone',
    basePrice: 42000,
    storages: [
      { storage: '512GB', extraPrice: 0 }
    ]
  },
  {
    id: 'vivo-v40-pro',
    brand: 'Vivo',
    name: 'Vivo V40 Pro 5G',
    deviceType: 'phone',
    basePrice: 24000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 3000 }
    ]
  },

  // OPPO
  {
    id: 'oppo-find-x7-ultra',
    brand: 'Oppo',
    name: 'Oppo Find X7 Ultra',
    deviceType: 'phone',
    basePrice: 43000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 4500 }
    ]
  },
  {
    id: 'oppo-reno-12-pro',
    brand: 'Oppo',
    name: 'Oppo Reno 12 Pro 5G',
    deviceType: 'phone',
    basePrice: 21000,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 2500 }
    ]
  },

  // REALME
  {
    id: 'realme-gt-6',
    brand: 'Realme',
    name: 'Realme GT 6 5G',
    deviceType: 'phone',
    basePrice: 21500,
    storages: [
      { storage: '256GB', extraPrice: 0 },
      { storage: '512GB', extraPrice: 3000 }
    ]
  },
  {
    id: 'realme-12-pro-plus',
    brand: 'Realme',
    name: 'Realme 12 Pro+ 5G',
    deviceType: 'phone',
    basePrice: 15500,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 2000 }
    ]
  },

  // NOTHING
  {
    id: 'nothing-phone-2',
    brand: 'Nothing',
    name: 'Nothing Phone (2)',
    deviceType: 'phone',
    basePrice: 23000,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 3000 },
      { storage: '512GB', extraPrice: 5500 }
    ]
  },
  {
    id: 'nothing-phone-2a',
    brand: 'Nothing',
    name: 'Nothing Phone (2a) Plus',
    deviceType: 'phone',
    basePrice: 14500,
    storages: [
      { storage: '128GB', extraPrice: 0 },
      { storage: '256GB', extraPrice: 2000 }
    ]
  }
];

export const CONDITION_DETAILS: Record<
  DeviceCondition,
  {
    name: string;
    description: string;
    multiplier: number;
    badge: string;
  }
> = {
  'like-new': {
    name: 'Like New',
    description: 'Flawless condition, zero scratches or dents, fully functional screen & battery',
    multiplier: 1.0,
    badge: '100% Value'
  },
  good: {
    name: 'Good',
    description: 'Minor micro-scratches from normal use, no cracks, all hardware works perfectly',
    multiplier: 0.85,
    badge: '85% Value'
  },
  fair: {
    name: 'Fair',
    description: 'Visible wear/scratches on body, battery health > 75%, original screen working',
    multiplier: 0.65,
    badge: '65% Value'
  },
  damaged: {
    name: 'Damaged',
    description: 'Cracked screen or back glass, minor body dents, but powers on & functions',
    multiplier: 0.4,
    badge: '40% Value'
  }
};

export function calculateEstimatedValue(
  modelId: string,
  storage: string,
  condition: DeviceCondition
): number {
  const model = VALUATION_MODELS.find((m) => m.id === modelId);
  if (!model) return 0;

  const storageTier = model.storages.find((s) => s.storage === storage);
  const extra = storageTier ? storageTier.extraPrice : 0;
  const conditionInfo = CONDITION_DETAILS[condition];
  const multiplier = conditionInfo ? conditionInfo.multiplier : 1.0;

  const baseWithStorage = model.basePrice + extra;
  const calculated = Math.round((baseWithStorage * multiplier) / 100) * 100;
  return calculated;
}
