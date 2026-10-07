'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Check,
  Lock,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

type CheckoutStep = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shipping, total, clearCart } = useCart();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Info
    email: 'customer@example.com',
    phone: '9876543210',
    fullName: 'Rahul Sharma',
    // Step 2: Shipping
    address: 'Near Main Market, Basharatpur',
    landmark: 'Opposite Central Park',
    city: 'Gorakhpur',
    state: 'Uttar Pradesh',
    pincode: '273004',
    shippingMethod: 'standard', // 'standard' | 'express'
    // Step 3: Payment
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
    upiId: 'rahul@oksbi',
    cardNumber: '4532 •••• •••• 8821',
    cardExpiry: '12/28',
    cardCvv: '392',
    cardName: 'RAHUL SHARMA',
  });

  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        showToast('Please fill in all contact information', 'error');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.address || !formData.city || !formData.pincode) {
        showToast('Please complete shipping address', 'error');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Place Order
      const newOrderNum = `A1-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(newOrderNum);
      setCurrentStep(4);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      showToast(`Order #${newOrderNum} placed successfully!`, 'success');
      clearCart();
    }
  };

  const deliveryCharge = formData.shippingMethod === 'express' ? 149 : shipping;
  const finalTotal = total + (formData.shippingMethod === 'express' ? 149 : 0);

  if (cart.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 mt-2">
            Please add some products to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 shadow-md shadow-orange-500/20"
          >
            <span>Return to Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 transition-all duration-500 -z-0"
              style={{
                width: `${((currentStep - 1) / 3) * 100}%`,
              }}
            />

            {[
              { step: 1, label: '01 Information' },
              { step: 2, label: '02 Delivery' },
              { step: 3, label: '03 Payment' },
              { step: 4, label: '04 Confirmation' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep > s.step
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : currentStep === s.step
                      ? 'bg-orange-500 text-white ring-4 ring-orange-100 shadow-md'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {currentStep > s.step ? <Check className="w-5 h-5" /> : s.step}
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-bold mt-2 whitespace-nowrap ${
                    currentStep >= s.step ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Order Confirmation View */}
        {currentStep === 4 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto animate-in zoom-in-75">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Order Placed Successfully
              </span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Thank You For Your Order!
              </h1>
              <p className="text-sm text-slate-600 mt-2">
                We have received your order and are preparing it for shipment from our Gorakhpur hub. A confirmation invoice has been sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Order details card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Order Reference ID:</span>
                <strong className="text-slate-900 font-bold font-mono">{orderNumber}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Recipient Name:</span>
                <span className="text-slate-900 font-semibold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="text-slate-900 font-semibold text-right max-w-xs">
                  {formData.address}, {formData.city}, {formData.pincode}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="text-orange-600 font-bold">Within 24 to 48 Hours</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Payment Status:</span>
                <span className="text-emerald-700 font-bold uppercase">Paid via {formData.paymentMethod}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center py-3.5 px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Steps 1, 2, 3 Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleNextStep} className="space-y-6">
                {/* STEP 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div className="pb-3 border-b border-slate-100">
                      <h2 className="text-xl font-black text-slate-900">
                        01 Information
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        We will send order updates and WhatsApp tracking link here.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                          placeholder="e.g. Rahul Sharma"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                            placeholder="e.g. rahul@example.com"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Mobile Number (India +91) *
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-semibold">
                              +91
                            </span>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-r-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                              placeholder="98765 43210"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 group"
                      >
                        <span>Continue to Delivery</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Shipping Address & Delivery Method */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-black text-slate-900">
                          02 Delivery Address
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Where should we dispatch your order?
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Edit Info</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Street Address, Flat / House No. *
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                          placeholder="e.g. Near Main Market, Basharatpur"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                          placeholder="e.g. Opposite Central Park"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                            placeholder="Gorakhpur"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            State *
                          </label>
                          <input
                            type="text"
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                            placeholder="Uttar Pradesh"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            required
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:outline-hidden"
                            placeholder="273004"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delivery Method Selection */}
                    <div className="pt-4 border-t border-slate-100">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                        Select Delivery Speed:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label
                          className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                            formData.shippingMethod === 'standard'
                              ? 'border-orange-500 bg-orange-50/40 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === 'standard'}
                            onChange={handleInputChange}
                            className="mt-1 text-orange-600"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                              <Truck className="w-4 h-4 text-orange-500" />
                              <span>Standard Delivery</span>
                            </div>
                            <span className="text-xs text-slate-500 block mt-0.5">2-3 Business Days</span>
                            <span className="text-xs font-bold text-emerald-700 block mt-1">FREE</span>
                          </div>
                        </label>

                        <label
                          className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                            formData.shippingMethod === 'express'
                              ? 'border-orange-500 bg-orange-50/40 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === 'express'}
                            onChange={handleInputChange}
                            className="mt-1 text-orange-600"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                              <span className="text-orange-500 font-black">⚡</span>
                              <span>Priority Express</span>
                            </div>
                            <span className="text-xs text-slate-500 block mt-0.5">Next-Day Delivery</span>
                            <span className="text-xs font-bold text-slate-900 block mt-1">₹149</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900"
                      >
                        ← Back to Information
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 group"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Payment Method (UPI, Credit/Debit Card, Cash on Delivery) */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-black text-slate-900">
                          03 Payment
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          All transactions are encrypted with 256-bit security.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Edit Address</span>
                      </button>
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-3">
                      {/* UPI Option */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          formData.paymentMethod === 'upi'
                            ? 'border-orange-500 bg-orange-50/20 shadow-xs'
                            : 'border-slate-200'
                        }`}
                      >
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === 'upi'}
                            onChange={handleInputChange}
                            className="text-orange-500"
                          />
                          <div className="flex-1 flex items-center justify-between">
                            <span className="font-bold text-sm text-slate-900">
                              UPI (Google Pay / PhonePe / Paytm / BHIM)
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              Instant
                            </span>
                          </div>
                        </label>

                        {formData.paymentMethod === 'upi' && (
                          <div className="mt-4 pt-4 border-t border-slate-200/60 pl-6 space-y-3">
                            <label className="text-xs font-bold text-slate-700 block">
                              Enter your UPI ID / VPA:
                            </label>
                            <input
                              type="text"
                              name="upiId"
                              value={formData.upiId}
                              onChange={handleInputChange}
                              className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-orange-500 focus:outline-hidden"
                              placeholder="mobile@upi"
                            />
                            <p className="text-[11px] text-slate-500">
                              You will receive a collect request on your UPI app to complete payment.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Credit/Debit Card Option */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-orange-500 bg-orange-50/20 shadow-xs'
                            : 'border-slate-200'
                        }`}
                      >
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="text-orange-500"
                          />
                          <div className="flex-1 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-slate-600" />
                              <span className="font-bold text-sm text-slate-900">
                                Credit / Debit Card
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">Visa, MasterCard, RuPay</span>
                          </div>
                        </label>

                        {formData.paymentMethod === 'card' && (
                          <div className="mt-4 pt-4 border-t border-slate-200/60 pl-6 space-y-3">
                            <div>
                              <label className="text-xs font-bold text-slate-700 block mb-1">
                                Card Number
                              </label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-orange-500 focus:outline-hidden"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">
                                  Valid Thru (MM/YY)
                                </label>
                                <input
                                  type="text"
                                  name="cardExpiry"
                                  value={formData.cardExpiry}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-orange-500 focus:outline-hidden"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">
                                  CVV
                                </label>
                                <input
                                  type="password"
                                  name="cardCvv"
                                  value={formData.cardCvv}
                                  onChange={handleInputChange}
                                  maxLength={4}
                                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-orange-500 focus:outline-hidden"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Cash on Delivery Option */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'border-orange-500 bg-orange-50/20 shadow-xs'
                            : 'border-slate-200'
                        }`}
                      >
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleInputChange}
                            className="text-orange-500"
                          />
                          <div className="flex-1 flex items-center justify-between">
                            <span className="font-bold text-sm text-slate-900">
                              Cash on Delivery (COD)
                            </span>
                            <span className="text-[10px] text-slate-500">Pay cash upon delivery</span>
                          </div>
                        </label>

                        {formData.paymentMethod === 'cod' && (
                          <div className="mt-3 pt-3 border-t border-slate-200/60 pl-6 text-xs text-slate-500">
                            A verification code will be sent to <strong>+91 {formData.phone}</strong> when our courier partner arrives in Gorakhpur.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Final CTA: PLACE ORDER */}
                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900"
                      >
                        ← Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm shadow-xl shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
                      >
                        <Lock className="w-4 h-4" />
                        <span>PLACE ORDER ({formatINR(finalTotal)})</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar Order Summary */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5 sticky top-28">
              <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
                Order Items ({cart.length})
              </h3>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1 space-y-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 pt-2.5 first:pt-0">
                    <div className="relative w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 block">
                        Qty: {item.quantity} {item.selectedStorage ? `• ${item.selectedStorage}` : ''}
                      </span>
                      <span className="text-xs font-black text-slate-900 block mt-0.5">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Speed</span>
                  <span className="font-bold text-slate-900">
                    {deliveryCharge === 0 ? 'FREE' : formatINR(deliveryCharge)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 pt-3 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-orange-500">{formatINR(finalTotal)}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Gorakhpur Hub Dispatch • 100% Brand Seal</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
