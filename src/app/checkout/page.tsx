'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

export default function CheckoutPage() {
  const { cart, subtotal, discount, shipping, total, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: 'Gorakhpur',
    state: 'Uttar Pradesh',
    pincode: '273004',
    customerNote: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    whatsappUrl: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    total: number;
  } | null>(null);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!formData.address.trim()) {
      showToast('Please enter your delivery address', 'error');
      return;
    }
    if (!formData.city.trim() || !formData.pincode.trim()) {
      showToast('Please enter city and PIN code', 'error');
      return;
    }

    setIsSubmitting(true);

    const newOrderNum = `A1-${Math.floor(100000 + Math.random() * 900000)}`;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918726942338';

    // Format items list for WhatsApp
    const itemsText = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.product.name}${
            item.selectedStorage ? ` (${item.selectedStorage})` : ''
          } x ${item.quantity} - ${formatINR(item.product.price * item.quantity)}`
      )
      .join('\n');

    // Build formatted WhatsApp message
    const messageLines = [
      `🛒 *NEW ORDER - A1 MOBILE SHOP*`,
      `----------------------------------------`,
      `*Order ID:* ${newOrderNum}`,
      ``,
      `👤 *CUSTOMER DETAILS:*`,
      `• Name: ${formData.fullName.trim()}`,
      `• Phone: +91 ${formData.phone.trim()}`,
      formData.email.trim() ? `• Email: ${formData.email.trim()}` : null,
      ``,
      `📍 *DELIVERY ADDRESS:*`,
      `• Address: ${formData.address.trim()}`,
      formData.landmark.trim() ? `• Landmark: ${formData.landmark.trim()}` : null,
      `• City: ${formData.city.trim()}, ${formData.state.trim()}`,
      `• PIN Code: ${formData.pincode.trim()}`,
      ``,
      `📦 *ORDERED ITEMS:*`,
      itemsText,
      ``,
      `----------------------------------------`,
      `💰 *Subtotal:* ${formatINR(subtotal)}`,
      discount > 0 ? `🏷️ *Discount:* -${formatINR(discount)}` : null,
      `🚚 *Delivery:* FREE (Gorakhpur Dispatch)`,
      `💵 *TOTAL AMOUNT:* ${formatINR(total)}`,
      `💳 *Payment Mode:* Cash on Delivery / UPI upon Confirmation`,
      formData.customerNote.trim()
        ? `\n📝 *Customer Note:* ${formData.customerNote.trim()}`
        : null,
      `----------------------------------------`,
      `Please confirm my order and share estimated dispatch timing. Thank you!`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(messageLines)}`;

    // Optional: send enquiry to server in background
    try {
      if (cart.length > 0) {
        await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: cart[0].product.id,
            quantity: cart[0].quantity,
            customerNote: `Order #${newOrderNum} | ${formData.fullName} | ${formData.address}, ${formData.city}`,
          }),
        }).catch(() => {});
      }
    } catch {
      // Ignore API background sync error
    }

    // Set confirmed state
    setConfirmedOrder({
      orderNumber: newOrderNum,
      whatsappUrl,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      pincode: formData.pincode.trim(),
      total,
    });
    setOrderConfirmed(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    showToast(`Order #${newOrderNum} created! Redirecting to WhatsApp...`, 'success');

    // Clear cart
    clearCart();

    // Redirect to WhatsApp in a new tab or window
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
    }, 400);
  };

  // If cart is empty and not confirmed
  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center p-4">
        <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-8 sm:p-12 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#F4F0E8] border border-[#DED7CA] flex items-center justify-center mx-auto text-[#6E685F] mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-medium text-[#23201C]">Your Cart is Empty</h2>
          <p className="text-sm text-[#6E685F] mt-2">
            Add your favourite smartphones or accessories to proceed with your order.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#23201C] text-[#F5EFE6] font-medium text-xs hover:bg-[#151311] transition-colors"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ORDER CONFIRMED VIEW (WhatsApp Redirect Success)
  if (orderConfirmed && confirmedOrder) {
    return (
      <div className="bg-[#F5EFE6] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-[#EAE4D9]/90 rounded-3xl border border-[#E0D9CD] p-8 sm:p-12 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#E6EFE9] border border-[#C2DEC8] text-[#2E6B47] flex items-center justify-center mx-auto animate-in zoom-in-75">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B47] block mb-1">
              Order Registered Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#23201C] tracking-tight">
              Order #{confirmedOrder.orderNumber}
            </h1>
            <p className="text-sm text-[#6E685F] mt-2">
              Your order details have been prepared for WhatsApp dispatch. If WhatsApp did not open automatically, click the button below to complete your order confirmation.
            </p>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="pt-2">
            <a
              href={confirmedOrder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-[#2E6B47] hover:bg-[#255739] text-[#F5EFE6] font-bold text-sm shadow-md transition-all active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Open WhatsApp to Confirm Order</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Order Details Summary Card */}
          <div className="p-5 rounded-2xl bg-[#F4F0E8] border border-[#E0D9CD] text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between pb-2 border-b border-[#E0D9CD]">
              <span className="text-[#6E685F]">Order ID:</span>
              <strong className="text-[#23201C] font-semibold font-mono">
                {confirmedOrder.orderNumber}
              </strong>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E0D9CD]">
              <span className="text-[#6E685F]">Customer:</span>
              <span className="text-[#23201C] font-medium">
                {confirmedOrder.fullName} (+91 {confirmedOrder.phone})
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E0D9CD]">
              <span className="text-[#6E685F]">Delivery To:</span>
              <span className="text-[#23201C] font-medium text-right max-w-xs">
                {confirmedOrder.address}, {confirmedOrder.city} - {confirmedOrder.pincode}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E0D9CD]">
              <span className="text-[#6E685F]">Delivery Time:</span>
              <span className="text-[#23201C] font-semibold">24 to 48 Hours (Gorakhpur)</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-[#6E685F]">Total Payable:</span>
              <strong className="text-[#2E6B47] font-bold text-base">
                {formatINR(confirmedOrder.total)}
              </strong>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-medium text-xs transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 rounded-full border border-[#DED7CA] bg-[#EAE4D9] text-[#23201C] font-medium text-xs hover:bg-[#DFD8CC] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // SINGLE-PAGE CHECKOUT: BASIC INFO + DELIVERY INFO -> WHATSAPP
  return (
    <div className="bg-[#F5EFE6] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="mb-6">
          <nav className="text-xs text-[#6E685F] flex items-center gap-2 mb-2">
            <Link href="/" className="hover:text-[#23201C]">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#23201C]">Shop</Link>
            <span>/</span>
            <span className="text-[#23201C] font-medium">Checkout</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-medium text-[#23201C] tracking-tight">
            Order Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#6E685F] mt-1">
            Fill in your contact and delivery details below to instantly place your order via WhatsApp.
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* SECTION 1: BASIC INFORMATION */}
              <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#DED7CA]">
                  <div className="w-8 h-8 rounded-xl bg-[#23201C] text-[#F5EFE6] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#23201C]">
                      Basic Information
                    </h2>
                    <p className="text-[11px] text-[#6E685F]">
                      Your contact details for order confirmation
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#23201C] block mb-1">
                        Mobile / WhatsApp Number <span className="text-rose-600">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#DED7CA] bg-[#EAE4D9] text-[#6E685F] text-xs font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-3 rounded-r-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                          placeholder="87269 42338"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#23201C] block mb-1">
                        Email Address <span className="text-[#8E867C] text-[11px] font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                          placeholder="rahul@example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: DELIVERY ADDRESS */}
              <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#DED7CA]">
                  <div className="w-8 h-8 rounded-xl bg-[#23201C] text-[#F5EFE6] flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#23201C]">
                      Delivery Address
                    </h2>
                    <p className="text-[11px] text-[#6E685F]">
                      Where should our Gorakhpur hub dispatch your package?
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Street Address */}
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Street Address, Flat / House / Shop No. <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                      placeholder="e.g. Near Main Market, Basharatpur"
                    />
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Landmark / Colony <span className="text-[#8E867C] text-[11px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                      placeholder="e.g. Opposite Central Park, Near Petrol Pump"
                    />
                  </div>

                  {/* City, State, PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#23201C] block mb-1">
                        City <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                        placeholder="Gorakhpur"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#23201C] block mb-1">
                        State <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                        placeholder="Uttar Pradesh"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#23201C] block mb-1">
                        PIN Code <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                        placeholder="273004"
                      />
                    </div>
                  </div>

                  {/* Customer Note */}
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Order Instructions / Notes <span className="text-[#8E867C] text-[11px] font-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="customerNote"
                      rows={2}
                      value={formData.customerNote}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors resize-none"
                      placeholder="e.g. Deliver in the evening, call before arrival"
                    />
                  </div>
                </div>
              </div>

              {/* WHATSAPP REDIRECT CTA BUTTON */}
              <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 shadow-xs space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#2E6B47] hover:bg-[#255739] disabled:opacity-50 text-[#F5EFE6] font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 cursor-pointer group"
                >
                  <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>
                    {isSubmitting
                      ? 'Creating WhatsApp Order...'
                      : `CONFIRM & ORDER ON WHATSAPP (${formatINR(total)})`}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-[11px] text-[#6E685F]">
                  Clicking will generate your order reference and immediately open WhatsApp chat with our store team for dispatch confirmation.
                </p>
              </div>
            </form>
          </div>

          {/* Right Sticky Sidebar: Order Summary */}
          <div className="lg:col-span-5 bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-7 shadow-xs space-y-5 sticky top-28">
            <div className="flex items-center justify-between border-b border-[#DED7CA] pb-3">
              <h3 className="font-semibold text-base text-[#23201C]">
                Order Items ({cart.length})
              </h3>
              <Link href="/shop" className="text-xs text-[#564F46] font-semibold hover:underline">
                + Add More
              </Link>
            </div>

            {/* Items List */}
            <div className="divide-y divide-[#DED7CA] max-h-80 overflow-y-auto pr-1 space-y-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 pt-3 first:pt-0">
                  <div className="relative w-14 h-14 rounded-xl bg-[#F4F0E8] border border-[#DED7CA] p-1 shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#23201C] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#6E685F] block">
                      Qty: {item.quantity}{' '}
                      {item.selectedStorage ? `• ${item.selectedStorage}` : ''}
                    </span>
                    <span className="text-xs font-semibold text-[#23201C] block mt-0.5">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-[#DED7CA] text-xs">
              <div className="flex justify-between text-[#6E685F]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#23201C]">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2E6B47] font-semibold">
                  <span>Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6E685F]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#2E6B47]" />
                  <span>Gorakhpur Dispatch</span>
                </div>
                <span className="font-bold text-[#2E6B47]">FREE</span>
              </div>
              <div className="flex justify-between text-base font-medium text-[#23201C] pt-3 border-t border-[#DED7CA]">
                <span>Total Amount</span>
                <span className="text-[#23201C] font-bold">{formatINR(total)}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 border-t border-[#DED7CA] space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-[#6E685F]">
                <ShieldCheck className="w-4 h-4 text-[#2E6B47] shrink-0" />
                <span>100% Brand Seal &amp; Original Packaging</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#6E685F]">
                <MessageCircle className="w-4 h-4 text-[#2E6B47] shrink-0" />
                <span>Instant Human Support on WhatsApp (+91 87269 42338)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
