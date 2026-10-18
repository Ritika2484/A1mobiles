'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Package,
  Award,
  Sparkles,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Active selections
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedStorage, setSelectedStorage] = useState<string>(
    product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'box' | 'delivery' | 'reviews'>('specs');
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const [isWished, setIsWished] = useState(false);
  const [isOrderingWhatsApp, setIsOrderingWhatsApp] = useState(false);

  React.useEffect(() => {
    setIsWished(isInWishlist(product.id));
  }, [isInWishlist, product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    router.push('/checkout');
  };

  const handleWhatsAppOrder = async () => {
    setIsOrderingWhatsApp(true);
    const note = `Variant: ${selectedStorage || 'Standard'}${selectedColor ? ` | Color: ${selectedColor}` : ''}`;
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          customerNote: note,
        }),
      });
      const data = await res.json();
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch (e) {
      console.warn('API enquiry failed, using direct WhatsApp fallback', e);
    } finally {
      setIsOrderingWhatsApp(false);
    }

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918726942338';
    const text = encodeURIComponent(
      `Hello! I would like to order:\n\nProduct: ${product.name}\n${note}\nPrice: ${formatINR(product.price)}\nQuantity: ${quantity}\nSubtotal: ${formatINR(product.price * quantity)}\nLink: https://a1mobileshop.in/products/${product.slug}\n\nPlease confirm availability!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-[#F5EFE6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#6E685F] mb-6 flex items-center flex-wrap gap-1.5">
          <Link href="/" className="hover:text-[#23201C]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#23201C]">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#23201C] capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#23201C] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Section: Gallery + Purchase Config */}
        <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-8 lg:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Product Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="relative w-full aspect-square bg-[#F5EFE6] rounded-2xl border border-[#E0D9CD] p-8 flex items-center justify-center overflow-hidden group">
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#23201C] text-[#F5EFE6] text-xs font-black shadow-sm">
                    {product.discount}% OFF
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isWished
                      ? 'bg-rose-50 text-rose-600 shadow-sm'
                      : 'bg-[#EAE4D9]/80 backdrop-blur-sm text-[#6E685F] hover:text-rose-600 hover:bg-[#EAE4D9] shadow-xs'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isWished ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Thumbnails Row */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-xl bg-[#F5EFE6] border-2 overflow-hidden shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-[#23201C] ring-2 ring-[#23201C]/20'
                          : 'border-[#E0D9CD] hover:border-[#DED7CA]'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        className="object-contain p-1.5"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Trust Highlights under gallery */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E0D9CD] text-center">
                <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E0D9CD]">
                  <ShieldCheck className="w-5 h-5 text-[#2E6B47] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#23201C] block">100% Genuine</span>
                  <span className="text-[10px] text-[#6E685F]">Brand Sealed</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E0D9CD]">
                  <Truck className="w-5 h-5 text-[#23201C] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#23201C] block">Fast Dispatch</span>
                  <span className="text-[10px] text-[#6E685F]">Gorakhpur Hub</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E0D9CD]">
                  <RotateCcw className="w-5 h-5 text-[#564F46] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#23201C] block">Easy Returns</span>
                  <span className="text-[10px] text-[#6E685F]">7 Days Policy</span>
                </div>
              </div>
            </div>

            {/* Right: Product Information & Configuration */}
            <div className="lg:col-span-6 space-y-6">
              {/* Brand, Title, Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#564F46] border border-[#E0D9CD] text-xs font-bold uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.inStock ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#E6EFE9] text-[#2E6B47] text-[11px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B47]" />
                      In Stock
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#23201C] tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-[#F5EFE6] px-2.5 py-1 rounded-lg border border-[#E0D9CD]">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-[#23201C]">{product.rating}</span>
                  </div>
                  <span className="text-xs text-[#6E685F]">
                    Based on <strong className="font-semibold text-[#23201C]">{product.reviewsCount}</strong> verified reviews
                  </span>
                </div>
              </div>

              {/* Price & EMI */}
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#E0D9CD] space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#23201C] tracking-tight">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-base line-through text-[#8E867C]">
                        {formatINR(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-[#2E6B47] bg-[#E6EFE9] px-2 py-0.5 rounded">
                        Save {formatINR(product.originalPrice - product.price)}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6E685F] pt-1">
                  <CreditCard className="w-4 h-4 text-[#564F46] shrink-0" />
                  <span>
                    No Cost EMI available starting from <strong className="text-[#23201C]">{formatINR(Math.round(product.price / 12))}/month</strong>
                  </span>
                </div>
              </div>

              {/* Description Snippet */}
              <p className="text-sm text-[#6E685F] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#23201C] mb-2.5">
                    <span>Selected Color: <strong className="text-[#23201C] font-extrabold">{selectedColor}</strong></span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedColor === color.name
                            ? 'border-[#23201C] bg-[#F5EFE6] shadow-xs ring-1 ring-[#23201C]/20'
                            : 'border-[#E0D9CD] bg-[#EAE4D9] hover:border-[#DED7CA]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#DED7CA] shadow-2xs"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[#23201C]">{color.name}</span>
                        {selectedColor === color.name && (
                          <Check className="w-3 h-3 text-[#23201C]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Selection */}
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#23201C] mb-2.5">
                    <span>Select Storage Variant:</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.storageOptions.map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStorage(st)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedStorage === st
                            ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C] shadow-sm'
                            : 'bg-[#F5EFE6] border-[#E0D9CD] text-[#23201C] hover:border-[#DED7CA]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & CTAs */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#23201C]">Quantity:</span>
                  <div className="flex items-center border border-[#DED7CA] rounded-xl overflow-hidden bg-[#F5EFE6]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-[#23201C] hover:bg-[#EAE4D9] font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-[#23201C]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-[#23201C] hover:bg-[#EAE4D9] font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#6E685F]">Total: {formatINR(product.price * quantity)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#F5EFE6] border-2 border-[#23201C] text-[#23201C] hover:bg-[#EAE4D9] font-bold text-sm transition-all shadow-xs group"
                  >
                    <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm transition-all shadow-sm group"
                  >
                    <Zap className="w-4 h-4" />
                    <span>BUY NOW</span>
                  </button>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={isOrderingWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#2E6B47] hover:bg-[#255739] disabled:opacity-50 text-[#F5EFE6] font-bold text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {isOrderingWhatsApp
                      ? 'Creating WhatsApp Order...'
                      : 'ORDER VIA WHATSAPP (INSTANT CONFIRMATION)'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Tabs for Desktop / Accordions for Mobile */}
        <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] shadow-sm overflow-hidden mb-16">
          {/* Desktop Tabs Header */}
          <div className="hidden md:flex border-b border-[#E0D9CD] bg-[#EAE4D9] px-6">
            {[
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'features', label: 'Key Features' },
              { id: 'box', label: "What's in the Box" },
              { id: 'delivery', label: 'Delivery & Warranty' },
              { id: 'reviews', label: `Reviews (${product.reviewsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 text-xs lg:text-sm font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-[#23201C] text-[#23201C] bg-[#F5EFE6]'
                    : 'border-transparent text-[#6E685F] hover:text-[#23201C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop Tab Contents */}
          <div className="hidden md:block p-8 lg:p-10">
            {activeTab === 'specs' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="text-lg font-bold text-[#23201C] mb-4">Complete Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-xl bg-[#F5EFE6] border border-[#E0D9CD] flex flex-col">
                      <span className="text-xs font-bold text-[#564F46] uppercase tracking-wider">{key}</span>
                      <span className="text-sm font-semibold text-[#23201C] mt-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="text-lg font-bold text-[#23201C] mb-4">Product Highlights</h3>
                <div className="space-y-3">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E0D9CD]">
                      <Sparkles className="w-5 h-5 text-[#564F46] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#23201C] leading-relaxed font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'box' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-[#23201C] mb-4">Inside the Packaging</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.whatsInTheBox.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#F5EFE6] border border-[#E0D9CD]">
                      <Package className="w-5 h-5 text-[#564F46] shrink-0" />
                      <span className="text-sm font-semibold text-[#23201C]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E0D9CD] space-y-2">
                  <Truck className="w-6 h-6 text-[#23201C] mb-2" />
                  <h4 className="font-bold text-[#23201C] text-base">Express Delivery</h4>
                  <p className="text-xs text-[#6E685F] leading-relaxed">
                    Orders placed before 2 PM are dispatched the same day from our Basharatpur, Gorakhpur store. Average delivery timeline across UP is 24-48 hours. Live tracking link is sent via WhatsApp and SMS upon shipment.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#E6EFE9] border border-[#2E6B47]/30 space-y-2">
                  <Award className="w-6 h-6 text-[#2E6B47] mb-2" />
                  <h4 className="font-bold text-[#23201C] text-base">Brand Warranty Support</h4>
                  <p className="text-xs text-[#2E6B47] leading-relaxed">
                    Includes 1-Year Official Manufacturer Warranty. Claim service directly at any authorized service center across India with the tax invoice provided with your purchase.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E0D9CD]">
                  <div>
                    <h3 className="text-lg font-bold text-[#23201C]">Customer Ratings &amp; Reviews</h3>
                    <p className="text-xs text-[#6E685F]">Verified buyer testimonials</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F5EFE6] px-3 py-1.5 rounded-xl border border-[#E0D9CD]">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <span className="text-base font-bold text-[#23201C]">{product.rating}</span>
                    <span className="text-xs text-[#6E685F]">/ 5</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: 'Vikram Joshi',
                      rating: 5,
                      date: '3 days ago',
                      title: 'Worth every rupee!',
                      comment: 'Phenomenal battery life and display quality. The camera in low light is mind blowing. Delivery from A1 Mobile Shop arrived in 2 days in secure tamper-evident packaging.',
                    },
                    {
                      name: 'Sneha Patel',
                      rating: 5,
                      date: '1 week ago',
                      title: 'Genuine Indian unit with official warranty registered',
                      comment: 'Was able to register warranty on official website instantly. Great customer service team answered all my questions on WhatsApp.',
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#E0D9CD] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#23201C]">{rev.name}</span>
                          <span className="text-[10px] font-semibold text-[#2E6B47] bg-[#E6EFE9] px-2 py-0.5 rounded-full border border-[#2E6B47]/20">
                            Verified
                          </span>
                        </div>
                        <span className="text-xs text-[#6E685F]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <h5 className="font-bold text-xs text-[#23201C]">{rev.title}</h5>
                      <p className="text-xs text-[#6E685F] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Accordions */}
          <div className="md:hidden divide-y divide-[#E0D9CD]">
            {/* Specs Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-[#23201C]"
              >
                <span>Specifications</span>
                {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4 text-[#23201C]" /> : <ChevronDown className="w-4 h-4 text-[#6E685F]" />}
              </button>
              {openAccordion === 'specs' && (
                <div className="px-5 pb-5 space-y-2 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 bg-[#F5EFE6] rounded-xl border border-[#E0D9CD]">
                      <strong className="block text-[#564F46] font-bold uppercase">{key}</strong>
                      <span className="text-[#23201C]">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('features')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-[#23201C]"
              >
                <span>Key Features</span>
                {openAccordion === 'features' ? <ChevronUp className="w-4 h-4 text-[#23201C]" /> : <ChevronDown className="w-4 h-4 text-[#6E685F]" />}
              </button>
              {openAccordion === 'features' && (
                <div className="px-5 pb-5 space-y-2 text-xs">
                  {product.features.map((f, i) => (
                    <div key={i} className="p-3 bg-[#F5EFE6] rounded-xl border border-[#E0D9CD] text-[#23201C]">
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What's in the Box Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('box')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-[#23201C]"
              >
                <span>What&apos;s in the Box</span>
                {openAccordion === 'box' ? <ChevronUp className="w-4 h-4 text-[#23201C]" /> : <ChevronDown className="w-4 h-4 text-[#6E685F]" />}
              </button>
              {openAccordion === 'box' && (
                <div className="px-5 pb-5 space-y-2 text-xs">
                  {product.whatsInTheBox.map((item, i) => (
                    <div key={i} className="p-3 bg-[#F5EFE6] rounded-xl border border-[#E0D9CD] text-[#23201C] font-medium">
                      • {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery & Warranty Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('delivery')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-[#23201C]"
              >
                <span>Delivery &amp; Warranty</span>
                {openAccordion === 'delivery' ? <ChevronUp className="w-4 h-4 text-[#23201C]" /> : <ChevronDown className="w-4 h-4 text-[#6E685F]" />}
              </button>
              {openAccordion === 'delivery' && (
                <div className="px-5 pb-5 space-y-3 text-xs text-[#6E685F]">
                  <div className="p-3 bg-[#F5EFE6] border border-[#E0D9CD] rounded-xl">
                    <strong className="block text-[#23201C] font-bold mb-1">Free Delivery</strong>
                    Orders dispatched same day from Gorakhpur.
                  </div>
                  <div className="p-3 bg-[#E6EFE9] border border-[#2E6B47]/30 rounded-xl">
                    <strong className="block text-[#2E6B47] font-bold mb-1">1-Year Warranty</strong>
                    Valid at any authorized brand service center across India.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#564F46] block mb-1">
                  You Might Also Like
                </span>
                <h2 className="text-2xl font-black text-[#23201C] tracking-tight">
                  Related Products
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#23201C] hover:text-[#564F46]"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
