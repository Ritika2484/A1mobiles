import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'iphone-17-pro-max',
    brand: 'Apple',
    name: 'iPhone 17 Pro Max',
    category: 'smartphones',
    price: 139900,
    originalPrice: 149900,
    discount: 7,
    rating: 4.9,
    reviewsCount: 2840,
    image: '/images/hero-phone.jpg',
    images: [
      '/images/hero-phone.jpg',
      '/images/deal-phone.jpg',
      '/images/samsung-s26.jpg'
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#9E9A93' },
      { name: 'Dark Titanium', hex: '#3B3B3D' },
      { name: 'Desert Titanium', hex: '#D4C4B5' },
      { name: 'White Titanium', hex: '#F2F1ED' }
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    description: 'The iPhone 17 Pro Max forged in aerospace-grade titanium with the breakthrough A19 Pro chip, revolutionary vapor chamber cooling, and next-generation 48MP Pro camera system with 10x telephoto zoom.',
    specifications: {
      'Display': '6.9-inch Super Retina XDR OLED, 120Hz ProMotion, 3000 nits peak',
      'Processor': 'Apple A19 Pro (3nm) with 6-core GPU & Hardware Ray Tracing',
      'Rear Camera': '48MP Main + 48MP Ultra Wide + 48MP 10x Periscope Telephoto',
      'Front Camera': '18MP TrueDepth with Autofocus',
      'Battery': 'Up to 33 hours video playback, 35W wired, 25W MagSafe',
      'OS': 'iOS 19 with Apple Intelligence',
      'Build': 'Grade 5 Titanium frame, Ceramic Shield 2.0 front & back',
      'Weight': '221 grams'
    },
    features: [
      'Titanium design with refined contoured edges',
      'A19 Pro chip delivers class-leading console-level gaming',
      'Customizable Action Button with tactile haptics',
      'USB-C with USB 3 speeds for pro video workflow',
      'Advanced 48MP camera trio with spatial video capture'
    ],
    whatsInTheBox: [
      'iPhone 17 Pro Max with iOS 19',
      'USB-C Charge Cable (1m braided)',
      'Documentation & SIM Ejector'
    ],
    featured: true,
    bestseller: true,
    newArrival: true,
    inStock: true,
    tag: 'Flagship of 2026'
  },
  {
    id: 'prod-2',
    slug: 'samsung-galaxy-s26-ultra',
    brand: 'Samsung',
    name: 'Samsung Galaxy S26 Ultra',
    category: 'smartphones',
    price: 119999,
    originalPrice: 134999,
    discount: 11,
    rating: 4.8,
    reviewsCount: 1950,
    image: '/images/samsung-s26.jpg',
    images: [
      '/images/samsung-s26.jpg',
      '/images/deal-phone.jpg',
      '/images/hero-phone.jpg'
    ],
    colors: [
      { name: 'Titanium Black', hex: '#232323' },
      { name: 'Titanium Gray', hex: '#636466' },
      { name: 'Titanium Violet', hex: '#584d6b' },
      { name: 'Titanium Yellow', hex: '#eedc9a' }
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    description: 'Galaxy S26 Ultra redefines mobile intelligence with Snapdragon 8 Elite Gen 2, integrated S Pen stylus, Corning Gorilla Armor 2 anti-reflective display, and 200MP Quad Tele AI zoom camera.',
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X, 1-120Hz LTPO, 3100 nits',
      'Processor': 'Qualcomm Snapdragon 8 Elite Gen 2 for Galaxy',
      'Rear Camera': '200MP Main + 50MP 5x Periscope + 12MP 3x Telephoto + 50MP Ultra-Wide',
      'Front Camera': '12MP Dual Pixel AF',
      'Battery': '5000mAh with 45W Fast Charging 2.0',
      'Stylus': 'Integrated Bluetooth Low Energy S Pen with 2.8ms latency',
      'OS': 'One UI 7.1 based on Android 16 (7 years OS updates)',
      'Weight': '232 grams'
    },
    features: [
      'Galaxy AI 2.0 with real-time live interpreter & Circle to Search',
      'Built-in S Pen for seamless note taking & precision sketching',
      'Armor Aluminum & Titanium frame with Corning Gorilla Armor glass',
      'Super Quad-Pixel 200MP sensor with AI nightography'
    ],
    whatsInTheBox: [
      'Samsung Galaxy S26 Ultra 5G',
      'Integrated S Pen',
      'USB Type-C to Type-C Cable',
      'SIM Ejection Tool & Quick Start Guide'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Best AI Camera'
  },
  {
    id: 'prod-3',
    slug: 'oneplus-13',
    brand: 'OnePlus',
    name: 'OnePlus 13',
    category: 'smartphones',
    price: 69999,
    originalPrice: 74999,
    discount: 7,
    rating: 4.7,
    reviewsCount: 1420,
    image: '/images/oneplus-13.jpg',
    images: [
      '/images/oneplus-13.jpg',
      '/images/hero-phone.jpg'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#144c38' },
      { name: 'Midnight Black', hex: '#1e1e1e' },
      { name: 'Arctic White', hex: '#e8eaed' }
    ],
    storageOptions: ['256GB', '512GB'],
    description: 'OnePlus 13 brings hyper-speed performance with Snapdragon 8 Elite, 6000mAh Glacier silicon battery, 100W SUPERVOOC charging, and 50MP triple camera system tuned by legendary Hasselblad.',
    specifications: {
      'Display': '6.82-inch 2K Oriental OLED, 120Hz ProXDR, 4500 nits peak',
      'Processor': 'Qualcomm Snapdragon 8 Elite (3nm)',
      'Rear Camera': '50MP Sony LYT-808 + 50MP Periscope Telephoto + 50MP Ultra-Wide',
      'Front Camera': '32MP Sony Sensor',
      'Battery': '6000mAh Silicon-Carbon Battery with 100W Wired + 50W AIRVOOC',
      'Water Resistance': 'IP68 / IP69 certified',
      'OS': 'OxygenOS 15 based on Android 15',
      'Weight': '213 grams'
    },
    features: [
      'Hasselblad Camera for Mobile 5th Gen with Natural Color Calibration',
      'Massive 6000mAh Glacier battery lasts 2 full days',
      'Aqua Touch 2.0 works smoothly even with wet hands',
      '100W charging fills 1-100% in just 32 minutes'
    ],
    whatsInTheBox: [
      'OnePlus 13 Smartphone',
      '100W SUPERVOOC Power Adapter',
      'Type-C to Type-C Cable (Red)',
      'Pre-applied Screen Protector & Case'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Battery King'
  },
  {
    id: 'prod-4',
    slug: 'google-pixel-10-pro',
    brand: 'Google',
    name: 'Google Pixel 10 Pro',
    category: 'smartphones',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    rating: 4.8,
    reviewsCount: 1180,
    image: '/images/pixel-10.jpg',
    images: [
      '/images/pixel-10.jpg',
      '/images/hero-phone.jpg'
    ],
    colors: [
      { name: 'Porcelain White', hex: '#f4f3ef' },
      { name: 'Obsidian Black', hex: '#262626' },
      { name: 'Hazel Grey', hex: '#878c85' },
      { name: 'Rose Quartz', hex: '#eed4d4' }
    ],
    storageOptions: ['128GB', '256GB', '512GB'],
    description: 'Engineered by Google, the Pixel 10 Pro delivers uncompromised computational photography, the Tensor G5 chip with dedicated on-device Gemini Nano, and 7 years of Pixel Feature Drops.',
    specifications: {
      'Display': '6.3-inch Super Actua LTPO OLED, 1-120Hz, 3000 nits peak',
      'Processor': 'Google Tensor G5 (TSMC 3nm) + Titan M2 Security',
      'Rear Camera': '50MP Main + 48MP 5x Telephoto + 48MP Ultra-Wide with Macro Focus',
      'Front Camera': '42MP Dual PD selfie camera with 103° ultrawide',
      'Battery': '4700mAh with Fast Qi2 Wireless Charging',
      'AI Features': 'Gemini Live, Magic Editor, Best Take, Video Boost 8K',
      'OS': 'Pure Android 16 with 7 years of OS & security upgrades',
      'Weight': '199 grams'
    },
    features: [
      'Google Tensor G5 chip built on custom TSMC 3nm architecture',
      'Deep Gemini integration with instant multimodal visual search',
      'Pro triple camera with unmatched skin tone accuracy & Real Tone',
      'Compact hand-friendly form factor with zero compromise on telephoto'
    ],
    whatsInTheBox: [
      'Google Pixel 10 Pro',
      '1m USB-C to USB-C Cable (USB 2.0)',
      'Quick Switch Adapter & SIM tool'
    ],
    featured: true,
    inStock: true,
    tag: 'Pure Android & AI'
  },
  {
    id: 'prod-5',
    slug: 'xiaomi-15-ultra',
    brand: 'Xiaomi',
    name: 'Xiaomi 15 Ultra',
    category: 'smartphones',
    price: 79999,
    originalPrice: 89999,
    discount: 11,
    rating: 4.6,
    reviewsCount: 890,
    image: '/images/xiaomi-15.jpg',
    images: [
      '/images/xiaomi-15.jpg',
      '/images/samsung-s26.jpg'
    ],
    colors: [
      { name: 'Ceramic White', hex: '#fafafa' },
      { name: 'Vegan Leather Black', hex: '#222222' }
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    description: 'Co-engineered with Leica, Xiaomi 15 Ultra features an unprecedented 1-inch Sony LYT-900 sensor, 200MP telephoto periscope lens, Snapdragon 8 Elite, and premium nano-leather build.',
    specifications: {
      'Display': '6.73-inch WQHD+ AMOLED, 120Hz LTPO, 3200 nits peak',
      'Processor': 'Snapdragon 8 Elite Mobile Platform',
      'Rear Camera': '50MP 1-inch Main + 200MP 4.3x Periscope + 50MP 3.2x Tele + 50MP Ultra-Wide',
      'Optics': 'Leica Summilux lenses with Stepless Variable Aperture',
      'Battery': '5400mAh with 90W HyperCharge wired & 80W wireless',
      'OS': 'Xiaomi HyperOS 2.0 based on Android 15',
      'Weight': '226 grams'
    },
    features: [
      'Quad Leica camera array spanning 12mm to 120mm optical zoom',
      'Variable aperture from f/1.63 to f/4.0 for true cinematic depth of field',
      'Titanium alloy structural frame with IP68 dust and water immersion',
      'HyperOS 2 with AI creativity tools and fluid animations'
    ],
    whatsInTheBox: [
      'Xiaomi 15 Ultra Smartphone',
      '90W Fast Charger Adapter',
      'USB Type-C Cable',
      'Protective Case & SIM Eject Tool'
    ],
    featured: true,
    inStock: true,
    tag: 'Leica Pro Optics'
  },
  {
    id: 'prod-6',
    slug: 'nothing-phone-3',
    brand: 'Nothing',
    name: 'Nothing Phone (3)',
    category: 'smartphones',
    price: 59999,
    originalPrice: 64999,
    discount: 8,
    rating: 4.7,
    reviewsCount: 1640,
    image: '/images/nothing-phone-3.jpg',
    images: [
      '/images/nothing-phone-3.jpg',
      '/images/deal-phone.jpg'
    ],
    colors: [
      { name: 'Transparent White', hex: '#e5e5e5' },
      { name: 'Dark Smoke', hex: '#202020' }
    ],
    storageOptions: ['128GB', '256GB', '512GB'],
    description: 'Nothing Phone (3) pairs radical transparency with high-level power. Featuring the iconic Glyph Interface 3.0 with dynamic notification illumination, custom widgets, and flagship dual 50MP cameras.',
    specifications: {
      'Display': '6.7-inch Flexible LTPO OLED, 1-120Hz adaptive, 2600 nits',
      'Processor': 'Qualcomm Snapdragon 8s Gen 4 with AI Engine',
      'Rear Camera': '50MP Sony Main OIS + 50MP Ultra-Wide Macro + 50MP 3x Telephoto',
      'Front Camera': '32MP High Resolution Sensor',
      'Battery': '5100mAh with 65W Fast Charging & 15W Wireless Charging',
      'Glyph Lights': '33 individually addressable LED light zones',
      'OS': 'Nothing OS 3.0 (Clean, Bloatware-free Android 15)',
      'Weight': '201 grams'
    },
    features: [
      'Iconic transparent industrial design with Glyph Interface 3.0',
      'Nothing OS 3.0 with monochrome minimalist aesthetic',
      'Glyph Timer, Progress Bar, and essential notifications',
      'Symmetric narrow bezels with lightweight recycled aluminum chassis'
    ],
    whatsInTheBox: [
      'Nothing Phone (3)',
      'Nothing Cable (c-c) with transparent connectors',
      'Pre-applied Screen Protector',
      'SIM Tray Ejector & Safety Guide'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Iconic Design'
  },
  // EARBUDS
  {
    id: 'prod-7',
    slug: 'airpods-pro-3',
    brand: 'Apple',
    name: 'AirPods Pro (3rd Generation)',
    category: 'earbuds',
    price: 24900,
    originalPrice: 26900,
    discount: 7,
    rating: 4.9,
    reviewsCount: 3100,
    image: '/images/earbuds.jpg',
    images: ['/images/earbuds.jpg'],
    colors: [
      { name: 'Titanium Slate', hex: '#444446' },
      { name: 'Gloss White', hex: '#f7f7f7' }
    ],
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio that automatically tailors noise control to your environment, and Personalized Spatial Audio with dynamic head tracking.',
    specifications: {
      'Audio Technology': 'Custom high-excursion Apple driver & high dynamic range amplifier',
      'Chip': 'Apple H3 headphone chip & U2 chip in MagSafe Case',
      'Battery Life': 'Up to 7 hours listening time with ANC, up to 34 hours with case',
      'Connectivity': 'Bluetooth 5.4, ultra-low latency audio',
      'Resistance': 'IP54 dust, sweat, and water resistant (earbuds and case)'
    },
    features: [
      'Pro-level Active Noise Cancellation eliminates unwanted noise',
      'Transparency mode lets you hear the world comfortably around you',
      'Conversation Awareness lowers volume when you begin speaking',
      'Precision Finding for case using built-in speaker'
    ],
    whatsInTheBox: [
      'AirPods Pro 3',
      'MagSafe Charging Case (USB-C) with speaker and lanyard loop',
      'Silicone ear tips (four sizes: XS, S, M, L)',
      'USB-C Charge Cable'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Top Audio'
  },
  {
    id: 'prod-8',
    slug: 'galaxy-buds3-pro',
    brand: 'Samsung',
    name: 'Samsung Galaxy Buds3 Pro',
    category: 'earbuds',
    price: 18999,
    originalPrice: 21999,
    discount: 14,
    rating: 4.7,
    reviewsCount: 1350,
    image: '/images/earbuds.jpg',
    images: ['/images/earbuds.jpg'],
    colors: [
      { name: 'Silver Blade', hex: '#b0b3b8' },
      { name: 'Frost White', hex: '#f0f0f0' }
    ],
    description: 'Blade design with Blade Lights, 2-way woofer + planar tweeter, 24-bit 96kHz Hi-Fi codec, and AI-powered Adaptive Noise Control with Voice Detect.',
    specifications: {
      'Speakers': 'Enhanced 2-Way Woofer + Planar Tweeter with Dual Amp',
      'Audio Codec': 'Samsung Seamless Codec (SSC) up to 24bit/96kHz',
      'Battery': 'Up to 30 hours total playback with ANC off',
      'Waterproof': 'IP57 water and sweat resistant',
      'Bluetooth': 'v5.4 with Auto Switch across Galaxy devices'
    },
    features: [
      'Hi-Res Audio with dual amplifiers for crystal clear fidelity',
      'Blade Lights for modern futuristic styling',
      'Real-time AI interpreter right into your ears',
      'Intuitive pinch & swipe stem gesture controls'
    ],
    whatsInTheBox: [
      'Galaxy Buds3 Pro (L/R)',
      'Wireless Charging Case',
      'Ear Tips (S, M, L)',
      'USB-C Charging Cable'
    ],
    featured: false,
    inStock: true,
    tag: 'Hi-Fi Sound'
  },
  // SMARTWATCHES
  {
    id: 'prod-9',
    slug: 'apple-watch-ultra-3',
    brand: 'Apple',
    name: 'Apple Watch Ultra 3',
    category: 'smartwatches',
    price: 89900,
    originalPrice: 94900,
    discount: 5,
    rating: 4.9,
    reviewsCount: 940,
    image: '/images/smartwatch.jpg',
    images: ['/images/smartwatch.jpg'],
    colors: [
      { name: 'Natural Titanium', hex: '#9E9A93' },
      { name: 'Black Titanium', hex: '#262627' }
    ],
    description: 'The ultimate sports and adventure watch. Featuring a rugged 49mm titanium case, precision dual-frequency GPS, up to 72 hours of battery life in Low Power Mode, and 3000 nits display.',
    specifications: {
      'Case Size': '49mm aerospace-grade titanium case',
      'Display': 'Sapphire crystal Always-On Retina display, 3000 nits',
      'Battery': 'Up to 36 hours regular use, 72 hours low power mode',
      'Sensors': 'ECG, Blood Oxygen, Temperature sensing, Depth gauge to 40m',
      'Water Resistance': '100m water resistant, EN13319 certified for diving'
    },
    features: [
      'Precision dual-frequency GPS calculates distance, pace, and route maps',
      'Customizable Action button gives instant control over workouts',
      '86-decibel siren audible from up to 180 meters',
      'Dual speakers and three-mic array with beamforming'
    ],
    whatsInTheBox: [
      'Apple Watch Ultra 3 (Titanium)',
      'Ocean / Alpine / Trail Loop Band',
      'Apple Watch Magnetic Fast Charger to USB-C Cable (1m)'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Ultimate Durability'
  },
  {
    id: 'prod-10',
    slug: 'galaxy-watch-8-pro',
    brand: 'Samsung',
    name: 'Samsung Galaxy Watch 8 Pro',
    category: 'smartwatches',
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    rating: 4.8,
    reviewsCount: 820,
    image: '/images/smartwatch.jpg',
    images: ['/images/smartwatch.jpg'],
    colors: [
      { name: 'Dark Titanium', hex: '#2b2b2b' },
      { name: 'Silver Titanium', hex: '#d1d5db' }
    ],
    description: 'Advanced 3nm processor, Sapphire crystal glass, BioActive sensor with AGEs index tracking, dual-frequency GPS, and up to 100 hours battery life in Power Saving Mode.',
    specifications: {
      'Display': '1.5-inch Super AMOLED 480x480, Sapphire Crystal, 3000 nits',
      'Processor': 'Exynos W1000 (3nm Penta-core)',
      'Battery': '590mAh with WPC-based wireless fast charging',
      'Health': 'Heart rate, ECG, Blood pressure, BIA body composition, Sleep apnea detection',
      'Durability': 'Titanium Grade 4, 10ATM + IP68, MIL-STD-810H'
    },
    features: [
      'Galaxy AI Energy Score tracks your physical readiness every morning',
      'Dual-frequency GPS accurately logs outdoor runs & hikes',
      'Track Body Composition (BIA) in just 15 seconds',
      'Rotating digital touch bezel with haptic feedback'
    ],
    whatsInTheBox: [
      'Galaxy Watch 8 Pro',
      'D-Buckle Sport Strap',
      'Fast Wireless Magnetic Charger',
      'Quick Start Guide'
    ],
    featured: false,
    inStock: true,
    tag: 'Best Android Watch'
  },
  // ACCESSORIES
  {
    id: 'prod-11',
    slug: 'anker-100w-gan-charger',
    brand: 'Anker',
    name: 'Anker Prime 100W GaN 4-Port Fast Charger',
    category: 'accessories',
    price: 4999,
    originalPrice: 6499,
    discount: 23,
    rating: 4.9,
    reviewsCount: 1530,
    image: '/images/accessories.jpg',
    images: ['/images/accessories.jpg'],
    colors: [
      { name: 'Space Gray', hex: '#374151' },
      { name: 'Matte Black', hex: '#111827' }
    ],
    description: 'Ultra-compact Gallium Nitride (GaN) fast wall charger with 3x USB-C and 1x USB-A ports. Powers up phones, tablets, and laptops simultaneously with dynamic intelligent power allocation.',
    specifications: {
      'Total Output': '100W Max with PowerIQ 4.0 technology',
      'Ports': '3 x USB-C (up to 100W single port), 1 x USB-A (up to 22.5W)',
      'Safety': 'ActiveShield 2.0 temperature monitoring 3,000,000 times/day',
      'Size': '43% smaller than original 96W single-port chargers',
      'Compatibility': 'Universal (Apple, Samsung, Google, OnePlus, Laptops)'
    },
    features: [
      'Charges iPhone 17 Pro to 50% in just 25 minutes',
      'Intelligent power distribution charges 4 devices at once safely',
      'Foldable prongs for travel convenience',
      'GaNPrime technology generates 30% less heat'
    ],
    whatsInTheBox: [
      'Anker Prime 100W GaN Wall Charger',
      'Silicone Cable Organizer',
      'Instruction Manual & 24-Month Warranty Card'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Fast Charging'
  },
  {
    id: 'prod-12',
    slug: 'magsafe-powerbank-10000mah',
    brand: 'Apple',
    name: 'A1 Ultra MagSafe Power Bank 10,000mAh',
    category: 'accessories',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.8,
    reviewsCount: 970,
    image: '/images/accessories.jpg',
    images: ['/images/accessories.jpg'],
    colors: [
      { name: 'Titanium Gray', hex: '#6b7280' },
      { name: 'Midnight', hex: '#0f172a' }
    ],
    description: 'Magnetic wireless power bank with 15W Qi2 fast wireless charging, strong 12N N52 neodymium magnets, and bidirectional 30W USB-C PD wired input/output with smart digital LED percentage screen.',
    specifications: {
      'Capacity': '10,000mAh (38.5Wh) Premium Li-Polymer',
      'Wireless Output': '15W Qi2 certified wireless fast charge',
      'Wired Output': '30W USB-C PD 3.0 / PPS',
      'Display': 'Smart LED digital battery level readout',
      'Weight': '198 grams'
    },
    features: [
      'Snaps seamlessly onto iPhone 12 to 17 without blocking cameras',
      'Charges phone wire-free 2 full times',
      'Pass-through charging lets you charge phone and powerbank together',
      'Built-in foldable zinc-alloy kickstand for hands-free video watching'
    ],
    whatsInTheBox: [
      'Magnetic 10,000mAh Power Bank',
      'Braided 0.3m USB-C to USB-C Cable',
      'User Manual'
    ],
    featured: false,
    inStock: true,
    tag: 'Pocket Power'
  },
  // TABLETS
  {
    id: 'prod-13',
    slug: 'apple-ipad-pro-13-m4',
    brand: 'Apple',
    name: 'Apple iPad Pro 13-inch (M4 Chip)',
    category: 'tablets',
    price: 129900,
    originalPrice: 139900,
    discount: 7,
    rating: 4.9,
    reviewsCount: 1120,
    image: '/images/tablet.jpg',
    images: ['/images/tablet.jpg'],
    colors: [
      { name: 'Space Black', hex: '#242426' },
      { name: 'Silver', hex: '#e3e4e6' }
    ],
    storageOptions: ['256GB', '512GB', '1TB', '2TB'],
    description: 'The thinnest Apple product ever at just 5.1mm. Features groundbreaking Ultra Retina XDR Tandem OLED display, outrageous Apple M4 silicon, and Apple Pencil Pro support.',
    specifications: {
      'Display': '13-inch Ultra Retina XDR Tandem OLED, 1000 nits full screen, 1600 nits peak',
      'Processor': 'Apple M4 chip (9-core CPU, 10-core GPU, 16-core Neural Engine)',
      'Camera': '12MP Wide back camera with LiDAR scanner, Landscape 12MP Ultra Wide front',
      'Audio': 'Four speaker sound system with studio-quality mics',
      'Thickness': '5.1 mm ultra-thin profile',
      'Connectivity': 'Thunderbolt 4 / USB 4 port, Wi-Fi 6E & 5G cellular',
      'Weight': '579 grams'
    },
    features: [
      'Tandem OLED technology delivers unprecedented contrast and extreme dynamic range',
      'M4 chip powers intense 4K video rendering and AI workflows effortlessly',
      'Supports Apple Pencil Pro with squeeze gestures and barrel roll gyroscope',
      'Landscape Center Stage camera ideal for video meetings'
    ],
    whatsInTheBox: [
      '13-inch iPad Pro (M4)',
      'USB-C Charge Cable (1m)',
      '20W USB-C Power Adapter',
      'Polishing Cloth'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Creative Beast'
  },
  {
    id: 'prod-14',
    slug: 'samsung-galaxy-tab-s10-ultra',
    brand: 'Samsung',
    name: 'Samsung Galaxy Tab S10 Ultra',
    category: 'tablets',
    price: 108999,
    originalPrice: 119999,
    discount: 9,
    rating: 4.8,
    reviewsCount: 780,
    image: '/images/tablet.jpg',
    images: ['/images/tablet.jpg'],
    colors: [
      { name: 'Moonstone Gray', hex: '#484c52' },
      { name: 'Platinum Silver', hex: '#d1d5db' }
    ],
    storageOptions: ['256GB', '512GB'],
    description: 'Massive 14.6-inch Dynamic AMOLED 2X anti-reflection display, MediaTek Dimensity 9300+ flagship performance, IP68 water resistance, and included S Pen with Galaxy AI productivity suite.',
    specifications: {
      'Display': '14.6-inch Dynamic AMOLED 2X, 120Hz, Anti-Reflective Coating',
      'Processor': 'MediaTek Dimensity 9300+ (4nm)',
      'Battery': '11,200mAh with 45W Fast Charging',
      'Stylus': 'S Pen included in box with Bluetooth Air Actions',
      'Durability': 'Armor Aluminum chassis + IP68 dust and water resistance',
      'OS': 'Android 15 with Samsung DeX desktop mode',
      'Weight': '718 grams'
    },
    features: [
      'Anti-reflective screen lets you work even under direct sunlight',
      'Samsung DeX transforms tablet into a true multi-window PC experience',
      'Quad speakers tuned by AKG with Dolby Atmos surround sound',
      'Galaxy AI Circle to Search and Note Assist transcribe voice notes instantly'
    ],
    whatsInTheBox: [
      'Galaxy Tab S10 Ultra',
      'S Pen Stylus',
      'USB-C to C Data Cable',
      'Ejection Pin'
    ],
    featured: false,
    inStock: true,
    tag: 'PC-Level Power'
  },
  // BEST DEALS PHONES
  {
    id: 'deal-iphone-15',
    slug: 'iphone-15',
    brand: 'Apple',
    name: 'iPhone 15',
    category: 'smartphones',
    price: 54900,
    originalPrice: 69900,
    discount: 21,
    rating: 4.8,
    reviewsCount: 3890,
    image: '/images/hero-phone.jpg',
    images: ['/images/hero-phone.jpg', '/images/deal-phone.jpg'],
    colors: [
      { name: 'Black', hex: '#1c1c1e' },
      { name: 'Blue', hex: '#d2dbe0' },
      { name: 'Green', hex: '#d4e0d4' },
      { name: 'Yellow', hex: '#f0edd8' },
      { name: 'Pink', hex: '#e9d5d8' }
    ],
    storageOptions: ['128GB', '256GB'],
    description: 'Dynamic Island, 48MP main camera with 2x Telephoto, and durable color-infused glass design with USB-C.',
    specifications: {
      'Display': '6.1-inch Super Retina XDR display',
      'Processor': 'A16 Bionic chip with 5-core GPU',
      'Camera': '48MP Main + 12MP Ultra Wide',
      'Battery': 'Up to 20 hours video playback',
      'Port': 'USB-C with USB 2 support'
    },
    features: [
      'Dynamic Island bubbles up alerts & Live Activities',
      '48MP Main camera for super-high-resolution photos',
      'Next-generation portraits with focus & depth control',
      'All-day battery life with USB-C charging simplicity'
    ],
    whatsInTheBox: ['iPhone 15 with iOS 18', 'USB-C Charge Cable (1m)'],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Best Deal'
  },
  {
    id: 'deal-samsung-s25',
    slug: 'samsung-galaxy-s25',
    brand: 'Samsung',
    name: 'Samsung Galaxy S25',
    category: 'smartphones',
    price: 71900,
    originalPrice: 79900,
    discount: 10,
    rating: 4.7,
    reviewsCount: 1450,
    image: '/images/samsung-s26.jpg',
    images: ['/images/samsung-s26.jpg', '/images/deal-phone.jpg'],
    colors: [
      { name: 'Onyx Black', hex: '#202022' },
      { name: 'Marble Gray', hex: '#6d7075' },
      { name: 'Cobalt Violet', hex: '#5b5470' }
    ],
    storageOptions: ['128GB', '256GB'],
    description: 'Galaxy S25 features Snapdragon 8 Elite, compact 6.2-inch Dynamic AMOLED 2X, advanced Galaxy AI tools, and 50MP triple camera system.',
    specifications: {
      'Display': '6.2-inch Dynamic AMOLED 2X, 120Hz LTPO, 2600 nits',
      'Processor': 'Snapdragon 8 Elite Mobile Platform',
      'Camera': '50MP Main OIS + 10MP 3x Telephoto + 12MP Ultra Wide',
      'Battery': '4000mAh with 25W Fast Charging'
    },
    features: [
      'Circle to Search with Google & Live Call Translation',
      'Armor Aluminum frame with IP68 water resistance',
      '7 generations of OS upgrades & 7 years security patches'
    ],
    whatsInTheBox: ['Galaxy S25 Smartphone', 'Data Cable (Type-C to C)', 'Ejection Pin'],
    featured: true,
    inStock: true,
    tag: 'Limited Offer'
  },
  {
    id: 'deal-pixel-9',
    slug: 'google-pixel-9',
    brand: 'Google',
    name: 'Google Pixel 9',
    category: 'smartphones',
    price: 71900,
    originalPrice: 79900,
    discount: 10,
    rating: 4.7,
    reviewsCount: 1220,
    image: '/images/pixel-10.jpg',
    images: ['/images/pixel-10.jpg'],
    colors: [
      { name: 'Obsidian', hex: '#262626' },
      { name: 'Porcelain', hex: '#f2f1ec' },
      { name: 'Wintergreen', hex: '#d2dfd8' },
      { name: 'Peony', hex: '#f0ccd4' }
    ],
    storageOptions: ['128GB', '256GB'],
    description: 'Powered by Google Tensor G4 with built-in Gemini Nano. Features an iconic sculpted camera bar, 50MP main sensor, and 7 years of Pixel drops.',
    specifications: {
      'Display': '6.3-inch Actua OLED, 60-120Hz, 2700 nits peak',
      'Processor': 'Google Tensor G4 with Titan M2 security',
      'Camera': '50MP Octa PD Main + 48MP Quad PD Ultra Wide',
      'Battery': '4700mAh with fast wireless charging'
    },
    features: [
      'Google Gemini built directly into the operating system',
      'Best Take, Add Me, and Magic Editor for flawless photos',
      'Corning Gorilla Glass Victus 2 front and back'
    ],
    whatsInTheBox: ['Google Pixel 9', 'USB-C to USB-C Cable (1m)', 'SIM tool'],
    featured: true,
    inStock: true,
    tag: 'AI Deal'
  },
  {
    id: 'deal-oneplus-nord',
    slug: 'oneplus-nord-4',
    brand: 'OnePlus',
    name: 'OnePlus Nord',
    category: 'smartphones',
    price: 29999,
    originalPrice: 33999,
    discount: 12,
    rating: 4.6,
    reviewsCount: 2190,
    image: '/images/oneplus-13.jpg',
    images: ['/images/oneplus-13.jpg'],
    colors: [
      { name: 'Mercurial Silver', hex: '#c5c7cb' },
      { name: 'Obsidian Midnight', hex: '#1f1f21' },
      { name: 'Oasis Green', hex: '#3b5849' }
    ],
    storageOptions: ['128GB', '256GB'],
    description: 'The only metal unibody 5G smartphone of the 5G era. Powered by Snapdragon 7+ Gen 3, 5500mAh battery, and 100W SUPERVOOC charging.',
    specifications: {
      'Display': '6.74-inch 1.5K AMOLED, 120Hz, 2150 nits peak',
      'Processor': 'Qualcomm Snapdragon 7+ Gen 3 (4nm)',
      'Camera': '50MP Sony LYT-600 OIS + 8MP Ultra Wide',
      'Battery': '5500mAh with 100W SUPERVOOC wired charging'
    },
    features: [
      'Sleek all-metal unibody craftsmanship',
      '100W SUPERVOOC charges 1-100% in just 28 minutes',
      'Aqua Touch technology for effortless rainy-day usage'
    ],
    whatsInTheBox: ['OnePlus Nord Smartphone', '100W SUPERVOOC Power Adapter', 'Type-C Cable'],
    featured: true,
    bestseller: true,
    inStock: true,
    tag: 'Hot Deal'
  },
  // MOBILE COVERS
  {
    id: 'cover-spigen-armor',
    slug: 'spigen-ultra-hybrid-armor-case',
    brand: 'Spigen',
    name: 'Spigen Ultra Hybrid Armor Case',
    category: 'mobile-covers',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.8,
    reviewsCount: 940,
    image: '/images/mobile-covers.jpg',
    images: ['/images/mobile-covers.jpg'],
    colors: [
      { name: 'Matte Titanium', hex: '#4b4b4d' },
      { name: 'Crystal Clear', hex: '#e8eaed' },
      { name: 'Midnight Black', hex: '#1c1c1e' }
    ],
    description: 'Military-grade drop protection with air cushion technology, anti-yellowing crystal clear back, and raised bezels for camera and screen.',
    specifications: {
      'Material': 'Shock-absorbing TPU bumper + Durable Polycarbonate back',
      'Drop Protection': 'MIL-STD 810G-516.6 Certified',
      'Compatibility': 'iPhone 17 & Galaxy S26 Series',
      'Wireless Charging': 'MagSafe & Qi2 Compatible'
    },
    features: [
      'Air Cushion Technology for high-impact corner absorption',
      'Enhanced tactile buttons with crisp click feedback',
      'Anti-fingerprint matte perimeter grip'
    ],
    whatsInTheBox: ['Spigen Ultra Hybrid Armor Case'],
    featured: true,
    inStock: true,
    tag: '40% OFF'
  },
  {
    id: 'cover-amber-leather',
    slug: 'amber-vintage-leather-magsafe-case',
    brand: 'A1 Essentials',
    name: 'Amber Vintage Leather MagSafe Case',
    category: 'mobile-covers',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.9,
    reviewsCount: 680,
    image: '/images/mobile-covers.jpg',
    images: ['/images/mobile-covers.jpg'],
    colors: [
      { name: 'Warm Amber Orange', hex: '#ea580c' },
      { name: 'Saddle Brown', hex: '#78350f' },
      { name: 'Classic Black', hex: '#171717' }
    ],
    description: 'Handcrafted genuine grain leather case that develops a rich natural patina over time. Equipped with neodymium N52 MagSafe magnets.',
    specifications: {
      'Material': 'Full-grain European Leather + Machined Aluminum buttons',
      'Interior': 'Soft microfiber protective lining',
      'Magnets': 'Strong 15N magnetic hold',
      'Compatibility': 'iPhone 15, 16 & 17 Pro Max'
    },
    features: [
      'Develops rich individual patina with daily handling',
      'Microfiber lining cushions against internal scratches',
      'CNC machined aluminum tactile volume and action buttons'
    ],
    whatsInTheBox: ['Amber Vintage Leather Case', 'Certificate of Authenticity'],
    featured: true,
    inStock: true,
    tag: 'Signature Leather'
  }
];

export const bestDeals = [
  products.find((p) => p.slug === 'iphone-15')!,
  products.find((p) => p.slug === 'samsung-galaxy-s25')!,
  products.find((p) => p.slug === 'google-pixel-9')!,
  products.find((p) => p.slug === 'oneplus-nord-4')!
].filter(Boolean);


export const dealOfTheWeek = {
  product: products[0], // iPhone 17 Pro Max
  title: 'SMARTPHONE DEAL OF THE WEEK',
  subtitle: 'Get More. Pay Less.',
  description: 'Limited-time offer on selected flagship smartphones. Get an extra ₹10,000 instant discount with HDFC & ICICI bank cards, plus free 2-year screen protection.',
  originalPrice: 149900,
  dealPrice: 139900,
  discountTag: '₹10,000 OFF',
  expiryTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
  claimedPercentage: 74
};
